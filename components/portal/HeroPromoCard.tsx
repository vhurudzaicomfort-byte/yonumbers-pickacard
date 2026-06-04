"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { CardsIcon } from "./icons";
import { usePickACard } from "@/components/pickacard/PickACardProvider";

/** Home promo banner — the portal-native entry point into the Pick a Card feature. */
export function HeroPromoCard() {
  const { open } = usePickACard();
  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative overflow-hidden rounded-card bg-grad-navy-card p-5 shadow-card"
    >
      {/* low-opacity pulse motif for atmosphere */}
      <span aria-hidden className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full border-[16px] border-white/5" />
      <span aria-hidden className="pointer-events-none absolute -right-2 top-6 h-24 w-24 rounded-full border-[10px] border-white/5" />
      <div className="relative flex items-start gap-3">
        <span className="grid h-11 w-11 shrink-0 place-items-center rounded-[14px] bg-gold-500 text-navy-900">
          <CardsIcon className="h-6 w-6" />
        </span>
        <div className="min-w-0">
          <span className="inline-block rounded-pill bg-gold-500/20 px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-wide text-gold-500">
            Daily promo
          </span>
          <h3 className="mt-1 font-display text-lg font-extrabold leading-tight text-white">Pick a Card &amp; Win</h3>
          <p className="mt-0.5 text-sm font-semibold text-white/85">Airtime, Data &amp; More — every card hides a reward.</p>
        </div>
      </div>
      <Button variant="red" size="sm" className="relative mt-4 w-full sm:w-auto" onClick={(e) => open(e.currentTarget)}>
        Play Now
      </Button>
    </motion.section>
  );
}
