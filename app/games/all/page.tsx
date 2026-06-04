"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { PortalChrome } from "@/components/portal/PortalChrome";
import { Button } from "@/components/ui/Button";
import { usePickACard } from "@/components/pickacard/PickACardProvider";
import { GAMES } from "@/lib/games";
import { cn } from "@/lib/cn";

const StarIcon = ({ filled }: { filled: boolean }) => (
  <svg
    viewBox="0 0 24 24"
    className="h-5 w-5"
    fill={filled ? "#FFB020" : "none"}
    stroke={filled ? "#0A0E1F" : "#8A93A6"}
    strokeWidth={1.5}
    strokeLinejoin="round"
  >
    <path d="M12 2.5l2.9 5.88 6.49.94-4.7 4.58 1.11 6.46L12 17.9l-5.8 3.05 1.11-6.46-4.7-4.58 6.49-.94L12 2.5z" />
  </svg>
);

export default function AllGamesPage() {
  const { open } = usePickACard();
  const [query, setQuery] = useState("");
  const [favs, setFavs] = useState<Set<string>>(new Set());

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return q ? GAMES.filter((g) => g.title.toLowerCase().includes(q)) : GAMES;
  }, [query]);

  const toggleFav = (title: string) =>
    setFavs((prev) => {
      const next = new Set(prev);
      if (next.has(title)) next.delete(title);
      else next.add(title);
      return next;
    });

  return (
    <PortalChrome title="All Games" showTabs>
      <div className="flex flex-col gap-3 pt-3">
        {/* search */}
        <div className="relative">
          <svg viewBox="0 0 24 24" className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" fill="none" stroke="currentColor" strokeWidth={1.9} strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="7" />
            <path d="m20 20-3.2-3.2" />
          </svg>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search games by name"
            aria-label="Search games by name"
            className="w-full rounded-pill border-2 border-divider bg-white py-3 pl-12 pr-4 font-body font-semibold text-navy-700 placeholder:text-slate-400 focus:border-navy-700/30"
          />
        </div>

        {/* game rows */}
        <ul className="flex flex-col gap-2">
          {filtered.map((g) => {
            const fav = favs.has(g.title);
            return (
              <li key={g.title} className="flex items-center gap-3 rounded-card bg-white p-2.5 shadow-soft">
                <span className="relative h-14 w-14 shrink-0 overflow-hidden rounded-[12px]">
                  <Image src={g.img} alt={g.title} fill sizes="56px" className="object-cover" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate font-display font-bold text-navy-700">{g.title}</span>
                  <span className="block text-xs font-semibold text-slate-400">{g.category}</span>
                </span>
                <button
                  onClick={() => toggleFav(g.title)}
                  aria-label={fav ? `Remove ${g.title} from favourites` : `Add ${g.title} to favourites`}
                  aria-pressed={fav}
                  className={cn(
                    "grid h-10 w-10 shrink-0 place-items-center rounded-pill transition-colors",
                    fav ? "bg-amber-500/15" : "hover:bg-surface-alt",
                  )}
                >
                  <StarIcon filled={fav} />
                </button>
                <Button variant="red" size="sm" className="shrink-0 px-4" onClick={() => open({ intro: false })}>
                  Play Now
                </Button>
              </li>
            );
          })}
          {filtered.length === 0 && (
            <li className="rounded-card bg-white p-6 text-center font-body font-semibold text-slate-600 shadow-soft">
              No games match &ldquo;{query}&rdquo;.
            </li>
          )}
        </ul>
      </div>
    </PortalChrome>
  );
}
