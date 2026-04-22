/**
 * Cloudflare Worker: creates Razorpay orders and verifies payment signatures.
 * Deploy: wrangler deploy. Set secrets: RAZORPAY_KEY_ID, RAZORPAY_KEY_SECRET, RAZORPAY_AMOUNT_PAISE, RAZORPAY_CURRENCY
 *
 * Never put KEY_SECRET in the static site.
 */
const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
}

/**
 * @param {string} secret
 * @param {string} message
 */
async function hmacSha256Hex(secret, message) {
  const enc = new TextEncoder()
  const key = await crypto.subtle.importKey('raw', enc.encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, [
    'sign',
  ])
  const buf = await crypto.subtle.sign('HMAC', key, enc.encode(message))
  return [...new Uint8Array(buf)]
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('')
}

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' },
  })
}

export default {
  async fetch(request, env) {
    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: CORS_HEADERS })
    }

    const url = new URL(request.url)
    const path = url.pathname.replace(/\/$/, '') || '/'

    if (path === '/create-order' && request.method === 'POST') {
      return handleCreateOrder(request, env)
    }
    if (path === '/verify' && request.method === 'POST') {
      return handleVerify(request, env)
    }

    if (path === '/health' && request.method === 'GET') {
      return json({ ok: true })
    }

    return json({ error: 'not_found' }, 404)
  },
}

/**
 * @param {Request} request
 * @param {Record<string,string>} env
 */
async function handleCreateOrder(request, env) {
  const key = env.RAZORPAY_KEY_ID
  const sec = env.RAZORPAY_KEY_SECRET
  const amountPaise = parseInt(String(env.RAZORPAY_AMOUNT_PAISE || '0'), 10)
  const currency = (env.RAZORPAY_CURRENCY || 'INR').toUpperCase()

  if (!key || !sec) {
    return json({ error: 'server_misconfigured' }, 500)
  }
  if (!Number.isFinite(amountPaise) || amountPaise < 100) {
    return json({ error: 'invalid_amount_config' }, 500)
  }

  const receipt = `rcpt_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`
  const idempotency = receipt

  const auth = btoa(`${key}:${sec}`)
  const res = await fetch('https://api.razorpay.com/v1/orders', {
    method: 'POST',
    headers: {
      Authorization: `Basic ${auth}`,
      'Content-Type': 'application/json',
      'X-Request-Id': idempotency,
    },
    body: JSON.stringify({
      amount: amountPaise,
      currency,
      receipt: receipt.slice(0, 40),
      payment_capture: 1,
    }),
  })

  const data = await res.json()
  if (!res.ok) {
    return json(
      { error: 'order_failed', message: data.error?.description || res.statusText },
      400,
    )
  }

  return json({
    orderId: data.id,
    amount: data.amount,
    currency: data.currency,
    keyId: key,
  })
}

/**
 * @param {Request} request
 * @param {Record<string,string>} env
 */
async function handleVerify(request, env) {
  const sec = env.RAZORPAY_KEY_SECRET
  if (!sec) {
    return json({ error: 'server_misconfigured' }, 500)
  }

  let body
  try {
    body = await request.json()
  } catch {
    return json({ error: 'invalid_json' }, 400)
  }

  const orderId = body.razorpay_order_id
  const paymentId = body.razorpay_payment_id
  const signature = body.razorpay_signature

  if (!orderId || !paymentId || !signature) {
    return json({ error: 'missing_fields' }, 400)
  }

  const expected = await hmacSha256Hex(sec, `${orderId}|${paymentId}`)
  const sig = String(signature).toLowerCase().trim()
  if (expected.toLowerCase() !== sig) {
    return json({ error: 'bad_signature' }, 400)
  }

  return json({ ok: true, orderId, paymentId })
}
