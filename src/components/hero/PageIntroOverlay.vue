<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { animate } from 'motion'

const root = ref<HTMLElement | null>(null)
const visible = ref(true)

onMounted(async () => {
  const el = root.value
  if (!el) return
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    visible.value = false
    return
  }
  await animate(
    el,
    { opacity: 0 },
    {
      duration: 1.1,
      ease: [0.22, 1, 0.36, 1],
    },
  )
  visible.value = false
})
</script>

<template>
  <div
    v-if="visible"
    ref="root"
    class="pointer-events-none fixed inset-0 z-[100] bg-[#000205]"
    aria-hidden="true"
  />
</template>
