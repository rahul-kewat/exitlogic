<script setup lang="ts">
import { defineAsyncComponent, onMounted, ref } from 'vue'
import { animate } from 'motion'
import HeroHeadline from './components/hero/HeroHeadline.vue'
import HeroMeta from './components/hero/HeroMeta.vue'
import HeroCursorGlow from './components/hero/HeroCursorGlow.vue'
import PageIntroOverlay from './components/hero/PageIntroOverlay.vue'
import ScrollSection from './components/ScrollSection.vue'
import SiteNav from './components/SiteNav.vue'
import LogicTerminal from './components/LogicTerminal.vue'
import TechMarquee from './components/TechMarquee.vue'
import UnlearningCards from './components/UnlearningCards.vue'
import PricingSection from './components/PricingSection.vue'
import TimelineSection from './components/timeline/TimelineSection.vue'
import HardTruthSection from './components/sections/HardTruthSection.vue'
import LifetimeMasterySection from './components/sections/LifetimeMasterySection.vue'
import DeveloperComparison from './components/sections/DeveloperComparison.vue'
import LaunchNotify from './components/LaunchNotify.vue'

/** Lazy-load Three.js so first paint stays light. */
const HeroWebGL = defineAsyncComponent(() => import('./components/hero/HeroWebGL.vue'))

const eyebrowRef = ref<HTMLElement | null>(null)

function onTerminalCommit() {
  // Optional: sync with HeroWebGL / background (e.g. faster particle drift) — wire when needed
}

onMounted(() => {
  const el = eyebrowRef.value
  if (!el) return
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
  el.style.opacity = '0'
  el.style.transform = 'translate3d(0, 14px, 0)'
  animate(
    el,
    { opacity: 1, transform: 'translate3d(0, 0, 0)' },
    {
      delay: 0.06,
      duration: 0.85,
      ease: [0.16, 1, 0.3, 1],
    },
  )
})
</script>

