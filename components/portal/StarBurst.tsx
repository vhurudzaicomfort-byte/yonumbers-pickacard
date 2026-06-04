import { cn } from "@/lib/cn";

/** Slowly-rotating radial sunburst backdrop (CSS, reduced-motion aware). */
export function StarBurst({ className, animate = true }: { className?: string; animate?: boolean }) {
  return (
    <span
      aria-hidden
      className={cn(
        "pointer-events-none absolute left-1/2 top-1/2 aspect-square w-[180%] -translate-x-1/2 -translate-y-1/2",
        animate && "animate-sunburst",
        className,
      )}
      style={{
        background:
          "repeating-conic-gradient(from 0deg at 50% 50%, rgba(255,255,255,.07) 0deg 10deg, rgba(255,255,255,0) 10deg 20deg)",
        maskImage: "radial-gradient(circle, #000 0%, transparent 70%)",
        WebkitMaskImage: "radial-gradient(circle, #000 0%, transparent 70%)",
      }}
    />
  );
}
