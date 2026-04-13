"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Sprout, Sun, Wind, Microscope, Package, Ship } from "lucide-react";

const journeyStages = [
  {
    id: "farm",
    title: "Farm Selection",
    subtitle: "Origin belt identification",
    icon: Sprout,
    image: "/images/products/coriander-powder-bowl.png",
    description: "Raw materials are sourced from selected Indian growing belts — Gujarat, Rajasthan, Maharashtra, and southern regions — chosen for crop character, seasonal reliability, and generational farming knowledge.",
    detail: "Multi-origin sourcing across 4+ Indian agricultural zones",
    color: "from-green-500 to-emerald-600"
  },
  {
    id: "harvest",
    title: "Harvest & Drying",
    subtitle: "Controlled dehydration",
    icon: Sun,
    image: "/images/products/turmeric-raw.jpg",
    description: "Low-temperature drying preserves active compounds, natural color, and nutritional integrity. Each batch is handled under controlled conditions to ensure consistency from harvest to processing.",
    detail: "280+ annual sunshine days in major growing regions",
    color: "from-saffron to-terracotta"
  },
  {
    id: "processing",
    title: "Milling & Processing",
    subtitle: "Precision particle control",
    icon: Wind,
    image: "/images/products/pineapple-powder.png",
    description: "Fine milling for uniform particle size, hygienic processing under controlled conditions, and batch-wise consistency designed for formulation confidence across buyer programs.",
    detail: "2500+ MT monthly production capacity",
    color: "from-blue-500 to-indigo-500"
  },
  {
    id: "testing",
    title: "Quality Validation",
    subtitle: "Metrology-level checks",
    icon: Microscope,
    image: "/images/products/cranberry-cherry-powder.png",
    description: "Specification support, third-party laboratory testing on request, and destination-country compliance alignment. Moisture content, ash value, mesh size, and active compound levels are verified per batch.",
    detail: "100+ specification profiles supported",
    color: "from-violet-500 to-purple-500"
  },
  {
    id: "packaging",
    title: "Export Packaging",
    subtitle: "Food-grade formats",
    icon: Package,
    image: "/images/products/cumin-powder-bowl.png",
    description: "HDPE bags, BOPP/kraft paper, multi-layer laminated boxes, and fiber drums — matched to logistics requirements, storage conditions, and buyer format expectations.",
    detail: "5+ packaging formats available",
    color: "from-rose-500 to-pink-500"
  },
  {
    id: "shipping",
    title: "Global Shipping",
    subtitle: "Container-ready dispatch",
    icon: Ship,
    image: "/images/products/red-chilli-collage.png",
    description: "Documentation preparation, freight coordination, and shipment execution for FCL and LCL movements. IEC-compliant export documentation and proforma invoice support included.",
    detail: "4 major global market clusters served",
    color: "from-cyan-500 to-teal-500"
  }
] as const;

export default function SeedJourney() {
  const [activeStage, setActiveStage] = useState(0);
  const stage = journeyStages[activeStage];
  const Icon = stage.icon;

  return (
    <section className="relative bg-leaf-dark py-16 sm:py-20">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(34,135,58,0.14),transparent_50%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(22,58,30,0.94),rgba(42,26,10,0.86))]" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        <div className="mb-12">
          <p className="text-xs font-semibold uppercase tracking-[0.4em] text-gold-warm">Traceability</p>
          <h2 className="mt-4 max-w-2xl font-serif text-3xl text-parchment sm:text-4xl">
            Journey of the Seed — farm to formulation.
          </h2>
          <p className="mt-4 max-w-xl text-base leading-7 text-parchment/70">
            Every ingredient has a traceable lifecycle. Follow the path from local farmer fields through advanced quality checks to your destination port.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1fr_1.2fr]">
          {/* Timeline navigation */}
          <div className="relative">
            <div className="absolute left-[1.35rem] top-0 hidden h-full w-px bg-gradient-to-b from-saffron/40 via-saffron/20 to-transparent lg:block" />
            <div className="flex flex-wrap gap-2 lg:flex-col lg:gap-0">
              {journeyStages.map((s, index) => {
                const StageIcon = s.icon;
                const isActive = activeStage === index;
                return (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => setActiveStage(index)}
                    className={`group relative flex items-center gap-4 rounded-xl px-3 py-3 text-left transition lg:w-full lg:rounded-2xl lg:px-4 lg:py-4 ${
                      isActive
                        ? "bg-white/10"
                        : "hover:bg-white/5"
                    }`}
                  >
                    <div className={`relative z-10 flex h-11 w-11 shrink-0 items-center justify-center rounded-xl transition ${
                      isActive
                        ? "bg-gold-warm text-leaf-dark"
                        : "bg-white/10 text-wheat/70 group-hover:text-white"
                    }`}>
                      <StageIcon className="h-5 w-5" />
                    </div>
                    <div className="hidden lg:block">
                      <p className={`text-sm font-semibold transition ${isActive ? "text-parchment" : "text-parchment/60"}`}>
                        {s.title}
                      </p>
                      <p className={`mt-0.5 text-xs transition ${isActive ? "text-gold-warm" : "text-wheat/60"}`}>
                        {s.subtitle}
                      </p>
                    </div>
                    <p className="text-xs font-medium lg:hidden">
                      <span className={isActive ? "text-white" : "text-wheat/70"}>{String(index + 1).padStart(2, "0")}</span>
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active stage detail */}
          <AnimatePresence mode="wait">
            <motion.div
              key={stage.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm sm:p-8"
            >
              <div className="flex items-center gap-4">
                <div className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${stage.color}`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gold-warm">
                    Stage {String(activeStage + 1).padStart(2, "0")} of {String(journeyStages.length).padStart(2, "0")}
                  </p>
                  <h3 className="mt-1 font-serif text-2xl text-parchment">{stage.title}</h3>
                </div>
              </div>

              <div className="mt-6 relative h-40 w-full overflow-hidden rounded-xl">
                <Image src={stage.image} alt={stage.title} fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              </div>

              <p className="mt-5 text-base leading-7 text-parchment/80">{stage.description}</p>

              <div className="mt-5 rounded-xl border border-white/10 bg-white/5 px-5 py-4">
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-gold-warm">Key metric</p>
                <p className="mt-2 font-serif text-xl text-parchment">{stage.detail}</p>
              </div>

              {/* Progress bar */}
              <div className="mt-6 flex items-center gap-3">
                <div className="h-1 flex-1 overflow-hidden rounded-full bg-white/10">
                  <motion.div
                    className="h-full rounded-full bg-gradient-to-r from-saffron to-turmeric"
                    initial={{ width: 0 }}
                    animate={{ width: `${((activeStage + 1) / journeyStages.length) * 100}%` }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                  />
                </div>
                <p className="text-xs text-parchment/40">
                  {activeStage + 1}/{journeyStages.length}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
