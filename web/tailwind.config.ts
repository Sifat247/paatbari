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
      },
    },
  },
  plugins: [],
};

export default config;
