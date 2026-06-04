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

/** SELECT PACKAGE header + single-select option pills. */
export function PackageSelector({
  value,
  onChange,
}: {
  value: PackageOption["id"] | null;
  onChange: (id: PackageOption["id"]) => void;
}) {
  return (
    <div className="flex w-full flex-col gap-2.5">
      <div className="rounded-pill bg-gradient-to-b from-[#7fdcff] to-[#34b7f0] py-2.5 text-center font-display font-extrabold uppercase tracking-wide text-white shadow-soft">
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
              "flex items-center justify-center gap-2 rounded-pill py-2.5 px-4 font-display font-bold uppercase tracking-wide transition-colors",
              selected
                ? "bg-grad-green text-white border-[3px] border-white shadow-soft"
                : "bg-white/95 text-violet-600 border-[3px] border-transparent",
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
