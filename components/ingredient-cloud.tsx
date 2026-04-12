"use client";

import { useState, type MouseEvent } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
const heroPowders = "/images/hero/hero-spice-bowls.png";
const portfolioHighlight = "/images/sections/farm-sourcing.png";
const ingredientHighlights = "/images/sections/lab-quality-control.png";

const ingredientNodes = [
  { label: "Jamun powder", top: "7%", left: "59%" },
  { label: "Turmeric origin", top: "53%", left: "-1%" },
  { label: "Beetroot colour", top: "76%", left: "53%" },
  { label: "Botanical supply", top: "24%", left: "3%" }
] as const;

export default function IngredientCloud() {
  const [pointer, setPointer] = useState({ x: 0, y: 0 });
  const [isInteractive, setIsInteractive] = useState(false);

  const handlePointerMove = (event: MouseEvent<HTMLDivElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - bounds.left) / bounds.width - 0.5) * 2;
    const y = ((event.clientY - bounds.top) / bounds.height - 0.5) * 2;

    setPointer({ x, y });
    setIsInteractive(true);
  };

  const resetPointer = () => {
    setPointer({ x: 0, y: 0 });
    setIsInteractive(false);
  };

  return (
    <div
      className="relative h-[32rem] overflow-hidden rounded-[2.6rem] border border-slate-200 bg-[linear-gradient(180deg,#f8fafc_0%,#e2e8f0_100%)] p-4 shadow-card-light"
      onMouseMove={handlePointerMove}
      onMouseLeave={resetPointer}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(245,166,35,0.15),transparent_22%),radial-gradient(circle_at_14%_84%,rgba(34,135,58,0.10),transparent_22%)]" />
      <motion.div
        animate={{
          x: pointer.x * 26,
          y: pointer.y * 20,
          opacity: isInteractive ? 0.95 : 0.5
        }}
        transition={{ type: "spring", stiffness: 120, damping: 20 }}
        className="pointer-events-none absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(245,166,35,0.15),rgba(245,166,35,0.01)_68%)] blur-3xl"
      />
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, x: pointer.x * 18, y: pointer.y * 14, rotate: pointer.x * 2.2 }}
        transition={{ duration: 0.75, ease: "easeOut", type: "spring", stiffness: 100, damping: 18 }}
        className="absolute inset-x-4 top-4 h-[62%] overflow-hidden rounded-[2.2rem] border border-slate-300"
      >
        <Image
          src={heroPowders}
          alt="Bowls of Indian ingredient powders"
          fill
          sizes="(min-width: 1024px) 40vw, 100vw"
          className="object-cover"
          style={{ objectPosition: "center 40%" }}
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,32,24,0.12),rgba(10,32,24,0.72))]" />
        <div className="absolute inset-x-0 bottom-0 p-6 sm:p-7">
          <div className="inline-flex rounded-full border border-saffron/35 bg-saffron/12 px-3 py-2 text-[11px] uppercase tracking-[0.3em] text-saffron">
            Powder portfolio
          </div>
          <h3 className="mt-4 max-w-sm font-serif text-4xl leading-tight text-white">A warmer, product-led first impression.</h3>
          <p className="mt-3 max-w-md text-sm leading-7 text-white/80">
            Real ingredients, not abstract planets — the visual language now starts with the powders buyers actually remember.
          </p>
        </div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, x: 18 }}
        animate={{ opacity: 1, x: pointer.x * -14, y: pointer.y * -10, rotate: pointer.x * -1.4 }}
        transition={{ duration: 0.7, delay: 0.1, ease: "easeOut", type: "spring", stiffness: 100, damping: 18 }}
        className="absolute right-4 top-6 w-[42%] overflow-hidden rounded-[1.9rem] border border-slate-300 bg-white shadow-card-light"
      >
        <div className="relative h-40">
          <Image
            src={ingredientHighlights}
            alt="Highlighted ingredient powders"
            fill
            sizes="(min-width: 1024px) 18vw, 40vw"
            className="object-cover"
            style={{ objectPosition: "center 50%" }}
          />
        </div>
        <div className="p-4">
          <p className="text-[11px] uppercase tracking-[0.28em] text-saffron">Key ingredients</p>
          <p className="mt-2 font-serif text-2xl text-ink">Jamun, turmeric, beetroot and dehydrated lines.</p>
        </div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, x: pointer.x * -10, y: pointer.y * 12, rotate: pointer.x * 1.6 }}
        transition={{ duration: 0.75, delay: 0.16, ease: "easeOut", type: "spring", stiffness: 100, damping: 18 }}
        className="absolute bottom-4 left-4 w-[48%] overflow-hidden rounded-[1.9rem] border border-slate-300 bg-white shadow-card-light"
      >
        <div className="relative h-36">
          <Image
            src={portfolioHighlight}
            alt="Portfolio of export-grade ingredients"
            fill
            sizes="(min-width: 1024px) 20vw, 48vw"
            className="object-cover"
            style={{ objectPosition: "center 50%" }}
          />
        </div>
        <div className="p-4">
          <p className="text-[11px] uppercase tracking-[0.28em] text-saffron">Commercial breadth</p>
          <p className="mt-2 text-sm leading-6 text-[#1e293b]">Fruit, botanical, dehydrated and spice categories arranged with more food-category clarity.</p>
        </div>
      </motion.div>
      {ingredientNodes.map((node, index) => (
        <motion.div
          key={node.label}
          className="absolute rounded-full border border-slate-200 bg-white px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-600 shadow-[0_10px_30px_rgba(25,48,36,0.12)]"
          style={{ top: node.top, left: node.left }}
          animate={{ y: [pointer.y * (index % 2 === 0 ? -5 : 5), -8 + pointer.y * 4, pointer.y * (index % 2 === 0 ? -5 : 5)] }}
          transition={{ duration: 3.8 + index * 0.45, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        >
          <span>{node.label}</span>
        </motion.div>
      ))}
    </div>
  );
}
