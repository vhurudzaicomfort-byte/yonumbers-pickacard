"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { PortalChrome } from "@/components/portal/PortalChrome";
import { HeroPromoCard } from "@/components/portal/HeroPromoCard";
import { FreeGamesCarousel } from "@/components/portal/FreeGamesCarousel";
import { Button } from "@/components/ui/Button";
import { Coin } from "@/components/brand/Coin";
import { usePlayState } from "@/lib/pointsStore";

const WINNING = ["8", "5", "2", "2"];

export default function HomePage() {
  const play = usePlayState();
  const dateLabel = new Date().toISOString().slice(0, 10);

  return (
    <PortalChrome title="Home">
      <div className="flex flex-col gap-6 pt-3">
        {/* points reflection from the pop-up game */}
        <div className="flex items-center justify-between">
          <p className="font-display font-extrabold text-navy-700">{dateLabel}</p>
          <div className="flex items-center gap-1.5 rounded-pill bg-violet-500/10 px-3 py-1.5">
            <Coin className="h-5 w-5" />
            <span className="font-display font-extrabold tabular-nums text-violet-700">
              {play.points.toLocaleString()}
            </span>
            {play.streak > 1 && (
              <span className="ml-1 text-xs font-bold text-orangeAccent">🔥 {play.streak}</span>
            )}
          </div>
        </div>

        {/* winning number */}
        <div className="flex flex-col items-center text-center">
          <motion.div
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 240, damping: 14 }}
            className="grid h-16 w-16 place-items-center rounded-card bg-brand-red font-display text-3xl font-extrabold text-white shadow-soft"
          >
            2
          </motion.div>
          <p className="mt-3 max-w-[260px] font-body font-bold text-navy-700">
            Subscribers won yesterday and the winning number was:
          </p>
        </div>

        {/* number cards on navy banner */}
        <div className="relative flex items-center justify-center gap-3 rounded-card bg-navy-700 py-4 shadow-soft">
          {WINNING.map((n, i) => (
            <motion.span
              key={i}
              initial={{ y: 14, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 + i * 0.08 }}
              className="grid h-14 w-14 place-items-center rounded-tile bg-white font-display text-2xl font-extrabold text-navy-700 shadow"
            >
              {n}
            </motion.span>
          ))}
        </div>

        <div className="rounded-card bg-white p-4 text-center shadow-soft">
          <p className="font-body font-bold text-navy-700">
            Dial <span className="text-brand-red">*647#</span> to Play &amp; Win Airtime &amp; More!
          </p>
          <Link href="/info">
            <Button variant="red" size="md" className="mt-3 w-full">
              How it Works
            </Button>
          </Link>
        </div>

        <HeroPromoCard />
        <FreeGamesCarousel />
      </div>
    </PortalChrome>
  );
}
