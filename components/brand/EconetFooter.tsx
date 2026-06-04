import Image from "next/image";
import { cn } from "@/lib/cn";

/**
 * Econet Wireless co-brand + legal line, presented "reversed on Econet blue"
 * (per the Econet design system) so the genuine white wordmark always reads.
 */
export function EconetFooter({
  action = "login/subscribe",
  className,
}: {
  action?: string;
  className?: string;
}) {
  return (
    <footer
      className={cn(
        "flex flex-col items-center gap-3 rounded-card bg-grad-navy-card px-6 py-5 text-center",
        className,
      )}
    >
      <span className="relative block h-10 w-[140px]">
        <Image src="/brand/logo-econet.png" alt="Econet Wireless" fill sizes="140px" className="object-contain" />
      </span>
      <p className="max-w-[340px] text-[11px] leading-snug font-body text-white/80">
        By clicking {action}, you have read, understood and agree to be bound by
        the <span className="font-bold text-white">YoNumbers</span> service&rsquo;s
        Terms &amp; Conditions and FAQ&rsquo;s.
      </p>
    </footer>
  );
}
