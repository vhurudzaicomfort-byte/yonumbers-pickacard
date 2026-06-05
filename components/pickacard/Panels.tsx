"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { TreasureCard, type CardState } from "@/components/game/TreasureCard";
import { RewardPanel } from "@/components/game/RewardPanel";
import { PickACardLogo } from "@/components/brand/PickACardLogo";
import { GRID_SIZE, pickCard } from "@/lib/gameService";
import { playStore } from "@/lib/pointsStore";
import { useSound } from "@/lib/useSound";
import { vibrate } from "@/lib/haptics";
import type { PickResult } from "@/lib/types";

/**
 * The Pick a Card game grid. Lays out as a flex column that fills the space
 * between the modal header and footer with NO scrolling: the 3×4 grid is sized
 * from the remaining height (aspect-locked wrapper) so it always fits, from
 * 360×640 up to large displays, portrait and landscape. The reward reveal
 * renders on its own top layer above the tiles, so the stars never clip.
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
    <div className="relative flex min-h-0 flex-1 flex-col gap-2 px-4 py-2">
      <div className="flex shrink-0 flex-col items-center text-center">
        <PickACardLogo tone="light" className="w-44" />
        <p className="mt-1 text-xs font-semibold text-slate-600">Every card hides a reward — Airtime, Data &amp; More!</p>
      </div>

      {/* grid area — flexes to fill; aspect-locked so the 3×4 always fits */}
      <div className="flex min-h-0 flex-1 items-center justify-center">
        <div className="grid aspect-[3/4] h-full max-h-full w-auto max-w-full grid-cols-3 grid-rows-4 gap-2 sm:gap-2.5">
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
      </div>

      <p ref={liveRef} aria-live="polite" className="min-h-[1.25rem] shrink-0 text-center font-display text-sm font-bold uppercase tracking-wide text-navy-700">
        {exhausted
          ? "You're out of picks — come back tomorrow!"
          : picked === null
            ? "Pick a card to unlock your reward"
            : ""}
      </p>

      <p className="shrink-0 text-center text-[11px] font-bold uppercase tracking-wide text-slate-400">
        {picksLeft} {picksLeft === 1 ? "pick" : "picks"} left today
      </p>

      {/* reward reveal — own top layer above the grid, never overlapped by tiles */}
      <AnimatePresence>
        {result && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-50 flex items-center justify-center bg-navy-900/45 p-5 backdrop-blur-sm"
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
  );
}
