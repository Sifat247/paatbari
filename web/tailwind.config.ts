import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        jute: {
          DEFAULT: "var(--pk-jute)",
          deep: "var(--pk-jute-deep)",
        },
        leaf: {
          DEFAULT: "var(--pk-leaf)",
        },
        forest: {
          DEFAULT: "var(--pk-forest)",
        },
        cream: {
          DEFAULT: "var(--pk-cream)",
        },
        sand: {
          DEFAULT: "var(--pk-sand)",
        },
        clay: {
          DEFAULT: "var(--pk-clay)",
        },
        ink: {
          DEFAULT: "var(--pk-ink)",
        },
      },
      fontFamily: {
        bn: ["var(--pk-font-bn)", "sans-serif"],
        "bn-display": ["var(--pk-font-bn-display)", "serif"],
        en: ["var(--pk-font-en)", "sans-serif"],
        "en-display": ["var(--pk-font-en-display)", "serif"],
      },
      borderRadius: {
        sm: "6px",
        md: "12px",
        lg: "20px",
        pill: "999px",
      },
      boxShadow: {
        card: "0 6px 20px rgba(43, 42, 38, 0.08)",
        pop: "0 12px 32px rgba(43, 42, 38, 0.14)",
        glow: "0 0 25px rgba(200, 161, 101, 0.35)",
        forest: "0 10px 30px rgba(31, 77, 58, 0.25)",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-6px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        pulseSlow: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.6" },
        },
      },
      animation: {
        float: "float 4s ease-in-out infinite",
        shimmer: "shimmer 3s ease-in-out infinite",
        "pulse-slow": "pulseSlow 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
    },
  },
  plugins: [],
};

export default config;
