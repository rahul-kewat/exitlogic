<script setup lang="ts">
const rows = [
  {
    label: 'Daily reality',
    traditional: '8 hours of hand-coding, meetings that eat the clock',
    exitlogic: '~2 hours of high-leverage work with AI; async by default',
  },
  {
    label: 'Income ceiling',
    traditional: 'Salary cap, promotion lottery, “next year” forever',
    exitlogic: 'Freelance scale, retainers, offers you choose—not HR’s band',
  },
  {
    label: 'Tools & edge',
    traditional: 'Stack from three jobs ago, “we’ve always done it this way”',
    exitlogic: 'Cursor + AI workflow, architecture-first, ship like it’s 2026',
  },
  {
    label: 'Location',
    traditional: 'Commute, badge swipe, open floor “culture”',
    exitlogic: 'Work from anywhere your pipeline allows',
  },
] as const
</script>

<template>
  <section id="comparison" class="mx-auto max-w-[90rem] px-5 py-28 sm:px-10 sm:py-36 lg:px-14">
    <div class="mb-12 max-w-3xl sm:mb-16">
      <p class="font-mono mb-4 text-[10px] uppercase tracking-[0.45em] text-[#00D9FF]/75">the split</p>
      <h2 class="font-display text-[clamp(1.875rem,4vw,3rem)] font-bold tracking-[-0.03em] text-[#FAFAFA]">
        Traditional developer vs ExitLogic developer
      </h2>
      <p class="font-sans mt-6 max-w-2xl text-lg leading-relaxed text-[#E8E8E8]/55">
        Same title on LinkedIn. Opposite trajectories. One path keeps you replaceable; the other builds an exit.
      </p>
    </div>

    <div class="overflow-x-auto rounded-2xl border border-white/[0.08] bg-[#0D1117]/40">
      <table class="w-full min-w-[640px] border-collapse text-left text-sm sm:text-[15px]">
        <thead>
          <tr class="border-b border-white/[0.08] bg-white/[0.03]">
            <th class="font-mono px-4 py-4 text-[10px] uppercase tracking-[0.2em] text-[#F4F4F4]/45 sm:px-6" />
            <th
              class="font-display px-4 py-4 text-xs font-bold uppercase tracking-[0.15em] text-[#F4F4F4]/50 sm:px-6 sm:text-sm"
            >
              Traditional
            </th>
            <th
              class="font-display px-4 py-4 text-xs font-bold uppercase tracking-[0.15em] text-[#00D9FF] sm:px-6 sm:text-sm"
            >
              ExitLogic
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="row in rows"
            :key="row.label"
            class="border-b border-white/[0.06] last:border-b-0"
          >
            <th
              class="font-mono px-4 py-5 align-top text-[10px] uppercase tracking-[0.18em] text-[#00D9FF]/70 sm:px-6 sm:py-6"
            >
              {{ row.label }}
            </th>
            <td class="max-w-[280px] px-4 py-5 align-top text-[#E8E8E8]/55 sm:px-6 sm:py-6">
              {{ row.traditional }}
            </td>
            <td class="max-w-[280px] px-4 py-5 align-top text-[#E8E8E8]/85 sm:px-6 sm:py-6">
              {{ row.exitlogic }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>
</template>
