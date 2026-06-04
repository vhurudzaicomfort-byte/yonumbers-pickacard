"use client";

import { motion, useReducedMotion } from "framer-motion";
import { usePickACard } from "@/components/pickacard/PickACardProvider";
import { CardsIcon } from "./icons";

/** Persistent FAB for one-tap access to the Pick a Card promo (gentle idle bob). */
export function FloatingLauncher() {
  const { open } = usePickACard();
  const reduced = useReducedMotion();
  return (
    <motion.button
      onClick={(e) => open(e.currentTarget)}
      whileTap={{ scale: 0.9 }}
      animate={reduced ? {} : { y: [0, -6, 0] }}
      transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
      aria-label="Open Pick a Card & Win"
      className="fixed bottom-24 right-4 z-[800] grid h-15 w-15 place-items-center rounded-pill bg-navy-700 text-white shadow-card ring-[3px] ring-white safe-b"
      style={{ height: 60, width: 60 }}
    >
      <CardsIcon className="h-7 w-7" />
      <span className="absolute -right-1 -top-1 rounded-pill bg-gold-500 px-1.5 py-0.5 text-[9px] font-extrabold uppercase text-navy-900">New</span>
    </motion.button>
  );
}
