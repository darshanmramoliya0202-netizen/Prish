"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Leaf } from "lucide-react";

const regions = [
  {
    id: "gujarat",
    state: "Gujarat",
    products: ["Cumin", "Fennel", "Coriander"],
    description: "Home to Unjha — the world's largest cumin trading mandi. Gujarat's arid climate and rich alluvial soil produce the most aromatic cumin and fennel in the world.",
    metric: "World's #1 cumin origin",
    cx: "34%",
    cy: "52%",
    color: "saffron"
  },
  {
    id: "rajasthan",
    state: "Rajasthan",
    products: ["Cumin", "Chili"],
    description: "The desert state's intense sun and low humidity create ideal conditions for sun-dried spice production. Rajasthan chili is prized for its bold heat and vivid colour.",
    metric: "280+ sunshine days/year",
    cx: "30%",
    cy: "38%",
    color: "ember"
  },
  {
    id: "maharashtra",
    state: "Maharashtra",
    products: ["Turmeric", "Onion"],
    description: "Sangli district produces over 30% of India's turmeric. Maharashtra's black cotton soil gives turmeric its exceptional curcumin content and deep golden colour.",
    metric: "30% of India's turmeric",
    cx: "32%",
    cy: "65%",
    color: "turmeric"
  }
] as const;

const colorMap = {
  saffron: { dot: "bg-saffron", ring: "ring-saffron/40", badge: "bg-saffron/15 border-saffron/30 text-saffron", text: "text-saffron" },
  ember:   { dot: "bg-ember",   ring: "ring-ember/40",   badge: "bg-ember/15 border-ember/30 text-ember",     text: "text-ember"   },
  turmeric:{ dot: "bg-turmeric",ring: "ring-turmeric/40",badge: "bg-turmeric/15 border-turmeric/30 text-turmeric", text: "text-turmeric" }
};

