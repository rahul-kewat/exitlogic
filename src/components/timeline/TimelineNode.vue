<script setup lang="ts">
import { animate } from 'motion'
import { computed, ref, watch } from 'vue'

const props = defineProps<{
  n: 1 | 2 | 3
  active: boolean
}>()

const pulseEl = ref<HTMLElement | null>(null)

const ringStyle = computed(() =>
  props.active
    ? 'box-shadow: 0 0 0 2px rgba(0,217,255,0.9), 0 0 40px rgba(0,217,255,0.55), 0 0 80px rgba(0,217,255,0.25);'
    : 'box-shadow: 0 0 0 1px rgba(255,255,255,0.12);',
)

watch(
  () => props.active,
  (v) => {
    if (!v || !pulseEl.value) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) return
    animate(
      pulseEl.value,
      { scale: [1, 1.08, 1] },
      { duration: 0.55, ease: [0.34, 1.2, 0.64, 1] },
    )
  },
)
</script>

<template>
  <div
    class="relative flex h-14 w-14 shrink-0 items-center justify-center md:h-16 md:w-16"
    :aria-current="active ? 'step' : undefined"
  >
    <div
      class="pointer-events-none absolute inset-0 rounded-full bg-[#00D9FF]/15 transition duration-500"
      :class="active ? 'scale-150 opacity-100' : 'scale-100 opacity-0'"
    />
    <div
      class="pointer-events-none absolute inset-[-6px] rounded-full border border-[#00D9FF]/0 transition duration-700"
      :class="active ? 'border-[#00D9FF]/40 scale-125' : ''"
    />
    <div
      ref="pulseEl"
      class="font-mono relative z-[1] flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-gradient-to-br from-[#0a1620] via-[#050a0e] to-black text-lg font-bold text-[#F4F4F4] md:h-12 md:w-12 md:text-xl"
      :style="ringStyle"
    >
      <span
        class="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_30%_20%,rgba(0,217,255,0.35),transparent_55%)] opacity-80"
      />
      <span class="relative drop-shadow-[0_0_12px_rgba(0,217,255,0.6)]">{{ n }}</span>
    </div>
  </div>
</template>
