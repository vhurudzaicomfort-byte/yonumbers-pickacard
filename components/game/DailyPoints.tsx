"use client";

import { useEffect, useRef, useState } from "react";
import { Coin } from "@/components/brand/Coin";
import { cn } from "@/lib/cn";

/** Daily-points counter with a count-up animation on mount and on increment. */
export function DailyPoints({
  value,
  className,
  align = "right",
  tone = "navy",
}: {
  value: number;
  className?: string;
  align?: "right" | "left";
  tone?: "navy" | "white";
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

  const text = tone === "white" ? "text-white" : "text-navy-700";
  const sub = tone === "white" ? "text-white/85" : "text-navy-500";

  return (
    <div className={cn("flex flex-col", align === "right" ? "items-end" : "items-start", className)}>
      <div className="flex items-center gap-1.5">
        <span className={cn("font-display text-xl font-extrabold leading-none tabular-nums", text)}>
          {display.toLocaleString()}
        </span>
        <Coin className="h-5 w-5" />
      </div>
      <span className={cn("font-display text-[10px] font-bold uppercase tracking-wider", sub)}>
        Daily Points
      </span>
    </div>
  );
}
