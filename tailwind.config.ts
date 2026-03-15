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
        ink: "#12261d",
        mist: "#f6f0e6",
        copper: "#c99c63",
        leaf: "#1c7b63",
        ember: "#a95c3a",
        powder: "#f7efdf",
        olive: "#365241"
      },
      fontFamily: {
        sans: ["var(--font-manrope)"],
        serif: ["var(--font-cormorant)"]
      },
      boxShadow: {
        glow: "0 0 120px rgba(211, 165, 109, 0.18)"
      },
      backgroundImage: {
        "hero-radial": "radial-gradient(circle at top, rgba(255,250,240,0.9), transparent 36%), radial-gradient(circle at 80% 18%, rgba(201,156,99,0.12), transparent 28%), radial-gradient(circle at 18% 72%, rgba(107,148,95,0.08), transparent 30%), linear-gradient(180deg, #faf4e8 0%, #f5eedf 44%, #f8f1e4 100%)"
      }
    }
  },
  plugins: []
};

export default config;
