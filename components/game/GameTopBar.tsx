"use client";

import { Logo } from "@/components/brand/Logo";
import { Lockup } from "@/components/brand/Lockup";
import { DailyPoints } from "./DailyPoints";

/** Game header: small logo (left) · lockup (centre) · daily points (right). */
export function GameTopBar({ points }: { points: number }) {
  return (
    <header className="flex items-center justify-between gap-2 px-1">
      <Logo variant="white" className="w-12 shrink-0" />
      <Lockup variant="white" className="w-[40%] max-w-[180px]" />
      <DailyPoints value={points} className="shrink-0" />
    </header>
  );
}
