"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { usePickACard } from "@/components/pickacard/PickACardProvider";

/** Home promo banner — a portal-styled entry point into the Pick a Card pop-up. */
export function HeroPromoCard() {
  const { open } = usePickACard();
  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative overflow-hidden rounded-card bg-grad-game p-4 shadow-card"
    >
      <span className="pointer-events-none absolute -right-6 -top-8 h-32 w-32 rotate-12 opacity-90">
        <Image src="/brand/chest.png" alt="" aria-hidden fill sizes="128px" className="object-contain animate-bob" />
      </span>
      <div className="relative max-w-[72%]">
        <p className="font-display text-lg font-extrabold uppercase leading-tight text-white">
          🎁 Pick a Card &amp; Win
        </p>
        <p className="mt-1 text-sm font-semibold text-white/90">
          Airtime, Data &amp; More — every card hides a reward!
        </p>
        <Button
          variant="green"
          size="sm"
          className="mt-3"
          onClick={(e) => open(e.currentTarget)}
        >
          Play Now
        </Button>
      </div>
    </motion.section>
  );
}
