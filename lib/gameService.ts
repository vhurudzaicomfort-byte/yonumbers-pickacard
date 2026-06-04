import type { PickResult, Prize, PackageOption } from "./types";

/**
 * Mock game service. Win/lose outcome, prize value and points all come from
 * here (configurable weights + tiers) — never hard-coded in the UI. Swap this
 * module for a real API client later; the interface stays identical.
 */

export const PACKAGES: PackageOption[] = [
  { id: "daily", label: "DAILY", price: "US$0.05" },
  { id: "weekly", label: "WEEKLY", price: "US$0.10" },
  { id: "monthly", label: "MONTHLY", price: "US$0.25" },
];

interface PrizeTier extends Prize {
  weight: number;
}

/** Weighted prize table. Tune `weight` to change prize probabilities. */
const PRIZE_TABLE: PrizeTier[] = [
  { kind: "airtime", label: "US$1.00 AIRTIME", points: 15, weight: 6 },
  { kind: "airtime", label: "US$0.50 AIRTIME", points: 10, weight: 10 },
  { kind: "data", label: "500MB DATA", points: 12, weight: 8 },
  { kind: "data", label: "1GB DATA", points: 20, weight: 4 },
  { kind: "points", label: "BONUS POINTS", points: 25, weight: 7 },
];

const LOSE: Prize = { kind: "none", label: "00", points: 5 };

/** Overall probability of a winning pick. */
const WIN_PROBABILITY = 0.55;

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
