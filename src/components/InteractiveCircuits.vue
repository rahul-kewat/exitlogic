<script setup lang="ts">
import { nextTick, onMounted, onUnmounted, ref } from 'vue'

const containerRef = ref<HTMLElement | null>(null)
const canvasRef = ref<HTMLCanvasElement | null>(null)

/** Axis-aligned copper traces only (motherboard routing) */
type Segment = { x1: number; y1: number; x2: number; y2: number; w?: number }
type Via = { x: number; y: number }
type Pad = { x: number; y: number }

const GLOW_RADIUS = 150
const TRACE = '#00D9FF'
/** Visible through frosted layer — soft, not razor-sharp */
const BASE_OPACITY = 0.42
const HOVER_OPACITY = 0.62
const GLOW_BLUR = 8

let segments: Segment[] = []
let vias: Via[] = []
let pads: Pad[] = []
let mouseX = -9999
let mouseY = -9999
let raf = 0
let start = 0
let w = 0
let h = 0
let dpr = 1
let resizeObserver: ResizeObserver | null = null

/** Fresh random layout on every call (new load / resize) */
function rand() {
  return Math.random()
}

function inCenterVoid(mx: number, my: number, width: number, height: number) {
  const cx = width / 2
  const cy = height / 2
  const rx = width * 0.34
  const ry = height * 0.32
  const nx = (mx - cx) / rx
  const ny = (my - cy) / ry
  return nx * nx + ny * ny < 1
}

function distToSegment(px: number, py: number, s: Segment) {
  const { x1, y1, x2, y2 } = s
  const dx = x2 - x1
  const dy = y2 - y1
  const len2 = dx * dx + dy * dy
  if (len2 < 1e-6) return Math.hypot(px - x1, py - y1)
  let t = ((px - x1) * dx + (py - y1) * dy) / len2
  t = Math.max(0, Math.min(1, t))
  const nx = x1 + t * dx
  const ny = y1 + t * dy
  return Math.hypot(px - nx, py - ny)
}

/**
 * Random PCB each time: cell pitch, edge density, buses, vias vary.
 */
