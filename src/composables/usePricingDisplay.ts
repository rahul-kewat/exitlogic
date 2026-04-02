import { computed, onMounted, ref } from 'vue'
import { isEarlyAccessActive } from '../config/earlyAccess'
import { fetchPPPDiscount } from '../lib/ppp'

const LIST_USD = 299
const EARLY_ACCESS_USD = 149

export function usePricingDisplay() {
  const pppDiscountPercent = ref(0)
  const pppRegion = ref<string | null>(null)

  onMounted(async () => {
    const res = await fetchPPPDiscount()
    if (res) {
      pppDiscountPercent.value = res.discountPercent
      pppRegion.value = res.regionCode
    }
  })

  const earlyAccessActive = computed(() => isEarlyAccessActive())

  const basePriceUsd = computed(() =>
    earlyAccessActive.value ? EARLY_ACCESS_USD : LIST_USD,
  )

  const finalPriceUsd = computed(() => {
    const factor = 1 - pppDiscountPercent.value / 100
    return Math.round(basePriceUsd.value * factor * 100) / 100
  })

  function formatUsd(n: number) {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    }).format(n)
  }

  return {
    listPriceUsd: LIST_USD,
    earlyAccessPriceUsd: EARLY_ACCESS_USD,
    earlyAccessActive,
    basePriceUsd,
    finalPriceUsd,
    pppDiscountPercent,
    pppRegion,
    formatUsd,
  }
}