<template>
  <PageIntroOverlay />
  <SiteNav />

  <main class="relative z-10">
    <ScrollSection>
      <section id="hero" class="relative min-h-[100dvh] overflow-hidden bg-[#000205]">
        <div class="pointer-events-none absolute inset-0 z-0">
          <HeroWebGL />
          <div
            class="absolute inset-0 bg-gradient-to-b from-[#000205]/20 via-transparent to-[#000205] sm:from-[#000205]/40"
            aria-hidden="true"
          />
          <div
            class="absolute inset-0 bg-[radial-gradient(ellipse_90%_70%_at_50%_100%,rgba(0,0,0,0.85),transparent_65%)]"
            aria-hidden="true"
          />
          <div
            class="pointer-events-none absolute inset-0 opacity-[0.035] mix-blend-overlay [background-image:url('data:image/svg+xml,%3Csvg viewBox=%220 0 256 256%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22n%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.85%22 numOctaves=%224%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23n)%22/%3E%3C/svg%3E')]"
            aria-hidden="true"
          />
        </div>

        <HeroCursorGlow hero-selector="#hero" />

        <div
          class="relative z-10 mx-auto flex min-h-[100dvh] max-w-[90rem] flex-col justify-end px-5 pb-20 pt-32 sm:justify-center sm:px-10 sm:pb-28 sm:pt-36 lg:px-14"
        >
          <div class="max-w-5xl">
            <p
              ref="eyebrowRef"
              class="font-mono mb-8 text-[10px] uppercase tracking-[0.55em] text-[#00D9FF]/70 sm:mb-10 sm:text-[11px] will-change-transform"
            >
              lifetime membership · full stack
            </p>

            <HeroHeadline />

            <HeroMeta />
          </div>
        </div>
      </section>
    </ScrollSection>

    <ScrollSection>
      <section
        id="notify"
        class="relative border-t border-white/[0.05] bg-[#000205] py-12 sm:py-14"
        aria-labelledby="notify-heading"
      >
        <LaunchNotify />
      </section>
    </ScrollSection>

    <ScrollSection stagger-children>
      <HardTruthSection />
    </ScrollSection>

    <ScrollSection>
      <LifetimeMasterySection />
    </ScrollSection>

    <ScrollSection stagger-children>
      <section
        id="ai-workflow"
        class="relative border-t border-white/[0.05] bg-[#000205] py-28 sm:py-36 lg:py-44"
      >
        <div
          class="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,transparent_0%,rgba(0,217,255,0.02)_50%,transparent_100%)]"
          aria-hidden="true"
        />
        <div class="relative mx-auto max-w-[90rem] px-5 sm:px-10 lg:px-14">
          <div class="mx-auto mb-16 max-w-3xl text-center sm:mb-20">
            <p class="font-mono mb-4 text-[10px] uppercase tracking-[0.45em] text-[#00D9FF]/75">
              curriculum
            </p>
            <h2 class="font-display text-[clamp(1.875rem,4vw,3rem)] font-bold tracking-[-0.03em] text-[#FAFAFA]">
              Ship the work the market actually buys
            </h2>
            <p class="font-sans mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-[#E8E8E8]/55">
              Six modules—from architecture to commercial delivery. Taught for operating leverage, not for ticking lessons
              off a list.
            </p>
          </div>
          <UnlearningCards />
        </div>
      </section>
    </ScrollSection>

    <ScrollSection>
      <TimelineSection />
    </ScrollSection>

    <ScrollSection>
      <section id="stack" class="relative bg-[#000205] py-24 sm:py-32 lg:py-40">
        <div
          class="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/[0.07] to-transparent"
          aria-hidden="true"
        />
        <div class="relative mx-auto max-w-[90rem] px-5 sm:px-10 lg:px-14">
          <div class="mx-auto mb-14 max-w-3xl text-center sm:mb-16">
            <p class="font-mono mb-4 text-[10px] uppercase tracking-[0.45em] text-[#00D9FF]/75">
              curriculum · AI delivery
            </p>
            <h2 class="font-display text-[clamp(1.875rem,4vw,3rem)] font-bold tracking-[-0.03em] text-[#FAFAFA]">
              The capabilities clients pay for now
            </h2>
            <p class="font-sans mx-auto mt-4 max-w-2xl text-[#E8E8E8]/50">
              Prompt engineering, agents, RAG, MCP, evals, and the rest of the modern surface—taught as billable
              practice, not tool hype. Select any lane below for concrete learning outcomes.
            </p>
          </div>
          <TechMarquee />
        </div>
      </section>
    </ScrollSection>

    <ScrollSection>
      <DeveloperComparison />
    </ScrollSection>

    <ScrollSection>
      <section id="pricing" class="relative border-t border-white/[0.04] bg-[#000205] py-28 sm:py-36">
        <div class="relative">
          <PricingSection />
        </div>
      </section>
    </ScrollSection>

    <ScrollSection>
      <LogicTerminal @commit-complete="onTerminalCommit" />
    </ScrollSection>

    <ScrollSection>
      <footer
        class="relative border-t border-white/[0.07] bg-[#000205] px-5 py-24 sm:px-10 lg:px-14"
      >
        <div
          class="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#00D9FF]/15 to-transparent"
          aria-hidden="true"
        />
        <div class="mx-auto flex max-w-[90rem] flex-col gap-12 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p class="font-display text-xl font-bold tracking-tight text-[#FAFAFA]">ExitLogic</p>
            <p class="font-mono mt-3 text-[10px] uppercase tracking-[0.28em] text-[#F4F4F4]/38">
              © {{ new Date().getFullYear() }} · lifetime membership, professional use
            </p>
          </div>
          <p class="max-w-md font-sans text-sm leading-relaxed text-[#E8E8E8]/42">
            Enrollment terms and public pricing are published with each open window.
          </p>
        </div>
      </footer>
    </ScrollSection>
  </main>
</template>
