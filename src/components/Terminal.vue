<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'

const displayLines = ref<string[]>([])
const cursorVisible = ref(true)
const isComplete = ref(false)

const script = [
  '$ git add . && git status',
  'On branch main',
  'Changes to be committed:',
  '  modified:   career/trajectory.ts',
  '',
  '$ git commit -m "refactor: exit employment paradigm"',
  '',
  '[main · abc123f] 1 file changed, 1 insertion(+), 0 deletions(-)',
  '',
  '/* ExitLogic core message */',
  'const reality = await refactor(yourNineToFive);',
  '// → Technical debt cleared. Autonomy restored.',
]

let lineIndex = 0
let charIndex = 0
let raf = 0
let last = 0
let blink: ReturnType<typeof setInterval>

function type(ts: number) {
  while (lineIndex < script.length) {
    const full = script[lineIndex]!
    if (full.length === 0 && charIndex === 0) {
      lineIndex++
      if (lineIndex < script.length) {
        displayLines.value = [...displayLines.value, '']
      }
      continue
    }

    if (ts - last <= (full.startsWith('$') ? 28 : 12)) {
      raf = requestAnimationFrame(type)
      return
    }

    last = ts
    if (charIndex < full.length) {
      const next = full.slice(0, charIndex + 1)
      const copy = [...displayLines.value]
      copy[lineIndex] = next
      displayLines.value = copy
      charIndex++
      raf = requestAnimationFrame(type)
      return
    }

    lineIndex++
    charIndex = 0
    if (lineIndex < script.length) {
      displayLines.value = [...displayLines.value, '']
    }
  }

  isComplete.value = true
}

onMounted(() => {
  displayLines.value = ['']
  last = performance.now()
  raf = requestAnimationFrame(type)
  blink = setInterval(() => {
    cursorVisible.value = !cursorVisible.value
  }, 530)
})

onUnmounted(() => {
  cancelAnimationFrame(raf)
  clearInterval(blink)
})
</script>

<template>
  <div
    class="font-mono w-full max-w-2xl overflow-hidden rounded-xl border border-white/10 bg-black/50 shadow-[0_0_60px_rgba(0,217,255,0.08)] backdrop-blur-md"
  >
    <div
      class="flex items-center gap-2 border-b border-white/10 px-4 py-2.5 text-[11px] text-[#F4F4F4]/50"
    >
      <span class="inline-flex gap-1.5">
        <span class="h-2.5 w-2.5 rounded-full bg-[#ff5f57]/90" />
        <span class="h-2.5 w-2.5 rounded-full bg-[#febc2e]/90" />
        <span class="h-2.5 w-2.5 rounded-full bg-[#28c840]/90" />
      </span>
      <span class="ml-2 tracking-wide">exitlogic — zsh</span>
    </div>
    <div class="min-h-[220px] px-4 py-4 text-left text-[12px] leading-relaxed sm:min-h-[260px] sm:text-[13px]">
      <p
        v-for="(line, i) in displayLines"
        :key="i"
        class="whitespace-pre-wrap break-all text-[#00D9FF]/90"
        :class="{
          'text-[#F4F4F4]/80':
            line.startsWith('/*') || line.startsWith('const') || line.startsWith('//'),
          'text-[#F4F4F4]/55': line.startsWith('On branch') || line.startsWith('Changes'),
          'text-emerald-400/90': line.includes('[main'),
        }"
      >
        {{ line
        }}<span
          v-if="i === displayLines.length - 1 && cursorVisible && !isComplete"
          class="text-[#00D9FF]"
          >▍</span
        >
      </p>
    </div>
  </div>
</template>
