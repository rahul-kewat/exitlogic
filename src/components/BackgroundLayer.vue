<script setup lang="ts">
import { onMounted, ref } from 'vue'

const chars = '01/{}$[]<>;:#gitrefactorcommitmergebranch'.split('')
const COLS = 14
const ROWS = 22

const columns = ref<{ id: string; ch: string }[][]>([])

onMounted(() => {
  const rnd = (m: number) => Math.floor(Math.random() * m)
  const grid: { id: string; ch: string }[][] = []
  for (let c = 0; c < COLS; c++) {
    const col: { id: string; ch: string }[] = []
    for (let r = 0; r < ROWS; r++) {
      col.push({
        id: `${c}-${r}`,
        ch: chars[rnd(chars.length)]!,
      })
    }
    grid.push(col)
  }
  columns.value = grid
})
</script>

<template>
  <div
    class="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-[#000000]"
    aria-hidden="true"
  >
    <div
      class="absolute inset-[-50%] animate-[grid-drift_80s_linear_infinite] opacity-[0.4]"
      style="
        background-image:
          linear-gradient(rgba(0, 217, 255, 0.05) 1px, transparent 1px),
          linear-gradient(90deg, rgba(0, 217, 255, 0.05) 1px, transparent 1px);
        background-size: 72px 72px;
      "
    />
    <div
      class="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(0,217,255,0.1),transparent_55%)]"
    />

    <div
      class="code-shimmer font-mono absolute inset-0 flex justify-between gap-0.5 px-1 text-[8px] leading-none text-[#00D9FF]/[0.09] sm:text-[10px] sm:px-6"
    >
      <div
        v-for="(column, ci) in columns"
        :key="'c' + ci"
        class="flex min-w-0 flex-1 flex-col items-center justify-start gap-[3px] pt-[6vh]"
      >
        <span
          v-for="cell in column"
          :key="cell.id"
          class="select-none"
          :style="{ animationDelay: (ci * 37 + cell.id.length * 11) % 5000 + 'ms' }"
          >{{ cell.ch }}</span
        >
      </div>
    </div>

    <div
      class="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,#000000_78%)]"
    />
  </div>
</template>

<style scoped>
@keyframes grid-drift {
  from {
    transform: translate(0, 0);
  }
  to {
    transform: translate(72px, 72px);
  }
}

@keyframes shimmer {
  0%,
  100% {
    opacity: 0.55;
  }
  50% {
    opacity: 1;
  }
}

.code-shimmer span {
  animation: shimmer 4.5s ease-in-out infinite;
}
</style>
