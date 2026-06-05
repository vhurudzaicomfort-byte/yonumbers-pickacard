"use client";

import { useEffect, useState } from "react";
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
import {
  dailyNumberFor,
  evaluateDailyMatch,
  winnersFor,
  grandWinnerFor,
  tierForMatch,
  DEMO_ROTATE_MATCH,
  nextDemoMatchLen,
} from "@/lib/dailyNumber";

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

  // DEMO: rotate the personalised result on each load (no-match → tiers → Grand
  // Win) so reviewers see every state. Falls back to the real match otherwise.
  const realMatch = play.phone ? evaluateDailyMatch(play.phone, yIso) : null;
  const [demoLen, setDemoLen] = useState<number | null>(null);
  useEffect(() => {
    if (DEMO_ROTATE_MATCH) setDemoLen(nextDemoMatchLen());
  }, []);
  const matchLen = DEMO_ROTATE_MATCH ? (demoLen ?? 0) : realMatch?.matchLen ?? 0;
  const tier = tierForMatch(matchLen);

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

        {/* 1) Yesterday's winning number — 8 digits */}
        <div className="flex flex-col items-center text-center">
          <p className="font-display text-sm font-extrabold uppercase tracking-wide text-brand-red">
            Yesterday&rsquo;s Winning Number
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

        {/* 2) Number of winners — number is the hero, label the caption */}
        <div className="flex flex-col items-center gap-1 rounded-card bg-white px-4 py-5 text-center shadow-soft">
          <span className="font-display text-4xl font-extrabold leading-none text-navy-700 sm:text-5xl">
            {winners.toLocaleString()}
          </span>
          <span className="font-body text-sm font-medium tracking-wide text-slate-400">
            Winners Yesterday
          </span>
        </div>

        {/* 3) Grand winner — prize is the dominant element */}
        <div className="rounded-card bg-white px-5 py-5 text-center shadow-soft">
          <p className="font-display text-sm font-extrabold uppercase tracking-wide text-brand-red">
            Grand Winner
          </p>
          <p className="mt-1.5 font-display text-3xl font-extrabold leading-tight text-navy-700 sm:text-4xl">
            {grand.prize}
          </p>
          <p className="mt-2 font-display text-sm font-bold tabular-nums tracking-wide text-slate-600">
            {grand.masked}
          </p>
          <span className="mt-1 inline-block rounded-pill bg-amber-500/15 px-2.5 py-0.5 text-xs font-extrabold uppercase tracking-wide text-amber-600">
            {grand.digits} digits matched
          </span>
        </div>

        {/* 4) The user's personalised result (demo-rotated) */}
        {tier ? (
          <div className="overflow-hidden rounded-card bg-grad-navy-card px-4 py-4 text-center shadow-card">
            <p className="font-display text-xs font-extrabold uppercase tracking-wide text-gold-500">
              🎉 You matched today
            </p>
            <div className="mt-3 flex flex-wrap items-center justify-center gap-1.5">
              {yNumber.slice(yNumber.length - matchLen).map((d, i) => (
                <motion.span
                  key={i}
                  initial={{ scale: 0, y: 8 }}
                  animate={{ scale: 1, y: 0 }}
                  transition={{ delay: 0.06 * i, type: "spring", stiffness: 440, damping: 14 }}
                  className="grid h-9 w-7 place-items-center rounded-[10px] bg-gold-500 font-display text-lg font-extrabold text-navy-900 shadow ring-2 ring-white/40 sm:h-11 sm:w-9 sm:text-2xl"
                >
                  {d}
                </motion.span>
              ))}
            </div>
            <p className="mt-2.5 font-display text-sm font-bold text-white">
              {matchLen} matching {matchLen === 1 ? "digit" : "digits"} on your number
            </p>
            <div className="mx-auto mt-3 inline-flex flex-col items-center gap-1 rounded-card bg-white/10 px-5 py-2.5">
              <span className="font-display text-[10px] font-extrabold uppercase tracking-wider text-white/70">
                Your prize
              </span>
              <span className="rounded-pill bg-brand-red px-4 py-1 font-display text-lg font-extrabold text-white shadow-sm">
                {tier.prize}
              </span>
            </div>
          </div>
        ) : (
          <div className="rounded-card bg-white px-4 py-4 text-center shadow-soft">
            <p className="font-display text-base font-extrabold text-brand-red">
              Oops, no matching numbers today.
            </p>
            <p className="font-display text-base font-extrabold text-navy-700">
              Try Pick a Card &amp; Win!
            </p>
            <Button
              variant="red"
              size="md"
              className="mx-auto mt-3 w-full max-w-[280px] whitespace-nowrap"
              onClick={() => open({ intro: false })}
            >
              Pick a Card &amp; Win
            </Button>
          </div>
        )}

        <HeroPromoCard />
        <FreeGamesCarousel />

        {/* Leaderboard nudge */}
        <section className="flex flex-col gap-1">
          <h2 className="font-display text-lg font-extrabold text-navy-700">Leaderboard</h2>
          <div className="flex items-center gap-3 rounded-card bg-grad-navy-card p-4 shadow-card">
            <span className="min-w-0 flex-1 font-display text-sm font-extrabold leading-snug text-white">
              See who&rsquo;s topping today&rsquo;s leaderboard — can you climb?
            </span>
            <Link href="/leaderboard" className="shrink-0">
              <Button variant="red" size="sm" className="whitespace-nowrap">
                View
              </Button>
            </Link>
          </div>
        </section>
      </div>
    </PortalChrome>
  );
}
