"use client";

import { useRef } from "react";
import { cn } from "@/lib/cn";
import { OTP_LENGTH } from "@/lib/otpService";

/** 4-box OTP entry: auto-advance, backspace, paste support, focus glow. */
export function OtpInput({
  value,
  onChange,
  error,
  tone = "game",
}: {
  value: string;
  onChange: (v: string) => void;
  error?: boolean;
  tone?: "game" | "core";
}) {
  const refs = useRef<Array<HTMLInputElement | null>>([]);
  const digits = value.split("");

  const setAt = (i: number, d: string) => {
    const next = value.split("");
    next[i] = d;
    onChange(next.join("").slice(0, OTP_LENGTH));
  };

  return (
    <div className={cn("flex justify-center gap-3", error && "animate-shake")}>
      {Array.from({ length: OTP_LENGTH }).map((_, i) => (
        <input
          key={i}
          ref={(el) => {
            refs.current[i] = el;
          }}
          inputMode="numeric"
          maxLength={1}
          aria-label={`OTP digit ${i + 1}`}
          value={digits[i] ?? ""}
          onChange={(e) => {
            const d = e.target.value.replace(/\D/g, "").slice(-1);
            setAt(i, d);
            if (d && i < OTP_LENGTH - 1) refs.current[i + 1]?.focus();
          }}
          onKeyDown={(e) => {
            if (e.key === "Backspace" && !digits[i] && i > 0) refs.current[i - 1]?.focus();
          }}
          onPaste={(e) => {
            e.preventDefault();
            const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, OTP_LENGTH);
            if (pasted) {
              onChange(pasted);
              refs.current[Math.min(pasted.length, OTP_LENGTH - 1)]?.focus();
            }
          }}
          className={cn(
            "h-14 w-12 rounded-input text-center font-display text-2xl font-extrabold outline-none transition-all",
            "focus:ring-4",
            tone === "game"
              ? "bg-white/95 text-violet-700 focus:ring-magenta-400/50"
              : "bg-surface-alt text-navy-700 border border-black/10 focus:ring-brand-red/30",
            error && "ring-4 ring-brand-red/50 text-brand-red",
          )}
        />
      ))}
    </div>
  );
}
