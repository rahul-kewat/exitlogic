/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Web3Forms access key; set in CI via GitHub Actions secret. */
  readonly VITE_WEB3FORMS_ACCESS_KEY?: string
  /**
   * Base URL of your order API, e.g. https://exitlogic-razorpay.your-name.workers.dev
   * (no trailing slash). Must implement POST /create-order and POST /verify.
   */
  readonly VITE_RAZORPAY_ORDER_API_URL?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

/** Razorpay checkout.js (https://razorpay.com/docs/payments/payment-gateway/web-integration/standard) */
interface RazorpayInstance {
  open: () => void
  on: (event: 'payment.failed', handler: (err: { error?: { description?: string } }) => void) => void
}
interface RazorpayConstructor {
  new (options: Record<string, unknown>): RazorpayInstance
}
interface Window {
  Razorpay: RazorpayConstructor
}
