<script setup lang="ts">
/**
 * Abstract vector marks for each stack topic — monoline cyan on transparent.
 */
const { vectorId } = defineProps<{
  vectorId: string
}>()
</script>

<template>
  <svg
    class="h-full w-full text-[#00D9FF]/90"
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <!-- layers -->
    <g v-if="vectorId === 'layers'" stroke="currentColor" stroke-width="1.2" stroke-linecap="round">
      <rect x="18" y="58" width="64" height="14" rx="2" opacity="0.35" />
      <rect x="14" y="44" width="72" height="14" rx="2" opacity="0.55" />
      <rect x="10" y="30" width="80" height="14" rx="2" opacity="0.85" />
    </g>

    <!-- nodes -->
    <g v-else-if="vectorId === 'nodes'" stroke="currentColor" stroke-width="1.2">
      <circle cx="50" cy="28" r="6" fill="currentColor" fill-opacity="0.2" />
      <circle cx="28" cy="68" r="6" fill="currentColor" fill-opacity="0.2" />
      <circle cx="72" cy="68" r="6" fill="currentColor" fill-opacity="0.2" />
      <path d="M50 34 L32 62 M50 34 L68 62 M40 64 L60 64" stroke-linecap="round" opacity="0.9" />
    </g>

    <!-- mesh -->
    <g v-else-if="vectorId === 'mesh'" stroke="currentColor" stroke-width="0.9" opacity="0.85">
      <path d="M20 30 L80 30 M20 50 L80 50 M20 70 L80 70 M30 20 L30 80 M50 20 L50 80 M70 20 L70 80" />
      <circle cx="30" cy="30" r="2.5" fill="currentColor" />
      <circle cx="50" cy="50" r="2.5" fill="currentColor" />
      <circle cx="70" cy="70" r="2.5" fill="currentColor" />
    </g>

    <!-- stack -->
    <g v-else-if="vectorId === 'stack'" stroke="currentColor" stroke-width="1.1">
      <rect x="36" y="20" width="28" height="10" rx="1.5" opacity="0.4" />
      <rect x="32" y="36" width="36" height="12" rx="1.5" opacity="0.6" />
      <rect x="28" y="54" width="44" height="12" rx="1.5" opacity="0.8" />
      <rect x="24" y="72" width="52" height="10" rx="1.5" />
    </g>

    <!-- plug -->
    <g v-else-if="vectorId === 'plug'" stroke="currentColor" stroke-width="1.3" stroke-linecap="round">
      <path d="M20 50 H38 M62 50 H80 M50 32 V50" />
      <rect x="38" y="44" width="24" height="12" rx="2" fill="currentColor" fill-opacity="0.15" />
      <path d="M50 56 V68 M44 68 H56" />
    </g>

    <!-- shield -->
    <g v-else-if="vectorId === 'shield'" stroke="currentColor" stroke-width="1.2" stroke-linejoin="round">
      <path d="M50 18 L70 28 V50 C70 65 50 78 50 78 C50 78 30 65 30 50 V28 Z" fill="currentColor" fill-opacity="0.12" />
      <path d="M45 48 L48 55 L57 40" />
    </g>

    <!-- flow -->
    <g v-else-if="vectorId === 'flow'" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" fill="none">
      <defs>
        <marker :id="`m-${vectorId}`" markerWidth="4" markerHeight="4" refX="2" refY="2" orient="auto">
          <polygon points="0,0 4,2 0,4" fill="currentColor" />
        </marker>
      </defs>
      <circle cx="24" cy="50" r="5" fill="currentColor" fill-opacity="0.25" />
      <circle cx="50" cy="50" r="5" fill="currentColor" fill-opacity="0.25" />
      <circle cx="76" cy="50" r="5" fill="currentColor" fill-opacity="0.25" />
      <path :marker-end="`url(#m-${vectorId})`" d="M29 50 H45 M55 50 H71" />
    </g>

    <!-- doc -->
    <g v-else-if="vectorId === 'doc'" stroke="currentColor" stroke-width="1.1" stroke-linecap="round">
      <rect x="28" y="18" width="44" height="64" rx="3" fill="currentColor" fill-opacity="0.08" />
      <path d="M36 32 H64 M36 44 H64 M36 56 H58" opacity="0.6" />
    </g>

    <!-- loop -->
    <g v-else-if="vectorId === 'loop'" stroke="currentColor" stroke-width="1.2" fill="none" stroke-linecap="round">
      <path d="M28 50 C28 32 40 24 50 24 C64 24 72 36 72 50 C72 64 64 72 50 72 C40 72 32 64 32 50" />
      <path d="M32 50 H22 M50 24 V14" opacity="0.5" />
      <circle cx="50" cy="50" r="4" fill="currentColor" fill-opacity="0.35" />
    </g>

    <!-- gauge -->
    <g v-else-if="vectorId === 'gauge'" stroke="currentColor" stroke-width="1.2" stroke-linecap="round">
      <path d="M20 70 A40 40 0 0 1 80 70" fill="none" />
      <path d="M50 70 L50 50" />
      <circle cx="50" cy="70" r="3" fill="currentColor" fill-opacity="0.4" />
    </g>

    <!-- fn -->
    <g
      v-else-if="vectorId === 'fn'"
      fill="currentColor"
      fill-opacity="0.9"
      font-family="ui-monospace, monospace"
      font-size="13"
    >
      <text x="18" y="58" opacity="0.9">f(x)</text>
      <path
        d="M58 50 H72 M50 40 V60"
        stroke="currentColor"
        fill="none"
        stroke-width="1.1"
        stroke-linecap="round"
      />
      <rect x="68" y="44" width="12" height="12" rx="1" stroke="currentColor" fill="none" opacity="0.45" />
    </g>

    <!-- multi -->
    <g v-else-if="vectorId === 'multi'" stroke="currentColor" stroke-width="1.1" stroke-linecap="round">
      <rect x="22" y="30" width="24" height="20" rx="1.5" opacity="0.35" />
      <circle cx="66" cy="40" r="10" opacity="0.4" />
      <path d="M30 64 H70 M32 70 H50" />
    </g>

    <!-- fallback -->
    <circle v-else cx="50" cy="50" r="32" stroke="currentColor" stroke-width="1" stroke-opacity="0.35" fill="none" />
  </svg>
</template>
