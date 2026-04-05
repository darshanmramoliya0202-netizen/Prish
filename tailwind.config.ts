import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./data/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        ink: "#1c1208",
        mist: "#f1f5f9",
        charcoal: "#1e293b",
        forest: "#14532d",
        saffron: "#f59e0b",
        turmeric: "#d97706",
        chili: "#dc2626",
        copper: "#c99c63",
        leaf: "#16a34a",
        ember: "#ea580c",
        slate: "#64748b",
        powder: "#fafaf9",
        olive: "#365241",
        surface: "#f8fafc",
        parchment: "#faf7f0",
        cream: "#fdfcf9",
        soil: "#2c1a0e",
        earth: "#5c3317",
        bark: "#8b5e3c",
        wheat: "#c89b6e",
        "leaf-dark": "#1a3318",
        sprout: "#4a7c40",
        "gold-warm": "#e8a020",
        "ink-soft": "#7a6650"
      },
      fontFamily: {
        sans: ["var(--font-manrope)"],
        serif: ["var(--font-playfair)"]
      },
      boxShadow: {
        glow: "0 0 120px rgba(245, 158, 11, 0.12)",
        "card-dark": "0 8px 32px rgba(0,0,0,0.25)",
        "card-light": "0 10px 30px rgba(92,51,23,0.08), 0 2px 8px rgba(44,26,14,0.05)",
        paper: "0 18px 48px rgba(92,51,23,0.1), 0 2px 10px rgba(44,26,14,0.06)"
      },
      backgroundImage: {
        "hero-radial": "radial-gradient(ellipse at 30% 0%, rgba(74,124,64,0.12), transparent 50%), radial-gradient(ellipse at 70% 100%, rgba(217,119,6,0.08), transparent 50%), linear-gradient(180deg, #fdfcf9 0%, #faf7f0 100%)"
      }
    }
  },
  plugins: []
};

export default config;
