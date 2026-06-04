"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/cn";

export type CardState = "idle" | "flipping" | "won" | "lost";

/**
 * Core game tile: a chest on a lavender panel that flips in 3D to reveal its
 * reward face. Keyboard-operable (Enter/Space) and reduced-motion aware.
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
      aria-label={`Treasure card ${index + 1}`}
      className={cn(
        "group relative aspect-square w-full rounded-tile [perspective:900px] outline-none",
        "focus-visible:ring-4 focus-visible:ring-magenta-400/60 rounded-tile",
        disabled && state === "idle" && "opacity-100",
      )}
    >
      <motion.div
        className="relative h-full w-full [transform-style:preserve-3d]"
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={reduced ? { duration: 0 } : { type: "spring", stiffness: 260, damping: 24 }}
      >
        {/* FRONT — closed chest on lavender tile */}
        <span
          className="absolute inset-0 flex items-center justify-center rounded-tile bg-[var(--tile-lavender)] [backface-visibility:hidden] shadow-[inset_0_-3px_6px_rgba(74,48,170,.08)]"
        >
          <motion.span
            className="relative block h-[78%] w-[78%]"
            animate={reduced || disabled ? {} : { y: [0, -4, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: (index % 4) * 0.25 }}
          >
            <Image src="/brand/chest.png" alt="" aria-hidden fill sizes="100px" className="object-contain drop-shadow-[0_6px_6px_rgba(74,48,170,.25)] transition-transform duration-200 group-hover:scale-105" />
          </motion.span>
          <span className="pointer-events-none absolute inset-0 rounded-tile opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-hover:shadow-[0_0_0_3px_rgba(229,70,255,.5)]" />
        </span>

        {/* BACK — reward reveal face */}
        <span
          className={cn(
            "absolute inset-0 flex items-center justify-center rounded-tile [backface-visibility:hidden] [transform:rotateY(180deg)] overflow-hidden",
            isWin ? "bg-[var(--chest-purple)]" : "bg-violet-700",
          )}
        >
          {/* sunburst behind reward */}
          <span
            aria-hidden
            className="absolute inset-[-30%] opacity-60 animate-sunburst"
            style={{
              background:
                "repeating-conic-gradient(from 0deg, rgba(255,255,255,.18) 0deg 12deg, transparent 12deg 24deg)",
            }}
          />
          <span className="relative block h-[70%] w-[70%]">
            <Image
              src={isWin ? "/brand/reward-key.png" : "/brand/chest.png"}
              alt=""
              aria-hidden
              fill
              sizes="100px"
              className={cn("object-contain", !isWin && "opacity-50 grayscale")}
            />
          </span>
        </span>
      </motion.div>
    </button>
  );
}
