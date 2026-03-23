import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "var(--mv-background)",
        surface: "var(--mv-surface)",
        paper: "var(--mv-paper)",
        primary: "var(--mv-primary)",
        "primary-deep": "var(--mv-primary-deep)",
        secondary: "var(--mv-secondary)",
        tertiary: "var(--mv-tertiary)",
        outline: "var(--mv-outline)",
        text: "var(--mv-text)"
      },
      fontFamily: {
        headline: ["Noto Serif SC", "serif"],
        body: ["Newsreader", "serif"],
        label: ["Space Grotesk", "sans-serif"],
        hand: ["Zhi Mang Xing", "cursive"]
      },
      boxShadow: {
        paper: "3px 4px 0 rgba(44, 38, 33, 0.15)"
      }
    }
  },
  plugins: []
};

export default config;
