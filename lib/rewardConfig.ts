/**
 * YoNumbers reward logic — a single, tunable config (Revamp Review §6–§7).
 * Econet sets the live values; the UI and services only read from here.
 * Nothing about payout is hard-coded in components.
 */

import type { Prize } from "./types";

/* ------------------------------------------------------------------ *
 * §6 — Daily Number Match prize tiers (configurable)
 * Award the HIGHEST qualifying tier only (not cumulative). Values are
 * illustrative — Econet sets actual amounts and caps.
 * ------------------------------------------------------------------ */
export interface DailyTier {
  /** Trailing digits matched (from the end of the MSISDN). */
  digits: number;
  name: string;
  /** Illustrative airtime prize label. */
  prize: string;
}

export const DAILY_NUMBER_TIERS: DailyTier[] = [
  { digits: 2, name: "Match 2", prize: "US$0.10" },
  { digits: 3, name: "Match 3", prize: "US$0.25" },
  { digits: 4, name: "Match 4", prize: "US$0.50" },
  { digits: 5, name: "Match 5", prize: "US$1.00" },
  { digits: 6, name: "Match 6", prize: "US$2.50" },
  { digits: 7, name: "Match 7", prize: "US$5.00" },
  { digits: 8, name: "Grand Win", prize: "Top Prize" },
];

/* ------------------------------------------------------------------ *
 * §7 — Pick a Card points engine (illustrative — Econet tunes)
 * ------------------------------------------------------------------ */
export const POINTS = {
  /** Subscribed + took part today. */
  dailyParticipation: 50,
  /** Per Pick a Card flip (engagement). */
  perFlip: 10,
  /** Daily Number digit-match bonus: +25 × (digitsMatched − 1). */
  matchBonusPerDigit: 25,
  /** Daily streak bonus: +20 × min(streakDay, streakCap). */
  streakPerDay: 20,
  streakCap: 7,
} as const;

/** §7.2 Conversion constant — points per US$1.00. */
export const POINTS_PER_USD = 2000; // K — 100 pts = US$0.05

/** Free Pick a Card flips granted per day. */
export const FREE_FLIPS_PER_DAY = 5;

/** Redeemable value (US$) of a points balance. */
export function pointsToUsd(points: number): number {
  return points / POINTS_PER_USD;
}

/* ------------------------------------------------------------------ *
 * §7.3 — Pick a Card reveal: weighted prize table (weights sum to 100).
 * ------------------------------------------------------------------ */
export interface PrizeTier extends Prize {
  weight: number;
}

export const PICK_A_CARD_PRIZES: PrizeTier[] = [
  { kind: "airtime", label: "US$1.00 AIRTIME", points: 15, weight: 6 },
  { kind: "airtime", label: "US$0.50 AIRTIME", points: 10, weight: 10 },
  { kind: "data", label: "500MB DATA", points: 12, weight: 8 },
  { kind: "data", label: "1GB DATA", points: 20, weight: 4 },
  { kind: "points", label: "BONUS POINTS", points: 25, weight: 7 },
];

export const LOSE_PRIZE: Prize = { kind: "none", label: "00", points: 5 };

/** Overall probability of a winning pick (demo balance). */
export const WIN_PROBABILITY = 0.55;
