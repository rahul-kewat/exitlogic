<script setup lang="ts">
import { Check, Minus, TrendingDown, TrendingUp } from 'lucide-vue-next'

const rows = [
  {
    label: 'Daily reality',
    traditional: '8 hours of hand-coding, meetings that eat the clock',
    exitlogic: '~2 hours of high-leverage work with AI; async by default',
  },
  {
    label: 'Income ceiling',
    traditional: 'Salary cap, promotion lottery, “next year” forever',
    exitlogic: 'Freelance scale, retainers, offers you choose—not HR’s band',
  },
  {
    label: 'Tools & edge',
    traditional: 'Stack from three jobs ago, “we’ve always done it this way”',
    exitlogic: 'Cursor + AI workflow, architecture-first, ship like it’s 2026',
  },
  {
    label: 'Location',
    traditional: 'Commute, badge swipe, open floor “culture”',
    exitlogic: 'Work from anywhere your pipeline allows',
  },
] as const
</script>

<template>
  <section id="comparison" class="relative bg-[#000205] pb-28 pt-28 sm:pb-36 sm:pt-36 lg:pb-44 lg:pt-44">
    <div
      class="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent"
      aria-hidden="true"
    />

    <div class="relative mx-auto max-w-[90rem] px-5 sm:px-10 lg:px-14">
      <div class="mb-12 max-w-3xl sm:mb-16 lg:mx-auto lg:text-center">
        <p class="font-mono mb-4 text-[10px] uppercase tracking-[0.45em] text-[#00D9FF]/75">the split</p>
        <h2 class="font-display text-[clamp(1.875rem,4vw,3rem)] font-bold tracking-[-0.03em] text-[#FAFAFA]">
          Traditional developer vs ExitLogic developer
        </h2>
        <p class="font-sans mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-[#E8E8E8]/55">
          Same title on LinkedIn. Opposite trajectories. One path keeps you replaceable; the other builds an exit.
        </p>
      </div>

      <!-- Mobile column legend -->
      <div class="mb-5 flex gap-2 sm:gap-3 lg:hidden">
        <div
          class="flex flex-1 items-center justify-center gap-2 rounded-xl border border-white/[0.08] bg-[#0a0e14]/80 py-2.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#F4F4F4]/55"
        >
          <TrendingDown class="h-3.5 w-3.5 shrink-0 text-[#F4F4F4]/40" stroke-width="2" aria-hidden="true" />
          Traditional
        </div>
        <div
          class="flex flex-1 items-center justify-center gap-2 rounded-xl border border-[#00D9FF]/30 bg-[#00D9FF]/[0.08] py-2.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#00D9FF]"
        >
          <TrendingUp class="h-3.5 w-3.5 shrink-0" stroke-width="2" aria-hidden="true" />
          ExitLogic
        </div>
      </div>

      <div
        class="overflow-hidden rounded-3xl border border-white/[0.09] bg-gradient-to-b from-[#0D1117]/90 to-[#080c14]/40 shadow-[0_40px_120px_rgba(0,0,0,0.45)] ring-1 ring-white/[0.04]"
      >
        <!-- Desktop header -->
        <div
          class="hidden lg:grid lg:grid-cols-[minmax(128px,152px)_1fr_1fr] lg:gap-0 lg:border-b lg:border-white/[0.08]"
        >
          <div class="bg-[#0a0e14]/60" aria-hidden="true" />
          <div
            class="flex items-center gap-2.5 border-r border-white/[0.06] bg-white/[0.03] px-8 py-5 font-display text-xs font-bold uppercase tracking-[0.18em] text-[#F4F4F4]/50"
          >
            <TrendingDown class="h-4 w-4 shrink-0 text-[#F4F4F4]/38" stroke-width="2" aria-hidden="true" />
            Traditional
          </div>
          <div
            class="flex items-center gap-2.5 bg-[linear-gradient(135deg,rgba(0,217,255,0.12)_0%,rgba(0,217,255,0.04)_55%,transparent_100%)] px-8 py-5 font-display text-xs font-bold uppercase tracking-[0.18em] text-[#00D9FF]"
          >
            <TrendingUp class="h-4 w-4 shrink-0" stroke-width="2" aria-hidden="true" />
            ExitLogic
          </div>
        </div>

        <div class="divide-y divide-white/[0.06]">
          <div
            v-for="row in rows"
            :key="row.label"
            class="grid grid-cols-2 gap-3 p-4 sm:p-5 lg:grid-cols-[minmax(128px,152px)_1fr_1fr] lg:gap-0 lg:p-0"
          >
            <div
              class="col-span-2 flex items-center border-b border-white/[0.06] pb-3 font-mono text-[10px] uppercase tracking-[0.2em] text-[#00D9FF]/85 lg:col-span-1 lg:border-b-0 lg:border-r lg:border-white/[0.06] lg:bg-[#0a0e14]/35 lg:px-5 lg:py-6 lg:pb-6 lg:pt-6"
            >
              {{ row.label }}
            </div>

            <div
              class="flex gap-2.5 rounded-2xl border border-white/[0.06] bg-[#0a0e14]/55 p-4 text-[13px] leading-relaxed text-[#E8E8E8]/58 lg:rounded-none lg:border-0 lg:border-r lg:border-white/[0.06] lg:bg-[#0a0e14]/25 lg:p-6 lg:px-8"
            >
              <Minus
                class="mt-0.5 h-4 w-4 shrink-0 text-[#F4F4F4]/28"
                stroke-width="2"
                aria-hidden="true"
              />
              <span>{{ row.traditional }}</span>
            </div>

            <div
              class="flex gap-2.5 rounded-2xl border border-[#00D9FF]/28 bg-[linear-gradient(145deg,rgba(0,217,255,0.1)_0%,rgba(8,12,20,0.5)_100%)] p-4 text-[13px] leading-relaxed text-[#E8E8E8]/92 shadow-[inset_0_1px_0_rgba(0,217,255,0.12)] lg:rounded-none lg:border-0 lg:bg-[linear-gradient(90deg,rgba(0,217,255,0.07)_0%,rgba(8,12,20,0.35)_100%)] lg:p-6 lg:px-8 lg:shadow-none"
            >
              <Check class="mt-0.5 h-4 w-4 shrink-0 text-[#00D9FF]" stroke-width="2.25" aria-hidden="true" />
              <span>{{ row.exitlogic }}</span>
            </div>
          </div>
        </div>
      </div>

      <p class="font-mono mx-auto mt-8 max-w-2xl text-center text-[10px] uppercase tracking-[0.28em] text-[#F4F4F4]/35">
        Same job title · different leverage
      </p>
    </div>
  </section>
</template>
