"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import heroPowders from "@/brochure/Brochure Draft 4 edit lite_page-0001.jpg";
import portfolioHighlight from "@/brochure/Brochure Draft 4 edit lite_page-0005.jpg";
import ingredientHighlights from "@/brochure/Brochure Draft 4 edit lite_page-0006.jpg";

const ingredientNodes = [
  { label: "Jamun powder", top: "7%", left: "59%" },
  { label: "Turmeric origin", top: "53%", left: "-1%" },
  { label: "Beetroot colour", top: "76%", left: "53%" },
  { label: "Botanical supply", top: "24%", left: "3%" }
] as const;

export default function IngredientCloud() {
  return (
    <div className="relative h-[32rem] overflow-hidden rounded-[2.6rem] border border-[#dccfb7] bg-[linear-gradient(180deg,#f7efdf_0%,#ecdcb9_100%)] p-4 shadow-[0_28px_80px_rgba(8,24,18,0.18)]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(211,165,109,0.24),transparent_22%),radial-gradient(circle_at_14%_84%,rgba(28,123,99,0.16),transparent_22%)]" />
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.75, ease: "easeOut" }}
        className="absolute inset-x-4 top-4 h-[62%] overflow-hidden rounded-[2.2rem] border border-[#d7c8aa]"
      >
        <Image
          src={heroPowders}
          alt="Bowls of Indian ingredient powders"
          fill
          sizes="(min-width: 1024px) 40vw, 100vw"
          className="object-cover"
          style={{ objectPosition: "center 58%" }}
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,32,24,0.12),rgba(10,32,24,0.72))]" />
        <div className="absolute inset-x-0 bottom-0 p-6 sm:p-7">
          <div className="inline-flex rounded-full border border-[#f6e2bd]/35 bg-[#f6ead2]/12 px-3 py-2 text-[11px] uppercase tracking-[0.3em] text-[#f6d39d]">
            Powder portfolio
          </div>
          <h3 className="mt-4 max-w-sm font-serif text-4xl leading-tight text-[#fff8ef]">A warmer, product-led first impression.</h3>
          <p className="mt-3 max-w-md text-sm leading-7 text-[#f2ead8]/82">
            Real ingredients, not abstract planets — the visual language now starts with the powders buyers actually remember.
          </p>
        </div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, x: 18 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
        className="absolute right-4 top-6 w-[42%] overflow-hidden rounded-[1.9rem] border border-[#d7c8aa] bg-[#f7efdf] shadow-[0_24px_50px_rgba(21,49,36,0.14)]"
      >
        <div className="relative h-40">
          <Image
            src={ingredientHighlights}
            alt="Highlighted ingredient powders"
            fill
            sizes="(min-width: 1024px) 18vw, 40vw"
            className="object-cover"
            style={{ objectPosition: "center 66%" }}
          />
        </div>
        <div className="p-4">
          <p className="text-[11px] uppercase tracking-[0.28em] text-[#7d5c2c]">Key ingredients</p>
          <p className="mt-2 font-serif text-2xl text-[#173124]">Jamun, turmeric, beetroot and dehydrated lines.</p>
        </div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.75, delay: 0.16, ease: "easeOut" }}
        className="absolute bottom-4 left-4 w-[48%] overflow-hidden rounded-[1.9rem] border border-[#d7c8aa] bg-[#f7efdf] shadow-[0_24px_50px_rgba(21,49,36,0.14)]"
      >
        <div className="relative h-36">
          <Image
            src={portfolioHighlight}
            alt="Portfolio of export-grade ingredients"
            fill
            sizes="(min-width: 1024px) 20vw, 48vw"
            className="object-cover"
            style={{ objectPosition: "center 47%" }}
          />
        </div>
        <div className="p-4">
          <p className="text-[11px] uppercase tracking-[0.28em] text-[#7d5c2c]">Commercial breadth</p>
          <p className="mt-2 text-sm leading-6 text-[#294135]">Fruit, botanical, dehydrated and spice categories arranged with more food-category clarity.</p>
        </div>
      </motion.div>
      {ingredientNodes.map((node, index) => (
        <motion.div
          key={node.label}
          className="absolute rounded-full border border-[#dbc79d] bg-[#fff7e9] px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-[#365241] shadow-[0_10px_30px_rgba(25,48,36,0.12)]"
          style={{ top: node.top, left: node.left }}
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 3.8 + index * 0.45, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        >
          <span>{node.label}</span>
        </motion.div>
      ))}
    </div>
  );
}
