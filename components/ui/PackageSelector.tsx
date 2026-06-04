"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/cn";
import { PACKAGES } from "@/lib/gameService";
import type { PackageOption } from "@/lib/types";

const CheckIcon = () => (
  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={3.5} strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 6 9 17l-5-5" />
  </svg>
);

/** SELECT PACKAGE header + single-select option pills (Core theme). */
export function PackageSelector({
  value,
  onChange,
}: {
  value: PackageOption["id"] | null;
  onChange: (id: PackageOption["id"]) => void;
}) {
  return (
    <div className="flex w-full flex-col gap-2.5">
      <div className="rounded-pill bg-navy-700 py-2.5 text-center font-display font-bold uppercase tracking-wide text-white">
        Select Package
      </div>
      {PACKAGES.map((p) => {
        const selected = value === p.id;
        return (
          <motion.button
            key={p.id}
            whileTap={{ scale: 0.98 }}
            onClick={() => onChange(p.id)}
            aria-pressed={selected}
            className={cn(
              "flex items-center justify-center gap-2 rounded-pill border-2 py-2.5 px-4 font-body font-bold transition-colors",
              selected
                ? "border-brand-red bg-brand-red/5 text-brand-red"
                : "border-divider bg-surface-alt text-navy-600 hover:border-navy-700/30",
            )}
          >
            {selected && <CheckIcon />}
            <span>
              {p.label} {p.price}
            </span>
          </motion.button>
        );
      })}
    </div>
  );
}
