<script setup lang="ts">
import { defineAsyncComponent, onMounted, ref } from 'vue'
import { animate } from 'motion'
import HeroHeadline from './components/hero/HeroHeadline.vue'
import HeroMeta from './components/hero/HeroMeta.vue'
import HeroCursorGlow from './components/hero/HeroCursorGlow.vue'
import PageIntroOverlay from './components/hero/PageIntroOverlay.vue'
import ScrollSection from './components/ScrollSection.vue'
import SiteNav from './components/SiteNav.vue'
import Terminal from './components/Terminal.vue'
import TechMarquee from './components/TechMarquee.vue'
import UnlearningCards from './components/UnlearningCards.vue'
import PricingSection from './components/PricingSection.vue'
import TimelineSection from './components/timeline/TimelineSection.vue'

/** Lazy-load Three.js so first paint stays light. */
const HeroWebGL = defineAsyncComponent(() => import('./components/hero/HeroWebGL.vue'))

const eyebrowRef = ref<HTMLElement | null>(null)

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
              career.refactor · exit architecture
            </p>

            <HeroHeadline />

            <HeroMeta />
          </div>
        </div>
      </section>
    </ScrollSection>

    <ScrollSection>
      <section
        id="unlearning"
        class="mx-auto max-w-[90rem] px-5 py-28 sm:px-10 sm:py-36 lg:px-14"
      >
        <div class="mb-16 max-w-3xl sm:mb-20">
          <p class="font-mono mb-4 text-[10px] uppercase tracking-[0.45em] text-[#00D9FF]/75">
            module · unlearning
          </p>
          <h2 class="font-display text-[clamp(1.875rem,4vw,3rem)] font-bold tracking-[-0.03em] text-[#FAFAFA]">
            The Unlearning
          </h2>
          <p class="font-sans mt-6 max-w-2xl text-lg leading-relaxed text-[#E8E8E8]/55">
            Glass panels, sharp intent — three moves to migrate out of default-mode employment.
          </p>
        </div>
        <UnlearningCards />
      </section>
    </ScrollSection>

    <ScrollSection>
      <TimelineSection />
    </ScrollSection>

    <ScrollSection>
      <section id="stack" class="mx-auto max-w-[90rem] px-5 py-20 sm:px-10 sm:py-28 lg:px-14">
        <div class="mb-12 max-w-3xl sm:mb-14">
          <p class="font-mono mb-4 text-[10px] uppercase tracking-[0.45em] text-[#00D9FF]/75">
            dependencies
          </p>
          <h2 class="font-display text-[clamp(1.875rem,4vw,3rem)] font-bold tracking-[-0.03em] text-[#FAFAFA]">
            What we ship with
          </h2>
        </div>
        <TechMarquee />
      </section>
    </ScrollSection>

    <ScrollSection>
      <section id="pricing" class="py-28 sm:py-36">
        <PricingSection />
      </section>
    </ScrollSection>

    <ScrollSection>
      <section
        id="terminal"
        class="mx-auto max-w-[90rem] px-5 py-28 sm:px-10 sm:py-36 lg:px-14"
      >
        <div class="mb-12 max-w-3xl sm:mb-14">
          <p class="font-mono mb-4 text-[10px] uppercase tracking-[0.45em] text-[#00D9FF]/75">
            stdout
          </p>
          <h2 class="font-display text-[clamp(1.875rem,4vw,3rem)] font-bold tracking-[-0.03em] text-[#FAFAFA]">
            Commit the mindset
          </h2>
          <p class="font-sans mt-6 max-w-2xl text-lg leading-relaxed text-[#E8E8E8]/55">
            Watch the refactor land — your terminal already knows the truth.
          </p>
        </div>
        <Terminal />
      </section>
    </ScrollSection>

    <ScrollSection>
      <footer
        class="mx-auto max-w-[90rem] border-t border-white/[0.07] px-5 py-20 sm:px-10 lg:px-14"
      >
        <div class="flex flex-col gap-10 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p class="font-display text-xl font-bold tracking-tight text-[#FAFAFA]">ExitLogic</p>
            <p class="font-mono mt-3 text-[10px] uppercase tracking-[0.28em] text-[#F4F4F4]/38">
              © {{ new Date().getFullYear() }} · post-salary era
            </p>
          </div>
          <p class="max-w-md font-sans text-sm leading-relaxed text-[#E8E8E8]/42">
            Precision typography. Motion that breathes. A surface that feels expensive — because your exit strategy
            should.
          </p>
        </div>
      </footer>
    </ScrollSection>
  </main>
</template>
