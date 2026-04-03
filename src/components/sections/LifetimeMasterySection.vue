<script setup lang="ts">
import { Infinity as InfinityIcon } from 'lucide-vue-next'
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

        <!-- Indicium-style vertical accent panel -->
        <div
          class="relative hidden min-h-[280px] rounded-2xl border border-[#00D9FF]/15 bg-[#00D9FF]/[0.03] lg:flex lg:flex-col lg:justify-end lg:p-8"
          aria-hidden="true"
        >
          <div class="space-y-4">
            <div class="h-1 w-12 rounded-full bg-[#00D9FF]/60" />
            <div class="h-1 w-8 rounded-full bg-[#00D9FF]/30" />
            <div class="h-1 w-16 rounded-full bg-[#00D9FF]/20" />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
