<script setup lang="ts">
import { Brain, Link2, Rocket } from 'lucide-vue-next'

const cards = [
  {
    title: 'Unlearn the default path',
    body: 'Institutional scripts optimize for safety, not sovereignty. Name the assumptions you inherited without audit.',
    icon: Brain,
  },
  {
    title: 'Decouple from legacy incentives',
    body: 'Your calendar is an API surface. Refactor commitments the way you would untangle a monolith.',
    icon: Link2,
  },
  {
    title: 'Ship toward autonomy',
    body: 'Small experiments beat big plans. Version your career like software: iterate, measure, merge forward.',
    icon: Rocket,
  },
] as const
</script>

<template>
  <div class="grid gap-6 md:grid-cols-3">
    <article
      v-for="card in cards"
      :key="card.title"
      class="glass-card group p-8 transition duration-500 ease-out hover:border-[#00D9FF]/35 hover:shadow-[0_0_48px_rgba(0,217,255,0.15)]"
    >
      <div
        class="pointer-events-none absolute -right-8 -top-8 z-0 h-32 w-32 rounded-full bg-[#00D9FF]/[0.06] blur-2xl transition duration-500 group-hover:bg-[#00D9FF]/[0.12]"
      />
      <component
        :is="card.icon"
        class="relative z-[1] mb-5 h-9 w-9 text-[#00D9FF]/85 transition duration-300 group-hover:text-[#00D9FF]"
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
