"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/cn";
import type { AuthMode } from "@/lib/types";

/**
 * Core-theme Login | Subscribe tabs with an animated red underline
 * (matches the original YoNumbers Login/Subscribe screen).
 */
export function PillToggle({
  value,
  onChange,
}: {
  value: AuthMode;
  onChange: (m: AuthMode) => void;
}) {
  const items: { id: AuthMode; label: string }[] = [
    { id: "login", label: "Login" },
    { id: "subscribe", label: "Subscribe" },
  ];
  return (
    <div role="tablist" aria-label="Account mode" className="flex w-full">
      {items.map((it) => {
        const selected = value === it.id;
        return (
          <button
            key={it.id}
            role="tab"
            aria-selected={selected}
            onClick={() => onChange(it.id)}
            className="relative flex-1 pb-2 pt-1 text-center"
          >
            <span
              className={cn(
                "font-display text-lg transition-colors",
                selected ? "font-extrabold text-navy-700" : "font-semibold text-navy-500/70",
              )}
            >
              {it.label}
            </span>
            <span className="absolute inset-x-0 bottom-0 h-[3px] rounded-pill bg-divider" />
            {selected && (
              <motion.span
                layoutId="auth-tab-underline"
                transition={{ type: "spring", stiffness: 500, damping: 34 }}
                className="absolute inset-x-0 bottom-0 h-[3px] rounded-pill bg-brand-red"
              />
            )}
          </button>
        );
      })}
    </div>
  );
}
