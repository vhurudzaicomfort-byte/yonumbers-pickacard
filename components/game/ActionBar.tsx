"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { cn } from "@/lib/cn";
import { useSound } from "@/lib/useSound";

type Glyph = "refresh" | "home" | "menu";

const SRC: Record<Glyph, string> = {
  refresh: "/brand/glyph-refresh.png",
  home: "/brand/glyph-home.png",
  menu: "/brand/glyph-menu.png",
};

function GlyphButton({
  glyph,
  label,
  big,
  onClick,
}: {
  glyph: Glyph;
  label: string;
  big?: boolean;
  onClick?: () => void;
}) {
  const play = useSound();
  return (
    <motion.button
      whileTap={{ scale: 0.88, y: 3 }}
      whileHover={{ y: -2 }}
      onClick={() => {
        play("press");
        onClick?.();
      }}
      aria-label={label}
      className={cn("relative", big ? "h-[84px] w-[84px] -mt-6" : "h-16 w-16")}
    >
      <Image src={SRC[glyph]} alt="" aria-hidden fill sizes="84px" className="object-contain drop-shadow-[0_6px_10px_rgba(0,0,0,.22)]" />
    </motion.button>
  );
}

/** Bottom action bar: replay (left) · home elevated (centre) · menu (right). */
export function ActionBar({
  onReplay,
  onHome,
  onMenu,
}: {
  onReplay?: () => void;
  onHome?: () => void;
  onMenu?: () => void;
}) {
  return (
    <nav className="flex items-end justify-center gap-12 pt-2">
      <GlyphButton glyph="refresh" label="Replay" onClick={onReplay} />
      <GlyphButton glyph="home" label="Home" big onClick={onHome} />
      <GlyphButton glyph="menu" label="Menu" onClick={onMenu} />
    </nav>
  );
}
