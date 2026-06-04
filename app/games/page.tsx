import Image from "next/image";
import { PortalChrome } from "@/components/portal/PortalChrome";

const GAMES = [
  { img: "/img/game-1.png", title: "Lucky Gran" },
  { img: "/img/game-2.png", title: "Alpha Guns" },
  { img: "/img/game-3.png", title: "Archery Hero Pro" },
  { img: "/img/game-4.png", title: "Baby Care" },
  { img: "/img/game-5.png", title: "Badland" },
  { img: "/img/game-6.png", title: "Frozen Front" },
];

export default function GamesPage() {
  return (
    <PortalChrome title="Games">
      <div className="grid grid-cols-2 gap-3 pt-3">
        {GAMES.map((g) => (
          <article key={g.title} className="overflow-hidden rounded-card bg-white shadow-soft">
            <div className="relative aspect-[4/3]">
              <Image src={g.img} alt={g.title} fill sizes="220px" className="object-cover" />
            </div>
            <p className="p-3 font-display font-bold text-navy-700">{g.title}</p>
          </article>
        ))}
      </div>
    </PortalChrome>
  );
}
