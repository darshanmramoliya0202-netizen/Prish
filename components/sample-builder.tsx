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
          className="mx-auto max-w-xl rounded-2xl border border-saffron/30 bg-white p-8 text-center shadow-card-light"
        >
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-saffron/10">
            <Send className="h-7 w-7 text-saffron" />
          </div>
          <h3 className="mt-5 font-serif text-3xl text-[#0f172a]">Sample kit request received</h3>
          <p className="mt-3 text-sm leading-7 text-slate-500">
            Your custom {kit.length}-product sample kit request has been logged. Our team will review specifications and reach out within 24–48 hours with availability and shipping details.
          </p>
          <button
            type="button"
            onClick={() => { setSubmitted(false); setKit([]); setName(""); setCompany(""); setEmail(""); setCountry(""); setNotes(""); }}
            className="mt-6 inline-flex items-center gap-2 rounded-full border border-slate-300 px-6 py-2.5 text-sm font-semibold text-[#0f172a] transition hover:border-saffron hover:text-saffron"
          >
            Build another kit
          </button>
        </motion.div>
      </section>
    );
  }

  return (
    <section className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-10">
      <div className="mb-10">
        <p className="text-xs font-semibold uppercase tracking-[0.4em] text-saffron">Smart Sampling</p>
        <h2 className="mt-4 max-w-2xl font-serif text-3xl text-[#0f172a] sm:text-4xl lg:text-5xl">
          Build a custom sample kit — tailored to your formulation needs.
        </h2>
        <p className="mt-4 max-w-xl text-base leading-7 text-slate-600">
          Select up to 6 products, choose grades and quantities, and submit a personalized sample request. No generic forms — just the ingredients you need to evaluate.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        {/* Product picker */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <FlaskConical className="h-5 w-5 text-saffron" />
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-saffron">Select products</p>
            </div>
            <p className="text-xs text-slate-500">{kit.length}/6 selected</p>
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
                  className={`flex items-center gap-3 rounded-xl border px-4 py-3 text-left text-sm transition ${
                    inKit
                      ? "border-saffron/30 bg-saffron/5 text-saffron"
                      : kit.length >= 6
                      ? "cursor-not-allowed border-slate-100 bg-slate-50 text-slate-300"
                      : "border-slate-200 bg-white text-[#0f172a] hover:border-saffron/30 hover:bg-saffron/5"
                  }`}
                >
                  <div className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-xs ${
                    inKit ? "bg-saffron text-white" : "bg-slate-100 text-slate-400"
                  }`}>
                    {inKit ? <Minus className="h-3.5 w-3.5" /> : <Plus className="h-3.5 w-3.5" />}
                  </div>
                  <div>
                    <p className="font-medium">{spec.name}</p>
                    <p className="text-[10px] text-slate-500">{spec.category}</p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Kit builder + form */}
        <div className="space-y-4">
          {/* Selected items */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
            <div className="flex items-center gap-3">
              <Package className="h-5 w-5 text-saffron" />
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-saffron">Your sample kit</p>
            </div>

            {kit.length === 0 ? (
              <p className="mt-4 text-center text-sm text-slate-500">Select products from the left to build your kit</p>
            ) : (
              <div className="mt-4 space-y-3">
                <AnimatePresence>
                  {kit.map((item, index) => (
                    <motion.div
                      key={item.name}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 p-3"
                    >
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-[#0f172a]">{item.name}</p>
                        <div className="mt-2 flex gap-2">
                          <select
                            value={item.grade}
                            onChange={(e) => updateItem(index, "grade", e.target.value)}
                            className="h-8 rounded-lg border border-slate-200 bg-white px-2 text-xs text-[#0f172a] outline-none focus:border-saffron"
                          >
                            {gradeOptions.map((g) => <option key={g} value={g}>{g}</option>)}
                          </select>
                          <select
                            value={item.quantity}
                            onChange={(e) => updateItem(index, "quantity", e.target.value)}
                            className="h-8 rounded-lg border border-slate-200 bg-white px-2 text-xs text-[#0f172a] outline-none focus:border-saffron"
                          >
                            {quantityOptions.map((q) => <option key={q} value={q}>{q}</option>)}
                          </select>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeProduct(index)}
                        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-slate-400 transition hover:bg-red-50 hover:text-red-500"
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
              className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-saffron">Your details</p>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Full name"
                  className="h-10 rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm text-[#0f172a] outline-none placeholder:text-slate-400 focus:border-saffron focus:ring-1 focus:ring-saffron/20"
                />
                <input
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  placeholder="Company"
                  className="h-10 rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm text-[#0f172a] outline-none placeholder:text-slate-400 focus:border-saffron focus:ring-1 focus:ring-saffron/20"
                />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                  className="h-10 rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm text-[#0f172a] outline-none placeholder:text-slate-400 focus:border-saffron focus:ring-1 focus:ring-saffron/20"
                />
                <input
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  placeholder="Country"
                  className="h-10 rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm text-[#0f172a] outline-none placeholder:text-slate-400 focus:border-saffron focus:ring-1 focus:ring-saffron/20"
                />
              </div>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Additional notes (optional)"
                rows={3}
                className="mt-3 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-[#0f172a] outline-none placeholder:text-slate-400 focus:border-saffron focus:ring-1 focus:ring-saffron/20"
              />
              <button
                type="button"
                onClick={handleSubmit}
                disabled={!name || !email || !company}
                className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full bg-saffron px-6 py-3 text-sm font-semibold text-[#0f172a] transition hover:bg-[#fbbf24] hover:shadow-[0_8px_24px_rgba(245,158,11,0.25)] disabled:cursor-not-allowed disabled:opacity-50"
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
