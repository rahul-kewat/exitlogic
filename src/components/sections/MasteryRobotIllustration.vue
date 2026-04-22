<script setup lang="ts">
/**
 * Stylized 3D-style robot bust — face + upper torso, hands in a conversational gesture.
 * Monochrome greys; gradients for metallic depth.
 */
</script>

<template>
  <svg
    class="mx-auto h-auto w-full max-w-[260px] drop-shadow-[0_24px_60px_rgba(0,0,0,0.5)] sm:max-w-[300px]"
    viewBox="0 0 320 400"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <defs>
      <linearGradient id="mr-surface" x1="50%" y1="0%" x2="50%" y2="100%">
        <stop offset="0%" stop-color="#6a6a6a" />
        <stop offset="35%" stop-color="#3a3a3a" />
        <stop offset="100%" stop-color="#0e0e0e" />
      </linearGradient>
      <linearGradient id="mr-shadow" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#505050" />
        <stop offset="100%" stop-color="#141414" />
      </linearGradient>
      <linearGradient id="mr-visor" x1="50%" y1="0%" x2="50%" y2="100%">
        <stop offset="0%" stop-color="#404040" />
        <stop offset="55%" stop-color="#080808" />
        <stop offset="100%" stop-color="#222" />
      </linearGradient>
      <linearGradient id="mr-scan" x1="0%" y1="50%" x2="100%" y2="50%">
        <stop offset="0%" stop-color="#666" stop-opacity="0.3" />
        <stop offset="50%" stop-color="#ddd" stop-opacity="0.85" />
        <stop offset="100%" stop-color="#666" stop-opacity="0.3" />
      </linearGradient>
      <filter id="mr-drop" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur in="SourceAlpha" stdDeviation="2.5" result="b" />
        <feOffset in="b" dy="4" result="o" />
        <feFlood flood-color="#000" flood-opacity="0.55" />
        <feComposite in2="o" operator="in" />
        <feMerge>
          <feMergeNode />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </defs>

    <ellipse cx="160" cy="378" rx="100" ry="11" fill="#000" opacity="0.45" />

    <!-- Torso -->
    <path
      filter="url(#mr-drop)"
      d="M94 222c0-9 7-16 16-16h100c9 0 16 7 16 16v112c0 13-11 24-24 24H118c-13 0-24-11-24-24V222z"
      fill="url(#mr-surface)"
    />
    <path d="M110 246h100v2.5H110V246zm0 20h84v2.5H110V266zm0 20h100v2.5H110V286z" fill="#fff" opacity="0.06" />
    <rect x="128" y="298" width="64" height="36" rx="5" fill="url(#mr-shadow)" opacity="0.9" />

    <!-- Neck -->
    <rect x="140" y="196" width="40" height="30" rx="7" fill="url(#mr-shadow)" />

    <!-- Head -->
    <path
      filter="url(#mr-drop)"
      d="M84 58c0-22 18-40 40-40h72c22 0 40 18 40 40v96c0 14-12 26-26 26H110c-14 0-26-12-26-26V58z"
      fill="url(#mr-surface)"
    />
    <ellipse cx="160" cy="40" rx="54" ry="18" fill="#fff" opacity="0.07" />

    <!-- Visor -->
    <rect x="96" y="86" width="128" height="52" rx="11" fill="url(#mr-visor)" />
    <rect x="96" y="86" width="128" height="52" rx="11" stroke="#fff" stroke-opacity="0.09" stroke-width="1" />
    <rect x="114" y="104" width="38" height="11" rx="2.5" fill="url(#mr-scan)" />
    <rect x="168" y="104" width="38" height="11" rx="2.5" fill="url(#mr-scan)" />

    <path d="M122 166h76v8c0 6-8 11-18 11h-40c-10 0-18-5-18-11v-8z" fill="#121212" opacity="0.88" />

    <!-- Shoulders -->
    <ellipse cx="90" cy="222" rx="24" ry="16" fill="url(#mr-shadow)" />
    <ellipse cx="230" cy="222" rx="24" ry="16" fill="url(#mr-shadow)" />

    <!-- Left arm (screen left): curve up — open hand near face -->
    <path
      d="M66 214 C40 200 28 170 36 140 C44 110 68 88 92 100 C108 108 112 128 100 152 C92 172 76 196 66 214"
      stroke="url(#mr-shadow)"
      stroke-width="26"
      stroke-linecap="round"
      fill="none"
    />
    <circle cx="48" cy="128" r="22" fill="url(#mr-surface)" filter="url(#mr-drop)" />
    <path d="M40 118l4 12M48 114l3 14M56 116l2 12" stroke="#fff" stroke-opacity="0.2" stroke-width="1.5" stroke-linecap="round" />

    <!-- Right arm: forward / explaining -->
    <path
      d="M254 214 C280 198 298 168 292 138 C286 108 268 88 246 96 C230 102 222 120 228 142 C234 168 246 194 254 214"
      stroke="url(#mr-shadow)"
      stroke-width="24"
      stroke-linecap="round"
      fill="none"
    />
    <ellipse cx="278" cy="118" rx="20" ry="26" fill="url(#mr-surface)" filter="url(#mr-drop)" transform="rotate(-6 278 118)" />
    <path d="M268 104l3 11M276 102l2 12M284 104l2 10" stroke="#fff" stroke-opacity="0.18" stroke-width="1.3" stroke-linecap="round" />

    <!-- Subtle brand rim -->
    <path
      d="M84 58c0-22 18-40 40-40h72c22 0 40 18 40 40"
      stroke="#00D9FF"
      stroke-opacity="0.14"
      stroke-width="1"
    />
  </svg>
</template>
