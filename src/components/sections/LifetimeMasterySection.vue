<script setup lang="ts">
import { Infinity as InfinityIcon } from 'lucide-vue-next'
import MasteryRobotIllustration from './MasteryRobotIllustration.vue'
</script>

<template>
  <section
    id="lifetime-mastery"
    class="relative bg-[#000205] py-28 sm:py-36 lg:py-44"
  >
    <div
      class="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(0,217,255,0.02)_0%,transparent_35%,transparent_65%,rgba(0,217,255,0.02)_100%)]"
      aria-hidden="true"
    />

    <div class="relative mx-auto max-w-[90rem] px-5 sm:px-10 lg:px-14">
      <div
        class="grid gap-12 overflow-hidden rounded-3xl border border-white/[0.08] bg-gradient-to-br from-[#0D1117]/90 via-[#0a0e14] to-[#0D1117]/90 p-10 shadow-[0_32px_100px_rgba(0,0,0,0.5)] backdrop-blur-sm sm:p-14 lg:grid-cols-[1fr_min(38%,420px)] lg:gap-16 lg:p-16"
      >
        <div class="relative max-w-3xl">
          <div class="mb-6 flex items-center gap-3">
            <InfinityIcon class="h-7 w-7 text-[#00D9FF]/90" stroke-width="1.5" aria-hidden="true" />
            <p class="font-mono text-[10px] uppercase tracking-[0.45em] text-[#00D9FF]/75">membership</p>
          </div>
          <h2 class="font-display text-[clamp(1.875rem,4vw,3rem)] font-bold tracking-[-0.03em] text-[#FAFAFA]">
            Enroll once. Keep access. Every new release is included.
          </h2>
          <p class="font-sans mt-6 text-lg leading-relaxed text-[#E8E8E8]/65 sm:text-xl">
            The library deepens with the stack. Your price does not. New Laravel, Vue, and AI modules ship to your
            membership as we add them—public pricing for later cohorts may move; yours is set at entry.
          </p>
          <p class="font-sans mt-6 text-base leading-relaxed text-[#E8E8E8]/50">
            One clear membership for a product that does not stand still.
          </p>
        </div>

        <!-- 3D-style robot bust (SVG) — conversational gesture -->
        <div
          class="relative flex min-h-[260px] flex-col items-center justify-center overflow-hidden rounded-2xl border border-[#00D9FF]/15 bg-[#00D9FF]/[0.03] p-6 sm:min-h-[300px] sm:p-8 lg:min-h-[320px]"
          aria-hidden="true"
        >
          <MasteryRobotIllustration />
        </div>
      </div>
    </div>
  </section>
</template>
