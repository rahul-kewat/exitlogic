<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'

const emit = defineEmits<{
  commitComplete: []
}>()

const rootRef = ref<HTMLElement | null>(null)
const started = ref(false)
const animationActive = ref(false)
const showPulse = ref(false)
const sequenceDone = ref(false)
const showStatusToast = ref(false)

const phase = ref<'idle' | 'p1' | 'pause' | 'p2' | 'p3' | 'climax' | 'done'>('idle')

const lineCommand = ref('')
const lineGit = ref('')
const codeL1 = ref('')
const codeL2 = ref('')
const codeL3 = ref('')

const PHASE1 = '$ git add . && git commit -m "refactor: exit employment paradigm"'
const PHASE2 = '[main abc123f] 1 file changed, 1 insertion(+), 0 deletions(-)'
const PHASE3_FULL = [
  '/* ExitLogic core message */',
  'const reality = await refactor(yourNineToFive);',
  '// → Technical debt cleared. Autonomy restored.',
] as const

let timers: ReturnType<typeof setTimeout>[] = []
let blinkId: ReturnType<typeof setInterval> | null = null
let typingTimer: ReturnType<typeof setTimeout> | null = null

const cursorVisible = ref(true)

const p3ActiveLine = ref(0)

function clearTyping() {
  if (typingTimer) {
    clearTimeout(typingTimer)
    typingTimer = null
  }
}

function schedule(fn: () => void, ms: number) {
  const id = setTimeout(() => {
    timers = timers.filter((t) => t !== id)
    fn()
  }, ms)
  timers.push(id)
}

const showCursorP1 = computed(
  () => phase.value === 'p1' && animationActive.value && !sequenceDone.value,
)
const showCursorP2 = computed(
  () => phase.value === 'p2' && animationActive.value && !sequenceDone.value,
)
const showCursorP3 = computed(
  () => phase.value === 'p3' && animationActive.value && !sequenceDone.value,
)

function startSequence() {
  if (started.value) return
  started.value = true
  animationActive.value = true
  phase.value = 'p1'

  let i = 0
  const stepP1 = () => {
    if (i >= PHASE1.length) {
      phase.value = 'pause'
      schedule(() => {
        phase.value = 'p2'
        runPhase2()
      }, 500)
      return
    }
    lineCommand.value = PHASE1.slice(0, i + 1)
    i++
    typingTimer = setTimeout(stepP1, 26 + Math.random() * 20)
  }
  typingTimer = setTimeout(stepP1, 100)
}

function runPhase2() {
  let i = 0
  const quick = () => {
    if (i >= PHASE2.length) {
      lineGit.value = PHASE2
      clearTyping()
      phase.value = 'p3'
      p3ActiveLine.value = 0
      codeL1.value = ''
      codeL2.value = ''
      codeL3.value = ''
      schedule(() => runPhase3Line(0), 140)
      return
    }
    lineGit.value = PHASE2.slice(0, i + 1)
    i++
    typingTimer = setTimeout(quick, 5)
  }
  quick()
}

function runPhase3Line(lineIndex: number) {
  if (lineIndex >= 3) {
    finishClimax()
    return
  }
  p3ActiveLine.value = lineIndex
  const full = PHASE3_FULL[lineIndex]!
  let j = 0
  const slow = () => {
    if (j >= full.length) {
      if (lineIndex === 0) codeL1.value = full
      if (lineIndex === 1) codeL2.value = full
      if (lineIndex === 2) codeL3.value = full
      typingTimer = setTimeout(() => runPhase3Line(lineIndex + 1), 100 + Math.random() * 80)
      return
    }
    const slice = full.slice(0, j + 1)
    if (lineIndex === 0) codeL1.value = slice
    if (lineIndex === 1) codeL2.value = slice
    if (lineIndex === 2) codeL3.value = slice
    j++
    typingTimer = setTimeout(slow, 36 + Math.random() * 32)
  }
  slow()
}

