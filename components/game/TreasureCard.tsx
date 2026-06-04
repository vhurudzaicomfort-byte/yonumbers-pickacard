"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { Coin } from "@/components/brand/Coin";
import { cn } from "@/lib/cn";

export type CardState = "idle" | "flipping" | "won" | "lost";

/**
 * Branded playing card: a navy YoNumbers card back that flips in 3D to reveal
 * its reward face. Core theme — no purple/gold chests. Keyboard-operable.
 */
export function TreasureCard({
  index,
  state,
  disabled,
  onPick,
  onHover,
}: {
  index: number;
  state: CardState;
  disabled?: boolean;
  onPick: (index: number) => void;
  onHover?: () => void;
}) {
  const reduced = useReducedMotion();
  const flipped = state === "won" || state === "lost" || state === "flipping";
  const isWin = state === "won";

  return (
    <button
      type="button"
      disabled={disabled}
      onClick={() => onPick(index)}
      onMouseEnter={onHover}
      aria-label={`Card ${index + 1}`}
      className="group relative aspect-[3/4] w-full rounded-tile outline-none [perspective:900px] focus-visible:ring-4 focus-visible:ring-navy-700/40"
    >
      <motion.div
        className="relative h-full w-full [transform-style:preserve-3d]"
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={reduced ? { duration: 0 } : { type: "spring", stiffness: 260, damping: 24 }}
      >
        {/* FRONT — navy card back with the YoNumbers mark */}
        <span className="absolute inset-0 flex items-center justify-center overflow-hidden rounded-tile bg-grad-navy-card p-2 shadow-[0_6px_14px_rgba(43,54,138,.28)] ring-2 ring-white/15 [backface-visibility:hidden]">
          <span
            aria-hidden
            className="absolute inset-0 opacity-[0.12]"
            style={{
              backgroundImage:
                "repeating-linear-gradient(45deg, #fff 0 2px, transparent 2px 10px)",
            }}
          />
          <motion.span
            className="relative block h-[62%] w-[62%]"
            animate={reduced || disabled ? {} : { y: [0, -3, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: (index % 4) * 0.25 }}
          >
            <Image src="/brand/logo-yonumbers-white.png" alt="" aria-hidden fill sizes="90px" className="object-contain transition-transform duration-200 group-hover:scale-105" />
          </motion.span>
          <span className="pointer-events-none absolute inset-0 rounded-tile opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-hover:shadow-[0_0_0_3px_rgba(233,34,48,.55)]" />
        </span>

        {/* BACK — reward reveal face */}
        <span
          className={cn(
            "absolute inset-0 flex flex-col items-center justify-center gap-1 overflow-hidden rounded-tile [backface-visibility:hidden] [transform:rotateY(180deg)]",
            isWin ? "bg-white ring-2 ring-brand-red/30" : "bg-surface-alt ring-2 ring-divider",
          )}
        >
          {isWin ? (
            <Coin className="h-1/2 w-1/2" />
          ) : (
            <svg viewBox="0 0 24 24" className="h-1/3 w-1/3 text-ink/50" fill="none" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round">
              <path d="M6 6l12 12M18 6 6 18" />
            </svg>
          )}
        </span>
      </motion.div>
    </button>
  );
}