function generateMotherboard(width: number, height: number) {
  const cell = 26 + Math.floor(rand() * 10)
  const cols = Math.ceil(width / cell)
  const rows = Math.ceil(height / cell)

  const segs: Segment[] = []

  const pHEven = 0.18 + rand() * 0.18
  const pHOdd = 0.12 + rand() * 0.12
  const pV = 0.14 + rand() * 0.14

  for (let j = 0; j < rows; j++) {
    for (let i = 0; i < cols; i++) {
      const x = i * cell
      const y = j * cell
      const pH = j % 2 === 0 ? pHEven : pHOdd
      if (rand() < pH && i < cols) {
        const mx = x + cell / 2
        const my = y
        if (!inCenterVoid(mx, my, width, height)) {
          const thick = rand() < 0.05 ? 2 : 1
          segs.push({ x1: x, y1: y, x2: x + cell, y2: y, w: thick })
        }
      }
      if (rand() < pV && j < rows) {
        const mx = x + cell
        const my = y + cell / 2
        if (!inCenterVoid(mx, my, width, height)) {
          const thick = rand() < 0.05 ? 2 : 1
          segs.push({ x1: x + cell, y1: y, x2: x + cell, y2: y + cell, w: thick })
        }
      }
    }
  }

  const busRows = Math.max(1, Math.floor(rows / (4 + Math.floor(rand() * 4))))
  for (let b = 0; b < busRows; b++) {
    const j = 1 + b * (4 + Math.floor(rand() * 4)) + Math.floor(rand() * 3)
    if (j >= rows) continue
    const y = j * cell
    let i = 0
    while (i < cols - 4) {
      if (rand() < 0.32 + rand() * 0.2) {
        const len = 4 + Math.floor(rand() * Math.min(12, cols - i - 1))
        const x1 = i * cell
        const x2 = Math.min(i + len, cols) * cell
        const mx = (x1 + x2) / 2
        if (!inCenterVoid(mx, y, width, height)) {
          segs.push({ x1, y1: y, x2, y2: y, w: rand() < 0.12 ? 2 : 1 })
        }
        i += len + 1 + Math.floor(rand() * 2)
      } else {
        i += 1 + Math.floor(rand() * 2)
      }
    }
  }

  const colStep = 6 + Math.floor(rand() * 8)
  for (let i = colStep; i < cols; i += colStep + Math.floor(rand() * 8)) {
    let j = 0
    while (j < rows - 2) {
      if (rand() < 0.35 + rand() * 0.15) {
        const len = 3 + Math.floor(rand() * (rows - j - 1))
        const y1 = j * cell
        const y2 = Math.min(j + len, rows) * cell
        const x = i * cell
        const my = (y1 + y2) / 2
        if (!inCenterVoid(x, my, width, height)) {
          segs.push({ x1: x, y1: y1, x2: x, y2: y2, w: 1 })
        }
        j += len + 1 + Math.floor(rand() * 2)
      } else {
        j += 2
      }
    }
  }

  const ptDeg = new Map<string, number>()
  function addPt(px: number, py: number) {
    const k = `${Math.round(px)}:${Math.round(py)}`
    ptDeg.set(k, (ptDeg.get(k) ?? 0) + 1)
  }
  for (const s of segs) {
    addPt(s.x1, s.y1)
    addPt(s.x2, s.y2)
  }

  const viaChance = 0.22 + rand() * 0.2
  const padChance = 0.55 + rand() * 0.25

  const viaList: Via[] = []
  const padList: Pad[] = []
  const seenVia = new Set<string>()

  for (const [k, deg] of ptDeg) {
    if (deg < 2) continue
    const [xs, ys] = k.split(':').map(Number)
    if (inCenterVoid(xs, ys, width, height)) continue
    if (rand() < viaChance && !seenVia.has(k)) {
      seenVia.add(k)
      viaList.push({ x: xs, y: ys })
    }
  }

  for (const [k, deg] of ptDeg) {
    if (deg !== 1) continue
    if (rand() > padChance) continue
    const [xs, ys] = k.split(':').map(Number)
    if (inCenterVoid(xs, ys, width, height)) continue
    padList.push({ x: xs, y: ys })
  }

  function segKey(s: Segment) {
    const ax = Math.round(s.x1)
    const ay = Math.round(s.y1)
    const bx = Math.round(s.x2)
    const by = Math.round(s.y2)
    if (ax < bx || (ax === bx && ay <= by)) return `${ax},${ay},${bx},${by}`
    return `${bx},${by},${ax},${ay}`
  }

  const seenSeg = new Set<string>()
  const uniqueSegs: Segment[] = []
  for (const s of segs) {
    const k = segKey(s)
    if (seenSeg.has(k)) continue
    seenSeg.add(k)
    uniqueSegs.push(s)
  }

  return { segments: uniqueSegs, vias: viaList, pads: padList }
}

