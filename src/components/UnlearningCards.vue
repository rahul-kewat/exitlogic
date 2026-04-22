<script setup lang="ts">
import { Bot, GitMerge, Sparkles, Target, TestTube, Zap } from 'lucide-vue-next'

const cards = [
  {
    title: 'AI-driven architecture',
    body: 'Shape systems quickly: spec the stack, stand up structure, and let AI absorb boilerplate you no longer need to type by hand.',
    icon: Sparkles,
  },
  {
    title: 'Autonomous testing',
    body: 'Use AI to widen coverage and surface edge cases before production. Tests stay a quality gate, not a weekend ritual.',
    icon: TestTube,
  },
  {
    title: 'High-leverage delivery',
    body: 'Cursor-style workflows to tighten delivery time—so the calendar matches scope you actually want to run.',
    icon: Zap,
  },
  {
    title: 'Agentic pipelines',
    body: 'Sequence research, specification, and implementation with clear handoffs—you own orchestration, agents handle volume.',
    icon: Bot,
  },
  {
    title: 'Merge-ready delivery',
    body: 'Diffs, checks, and pull requests your reviewers can act on in one pass. Fewer review loops, less idle time.',
    icon: GitMerge,
  },
  {
    title: 'Commercials & offers',
    body: 'Scope, pricing, and proof structured so the sale is the outcome, not a tally of hours—without undermining trust.',
    icon: Target,
  },
] as const
</script>

<template>
  <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
    <article
      v-for="card in cards"
      :key="card.title"
      data-stagger
      class="glass-card group relative rounded-3xl p-9 transition duration-500 ease-out hover:-translate-y-2 hover:border-[#00D9FF]/40 hover:shadow-[0_32px_80px_rgba(0,217,255,0.12)]"
    >
      <div
        class="pointer-events-none absolute -right-8 -top-8 z-0 h-36 w-36 rounded-full bg-[#00D9FF]/[0.06] blur-2xl transition duration-500 group-hover:bg-[#00D9FF]/[0.12]"
      />
      <component
        :is="card.icon"
        class="relative z-[1] mb-5 h-10 w-10 text-[#00D9FF]/85 transition duration-500 group-hover:scale-105 group-hover:text-[#00D9FF]"
        stroke-width="1.25"
        aria-hidden="true"
      />
      <h3 class="relative z-[1] font-display mb-3 text-xl font-bold tracking-tight text-[#F4F4F4]">
        {{ card.title }}
      </h3>
      <p class="relative z-[1] text-[15px] leading-relaxed text-[#F4F4F4]/60">
        {{ card.body }}
      </p>
    </article>
  </div>
</template>
