"use client";

import { motion } from "framer-motion";

const ingredientNodes = [
  { label: "Jamun", top: "12%", left: "58%", size: "large", tone: "copper" },
  { label: "Beetroot", top: "52%", left: "12%", size: "medium", tone: "berry" },
  { label: "Turmeric", top: "62%", left: "62%", size: "large", tone: "gold" },
  { label: "Sea Buckthorn", top: "26%", left: "16%", size: "small", tone: "leaf" },
  { label: "Garlic", top: "22%", left: "76%", size: "small", tone: "mist" },
  { label: "Onion", top: "78%", left: "34%", size: "small", tone: "ember" }
] as const;

const sizeMap = {
  small: "h-20 w-20 text-xs",
  medium: "h-28 w-28 text-sm",
  large: "h-36 w-36 text-base"
} as const;

const toneMap = {
  copper: "from-[#d3a56d]/35 to-[#d3a56d]/10 border-[#d3a56d]/35",
  berry: "from-[#8f3b74]/35 to-[#8f3b74]/10 border-[#8f3b74]/35",
  gold: "from-[#c78d2c]/35 to-[#c78d2c]/10 border-[#c78d2c]/35",
  leaf: "from-[#1c7b63]/35 to-[#1c7b63]/10 border-[#1c7b63]/35",
  mist: "from-white/20 to-white/5 border-white/20",
  ember: "from-[#a95c3a]/35 to-[#a95c3a]/10 border-[#a95c3a]/35"
} as const;

export default function IngredientCloud() {
  return (
    <div className="relative h-[28rem] overflow-hidden rounded-[2.4rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.03))] p-6 shadow-glow backdrop-blur-md">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.04),transparent_40%),radial-gradient(circle_at_80%_15%,rgba(211,165,109,0.16),transparent_20%),radial-gradient(circle_at_22%_82%,rgba(28,123,99,0.18),transparent_24%)]" />
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 28, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        className="absolute inset-[12%] rounded-full border border-dashed border-white/10"
      />
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 24, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        className="absolute inset-[24%] rounded-full border border-dashed border-copper/10"
      />
      <div className="absolute left-1/2 top-1/2 flex h-40 w-40 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-copper/20 bg-[#0e1930]/85 text-center backdrop-blur-md">
        <div>
          <p className="text-xs uppercase tracking-[0.34em] text-copper/75">Ingredient energy</p>
          <p className="mt-3 font-serif text-3xl text-mist">India in motion</p>
        </div>
      </div>
      {ingredientNodes.map((node, index) => (
        <motion.div
          key={node.label}
          className={`absolute flex items-center justify-center rounded-full border bg-gradient-to-br text-center font-semibold text-mist/88 backdrop-blur-md ${sizeMap[node.size]} ${toneMap[node.tone]}`}
          style={{ top: node.top, left: node.left }}
          animate={{ y: [0, -10, 0], rotate: [0, 2, -2, 0] }}
          transition={{ duration: 4 + index * 0.45, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        >
          <span className="max-w-[70%] leading-5">{node.label}</span>
        </motion.div>
      ))}
    </div>
  );
}
