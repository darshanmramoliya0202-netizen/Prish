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
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
        <div className="border-b border-slate-100 px-5 py-4 sm:px-8 sm:py-5">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.4em] text-saffron">Personalized experience</p>
              <h2 className="mt-2 font-sans text-2xl font-bold text-[#0f172a] sm:text-3xl">What best describes your business?</h2>
            </div>
            <button
              type="button"
              onClick={() => setDismissed(true)}
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
          <p className="mt-2 max-w-lg text-sm text-slate-600">
            Select your role to see tailored MOQs, packaging options, and relevant product categories.
          </p>
        </div>

        <div className="grid gap-0 divide-y divide-slate-100 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          {roles.map((role) => {
            const Icon = role.icon;
            const isActive = selectedRole === role.id;
            return (
              <button
                key={role.id}
                type="button"
                onClick={() => setSelectedRole(isActive ? null : role.id)}
                className={`group relative px-5 py-6 text-left transition sm:px-6 ${
                  isActive ? "bg-[#0f172a]" : "bg-white hover:bg-slate-50"
                }`}
              >
                <div className={`flex h-11 w-11 items-center justify-center rounded-xl transition ${
                  isActive ? "bg-saffron text-[#0f172a]" : "bg-slate-100 text-slate-500 group-hover:bg-saffron/10 group-hover:text-saffron"
                }`}>
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className={`mt-4 text-lg font-semibold transition ${isActive ? "text-white" : "text-[#0f172a]"}`}>
                  {role.title}
                </h3>
                <p className={`mt-1 text-xs transition ${isActive ? "text-saffron" : "text-slate-500"}`}>
                  {role.subtitle}
                </p>
                {isActive && (
                  <motion.div
                    layoutId="role-indicator"
                    className="absolute inset-x-0 bottom-0 h-0.5 bg-saffron"
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
              <div className="border-t border-slate-100 bg-slate-50 px-5 py-6 sm:px-8">
                <div className="grid gap-6 sm:grid-cols-[1.2fr_0.8fr]">
                  <div>
                    <p className="text-sm leading-7 text-slate-600">{activeRole.focus}</p>
                    <div className="mt-4 grid gap-3 sm:grid-cols-2">
                      <div className="rounded-xl border border-slate-200 bg-white p-4">
                        <p className="text-[10px] uppercase tracking-wider text-saffron">Minimum order</p>
                        <p className="mt-1 text-sm font-semibold text-[#0f172a]">{activeRole.moq}</p>
                      </div>
                      <div className="rounded-xl border border-slate-200 bg-white p-4">
                        <p className="text-[10px] uppercase tracking-wider text-saffron">Packaging</p>
                        <p className="mt-1 text-sm font-semibold text-[#0f172a]">{activeRole.packaging}</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col justify-center gap-3">
                    <Link
                      href="/products"
                      className="inline-flex items-center justify-center gap-2 rounded-full bg-[#0f172a] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#1e293b]"
                    >
                      {activeRole.cta}
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                    <Link
                      href="/inquiry"
                      className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-300 px-6 py-3 text-sm font-semibold text-[#0f172a] transition hover:border-saffron hover:text-saffron"
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
