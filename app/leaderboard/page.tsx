"use client";

import Link from "next/link";
import { PortalChrome } from "@/components/portal/PortalChrome";
import { Coin } from "@/components/brand/Coin";
import { Button } from "@/components/ui/Button";
import { usePickACard } from "@/components/pickacard/PickACardProvider";
import { usePlayState } from "@/lib/pointsStore";
import { cn } from "@/lib/cn";

/** Mask an MSISDN to 07****1234 — leading 07, asterisks, final 4 digits. */
function maskNumber(last4: string): string {
  return `07****${last4.padStart(4, "0").slice(-4)}`;
}

const BOARD = [
  { last4: "4821", pts: 4820 },
  { last4: "0937", pts: 4310 },
  { last4: "7152", pts: 3990 },
  { last4: "3364", pts: 3540 },
  { last4: "8810", pts: 3120 },
  { last4: "2475", pts: 2980 },
  { last4: "6093", pts: 2740 },
];

const MEDALS = ["🥇", "🥈", "🥉"];

export default function LeaderboardPage() {
  const play = usePlayState();
  const { open } = usePickACard();
  const userLast4 = play.phone ? play.phone.slice(-4) : "0000";

  return (
    <PortalChrome title="Leaderboard">
      <div className="flex flex-col gap-3 pt-3">
        {/* your daily points */}
        <div className="flex items-center justify-between rounded-card bg-grad-navy-card p-4 text-white shadow-card">
          <div>
            <p className="font-display text-sm font-bold uppercase tracking-wide text-white/85">Your daily points</p>
            <p className="font-display text-3xl font-extrabold">{play.points.toLocaleString()}</p>
          </div>
          <Coin className="h-12 w-12" />
        </div>

        {/* ranked board — privacy-masked numbers, medals for the top 3 */}
        <ul className="flex flex-col gap-2">
          {BOARD.map((row, i) => (
            <li
              key={row.last4}
              className={cn(
                "flex items-center gap-3 rounded-card bg-white p-3 shadow-soft",
                i === 0 && "ring-2 ring-amber-500",
              )}
            >
              <span
                className={cn(
                  "grid h-9 w-9 shrink-0 place-items-center rounded-pill font-display font-extrabold",
                  i < 3 ? "bg-amber-500/15 text-lg" : "bg-navy-700 text-white",
                )}
                aria-label={`Rank ${i + 1}`}
              >
                {i < 3 ? MEDALS[i] : i + 1}
              </span>
              <span className="flex-1 font-display font-bold tabular-nums tracking-wide text-navy-700">
                {maskNumber(row.last4)}
              </span>
              <span className="flex items-center gap-1 font-display font-extrabold text-amber-600">
                {row.pts.toLocaleString()} <Coin className="h-5 w-5" />
              </span>
            </li>
          ))}
        </ul>

        <p className="pt-1 text-center text-sm font-bold text-slate-600">
          You&rsquo;re #1251 today — keep playing to climb!
        </p>

        {/* your own masked rank, pinned for reference */}
        <div className="rounded-card bg-navy-100/40 p-3">
          <p className="mb-2 px-1 font-display text-xs font-extrabold uppercase tracking-wide text-slate-400">Your rank</p>
          <div className="flex items-center gap-3 rounded-card bg-white p-3 shadow-soft ring-2 ring-brand-red/30">
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-pill bg-brand-red font-display text-xs font-extrabold text-white">
              1251
            </span>
            <span className="flex-1 font-display font-bold tabular-nums tracking-wide text-navy-700">
              {maskNumber(userLast4)} <span className="text-xs font-bold text-slate-400">(you)</span>
            </span>
            <span className="flex items-center gap-1 font-display font-extrabold text-amber-600">
              {play.points.toLocaleString()} <Coin className="h-5 w-5" />
            </span>
          </div>
        </div>

        {/* engagement CTAs */}
        <div className="mt-1 flex flex-col gap-2 rounded-card bg-grad-navy-card p-4 text-center text-white shadow-card">
          <p className="font-display text-base font-extrabold">Climb the board today</p>
          <p className="text-sm text-white/85">Every card you flip earns points. Play to move up the ranks.</p>
          <Button variant="red" size="md" className="mt-1 w-full" onClick={() => open({ intro: false })}>
            Play &amp; Win
          </Button>
          <Link
            href="/info"
            className="py-1 font-display text-sm font-bold text-white/80 underline-offset-2 hover:text-white hover:underline"
          >
            How to climb
          </Link>
        </div>
      </div>
    </PortalChrome>
  );
}
