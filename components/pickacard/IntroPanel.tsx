"use client";

import { motion } from "framer-motion";
import { Lockup } from "@/components/brand/Lockup";
import { Star } from "@/components/ui/Star";
import { Button } from "@/components/ui/Button";

/**
 * Welcome / qualify entry state shown when the pop-up auto-opens after login.
 * A congratulatory beat before the grid, with a single red "Play & Win" CTA and
 * a low-emphasis dismiss so the user is never trapped.
 */
export function IntroPanel({ onPlay, onDismiss }: { onPlay: () => void; onDismiss: () => void }) {
  const stars = [
    { size: "h-7 w-7", lift: "translate-y-1" },
    { size: "h-12 w-12", lift: "-translate-y-1" },
    { size: "h-7 w-7", lift: "translate-y-1" },
  ];
  return (
    <div className="flex min-h-0 flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
      <div className="flex items-end justify-center gap-3">
        {stars.map((s, i) => (
          <motion.span
            key={i}
            className={s.lift}
            initial={{ scale: 0, y: 12 }}
            animate={{ scale: 1, y: 0 }}
            transition={{ delay: 0.08 + i * 0.12, type: "spring", stiffness: 460, damping: 13 }}
          >
            <Star className={s.size} tone="gold" />
          </motion.span>
        ))}
      </div>

      <Lockup tone="light" className="text-xl" priority />

      <h2 className="font-display text-2xl font-extrabold leading-tight text-navy-700">
        Congratulations!
      </h2>
      <p className="-mt-2 font-display text-base font-bold text-navy-700">
        You qualify for the Pick&nbsp;a&nbsp;Card&nbsp;&amp;&nbsp;Win promotion
      </p>
      <p className="max-w-[300px] font-body text-sm text-slate-600">
        Match the Daily Number and flip a card to win airtime, data &amp; more.
      </p>

      <div className="mt-1 flex w-full max-w-[320px] flex-col items-center gap-2">
        <Button variant="red" size="lg" className="w-full" onClick={onPlay}>
          Play &amp; Win
        </Button>
        <button
          onClick={onDismiss}
          className="py-1 font-display text-sm font-bold text-slate-400 transition-colors hover:text-slate-600"
        >
          Maybe later
        </button>
      </div>
    </div>
  );
}