function draw() {
  const canvas = canvasRef.value
  if (!canvas) return
  const ctx = canvas.getContext('2d')
  if (!ctx) return

  ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
  ctx.fillStyle = '#000000'
  ctx.fillRect(0, 0, w, h)

  const t = (performance.now() - start) / 1000
  const pulse = 0.97 + 0.03 * Math.sin(t * 0.65)

  const drawSegment = (s: Segment) => {
    const d = distToSegment(mouseX, mouseY, s)
    const near = d < GLOW_RADIUS
    const opacity = near ? HOVER_OPACITY : BASE_OPACITY * pulse
    const lw = s.w ?? 1

    ctx.beginPath()
    ctx.moveTo(s.x1, s.y1)
    ctx.lineTo(s.x2, s.y2)
    ctx.strokeStyle = TRACE
    ctx.lineWidth = lw
    ctx.lineCap = 'square'
    ctx.lineJoin = 'miter'
    ctx.globalAlpha = opacity
    ctx.shadowBlur = near ? GLOW_BLUR : 0
    ctx.shadowColor = TRACE
    ctx.stroke()
    ctx.shadowBlur = 0
  }

  const drawVia = (v: Via) => {
    const d = Math.hypot(mouseX - v.x, mouseY - v.y)
    const near = d < GLOW_RADIUS
    const opacity = near ? HOVER_OPACITY : BASE_OPACITY * pulse
    const outer = 3.2
    const inner = 1.2

    ctx.globalAlpha = opacity
    ctx.shadowBlur = near ? GLOW_BLUR : 0
    ctx.shadowColor = TRACE

    ctx.beginPath()
    ctx.arc(v.x, v.y, outer, 0, Math.PI * 2)
    ctx.strokeStyle = TRACE
    ctx.lineWidth = 1
    ctx.stroke()

    ctx.beginPath()
    ctx.arc(v.x, v.y, inner, 0, Math.PI * 2)
    ctx.fillStyle = TRACE
    ctx.globalAlpha = opacity * 0.35
    ctx.fill()

    ctx.globalAlpha = opacity
    ctx.shadowBlur = 0
  }

  const drawPad = (p: Pad) => {
    const d = Math.hypot(mouseX - p.x, mouseY - p.y)
    const near = d < GLOW_RADIUS
    const opacity = near ? HOVER_OPACITY : BASE_OPACITY * pulse
    const rw = 4
    const rh = 3

    ctx.globalAlpha = opacity
    ctx.shadowBlur = near ? GLOW_BLUR : 0
    ctx.shadowColor = TRACE
    ctx.strokeStyle = TRACE
    ctx.lineWidth = 1
    ctx.strokeRect(p.x - rw / 2, p.y - rh / 2, rw, rh)
    ctx.shadowBlur = 0
  }

  for (const s of segments) {
    drawSegment(s)
  }
  for (const v of vias) {
    drawVia(v)
  }
  for (const p of pads) {
    drawPad(p)
  }

  ctx.globalAlpha = 1

  /** Light top falloff for headline legibility */
  const veil = ctx.createLinearGradient(0, 0, 0, h)
  veil.addColorStop(0, 'rgba(0,0,0,0.12)')
  veil.addColorStop(0.45, 'rgba(0,0,0,0.03)')
  veil.addColorStop(1, 'rgba(0,0,0,0)')
  ctx.fillStyle = veil
  ctx.fillRect(0, 0, w, h)
}

function loop() {
  draw()
  raf = requestAnimationFrame(loop)
}

function resize() {
  const canvas = canvasRef.value
  const box = containerRef.value
  if (!canvas || !box) return
  dpr = Math.min(window.devicePixelRatio ?? 1, 2)
  w = Math.max(1, box.clientWidth)
  h = Math.max(1, box.clientHeight)
  canvas.width = Math.floor(w * dpr)
  canvas.height = Math.floor(h * dpr)
  canvas.style.width = `${w}px`
  canvas.style.height = `${h}px`
  const net = generateMotherboard(w, h)
  segments = net.segments
  vias = net.vias
  pads = net.pads
}

function onMove(e: MouseEvent) {
  const canvas = canvasRef.value
  if (!canvas || w < 1 || h < 1) return
  const rect = canvas.getBoundingClientRect()
  const x = e.clientX - rect.left
  const y = e.clientY - rect.top
  if (x < 0 || y < 0 || x > rect.width || y > rect.height) {
    mouseX = -9999
    mouseY = -9999
    return
  }
  mouseX = (x / rect.width) * w
  mouseY = (y / rect.height) * h
}

function onLeave() {
  mouseX = -9999
  mouseY = -9999
}

onMounted(async () => {
  start = performance.now()
  await nextTick()
  resize()
  resizeObserver = new ResizeObserver(() => resize())
  if (containerRef.value) {
    resizeObserver.observe(containerRef.value)
  }
  window.addEventListener('mousemove', onMove, { passive: true })
  window.addEventListener('mouseleave', onLeave)
  raf = requestAnimationFrame(loop)
})

onUnmounted(() => {
  resizeObserver?.disconnect()
  window.removeEventListener('mousemove', onMove)
  window.removeEventListener('mouseleave', onLeave)
  cancelAnimationFrame(raf)
})
</script>

<template>
  <div ref="containerRef" class="absolute inset-0 min-h-full w-full">
    <canvas
      ref="canvasRef"
      class="pointer-events-none absolute inset-0 h-full w-full bg-[#000000]"
      aria-hidden="true"
    />
    <!-- Frosted tint + blur: traces stay a hint, not a sharp PCB photo -->
    <div
      class="pointer-events-none absolute inset-0 z-[1] border border-white/[0.05] bg-gradient-to-b from-black/28 via-black/12 to-transparent backdrop-blur-md backdrop-saturate-125 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]"
      aria-hidden="true"
    />
  </div>
</template>
