<script setup lang="ts">
import { Terminal } from 'lucide-vue-next'
</script>

<template>
  <header
    class="fixed left-0 right-0 top-0 z-50 border-b border-white/[0.06] bg-[#000000]/70 backdrop-blur-md"
  >
    <div class="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 sm:px-8">
      <a href="#" class="font-display group flex items-center gap-2 text-lg font-bold tracking-tight text-[#F4F4F4]">
        <span
          class="inline-block h-2 w-2 rounded-full bg-[#00D9FF] shadow-[0_0_12px_rgba(0,217,255,0.8)] transition group-hover:shadow-[0_0_20px_rgba(0,217,255,1)]"
        />
        ExitLogic
      </a>
      <nav class="hidden items-center gap-10 text-sm text-[#F4F4F4]/55 sm:flex" aria-label="Primary">
        <a class="transition hover:text-[#00D9FF]" href="#unlearning">The Unlearning</a>
        <a class="transition hover:text-[#00D9FF]" href="#stack">Stack</a>
        <a class="transition hover:text-[#00D9FF]" href="#pricing">Pricing</a>
        <a class="transition hover:text-[#00D9FF]" href="#terminal">Terminal</a>
      </nav>
      <a
        href="#hero-cta"
        class="font-mono hidden items-center gap-2 rounded-lg border border-white/10 px-3 py-1.5 text-[11px] text-[#F4F4F4]/70 transition hover:border-[#00D9FF]/40 hover:text-[#00D9FF] sm:inline-flex"
      >
        <Terminal class="h-3.5 w-3.5" stroke-width="1.5" aria-hidden="true" />
        v1.0.0
      </a>
    </div>
  </header>
</template>
