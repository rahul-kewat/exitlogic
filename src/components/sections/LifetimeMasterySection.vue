<script setup lang="ts">
import { Infinity as InfinityIcon } from 'lucide-vue-next'
</script>

<template>
  <section id="lifetime-mastery" class="mx-auto max-w-[90rem] px-5 py-28 sm:px-10 sm:py-36 lg:px-14">
    <div class="glass-card relative overflow-hidden rounded-3xl p-10 sm:p-14 lg:p-16">
      <div
        class="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-[#00D9FF]/[0.07] blur-3xl"
        aria-hidden="true"
      />
      <div class="relative max-w-3xl">
        <div class="mb-6 flex items-center gap-3">
          <InfinityIcon class="h-7 w-7 text-[#00D9FF]/90" stroke-width="1.5" aria-hidden="true" />
          <p class="font-mono text-[10px] uppercase tracking-[0.45em] text-[#00D9FF]/75">lifetime mastery</p>
        </div>
        <h2 class="font-display text-[clamp(1.875rem,4vw,3rem)] font-bold tracking-[-0.03em] text-[#FAFAFA]">
          One enrollment. Every future update. Lifetime access.
        </h2>
        <p class="font-sans mt-6 text-lg leading-relaxed text-[#E8E8E8]/65 sm:text-xl">
          You're not buying a single course—you're buying a permanent seat at the table. Every shift in the stack—Laravel,
          Vue, AI agents, whatever ships next—lands in your vault. New members will pay for each wave; you never pay again.
        </p>
        <p class="font-sans mt-6 text-base leading-relaxed text-[#E8E8E8]/50">
          That's not a perk. It's leverage for the rest of your career.
        </p>
      </div>
    </div>
  </section>
</template>
