"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
const worldTradeBackdrop = "/images/sections/world-trade-map.jpg";

const destinations = [
  {
    name: "United States",
    region: "North America",
    top: "21%",
    left: "67%",
    focus: "Premium botanical, supplement, and formulation-led ingredient programs."
  },
  {
    name: "European Union",
    region: "Europe",
    top: "37%",
    left: "55%",
    focus: "Documentation-sensitive buyers prioritizing consistency, compliance, and long-term supply trust."
  },
  {
    name: "GCC Region",
    region: "Middle East",
    top: "52%",
    left: "59%",
    focus: "Fast-moving food trade, dependable export handling, and reliable commercial responsiveness."
  },
  {
    name: "Southeast Asia",
    region: "Asia",
    top: "69%",
    left: "76%",
    focus: "Adaptable regional supply relationships shaped by practical packaging and shipment readiness."
  }
] as const;

const routePaths = [
  { left: "38%", top: "54%", width: "20%", rotate: "-23deg" },
  { left: "38%", top: "55%", width: "14%", rotate: "-8deg" },
  { left: "38%", top: "56%", width: "17%", rotate: "9deg" },
  { left: "38%", top: "57%", width: "24%", rotate: "17deg" }
] as const;

export default function ExportMap() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeDestination = destinations[activeIndex];

  return (
    <div className="relative h-[22rem] overflow-hidden rounded-2xl border border-wheat/25 bg-cream p-4 shadow-card-light sm:h-[28rem] sm:p-6 lg:h-[31rem]">
      <div className="absolute inset-[0.6rem] overflow-hidden rounded-xl border border-wheat/25 sm:inset-[1.1rem] sm:rounded-[1.9rem]">
        <Image
          src={worldTradeBackdrop}
          alt="World trade backdrop highlighting India export movement"
          fill
          sizes="(min-width: 1024px) 48vw, 100vw"
          className="object-cover"
          style={{ objectPosition: "center 30%" }}
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(15,23,42,0.2),rgba(15,23,42,0.72))]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_22%_70%,rgba(245,166,35,0.18),transparent_16%),radial-gradient(circle_at_82%_18%,rgba(245,166,35,0.1),transparent_18%)]" />
      </div>
      <div className="absolute left-[26%] top-[47%] hidden h-24 w-24 rounded-full border border-saffron/40 bg-saffron/20 shadow-[0_0_50px_rgba(245,166,35,0.2)] sm:block" />
      <div className="absolute left-[29.5%] top-[50%] hidden rounded-full border border-saffron/55 bg-saffron px-5 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-ink sm:block">
        India
      </div>
      <div className="absolute left-[20%] top-[72%] hidden rounded-2xl border border-wheat/25 bg-white/90 px-5 py-4 text-xs leading-6 text-ink-soft shadow-card-light backdrop-blur-md sm:block">
        <p className="uppercase tracking-[0.28em] text-saffron">Origin node</p>
        <p className="mt-2 text-sm font-semibold text-charcoal">Rajkot, Gujarat</p>
      </div>
      <motion.div
        key={activeDestination.name}
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.32, ease: "easeOut" }}
        className="absolute left-3 top-3 z-20 max-w-[14rem] rounded-xl border border-wheat/25 bg-white/92 px-3 py-3 text-xs shadow-card-light backdrop-blur-md sm:left-6 sm:top-6 sm:max-w-[18rem] sm:rounded-2xl sm:px-5 sm:py-4"
      >
        <p className="text-[11px] uppercase tracking-[0.28em] text-saffron">Market emphasis</p>
        <p className="mt-2 font-serif text-2xl text-charcoal">{activeDestination.name}</p>
        <p className="mt-3 text-sm leading-7 text-ink-soft">{activeDestination.focus}</p>
      </motion.div>

      {destinations.map((destination, index) => (
        <motion.button
          key={destination.name}
          type="button"
          className="absolute hidden text-left sm:block"
          style={{ top: destination.top, left: destination.left }}
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.55, delay: 0.1 * index }}
          animate={{ y: activeIndex === index ? -6 : 0, scale: activeIndex === index ? 1.03 : 1 }}
          onMouseEnter={() => setActiveIndex(index)}
          onFocus={() => setActiveIndex(index)}
          onClick={() => setActiveIndex(index)}
        >
          <motion.div
            animate={{
              scale: activeIndex === index ? [1, 1.22, 1] : [1, 1.1, 1],
              opacity: activeIndex === index ? [0.8, 1, 0.8] : [0.45, 0.7, 0.45]
            }}
            transition={{ duration: 2.8 + index * 0.35, repeat: Number.POSITIVE_INFINITY }}
            className="absolute left-1/2 top-1/2 h-10 w-10 -translate-x-1/2 -translate-y-1/2 rounded-full bg-saffron/30 blur-md"
          />
          <div className={`relative rounded-[1.45rem] border px-4 py-3 shadow-[0_18px_40px_rgba(24,50,37,0.16)] backdrop-blur-md transition ${
            activeIndex === index
              ? "border-saffron bg-saffron/10"
              : "border-wheat/25 bg-white/90"
          }`}>
            <p className="text-[11px] uppercase tracking-[0.28em] text-saffron">{destination.region}</p>
            <p className="mt-1 text-sm font-semibold text-ink">{destination.name}</p>
          </div>
        </motion.button>
      ))}

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8 }}
        className="absolute inset-0"
      >
        {routePaths.map((path, index) => (
          <motion.div
            key={`${path.left}-${path.top}`}
            animate={{ opacity: activeIndex === index ? 1 : 0.24, scaleX: activeIndex === index ? 1.08 : 1 }}
            transition={{ duration: 0.28, ease: "easeOut" }}
            className="absolute h-px bg-gradient-to-r from-saffron/80 to-transparent origin-left"
            style={{ left: path.left, top: path.top, width: path.width, transform: `rotate(${path.rotate})` }}
          />
        ))}
      </motion.div>

      <div className="absolute inset-x-3 bottom-3 z-20 flex flex-wrap gap-1.5 sm:inset-x-6 sm:bottom-6 sm:gap-2">
        {destinations.map((destination, index) => (
          <button
            key={destination.name}
            type="button"
            onMouseEnter={() => setActiveIndex(index)}
            onClick={() => setActiveIndex(index)}
            className={`rounded-full border px-4 py-3 text-xs font-semibold uppercase tracking-[0.22em] shadow-[0_10px_24px_rgba(24,50,37,0.12)] transition ${
              activeIndex === index
                ? "border-saffron bg-charcoal text-white"
                : "border-wheat/25 bg-white/90 text-ink-soft hover:border-saffron hover:text-ink"
            }`}
          >
            {destination.name}
          </button>
        ))}
      </div>
    </div>
  );
}
