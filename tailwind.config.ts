import type { Config } from "tailwindcss";

/**
 * YoNumbers design tokens — Core brand only (Addendum B).
 * Navy + red + white, rounded sans. No game-world purple/candy palette.
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
        navy: {
          900: "#00263A",
          700: "#2B368A", // primary brand blue
          600: "#323C8E",
          500: "#48529A",
          100: "#E6E8F2",
        },
        brand: {
          red: "#E92230",
          redBright: "#ED0F29",
          redSoft: "#FE4B60",
        },
        ink: "#7A7A7C",
        divider: "#E6E8F2",
        surface: { DEFAULT: "#FFFFFF", alt: "#F5F5F5" },
        gold: { 300: "#FEF270", 500: "#FFD217", 600: "#FED903" }, // coin / star accent only
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        body: ["var(--font-body)", "system-ui", "sans-serif"],
      },
      borderRadius: {
        pill: "9999px",
        card: "28px",
        tile: "18px",
        input: "16px",
      },
      boxShadow: {
        soft: "0 8px 24px rgba(43,54,138,.12)",
        card: "0 12px 40px rgba(43,54,138,.18)",
        btn: "0 6px 16px rgba(233,34,48,.28)",
        btnNavy: "0 6px 16px rgba(43,54,138,.22)",
      },
      backgroundImage: {
        "grad-navy-foot":
          "radial-gradient(120% 80% at 50% 100%, rgba(43,54,138,.16) 0%, rgba(43,54,138,0) 70%)",
        "grad-navy-card": "linear-gradient(160deg, #323C8E 0%, #2B368A 55%, #00263A 100%)",
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
