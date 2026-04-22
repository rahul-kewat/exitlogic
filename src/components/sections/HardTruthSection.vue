<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { AlertTriangle, ArrowRight, Orbit } from 'lucide-vue-next'

const truths = [
  {
    id: '01',
    title: 'Overtime compounds in the wrong account',
    detail: "Most overtime funds someone else’s roadmap—not a balance sheet you own.",
    impact: 'Output increases. Ownership does not.',
  },
  {
    id: '02',
    title: 'Comfort can hide expensive drift',
    detail: 'Stability inside the wrong system is still a slow, compounding cost.',
    impact: 'Low stress today. Lower leverage tomorrow.',
  },
  {
    id: '03',
    title: 'Upside lives in decision rights',
    detail: 'The leverage is in design, review, and ownership—not raw keystrokes.',
    impact: 'Architectural control outperforms velocity alone.',
  },
] as const

const activeIndex = ref(0)
let rotateTimer: ReturnType<typeof setInterval> | null = null

function setActive(index: number) {
  activeIndex.value = index
}

function startRotation() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
  rotateTimer = setInterval(() => {
    activeIndex.value = (activeIndex.value + 1) % truths.length
  }, 3600)
}

function stopRotation() {
  if (!rotateTimer) return
  clearInterval(rotateTimer)
  rotateTimer = null
}

onMounted(() => {
  startRotation()
})

onBeforeUnmount(() => {
  stopRotation()
})
</script>

<template>
  <section
    id="hard-truth"
    class="relative overflow-hidden border-y border-white/[0.06] bg-[#060b13] py-28 sm:py-36 lg:py-44"
  >
    <div
      class="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_95%_62%_at_50%_-12%,rgba(0,217,255,0.09),transparent_55%)]"
      aria-hidden="true"
    />
    <div
      class="pointer-events-none absolute inset-0 bg-[linear-gradient(120deg,rgba(0,217,255,0.035),transparent_28%,transparent_72%,rgba(0,217,255,0.035))]"
      aria-hidden="true"
    />
    <div
      class="pointer-events-none absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00D9FF]/25 to-transparent"
      aria-hidden="true"
    />

    <div class="relative mx-auto max-w-[90rem] px-5 sm:px-10 lg:px-14">
      <div class="mx-auto mb-14 max-w-4xl text-center sm:mb-20">
        <div class="mb-6 flex items-center justify-center gap-3">
          <AlertTriangle class="h-6 w-6 text-[#00D9FF]/90" stroke-width="1.5" aria-hidden="true" />
          <p class="font-mono text-[10px] uppercase tracking-[0.45em] text-[#00D9FF]/85">context</p>
        </div>
        <h2
          class="font-display text-[clamp(1.75rem,4vw,2.85rem)] font-extrabold leading-[1.15] tracking-[-0.03em] text-[#FAFAFA]"
        >
          The default org optimizes for its continuity—not your upside.
        </h2>
      </div>

      <div class="mb-7 flex items-center justify-center gap-3 sm:mb-8">
        <Orbit class="h-4 w-4 text-[#00D9FF]/70" stroke-width="1.6" aria-hidden="true" />
        <p class="font-mono text-[10px] uppercase tracking-[0.35em] text-[#AEEFFF]/60">
          live leverage map · click any node
        </p>
      </div>

      <div
        class="relative rounded-3xl border border-white/[0.08] bg-[#0B111A]/65 p-3 shadow-[0_30px_90px_rgba(0,0,0,0.48)] backdrop-blur-sm sm:p-5"
        @mouseenter="stopRotation"
        @mouseleave="startRotation"
      >
        <div class="grid gap-3 md:grid-cols-3 md:gap-4">
          <button
            v-for="(item, i) in truths"
            :key="item.id"
            type="button"
            class="group relative overflow-hidden rounded-2xl border p-7 text-left transition duration-500 ease-out"
            :class="
              activeIndex === i
                ? 'border-[#00D9FF]/50 bg-[#0E1622] shadow-[0_16px_50px_rgba(0,217,255,0.12)]'
                : 'border-white/[0.08] bg-[#0D1117]/65 hover:-translate-y-1 hover:border-[#00D9FF]/24'
            "
            @click="setActive(i)"
          >
            <span
              class="font-display mb-5 block text-4xl font-black tabular-nums transition duration-500"
              :class="activeIndex === i ? 'text-[#00D9FF]/70' : 'text-[#00D9FF]/28 group-hover:text-[#00D9FF]/45'"
              aria-hidden="true"
              >{{ item.id }}</span
            >
            <p class="font-sans text-lg font-semibold leading-snug text-[#F2F2F2]/96">
              {{ item.title }}
            </p>
            <p class="mt-4 font-sans text-[15px] leading-relaxed text-[#DDE4EE]/82">
              {{ item.detail }}
            </p>
            <p class="mt-5 inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.26em] text-[#9BDFF0]/72">
              <ArrowRight class="h-3.5 w-3.5" stroke-width="1.8" aria-hidden="true" />
              {{ item.impact }}
            </p>

            <div
              class="pointer-events-none absolute inset-x-4 bottom-0 h-0.5 overflow-hidden rounded-full bg-white/[0.08]"
              aria-hidden="true"
            >
              <div
                class="h-full origin-left rounded-full bg-gradient-to-r from-[#00D9FF]/35 via-[#00D9FF]/95 to-[#7AF4FF]/45 transition-transform duration-500 ease-out"
                :class="activeIndex === i ? 'scale-x-100' : 'scale-x-0'"
              />
            </div>
            <div
              class="pointer-events-none absolute -bottom-8 -right-6 h-32 w-32 rounded-full blur-2xl transition duration-500"
              :class="activeIndex === i ? 'bg-[#00D9FF]/[0.12]' : 'bg-[#00D9FF]/[0.03]'"
              aria-hidden="true"
            />
          </button>
        </div>
      </div>
      <div class="mt-6 flex items-center justify-center gap-2">
        <button
          v-for="(item, i) in truths"
          :key="`${item.id}-dot`"
          type="button"
          class="h-2 rounded-full transition-all duration-300"
          :class="activeIndex === i ? 'w-8 bg-[#00D9FF]/85' : 'w-2 bg-white/25 hover:bg-white/45'"
          :aria-label="`Focus truth ${item.id}`"
          @click="setActive(i)"
        />
      </div>
    </div>
  </section>
</template>
