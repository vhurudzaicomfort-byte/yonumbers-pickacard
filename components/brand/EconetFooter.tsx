import Image from "next/image";
import { cn } from "@/lib/cn";

/**
 * Econet Wireless co-brand + legal line.
 * `tone` switches the legal text colour for light vs game backgrounds.
 */
export function EconetFooter({
  action = "login/subscribe",
  tone = "light",
  className,
}: {
  action?: string;
  tone?: "light" | "game";
  className?: string;
}) {
  return (
    <footer className={cn("flex flex-col items-center gap-3 text-center", className)}>
      <span className="relative block h-12 w-[150px]">
        <Image
          src="/brand/logo-econet.png"
          alt="Econet Wireless"
          fill
          sizes="150px"
          className="object-contain"
        />
      </span>
      <p
        className={cn(
          "max-w-[340px] text-[11px] leading-snug font-body",
          tone === "game" ? "text-white/80" : "text-ink",
        )}
      >
        By clicking {action}, you have read, understood and agree to be bound by
        the <span className="font-bold">YoNumbers</span> service&rsquo;s Terms
        &amp; Conditions and FAQ&rsquo;s.
      </p>
    </footer>
  );
}
