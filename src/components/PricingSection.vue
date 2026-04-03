<script setup lang="ts">
import { computed } from 'vue'
import CountdownTimer from './CountdownTimer.vue'
import PricingCard from './PricingCard.vue'
import { EARLY_ACCESS_END } from '../config/earlyAccess'
import { usePricingDisplay } from '../composables/usePricingDisplay'
import { Users } from 'lucide-vue-next'

const {
  listPriceUsd,
  earlyAccessActive,
  finalPriceUsd,
  pppDiscountPercent,
  pppRegion,
  formatUsd,
} = usePricingDisplay()

const listPriceLabel = computed(() => formatUsd(listPriceUsd))
const priceLabel = computed(() => formatUsd(finalPriceUsd.value))

/** Demo inventory — wire to API later */
const spotsTotal = 50
const spotsTaken = 7
const spotsLeft = spotsTotal - spotsTaken

const fillPercent = computed(() => (spotsTaken / spotsTotal) * 100)

const features = [
  'Lifetime vault access—every new Laravel, Vue, and AI-agent module ships to you at no extra cost.',
  'Full AI-accelerated workflow track: architecture, testing, and Cursor-first freelancing.',
  'Private Discord—cohort pressure, async office hours, deal flow you can’t get from a Udemy comment.',
  'Templates, contracts, and proposal kits built for solo operators who bill like agencies.',
  'Early drops before the public roadmap—when we ship it, you already have it.',
  'Legacy rate locked: as the vault doubles, new members pay double—you never pay again.',
  'Purchasing parity pricing when your region qualifies (via PPP API).',
  'Invoice-ready receipt. One payment, no subscription trap.',
] as const

function onCta() {
  // Reserved: checkout session / Stripe
}

const teamPoints = [
  'Volume discounts for 5+ seats',
  'Custom invoicing & PO support',
  'Shared workspace roadmap calls',
] as const
</script>

<template>
  <div class="relative">
    <div class="mx-auto max-w-6xl px-5 sm:px-8">
      <div class="mb-12 max-w-2xl">
        <p class="font-mono mb-3 text-xs uppercase tracking-[0.28em] text-[#00D9FF]/80">
          pricing · exit ticket
        </p>
        <h2 class="font-display text-3xl font-bold tracking-tight text-[#F4F4F4] sm:text-4xl">
          Lock the unfair advantage before the price doubles
        </h2>
        <p class="mt-4 text-[#F4F4F4]/55">
          This isn't another course drop—it's a vault that grows while your receipt stays the same. Early members ride at
          today's legacy rate forever; latecomers fund the next wave at full price.
        </p>
      </div>

      <div
        class="glass-card mb-10 max-w-3xl border border-[#00D9FF]/20 bg-[#00D9FF]/[0.04] p-6 sm:p-8"
        role="note"
      >
        <p class="font-mono text-[10px] uppercase tracking-[0.28em] text-[#00D9FF]/90">beta · legacy rate</p>
        <p class="font-sans mt-3 text-base leading-relaxed text-[#E8E8E8]/75 sm:text-lg">
          The number on your screen is a
          <span class="font-semibold text-[#FAFAFA]">legacy rate</span>
          for people who move before the vault fills out. Every major module we add—more stack tracks, more AI
          playbooks—pushes the public price up for new enrollments. You pay once at this tier and never again, no matter
          how deep the library gets.
        </p>
        <p class="font-sans mt-4 text-sm text-[#F4F4F4]/45">
          Wait, and you're not saving money—you're choosing to fund someone else's head start.
        </p>
      </div>

      <div class="flex flex-col items-stretch gap-10 lg:flex-row lg:items-start lg:justify-center lg:gap-12">
        <div class="w-full max-w-lg shrink-0 lg:mx-0">
          <PricingCard
            :list-price-label="listPriceLabel"
            :price-label="priceLabel"
            :early-access-active="earlyAccessActive"
            :ppp-discount-percent="pppDiscountPercent"
            :ppp-region="pppRegion"
            :features="features"
            cta-caption="Join 500+ developers who decided to stop asking for permission."
            @cta="onCta"
          />
        </div>

        <!-- Urgency widget (only while early access window is active) -->
        <aside
          v-if="earlyAccessActive"
          class="glass-card w-full max-w-sm shrink-0 p-6 lg:sticky lg:top-28 lg:max-w-[280px]"
          aria-label="Early access availability"
        >
          <p class="font-mono mb-4 text-center text-[10px] uppercase tracking-[0.25em] text-[#F4F4F4]/45">
            Legacy window closes in
          </p>
          <CountdownTimer :target-date="EARLY_ACCESS_END" />
          <div class="mt-8">
            <div class="mb-2 flex justify-between text-xs text-[#F4F4F4]/55">
              <span>Seats at this rate</span>
              <span class="font-mono text-[#00D9FF]">{{ spotsLeft }}/{{ spotsTotal }} left</span>
            </div>
            <div class="h-2 overflow-hidden rounded-full bg-white/[0.06]">
              <div
                class="h-full rounded-full bg-gradient-to-r from-[#00D9FF]/80 to-[#00D9FF]"
                :style="{ width: fillPercent + '%' }"
              />
            </div>
          </div>
        </aside>
      </div>

      <!-- For teams -->
      <div class="glass-card mx-auto mt-16 max-w-lg p-8 sm:p-10">
        <div class="mb-6 flex items-center gap-3">
          <Users class="h-6 w-6 text-[#00D9FF]/80" stroke-width="1.5" aria-hidden="true" />
          <h3 class="font-display text-xl font-bold text-[#F4F4F4]">For teams</h3>
        </div>
        <ul class="space-y-3 text-[15px] text-[#F4F4F4]/65">
          <li v-for="(pt, i) in teamPoints" :key="i" class="flex gap-2">
            <span class="text-[#00D9FF]/80">—</span>
            <span>{{ pt }}</span>
          </li>
        </ul>
        <p class="font-mono mt-8 text-center text-xs leading-relaxed text-[#F4F4F4]/40">
          Questions about local pricing or PPP?
          <a
            href="mailto:hello@exitlogic.dev?subject=PPP%20pricing"
            class="text-[#00D9FF] underline decoration-[#00D9FF]/40 underline-offset-2 transition hover:decoration-[#00D9FF]"
          >
            Contact us
          </a>
        </p>
      </div>
    </div>
  </div>
</template>