function finishClimax() {
  sequenceDone.value = true
  phase.value = 'climax'
  showPulse.value = true
  schedule(() => {
    emit('commitComplete')
    showStatusToast.value = true
    phase.value = 'done'
    showPulse.value = false
    animationActive.value = false
  }, 720)
}

const line2Complete = computed(() => codeL2.value.length >= PHASE3_FULL[1].length)

let io: IntersectionObserver | null = null

onMounted(() => {
  blinkId = setInterval(() => {
    cursorVisible.value = !cursorVisible.value
  }, 520)

  const el = rootRef.value
  if (!el) return

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    lineCommand.value = PHASE1
    lineGit.value = PHASE2
    codeL1.value = PHASE3_FULL[0]
    codeL2.value = PHASE3_FULL[1]
    codeL3.value = PHASE3_FULL[2]
    phase.value = 'done'
    sequenceDone.value = true
    showStatusToast.value = true
    emit('commitComplete')
    return
  }

  io = new IntersectionObserver(
    (entries) => {
      if (entries[0]?.isIntersecting) {
        startSequence()
        io?.disconnect()
        io = null
      }
    },
    { threshold: 0.28, rootMargin: '0px 0px -8% 0px' },
  )
  io.observe(el)
})

onBeforeUnmount(() => {
  timers.forEach(clearTimeout)
  clearTyping()
  io?.disconnect()
  if (blinkId) clearInterval(blinkId)
})
</script>

