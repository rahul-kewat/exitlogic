<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { animate } from 'motion'
import { ArrowRight } from 'lucide-vue-next'

const root = ref<HTMLElement | null>(null)

onMounted(() => {
  const el = root.value
  if (!el) return
  const nodes = el.querySelectorAll<HTMLElement>('[data-reveal]')
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    nodes.forEach((n) => {
      n.style.opacity = '1'
      n.style.transform = 'none'
    })
    return
  }
  nodes.forEach((n) => {
    n.style.opacity = '0'
    n.style.transform = 'translate3d(0, 1.25rem, 0)'
  })
  animate(
    nodes,
    { opacity: 1, transform: 'translate3d(0, 0, 0)' },
    {
      delay: (_el, i) => 0.72 + i * 0.1,
      duration: 0.85,
      ease: [0.16, 1, 0.3, 1],
    },
  )
})
</script>

<template>
  <div ref="root">
    <p
      data-reveal
      class="font-sans mt-10 max-w-2xl text-[1.05rem] leading-[1.65] text-[#E8E8E8]/75 sm:mt-12 sm:text-xl sm:leading-relaxed"
    >
      Master the AI-powered developer stack—design, code, architecture, testing. This isn't just a course; it's your
      unfair advantage in a world where average developers are becoming obsolete.
    </p>

    <div
      data-reveal
      class="mt-12 flex flex-col gap-5 sm:mt-14 sm:flex-row sm:flex-wrap sm:items-center sm:gap-6"
    >
      <a
        id="hero-cta"
        href="#pricing"
        class="font-display group relative inline-flex w-fit items-center justify-center gap-2 overflow-hidden rounded-full bg-[#00D9FF] px-10 py-4 text-[14px] font-bold tracking-tight text-[#000205] shadow-[0_0_40px_rgba(0,217,255,0.35)] transition duration-500 ease-out hover:shadow-[0_0_64px_rgba(0,217,255,0.55)] sm:text-[15px]"
      >
        <span class="relative z-10">Secure My Future Access</span>
        <ArrowRight
          class="relative z-10 h-5 w-5 transition duration-300 group-hover:translate-x-0.5"
          stroke-width="2.25"
          aria-hidden="true"
        />
        <span
          class="absolute inset-0 bg-gradient-to-r from-white/30 to-transparent opacity-0 transition duration-500 group-hover:opacity-100"
        />
      </a>
      <a
        href="#comparison"
        class="font-display inline-flex w-fit items-center justify-center rounded-full border border-white/[0.14] bg-white/[0.03] px-8 py-3.5 text-[13px] font-semibold tracking-wide text-[#F4F4F4]/90 backdrop-blur-sm transition duration-300 hover:border-[#00D9FF]/35 hover:bg-white/[0.06]"
      >
        See the split
      </a>
    </div>

    <p
      data-reveal
      class="font-sans mt-6 max-w-lg text-sm leading-relaxed text-[#E8E8E8]/50 sm:text-[15px]"
    >
      Join 500+ developers who decided to stop asking for permission.
    </p>

    <p
      data-reveal
      class="font-mono mt-8 text-[10px] uppercase tracking-[0.32em] text-[#F4F4F4]/28 sm:mt-10"
    >
      scroll · the vault is waiting
    </p>
  </div>
</template>
