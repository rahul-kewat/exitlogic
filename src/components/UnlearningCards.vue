<script setup lang="ts">
import { Bot, GitMerge, Sparkles, Target, TestTube, Zap } from 'lucide-vue-next'

const cards = [
  {
    title: 'AI-driven architecture',
    body: 'Design systems in minutes, not days—spec the stack, ship the skeleton, let AI handle the boilerplate you used to dread.',
    icon: Sparkles,
  },
  {
    title: 'Autonomous testing',
    body: 'Let AI surface edge cases before your client does. Tests become a safety net, not a weekend tax.',
    icon: TestTube,
  },
  {
    title: 'Rapid freelancing',
    body: 'Learn how to compress forty hours of grind into four using the Cursor + AI workflow—so your calendar matches your ambition.',
    icon: Zap,
  },
  {
    title: 'Agentic pipelines',
    body: 'Chain research, spec, and implementation agents like microservices—you steer the orchestration while the swarm does the heavy lifting.',
    icon: Bot,
  },
  {
    title: 'Merge-ready delivery',
    body: 'AI-assisted diffs, security passes, and PRs your lead can approve fast—fewer review cycles, zero “I’ll look Monday” debt.',
    icon: GitMerge,
  },
  {
    title: 'Offer & leverage',
    body: 'Package scope, pricing, and proof so clients buy the outcome—not your hours. That’s how you escape the hourly trap without burning trust.',
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
