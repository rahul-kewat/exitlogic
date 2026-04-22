<script setup lang="ts">
import FeatureList from './FeatureList.vue'
import { Loader2, Shield, Sparkles } from 'lucide-vue-next'

withDefaults(
  defineProps<{
    listPriceLabel: string
    priceLabel: string
    earlyAccessActive: boolean
    pppDiscountPercent: number
    pppRegion: string | null
    features: readonly string[]
    ctaLabel?: string
    ctaCaption?: string
    isCheckoutLoading?: boolean
    checkoutError?: string | null
  }>(),
  {
    ctaLabel: '',
    ctaCaption: '',
    isCheckoutLoading: false,
    checkoutError: null,
  },
)

defineEmits<{
  cta: []
}>()
</script>

<template>
  <div class="relative">
    <!-- Ambient glow -->
    <div
      class="pointer-events-none absolute -inset-1 rounded-[1.35rem] bg-gradient-to-b from-[#00D9FF]/25 via-[#00D9FF]/5 to-transparent opacity-60 blur-xl"
      aria-hidden="true"
    />
    <div
      class="pointer-events-none absolute inset-0 rounded-3xl bg-gradient-to-br from-[#00D9FF]/[0.12] via-transparent to-transparent opacity-50"
      aria-hidden="true"
    />

    <div
      class="relative overflow-hidden rounded-3xl border border-white/[0.1] bg-gradient-to-b from-[#121820]/95 to-[#0a0e14] p-8 shadow-[0_32px_100px_rgba(0,0,0,0.55)] backdrop-blur-xl transition-[box-shadow,border-color] duration-300 hover:border-[#00D9FF]/22 hover:shadow-[0_0_44px_rgba(0,217,255,0.14),0_32px_100px_rgba(0,0,0,0.55)] sm:p-10"
    >
      <div
        class="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-[#00D9FF]/[0.07] blur-3xl"
        aria-hidden="true"
      />
      <div
        class="pointer-events-none absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00D9FF]/30 to-transparent"
        aria-hidden="true"
      />

      <div class="relative">
        <div class="mb-8 flex flex-wrap items-start justify-between gap-4">
          <div
            v-if="earlyAccessActive"
            class="inline-flex items-center gap-2 rounded-full border border-[#00D9FF]/40 bg-[#00D9FF]/10 px-4 py-1.5 font-mono text-[10px] font-medium uppercase tracking-[0.22em] text-[#00D9FF]"
          >
            <Sparkles class="h-3.5 w-3.5" stroke-width="2" aria-hidden="true" />
            Founding member rate
          </div>
          <div
            v-else
            class="inline-flex rounded-full border border-white/15 px-4 py-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-[#F4F4F4]/45"
          >
            Public pricing
          </div>
        </div>

        <div class="mb-8 border-b border-white/[0.07] pb-8">
          <p class="font-mono text-[10px] uppercase tracking-[0.35em] text-[#F4F4F4]/35">Due today</p>
          <div class="mt-3 flex flex-wrap items-end gap-3">
            <span
              class="font-display bg-gradient-to-br from-[#FAFAFA] to-[#B8B8B8] bg-clip-text text-5xl font-black tracking-tight text-transparent sm:text-6xl"
            >
              {{ priceLabel }}
            </span>
            <span class="font-mono mb-2 text-sm text-[#F4F4F4]/45">one-time membership</span>
          </div>
          <div v-if="earlyAccessActive" class="mt-4 flex flex-wrap items-center gap-3">
            <span class="font-mono text-xl text-[#F4F4F4]/30 line-through decoration-[#F4F4F4]/20 sm:text-2xl">
              {{ listPriceLabel }}
            </span>
            <span
              class="rounded-md border border-[#00D9FF]/30 bg-[#00D9FF]/10 px-2 py-0.5 font-mono text-[11px] uppercase tracking-wider text-[#00D9FF]"
              >Founding window</span
            >
          </div>
        </div>

        <p v-if="pppDiscountPercent > 0" class="font-mono mb-6 text-sm text-[#00D9FF]/90">
          PPP adjustment applied: −{{ pppDiscountPercent }}%
          <span v-if="pppRegion" class="text-[#F4F4F4]/50">({{ pppRegion }})</span>
        </p>
        <p v-else class="mb-8 text-sm leading-relaxed text-[#F4F4F4]/45">
          Single payment, no software subscription. PPP available where offered at checkout.
        </p>

        <div class="mb-3">
          <p class="font-mono text-[10px] uppercase tracking-[0.28em] text-[#00D9FF]/70">Included in membership</p>
        </div>
        <FeatureList :items="features" />

        <button
          type="button"
          :disabled="isCheckoutLoading"
          class="font-display group relative mt-10 flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-[#00D9FF] py-4 text-base font-bold tracking-tight text-[#000000] shadow-[0_0_40px_rgba(0,217,255,0.35)] transition duration-300 hover:shadow-[0_0_64px_rgba(0,217,255,0.5)] disabled:cursor-wait disabled:opacity-85"
          @click="$emit('cta')"
        >
          <span
            class="absolute inset-0 bg-gradient-to-r from-white/25 via-transparent to-transparent opacity-0 transition duration-300 group-hover:opacity-100"
          />
          <Loader2
            v-if="isCheckoutLoading"
            class="relative h-5 w-5 shrink-0 animate-spin"
            stroke-width="2.5"
            aria-hidden="true"
          />
          <span class="relative">{{
            ctaLabel || (earlyAccessActive ? 'Enroll at founding rate' : 'Enroll in membership')
          }}</span>
        </button>

        <p v-if="checkoutError" class="mt-3 text-center text-[13px] leading-snug text-rose-300/95" role="alert">
          {{ checkoutError }}
        </p>

        <p v-if="ctaCaption" class="mt-4 text-center text-[13px] leading-snug text-[#F4F4F4]/45">
          {{ ctaCaption }}
        </p>

        <div class="mt-6 flex items-start gap-3 rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 text-sm text-[#F4F4F4]/50">
          <Shield class="mt-0.5 h-5 w-5 shrink-0 text-[#00D9FF]/75" stroke-width="1.75" aria-hidden="true" />
          <span>30-day refund if the membership is not a fit. No questionnaire.</span>
        </div>

        <div
          class="mt-8 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 border-t border-white/[0.06] pt-8 text-[10px] font-medium uppercase tracking-[0.2em] text-[#F4F4F4]/30"
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
    </div>
  </div>
</template>
