"use client";

import { cn } from "@/lib/cn";

/** +263 prefixed phone input. Numeric keypad on mobile + light validation. */
export function PhoneInput({
  value,
  onChange,
  tone = "game",
  id = "phone",
}: {
  value: string;
  onChange: (v: string) => void;
  tone?: "game" | "core";
  id?: string;
}) {
  return (
    <div
      className={cn(
        "flex items-center gap-3 rounded-input px-4 h-[52px] w-full",
        tone === "game" ? "bg-white/95 shadow-soft" : "bg-surface-alt border border-black/5",
      )}
    >
      <label htmlFor={id} className="font-body font-extrabold text-navy-700 select-none">
        +263
      </label>
      <span aria-hidden className="h-6 w-px bg-black/10" />
      <input
        id={id}
        type="tel"
        inputMode="numeric"
        autoComplete="tel-national"
        pattern="[0-9]*"
        placeholder="ENTER YOUR PHONE NUMBER"
        value={value}
        onChange={(e) => onChange(e.target.value.replace(/[^\d]/g, "").slice(0, 9))}
        className={cn(
          "min-w-0 flex-1 bg-transparent outline-none font-body font-bold",
          "text-navy-700 placeholder:text-violet-500/60 placeholder:font-bold",
          tone === "core" && "placeholder:text-ink/70",
        )}
      />
    </div>
  );
}

export function isValidPhone(v: string): boolean {
  return /^7\d{8}$/.test(v) || /^\d{9}$/.test(v);
}
