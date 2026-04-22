<script setup lang="ts">
import { computed, ref } from 'vue'
import CountdownTimer from './CountdownTimer.vue'
import PricingCard from './PricingCard.vue'
import { EARLY_ACCESS_END } from '../config/earlyAccess'
import { usePricingDisplay } from '../composables/usePricingDisplay'
import { startMembershipRazorpayCheckout } from '../lib/razorpayCheckout'
import { Clock, Lock, Users, Zap } from 'lucide-vue-next'

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
  'Ongoing access to the full library—new Laravel, Vue, and AI modules ship into your membership.',
  'Structured workflow track: architecture, testing, and delivery for independent operators.',
  'Private community: async access, office hours, and room with peers on the same stack.',
  'Business templates: contracts, scoping, and proposals for solo and small-shop billing.',
  'New material lands in your membership as we release it—no add-on “season pass.”',
  'Founding price holds for you at enrollment while public rates may increase for new members.',
  'Purchasing power parity (PPP) when your region qualifies on checkout.',
  'One-time payment, no recurring software fee—invoice-friendly receipt for your books.',
] as const

const checkoutLoading = ref(false)
const checkoutError = ref<string | null>(null)
const checkoutSuccess = ref(false)

function onCta() {
  if (checkoutLoading.value) return
  checkoutError.value = null
  checkoutSuccess.value = false
  checkoutLoading.value = true

  void startMembershipRazorpayCheckout({
    onReadyToPay: () => {
      checkoutLoading.value = false
    },
    onSuccess: () => {
      checkoutSuccess.value = true
      checkoutLoading.value = false
    },
    onError: (msg) => {
      checkoutError.value = msg
      checkoutLoading.value = false
    },
    onDismiss: () => {
      checkoutLoading.value = false
    },
  })
}

const teamPoints = [
  '5+ seats: volume terms on request',
  'Invoicing and PO: supported',
  'Shared planning calls: scheduled with larger enrollments',
] as const

const trustChips = [
  { label: 'One-time', sub: 'No recurring software fee', icon: Zap },
  { label: 'Library grows', sub: 'Included in membership', icon: Lock },
  { label: 'Rate at entry', sub: 'Grandfathered for you', icon: Clock },
] as const
</script>

