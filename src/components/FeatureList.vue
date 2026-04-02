<script setup lang="ts">
import { Check } from 'lucide-vue-next'

defineProps<{
  items: readonly string[]
}>()
</script>

<template>
  <ul class="flex flex-col gap-3.5 text-left text-[15px] leading-snug text-[#F4F4F4]/75">
    <li v-for="(item, i) in items" :key="i" class="flex gap-3">
      <Check
        class="mt-0.5 h-5 w-5 shrink-0 text-[#00D9FF]"
        stroke-width="2.25"
        aria-hidden="true"
      />
      <span>{{ item }}</span>
    </li>
  </ul>
</template>
