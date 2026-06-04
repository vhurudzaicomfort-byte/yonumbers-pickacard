"use client";

import { useCallback, useEffect, useRef, useSyncExternalStore } from "react";

/**
 * Tiny synthesised sound layer (Web Audio) — no asset files to ship or
 * preload, never autoplays before a user gesture, and respects a persisted
 * mute toggle + prefers-reduced-motion (eases intensity).
 */

export type Cue =
  | "open"
  | "hover"
  | "pick"
  | "flip"
  | "win"
  | "lose"
  | "claim"
  | "press"
  | "close";

const MUTE_KEY = "yonumbers.muted.v1";
let muted = false;
let muteHydrated = false;
const muteListeners = new Set<() => void>();

function hydrateMute() {
  if (muteHydrated || typeof window === "undefined") return;
  muteHydrated = true;
  try {
    muted = localStorage.getItem(MUTE_KEY) === "1";
  } catch {
    /* ignore */
  }
  muteListeners.forEach((l) => l());
}

export function useMuted(): [boolean, () => void] {
  const value = useSyncExternalStore(
    (l) => {
      hydrateMute();
      muteListeners.add(l);
      return () => muteListeners.delete(l);
    },
    () => muted,
    () => false,
  );
  const toggle = useCallback(() => {
    muted = !muted;
    try {
      localStorage.setItem(MUTE_KEY, muted ? "1" : "0");
    } catch {
      /* ignore */
    }
    muteListeners.forEach((l) => l());
  }, []);
  return [value, toggle];
}

type Note = { f: number; t: number; d: number; type?: OscillatorType; g?: number };

const reduced = () =>
  typeof window !== "undefined" &&
  window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

const CUES: Record<Cue, Note[]> = {
  open: [{ f: 420, t: 0, d: 0.12, type: "sine" }, { f: 720, t: 0.06, d: 0.14, type: "sine" }],
  hover: [{ f: 880, t: 0, d: 0.04, type: "triangle", g: 0.12 }],
  pick: [{ f: 540, t: 0, d: 0.06, type: "square", g: 0.18 }, { f: 760, t: 0.04, d: 0.08, type: "square" }],
  flip: [{ f: 300, t: 0, d: 0.1, type: "sawtooth", g: 0.12 }, { f: 900, t: 0.12, d: 0.12, type: "sine" }],
  win: [
    { f: 660, t: 0, d: 0.12, type: "triangle" },
    { f: 880, t: 0.1, d: 0.12, type: "triangle" },
    { f: 1170, t: 0.2, d: 0.18, type: "triangle" },
    { f: 1568, t: 0.32, d: 0.26, type: "sine" },
  ],
  lose: [{ f: 380, t: 0, d: 0.18, type: "sine", g: 0.16 }, { f: 300, t: 0.16, d: 0.22, type: "sine", g: 0.14 }],
  claim: [
    { f: 990, t: 0, d: 0.08, type: "sine" },
    { f: 1320, t: 0.07, d: 0.1, type: "sine" },
    { f: 1760, t: 0.16, d: 0.16, type: "sine" },
  ],
  press: [{ f: 480, t: 0, d: 0.05, type: "triangle", g: 0.16 }],
  close: [{ f: 620, t: 0, d: 0.1, type: "sine" }, { f: 360, t: 0.06, d: 0.12, type: "sine" }],
};

export function useSound() {
  const ctxRef = useRef<AudioContext | null>(null);

  const ensure = useCallback(() => {
    if (typeof window === "undefined") return null;
    if (!ctxRef.current) {
      const AC = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AC) return null;
      ctxRef.current = new AC();
    }
    if (ctxRef.current.state === "suspended") void ctxRef.current.resume();
    return ctxRef.current;
  }, []);

  const play = useCallback(
    (cue: Cue) => {
      hydrateMute();
      if (muted) return;
      const ctx = ensure();
      if (!ctx) return;
      const intensity = reduced() ? 0.4 : 1;
      const now = ctx.currentTime;
      for (const n of CUES[cue]) {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = n.type ?? "sine";
        osc.frequency.value = n.f;
        const peak = (n.g ?? 0.2) * intensity;
        gain.gain.setValueAtTime(0.0001, now + n.t);
        gain.gain.exponentialRampToValueAtTime(peak, now + n.t + 0.012);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + n.t + n.d);
        osc.connect(gain).connect(ctx.destination);
        osc.start(now + n.t);
        osc.stop(now + n.t + n.d + 0.02);
      }
    },
    [ensure],
  );

  useEffect(() => {
    return () => {
      void ctxRef.current?.close();
      ctxRef.current = null;
    };
  }, []);

  return play;
}
