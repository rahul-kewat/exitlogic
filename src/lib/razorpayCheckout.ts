/**
 * Client-side Razorpay Checkout. The KEY_SECRET never touches the browser — only your order API
 * (e.g. Cloudflare Worker) creates orders and verifies signatures.
 */

type CreateOrderResponse = {
  orderId: string
  amount: number
  currency: string
  keyId: string
}

type RazorpaySuccessResponse = {
  razorpay_payment_id: string
  razorpay_order_id: string
  razorpay_signature: string
}

export function getRazorpayOrderApiBase(): string | null {
  const u = import.meta.env.VITE_RAZORPAY_ORDER_API_URL
  if (typeof u !== 'string' || !u.trim()) return null
  return u.replace(/\/$/, '')
}

export function loadRazorpayScript(): Promise<void> {
  if (typeof window === 'undefined') return Promise.resolve()
  if (window.Razorpay) return Promise.resolve()
  return new Promise((resolve, reject) => {
    const s = document.createElement('script')
    s.src = 'https://checkout.razorpay.com/v1/checkout.js'
    s.async = true
    s.onload = () => resolve()
    s.onerror = () => reject(new Error('Could not load Razorpay checkout script'))
    document.body.append(s)
  })
}

export async function createRazorpayOrder(apiBase: string): Promise<CreateOrderResponse> {
  const r = await fetch(`${apiBase}/create-order`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  })
  const data = (await r.json()) as Partial<CreateOrderResponse> & { error?: string; message?: string }
  if (!r.ok) {
    throw new Error(data.message || data.error || 'Could not create order')
  }
  if (data.orderId == null || data.keyId == null || data.amount == null || !data.currency) {
    throw new Error('Invalid order response from server')
  }
  return {
    orderId: data.orderId,
    amount: data.amount,
    currency: data.currency,
    keyId: data.keyId,
  }
}

export async function verifyRazorpayPayment(
  apiBase: string,
  body: RazorpaySuccessResponse,
): Promise<{ ok: boolean }> {
  const r = await fetch(`${apiBase}/verify`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      razorpay_order_id: body.razorpay_order_id,
      razorpay_payment_id: body.razorpay_payment_id,
      razorpay_signature: body.razorpay_signature,
    }),
  })
  const data = (await r.json()) as { error?: string; ok?: boolean }
  if (!r.ok) {
    throw new Error(data.error || 'Signature verification failed')
  }
  return { ok: Boolean(data.ok) }
}

export type MembershipCheckoutHandlers = {
  onReadyToPay?: () => void
  onSuccess: () => void
  onError: (message: string) => void
  onDismiss?: () => void
}

/**
 * Fetches an order, opens Razorpay, verifies the payment on your server.
 */
export async function startMembershipRazorpayCheckout(h: MembershipCheckoutHandlers): Promise<void> {
  const api = getRazorpayOrderApiBase()
  if (!api) {
    h.onError('Payment is not configured. Set VITE_RAZORPAY_ORDER_API_URL to your order API (see workers/).')
    return
  }

  let order: CreateOrderResponse
  try {
    await loadRazorpayScript()
    order = await createRazorpayOrder(api)
  } catch (e) {
    h.onError(e instanceof Error ? e.message : 'Checkout could not start')
    return
  }

  h.onReadyToPay?.()

  const options: Record<string, unknown> = {
    key: order.keyId,
    amount: order.amount,
    currency: order.currency,
    order_id: order.orderId,
    name: 'ExitLogic',
    description: 'Membership — one-time',
    theme: { color: '#00d9ff' },
    handler: async (response: RazorpaySuccessResponse) => {
      try {
        await verifyRazorpayPayment(api, response)
        h.onSuccess()
      } catch (e) {
        h.onError(e instanceof Error ? e.message : 'Payment verification failed')
      }
    },
    modal: {
      ondismiss: () => h.onDismiss?.(),
    },
  }

  try {
    const rzp = new window.Razorpay(options)
    rzp.on('payment.failed', (err: { error?: { description?: string } }) => {
      h.onError(err?.error?.description || 'Payment failed')
    })
    rzp.open()
  } catch (e) {
    h.onError(e instanceof Error ? e.message : 'Could not open checkout')
  }
}
