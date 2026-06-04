"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/cn";
import { HomeIcon, GamesIcon, TrophyIcon } from "./icons";

const TABS = [
  { href: "/home", label: "Home", Icon: HomeIcon },
  { href: "/games", label: "Games", Icon: GamesIcon },
  { href: "/leaderboard", label: "Leaderboard", Icon: TrophyIcon },
];

export function BottomTabBar() {
  const pathname = usePathname();
  return (
    <nav className="fixed inset-x-0 bottom-0 z-[700] mx-auto flex max-w-[480px] items-stretch justify-around border-t border-black/5 bg-white/95 px-2 pb-[max(env(safe-area-inset-bottom),8px)] pt-2 backdrop-blur">
      {TABS.map(({ href, label, Icon }) => {
        const active = pathname === href;
        return (
          <Link
            key={href}
            href={href}
            className={cn(
              "flex flex-1 flex-col items-center gap-1 rounded-input py-1.5 text-[11px] font-bold transition-colors",
              active ? "text-navy-700" : "text-ink",
            )}
          >
            <Icon className={cn("h-6 w-6", active ? "stroke-[2.5]" : "")} />
            {label}
          </Link>
        );
      })}
    </nav>
  );
}
