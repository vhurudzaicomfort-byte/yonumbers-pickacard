/** Brand celebration star — clean Rewards Amber fill with a soft glow, no outline. */
export function Star({ className, tone = "gold" }: { className?: string; tone?: "gold" | "muted" }) {
  const fill = tone === "gold" ? "#FFB020" : "#C9CCE0";
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill={fill}
      style={tone === "gold" ? { filter: "drop-shadow(0 1px 6px rgba(255,176,32,.55))" } : undefined}
    >
      <path d="M12 2.5l2.9 5.88 6.49.94-4.7 4.58 1.11 6.46L12 17.9l-5.8 3.05 1.11-6.46-4.7-4.58 6.49-.94L12 2.5z" />
    </svg>
  );
}
