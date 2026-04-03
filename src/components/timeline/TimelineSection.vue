<script setup lang="ts">
import { computed, nextTick, onMounted, onUnmounted, ref } from 'vue'
import { scrollInfo } from 'motion'
import TimelineNode from './TimelineNode.vue'
import ModuleMindset from './ModuleMindset.vue'
import ModuleAgents from './ModuleAgents.vue'
import ModuleWorkflows from './ModuleWorkflows.vue'

const sectionRef = ref<HTMLElement | null>(null)
const lineRef = ref<SVGLineElement | null>(null)
const glowRef = ref<SVGLineElement | null>(null)
const parallaxRef = ref<HTMLElement | null>(null)

const lineLen = ref(0)
const progress = ref(0)

let stopScroll: (() => void) | undefined

const activeNode = computed<1 | 2 | 3>(() => {
  const p = progress.value
  if (p < 0.36) return 1
  if (p < 0.68) return 2
  return 3
})

function applyLine(p: number) {
  const len = lineLen.value
  if (!lineRef.value || !len) return
  const off = len * (1 - p)
  lineRef.value.style.strokeDashoffset = String(off)
  if (glowRef.value) {
    glowRef.value.style.strokeDashoffset = String(off)
  }
}

onMounted(async () => {
  await nextTick()
  const el = sectionRef.value
  if (!el) return

  stopScroll = scrollInfo(
    (info) => {
      const p = info.y.progress
      progress.value = p
      applyLine(p)
      if (parallaxRef.value) {
        parallaxRef.value.style.transform = `translate3d(0, ${p * -100}px, 0)`
      }
    },
    { target: el, offset: ['start end', 'end start'] },
  )

  requestAnimationFrame(() => {
    if (lineRef.value) {
      lineLen.value = lineRef.value.getTotalLength()
      lineRef.value.style.strokeDasharray = `${lineLen.value}`
      lineRef.value.style.strokeDashoffset = `${lineLen.value}`
    }
    if (glowRef.value && lineLen.value) {
      glowRef.value.style.strokeDasharray = `${lineLen.value}`
      glowRef.value.style.strokeDashoffset = `${lineLen.value}`
    }
    applyLine(0)
  })
})

onUnmounted(() => {
  stopScroll?.()
})
</script>

<template>
  <section
    id="timeline"
    ref="sectionRef"
    class="relative overflow-hidden bg-[#080c14] py-32 sm:py-40"
  >
    <!-- Parallax depth layer -->
    <div
      ref="parallaxRef"
      class="pointer-events-none absolute inset-0 will-change-transform"
      aria-hidden="true"
    >
      <div
        class="absolute -left-1/4 top-1/4 h-96 w-96 rounded-full bg-[#00D9FF]/[0.04] blur-3xl"
      />
      <div
        class="absolute -right-1/4 bottom-1/3 h-[28rem] w-[28rem] rounded-full bg-[#00D9FF]/[0.03] blur-3xl"
      />
      <div
        class="absolute left-1/3 top-1/2 h-64 w-64 -translate-y-1/2 rounded-full bg-[#00D9FF]/[0.025] blur-2xl"
      />
    </div>

    <div class="relative z-10 mx-auto max-w-[90rem] px-5 sm:px-10 lg:px-14">
      <header class="mx-auto mb-20 max-w-3xl text-center md:mb-28">
        <p class="font-mono text-xs uppercase tracking-[0.28em] text-[#00D9FF]/80">
          trace · execution path
        </p>
        <h2 class="font-display mt-4 text-3xl font-bold tracking-[-0.03em] text-[#FAFAFA] sm:text-4xl md:text-5xl">
          Refactor stack
        </h2>
        <p class="font-sans mx-auto mt-5 max-w-2xl text-[15px] leading-relaxed text-[#F4F4F4]/55 md:text-base">
          Three live modules — mindset, agents, workflows — sequenced on one glowing circuit. Scroll to charge the line.
        </p>
      </header>

      <div
        class="grid grid-cols-[4.5rem_1fr] gap-x-6 gap-y-20 md:grid-cols-[5.5rem_1fr] md:gap-x-12 md:gap-y-28"
      >
        <!-- Continuous glowing trace + nodes -->
        <div
          class="relative col-start-1 row-start-1 row-end-4 flex flex-col items-center justify-between py-2 md:py-4"
        >
          <svg
            class="pointer-events-none absolute inset-0 h-full w-full overflow-visible"
            aria-hidden="true"
          >
            <defs>
              <filter id="traceGlow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="4" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              <linearGradient id="traceStroke" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stop-color="#00D9FF" stop-opacity="0.25" />
                <stop offset="100%" stop-color="#00D9FF" stop-opacity="1" />
              </linearGradient>
            </defs>
            <!-- Glow underlay -->
            <line
              ref="glowRef"
              x1="50%"
              y1="0%"
              x2="50%"
              y2="100%"
              stroke="#00D9FF"
              stroke-width="10"
              stroke-linecap="round"
              opacity="0.35"
              filter="url(#traceGlow)"
            />
            <!-- Core circuit -->
            <line
              ref="lineRef"
              x1="50%"
              y1="0%"
              x2="50%"
              y2="100%"
              stroke="url(#traceStroke)"
              stroke-width="2.5"
              stroke-linecap="round"
            />
          </svg>

          <TimelineNode :n="1" :active="activeNode === 1" />
          <TimelineNode :n="2" :active="activeNode === 2" />
          <TimelineNode :n="3" :active="activeNode === 3" />
        </div>

        <ModuleMindset class="col-start-2 row-start-1" />
        <ModuleAgents class="col-start-2 row-start-2" />
        <ModuleWorkflows class="col-start-2 row-start-3" />
      </div>
    </div>
  </section>
</template>
