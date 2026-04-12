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
        ink: "#1a1a0e",
        "ink-soft": "#6b6352",
        charcoal: "#1e293b",
        slate: "#64748b",
        cream: "#fdfcf7",
        parchment: "#f7f3ea",
        powder: "#fafaf9",
        mist: "#f1f5f9",
        surface: "#f8fafc",
        forest: "#0f5132",
        "leaf-dark": "#163a1e",
        leaf: "#22873a",
        sprout: "#4a9e52",
        olive: "#3a6b4a",
        soil: "#2a1a0a",
        earth: "#5a3418",
        bark: "#8a6040",
        wheat: "#d4a96a",
        copper: "#c4924e",
        saffron: "#f5a623",
        turmeric: "#e09800",
        "gold-warm": "#d4910a",
        ember: "#e85d1a",
        chili: "#d42a2a",
      },
      fontFamily: {
        sans: ["var(--font-manrope)"],
        serif: ["var(--font-playfair)"]
      },
      boxShadow: {
        glow: "0 0 120px rgba(245, 166, 35, 0.12)",
        "card-dark": "0 8px 32px rgba(0,0,0,0.25)",
        "card-light": "0 10px 30px rgba(90,52,24,0.08), 0 2px 8px rgba(42,26,10,0.05)",
        paper: "0 18px 48px rgba(90,52,24,0.1), 0 2px 10px rgba(42,26,10,0.06)"
      },
      backgroundImage: {
        "hero-radial": "radial-gradient(ellipse at 30% 0%, rgba(34,135,58,0.10), transparent 50%), radial-gradient(ellipse at 70% 100%, rgba(224,152,0,0.07), transparent 50%), linear-gradient(180deg, #fdfcf7 0%, #f7f3ea 100%)"
      }
    }
  },
  plugins: []
};

export default config;