<template>
  <section
    id="terminal"
    ref="rootRef"
    class="relative bg-[#080c14] py-28 sm:py-36 lg:py-44"
  >
    <div
      class="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#00D9FF]/20 to-transparent"
      aria-hidden="true"
    />
    <div
      class="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_100%,rgba(0,217,255,0.04),transparent_55%)]"
      aria-hidden="true"
    />

    <div class="relative mx-auto max-w-[90rem] px-5 sm:px-10 lg:px-14">
    <div class="mb-12 max-w-3xl sm:mb-14">
      <p class="font-mono mb-4 text-[10px] uppercase tracking-[0.45em] text-[#00D9FF]/75">stdout</p>
      <h2
        class="font-display text-[clamp(1.875rem,4vw,3rem)] font-extrabold tracking-[-0.03em] text-[#FAFAFA]"
        style="font-family: 'League Spartan', 'Inter', ui-sans-serif, system-ui, sans-serif"
      >
        Commit the mindset.
      </h2>
      <p class="font-sans mt-6 max-w-2xl text-lg leading-relaxed text-[#E8E8E8]/55">
        Watch the refactor land — your terminal already knows the truth.
      </p>
    </div>

    <div
      class="relative w-full max-w-3xl rounded-2xl border border-white/[0.08] bg-[#0D1117]/90 p-px shadow-[0_24px_80px_rgba(0,0,0,0.55)] backdrop-blur-xl transition-[box-shadow,border-color] duration-500 ease-out"
      :class="[
        animationActive
          ? 'border-[#00D9FF]/50 shadow-[0_0_28px_rgba(0,217,255,0.2),inset_0_0_0_1px_rgba(0,217,255,0.1)]'
          : 'border-white/[0.1]',
        showPulse ? 'terminal-climax-glow' : '',
      ]"
    >
      <div
        class="overflow-hidden rounded-[15px] bg-[#0D1117]"
        style="font-family: 'Space Mono', ui-monospace, monospace"
      >
        <div
          class="flex items-center gap-2 border-b border-white/[0.07] bg-[#0D1117] px-4 py-3 text-[11px] text-[#E8E8E8]/45"
        >
          <span class="inline-flex gap-2" aria-hidden="true">
            <span class="h-3 w-3 shrink-0 rounded-full bg-[#ff5f57]" />
            <span class="h-3 w-3 shrink-0 rounded-full bg-[#febc2e]" />
            <span class="h-3 w-3 shrink-0 rounded-full bg-[#28c840]" />
          </span>
          <span class="ml-1 tracking-[0.2em]">exitlogic — zsh</span>
        </div>

        <div class="min-h-[280px] px-4 py-5 text-left text-[12px] leading-[1.8] sm:min-h-[300px] sm:text-[13px]">
          <p v-if="lineCommand" class="whitespace-pre-wrap break-all text-[#00D9FF]/95">
            {{ lineCommand }}<span v-if="showCursorP1 && cursorVisible" class="text-[#00D9FF]">_</span>
          </p>
          <p v-if="lineGit" class="mt-1 whitespace-pre-wrap text-emerald-400/95">
            {{ lineGit }}<span v-if="showCursorP2 && cursorVisible" class="text-emerald-400">_</span>
          </p>

          <div
            v-if="phase === 'p3' || phase === 'climax' || phase === 'done'"
            class="mt-5 border-l-2 border-[#00D9FF]/30 pl-4"
          >
            <p class="text-[#8b949e]">
              {{ codeL1 }}<span
                v-if="showCursorP3 && p3ActiveLine === 0 && cursorVisible"
                class="text-[#00D9FF]"
                >_</span
              >
            </p>

            <div
              v-if="p3ActiveLine >= 1 || codeL2.length > 0 || line2Complete"
              class="mt-3 min-h-[1.5em]"
            >
              <template v-if="line2Complete">
                <p class="leading-relaxed">
                  <span class="text-[#ff7b72]">const</span><span class="text-[#F4F4F4]"> reality </span
                  ><span class="text-[#ff7b72]">=</span><span class="text-[#F4F4F4]"> </span
                  ><span class="text-[#d2a8ff]">await</span><span class="text-[#F4F4F4]"> </span
                  ><span class="text-[#d2a8ff]">refactor</span><span class="text-[#F4F4F4]">(yourNineToFive);</span>
                </p>
              </template>
              <p v-else class="text-[#79c0ff]/95">
                {{ codeL2 }}<span v-if="showCursorP3 && p3ActiveLine === 1 && cursorVisible" class="text-[#00D9FF]">_</span>
              </p>
            </div>

            <p v-if="p3ActiveLine >= 2 || codeL3.length > 0" class="mt-3 text-[#8b949e]">
              {{ codeL3 }}<span
                v-if="showCursorP3 && p3ActiveLine === 2 && cursorVisible"
                class="text-[#00D9FF]"
                >_</span
              >
            </p>
          </div>
        </div>
      </div>
    </div>

    <Transition
      enter-active-class="transition duration-700 ease-out"
      enter-from-class="opacity-0 translate-y-3"
      enter-to-class="opacity-100 translate-y-0"
    >
      <div v-if="showStatusToast" class="mt-8 max-w-3xl space-y-4">
        <p class="font-mono text-[11px] uppercase tracking-[0.35em] text-[#00D9FF]/90 sm:text-xs">
          [SYSTEM STATUS]: FREEDOM_ENGINE_RUNNING
        </p>
        <p class="font-sans text-base leading-relaxed text-[#E8E8E8]/70 sm:text-lg">
          Your terminal doesn't lie. The code for your freedom is already written—you just haven't pushed it yet.
        </p>
      </div>
    </Transition>
    </div>
  </section>
</template>

<style scoped>
.terminal-climax-glow {
  animation: terminalPulse 0.72s ease-out forwards;
}

@keyframes terminalPulse {
  0% {
    box-shadow:
      0 0 0 1px rgba(0, 217, 255, 0.35),
      0 0 28px rgba(0, 217, 255, 0.35),
      0 24px 80px rgba(0, 0, 0, 0.55);
  }
  45% {
    box-shadow:
      0 0 0 1px rgba(0, 217, 255, 0.9),
      0 0 64px rgba(0, 217, 255, 0.55),
      0 0 100px rgba(0, 217, 255, 0.25),
      0 24px 80px rgba(0, 0, 0, 0.45);
  }
  100% {
    box-shadow:
      0 0 0 1px rgba(255, 255, 255, 0.1),
      0 24px 80px rgba(0, 0, 0, 0.55);
  }
}
</style>
