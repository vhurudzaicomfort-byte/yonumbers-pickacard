"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/cn";
import { useSound } from "@/lib/useSound";

const RefreshIcon = (p: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={p.className} fill="none" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 12a9 9 0 1 1-2.64-6.36M21 4v5h-5" />
  </svg>
);
const HomeIcon = (p: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={p.className} fill="none" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 10.5 12 3l9 7.5M5 9.5V21h14V9.5" />
  </svg>
);
const MenuIcon = (p: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={p.className} fill="none" stroke="currentColor" strokeWidth={2.6} strokeLinecap="round">
    <path d="M5 7h14M5 12h14M5 17h14" />
  </svg>
);

function CircleButton({
  label,
  big,
  variant,
  onClick,
  children,
}: {
  label: string;
  big?: boolean;
  variant: "navy" | "red";
  onClick?: () => void;
  children: React.ReactNode;
}) {
  const play = useSound();
  return (
    <motion.button
      whileTap={{ scale: 0.9, y: 2 }}
      whileHover={{ y: -2 }}
      onClick={() => {
        play("press");
        onClick?.();
      }}
      aria-label={label}
      className={cn(
        "grid place-items-center rounded-pill text-white ring-4 ring-white shadow-soft",
        big ? "h-[72px] w-[72px] -mt-5" : "h-14 w-14",
        variant === "red" ? "bg-brand-red" : "bg-navy-700",
      )}
    >
      {children}
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
    <nav className="flex items-end justify-center gap-10 pt-2">
      <CircleButton label="Replay" variant="navy" onClick={onReplay}>
        <RefreshIcon className="h-6 w-6" />
      </CircleButton>
      <CircleButton label="Home" variant="red" big onClick={onHome}>
        <HomeIcon className="h-8 w-8" />
      </CircleButton>
      <CircleButton label="Menu" variant="navy" onClick={onMenu}>
        <MenuIcon className="h-6 w-6" />
      </CircleButton>
    </nav>
  );
}
