"use client";

import { motion } from "framer-motion";

const destinations = [
  { name: "United States", region: "North America", top: "18%", left: "70%" },
  { name: "European Union", region: "Europe", top: "34%", left: "58%" },
  { name: "GCC Region", region: "Middle East", top: "52%", left: "63%" },
  { name: "Southeast Asia", region: "Asia", top: "70%", left: "76%" }
] as const;

export default function ExportMap() {
  return (
    <div className="relative h-[26rem] overflow-hidden rounded-[2.2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02))] p-6">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_50%,rgba(28,123,99,0.22),transparent_30%),radial-gradient(circle_at_82%_20%,rgba(211,165,109,0.22),transparent_24%)]" />
      <div className="absolute left-[28%] top-[45%] h-24 w-24 rounded-[40%_55%_52%_48%/58%_47%_53%_42%] border border-copper/30 bg-copper/10 shadow-[0_0_60px_rgba(211,165,109,0.16)]" />
      <div className="absolute left-[31.5%] top-[49%] rounded-full border border-copper/40 bg-copper px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-ink">
        India
      </div>
      <div className="absolute left-[26%] top-[66%] rounded-2xl border border-white/10 bg-ink/70 px-4 py-3 text-xs leading-6 text-mist/72 backdrop-blur-md">
        <p className="uppercase tracking-[0.28em] text-copper/75">Origin node</p>
        <p className="mt-2 text-sm text-mist">Rajkot, Gujarat</p>
      </div>

      {destinations.map((destination, index) => (
        <motion.div
          key={destination.name}
          className="absolute"
          style={{ top: destination.top, left: destination.left }}
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.55, delay: 0.1 * index }}
        >
          <motion.div
            animate={{ scale: [1, 1.15, 1], opacity: [0.55, 1, 0.55] }}
            transition={{ duration: 2.8 + index * 0.35, repeat: Number.POSITIVE_INFINITY }}
            className="absolute left-1/2 top-1/2 h-10 w-10 -translate-x-1/2 -translate-y-1/2 rounded-full bg-copper/15 blur-md"
          />
          <div className="relative rounded-2xl border border-white/10 bg-[#0d1830]/80 px-4 py-3 backdrop-blur-md">
            <p className="text-[11px] uppercase tracking-[0.28em] text-copper/75">{destination.region}</p>
            <p className="mt-1 text-sm font-semibold text-mist">{destination.name}</p>
          </div>
        </motion.div>
      ))}

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8 }}
        className="absolute inset-0"
      >
        <div className="absolute left-[40%] top-[52%] h-px w-[21%] rotate-[-22deg] bg-gradient-to-r from-copper/70 to-transparent" />
        <div className="absolute left-[39%] top-[53%] h-px w-[15%] rotate-[-5deg] bg-gradient-to-r from-copper/70 to-transparent" />
        <div className="absolute left-[40%] top-[55%] h-px w-[18%] rotate-[8deg] bg-gradient-to-r from-copper/70 to-transparent" />
        <div className="absolute left-[40%] top-[57%] h-px w-[26%] rotate-[16deg] bg-gradient-to-r from-copper/70 to-transparent" />
      </motion.div>
    </div>
  );
}
