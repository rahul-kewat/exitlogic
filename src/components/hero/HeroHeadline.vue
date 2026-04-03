<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { animate } from 'motion'

const lines = ['THE INDUSTRY IS MOVING.', "DON'T GET LEFT", 'BEHIND IN A', 'CUBICLE.'] as const
const root = ref<HTMLElement | null>(null)

onMounted(() => {
  const el = root.value
  if (!el) return
  const items = el.querySelectorAll<HTMLElement>('[data-line]')
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    items.forEach((node) => {
      node.style.opacity = '1'
      node.style.transform = 'none'
    })
    return
  }
  items.forEach((node) => {
    node.style.opacity = '0'
    node.style.transform = 'translate3d(0, 2.25rem, 0)'
  })
  animate(
    items,
    { opacity: 1, transform: 'translate3d(0, 0, 0)' },
    {
      delay: (_el, i) => 0.28 + i * 0.09,
      duration: 1,
      ease: [0.16, 1, 0.3, 1],
    },
  )
})
</script>

<template>
  <h1
    ref="root"
    class="font-display text-[clamp(2.25rem,9vw,5.5rem)] font-black leading-[0.9] tracking-[-0.04em] text-[#FAFAFA]"
  >
    <span
      v-for="line in lines"
      :key="line"
      data-line
      class="block overflow-hidden"
    >
      <span class="block">{{ line }}</span>
    </span>
  </h1>
</template>
