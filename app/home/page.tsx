"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { PortalChrome } from "@/components/portal/PortalChrome";
import { HeroPromoCard } from "@/components/portal/HeroPromoCard";
import { FreeGamesCarousel } from "@/components/portal/FreeGamesCarousel";
import { LoginWelcome } from "@/components/portal/LoginWelcome";
import { Button } from "@/components/ui/Button";
import { Coin } from "@/components/brand/Coin";
import { usePickACard } from "@/components/pickacard/PickACardProvider";
import { usePlayState } from "@/lib/pointsStore";
import { dailyNumberFor, evaluateDailyMatch, winnersFor, grandWinnerFor } from "@/lib/dailyNumber";

function yesterdayIso(): string {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  return d.toISOString().slice(0, 10);
}

export default function HomePage() {
  const play = usePlayState();
  const { open } = usePickACard();
  const dateLabel = new Date().toISOString().slice(0, 10);

  const yIso = yesterdayIso();
  const yNumber = dailyNumberFor(yIso).split(""); // 8 digits
  const winners = winnersFor(yIso);
  const grand = grandWinnerFor(yIso);
  const result = play.phone ? evaluateDailyMatch(play.phone, yIso) : null;

  return (
    <PortalChrome title="Home">
      <LoginWelcome />
      <div className="flex flex-col gap-5 pt-3">
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

        {/* 1) Yesterday's drawn number — 8 digits */}
        <div className="flex flex-col items-center text-center">
          <p className="font-display text-sm font-extrabold uppercase tracking-wide text-brand-red">
            Yesterday&rsquo;s Drawn Number
          </p>
          <div className="mt-3 flex items-center justify-center gap-1.5 rounded-card bg-navy-700 px-3 py-4 shadow-soft">
            {yNumber.map((n, i) => (
              <motion.span
                key={i}
                initial={{ y: 12, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.05 + i * 0.05 }}
                className="grid h-10 w-8 place-items-center rounded-[10px] bg-white font-display text-xl font-extrabold text-navy-700 shadow sm:h-12 sm:w-10 sm:text-2xl"
              >
                {n}
              </motion.span>
            ))}
          </div>
        </div>

        {/* 2) Number of winners + 3) Grand winner */}
        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-card bg-white p-4 text-center shadow-soft">
            <p className="font-display text-3xl font-extrabold text-navy-700">{winners.toLocaleString()}</p>
            <p className="mt-1 text-xs font-bold uppercase tracking-wide text-slate-600">Winners yesterday</p>
          </div>
          <div className="rounded-card bg-white p-4 text-center shadow-soft">
            <p className="font-display text-sm font-extrabold uppercase tracking-wide text-amber-600">Grand Winner</p>
            <p className="mt-1 font-display font-extrabold tabular-nums tracking-wide text-navy-700">{grand.masked}</p>
            <p className="text-xs font-bold text-slate-600">{grand.digits} digits · {grand.prize}</p>
          </div>
        </div>

        {/* 4) The user's personalised result */}
        {result && result.tier ? (
          <div className="rounded-card bg-amber-500/15 px-4 py-3 text-center">
            <p className="font-display text-sm font-extrabold text-navy-700">
              You have {result.matchLen} matching digits on your number — your prize is {result.tier.prize}.
            </p>
          </div>
        ) : (
          <div className="rounded-card bg-white px-4 py-3 text-center shadow-soft">
            <p className="font-display text-sm font-bold text-navy-700">
              Oops, you have no matching numbers. Try pick a card.
            </p>
            <Button variant="red" size="sm" className="mt-2" onClick={() => open({ intro: false })}>
              Pick a Card
            </Button>
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
