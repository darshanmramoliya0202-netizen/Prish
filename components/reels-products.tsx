"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronUp, ChevronDown, Droplets, Grid3X3, Clock, Flame } from "lucide-react";
const reelsProducts = [
  {
    name: "Turmeric Powder",
    tagline: "100% Sun-Dried · ASTA Grade",
    specs: ["Curcumin 2–5%", "60–100 mesh", "≤ 10% moisture"],
    image: "/images/products/turmeric-product.png",
    objectPosition: "center 30%",
    color: "from-amber-500 to-yellow-600",
    badge: "Best Seller"
  },
  {
    name: "Red Chili Powder",
    tagline: "Gujarat Origin · Bold Heat",
    specs: ["15,000–50,000 SHU", "40–80 mesh", "Bright red"],
    image: "/images/products/red-chilli-powder.png",
    objectPosition: "center 40%",
    color: "from-red-500 to-rose-600",
    badge: "High Demand"
  },
  {
    name: "Jamun Powder",
    tagline: "Botanical Grade · Deep Purple",
    specs: ["≤ 8% moisture", "60–100 mesh", "12–18 mo shelf life"],
    image: "/images/products/jamun-powder.png",
    objectPosition: "center 35%",
    color: "from-purple-500 to-violet-600",
    badge: "Premium"
  },
  {
    name: "Beetroot Powder",
    tagline: "Natural Color · Clean Label",
    specs: ["≤ 7% moisture", "80–100 mesh", "Deep crimson-red"],
    image: "/images/products/beetroot-powder.png",
    objectPosition: "center 35%",
    color: "from-rose-500 to-pink-600",
    badge: "Trending"
  },
  {
    name: "Sea Buckthorn Powder",
    tagline: "Himalayan Origin · Vitamin C Rich",
    specs: ["≤ 8% moisture", "60–100 mesh", "Bright orange"],
    image: "/images/products/sea-buckthorn-powder.png",
    objectPosition: "center 30%",
    color: "from-orange-500 to-amber-600",
    badge: "Specialty"
  }
];

const specIcons = [Flame, Grid3X3, Droplets, Clock];

export default function ReelsProducts() {
  const [activeIndex, setActiveIndex] = useState(0);
  const product = reelsProducts[activeIndex];

  const goUp = () => setActiveIndex((i) => (i - 1 + reelsProducts.length) % reelsProducts.length);
  const goDown = () => setActiveIndex((i) => (i + 1) % reelsProducts.length);

  return (
    <section className="relative overflow-hidden bg-leaf-dark py-16 sm:py-24">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_80%,rgba(232,160,32,0.08),transparent_50%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(26,51,24,0.92),rgba(44,26,14,0.88))]" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        <div className="mb-12">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-saffron to-rose-500 p-[2px]">
              <div className="flex h-full w-full items-center justify-center rounded-[6px] bg-leaf-dark">
                <span className="text-xs font-bold text-white">P</span>
              </div>
            </div>
            <p className="text-xs font-semibold uppercase tracking-[0.5em] text-gold-warm">Product Spotlight</p>
          </div>
          <h2 className="mt-4 max-w-xl font-sans text-3xl font-bold text-white sm:text-4xl">
            Swipe through specs. {" "}
            <span className="text-white/40">
              Not paragraphs.
            </span>
          </h2>
        </div>

        <div className="grid items-center gap-8 lg:grid-cols-[auto_1fr]">
          {/* Reels-style vertical card */}
          <div className="relative mx-auto w-full max-w-xs">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, y: 80 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -80 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="relative aspect-[9/16] overflow-hidden rounded-3xl border border-white/10 shadow-card-dark"
              >
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  sizes="(min-width: 1024px) 20vw, 70vw"
                  className="object-cover"
                  style={{ objectPosition: product.objectPosition }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-soil via-soil/20 to-transparent" />

                {/* Badge */}
                <div className="absolute left-4 top-4">
                  <span className={`rounded-full bg-gradient-to-r ${product.color} px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white`}>
                    {product.badge}
                  </span>
                </div>

                {/* Specs overlay - bottom */}
                <div className="absolute inset-x-0 bottom-0 p-5">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <h3 className="font-sans text-2xl font-bold text-white">{product.name}</h3>
                    <p className="mt-1 text-xs uppercase tracking-wider text-gold-warm/80">{product.tagline}</p>

                    <div className="mt-4 space-y-2">
                      {product.specs.map((spec, i) => {
                        const Icon = specIcons[i % specIcons.length];
                        return (
                          <motion.div
                            key={spec}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3 + i * 0.1 }}
                            className="flex items-center gap-2 rounded-lg bg-white/10 px-3 py-2 backdrop-blur-sm"
                          >
                            <Icon className="h-3.5 w-3.5 text-saffron" />
                            <span className="text-xs font-medium text-white">{spec}</span>
                          </motion.div>
                        );
                      })}
                    </div>
                  </motion.div>
                </div>

                {/* Scroll indicator */}
                <div className="absolute right-4 top-1/2 flex -translate-y-1/2 flex-col items-center gap-3">
                  <button type="button" onClick={goUp} className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition duration-300 hover:bg-white/20">
                    <ChevronUp className="h-4 w-4" />
                  </button>
                  <div className="flex flex-col gap-1.5">
                    {reelsProducts.map((_, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => setActiveIndex(i)}
                        className={`h-1.5 w-1.5 rounded-full transition-all ${
                          i === activeIndex ? "h-5 bg-saffron" : "bg-white/30"
                        }`}
                      />
                    ))}
                  </div>
                  <button type="button" onClick={goDown} className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition duration-300 hover:bg-white/20">
                    <ChevronDown className="h-4 w-4" />
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Product grid selector */}
          <div className="grid gap-3 sm:grid-cols-2">
            {reelsProducts.map((p, i) => (
              <motion.button
                key={p.name}
                type="button"
                onClick={() => setActiveIndex(i)}
                whileHover={{ scale: 1.02 }}
                className={`group flex items-center gap-4 rounded-2xl border p-4 text-left transition duration-300 ${
                  i === activeIndex
                    ? "border-gold-warm/40 bg-white/10"
                    : "border-parchment/10 bg-white/[0.03] hover:border-gold-warm/20 hover:bg-white/[0.06]"
                }`}
              >
                <div className={`relative h-20 w-20 shrink-0 overflow-hidden rounded-xl ring-2 transition-all ${i === activeIndex ? "ring-saffron" : "ring-transparent"}`}>
                  <Image src={p.image} alt={p.name} fill sizes="80px" className="object-cover object-center" />
                </div>
                <div>
                  <p className={`font-semibold transition ${i === activeIndex ? "text-white" : "text-slate-300"}`}>
                    {p.name}
                  </p>
                  <p className={`mt-0.5 text-xs transition ${i === activeIndex ? "text-gold-warm" : "text-wheat/60"}`}>
                    {p.tagline}
                  </p>
                  <div className="mt-2 flex gap-1.5">
                    {p.specs.slice(0, 2).map((s) => (
                      <span key={s} className="rounded bg-white/10 px-2 py-0.5 text-[10px] text-white/60">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
