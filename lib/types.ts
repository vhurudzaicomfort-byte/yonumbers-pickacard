/** Shared domain types for the mock game/auth services. */

export type PrizeKind = "airtime" | "data" | "points" | "none";

export interface Prize {
  kind: PrizeKind;
  /** Human label, e.g. "US$1.00 AIRTIME" or "500MB DATA". */
  label: string;
  /** Daily points awarded with this outcome. */
  points: number;
}

export interface PickResult {
  win: boolean;
  prize: Prize;
  /** Index of the picked card (0-11). */
  cardIndex: number;
}

export interface PackageOption {
  id: "daily" | "weekly" | "monthly";
  label: string;
  price: string;
}

export type AuthMode = "subscribe" | "login";
