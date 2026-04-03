<script setup lang="ts">
import { AlertTriangle } from 'lucide-vue-next'

const truths = [
  "Your boss is buying a BMW with your overtime.",
  "The 'safe' 9-to-5 is the biggest risk you're taking.",
  "AI is replacing coders who don't know how to lead AI.",
] as const
</script>

<template>
  <section
    id="hard-truth"
    class="relative overflow-hidden border-y border-white/[0.06] bg-[#080c14] py-28 sm:py-36 lg:py-44"
  >
    <div
      class="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_100%_60%_at_50%_-10%,rgba(0,217,255,0.07),transparent_50%)]"
      aria-hidden="true"
    />
    <div
      class="pointer-events-none absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00D9FF]/25 to-transparent"
      aria-hidden="true"
    />

    <div class="relative mx-auto max-w-[90rem] px-5 sm:px-10 lg:px-14">
      <div class="mx-auto mb-16 max-w-4xl text-center sm:mb-20">
        <div class="mb-6 flex items-center justify-center gap-3">
          <AlertTriangle class="h-6 w-6 text-[#00D9FF]/90" stroke-width="1.5" aria-hidden="true" />
          <p class="font-mono text-[10px] uppercase tracking-[0.45em] text-[#00D9FF]/85">the hard truth</p>
        </div>
        <h2
          class="font-display text-[clamp(1.75rem,4vw,2.85rem)] font-extrabold leading-[1.15] tracking-[-0.03em] text-[#FAFAFA]"
        >
          The office isn't neutral. It's designed to extract your best years.
        </h2>
      </div>

      <div class="grid gap-5 md:grid-cols-3 md:gap-6 lg:gap-8">
        <article
          v-for="(line, i) in truths"
          :key="i"
          data-stagger
          class="group relative overflow-hidden rounded-2xl border border-white/[0.08] bg-[#0D1117]/60 p-8 transition duration-500 ease-out hover:-translate-y-1 hover:border-[#00D9FF]/30 hover:shadow-[0_24px_64px_rgba(0,0,0,0.45)]"
        >
          <span
            class="font-display mb-5 block text-4xl font-black tabular-nums text-[#00D9FF]/25 transition duration-500 group-hover:text-[#00D9FF]/45"
            aria-hidden="true"
            >{{ String(i + 1).padStart(2, '0') }}</span
          >
          <p class="font-sans text-base font-medium leading-relaxed text-[#E8E8E8]/88 sm:text-lg">
            {{ line }}
          </p>
          <div
            class="pointer-events-none absolute -bottom-8 -right-8 h-32 w-32 rounded-full bg-[#00D9FF]/[0.04] blur-2xl transition duration-500 group-hover:bg-[#00D9FF]/[0.08]"
          />
        </article>
      </div>
    </div>
  </section>
</template>
