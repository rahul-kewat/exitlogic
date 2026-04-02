<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import { revealOnScroll } from './useTimelineMotion'

const root = ref<HTMLElement | null>(null)
let stopReveal: (() => void) | undefined

const p1 = ref<SVGPathElement | null>(null)
const p2 = ref<SVGPathElement | null>(null)
const p3 = ref<SVGPathElement | null>(null)
const p4 = ref<SVGPathElement | null>(null)

function prepPath(el: SVGPathElement | null) {
  if (!el) return
  const len = el.getTotalLength()
  el.style.strokeDasharray = `${len}`
  el.style.strokeDashoffset = `${len}`
}

onMounted(() => {
  if (root.value) stopReveal = revealOnScroll(root.value, false)
  requestAnimationFrame(() => {
    prepPath(p1.value)
    prepPath(p2.value)
    prepPath(p3.value)
    prepPath(p4.value)
  })
})

onUnmounted(() => stopReveal?.())
</script>

<template>
  <div ref="root" class="timeline-module opacity-0 will-change-[transform,opacity,filter]">
    <div class="mb-4">
      <p class="font-mono text-[11px] uppercase tracking-[0.28em] text-[#00D9FF]/85">02 · Turbo mode / agents</p>
      <h3 class="font-sans mt-2 text-2xl font-semibold tracking-tight text-[#F4F4F4] md:text-3xl">
        Autonomous routing
      </h3>
      <p class="font-sans mt-2 max-w-xl text-[15px] leading-relaxed text-[#F4F4F4]/55">
        Intent enters cold. Agents warm the path — contracts, outreach, and delivery traced in real time.
      </p>
    </div>

    <div class="glass-card relative overflow-hidden bg-gradient-to-b from-[#05080c]/80 to-black/60 p-6 md:p-8">
      <svg
        class="mx-auto h-[220px] w-full max-w-md md:h-[260px]"
        viewBox="0 0 400 260"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="traceGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="#00D9FF" stop-opacity="0" />
            <stop offset="50%" stop-color="#00D9FF" stop-opacity="1" />
            <stop offset="100%" stop-color="#00D9FF" stop-opacity="0" />
          </linearGradient>
        </defs>

        <g>
          <rect x="170" y="16" width="60" height="28" rx="6" stroke="rgba(0,217,255,0.35)" stroke-width="1.2" fill="rgba(0,217,255,0.06)" />
          <text x="200" y="34" text-anchor="middle" fill="#F4F4F4" class="font-mono" style="font-size: 10px">Intent</text>

          <rect x="32" y="116" width="72" height="28" rx="6" stroke="rgba(0,217,255,0.35)" stroke-width="1.2" fill="rgba(0,217,255,0.06)" />
          <text x="68" y="134" text-anchor="middle" fill="#F4F4F4" class="font-mono" style="font-size: 10px">Agent A</text>

          <rect x="296" y="116" width="72" height="28" rx="6" stroke="rgba(0,217,255,0.35)" stroke-width="1.2" fill="rgba(0,217,255,0.06)" />
          <text x="332" y="134" text-anchor="middle" fill="#F4F4F4" class="font-mono" style="font-size: 10px">Agent B</text>

          <rect x="154" y="208" width="92" height="28" rx="6" stroke="rgba(0,217,255,0.45)" stroke-width="1.2" fill="rgba(0,217,255,0.1)" />
          <text x="200" y="226" text-anchor="middle" fill="#00D9FF" class="font-mono" style="font-size: 10px">Ship</text>
        </g>

        <path
          ref="p1"
          d="M 200 44 Q 200 80 68 116"
          stroke="url(#traceGrad)"
          stroke-width="2"
          stroke-linecap="round"
          class="trace"
        />
        <path
          ref="p2"
          d="M 200 44 Q 200 80 332 116"
          stroke="url(#traceGrad)"
          stroke-width="2"
          stroke-linecap="round"
          class="trace trace-d1"
        />
        <path
          ref="p3"
          d="M 68 144 Q 134 176 200 208"
          stroke="#00D9FF"
          stroke-width="1.8"
          stroke-linecap="round"
          opacity="0.75"
          class="trace trace-d2"
        />
        <path
          ref="p4"
          d="M 332 144 Q 266 176 200 208"
          stroke="#00D9FF"
          stroke-width="1.8"
          stroke-linecap="round"
          opacity="0.75"
          class="trace trace-d2"
        />

        <circle r="4" fill="#00D9FF" class="flow-dot">
          <animateMotion dur="2.4s" repeatCount="indefinite" path="M 200 44 Q 200 80 68 116" />
        </circle>
        <circle r="3.5" fill="#00D9FF" fill-opacity="0.9" class="flow-dot flow-offset">
          <animateMotion dur="2.6s" repeatCount="indefinite" path="M 200 44 Q 200 80 332 116" />
        </circle>
        <circle r="3" fill="#00D9FF" fill-opacity="0.75" class="flow-dot flow-offset-2">
          <animateMotion dur="2.1s" repeatCount="indefinite" path="M 68 144 Q 134 176 200 208" />
        </circle>
      </svg>

      <p class="font-mono mt-2 text-center text-[10px] text-[#F4F4F4]/35">live trace · multi-agent fan-out</p>
    </div>
  </div>
</template>

<style scoped>
.trace {
  animation: trace-draw 2.2s cubic-bezier(0.22, 1, 0.36, 1) forwards;
}

.trace-d1 {
  animation-delay: 0.3s;
}

.trace-d2 {
  animation-delay: 0.75s;
}

@keyframes trace-draw {
  to {
    stroke-dashoffset: 0;
  }
}

.flow-dot {
  filter: drop-shadow(0 0 6px rgba(0, 217, 255, 0.9));
}

.flow-offset {
  animation: dot-fade 0.01s 0.4s both;
}

.flow-offset-2 {
  animation: dot-fade 0.01s 0.8s both;
}

@keyframes dot-fade {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@media (prefers-reduced-motion: reduce) {
  .trace {
    animation: none;
    stroke-dashoffset: 0 !important;
  }

  .flow-dot {
    display: none;
  }
}
</style>
