"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Store, Factory, Warehouse, ArrowRight, X } from "lucide-react";
import Link from "next/link";

const roles = [
  {
    id: "distributor",
    title: "Retail Distributor",
    subtitle: "Packaged goods & retail supply chains",
    icon: Store,
    moq: "500 kg – 5 MT per SKU",
    packaging: "Retail-ready packs, private label options",
    focus: "Brand-ready packaging, consistent supply, competitive pricing, and shelf-life optimization for retail channels.",
    cta: "View retail-ready catalog"
  },
  {
    id: "manufacturer",
    title: "Food Manufacturer",
    subtitle: "Formulation & industrial ingredients",
    icon: Factory,
    moq: "2 MT – 20 MT per order",
    packaging: "Bulk HDPE, fiber drums, custom specs",
    focus: "Specification-grade ingredients with batch consistency, third-party testing support, and formulation-level documentation.",
    cta: "View industrial specs"
  },
  {
    id: "wholesaler",
    title: "Wholesaler / Trader",
    subtitle: "Volume procurement & re-distribution",
    icon: Warehouse,
    moq: "10 MT+ / FCL shipments",
    packaging: "Bulk packaging, palletized containers",
    focus: "Competitive pricing on volume, reliable supply continuity, and streamlined export documentation for re-distribution markets.",
    cta: "View bulk pricing"
  }
] as const;

export default function RoleSelector() {
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  const activeRole = roles.find((r) => r.id === selectedRole);

  return (
    <section className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-10">
      <div className="overflow-hidden rounded-2xl border border-wheat/25 bg-white/80 shadow-card-light backdrop-blur-sm">
        <div className="border-b border-wheat/15 px-5 py-4 sm:px-8 sm:py-5">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.4em] text-gold-warm">Personalized experience</p>
              <h2 className="mt-2 font-serif text-2xl text-ink sm:text-3xl">What best describes your business?</h2>
            </div>
            <button
              type="button"
              onClick={() => setDismissed(true)}
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-wheat transition hover:bg-parchment/50 hover:text-earth"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
          <p className="mt-2 max-w-lg text-sm text-ink-soft">
            Select your role to see tailored MOQs, packaging options, and relevant product categories.
          </p>
        </div>

        <div className="grid gap-0 divide-y divide-wheat/15 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          {roles.map((role) => {
            const Icon = role.icon;
            const isActive = selectedRole === role.id;
            return (
              <button
                key={role.id}
                type="button"
                onClick={() => setSelectedRole(isActive ? null : role.id)}
                className={`group relative px-5 py-6 text-left transition sm:px-6 ${
                  isActive ? "bg-leaf-dark" : "bg-white/70 hover:bg-parchment/35"
                }`}
              >
                <div className={`flex h-11 w-11 items-center justify-center rounded-xl transition ${
                  isActive ? "bg-gold-warm text-leaf-dark" : "bg-parchment text-ink-soft group-hover:bg-gold-warm/10 group-hover:text-gold-warm"
                }`}>
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className={`mt-4 text-lg font-semibold transition ${isActive ? "text-parchment" : "text-ink"}`}>
                  {role.title}
                </h3>
                <p className={`mt-1 text-xs transition ${isActive ? "text-gold-warm" : "text-ink-soft"}`}>
                  {role.subtitle}
                </p>
                {isActive && (
                  <motion.div
                    layoutId="role-indicator"
                    className="absolute inset-x-0 bottom-0 h-0.5 bg-gold-warm"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </div>

        <AnimatePresence>
          {activeRole && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <div className="border-t border-wheat/15 bg-parchment/35 px-5 py-6 sm:px-8">
                <div className="grid gap-6 sm:grid-cols-[1.2fr_0.8fr]">
                  <div>
                    <p className="text-sm leading-7 text-ink-soft">{activeRole.focus}</p>
                    <div className="mt-4 grid gap-3 sm:grid-cols-2">
                      <div className="rounded-xl border border-wheat/20 bg-white/85 p-4">
                        <p className="text-[10px] uppercase tracking-wider text-gold-warm">Minimum order</p>
                        <p className="mt-1 text-sm font-semibold text-ink">{activeRole.moq}</p>
                      </div>
                      <div className="rounded-xl border border-wheat/20 bg-white/85 p-4">
                        <p className="text-[10px] uppercase tracking-wider text-gold-warm">Packaging</p>
                        <p className="mt-1 text-sm font-semibold text-ink">{activeRole.packaging}</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col justify-center gap-3">
                    <Link
                      href="/products"
                      className="inline-flex items-center justify-center gap-2 rounded-full bg-leaf-dark px-6 py-3 text-sm font-semibold text-parchment transition hover:bg-soil"
                    >
                      {activeRole.cta}
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                    <Link
                      href="/inquiry"
                      className="inline-flex items-center justify-center gap-2 rounded-full border border-wheat/30 px-6 py-3 text-sm font-semibold text-ink transition hover:border-gold-warm hover:text-gold-warm"
                    >
                      Request a sample
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
