<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'

const props = defineProps<{
  targetDate: Date
}>()

const now = ref(Date.now())
let interval: ReturnType<typeof setInterval>

const DAY = 86400000
const HOUR = 3600000
const MIN = 60000

const parts = computed(() => {
  const ms = Math.max(0, props.targetDate.getTime() - now.value)
  const days = Math.floor(ms / DAY)
  const hours = Math.floor((ms % DAY) / HOUR)
  const minutes = Math.floor((ms % HOUR) / MIN)
  const seconds = Math.floor((ms % MIN) / 1000)
  return { days, hours, minutes, seconds }
})

function pad(n: number) {
  return String(n).padStart(2, '0')
}

onMounted(() => {
  interval = setInterval(() => {
    now.value = Date.now()
  }, 1000)
})

onUnmounted(() => clearInterval(interval))
</script>

<template>
  <div class="font-mono text-[#F4F4F4]">
    <div class="grid grid-cols-4 gap-2 text-center sm:gap-3">
      <div v-for="(label, idx) in ['Days', 'Hrs', 'Min', 'Sec']" :key="label" class="flex flex-col gap-1">
        <span class="text-2xl font-semibold tabular-nums tracking-tight text-[#F4F4F4] sm:text-3xl">
          {{
            idx === 0
              ? pad(parts.days)
              : idx === 1
                ? pad(parts.hours)
                : idx === 2
                  ? pad(parts.minutes)
                  : pad(parts.seconds)
          }}
        </span>
        <span class="text-[10px] uppercase tracking-[0.18em] text-[#F4F4F4]/45">{{ label }}</span>
      </div>
    </div>
  </div>
</template>
