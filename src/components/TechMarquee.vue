<script setup lang="ts">
import { Box, Code2, Sparkles, Briefcase } from 'lucide-vue-next'

const items = [
  { label: 'Laravel', icon: Box },
  { label: 'Vue', icon: Code2 },
  { label: 'AI', icon: Sparkles },
  { label: 'Freelancing', icon: Briefcase },
] as const

const row = [...items, ...items, ...items]
</script>

<template>
  <div class="relative w-full overflow-hidden rounded-2xl border border-white/[0.06] bg-[#0D1117]/30 py-8">
    <div
      class="pointer-events-none absolute inset-y-0 left-0 z-10 w-28 bg-gradient-to-r from-[#000205] to-transparent"
    />
    <div
      class="pointer-events-none absolute inset-y-0 right-0 z-10 w-28 bg-gradient-to-l from-[#000205] to-transparent"
    />

    <div
      class="marquee-track animate-[marquee_32s_linear_infinite] flex w-max gap-14 sm:gap-20"
    >
      <div
        v-for="(item, i) in row"
        :key="i + item.label"
        class="flex shrink-0 items-center gap-4"
      >
        <component
          :is="item.icon"
          class="h-8 w-8 text-[#00D9FF]/80 sm:h-9 sm:w-9"
          stroke-width="1.25"
          aria-hidden="true"
        />
        <span
          class="font-display text-xl font-semibold tracking-tight text-[#F4F4F4]/90 sm:text-2xl"
          >{{ item.label }}</span
        >
        <span class="text-[#00D9FF]/25">+</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
@keyframes marquee {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-33.333%);
  }
}

@media (prefers-reduced-motion: reduce) {
  .marquee-track {
    animation: none;
    flex-wrap: wrap;
    justify-content: center;
    width: 100%;
    max-width: 42rem;
    margin-inline: auto;
    row-gap: 1.5rem;
  }
}
</style>