<template>
  <div class="relative">
    <div
      class="pointer-events-none absolute inset-x-0 top-0 h-[min(520px,70vh)] bg-[radial-gradient(ellipse_110%_60%_at_50%_-5%,rgba(0,217,255,0.065),transparent_68%)]"
      aria-hidden="true"
    />

    <div class="relative mx-auto max-w-[90rem] px-5 sm:px-10 lg:px-14">
      <!-- Header -->
      <div class="mx-auto mb-14 max-w-3xl text-center lg:mb-20">
        <p
          class="font-mono mb-4 inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.4em] text-[#00D9FF]/85"
        >
          <span class="h-px w-8 bg-gradient-to-r from-transparent to-[#00D9FF]/60" aria-hidden="true" />
          membership
          <span class="h-px w-8 bg-gradient-to-l from-transparent to-[#00D9FF]/60" aria-hidden="true" />
        </p>
        <h2
          class="font-display text-[clamp(2rem,4.5vw,3.25rem)] font-bold leading-[1.12] tracking-[-0.03em] text-[#FAFAFA]"
        >
          Current rate, locked at enrollment
        </h2>
        <p class="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-[#E8E8E8]/55">
          A single entry fee for a growing library. What we add later ships to your membership. Public price for new
          members can rise as the program expands; your tier stays where you started.
        </p>

        <div class="mx-auto mt-10 flex max-w-2xl flex-wrap justify-center gap-4 sm:gap-6">
          <div
            v-for="chip in trustChips"
            :key="chip.label"
            class="flex min-w-[140px] items-center gap-3 rounded-2xl border border-white/[0.08] bg-[#0D1117]/60 px-4 py-3 text-left backdrop-blur-sm transition-[box-shadow,border-color] duration-300 hover:border-[#00D9FF]/30 hover:shadow-[0_0_36px_rgba(0,217,255,0.16)]"
          >
            <component
              :is="chip.icon"
              class="h-5 w-5 shrink-0 text-[#00D9FF]/80"
              stroke-width="1.75"
              aria-hidden="true"
            />
            <div>
              <p class="font-display text-sm font-bold text-[#FAFAFA]">{{ chip.label }}</p>
              <p class="font-mono text-[10px] uppercase tracking-[0.12em] text-[#F4F4F4]/40">{{ chip.sub }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Legacy callout -->
      <div
        class="relative mx-auto mb-14 max-w-4xl overflow-hidden rounded-3xl border border-[#00D9FF]/25 bg-gradient-to-br from-[#00D9FF]/[0.08] via-[#0D1117]/80 to-[#0a0e14] p-px shadow-[0_24px_80px_rgba(0,217,255,0.08)] transition-[box-shadow,border-color] duration-300 hover:border-[#00D9FF]/45 hover:shadow-[0_0_52px_rgba(0,217,255,0.2),0_24px_80px_rgba(0,217,255,0.1)] sm:mb-16"
        role="note"
      >
        <div class="relative rounded-[calc(1.5rem-1px)] bg-[#0a0e14]/90 p-6 sm:p-10">
          <div class="mb-4 flex items-center gap-3">
            <span
              class="flex h-10 w-10 items-center justify-center rounded-xl border border-[#00D9FF]/30 bg-[#00D9FF]/10"
              aria-hidden="true"
            >
              <Lock class="h-5 w-5 text-[#00D9FF]" stroke-width="1.75" />
            </span>
            <p class="font-mono text-[10px] uppercase tracking-[0.32em] text-[#00D9FF]">beta · founding rate</p>
          </div>
          <p class="font-sans text-base leading-relaxed text-[#E8E8E8]/80 sm:text-lg">
            The price shown is a
            <span class="font-semibold text-[#FAFAFA]">founding member rate</span>
            for this phase of the product. As we add tracks and playbooks, new enrollments may see a higher public price.
            You are billed once at this tier; new material in the membership does not add a second software charge.
          </p>
          <p class="font-sans mt-5 border-l-2 border-[#00D9FF]/40 pl-4 text-sm text-[#F4F4F4]/45">
            A higher public price later reflects a deeper library, not a surcharge on the same shelf. Your enrollment date
            defines your tier.
          </p>
        </div>
      </div>

      <!-- Card + urgency -->
      <div class="flex flex-col items-stretch gap-12 lg:flex-row lg:items-start lg:justify-center lg:gap-14 xl:gap-20">
        <div class="w-full max-w-xl shrink-0 lg:max-w-lg">
          <p
            v-if="checkoutSuccess"
            class="font-sans mb-4 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-center text-sm leading-relaxed text-emerald-100/95"
            role="status"
          >
            Payment received. Thank you—your receipt will be sent by email when Razorpay confirms the payment.
          </p>
          <PricingCard
            :list-price-label="listPriceLabel"
            :price-label="priceLabel"
            :early-access-active="earlyAccessActive"
            :ppp-discount-percent="pppDiscountPercent"
            :ppp-region="pppRegion"
            :features="features"
            :is-checkout-loading="checkoutLoading"
            :checkout-error="checkoutError"
            cta-caption="Cohort access and new modules included as we ship them."
            @cta="onCta"
          />
        </div>

        <aside
          v-if="earlyAccessActive"
          class="relative w-full max-w-sm shrink-0 lg:sticky lg:top-28 lg:max-w-[300px]"
          aria-label="Early access availability"
        >
          <div
            class="pointer-events-none absolute -inset-px rounded-2xl bg-gradient-to-b from-[#00D9FF]/20 to-transparent opacity-50 blur-sm"
            aria-hidden="true"
          />
          <div
            class="relative overflow-hidden rounded-2xl border border-white/[0.1] bg-[#0D1117]/90 p-7 shadow-[0_24px_64px_rgba(0,0,0,0.4)] backdrop-blur-xl"
          >
            <div
              class="pointer-events-none absolute -right-12 top-0 h-32 w-32 rounded-full bg-[#00D9FF]/10 blur-2xl"
              aria-hidden="true"
            />
            <p class="font-mono mb-2 text-center text-[10px] uppercase tracking-[0.3em] text-[#F4F4F4]/45">
              Founding rate window
            </p>
            <CountdownTimer :target-date="EARLY_ACCESS_END" />
            <div class="mt-10">
              <div class="mb-3 flex justify-between text-xs text-[#F4F4F4]/55">
                <span>Seats at this rate</span>
                <span class="font-mono font-medium text-[#00D9FF]">{{ spotsLeft }}/{{ spotsTotal }} left</span>
              </div>
              <div class="h-2.5 overflow-hidden rounded-full bg-white/[0.06] ring-1 ring-white/[0.04]">
                <div
                  class="h-full rounded-full bg-gradient-to-r from-[#00D9FF]/90 via-[#00D9FF] to-[#00e5ff] shadow-[0_0_20px_rgba(0,217,255,0.4)] transition-[width] duration-700"
                  :style="{ width: fillPercent + '%' }"
                />
              </div>
              <p class="font-mono mt-4 text-center text-[10px] leading-relaxed text-[#F4F4F4]/35">
                When this tranche of seats is gone, the next offer uses the updated public price.
              </p>
            </div>
          </div>
        </aside>
      </div>

      <!-- Teams -->
      <div
        class="relative mx-auto mt-20 max-w-2xl overflow-hidden rounded-3xl border border-white/[0.08] bg-gradient-to-br from-[#121820]/90 to-[#0a0e14] p-8 shadow-[0_32px_80px_rgba(0,0,0,0.35)] sm:mt-24 sm:p-10"
      >
        <div
          class="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(0,217,255,0.04)_0%,transparent_50%)]"
          aria-hidden="true"
        />
        <div class="relative">
          <div class="mb-6 flex items-center gap-3">
            <span
              class="flex h-11 w-11 items-center justify-center rounded-xl border border-[#00D9FF]/20 bg-[#00D9FF]/10"
            >
              <Users class="h-6 w-6 text-[#00D9FF]" stroke-width="1.5" aria-hidden="true" />
            </span>
            <h3 class="font-display text-xl font-bold text-[#FAFAFA]">Teams &amp; orgs</h3>
          </div>
          <ul class="space-y-4 text-[15px] text-[#E8E8E8]/70">
            <li v-for="(pt, i) in teamPoints" :key="i" class="flex gap-3">
              <span class="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#00D9FF]/80" />
              <span>{{ pt }}</span>
            </li>
          </ul>
          <p class="font-mono mt-10 text-center text-xs leading-relaxed text-[#F4F4F4]/40">
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
  </div>
</template>
