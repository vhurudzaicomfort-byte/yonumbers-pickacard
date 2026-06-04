/** Brand star accent (inline SVG so colour stays on-palette). */
export function Star({ className, tone = "gold" }: { className?: string; tone?: "gold" | "muted" }) {
  const fill = tone === "gold" ? "#FFD217" : "#C9CCE0";
  const stroke = tone === "gold" ? "#FED903" : "#AEB2CC";
  return (
    <svg viewBox="0 0 24 24" className={className} fill={fill} stroke={stroke} strokeWidth={1.5} strokeLinejoin="round">
      <path d="M12 2.5l2.9 5.88 6.49.94-4.7 4.58 1.11 6.46L12 17.9l-5.8 3.05 1.11-6.46-4.7-4.58 6.49-.94L12 2.5z" />
    </svg>
  );
}
