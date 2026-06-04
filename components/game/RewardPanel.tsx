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
 * Win / lose reward card. Rendered on the modal's own top layer (above the card
 * grid), so the celebration stars sit fully in front of the ribbon, centred and
 * un-clipped: centre star larger + raised, two smaller outer stars, even gap.
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

  // small · large(raised) · small — symmetric, evenly spaced.
  const stars = [
    { size: "h-7 w-7", lift: "translate-y-1" },
    { size: "h-11 w-11", lift: "-translate-y-2" },
    { size: "h-7 w-7", lift: "translate-y-1" },
  ];

  return (
    <motion.div
      initial={{ scale: 0.82, opacity: 0, y: 18 }}
      animate={{ scale: 1, opacity: 1, y: 0 }}
      exit={{ scale: 0.85, opacity: 0 }}
      transition={{ type: "spring", stiffness: 320, damping: 26 }}
      className="relative w-full max-w-[320px]"
      role="alertdialog"
      aria-label={win ? "Congratulations, you won a prize" : "So close, play again"}
    >
      {/* stars — centred group, in front of the ribbon, never clipped */}
      <div className="relative z-30 -mb-3 flex items-end justify-center gap-2.5 px-2">
        {stars.map((s, i) => (
          <motion.span
            key={i}
            className={cn(s.lift)}
            initial={{ scale: 0, y: 10 }}
            animate={{ scale: 1, y: 0 }}
            transition={{ delay: 0.1 + i * 0.12, type: "spring", stiffness: 460, damping: 14 }}
          >
            <Star className={s.size} tone={win ? "gold" : "muted"} />
          </motion.span>
        ))}
      </div>

      {/* ribbon banner */}
      <div className="relative z-20 mx-auto w-[104%] -translate-x-[2%]">
        <div
          className={cn(
            "relative py-2.5 text-center font-display text-[15px] font-extrabold uppercase tracking-wider text-white shadow-md",
            win ? "bg-navy-700" : "bg-brand-red",
          )}
          style={{ clipPath: "polygon(4% 0, 96% 0, 100% 50%, 96% 100%, 4% 100%, 0 50%)" }}
        >
          {win ? "Congratulations!" : "So close — Play Again!"}
        </div>
      </div>

      {/* card body */}
      <div className="relative z-10 -mt-2 rounded-card bg-white px-6 pb-6 pt-7 text-center shadow-card">
        <p className="font-display text-sm font-bold uppercase tracking-wide text-slate-600">
          {win ? "You have won" : "Better luck next flip"}
        </p>
        {win ? (
          <>
            <p className="mt-2 rounded-pill bg-amber-500/15 py-2 font-display text-xl font-extrabold text-navy-700">
              {result.prize.label}
            </p>
            <p className="mt-4 font-display text-sm font-bold uppercase tracking-wide text-slate-600">
              With Daily Points
            </p>
            <div className="mt-1 flex items-center justify-center gap-2">
              <Coin className="h-7 w-7" />
              <span className="font-display text-2xl font-extrabold text-navy-700">{result.prize.points}</span>
            </div>
            <Button variant="red" size="md" className="mt-5 w-full" onClick={onClaim}>
              Claim Prize
            </Button>
          </>
        ) : (
          <>
            <p className="mt-2 rounded-pill bg-navy-100 py-2 font-display text-2xl font-extrabold text-navy-700">00</p>
            <p className="mt-3 text-sm font-bold text-slate-600">+{result.prize.points} points for playing</p>
            <Button variant="red" size="md" className="mt-5 w-full" onClick={onRetry}>
              Play Again
            </Button>
          </>
        )}
      </div>
    </motion.div>
  );
}
