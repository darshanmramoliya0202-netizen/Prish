"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus, Trash2, Send, Package, FlaskConical } from "lucide-react";
import { productSpecs } from "@/data/specs";

type SampleItem = {
  name: string;
  grade: string;
  quantity: string;
};

const gradeOptions = ["Standard", "Premium", "Organic (if available)"];
const quantityOptions = ["100g", "250g", "500g", "1 kg"];

export default function SampleBuilder() {
  const [kit, setKit] = useState<SampleItem[]>([]);
  const [showBuilder, setShowBuilder] = useState(false);
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [country, setCountry] = useState("");
  const [notes, setNotes] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function addProduct(productName: string) {
    if (kit.length >= 6) return;
    if (kit.some((item) => item.name === productName)) return;
    setKit([...kit, { name: productName, grade: gradeOptions[0], quantity: quantityOptions[1] }]);
  }

  function removeProduct(index: number) {
    setKit(kit.filter((_, i) => i !== index));
  }

  function updateItem(index: number, field: keyof SampleItem, value: string) {
    setKit(kit.map((item, i) => (i === index ? { ...item, [field]: value } : item)));
  }

  function handleSubmit() {
    if (!name || !email || !company || kit.length === 0) return;
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <section className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mx-auto max-w-xl rounded-2xl border border-gold-warm/30 bg-white/85 p-8 text-center shadow-card-light"
        >
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gold-warm/10">
            <Send className="h-7 w-7 text-gold-warm" />
          </div>
          <h3 className="mt-5 font-serif text-3xl text-ink">Sample kit request received</h3>
          <p className="mt-3 text-sm leading-7 text-ink-soft">
            Your custom {kit.length}-product sample kit request has been logged. Our team will review specifications and reach out within 24–48 hours with availability and shipping details.
          </p>
          <button
            type="button"
            onClick={() => { setSubmitted(false); setKit([]); setName(""); setCompany(""); setEmail(""); setCountry(""); setNotes(""); }}
            className="mt-6 inline-flex items-center gap-2 rounded-full border border-wheat/30 px-6 py-2.5 text-sm font-semibold text-ink transition hover:border-gold-warm hover:text-gold-warm"
          >
            Build another kit
          </button>
        </motion.div>
      </section>
    );
  }

  return (
    <section className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-10">
      <div className="mb-12">
        <p className="text-xs font-semibold uppercase tracking-[0.4em] text-gold-warm">Smart Sampling</p>
        <h2 className="mt-4 max-w-2xl font-serif text-3xl text-ink sm:text-4xl lg:text-5xl">
          Build a custom sample kit — tailored to your formulation needs.
        </h2>
        <p className="mt-4 max-w-xl text-base leading-7 text-ink-soft">
          Select up to 6 products, choose grades and quantities, and submit a personalized sample request. No generic forms — just the ingredients you need to evaluate.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        {/* Product picker */}
        <div className="rounded-2xl border border-wheat/25 bg-white/80 p-5 shadow-card-light sm:p-6">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <FlaskConical className="h-5 w-5 text-saffron" />
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-saffron">Select products</p>
            </div>
            <p className="text-xs text-ink-soft">{kit.length}/6 selected</p>
          </div>
          <div className="mt-4 grid gap-2 sm:grid-cols-2">
            {productSpecs.map((spec) => {
              const inKit = kit.some((item) => item.name === spec.name);
              return (
                <button
                  key={spec.name}
                  type="button"
                  onClick={() => inKit ? undefined : addProduct(spec.name)}
                  disabled={inKit || kit.length >= 6}
                  className={`flex items-center gap-3 rounded-xl border px-4 py-3 text-left text-sm transition duration-300 ${
                    inKit
                      ? "border-gold-warm/30 bg-gold-warm/5 text-gold-warm"
                      : kit.length >= 6
                      ? "cursor-not-allowed border-wheat/15 bg-parchment/20 text-wheat/50"
                      : "border-wheat/25 bg-white/85 text-ink hover:border-gold-warm/30 hover:bg-parchment/35"
                  }`}
                >
                  <div className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-xs ${
                    inKit ? "bg-gold-warm text-white" : "bg-parchment text-ink-soft"
                  }`}>
                    {inKit ? <Minus className="h-3.5 w-3.5" /> : <Plus className="h-3.5 w-3.5" />}
                  </div>
                  <div>
                    <p className="font-medium">{spec.name}</p>
                    <p className="text-[10px] text-ink-soft">{spec.category}</p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Kit builder + form */}
        <div className="space-y-4">
          {/* Selected items */}
          <div className="rounded-2xl border border-wheat/25 bg-white/80 p-5 shadow-card-light sm:p-6">
            <div className="flex items-center gap-3">
              <Package className="h-5 w-5 text-saffron" />
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-saffron">Your sample kit</p>
            </div>

            {kit.length === 0 ? (
              <p className="mt-4 text-center text-sm text-ink-soft">Select products from the left to build your kit</p>
            ) : (
              <div className="mt-4 space-y-3">
                <AnimatePresence>
                  {kit.map((item, index) => (
                    <motion.div
                      key={item.name}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="flex items-center gap-3 rounded-xl border border-wheat/20 bg-parchment/30 p-3"
                    >
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-ink">{item.name}</p>
                        <div className="mt-2 flex gap-2">
                          <select
                            value={item.grade}
                            onChange={(e) => updateItem(index, "grade", e.target.value)}
                            className="h-8 rounded-lg border border-wheat/20 bg-white px-2 text-xs text-ink outline-none focus:border-gold-warm"
                          >
                            {gradeOptions.map((g) => <option key={g} value={g}>{g}</option>)}
                          </select>
                          <select
                            value={item.quantity}
                            onChange={(e) => updateItem(index, "quantity", e.target.value)}
                            className="h-8 rounded-lg border border-wheat/20 bg-white px-2 text-xs text-ink outline-none focus:border-gold-warm"
                          >
                            {quantityOptions.map((q) => <option key={q} value={q}>{q}</option>)}
                          </select>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeProduct(index)}
                        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-wheat transition duration-300 hover:bg-red-50 hover:text-red-500"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            )}
          </div>

          {/* Contact details */}
          {kit.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-2xl border border-wheat/25 bg-white/80 p-5 shadow-card-light sm:p-6"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gold-warm">Your details</p>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Full name"
                  className="h-10 rounded-xl border border-wheat/25 bg-parchment/35 px-4 text-sm text-ink outline-none placeholder:text-ink-soft focus:border-gold-warm focus:ring-1 focus:ring-gold-warm/15"
                />
                <input
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  placeholder="Company"
                  className="h-10 rounded-xl border border-wheat/25 bg-parchment/35 px-4 text-sm text-ink outline-none placeholder:text-ink-soft focus:border-gold-warm focus:ring-1 focus:ring-gold-warm/15"
                />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                  className="h-10 rounded-xl border border-wheat/25 bg-parchment/35 px-4 text-sm text-ink outline-none placeholder:text-ink-soft focus:border-gold-warm focus:ring-1 focus:ring-gold-warm/15"
                />
                <input
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  placeholder="Country"
                  className="h-10 rounded-xl border border-wheat/25 bg-parchment/35 px-4 text-sm text-ink outline-none placeholder:text-ink-soft focus:border-gold-warm focus:ring-1 focus:ring-gold-warm/15"
                />
              </div>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Additional notes (optional)"
                rows={3}
                className="mt-3 w-full rounded-xl border border-wheat/25 bg-parchment/35 px-4 py-3 text-sm text-ink outline-none placeholder:text-ink-soft focus:border-gold-warm focus:ring-1 focus:ring-gold-warm/15"
              />
              <button
                type="button"
                onClick={handleSubmit}
                disabled={!name || !email || !company}
                className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full bg-leaf-dark px-6 py-3 text-sm font-semibold text-parchment transition duration-300 hover:bg-soil hover:shadow-[0_8px_24px_rgba(44,26,14,0.18)] disabled:cursor-not-allowed disabled:opacity-50"
              >
                <Send className="h-4 w-4" />
                Submit sample kit request ({kit.length} product{kit.length !== 1 ? "s" : ""})
              </button>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
