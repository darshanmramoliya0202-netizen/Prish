"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import SiteShell from "@/components/site-shell";
import PageHero from "@/components/page-hero";
import FlipCard from "@/components/flip-card";
import DarkStrip from "@/components/dark-strip";
import BrandButton from "@/components/brand-button";
import { ArrowUpRight } from "lucide-react";
import { products, productCategoryLabels } from "@/data/products";
import type { ProductCategory } from "@/data/products";

type FilterKey = "all" | ProductCategory;

const filterKeys: FilterKey[] = ["all", "spices", "powders", "rice"];

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.07 },
  },
};

const item = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } },
};

export default function ProductsPage() {
  const [activeFilter, setActiveFilter] = useState<FilterKey>("all");

  const filtered =
    activeFilter === "all" ? products : products.filter((p) => p.category === activeFilter);

  return (
    <SiteShell>
      {/* ── 1. HERO ── */}
      <PageHero
        variant="plain"
        eyebrow="Our Products"
        title="Ingredients the world trusts"
        subtitle="Export-grade spices, powders, and grains — sourced from Gujarat and Rajasthan, shipped to 15+ countries."
      >
        <div className="flex flex-wrap gap-3">
          <BrandButton variant="secondary" href="/inquiry">
            Request samples <ArrowUpRight className="h-4 w-4" />
          </BrandButton>
          <BrandButton variant="outline" href="/quality">
            Our quality process
          </BrandButton>
        </div>
      </PageHero>

      {/* ── 2. FILTER TABS ── */}
      <section className="border-b border-wheat/25 bg-cream/80 py-4 backdrop-blur-sm">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-2 px-4 sm:px-6 lg:px-10">
          {filterKeys.map((key) => (
            <button
              key={key}
              type="button"
              onClick={() => setActiveFilter(key)}
              className={`rounded-full px-5 py-2 text-sm font-semibold transition-all duration-300 ${
                activeFilter === key
                  ? "bg-leaf-dark text-parchment shadow-[0_4px_16px_rgba(26,46,26,0.18)]"
                  : "border border-leaf-dark/30 text-ink hover:bg-cream"
              }`}
            >
              {productCategoryLabels[key]}
            </button>
          ))}
        </div>
      </section>

      {/* ── 3. FLIP CARD GRID ── */}
      <section className="bg-cream py-12 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
          <motion.div
            key={activeFilter}
            variants={container}
            initial="hidden"
            animate="show"
            className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
          >
            {filtered.map((product) => (
              <motion.div key={product.id} variants={item}>
                <FlipCard
                  id={product.id}
                  name={product.name}
                  category={product.categoryLabel}
                  image={product.image}
                  origin={product.origin}
                  moq={product.moq}
                  grade={product.grade}
                  certifications={product.certifications}
                  accentColor={product.accentColor}
                  specs={product.specs}
                />
              </motion.div>
            ))}
          </motion.div>

          {filtered.length === 0 && (
            <p className="py-20 text-center text-sm text-ink-soft">
              No products found in this category.
            </p>
          )}
        </div>
      </section>

      {/* ── 4. DARK STRIP CTA ── */}
      <DarkStrip variant="cta">
        <p className="text-xs font-semibold uppercase tracking-[0.4em] text-saffron">
          Ready to order?
        </p>
        <h2 className="mt-4 font-serif text-3xl text-parchment sm:text-4xl">
          Ready to place an order?
        </h2>
        <p className="mt-4 max-w-lg text-base leading-7 text-parchment/70">
          Request samples with no minimum order. We respond within 24 hours.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <BrandButton variant="primary" href="/inquiry">
            Request samples <ArrowUpRight className="h-4 w-4" />
          </BrandButton>
          <BrandButton
            variant="outline"
            href="https://wa.me/919586616746"
            target="_blank"
            rel="noopener noreferrer"
            className="border-parchment/30 text-parchment hover:bg-parchment/10 hover:text-parchment"
          >
            WhatsApp us
          </BrandButton>
        </div>
      </DarkStrip>

      {/* ── 5. APPLICATION SECTORS (light) ── */}
      <section className="bg-cream py-12 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
          <div className="mb-10">
            <p className="text-xs font-semibold uppercase tracking-[0.4em] text-saffron">
              Applications
            </p>
            <h2 className="mt-4 font-serif text-3xl text-ink sm:text-4xl">
              Who buys from us
            </h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { sector: "Food & Beverage", desc: "Natural color, flavor layering, and supply consistency." },
              { sector: "Nutraceutical", desc: "Active-rich botanicals with traceable origin." },
              { sector: "Pharmaceutical", desc: "Specification-sensitive programs with documentation discipline." },
              { sector: "Functional Foods", desc: "Ingredients that carry formulation value." },
              { sector: "Wellness & Cosmetic", desc: "Botanical ingredients with origin story and active appeal." },
              { sector: "Bulk Trade", desc: "Container-scale rice and spice programs for distributors." },
            ].map((a) => (
              <div
                key={a.sector}
                className="rounded-2xl border border-wheat/25 bg-white/80 p-6 shadow-card-light transition-all duration-300 hover:-translate-y-1 hover:border-saffron/30 hover:shadow-paper"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-saffron">
                  {a.sector}
                </p>
                <p className="mt-3 text-sm leading-7 text-ink-soft">{a.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
