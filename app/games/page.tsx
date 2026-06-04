import Image from "next/image";
import Link from "next/link";
import { PortalChrome } from "@/components/portal/PortalChrome";
import { GAMES, CATEGORIES } from "@/lib/games";
import { ChevronRight } from "@/components/portal/icons";

export default function GamesPage() {
  return (
    <PortalChrome title="Games">
      <div className="flex flex-col gap-4 pt-3">
        {/* Categories + See All */}
        <div className="flex items-center justify-between">
          <h2 className="font-display text-lg font-extrabold text-navy-700">Categories</h2>
          <Link
            href="/games/all"
            className="flex items-center gap-0.5 font-display text-sm font-bold text-brand-red hover:underline"
          >
            See All <ChevronRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((c) => (
            <Link
              key={c}
              href="/games/all"
              className="rounded-pill border-2 border-divider px-4 py-1.5 font-display text-sm font-bold text-navy-700 hover:border-navy-700/30"
            >
              {c}
            </Link>
          ))}
        </div>

        <h2 className="mt-1 font-display text-lg font-extrabold text-navy-700">Popular</h2>
        <div className="grid grid-cols-2 gap-3">
          {GAMES.map((g) => (
            <article key={g.title} className="overflow-hidden rounded-card bg-white shadow-soft">
              <div className="relative aspect-[4/3]">
                <Image src={g.img} alt={g.title} fill sizes="220px" className="object-cover" />
              </div>
              <p className="p-3 font-display font-bold text-navy-700">{g.title}</p>
            </article>
          ))}
        </div>
      </div>
    </PortalChrome>
  );
}
