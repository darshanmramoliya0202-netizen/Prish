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
        ink: "#1c1c1c",
        "ink-soft": "#4a4a3a",
        charcoal: "#1e293b",
        slate: "#64748b",
        cream: "#f9f4e7",
        parchment: "#f2e8d0",
        powder: "#fafaf9",
        mist: "#f1f5f9",
        surface: "#f8fafc",
        forest: "#0f5132",
        "leaf-dark": "#1a2e1a",
        leaf: "#22873a",
        sprout: "#4a9e52",
        olive: "#3a6b4a",
        soil: "#2a1a0a",
        earth: "#5a3418",
        bark: "#8a6040",
        wheat: "#e8d5a0",
        copper: "#c4924e",
        saffron: "#e8843a",
        turmeric: "#e09800",
        "gold-warm": "#d4910a",
        gold: "#c9a84c",
        "gold-light": "#f5c842",
        terracotta: "#c0522a",
        "spice-dark": "#5c2d0a",
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
