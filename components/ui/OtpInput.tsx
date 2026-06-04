"use client";

import { useRef } from "react";
import { cn } from "@/lib/cn";
import { OTP_LENGTH } from "@/lib/otpService";

/** 4-box OTP entry (Core theme): auto-advance, backspace, paste, focus glow. */
export function OtpInput({
  value,
  onChange,
  error,
}: {
  value: string;
  onChange: (v: string) => void;
  error?: boolean;
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
            "h-16 w-14 rounded-input border-2 bg-surface text-center font-display text-2xl font-extrabold text-navy-700 outline-none transition-all",
            "border-navy-700/25 focus:border-navy-700 focus:ring-4 focus:ring-navy-700/15",
            error && "border-brand-red text-brand-red ring-4 ring-brand-red/20",
          )}
        />
      ))}
    </div>
  );
}
