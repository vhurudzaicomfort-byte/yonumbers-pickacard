import Image from "next/image";
import { cn } from "@/lib/cn";

/** YoNumbers wordmark — the genuine extracted artwork (square canvas). */
export function Logo({
  variant = "navy",
  className,
  priority,
}: {
  variant?: "white" | "navy";
  className?: string;
  priority?: boolean;
}) {
  const src =
    variant === "white"
      ? "/brand/logo-yonumbers-white.png"
      : "/brand/logo-yonumbers-navy.png";
  return (
    <span className={cn("relative inline-block aspect-square", className)}>
      <Image
        src={src}
        alt="YoNumbers"
        fill
        sizes="200px"
        className="object-contain"
        priority={priority}
      />
    </span>
  );
}
