<script setup lang="ts">
import { nextTick, onMounted, onUnmounted, ref } from 'vue'
import * as THREE from 'three'

const containerRef = ref<HTMLElement | null>(null)
const staticFallback = ref(false)

let raf = 0
let alive = false
let renderer: THREE.WebGLRenderer | null = null
let scene: THREE.Scene | null = null
let camera: THREE.PerspectiveCamera | null = null
let pointsOuter: THREE.Points | null = null
let pointsInner: THREE.Points | null = null
let geomOuter: THREE.BufferGeometry | null = null
let matOuter: THREE.PointsMaterial | null = null
let geomInner: THREE.BufferGeometry | null = null
let matInner: THREE.PointsMaterial | null = null
let onMove: ((e: MouseEvent) => void) | null = null
let ro: ResizeObserver | null = null

let mouseX = 0
let mouseY = 0
let tx = 0
let ty = 0
let tz = 14
let start = 0

function dispose() {
  alive = false
  cancelAnimationFrame(raf)
  ro?.disconnect()
  ro = null
  if (onMove) {
    window.removeEventListener('mousemove', onMove)
    onMove = null
  }
  geomOuter?.dispose()
  matOuter?.dispose()
  geomInner?.dispose()
  matInner?.dispose()
  geomOuter = null
  matOuter = null
  geomInner = null
  matInner = null
  pointsOuter = null
  pointsInner = null
  if (renderer) {
    renderer.dispose()
    const c = renderer.domElement
    if (c.parentNode) c.parentNode.removeChild(c)
  }
  renderer = null
  scene = null
  camera = null
}

function tick() {
  if (!alive || !renderer || !scene || !camera) return
  const t = (performance.now() - start) / 1000
  const mx = mouseX
  const my = mouseY
  if (pointsOuter) {
    pointsOuter.rotation.y = t * 0.035 + mx * 0.14
    pointsOuter.rotation.x = Math.sin(t * 0.18) * 0.06 + my * 0.1
    pointsOuter.rotation.z = mx * -0.06 + Math.sin(t * 0.4) * 0.02
  }
  if (pointsInner) {
    pointsInner.rotation.y = -t * 0.02 - mx * 0.22
    pointsInner.rotation.z = t * 0.015 + my * 0.18
    pointsInner.rotation.x = my * 0.12
  }
  tx += (mx * 0.58 - tx) * 0.038
  ty += (my * 0.42 - ty) * 0.038
  const zTarget = 14 + (mx * mx + my * my) * 0.35
  tz += (zTarget - tz) * 0.04
  camera.position.x = tx
  camera.position.y = ty
  camera.position.z = tz
  camera.lookAt(mx * 0.35, my * 0.25, 0)
  renderer.render(scene, camera)
  raf = requestAnimationFrame(tick)
}

