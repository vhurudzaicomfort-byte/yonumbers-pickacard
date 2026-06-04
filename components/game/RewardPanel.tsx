"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Star } from "@/components/ui/Star";
import { Coin } from "@/components/brand/Coin";
import { fireConfetti } from "@/lib/confetti";
import { useSound } from "@/lib/useSound";
import { vibrate } from "@/lib/haptics";
import { cn } from "@/lib/cn";
import type { PickResult } from "@/lib/types";

/**
 * Win/lose reward card — Core theme. Navy ribbon (win) / red ribbon (lose),
 * staggered brand stars, prize, and a red CLAIM / TRY AGAIN action.
 */
export function RewardPanel({
  result,
  onClaim,
  onRetry,
}: {
  result: PickResult;
  onClaim: () => void;
  onRetry: () => void;
}) {
  const win = result.win;
  const play = useSound();

  useEffect(() => {
    if (win) {
      fireConfetti();
      play("win");
      vibrate([18, 40, 18, 40, 60]);
    } else {
      play("lose");
      vibrate(30);
    }
  }, [win, play]);

  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0, y: 20 }}
      animate={{ scale: 1, opacity: 1, y: 0 }}
      exit={{ scale: 0.85, opacity: 0 }}
      transition={{ type: "spring", stiffness: 320, damping: 24 }}
      className="relative w-full max-w-[300px]"
      role="alertdialog"
      aria-label={win ? "Congratulations" : "Try again"}
    >
      {/* Decorative stars: a symmetric crest sitting BEHIND the ribbon (z-0).
          They peek above the banner but never cover the message — the text
          always renders on solid colour, so contrast stays WCAG-safe. */}
      <div className="pointer-events-none absolute inset-x-0 -top-7 z-0 flex items-end justify-center gap-3">
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            initial={{ scale: 0, y: 8 }}
            animate={{ scale: i === 1 ? 1 : 0.62, y: i === 1 ? -6 : 0 }}
            transition={{ delay: 0.12 + i * 0.1, type: "spring", stiffness: 460, damping: 15 }}
          >
            <Star className={cn("drop-shadow-sm", i === 1 ? "h-10 w-10" : "h-6 w-6")} tone={win ? "gold" : "muted"} />
          </motion.span>
        ))}
      </div>

      {/* CSS ribbon banner — sits above the stars (z-10) so the message stays dominant */}
      <div className="relative z-10 mx-auto -mb-3 w-[108%] -translate-x-[4%]">
        <div
          className={cn(
            "relative py-2.5 text-center font-display text-[15px] font-extrabold uppercase tracking-wider text-white shadow-md",
            win ? "bg-navy-700" : "bg-brand-red",
          )}
          style={{ clipPath: "polygon(4% 0, 96% 0, 100% 50%, 96% 100%, 4% 100%, 0 50%)" }}
        >
          {win ? "Congratulations!" : "Oops you failed!"}
        </div>
      </div>

      {/* card body */}
      <div className="rounded-card bg-white px-6 pb-6 pt-7 text-center shadow-card">
        <p className="font-display font-bold uppercase tracking-wide text-navy-500">You have won</p>
        {win ? (
          <>
            <p className="mt-2 rounded-pill bg-navy-100 py-2 font-display text-xl font-extrabold text-navy-700">
              {result.prize.label}
            </p>
            <p className="mt-4 font-display font-bold uppercase tracking-wide text-navy-500">
              With Daily Points
            </p>
            <div className="mt-1 flex items-center justify-center gap-2">
              <Coin className="h-7 w-7" />
              <span className="font-display text-2xl font-extrabold text-navy-700">{result.prize.points}</span>
            </div>
            <Button variant="red" size="md" className="mt-5 w-full" onClick={onClaim}>
              Claim
            </Button>
          </>
        ) : (
          <>
            <p className="mt-2 rounded-pill bg-navy-100 py-2 font-display text-2xl font-extrabold text-navy-700">00</p>
            <p className="mt-3 text-sm font-bold text-ink">+{result.prize.points} points for playing</p>
            <Button variant="red" size="md" className="mt-5 w-full" onClick={onRetry}>
              Try Again
            </Button>
          </>
        )}
      </div>
    </motion.div>
  );
}
