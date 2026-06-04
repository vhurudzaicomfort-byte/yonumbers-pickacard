"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/cn";
import { useSound } from "@/lib/useSound";

type CandyVariant = "green" | "gold" | "red" | "magenta" | "pink" | "navy";
type Variant = CandyVariant | "flat-red" | "flat-navy";
type Size = "sm" | "md" | "lg";

interface ButtonProps extends Omit<HTMLMotionProps<"button">, "ref" | "children"> {
  variant?: Variant;
  size?: Size;
  /** Disable the squish + sound (e.g. inside another animated element). */
  quiet?: boolean;
  children?: React.ReactNode;
}

const CANDY: Record<CandyVariant, { fill: string; edge: string; text: string }> = {
  green: { fill: "bg-grad-green", edge: "#3a9c05", text: "text-white" },
  gold: { fill: "bg-grad-gold", edge: "#d98e00", text: "text-white" },
  red: { fill: "bg-grad-red", edge: "#b50f1f", text: "text-white" },
  magenta: { fill: "bg-grad-magenta-btn", edge: "#a83bc4", text: "text-white" },
  pink: { fill: "bg-grad-pink-btn", edge: "#c93fb0", text: "text-white" },
  navy: { fill: "bg-navy-700", edge: "#1c2566", text: "text-white" },
};

const SIZES: Record<Size, string> = {
  sm: "h-11 px-5 text-sm",
  md: "h-[52px] px-7 text-base",
  lg: "h-[60px] px-9 text-lg sm:text-xl",
};

export function Button({
  variant = "green",
  size = "md",
  quiet = false,
  className,
  children,
  onClick,
  ...props
}: ButtonProps) {
  const play = useSound();
  const isCandy = variant in CANDY;

  const handleClick: ButtonProps["onClick"] = (e) => {
    if (!quiet) play("press");
    onClick?.(e);
  };

  if (!isCandy) {
    // Core-theme flat button (Login / OTP corporate screens).
    const flat =
      variant === "flat-red"
        ? "bg-brand-red text-white shadow-soft"
        : "bg-navy-700 text-white shadow-soft";
    return (
      <motion.button
        whileTap={{ scale: 0.97 }}
        whileHover={{ y: -1 }}
        onClick={handleClick}
        className={cn(
          "inline-flex items-center justify-center rounded-pill font-display font-bold uppercase tracking-wide",
          "select-none disabled:opacity-50 disabled:pointer-events-none",
          SIZES[size],
          flat,
          className,
        )}
        {...props}
      >
        {children}
      </motion.button>
    );
  }

  const c = CANDY[variant as CandyVariant];
  return (
    <motion.button
      onClick={handleClick}
      initial={false}
      whileHover={{ y: -2 }}
      whileTap={{ y: 4 }}
      transition={{ type: "spring", stiffness: 600, damping: 18 }}
      style={{ boxShadow: `0 6px 0 ${c.edge}, 0 12px 22px rgba(0,0,0,.28)` }}
      className={cn(
        "relative inline-flex items-center justify-center rounded-pill font-display font-extrabold uppercase",
        "tracking-wide border-[3px] border-white select-none",
        "disabled:opacity-50 disabled:pointer-events-none",
        SIZES[size],
        c.fill,
        c.text,
        className,
      )}
      {...props}
    >
      {/* glossy inner highlight */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-2 top-[3px] h-1/3 rounded-pill bg-white/35 blur-[1px]"
      />
      <span className="relative drop-shadow-[0_1px_0_rgba(0,0,0,.18)]">{children}</span>
    </motion.button>
  );
}
