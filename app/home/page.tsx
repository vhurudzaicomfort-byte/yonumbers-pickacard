"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { PortalChrome } from "@/components/portal/PortalChrome";
import { HeroPromoCard } from "@/components/portal/HeroPromoCard";
import { FreeGamesCarousel } from "@/components/portal/FreeGamesCarousel";
import { LoginWelcome } from "@/components/portal/LoginWelcome";
import { Button } from "@/components/ui/Button";
import { Coin } from "@/components/brand/Coin";
import { usePlayState } from "@/lib/pointsStore";
import { dailyNumberFor, evaluateDailyMatch } from "@/lib/dailyNumber";

export default function HomePage() {
  const play = usePlayState();
  const dateLabel = new Date().toISOString().slice(0, 10);
  const dailyNumber = dailyNumberFor(dateLabel);
  const lastFour = dailyNumber.slice(-4).split("");
  const match = play.phone ? evaluateDailyMatch(play.phone, dateLabel) : null;

  return (
    <PortalChrome title="Home">
      <LoginWelcome />
      <div className="flex flex-col gap-6 pt-3">
        {/* points reflection from the pop-up game */}
        <div className="flex items-center justify-between">
          <p className="font-display font-extrabold text-navy-700">{dateLabel}</p>
          <div className="flex items-center gap-1.5 rounded-pill bg-amber-500/15 px-3 py-1.5">
            <Coin className="h-5 w-5" />
            <span className="font-display font-extrabold tabular-nums text-navy-700">
              {play.points.toLocaleString()}
            </span>
            {play.streak > 1 && (
              <span className="ml-1 text-xs font-bold text-brand-red">🔥 {play.streak}</span>
            )}
          </div>
        </div>

        {/* Today's Daily Number */}
        <div className="flex flex-col items-center text-center">
          <p className="font-display text-sm font-extrabold uppercase tracking-wide text-brand-red">
            Today&rsquo;s Daily Number
          </p>
          <p className="mt-2 max-w-[280px] font-body font-bold text-navy-700">
            Match the last digits of your number to win airtime — the more digits match, the bigger your prize.
          </p>
        </div>

        {/* number tiles on the Econet Blue banner */}
        <div className="relative flex items-center justify-center gap-3 rounded-card bg-navy-700 py-4 shadow-soft">
          {lastFour.map((n, i) => (
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

        {match && match.tier && (
          <div className="-mt-3 rounded-card bg-amber-500/15 px-4 py-2.5 text-center">
            <p className="font-display text-sm font-extrabold text-navy-700">
              You matched {match.matchLen} digits — {match.tier.name}! Prize: {match.tier.prize}
            </p>
          </div>
        )}

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
