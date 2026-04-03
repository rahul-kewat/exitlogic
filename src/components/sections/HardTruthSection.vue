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
    class="relative border-y border-white/[0.08] bg-[#05080d] py-24 sm:py-32"
  >
    <div
      class="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_0%,rgba(0,217,255,0.06),transparent_55%)]"
      aria-hidden="true"
    />
    <div class="relative mx-auto max-w-[90rem] px-5 sm:px-10 lg:px-14">
      <div class="mb-12 flex items-center gap-3 sm:mb-16">
        <AlertTriangle class="h-6 w-6 text-[#00D9FF]/90" stroke-width="1.5" aria-hidden="true" />
        <p class="font-mono text-[10px] uppercase tracking-[0.45em] text-[#00D9FF]/85">the hard truth</p>
      </div>
      <h2
        class="font-display max-w-4xl text-[clamp(1.75rem,4vw,2.75rem)] font-extrabold leading-tight tracking-[-0.03em] text-[#FAFAFA]"
      >
        The office isn't neutral. It's designed to extract your best years.
      </h2>
      <ul class="mt-12 max-w-3xl space-y-8 border-l-2 border-[#00D9FF]/35 pl-8 sm:mt-14">
        <li
          v-for="(line, i) in truths"
          :key="i"
          class="font-sans text-lg font-medium leading-relaxed text-[#E8E8E8]/88 sm:text-xl"
        >
          {{ line }}
        </li>
      </ul>
    </div>
  </section>
</template>
