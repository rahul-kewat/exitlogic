/**
 * Early access window (frontend-only; replace with API response later).
 * One month from start → end (inclusive).
 */
export const EARLY_ACCESS_START = new Date('2026-04-02T00:00:00Z')
export const EARLY_ACCESS_END = new Date('2026-05-02T23:59:59Z')

export function isEarlyAccessActive(now: Date = new Date()): boolean {
  return now >= EARLY_ACCESS_START && now <= EARLY_ACCESS_END
}
