"use client";

import { PortalChrome } from "@/components/portal/PortalChrome";
import { Coin } from "@/components/brand/Coin";
import { usePlayState } from "@/lib/pointsStore";
import { cn } from "@/lib/cn";

const BOARD = [
  { name: "Tendai M.", pts: 4820 },
  { name: "Rumbi K.", pts: 4310 },
  { name: "Farai S.", pts: 3990 },
  { name: "Chipo N.", pts: 3540 },
  { name: "Blessing D.", pts: 3120 },
];

export default function LeaderboardPage() {
  const play = usePlayState();
  return (
    <PortalChrome title="Leaderboard">
      <div className="flex flex-col gap-3 pt-3">
        <div className="flex items-center justify-between rounded-card bg-grad-game p-4 text-white shadow-card">
          <div>
            <p className="font-display text-sm font-bold uppercase tracking-wide text-white/85">Your daily points</p>
            <p className="font-display text-3xl font-extrabold">{play.points.toLocaleString()}</p>
          </div>
          <Coin className="h-12 w-12" />
        </div>
        {BOARD.map((row, i) => (
          <div
            key={row.name}
            className={cn(
              "flex items-center gap-3 rounded-card bg-white p-3 shadow-soft",
              i === 0 && "ring-2 ring-gold-500",
            )}
          >
            <span className="grid h-9 w-9 place-items-center rounded-pill bg-navy-700 font-display font-extrabold text-white">
              {i + 1}
            </span>
            <span className="flex-1 font-body font-bold text-navy-700">{row.name}</span>
            <span className="flex items-center gap-1 font-display font-extrabold text-violet-700">
              {row.pts.toLocaleString()} <Coin className="h-5 w-5" />
            </span>
          </div>
        ))}
        <p className="pt-2 text-center text-sm font-bold text-ink">You&rsquo;re #1251 today — keep playing to climb!</p>
      </div>
    </PortalChrome>
  );
}
