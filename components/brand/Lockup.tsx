import { cn } from "@/lib/cn";

/**
 * "PICK A CARD & WIN" promo lockup — rebuilt on the Econet Design System v2.0.
 * A distinctive stacked wordmark (Sora) with a tilted card glyph: Econet Blue
 * anchor, Econet Red "& WIN", Rewards Amber star accent. Renders crisp at any
 * size and reads naturally beside the rest of the portal UI.
 *
 * tone="light" → for light surfaces (blue ink) · tone="dark" → for dark surfaces.
 * Size is driven by font-size — pass a text-* class (default text-2xl).
 */
export function Lockup({
  tone = "light",
  className,
  priority: _priority,
}: {
  tone?: "light" | "dark";
  className?: string;
  /** Accepted for API compatibility; the lockup is vector and always crisp. */
  priority?: boolean;
}) {
  const dark = tone === "dark";
  const ink = dark ? "#FFFFFF" : "#001B8D";
  const card = dark ? "#FFFFFF" : "#001B8D";
  const cardInk = dark ? "#001B8D" : "#FFFFFF";

  return (
    <div
      className={cn("inline-flex select-none items-center gap-2.5 text-2xl", className)}
      role="img"
      aria-label="Pick a Card & Win"
    >
      {/* tilted card glyph with a star */}
      <svg viewBox="0 0 40 48" className="h-[1.5em] w-auto shrink-0" style={{ transform: "rotate(-8deg)" }} aria-hidden>
        <rect x="3" y="3" width="34" height="42" rx="7" fill={card} stroke="#E2231A" strokeWidth="2.5" />
        <path
          d="M20 13l2.6 5.27 5.82.85-4.21 4.1 1 5.8L20 26.18l-5.21 2.74 1-5.8-4.21-4.1 5.82-.85L20 13z"
          fill="#FFB020"
          stroke={cardInk}
          strokeWidth="1"
          strokeLinejoin="round"
        />
      </svg>

      <div className="font-display font-extrabold uppercase leading-[0.9] tracking-tight">
        <span className="block" style={{ color: ink }}>
          Pick a Card
        </span>
        <span className="flex items-center gap-[0.15em]">
          <span style={{ color: "#E2231A" }}>&amp; Win</span>
          <svg viewBox="0 0 24 24" className="h-[0.66em] w-[0.66em]" fill="#FFB020" stroke={ink} strokeWidth={1.25} strokeLinejoin="round" aria-hidden>
            <path d="M12 2.5l2.9 5.88 6.49.94-4.7 4.58 1.11 6.46L12 17.9l-5.8 3.05 1.11-6.46-4.7-4.58 6.49-.94L12 2.5z" />
          </svg>
        </span>
      </div>
    </div>
  );
}
