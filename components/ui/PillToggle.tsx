"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/cn";
import type { AuthMode } from "@/lib/types";

/**
 * Segmented SUBSCRIBE | LOGIN toggle with an animated sliding indicator.
 * Active half fills green (subscribe) or gold (login) per the game design.
 */
export function PillToggle({
  value,
  onChange,
}: {
  value: AuthMode;
  onChange: (m: AuthMode) => void;
}) {
  const items: { id: AuthMode; label: string; active: string }[] = [
    { id: "subscribe", label: "SUBSCRIBE", active: "bg-grad-green" },
    { id: "login", label: "LOGIN", active: "bg-grad-gold" },
  ];
  return (
    <div
      role="tablist"
      aria-label="Account mode"
      className="relative flex w-full rounded-pill border-[3px] border-white bg-violet-700/80 p-1 shadow-soft"
    >
      {items.map((it) => {
        const selected = value === it.id;
        return (
          <button
            key={it.id}
            role="tab"
            aria-selected={selected}
            onClick={() => onChange(it.id)}
            className="relative flex-1 rounded-pill py-2.5 text-center"
          >
            {selected && (
              <motion.span
                layoutId="pill-toggle-active"
                transition={{ type: "spring", stiffness: 500, damping: 34 }}
                className={cn("absolute inset-0 rounded-pill", it.active)}
              />
            )}
            <span
              className={cn(
                "relative z-10 font-display font-extrabold uppercase tracking-wide",
                selected ? "text-white drop-shadow-[0_1px_0_rgba(0,0,0,.2)]" : "text-white/85",
              )}
            >
              {it.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
