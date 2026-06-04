"use client";

import { useEffect, useRef, useState } from "react";
import { Coin } from "@/components/brand/Coin";
import { cn } from "@/lib/cn";

/** Daily-points counter with a count-up animation on mount and on increment. */
export function DailyPoints({
  value,
  className,
  align = "right",
}: {
  value: number;
  className?: string;
  align?: "right" | "left";
}) {
  const [display, setDisplay] = useState(value);
  const fromRef = useRef(value);
  const raf = useRef<number>();

  useEffect(() => {
    const from = fromRef.current;
    const to = value;
    if (from === to) return;
    const start = performance.now();
    const dur = 700;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / dur);
      const eased = 1 - Math.pow(1 - t, 3);
      setDisplay(Math.round(from + (to - from) * eased));
      if (t < 1) raf.current = requestAnimationFrame(tick);
      else fromRef.current = to;
    };
    raf.current = requestAnimationFrame(tick);
    return () => {
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, [value]);

  return (
    <div className={cn("flex flex-col", align === "right" ? "items-end" : "items-start", className)}>
      <div className="flex items-center gap-1.5">
        <span className="font-display text-2xl font-extrabold leading-none text-white drop-shadow-[0_2px_0_rgba(0,0,0,.18)] tabular-nums">
          {display.toLocaleString()}
        </span>
        <Coin className="h-6 w-6" />
      </div>
      <span className="font-display text-[10px] font-bold uppercase tracking-wider text-white/90">
        Daily Points
      </span>
    </div>
  );
}
