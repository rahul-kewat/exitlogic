<script setup lang="ts">
import { Check } from 'lucide-vue-next'

defineProps<{
  items: readonly string[]
}>()
</script>

<template>
  <ul class="flex flex-col gap-3.5 text-left text-[15px] leading-snug text-[#E8E8E8]/82">
    <li v-for="(item, i) in items" :key="i" class="group flex gap-3.5">
      <span
        class="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-md border border-[#00D9FF]/25 bg-[#00D9FF]/[0.08] transition group-hover:border-[#00D9FF]/45 group-hover:bg-[#00D9FF]/[0.12]"
      >
        <Check class="h-3.5 w-3.5 text-[#00D9FF]" stroke-width="2.5" aria-hidden="true" />
      </span>
      <span>{{ item }}</span>
    </li>
  </ul>
</template>
