<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import { revealOnScroll } from './useTimelineMotion'

const root = ref<HTMLElement | null>(null)
let stopReveal: (() => void) | undefined

const line = ref('')
const phase = ref<'typing' | 'swap' | 'done'>('typing')
const showUpgrade = ref(false)

const target = 'Refactoring local_employee_logic.sh... Success. [0ms]'
let ti = 0
let tmr: ReturnType<typeof setTimeout> | undefined

function typeStep() {
  if (ti <= target.length) {
    line.value = target.slice(0, ti)
    ti++
    tmr = setTimeout(typeStep, ti < 42 ? 22 : 12)
  } else {
    phase.value = 'swap'
    setTimeout(() => {
      showUpgrade.value = true
      phase.value = 'done'
    }, 650)
  }
}

onMounted(() => {
  if (root.value) stopReveal = revealOnScroll(root.value, true)
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (reduce) {
    line.value = target
    phase.value = 'done'
    showUpgrade.value = true
    return
  }
  tmr = setTimeout(typeStep, 450)
})

onUnmounted(() => {
  clearTimeout(tmr)
  stopReveal?.()
})
</script>

<template>
  <div ref="root" class="timeline-module opacity-0 will-change-[transform,opacity,filter]">
    <div class="mb-4">
      <p class="font-mono text-[11px] uppercase tracking-[0.28em] text-[#00D9FF]/85">01 · Mindset refactor</p>
      <h3 class="font-sans mt-2 text-2xl font-semibold tracking-tight text-[#F4F4F4] md:text-3xl">
        Decompile corporate bias
      </h3>
      <p class="font-sans mt-2 max-w-xl text-[15px] leading-relaxed text-[#F4F4F4]/55">
        Your OS shipped with scripts you never authored. Watch the legacy stack get replaced — live.
      </p>
    </div>

    <div class="glass-card relative overflow-hidden p-5">
      <div class="mb-3 flex items-center gap-2 border-b border-white/[0.06] pb-3">
        <span class="h-2 w-2 rounded-full bg-[#00D9FF]/80 shadow-[0_0_8px_#00D9FF]" />
        <span class="font-mono text-[10px] text-[#F4F4F4]/45">local_employee_logic.sh</span>
      </div>
      <p class="font-mono min-h-[3.5rem] text-[13px] leading-relaxed text-emerald-400 drop-shadow-[0_0_12px_rgba(52,211,153,0.35)]">
        {{ line }}<span v-if="phase === 'typing'" class="animate-pulse text-emerald-300">▍</span>
      </p>
    </div>

    <div class="glass-card relative mt-8 h-28 overflow-hidden rounded-xl md:h-32">
      <div
        :key="phase"
        class="pointer-events-none absolute left-0 right-0 top-1/2 z-10 h-px -translate-y-1/2 bg-gradient-to-r from-transparent via-[#00D9FF] to-transparent"
        :class="phase !== 'typing' ? 'data-pulse' : 'opacity-0'"
      />

      <div class="relative flex h-full items-stretch">
        <div
          class="font-mono flex flex-1 items-center justify-center px-3 text-center text-[11px] leading-snug text-[#F4F4F4]/55 transition duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] sm:text-xs md:px-6"
          :class="
            showUpgrade
              ? '-translate-x-full opacity-0 blur-sm'
              : 'translate-x-0 opacity-100'
          "
        >
          Corporate Bias (Legacy)
        </div>
        <div
          class="font-mono absolute inset-0 flex flex-1 items-center justify-center px-3 text-center text-[11px] leading-snug text-[#00D9FF] transition duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] sm:text-xs md:px-6"
          :class="
            showUpgrade
              ? 'translate-x-0 opacity-100'
              : 'translate-x-full opacity-0 blur-sm'
          "
        >
          Freelance Freedom (Upgrade V2.0)
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.data-pulse {
  animation: pulse-line 1.15s ease-out forwards;
}

@keyframes pulse-line {
  0% {
    opacity: 0;
    transform: scaleX(0.15) translateY(-50%);
  }
  45% {
    opacity: 1;
    transform: scaleX(1) translateY(-50%);
  }
  100% {
    opacity: 0.4;
    transform: scaleX(1) translateY(-50%);
  }
}

@media (prefers-reduced-motion: reduce) {
  .data-pulse {
    animation: none;
    opacity: 0.45;
  }
}
</style>
