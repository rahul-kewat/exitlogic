<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { animate } from 'motion'
import { Terminal } from 'lucide-vue-next'

const headerRef = ref<HTMLElement | null>(null)

onMounted(() => {
  const el = headerRef.value
  if (!el) return
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
  el.style.opacity = '0'
  el.style.transform = 'translate3d(0, -18px, 0)'
  animate(
    el,
    { opacity: 1, transform: 'translate3d(0, 0, 0)' },
    {
      delay: 0.12,
      duration: 0.85,
      ease: [0.16, 1, 0.3, 1],
    },
  )
})
</script>

<template>
  <header
    ref="headerRef"
    class="fixed left-0 right-0 top-0 z-[110] border-b border-white/[0.07] bg-[#000205]/55 backdrop-blur-xl backdrop-saturate-150 will-change-transform"
  >
    <div class="mx-auto flex max-w-[90rem] items-center justify-between px-5 py-5 sm:px-10 lg:px-14">
      <a
        href="#hero"
        class="font-display group flex items-center gap-2.5 text-[15px] font-bold tracking-tight text-[#FAFAFA]"
      >
        <span
          class="inline-block h-2 w-2 rounded-full bg-[#00D9FF] shadow-[0_0_14px_rgba(0,217,255,0.75)] transition duration-500 group-hover:shadow-[0_0_22px_rgba(0,217,255,1)]"
        />
        ExitLogic
      </a>
      <nav
        class="hidden flex-wrap items-center justify-end gap-x-6 gap-y-2 text-[10px] font-medium uppercase tracking-[0.22em] text-[#E8E8E8]/45 lg:flex lg:gap-x-8"
        aria-label="Primary"
      >
        <a class="transition duration-300 hover:text-[#00D9FF]" href="#hard-truth">Truth</a>
        <a class="transition duration-300 hover:text-[#00D9FF]" href="#lifetime-mastery">Vault</a>
        <a class="transition duration-300 hover:text-[#00D9FF]" href="#ai-workflow">AI flow</a>
        <a class="transition duration-300 hover:text-[#00D9FF]" href="#timeline">Path</a>
        <a class="transition duration-300 hover:text-[#00D9FF]" href="#stack">Stack</a>
        <a class="transition duration-300 hover:text-[#00D9FF]" href="#comparison">Split</a>
        <a class="transition duration-300 hover:text-[#00D9FF]" href="#pricing">Pricing</a>
        <a class="transition duration-300 hover:text-[#00D9FF]" href="#terminal">Terminal</a>
      </nav>
      <a
        href="#hero-cta"
        class="font-mono hidden items-center gap-2 rounded-full border border-white/[0.1] bg-white/[0.04] px-3.5 py-2 text-[10px] uppercase tracking-[0.2em] text-[#E8E8E8]/65 transition hover:border-[#00D9FF]/35 hover:text-[#00D9FF] sm:inline-flex"
      >
        <Terminal class="h-3.5 w-3.5" stroke-width="1.5" aria-hidden="true" />
        v1.0.0
      </a>
    </div>
  </header>
</template>
