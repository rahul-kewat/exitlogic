<script setup lang="ts">
import { ref, onMounted, onUnmounted, nextTick } from 'vue'
import { animate, inView } from 'motion'

const props = withDefaults(
  defineProps<{
    /** Stagger child elements marked with `data-stagger` when section enters view */
    staggerChildren?: boolean
  }>(),
  {
    staggerChildren: false,
  },
)

const root = ref<HTMLElement | null>(null)
let unsubscribe: (() => void) | undefined

function reveal(el: HTMLElement) {
  const reduce =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (reduce) {
    el.style.opacity = '1'
    el.style.transform = 'none'
    el.querySelectorAll<HTMLElement>('[data-stagger]').forEach((c) => {
      c.style.opacity = '1'
      c.style.transform = 'none'
    })
    return
  }
  animate(
    el,
    { opacity: 1, transform: 'translate3d(0, 0, 0)' },
    { duration: 0.85, ease: [0.16, 1, 0.3, 1] },
  )

  if (props.staggerChildren) {
    const kids = el.querySelectorAll<HTMLElement>('[data-stagger]')
    if (kids.length) {
      animate(
        kids,
        { opacity: 1, transform: 'translate3d(0, 0, 0)' },
        {
          delay: (_node, i) => 0.12 + i * 0.09,
          duration: 0.7,
          ease: [0.16, 1, 0.3, 1],
        },
      )
    }
  }
}

onMounted(async () => {
  await nextTick()
  const el = root.value
  if (!el) return

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    el.style.opacity = '1'
    el.style.transform = 'none'
    el.querySelectorAll<HTMLElement>('[data-stagger]').forEach((c) => {
      c.style.opacity = '1'
      c.style.transform = 'none'
    })
    return
  }

  el.style.opacity = '0'
  el.style.transform = 'translate3d(0, 36px, 0)'

  if (props.staggerChildren) {
    el.querySelectorAll<HTMLElement>('[data-stagger]').forEach((c) => {
      c.style.opacity = '0'
      c.style.transform = 'translate3d(0, 28px, 0)'
    })
  }

  unsubscribe = inView(
    el,
    () => {
      reveal(el)
    },
    { amount: 0.1, margin: '0px 0px -12% 0px' },
  )
})

onUnmounted(() => {
  unsubscribe?.()
})
</script>

<template>
  <section ref="root" class="will-change-transform">
    <slot />
  </section>
</template>
