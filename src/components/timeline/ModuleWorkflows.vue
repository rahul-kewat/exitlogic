<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import { revealOnScroll } from './useTimelineMotion'

const root = ref<HTMLElement | null>(null)
let stopReveal: (() => void) | undefined

onMounted(() => {
  if (root.value) stopReveal = revealOnScroll(root.value, true)
})

onUnmounted(() => stopReveal?.())
</script>

<template>
  <div ref="root" class="timeline-module opacity-0 will-change-[transform,opacity,filter]">
    <div class="mb-4">
      <p class="font-mono text-[11px] uppercase tracking-[0.28em] text-[#00D9FF]/85">03 · Workflows</p>
      <h3 class="font-sans mt-2 text-2xl font-semibold tracking-tight text-[#F4F4F4] md:text-3xl">
        Repeatable commercial rails
      </h3>
      <p class="font-sans mt-2 max-w-xl text-[15px] leading-relaxed text-[#F4F4F4]/55">
        Proposals, scope, and invoicing as reusable blocks—aligned so the pipeline feels like one system, not ad hoc files.
      </p>
    </div>

    <div class="glass-card relative flex min-h-[200px] items-center justify-center gap-8 overflow-hidden bg-[#020405]/50 py-12 md:min-h-[240px] md:gap-14">
      <div class="cube-wrap" style="animation-delay: 0s">
        <div class="cube">
          <div v-for="f in [1, 2, 3, 4, 5, 6]" :key="f" class="cube-face" :data-face="f" />
        </div>
      </div>
      <div class="cube-wrap" style="animation-delay: -4s">
        <div class="cube cube-slow">
          <div v-for="f in [1, 2, 3, 4, 5, 6]" :key="f" class="cube-face" :data-face="f" />
        </div>
      </div>
      <div class="cube-wrap" style="animation-delay: -8s">
        <div class="cube">
          <div v-for="f in [1, 2, 3, 4, 5, 6]" :key="f" class="cube-face" :data-face="f" />
        </div>
      </div>

      <div
        class="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,217,255,0.06),transparent_65%)]"
      />
    </div>

    <p class="font-mono mt-4 text-center text-[10px] text-[#F4F4F4]/35">pipeline visualization</p>
  </div>
</template>

<style scoped>
.cube-wrap {
  perspective: 520px;
  width: 72px;
  height: 72px;
  animation: float-y 10s ease-in-out infinite;
}

.cube {
  width: 100%;
  height: 100%;
  position: relative;
  transform-style: preserve-3d;
  animation: spin 22s linear infinite;
}

.cube-slow {
  animation-duration: 28s;
}

.cube-face {
  position: absolute;
  width: 72px;
  height: 72px;
  border: 1px solid rgba(0, 217, 255, 0.35);
  background: linear-gradient(135deg, rgba(0, 217, 255, 0.04), transparent);
  box-shadow: inset 0 0 20px rgba(0, 217, 255, 0.06);
}

.cube-face[data-face='1'] {
  transform: rotateY(0deg) translateZ(36px);
}
.cube-face[data-face='2'] {
  transform: rotateY(90deg) translateZ(36px);
}
.cube-face[data-face='3'] {
  transform: rotateY(180deg) translateZ(36px);
}
.cube-face[data-face='4'] {
  transform: rotateY(-90deg) translateZ(36px);
}
.cube-face[data-face='5'] {
  transform: rotateX(90deg) translateZ(36px);
}
.cube-face[data-face='6'] {
  transform: rotateX(-90deg) translateZ(36px);
}

@keyframes spin {
  from {
    transform: rotateX(-18deg) rotateY(0deg);
  }
  to {
    transform: rotateX(-18deg) rotateY(360deg);
  }
}

@keyframes float-y {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}

@media (prefers-reduced-motion: reduce) {
  .cube {
    animation: none;
    transform: rotateX(-18deg) rotateY(32deg);
  }

  .cube-wrap {
    animation: none;
  }
}
</style>
