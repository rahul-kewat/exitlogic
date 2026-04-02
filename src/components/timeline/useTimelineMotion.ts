import { animate, inView } from 'motion'

const ease = [0.22, 1, 0.36, 1] as const

export function revealOnScroll(el: HTMLElement, fromLeft: boolean) {
  const reduce =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches

  if (reduce) {
    el.style.opacity = '1'
    el.style.transform = 'none'
    el.style.filter = 'none'
    return () => {}
  }

  return inView(
    el,
    () => {
      animate(
        el,
        {
          opacity: [0, 1],
          transform: [
            `translate3d(${fromLeft ? -56 : 56}px, 28px, 0) scale(0.985)`,
            'translate3d(0, 0, 0) scale(1)',
          ],
          filter: ['blur(16px)', 'blur(0px)'],
        },
        { duration: 0.9, ease },
      )
    },
    { amount: 0.22, margin: '-48px 0px' },
  )
}
