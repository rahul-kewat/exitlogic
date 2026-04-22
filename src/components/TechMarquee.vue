<script setup lang="ts">
import { computed, ref } from 'vue'
import { Check, ChevronRight } from 'lucide-vue-next'
import { stackTopics } from '../data/stackCurriculum'
import StackVectorArt from './StackVectorArt.vue'

const items = stackTopics

const activeId = ref<string>(items[0]!.id)
const current = computed(() => items.find((x) => x.id === activeId.value) ?? items[0]!)

function select(id: string) {
  activeId.value = id
}
</script>

<template>
  <div class="stack-panel overflow-hidden rounded-2xl border border-white/[0.08] bg-[#0D1117]/40 shadow-[0_32px_80px_rgba(0,0,0,0.35)] ring-1 ring-white/[0.04]">
    <p class="sr-only">
      Two-column layout. Choose a topic in the first column to read learning outcomes and see the illustration in the
      second.
    </p>

    <div
      class="grid min-h-[min(28rem,70vh)] grid-cols-1 lg:min-h-[min(32rem,75vh)] lg:grid-cols-[minmax(0,17.5rem)_1fr] xl:grid-cols-[minmax(0,19rem)_1fr]"
    >
      <!-- Left: full topic list -->
      <nav
        class="border-b border-white/[0.08] bg-[#080c10]/50 lg:border-b-0 lg:border-r lg:border-white/[0.08]"
        :aria-label="'Stack topics'"
      >
        <p
          class="font-mono border-b border-white/[0.06] px-4 py-3 text-[10px] uppercase tracking-[0.3em] text-[#00D9FF]/55 sm:px-5"
        >
          Topics
        </p>
        <ul
          class="max-h-[min(50vh,22rem)] space-y-0.5 overflow-y-auto p-2 sm:max-h-[min(55vh,26rem)] sm:p-2.5 lg:max-h-[min(70vh,32rem)] lg:p-3"
        >
          <li v-for="item in items" :key="item.id">
            <button
              type="button"
              class="group flex w-full items-center gap-2.5 rounded-xl border border-transparent py-2.5 pl-2.5 pr-2 text-left transition duration-200 outline-none sm:gap-3 sm:pl-3 sm:pr-2.5"
              :class="
                activeId === item.id
                  ? 'border-[#00D9FF]/25 bg-[#00D9FF]/[0.08] text-[#FAFAFA] shadow-[0_0_20px_rgba(0,217,255,0.08)]'
                  : 'text-[#E8E8E8]/75 hover:border-white/[0.08] hover:bg-white/[0.04]'
              "
              :aria-current="activeId === item.id ? 'true' : undefined"
              @click="select(item.id)"
            >
              <span
                class="w-0.5 shrink-0 self-stretch rounded-full transition-colors"
                :class="activeId === item.id ? 'bg-[#00D9FF]' : 'bg-transparent group-hover:bg-white/10'"
                aria-hidden="true"
              />
              <component
                :is="item.icon"
                class="h-4 w-4 shrink-0 sm:h-5 sm:w-5"
                :class="activeId === item.id ? 'text-[#00D9FF]' : 'text-[#00D9FF]/50 group-hover:text-[#00D9FF]/80'"
                stroke-width="1.35"
                aria-hidden="true"
              />
              <span
                class="min-w-0 flex-1 font-display text-[13px] font-semibold leading-snug tracking-tight sm:text-sm"
                >{{ item.chip }}</span
              >
              <ChevronRight
                class="h-3.5 w-3.5 shrink-0 text-[#00D9FF]/0 transition group-hover:text-[#00D9FF]/30"
                :class="activeId === item.id ? 'text-[#00D9FF]/50' : ''"
                stroke-width="2"
                aria-hidden="true"
              />
            </button>
          </li>
        </ul>
      </nav>

      <!-- Right: details + vector -->
      <div
        class="flex min-h-0 flex-col"
        role="region"
        :aria-label="`What you will learn: ${current.label}`"
      >
        <div
          class="grid flex-1 grid-cols-1 gap-0 xl:grid-cols-[1fr_min(11rem,30%)] xl:items-start xl:gap-6"
        >
          <div class="min-w-0 border-b border-white/[0.06] px-4 py-5 sm:px-6 sm:py-6 xl:border-b-0">
            <p class="font-mono text-[10px] uppercase tracking-[0.3em] text-[#00D9FF]/65">
              {{ current.label }}
            </p>
            <Transition name="stack-blurb" mode="out-in">
              <div :key="activeId" class="mt-3">
                <p class="font-sans text-[15px] leading-relaxed text-[#E8E8E8]/78 sm:text-base">
                  {{ current.blurb }}
                </p>
                <p class="font-mono mt-5 text-[10px] uppercase tracking-[0.22em] text-[#F4F4F4]/40">
                  What you will learn
                </p>
                <ul class="mt-3 max-w-2xl space-y-2.5">
                  <li
                    v-for="(pt, j) in current.learnPoints"
                    :key="j"
                    class="font-sans flex gap-2.5 text-sm leading-relaxed text-[#E8E8E8]/88 sm:text-[15px]"
                  >
                    <Check
                      class="mt-0.5 h-4 w-4 shrink-0 text-[#00D9FF]/80"
                      stroke-width="2.25"
                      aria-hidden="true"
                    />
                    <span>{{ pt }}</span>
                  </li>
                </ul>
              </div>
            </Transition>
          </div>

          <div
            class="flex min-h-[10rem] items-center justify-center border-t border-white/[0.05] bg-[radial-gradient(ellipse_at_50%_30%,rgba(0,217,255,0.08),transparent_60%)] px-6 py-6 xl:min-h-0 xl:border-l xl:border-t-0 xl:border-white/[0.05] xl:py-8"
          >
            <div
              class="relative h-32 w-32 rounded-2xl border border-[#00D9FF]/20 bg-[#00D9FF]/[0.04] p-4 shadow-[inset_0_0_32px_rgba(0,217,255,0.05)] sm:h-36 sm:w-36"
            >
              <Transition name="stack-blurb" mode="out-in">
                <StackVectorArt :key="activeId" :vector-id="current.vectorId" />
              </Transition>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.stack-blurb-enter-active,
.stack-blurb-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.stack-blurb-enter-from,
.stack-blurb-leave-to {
  opacity: 0;
  transform: translateY(4px);
}

@media (prefers-reduced-motion: reduce) {
  .stack-blurb-enter-from,
  .stack-blurb-leave-to {
    transform: none;
  }
}
</style>
