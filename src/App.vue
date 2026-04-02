<script setup lang="ts">
import InteractiveCircuits from './components/InteractiveCircuits.vue'
import ScrollSection from './components/ScrollSection.vue'
import SiteNav from './components/SiteNav.vue'
import Terminal from './components/Terminal.vue'
import TechMarquee from './components/TechMarquee.vue'
import UnlearningCards from './components/UnlearningCards.vue'
import PricingSection from './components/PricingSection.vue'
import TimelineSection from './components/timeline/TimelineSection.vue'
import { ArrowRight } from 'lucide-vue-next'
</script>

<template>
  <SiteNav />

  <main class="relative z-10">
    <ScrollSection>
      <section id="hero" class="relative min-h-[100dvh] overflow-hidden">
        <div class="pointer-events-none absolute inset-0 z-0">
          <InteractiveCircuits />
        </div>
        <div
          class="relative z-10 mx-auto flex min-h-[100dvh] max-w-6xl flex-col justify-center px-5 pb-24 pt-28 sm:px-8 sm:pb-32 sm:pt-32"
        >
        <p
          class="font-mono mb-6 text-[11px] uppercase tracking-[0.35em] text-[#00D9FF]/75 sm:text-xs"
        >
          // career.refactor()
        </p>
        <h1
          class="font-display max-w-4xl text-[clamp(2.5rem,8vw,5rem)] font-black leading-[0.95] tracking-[-0.04em] text-[#F4F4F4]"
        >
          THE LOGIC IS BROKEN.
        </h1>
        <p
          class="mt-8 max-w-xl text-lg leading-relaxed text-[#F4F4F4]/65 sm:text-xl"
        >
          Your 9-to-5 is a legacy system. It’s time to refactor your career.
        </p>
        <div class="mt-12 flex flex-wrap items-center gap-5">
          <a
            id="hero-cta"
            href="#unlearning"
            class="font-display group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-[#00D9FF] px-8 py-4 text-base font-bold tracking-tight text-[#000000] shadow-[0_0_32px_rgba(0,217,255,0.45)] transition duration-300 hover:shadow-[0_0_56px_rgba(0,217,255,0.65)]"
          >
            <span class="relative z-10">Start the Exit Logic</span>
            <ArrowRight
              class="relative z-10 h-5 w-5 transition group-hover:translate-x-0.5"
              stroke-width="2.25"
              aria-hidden="true"
            />
            <span
              class="absolute inset-0 bg-gradient-to-r from-white/25 to-transparent opacity-0 transition group-hover:opacity-100"
            />
          </a>
          <span class="font-mono text-xs text-[#F4F4F4]/35">esc to rethink · enter to ship</span>
        </div>
        </div>
      </section>
    </ScrollSection>

    <ScrollSection>
      <section
        id="unlearning"
        class="mx-auto max-w-6xl px-5 py-24 sm:px-8 sm:py-32"
      >
        <div class="mb-14 max-w-2xl">
          <p class="font-mono mb-3 text-xs uppercase tracking-[0.28em] text-[#00D9FF]/80">
            module: unlearning
          </p>
          <h2 class="font-display text-3xl font-bold tracking-tight text-[#F4F4F4] sm:text-4xl">
            The Unlearning
          </h2>
          <p class="mt-4 text-[#F4F4F4]/55">
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
      <section id="stack" class="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-24">
        <div class="mb-10 max-w-2xl">
          <p class="font-mono mb-3 text-xs uppercase tracking-[0.28em] text-[#00D9FF]/80">
            dependencies
          </p>
          <h2 class="font-display text-3xl font-bold tracking-tight text-[#F4F4F4] sm:text-4xl">
            What we ship with
          </h2>
        </div>
        <TechMarquee />
      </section>
    </ScrollSection>

    <ScrollSection>
      <section id="pricing" class="py-24 sm:py-32">
        <PricingSection />
      </section>
    </ScrollSection>

    <ScrollSection>
      <section
        id="terminal"
        class="mx-auto max-w-6xl px-5 py-24 sm:px-8 sm:py-32"
      >
        <div class="mb-10 max-w-2xl">
          <p class="font-mono mb-3 text-xs uppercase tracking-[0.28em] text-[#00D9FF]/80">
            stdout
          </p>
          <h2 class="font-display text-3xl font-bold tracking-tight text-[#F4F4F4] sm:text-4xl">
            Commit the mindset
          </h2>
          <p class="mt-4 text-[#F4F4F4]/55">
            Watch the refactor land — your terminal already knows the truth.
          </p>
        </div>
        <Terminal />
      </section>
    </ScrollSection>

    <ScrollSection>
      <footer
        class="mx-auto max-w-6xl border-t border-white/[0.06] px-5 py-16 sm:px-8"
      >
        <div class="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p class="font-display text-lg font-bold text-[#F4F4F4]">ExitLogic</p>
            <p class="font-mono mt-2 text-xs text-[#F4F4F4]/40">
              © {{ new Date().getFullYear() }} · built for the post-salary era
            </p>
          </div>
          <p class="max-w-sm text-sm leading-relaxed text-[#F4F4F4]/45">
            Precision typography. Motion that breathes. A surface that feels expensive — because your exit strategy should.
          </p>
        </div>
      </footer>
    </ScrollSection>
  </main>
</template>
