"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ScanEye, Cpu, Zap, ShieldCheck, Layers, Radio } from "lucide-react";

const techStack = [
  {
    id: "vision",
    title: "Vision-Based Inspection",
    icon: ScanEye,
    description: "Automated optical sorting systems detect foreign matter, discoloration, and size inconsistencies at speeds human eyes can't match. Every batch passes through multi-spectrum cameras before packaging.",
    stat: "99.2%",
    statLabel: "Purity rate achieved"
  },
  {
    id: "laser",
    title: "Laser Sorting",
    icon: Zap,
    description: "Infrared laser sorting separates aflatoxin-contaminated kernels, stones, and off-grade particles with precision. This isn't a claim — it's measurable, verifiable technology at work.",
    stat: "< 0.1%",
    statLabel: "Foreign matter tolerance"
  },
  {
    id: "moisture",
    title: "Digital Moisture Control",
    icon: Radio,
    description: "Real-time moisture sensors across drying lines ensure every batch meets the exact moisture specification your formulation requires — not an average, but a controlled, verifiable number.",
    stat: "±0.5%",
    statLabel: "Moisture variance"
  },
  {
    id: "mesh",
    title: "Precision Milling",
    icon: Layers,
    description: "Multi-stage milling with sieve analysis at each step. Whether you need 40 mesh for industrial blends or 120 mesh for supplement capsules, particle size is controlled to spec.",
    stat: "40–120",
    statLabel: "Mesh range supported"
  },
  {
    id: "traceability",
    title: "Batch Traceability",
    icon: Cpu,
    description: "Every lot is coded, documented, and traceable back to the sourcing region, processing date, and test results. Buyer-specific COA generation available for every shipment.",
    stat: "100%",
    statLabel: "Lot traceability"
  },
  {
    id: "compliance",
    title: "Destination Compliance",
    icon: ShieldCheck,
    description: "Pre-shipment documentation aligned to destination-country regulations. EU pesticide limits, FDA requirements, GCC import protocols — documentation is prepared before you ask.",
    stat: "4+",
    statLabel: "Regulatory frameworks"
  }
];

export default function GlassBox() {
  const [activeId, setActiveId] = useState(techStack[0].id);
  const active = techStack.find((t) => t.id === activeId)!;
  const ActiveIcon = active.icon;

  return (
    <section className="relative overflow-hidden bg-leaf-dark py-16 sm:py-24">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_60%_0%,rgba(232,160,32,0.08),transparent_50%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(26,51,24,0.94),rgba(44,26,14,0.88))]" />
        {/* Circuit-like grid */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: "linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)",
            backgroundSize: "40px 40px"
          }}
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        <div className="mb-12">
          <p className="text-xs font-semibold uppercase tracking-[0.5em] text-white">The Glass Box</p>
          <h2 className="mt-4 max-w-2xl font-sans text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
            Show, don&apos;t tell. {" "}
            <span className="bg-gradient-to-r from-gold-warm to-saffron bg-clip-text text-transparent">
              Technology you can verify.
            </span>
          </h2>
          <p className="mt-4 max-w-lg text-base leading-7 text-parchment">
            We trust technology over corporate promises. Here&apos;s exactly how quality is engineered — not marketed — at every step.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[0.4fr_0.6fr]">
          {/* Tech nav */}
          <div className="flex flex-wrap gap-2 lg:flex-col lg:gap-1">
            {techStack.map((tech) => {
              const Icon = tech.icon;
              const isActive = activeId === tech.id;
              return (
                <button
                  key={tech.id}
                  type="button"
                  onClick={() => setActiveId(tech.id)}
                  className={`group flex items-center gap-3 rounded-xl px-4 py-3 text-left transition lg:w-full ${
                    isActive ? "bg-white/10" : "hover:bg-white/5"
                  }`}
                >
                  <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg transition ${
                    isActive ? "bg-gold-warm text-leaf-dark" : "bg-white/10 text-wheat/70 group-hover:text-white"
                  }`}>
                    <Icon className="h-4 w-4" />
                  </div>
                  <div className="hidden lg:block">
                    <p className={`text-sm font-medium transition ${isActive ? "text-white" : "text-slate-300"}`}>
                      {tech.title}
                    </p>
                  </div>
                  <p className="text-xs font-medium lg:hidden">
                    <span className={isActive ? "text-white" : "text-wheat/70"}>{tech.title.split(" ")[0]}</span>
                  </p>
                </button>
              );
            })}
          </div>

          {/* Detail panel */}
          <AnimatePresence mode="wait">
            <motion.div
              key={active.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.25 }}
              className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-sm sm:p-8"
            >
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-gold-warm to-saffron">
                  <ActiveIcon className="h-6 w-6 text-leaf-dark" />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gold-warm">Technology layer</p>
                  <h3 className="mt-1 text-xl font-semibold text-white sm:text-2xl">{active.title}</h3>
                </div>
              </div>

              <p className="mt-6 text-base leading-8 text-slate-200">{active.description}</p>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div className="rounded-xl border border-white/10 bg-white/5 p-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.28em] text-gold-warm">Key metric</p>
                  <p className="mt-2 font-sans text-3xl font-bold text-white">{active.stat}</p>
                  <p className="mt-1 text-xs text-slate-400">{active.statLabel}</p>
                </div>
                <div className="flex items-center rounded-xl border border-gold-warm/20 bg-gold-warm/5 p-5">
                  <p className="text-sm leading-6 text-parchment/80">
                    This isn&apos;t marketing copy — it&apos;s verifiable operational data. Request a facility audit or third-party test report anytime.
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
