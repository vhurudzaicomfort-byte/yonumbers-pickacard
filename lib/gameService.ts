import type { PickResult, Prize, PackageOption } from "./types";
import { PICK_A_CARD_PRIZES as PRIZE_TABLE, LOSE_PRIZE as LOSE, WIN_PROBABILITY } from "./rewardConfig";

/**
 * Mock game service. Win/lose outcome, prize value and points all come from the
 * tunable reward config (see lib/rewardConfig.ts) — never hard-coded in the UI.
 * Swap this module for a real API client later; the interface stays identical.
 */

export const PACKAGES: PackageOption[] = [
  { id: "daily", label: "DAILY", price: "US$0.05" },
  { id: "weekly", label: "WEEKLY", price: "US$0.10" },
  { id: "monthly", label: "MONTHLY", price: "US$0.25" },
];

function weightedPrize(): Prize {
  const total = PRIZE_TABLE.reduce((s, p) => s + p.weight, 0);
  let r = Math.random() * total;
  for (const p of PRIZE_TABLE) {
    r -= p.weight;
    if (r <= 0) return { kind: p.kind, label: p.label, points: p.points };
  }
  return PRIZE_TABLE[0];
}

/** Simulate picking a card. Returns the outcome for the given tile index. */
export function pickCard(cardIndex: number): Promise<PickResult> {
  return new Promise((resolve) => {
    const win = Math.random() < WIN_PROBABILITY;
    const prize = win ? weightedPrize() : LOSE;
    // Small latency so the flip status text reads naturally.
    setTimeout(() => resolve({ win, prize, cardIndex }), 450);
  });
}

export const GRID_SIZE = 12; // 3 columns x 4 rows
