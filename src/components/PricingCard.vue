<script setup lang="ts">
import FeatureList from './FeatureList.vue'
import { Shield } from 'lucide-vue-next'

defineProps<{
  listPriceLabel: string
  priceLabel: string
  earlyAccessActive: boolean
  pppDiscountPercent: number
  pppRegion: string | null
  features: readonly string[]
}>()

defineEmits<{
  cta: []
}>()
</script>

<template>
  <div
    class="relative overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.03] p-8 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] backdrop-blur-xl sm:p-10"
  >
    <div
      v-if="earlyAccessActive"
      class="font-mono mb-6 inline-flex rounded-full border border-[#00D9FF]/35 bg-[#00D9FF]/10 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.2em] text-[#00D9FF]"
    >
      Early access · Batch 2
    </div>
    <div v-else class="font-mono mb-6 inline-flex rounded-full border border-white/15 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-[#F4F4F4]/45">
      Standard pricing
    </div>

    <div class="mb-2 flex flex-wrap items-end gap-3">
      <span class="font-display text-4xl font-bold tracking-tight text-[#F4F4F4] sm:text-5xl">
        {{ priceLabel }}
      </span>
      <span class="font-mono mb-1 text-sm text-[#F4F4F4]/45">one-time</span>
    </div>
    <div v-if="earlyAccessActive" class="mb-1 flex flex-wrap items-center gap-3">
      <span class="font-mono text-lg text-[#F4F4F4]/35 line-through decoration-[#F4F4F4]/25">
        {{ listPriceLabel }}
      </span>
      <span class="font-mono text-xs uppercase tracking-wider text-[#00D9FF]/80">Early access</span>
    </div>
    <p v-if="pppDiscountPercent > 0" class="font-mono mb-6 text-xs text-[#00D9FF]/90">
      PPP adjustment applied: −{{ pppDiscountPercent }}%
      <span v-if="pppRegion" class="text-[#F4F4F4]/50">({{ pppRegion }})</span>
    </p>
    <p v-else class="mb-6 text-sm text-[#F4F4F4]/40">
      Buy once — no subscription. Local pricing via PPP when available.
    </p>

    <FeatureList :items="features" />

    <button
      type="button"
      class="font-display mt-10 w-full rounded-xl bg-[#00D9FF] py-4 text-base font-bold tracking-tight text-[#000000] shadow-[0_0_32px_rgba(0,217,255,0.35)] transition hover:shadow-[0_0_48px_rgba(0,217,255,0.55)]"
      @click="$emit('cta')"
    >
      {{ earlyAccessActive ? 'Get early access' : 'Buy once' }}
    </button>

    <div class="mt-5 flex items-start gap-2 text-sm text-[#F4F4F4]/45">
      <Shield class="mt-0.5 h-4 w-4 shrink-0 text-[#00D9FF]/70" stroke-width="1.75" aria-hidden="true" />
      <span>30-day refund if ExitLogic isn’t a fit — no questions asked.</span>
    </div>

    <div
      class="mt-8 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 border-t border-white/[0.06] pt-8 text-[11px] font-medium uppercase tracking-wider text-[#F4F4F4]/35"
    >
      <span>Apple Pay</span>
      <span class="text-white/15">·</span>
      <span>Google Pay</span>
      <span class="text-white/15">·</span>
      <span>Visa</span>
      <span class="text-white/15">·</span>
      <span>Mastercard</span>
    </div>
  </div>
</template>
