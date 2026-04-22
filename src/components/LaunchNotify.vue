<script setup lang="ts">
import { computed, ref } from 'vue'
import { Check, Loader2, Send } from 'lucide-vue-next'

const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY as string | undefined
const isConfigured = computed(
  () => typeof accessKey === 'string' && accessKey.length > 10,
)

const email = ref('')
const honeypot = ref('')
const status = ref<'idle' | 'loading' | 'success' | 'error'>('idle')
const errorMessage = ref('')

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function validate(): string | null {
  const raw = email.value.trim()
  if (!raw) return 'Enter your email so we can reach you at launch.'
  if (raw.length > 320) return 'That email looks too long.'
  if (!EMAIL_RE.test(raw)) return 'Check the email address and try again.'
  return null
}

async function onSubmit() {
  errorMessage.value = ''
  if (honeypot.value) {
    // Silent reject for bots
    status.value = 'success'
    return
  }
  if (!isConfigured.value) {
    errorMessage.value = 'Signup is not configured yet. Add VITE_WEB3FORMS_ACCESS_KEY in the build.'
    status.value = 'error'
    return
  }
  const v = validate()
  if (v) {
    errorMessage.value = v
    status.value = 'error'
    return
  }

  status.value = 'loading'
  try {
    const res = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        access_key: accessKey,
        subject: 'ExitLogic — Launch list signup',
        email: email.value.trim(),
        message: `Launch notification signup: ${email.value.trim()}`,
      }),
    })
    const data = (await res.json()) as { success?: boolean; message?: string }
    if (!res.ok || !data.success) {
      errorMessage.value = data.message || 'Could not send. Try again in a moment.'
      status.value = 'error'
      return
    }
    status.value = 'success'
    email.value = ''
  } catch {
    errorMessage.value = 'Network error. Check your connection and try again.'
    status.value = 'error'
  }
}
</script>

<template>
  <div
    class="mx-auto flex max-w-[90rem] flex-col gap-6 px-5 sm:px-10 lg:flex-row lg:items-center lg:justify-between lg:gap-10 lg:px-14"
  >
    <div class="min-w-0 max-w-xl">
      <p class="font-mono text-[10px] uppercase tracking-[0.4em] text-[#00D9FF]/75">Updates</p>
      <h2
        class="font-display mt-2 text-lg font-bold tracking-tight text-[#FAFAFA] sm:text-xl"
        id="notify-heading"
      >
        Be notified at launch
      </h2>
      <p class="font-sans mt-1.5 text-sm leading-relaxed text-[#E8E8E8]/50">
        One message when enrollment opens. Unsubscribe in one click.
      </p>
    </div>

    <form
      class="w-full min-w-0 max-w-md lg:max-w-lg lg:shrink-0"
      novalidate
      @submit.prevent="onSubmit"
    >
      <!-- Honeypot: leave hidden; bots often fill and we skip the API -->
      <input
        v-model="honeypot"
        type="text"
        name="company"
        autocomplete="off"
        tabindex="-1"
        class="sr-only"
        aria-hidden="true"
      />

      <div
        v-if="status === 'success'"
        class="font-sans flex items-center gap-3 rounded-2xl border border-[#00D9FF]/30 bg-[#00D9FF]/[0.08] px-4 py-3 text-sm text-[#E8E8E8]/90"
        role="status"
        aria-live="polite"
      >
        <Check class="h-5 w-5 shrink-0 text-[#00D9FF]" stroke-width="2" aria-hidden="true" />
        You are on the list. We will only email you when the window opens.
      </div>

      <div
        v-else
        class="flex flex-col gap-2 sm:flex-row sm:items-stretch"
      >
        <label for="launch-email" class="sr-only">Email for launch updates</label>
        <input
          id="launch-email"
          v-model="email"
          type="email"
          name="email"
          inputmode="email"
          autocomplete="email"
          placeholder="you@email.com"
          :disabled="status === 'loading'"
          class="font-sans w-full min-w-0 flex-1 rounded-2xl border border-white/[0.12] bg-[#0D1117]/80 px-4 py-3.5 text-[15px] text-[#FAFAFA] shadow-inner outline-none transition placeholder:text-[#F4F4F4]/35 focus:border-[#00D9FF]/45 focus:ring-1 focus:ring-[#00D9FF]/30 disabled:opacity-50"
        />
        <button
          type="submit"
          :disabled="status === 'loading' || !isConfigured"
          class="font-display flex shrink-0 items-center justify-center gap-2 rounded-2xl bg-[#00D9FF] px-6 py-3.5 text-[14px] font-bold tracking-tight text-[#000205] shadow-[0_0_28px_rgba(0,217,255,0.3)] transition hover:shadow-[0_0_40px_rgba(0,217,255,0.45)] disabled:cursor-not-allowed disabled:opacity-50 sm:min-w-[9.5rem]"
        >
          <Loader2
            v-if="status === 'loading'"
            class="h-5 w-5 animate-spin"
            stroke-width="2"
            aria-hidden="true"
          />
          <template v-else>
            <Send class="h-4 w-4" stroke-width="2" aria-hidden="true" />
            Get updates
          </template>
        </button>
      </div>

      <p
        v-if="!isConfigured"
        class="font-mono mt-2 text-[10px] text-amber-200/60"
        role="note"
      >
        Add <code class="text-[#00D9FF]/80">VITE_WEB3FORMS_ACCESS_KEY</code> in GitHub repo secrets
        and workflow env to enable submissions.
      </p>

      <p
        v-else-if="errorMessage"
        class="font-sans mt-2 text-sm text-rose-300/90"
        role="alert"
      >
        {{ errorMessage }}
      </p>
    </form>
  </div>
</template>
