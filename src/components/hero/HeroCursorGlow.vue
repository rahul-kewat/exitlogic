<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'

const props = defineProps<{ heroSelector?: string }>()

const glow = ref<HTMLElement | null>(null)
const active = ref(false)
let lx = 0
let ly = 0
let tx = 0
let ty = 0
let raf = 0

function tick() {
  tx += (lx - tx) * 0.08
  ty += (ly - ty) * 0.08
  const el = glow.value
  if (el) {
    el.style.transform = `translate(${tx}px, ${ty}px) translate(-50%, -50%)`
  }
  raf = requestAnimationFrame(tick)
}

function onMove(e: MouseEvent) {
  const sel = props.heroSelector ?? '#hero'
  const hero = document.querySelector(sel)
  if (!hero) return
  const rect = hero.getBoundingClientRect()
  const inside =
    e.clientX >= rect.left &&
    e.clientX <= rect.right &&
    e.clientY >= rect.top &&
    e.clientY <= rect.bottom
  active.value = inside
  if (inside) {
    lx = e.clientX
    ly = e.clientY
  }
}

onMounted(() => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
  window.addEventListener('mousemove', onMove, { passive: true })
  raf = requestAnimationFrame(tick)
})

onUnmounted(() => {
  window.removeEventListener('mousemove', onMove)
  cancelAnimationFrame(raf)
})
</script>

<template>
  <div
    ref="glow"
    class="pointer-events-none fixed left-0 top-0 z-[5] h-[min(520px,90vw)] w-[min(520px,90vw)] rounded-full opacity-0 transition-opacity duration-500"
    :class="active ? 'opacity-100' : 'opacity-0'"
    style="will-change: transform"
    aria-hidden="true"
  >
    <div
      class="h-full w-full rounded-full bg-[radial-gradient(circle_at_center,rgba(0,217,255,0.14)_0%,rgba(0,217,255,0.04)_42%,transparent_68%)] blur-2xl"
    />
  </div>
</template>
