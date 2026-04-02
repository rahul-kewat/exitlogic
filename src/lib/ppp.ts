/**
 * Purchasing power parity — reserved for backend integration.
 * Future: GET /api/pricing/ppp with IP/geo → discount tier.
 */
export interface PPPDiscountResult {
  /** 0–100, applied after early-access price */
  discountPercent: number
  regionCode: string | null
}

export async function fetchPPPDiscount(): Promise<PPPDiscountResult | null> {
  // const res = await fetch('/api/pricing/ppp', { credentials: 'include' })
  // if (!res.ok) return null
  // return res.json()
  return Promise.resolve(null)
}
