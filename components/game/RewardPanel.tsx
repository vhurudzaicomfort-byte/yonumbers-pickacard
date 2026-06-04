"use client";

import Image from "next/image";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Coin } from "@/components/brand/Coin";
import { fireConfetti } from "@/lib/confetti";
import { useSound } from "@/lib/useSound";
import { vibrate } from "@/lib/haptics";
import type { PickResult } from "@/lib/types";

/**
 * Win/lose reward card — ribbon banner, staggered stars, prize, and the
 * CLAIM (win) / TRY AGAIN (lose) candy action.
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

  const star = win ? "/brand/star-gold.png" : "/brand/star-purple.png";
  const ribbon = win ? "/brand/ribbon-win.png" : "/brand/ribbon-lose.png";

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
      {/* stars peeking above the ribbon */}
      <div className="absolute -top-7 left-1/2 z-20 flex -translate-x-1/2 gap-1">
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            initial={{ scale: 0, rotate: -30 }}
            animate={{ scale: i === 1 ? 1.25 : 1, rotate: 0, y: i === 1 ? -6 : 0 }}
            transition={{ delay: 0.15 + i * 0.12, type: "spring", stiffness: 500, damping: 14 }}
            className="relative block h-12 w-12"
          >
            <Image src={star} alt="" aria-hidden fill sizes="48px" className="object-contain" />
          </motion.span>
        ))}
      </div>

      {/* ribbon banner */}
      <div className="relative z-10 mx-auto -mb-4 h-[52px] w-[112%] -translate-x-[5%]">
        <Image src={ribbon} alt={win ? "Congratulations!" : "Oops you failed!"} fill sizes="330px" className="object-contain" />
      </div>

      {/* card body */}
      <div className="rounded-card bg-white px-6 pb-6 pt-8 text-center shadow-card">
        {win ? (
          <>
            <p className="font-display font-extrabold uppercase tracking-wide text-[#34b7f0]">
              You have won
            </p>
            <p className="mt-2 rounded-pill bg-[#d8f3ff] py-2 font-display text-xl font-extrabold text-navy-700">
              {result.prize.label}
            </p>
            <p className="mt-4 font-display font-bold uppercase tracking-wide text-violet-600">
              With Daily Points
            </p>
            <div className="mt-1 flex items-center justify-center gap-2">
              <Coin className="h-7 w-7" />
              <span className="font-display text-2xl font-extrabold text-violet-700">
                {result.prize.points}
              </span>
            </div>
            <Button variant="magenta" size="md" className="mt-5 w-full" onClick={onClaim}>
              Claim
            </Button>
          </>
        ) : (
          <>
            <p className="font-display font-extrabold uppercase tracking-wide text-[#34b7f0]">
              You have won
            </p>
            <p className="mt-2 rounded-pill bg-[#d8f3ff] py-2 font-display text-2xl font-extrabold text-navy-700">
              00
            </p>
            <p className="mt-3 text-sm font-bold text-ink">
              +{result.prize.points} points for playing
            </p>
            <Button variant="green" size="md" className="mt-5 w-full" onClick={onRetry}>
              Try Again
            </Button>
          </>
        )}
      </div>
    </motion.div>
  );
}
