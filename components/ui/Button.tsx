"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/cn";
import { useSound } from "@/lib/useSound";

type Variant = "red" | "navy" | "outline" | "ghost";
type Size = "sm" | "md" | "lg";

interface ButtonProps extends Omit<HTMLMotionProps<"button">, "ref" | "children"> {
  variant?: Variant;
  size?: Size;
  quiet?: boolean;
  children?: React.ReactNode;
}

const VARIANTS: Record<Variant, string> = {
  red: "bg-brand-red text-white shadow-btn hover:bg-brand-redBright",
  navy: "bg-navy-700 text-white shadow-btnNavy hover:bg-navy-600",
  outline: "bg-white text-navy-700 border-2 border-navy-700/20 hover:border-navy-700/40",
  ghost: "bg-transparent text-brand-red hover:bg-brand-red/5",
};

const SIZES: Record<Size, string> = {
  sm: "h-11 px-5 text-sm",
  md: "h-[52px] px-7 text-base",
  lg: "h-[56px] px-9 text-lg",
};

export function Button({
  variant = "red",
  size = "md",
  quiet = false,
  className,
  children,
  onClick,
  ...props
}: ButtonProps) {
  const play = useSound();
  const handleClick: ButtonProps["onClick"] = (e) => {
    if (!quiet) play("press");
    onClick?.(e);
  };
  return (
    <motion.button
      whileTap={{ scale: 0.97 }}
      whileHover={{ y: -1 }}
      transition={{ type: "spring", stiffness: 500, damping: 24 }}
      onClick={handleClick}
      className={cn(
        "inline-flex items-center justify-center rounded-pill font-display font-bold uppercase tracking-wide",
        "select-none transition-colors disabled:opacity-50 disabled:pointer-events-none",
        SIZES[size],
        VARIANTS[variant],
        className,
      )}
      {...props}
    >
      {children}
    </motion.button>
  );
}
