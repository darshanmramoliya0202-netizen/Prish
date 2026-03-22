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
        ink: "#0f172a",
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
        surface: "#f8fafc"
      },
      fontFamily: {
        sans: ["var(--font-manrope)"],
        serif: ["var(--font-playfair)"]
      },
      boxShadow: {
        glow: "0 0 120px rgba(245, 158, 11, 0.12)",
        "card-dark": "0 8px 32px rgba(0,0,0,0.25)",
        "card-light": "0 4px 24px rgba(0,0,0,0.06)"
      },
      backgroundImage: {
        "hero-radial": "radial-gradient(ellipse at 30% 0%, rgba(20,83,45,0.35), transparent 50%), radial-gradient(ellipse at 70% 100%, rgba(15,23,42,0.3), transparent 50%), linear-gradient(180deg, #0f172a 0%, #1e293b 100%)"
      }
    }
  },
  plugins: []
};

export default config;
