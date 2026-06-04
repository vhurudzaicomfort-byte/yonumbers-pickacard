"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { usePickACard } from "@/components/pickacard/PickACardProvider";

/** Persistent chest FAB for one-tap access to Pick a Card (gentle idle bob). */
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
      className="fixed bottom-24 right-4 z-[800] grid h-16 w-16 place-items-center rounded-pill bg-grad-game shadow-card ring-[3px] ring-white safe-b"
    >
      <span className="relative h-9 w-9">
        <Image src="/brand/chest.png" alt="" aria-hidden fill sizes="36px" className="object-contain" />
      </span>
      <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-pill bg-gold-500 px-1 text-[10px] font-extrabold text-navy-900">
        ★
      </span>
    </motion.button>
  );
}
