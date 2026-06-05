/**
 * Daily Number Match logic (Revamp Review §6). Demo implementation — a real
 * deployment generates the Daily Number from the active subscribed base.
 */

import { DAILY_NUMBER_TIERS, type DailyTier } from "./rewardConfig";

/** Significant trailing digits used for matching. */
export const DAILY_DIGITS = 8;

/** Deterministic demo Daily Number for a given ISO date (yyyy-mm-dd). */
export function dailyNumberFor(isoDate: string): string {
  let seed = 0;
  for (const ch of isoDate) seed = (seed * 31 + ch.charCodeAt(0)) >>> 0;
  let out = "";
  for (let i = 0; i < DAILY_DIGITS; i++) {
    seed = (seed * 1103515245 + 12345) >>> 0;
    out += ((seed >>> 16) % 10).toString();
  }
  return out;
}

/** Longest run of matching trailing digits between two numeric strings. */
export function longestTrailingMatch(msisdn: string, dailyNumber: string): number {
  const a = msisdn.replace(/\D/g, "");
  const b = dailyNumber.replace(/\D/g, "");
  let n = 0;
  while (n < a.length && n < b.length && a[a.length - 1 - n] === b[b.length - 1 - n]) n++;
  return n;
}

/** Highest qualifying tier for a match length, or null if below the threshold. */
export function tierForMatch(matchLen: number): DailyTier | null {
  let best: DailyTier | null = null;
  for (const t of DAILY_NUMBER_TIERS) if (matchLen >= t.digits) best = t;
  return best;
}

/** Convenience: evaluate a subscriber number against a day's Daily Number. */
export function evaluateDailyMatch(msisdn: string, isoDate: string) {
  const dailyNumber = dailyNumberFor(isoDate);
  const matchLen = longestTrailingMatch(msisdn, dailyNumber);
  return { dailyNumber, matchLen, tier: tierForMatch(matchLen) };
}

function seedFrom(isoDate: string): number {
  let seed = 0;
  for (const ch of isoDate) seed = (seed * 31 + ch.charCodeAt(0)) >>> 0;
  return seed;
}

/** Demo: total winners from a day's draw (deterministic per date). */
export function winnersFor(isoDate: string): number {
  return 600 + (seedFrom(isoDate + "w") % 900);
}

// DEMO: rotate the user's match result on each load so reviewers can see every
// state (no match → partial tiers → Grand Win). Set to false to disable.
export const DEMO_ROTATE_MATCH = true;
const DEMO_MATCH_LENS = [0, 2, 4, 6, 8];

/** Advance and return the next demo match length (cycles, persisted per device). */
export function nextDemoMatchLen(): number {
  try {
    const k = "yonumbers.demo.matchIdx";
    const i = (parseInt(localStorage.getItem(k) ?? "-1", 10) + 1) % DEMO_MATCH_LENS.length;
    localStorage.setItem(k, String(i));
    return DEMO_MATCH_LENS[i];
  } catch {
    return 0;
  }
}

/** Demo: the grand winner of a day's draw — a masked number + full-match prize. */
export function grandWinnerFor(isoDate: string): { masked: string; digits: number; prize: string } {
  const dn = dailyNumberFor(isoDate);
  const grand = tierForMatch(DAILY_DIGITS);
  return { masked: `07****${dn.slice(-4)}`, digits: DAILY_DIGITS, prize: grand ? grand.prize : "Top Prize" };
}
