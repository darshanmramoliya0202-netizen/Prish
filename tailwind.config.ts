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
        ink: "#09111f",
        mist: "#f6f0e6",
        copper: "#d3a56d",
        leaf: "#1c7b63",
        ember: "#a95c3a"
      },
      fontFamily: {
        sans: ["var(--font-manrope)"],
        serif: ["var(--font-cormorant)"]
      },
      boxShadow: {
        glow: "0 0 120px rgba(211, 165, 109, 0.18)"
      },
      backgroundImage: {
        "hero-radial": "radial-gradient(circle at top, rgba(28,123,99,0.22), transparent 38%), radial-gradient(circle at 80% 20%, rgba(169,92,58,0.18), transparent 24%), linear-gradient(180deg, #09111f 0%, #0d1730 42%, #09111f 100%)"
      }
    }
  },
  plugins: []
};

export default config;
