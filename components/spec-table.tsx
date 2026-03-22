"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Droplets, Flame, Grid3X3, Clock, Palette, Package } from "lucide-react";
import { productSpecs, type ProductSpec } from "@/data/specs";

const categories = [...new Set(productSpecs.map((s) => s.category))];

export default function SpecTable() {
  const [activeCategory, setActiveCategory] = useState(categories[0]);
  const [expandedProduct, setExpandedProduct] = useState<string | null>(null);

  const filtered = productSpecs.filter((s) => s.category === activeCategory);

  return (
    <section className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-10">
      <div className="mb-10">
        <p className="text-xs uppercase tracking-[0.4em] text-saffron">Product Specifications</p>
        <h2 className="mt-4 max-w-2xl font-serif text-3xl text-[#0f172a] sm:text-4xl lg:text-5xl">
          Technical data sheets B2B buyers actually need.
        </h2>
        <p className="mt-4 max-w-xl text-sm leading-7 text-slate-500">
          Moisture content, ash value, mesh size, and pungency — presented in clean, scannable format instead of dense paragraphs.
        </p>
      </div>

      {/* Category filters */}
      <div className="mb-8 flex flex-wrap gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => { setActiveCategory(cat); setExpandedProduct(null); }}
            className={`rounded-full border px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.2em] transition ${
              activeCategory === cat
                ? "border-saffron bg-[#0f172a] text-white"
                : "border-slate-200 bg-white text-slate-500 hover:border-saffron/30 hover:text-[#0f172a]"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Spec cards */}
      <div className="space-y-3">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="space-y-3"
          >
            {filtered.map((spec) => (
              <SpecCard
                key={spec.name}
                spec={spec}
                isExpanded={expandedProduct === spec.name}
                onToggle={() => setExpandedProduct(expandedProduct === spec.name ? null : spec.name)}
              />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      <p className="mt-6 text-xs text-slate-400">
        Specifications are indicative and can be customized per buyer and destination-country requirements. Third-party lab testing available on request.
      </p>
    </section>
  );
}

function SpecCard({ spec, isExpanded, onToggle }: { spec: ProductSpec; isExpanded: boolean; onToggle: () => void }) {
  return (
    <div className={`overflow-hidden rounded-2xl border transition ${isExpanded ? "border-saffron/30 shadow-card-light" : "border-slate-200"}`}>
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center justify-between gap-4 bg-white px-5 py-4 text-left transition hover:bg-slate-50 sm:px-6"
      >
        <div className="flex items-center gap-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#0f172a] text-xs font-bold text-saffron">
            {spec.name.split(" ").map((w) => w[0]).join("").slice(0, 2)}
          </div>
          <div>
            <p className="font-semibold text-[#0f172a]">{spec.name}</p>
            <p className="mt-0.5 text-xs text-slate-400">{spec.category}</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          {/* Quick stats visible even when collapsed */}
          <div className="hidden gap-6 sm:flex">
            <QuickStat icon={Droplets} label="Moisture" value={spec.moisture} />
            <QuickStat icon={Grid3X3} label="Mesh" value={spec.mesh} />
            <QuickStat icon={Clock} label="Shelf life" value={spec.shelfLife} />
          </div>
          <motion.div animate={{ rotate: isExpanded ? 180 : 0 }} transition={{ duration: 0.2 }}>
            <ChevronDown className="h-5 w-5 text-slate-400" />
          </motion.div>
        </div>
      </button>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="border-t border-slate-100 bg-slate-50 px-5 py-5 sm:px-6">
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <DetailCell icon={Droplets} label="Moisture Content" value={spec.moisture} />
                <DetailCell icon={Flame} label="Ash Value" value={spec.ash} />
                <DetailCell icon={Grid3X3} label="Mesh / Particle Size" value={spec.mesh} />
                <DetailCell icon={Clock} label="Shelf Life" value={spec.shelfLife} />
                <DetailCell icon={Palette} label="Visual Color" value={spec.color} />
                {spec.shu && <DetailCell icon={Flame} label="Pungency (SHU)" value={spec.shu} />}
                {spec.curcumin && <DetailCell icon={Flame} label="Curcumin Content" value={spec.curcumin} />}
              </div>
              <div className="mt-4 rounded-xl border border-slate-200 bg-white p-4">
                <div className="flex items-center gap-2">
                  <Package className="h-4 w-4 text-saffron" />
                  <p className="text-xs uppercase tracking-[0.2em] text-saffron">Packaging Options</p>
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {spec.packaging.map((pkg) => (
                    <span key={pkg} className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs text-slate-600">
                      {pkg}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function QuickStat({ icon: Icon, label, value }: { icon: React.ComponentType<{ className?: string }>; label: string; value: string }) {
  return (
    <div className="text-right">
      <p className="text-[10px] uppercase tracking-wider text-slate-400">{label}</p>
      <p className="mt-0.5 text-xs font-semibold text-[#0f172a]">{value}</p>
    </div>
  );
}

function DetailCell({ icon: Icon, label, value }: { icon: React.ComponentType<{ className?: string }>; label: string; value: string }) {
  return (
    <div className="flex items-start gap-3 rounded-xl border border-slate-200 bg-white p-4">
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-saffron/10 text-saffron">
        <Icon className="h-4 w-4" />
      </div>
      <div>
        <p className="text-[10px] uppercase tracking-wider text-slate-400">{label}</p>
        <p className="mt-1 text-sm font-semibold text-[#0f172a]">{value}</p>
      </div>
    </div>
  );
}