function init(w: number, h: number) {
  scene = new THREE.Scene()
  scene.fog = new THREE.FogExp2(0x000308, 0.032)

  camera = new THREE.PerspectiveCamera(52, w / Math.max(h, 1), 0.1, 80)
  camera.position.z = 14

  renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: false,
    powerPreference: 'high-performance',
  })
  renderer.setClearColor(0x000205, 1)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio ?? 1, 2))
  renderer.setSize(w, h)

  const count = 4200
  const positions = new Float32Array(count * 3)
  const colors = new Float32Array(count * 3)
  const c = new THREE.Color()

  for (let i = 0; i < count; i++) {
    const shell = 5 + Math.random() * 9
    const u = Math.random()
    const v = Math.random()
    const theta = u * Math.PI * 2
    const phi = Math.acos(2 * v - 1)
    positions[i * 3] = shell * Math.sin(phi) * Math.cos(theta)
    positions[i * 3 + 1] = shell * Math.sin(phi) * Math.sin(theta)
    positions[i * 3 + 2] = shell * Math.cos(phi)

    const mix = Math.random()
    c.setRGB(0.02 + mix * 0.15, 0.75 + mix * 0.2, 0.95 + mix * 0.05)
    colors[i * 3] = c.r * (0.35 + Math.random() * 0.25)
    colors[i * 3 + 1] = c.g * (0.35 + Math.random() * 0.25)
    colors[i * 3 + 2] = c.b * (0.35 + Math.random() * 0.25)
  }

  geomOuter = new THREE.BufferGeometry()
  geomOuter.setAttribute('position', new THREE.BufferAttribute(positions, 3))
  geomOuter.setAttribute('color', new THREE.BufferAttribute(colors, 3))

  matOuter = new THREE.PointsMaterial({
    size: 0.038,
    vertexColors: true,
    transparent: true,
    opacity: 0.9,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    sizeAttenuation: true,
  })

  pointsOuter = new THREE.Points(geomOuter, matOuter)
  scene.add(pointsOuter)

  const innerCount = 900
  const ip = new Float32Array(innerCount * 3)
  const ic = new Float32Array(innerCount * 3)
  for (let i = 0; i < innerCount; i++) {
    const r = Math.random() * 3.2
    const t = Math.random() * Math.PI * 2
    const p = (Math.random() - 0.5) * Math.PI
    ip[i * 3] = r * Math.cos(p) * Math.cos(t)
    ip[i * 3 + 1] = r * Math.cos(p) * Math.sin(t)
    ip[i * 3 + 2] = r * Math.sin(p)
    ic[i * 3] = 0.9
    ic[i * 3 + 1] = 0.98
    ic[i * 3 + 2] = 1
  }
  geomInner = new THREE.BufferGeometry()
  geomInner.setAttribute('position', new THREE.BufferAttribute(ip, 3))
  geomInner.setAttribute('color', new THREE.BufferAttribute(ic, 3))
  matInner = new THREE.PointsMaterial({
    size: 0.055,
    vertexColors: true,
    transparent: true,
    opacity: 0.35,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  })
  pointsInner = new THREE.Points(geomInner, matInner)
  scene.add(pointsInner)

  start = performance.now()
  alive = true
  tick()
}

function bootstrap() {
  const el = containerRef.value
  if (!el) return
  const w = Math.max(el.clientWidth, 1)
  const h = Math.max(el.clientHeight, 1)
  init(w, h)
  if (renderer) el.appendChild(renderer.domElement)

  onMove = (e: MouseEvent) => {
    const box = containerRef.value
    if (!box) return
    const r = box.getBoundingClientRect()
    if (r.width < 1 || r.height < 1) return
    const nx = (e.clientX - r.left) / r.width
    const ny = (e.clientY - r.top) / r.height
    mouseX = nx * 2 - 1
    mouseY = -(ny * 2 - 1)
  }
  window.addEventListener('mousemove', onMove, { passive: true })

  ro = new ResizeObserver(() => {
    const box = containerRef.value
    if (!box || !camera || !renderer) return
    const cw = Math.max(box.clientWidth, 1)
    const ch = Math.max(box.clientHeight, 1)
    camera.aspect = cw / ch
    camera.updateProjectionMatrix()
    renderer.setSize(cw, ch)
  })
  ro.observe(el)
}

onMounted(async () => {
  if (typeof window === 'undefined') return
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    staticFallback.value = true
    return
  }
  await nextTick()
  bootstrap()
})

onUnmounted(() => {
  dispose()
})
</script>

<template>
  <div ref="containerRef" class="absolute inset-0 min-h-full w-full">
    <div
      v-if="staticFallback"
      class="absolute inset-0 bg-[radial-gradient(ellipse_120%_80%_at_50%_20%,rgba(0,80,100,0.35),transparent_55%),radial-gradient(ellipse_80%_60%_at_80%_60%,rgba(0,217,255,0.08),transparent_50%),#000205]"
      aria-hidden="true"
    />
  </div>
</template>
