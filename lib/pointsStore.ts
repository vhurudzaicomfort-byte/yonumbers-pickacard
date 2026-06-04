"use client";

import { useSyncExternalStore } from "react";

/**
 * Daily-points economy + streak + daily play limit, persisted to localStorage.
 * One source of truth shared by the pop-up game and the portal Home badge.
 */

const KEY = "yonumbers.play.v1";
export const DAILY_PICK_LIMIT = 5;
const STARTING_POINTS = 1251; // matches the design's seeded counter

export interface PlayState {
  points: number;
  /** ISO date (yyyy-mm-dd) the counters below apply to. */
  day: string;
  picksToday: number;
  streak: number;
  /** Whether the user is treated as authenticated this session. */
  authed: boolean;
  /** Whether the user holds an active YoNumbers subscription. */
  subscribed: boolean;
  phone: string;
}

function today(): string {
  return new Date().toISOString().slice(0, 10);
}

function yesterday(): string {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  return d.toISOString().slice(0, 10);
}

const fallback: PlayState = {
  points: STARTING_POINTS,
  day: today(),
  picksToday: 0,
  streak: 1,
  authed: false,
  subscribed: false,
  phone: "",
};

let state: PlayState = fallback;
let hydrated = false;
const listeners = new Set<() => void>();

function persist() {
  try {
    localStorage.setItem(KEY, JSON.stringify(state));
  } catch {
    /* storage unavailable — keep in-memory */
  }
}

function emit() {
  listeners.forEach((l) => l());
}

function hydrate() {
  if (hydrated || typeof window === "undefined") return;
  hydrated = true;
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) state = { ...fallback, ...(JSON.parse(raw) as PlayState) };
  } catch {
    /* ignore */
  }
  // Roll the day over: keep streak if they played yesterday, else reset to 1.
  const t = today();
  if (state.day !== t) {
    state = {
      ...state,
      streak: state.day === yesterday() && state.picksToday > 0 ? state.streak + 1 : 1,
      day: t,
      picksToday: 0,
    };
    persist();
  }
  emit();
}

function set(patch: Partial<PlayState>) {
  state = { ...state, ...patch };
  persist();
  emit();
}

export const playStore = {
  subscribe(listener: () => void) {
    hydrate();
    listeners.add(listener);
    return () => listeners.delete(listener);
  },
  get(): PlayState {
    return state;
  },
  /** Record one pick + award points. Returns the new total. */
  addPick(pointsAwarded: number): number {
    set({ points: state.points + pointsAwarded, picksToday: state.picksToday + 1 });
    return state.points;
  },
  picksLeft(): number {
    return Math.max(0, DAILY_PICK_LIMIT - state.picksToday);
  },
  setAuthed(authed: boolean, phone = state.phone) {
    set({ authed, phone });
  },
  setSubscribed(subscribed: boolean) {
    set({ subscribed });
  },
  reset() {
    set({ ...fallback, day: today() });
  },
};

const serverSnapshot: PlayState = fallback;

export function usePlayState(): PlayState {
  return useSyncExternalStore(
    playStore.subscribe,
    playStore.get,
    () => serverSnapshot,
  );
}
