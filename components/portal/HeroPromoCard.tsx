"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { PickACardLogo } from "@/components/brand/PickACardLogo";
import { usePickACard } from "@/components/pickacard/PickACardProvider";

/** Home promo banner — the portal-native entry point into the Pick a Card feature. */
export function HeroPromoCard() {
  const { open } = usePickACard();
  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative overflow-hidden rounded-card bg-grad-navy-card px-4 py-3 shadow-card"
    >
      {/* low-opacity pulse motif for atmosphere */}
      <span aria-hidden className="pointer-events-none absolute -right-8 -top-10 h-32 w-32 rounded-full border-[14px] border-white/5" />
      <div className="relative flex flex-wrap items-center justify-between gap-x-4 gap-y-3">
        <div className="min-w-0 flex-1">
          <span className="inline-block rounded-pill bg-gold-500/20 px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-wide text-gold-500">
            Daily promo
          </span>
          <PickACardLogo tone="dark" className="mt-1.5 w-36 sm:w-44" />
          <p className="mt-1 text-xs font-semibold leading-snug text-white/85 sm:text-sm">
            Airtime, Data &amp; More — every card hides a reward.
          </p>
        </div>
        <Button
          variant="red"
          size="sm"
          className="relative shrink-0 max-[359px]:w-full"
          onClick={(e) => open(e.currentTarget)}
        >
          Play Now
        </Button>
      </div>
    </motion.section>
  );
}
