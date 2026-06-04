"use client";

import Image from "next/image";
import { Button } from "@/components/ui/Button";

const GAMES = [
  { img: "/img/game-hero.jpg", title: "Free Games", sub: "Play for Fun!" },
  { img: "/img/game-1.png", title: "Lucky Gran", sub: "Arcade" },
  { img: "/img/game-2.png", title: "Alpha Guns", sub: "Action" },
  { img: "/img/game-3.png", title: "Archery Hero", sub: "Sport" },
  { img: "/img/game-5.png", title: "Badland", sub: "Adventure" },
  { img: "/img/game-6.png", title: "Frozen Front", sub: "Strategy" },
];

/** Horizontally-scrolling "Free Games" carousel (lazy-loaded imagery). */
export function FreeGamesCarousel() {
  return (
    <section>
      <h2 className="mb-2 font-display text-lg font-extrabold text-navy-700">Free Games</h2>
      <div className="no-scrollbar -mx-4 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-2">
        {GAMES.map((g, i) => (
          <article
            key={g.title}
            className="relative h-40 w-64 shrink-0 snap-start overflow-hidden rounded-card shadow-soft"
          >
            <Image
              src={g.img}
              alt={g.title}
              fill
              sizes="256px"
              loading={i === 0 ? "eager" : "lazy"}
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy-900/85 via-navy-900/20 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-3 text-white">
              <p className="font-display text-lg font-extrabold leading-none">{g.title}</p>
              <p className="text-xs font-semibold text-white/85">{g.sub}</p>
              <Button variant="flat-red" size="sm" className="mt-2 h-9 px-4 text-xs">
                Play Now
              </Button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
