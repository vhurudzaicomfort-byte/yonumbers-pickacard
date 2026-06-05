"use client";

import { Logo } from "@/components/brand/Logo";
import { PickACardLogo } from "@/components/brand/PickACardLogo";
import { DailyPoints } from "./DailyPoints";

/** Game header: small logo (left) · lockup (centre) · daily points (right). */
export function GameTopBar({ points }: { points: number }) {
  return (
    <header className="flex items-center justify-between gap-2 px-1">
      <Logo variant="white" className="w-12 shrink-0" />
      <PickACardLogo tone="dark" className="w-32" />
      <DailyPoints value={points} className="shrink-0" />
    </header>
  );
}
