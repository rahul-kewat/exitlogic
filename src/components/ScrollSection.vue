<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { animate, inView } from 'motion'

const root = ref<HTMLElement | null>(null)
let unsubscribe: (() => void) | undefined

function reveal(el: HTMLElement) {
  const reduce =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (reduce) {
    el.style.opacity = '1'
    el.style.transform = 'none'
    return
  }
  animate(
    el,
    { opacity: 1, transform: 'translate3d(0, 0, 0)' },
    { duration: 0.75, ease: [0.22, 1, 0.36, 1] },
  )
}

onMounted(() => {
  const el = root.value
  if (!el) return

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    el.style.opacity = '1'
    el.style.transform = 'none'
    return
  }

  el.style.opacity = '0'
  el.style.transform = 'translate3d(0, 36px, 0)'

  unsubscribe = inView(
    el,
    () => {
      reveal(el)
    },
    { amount: 0.12, margin: '0px 0px -80px 0px' },
  )
})

onUnmounted(() => {
  unsubscribe?.()
})
</script>

<template>
  <section ref="root" class="will-change-transform">
    <slot />
  </section>
</template>
