import type { Config } from "tailwindcss";

/**
 * YoNumbers design tokens — Econet Digital Lifestyle Design System v2.0.
 * Econet Blue anchor (#001B8D), single Econet Red action (#E2231A),
 * Rewards Amber accent (#FFB020). Sora display + Manrope body. 8px grid.
 * The legacy `navy`/`brand`/`gold` token names are retained but now resolve to
 * v2.0 values, so existing class names render the refreshed brand.
 */
const config: Config = {
  content: [
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Econet Blue family — primary anchor (headers, dark surfaces, trust).
        navy: {
          900: "#000F4D",
          700: "#001B8D", // Econet Blue — anchor
          600: "#1B2BA6", // lighter, for hover lifts
          500: "#5560A6", // secondary text / muted blue
          100: "#E5E8F6", // tint surface
        },
        econetBlue: "#001B8D",
        digitalBlue: "#2E5BFF", // links, focus ring, interactive
        brand: {
          red: "#E2231A", // Econet Red — the single primary action
          redBright: "#F5332A",
          redSoft: "#FF6259",
        },
        // Rewards Amber — the YoNumbers accent (points, prizes, badges).
        amber: { 300: "#FFD37A", 500: "#FFB020", 600: "#E89A12" },
        gold: { 300: "#FFD37A", 500: "#FFB020", 600: "#E89A12" }, // legacy alias → amber
        ink: "#0A0E1F", // body text
        slate: { 600: "#4A5266", 400: "#8A93A6", 100: "#EDF0F5" },
        success: "#1FA463",
        warning: "#F0A020",
        divider: "#E6E8F2",
        surface: { DEFAULT: "#FFFFFF", alt: "#F5F6FA" },
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        body: ["var(--font-body)", "system-ui", "sans-serif"],
      },
      borderRadius: {
        pill: "9999px",
        card: "14px", // DS v2.0 card radius
        tile: "14px",
        input: "12px",
      },
      boxShadow: {
        soft: "0 8px 24px rgba(0,27,141,.10)",
        card: "0 16px 44px rgba(0,27,141,.16)",
        btn: "0 6px 16px rgba(226,35,26,.26)",
        btnNavy: "0 6px 16px rgba(0,27,141,.22)",
      },
      backgroundImage: {
        "grad-navy-foot":
          "radial-gradient(120% 80% at 50% 100%, rgba(0,27,141,.14) 0%, rgba(0,27,141,0) 70%)",
        "grad-navy-card": "linear-gradient(160deg, #1B2BA6 0%, #001B8D 55%, #000F4D 100%)",
      },
      transitionTimingFunction: {
        ds: "cubic-bezier(.2,.7,.2,1)", // DS v2.0 signature easing
      },
      keyframes: {
        bob: { "0%,100%": { transform: "translateY(0)" }, "50%": { transform: "translateY(-6px)" } },
        sunburst: { from: { transform: "rotate(0deg)" }, to: { transform: "rotate(360deg)" } },
        shake: {
          "0%,100%": { transform: "translateX(0)" },
          "20%,60%": { transform: "translateX(-8px)" },
          "40%,80%": { transform: "translateX(8px)" },
        },
      },
      animation: {
        bob: "bob 3s ease-in-out infinite",
        sunburst: "sunburst 60s linear infinite",
        shake: "shake .5s ease-in-out",
      },
    },
  },
  plugins: [],
};
export default config;
