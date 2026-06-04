/** Custom line-icon family (24×24, ~1.75px stroke, rounded caps) per the Econet DS. */
type P = { className?: string };
const base = "currentColor";

export const HomeIcon = (p: P) => (
  <svg viewBox="0 0 24 24" className={p.className} fill="none" stroke={base} strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 10.5 12 3l9 7.5" />
    <path d="M5 9.5V21h14V9.5" />
  </svg>
);
export const GamesIcon = (p: P) => (
  <svg viewBox="0 0 24 24" className={p.className} fill="none" stroke={base} strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="7" width="20" height="11" rx="5.5" />
    <path d="M7 11v3M5.5 12.5h3M15.5 12h.01M18 14h.01" />
  </svg>
);
export const TrophyIcon = (p: P) => (
  <svg viewBox="0 0 24 24" className={p.className} fill="none" stroke={base} strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 4h12v3a6 6 0 0 1-12 0V4Z" />
    <path d="M6 5H3v2a3 3 0 0 0 3 3M18 5h3v2a3 3 0 0 1-3 3M9 17h6M10 21h4M12 13v4" />
  </svg>
);
export const MenuIcon = (p: P) => (
  <svg viewBox="0 0 24 24" className={p.className} fill="none" stroke={base} strokeWidth={1.9} strokeLinecap="round">
    <path d="M4 7h16M4 12h16M4 17h16" />
  </svg>
);
export const CloseIcon = (p: P) => (
  <svg viewBox="0 0 24 24" className={p.className} fill="none" stroke={base} strokeWidth={1.9} strokeLinecap="round">
    <path d="M6 6l12 12M18 6 6 18" />
  </svg>
);
export const ChevronRight = (p: P) => (
  <svg viewBox="0 0 24 24" className={p.className} fill="none" stroke={base} strokeWidth={1.9} strokeLinecap="round" strokeLinejoin="round">
    <path d="m9 6 6 6-6 6" />
  </svg>
);
export const UserIcon = (p: P) => (
  <svg viewBox="0 0 24 24" className={p.className} fill="none" stroke={base} strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="8" r="4" />
    <path d="M4 20a8 8 0 0 1 16 0" />
  </svg>
);
/** Stacked-cards mark for the Pick a Card promo. */
export const CardsIcon = (p: P) => (
  <svg viewBox="0 0 24 24" className={p.className} fill="none" stroke={base} strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round">
    <rect x="8" y="6" width="12" height="15" rx="2.5" />
    <path d="M5.5 8.5 3.4 17a2 2 0 0 0 1.4 2.45l1.7.46" />
    <path d="M12.5 13.5h3" />
  </svg>
);
export const SparkIcon = (p: P) => (
  <svg viewBox="0 0 24 24" className={p.className} fill="none" stroke={base} strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M18 6l-2.5 2.5M8.5 15.5 6 18" />
  </svg>
);
