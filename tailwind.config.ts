import type { Config } from "tailwindcss";

/**
 * YoNumbers "Pick a Card & Win" — design tokens.
 * Authoritative values pulled straight from the supplied Figma SVGs.
 * No hard-coded hex belongs in components — reference these tokens.
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
        /* Brand core (YoNumbers / Econet corporate) */
        navy: {
          900: "#00263A",
          700: "#2B368A", // primary brand blue
          600: "#323C8E",
          500: "#48529A",
        },
        brand: {
          red: "#E92230",
          redBright: "#ED0F29",
          redSoft: "#FE4B60",
        },
        ink: "#7A7A7C",
        surface: { DEFAULT: "#FFFFFF", alt: "#F5F5F5" },

        /* PickaCard game world */
        violet: {
          400: "#9C59FE",
          500: "#7654FD", // game bg base
          600: "#6F53FD",
          700: "#5B43D6",
        },
        magenta: {
          300: "#FC8AFF",
          400: "#FF60D2",
          500: "#E546FF",
          600: "#DA57F0",
        },
        candy: {
          green400: "#A6F208",
          green500: "#67EB00",
          green600: "#4EC407",
        },
        gold: {
          300: "#FEF270",
          500: "#FFD217",
          600: "#FED903",
        },
        amber: "#FFB213",
        chest: { purple: "#4A30AA", purpleDark: "#3B276F" },
        orangeAccent: "#DA6313",
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
        candy: "0 6px 0 rgba(0,0,0,.18), 0 10px 22px rgba(0,0,0,.22)",
        candyPressed: "0 2px 0 rgba(0,0,0,.18), 0 4px 10px rgba(0,0,0,.22)",
      },
      backgroundImage: {
        "grad-game": "linear-gradient(160deg, #7654FD 0%, #9C59FE 45%, #6F53FD 100%)",
        "grad-magenta": "linear-gradient(180deg, #FF60D2 0%, #E546FF 100%)",
        "grad-green": "linear-gradient(180deg, #A6F208 0%, #67EB00 60%, #4EC407 100%)",
        "grad-gold": "linear-gradient(180deg, #FEF270 0%, #FFD217 55%, #FFB213 100%)",
        "grad-red": "linear-gradient(180deg, #FE4B60 0%, #E92230 60%, #ED0F29 100%)",
        "grad-magenta-btn": "linear-gradient(180deg, #FF60D2 0%, #E546FF 60%, #DA57F0 100%)",
        "grad-pink-btn": "linear-gradient(180deg, #FC8AFF 0%, #FF60D2 60%, #E546FF 100%)",
        "grad-navy-foot": "radial-gradient(120% 80% at 50% 100%, rgba(43,54,138,.16) 0%, rgba(43,54,138,0) 70%)",
      },
      keyframes: {
        bob: { "0%,100%": { transform: "translateY(0)" }, "50%": { transform: "translateY(-6px)" } },
        sunburst: { from: { transform: "rotate(0deg)" }, to: { transform: "rotate(360deg)" } },
        shake: {
          "0%,100%": { transform: "translateX(0)" },
          "20%,60%": { transform: "translateX(-8px)" },
          "40%,80%": { transform: "translateX(8px)" },
        },
        shimmer: { "0%": { backgroundPosition: "-200% 0" }, "100%": { backgroundPosition: "200% 0" } },
      },
      animation: {
        bob: "bob 3s ease-in-out infinite",
        sunburst: "sunburst 60s linear infinite",
        shake: "shake .5s ease-in-out",
        shimmer: "shimmer 2.5s linear infinite",
      },
    },
  },
  plugins: [],
};
export default config;
