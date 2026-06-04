"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { TreasureCard, type CardState } from "@/components/game/TreasureCard";
import { RewardPanel } from "@/components/game/RewardPanel";
import { GRID_SIZE, pickCard } from "@/lib/gameService";
import { playStore } from "@/lib/pointsStore";
import { useSound } from "@/lib/useSound";
import { vibrate } from "@/lib/haptics";
import type { PickResult } from "@/lib/types";

/**
 * The Pick a Card game grid — the entire in-overlay experience (Addendum B:
 * no auth/OTP inside the pop-up; it goes straight to play). Core themed.
 */
export function GridPanel({ onPointsChange, onClose }: { onPointsChange: (p: number) => void; onClose: () => void }) {
  const [states, setStates] = useState<CardState[]>(() => Array(GRID_SIZE).fill("idle"));
  const [picked, setPicked] = useState<number | null>(null);
  const [result, setResult] = useState<PickResult | null>(null);
  const [busy, setBusy] = useState(false);
  const play = useSound();
  const liveRef = useRef<HTMLParagraphElement | null>(null);

  const picksLeft = playStore.picksLeft();
  const exhausted = picksLeft <= 0 && !result;

  const handlePick = async (index: number) => {
    if (busy || picked !== null || playStore.picksLeft() <= 0) return;
    setBusy(true);
    setPicked(index);
    play("pick");
    vibrate(12);
    setStates((s) => s.map((v, i) => (i === index ? "flipping" : v)));
    if (liveRef.current) liveRef.current.textContent = "Great choice! Flipping your card…";

    const res = await pickCard(index);
    play("flip");
    const newTotal = playStore.addPick(res.prize.points);
    onPointsChange(newTotal);
    setStates((s) => s.map((v, i) => (i === index ? (res.win ? "won" : "lost") : v)));
    setTimeout(() => setResult(res), 650);
    setBusy(false);
  };

  const reset = () => {
    setStates(Array(GRID_SIZE).fill("idle"));
    setPicked(null);
    setResult(null);
  };

  return (
    <div className="flex flex-col gap-4 px-4 pb-5 pt-2">
      <div className="text-center">
        <h2 className="font-display text-xl font-extrabold text-navy-700">Pick a Card &amp; Win</h2>
        <p className="mt-0.5 text-sm font-semibold text-ink">Every card hides a reward — Airtime, Data &amp; More!</p>
      </div>

      {/* game panel */}
      <div className="relative rounded-card bg-surface-alt p-3 shadow-soft sm:p-4">
        <div className="grid grid-cols-3 gap-2.5 sm:gap-3">
          {states.map((st, i) => (
            <TreasureCard
              key={i}
              index={i}
              state={st}
              disabled={busy || (picked !== null && picked !== i) || exhausted}
              onPick={handlePick}
              onHover={() => !picked && play("hover")}
            />
          ))}
        </div>

        <AnimatePresence>
          {result && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 z-20 flex items-center justify-center rounded-card bg-navy-900/35 p-3 backdrop-blur-[2px]"
            >
              <RewardPanel
                result={result}
                onClaim={() => {
                  play("claim");
                  onClose();
                }}
                onRetry={() => (playStore.picksLeft() > 0 ? reset() : onClose())}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <p ref={liveRef} aria-live="polite" className="min-h-[1.5rem] text-center font-display font-bold uppercase tracking-wide text-navy-700">
        {exhausted
          ? "You're out of picks — come back tomorrow!"
          : picked === null
            ? "Pick a card to unlock your reward"
            : ""}
      </p>

      <p className="text-center text-xs font-bold uppercase tracking-wide text-ink">
        {picksLeft} {picksLeft === 1 ? "pick" : "picks"} left today
      </p>
    </div>
  );
}