export default function SourcingRegions() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const active = regions.find((r) => r.id === activeId) ?? null;

  return (
    <section className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-10">
      <div className="mb-12">
        <div className="flex items-center gap-2">
          <Leaf className="h-4 w-4 text-leaf" />
          <p className="text-xs font-semibold uppercase tracking-[0.4em] text-leaf">Origin Transparency</p>
        </div>
        <h2 className="mt-4 max-w-2xl font-serif text-3xl text-ink sm:text-4xl">
          Where every ingredient{" "}
          <span className="bg-gradient-to-r from-gold-warm to-saffron bg-clip-text text-transparent">
            begins.
          </span>
        </h2>
        <p className="mt-4 max-w-xl text-base leading-7 text-ink-soft">
          Prish sources directly from India's three primary agricultural belts — Gujarat, Rajasthan, and Maharashtra. Each region is chosen for crop-specific soil, climate, and heritage growing practices.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1fr_1.1fr]">

        {/* India SVG Map */}
        <div className="relative rounded-[2rem] border border-wheat/25 bg-parchment/40 p-6 shadow-card-light">
          <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.3em] text-ink-soft">Sourcing Map — India</p>
          <div className="relative">
            <svg viewBox="0 0 200 260" className="w-full max-w-xs mx-auto" fill="none">
              {/* India outline — simplified */}
              <path
                d="M60,20 L80,16 L100,18 L118,22 L132,30 L140,42 L142,56 L138,68 L130,76 L136,88 L140,102 L138,116 L132,128 L124,138 L118,150 L114,164 L108,178 L100,192 L94,204 L88,214 L82,220 L76,216 L72,206 L68,194 L64,180 L60,166 L56,152 L52,138 L48,124 L44,110 L42,96 L44,82 L48,70 L50,56 L52,42 L56,30 Z"
                fill="rgba(34,135,58,0.08)"
                stroke="rgba(34,135,58,0.35)"
                strokeWidth="1.5"
              />
              {/* Kashmir/North */}
              <path
                d="M60,20 L72,12 L84,8 L96,10 L108,14 L118,20 L128,26 L132,30"
                stroke="rgba(34,135,58,0.25)"
                strokeWidth="1"
                fill="none"
              />
              {/* Northeast */}
              <path
                d="M140,42 L148,38 L158,36 L164,42 L160,52 L152,56 L142,56"
                fill="rgba(34,135,58,0.05)"
                stroke="rgba(34,135,58,0.2)"
                strokeWidth="1"
              />

              {/* Region pins */}
              {regions.map((region) => {
                const colors = colorMap[region.color];
                const isActive = activeId === region.id;
                const x = parseFloat(region.cx) * 2;
                const y = parseFloat(region.cy) * 2.6;
                return (
                  <g
                    key={region.id}
                    style={{ cursor: "pointer" }}
                    onClick={() => setActiveId(isActive ? null : region.id)}
                  >
                    {isActive && (
                      <motion.circle
                        cx={x}
                        cy={y}
                        r="14"
                        fill="none"
                        stroke={region.color === "saffron" ? "rgba(245,166,35,0.35)" : region.color === "ember" ? "rgba(232,93,26,0.35)" : "rgba(224,152,0,0.35)"}
                        strokeWidth="1"
                        animate={{ r: [14, 22, 14], opacity: [0.6, 0, 0.6] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                    )}
                    <circle
                      cx={x}
                      cy={y}
                      r={isActive ? 7 : 5}
                      fill={region.color === "saffron" ? "rgba(245,166,35,0.9)" : region.color === "ember" ? "rgba(232,93,26,0.9)" : "rgba(224,152,0,0.9)"}
                      stroke="white"
                      strokeWidth="1.5"
                    />
                    <text
                      x={x + 10}
                      y={y + 4}
                      fontSize="7"
                      fontWeight="600"
                      fill={region.color === "saffron" ? "rgba(212,145,10,1)" : region.color === "ember" ? "rgba(232,93,26,1)" : "rgba(200,120,0,1)"}
                      letterSpacing="0.5"
                    >
                      {region.state}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>

          {/* Region selector pills */}
          <div className="mt-4 flex flex-wrap justify-center gap-2">
            {regions.map((region) => {
              const colors = colorMap[region.color];
              return (
                <button
                  key={region.id}
                  type="button"
                  onClick={() => setActiveId(activeId === region.id ? null : region.id)}
                  className={`flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] transition duration-200 ${
                    activeId === region.id
                      ? colors.badge
                      : "border-wheat/30 bg-white/60 text-ink-soft hover:border-wheat hover:text-ink"
                  }`}
                >
                  <MapPin className="h-3 w-3" />
                  {region.state}
                </button>
              );
            })}
          </div>
        </div>

        {/* Detail panel */}
        <div className="flex flex-col gap-4">
          <AnimatePresence mode="wait">
            {active ? (
              <motion.div
                key={active.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.28, ease: "easeOut" }}
                className="rounded-[2rem] border border-wheat/25 bg-white/90 p-6 shadow-card-light sm:p-8"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className={`text-[11px] font-semibold uppercase tracking-[0.3em] ${colorMap[active.color].text}`}>
                      Sourcing Region
                    </p>
                    <h3 className="mt-2 font-serif text-3xl text-ink">{active.state}</h3>
                  </div>
                  <span className={`shrink-0 rounded-full border px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] ${colorMap[active.color].badge}`}>
                    {active.metric}
                  </span>
                </div>

                <p className="mt-5 text-sm leading-7 text-ink-soft">{active.description}</p>

                <div className="mt-6">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-ink-soft">Products from this region</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {active.products.map((product) => (
                      <span
                        key={product}
                        className="rounded-full border border-leaf/25 bg-leaf/8 px-4 py-2 text-xs font-semibold text-leaf"
                      >
                        {product}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex h-full min-h-[200px] items-center justify-center rounded-[2rem] border border-dashed border-wheat/40 bg-parchment/20 p-8 text-center"
              >
                <div>
                  <MapPin className="mx-auto h-8 w-8 text-wheat" />
                  <p className="mt-3 text-sm font-medium text-ink-soft">Select a region on the map</p>
                  <p className="mt-1 text-xs text-wheat">Click Gujarat, Rajasthan, or Maharashtra</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* All regions quick view */}
          <div className="grid gap-3 sm:grid-cols-3">
            {regions.map((region) => {
              const colors = colorMap[region.color];
              return (
                <button
                  key={region.id}
                  type="button"
                  onClick={() => setActiveId(activeId === region.id ? null : region.id)}
                  className={`group rounded-[1.4rem] border p-4 text-left transition duration-200 ${
                    activeId === region.id
                      ? `${colors.badge} shadow-card-light`
                      : "border-wheat/25 bg-white/60 hover:border-wheat/50 hover:bg-white/90"
                  }`}
                >
                  <p className={`text-[10px] font-semibold uppercase tracking-[0.25em] ${activeId === region.id ? colors.text : "text-ink-soft"}`}>
                    {region.state}
                  </p>
                  <div className="mt-2 flex flex-wrap gap-1">
                    {region.products.map((p) => (
                      <span key={p} className="text-[10px] font-medium text-ink-soft">{p}</span>
                    ))}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
