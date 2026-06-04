import Image from "next/image";
import { cn } from "@/lib/cn";

/** Gold daily-points coin — genuine extracted artwork. */
export function Coin({ className }: { className?: string }) {
  return (
    <span className={cn("relative inline-block aspect-square", className)}>
      <Image src="/brand/coin.png" alt="" aria-hidden fill sizes="32px" className="object-contain" />
    </span>
  );
}
