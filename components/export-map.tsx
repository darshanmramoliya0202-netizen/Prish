"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import worldTradeBackdrop from "@/brochure/Brochure Draft 4 edit lite_page-0003.jpg";

const destinations = [
  { name: "United States", region: "North America", top: "21%", left: "67%" },
  { name: "European Union", region: "Europe", top: "37%", left: "55%" },
  { name: "GCC Region", region: "Middle East", top: "52%", left: "59%" },
  { name: "Southeast Asia", region: "Asia", top: "69%", left: "76%" }
] as const;

export default function ExportMap() {
  return (
    <div className="relative h-[31rem] overflow-hidden rounded-[2.4rem] border border-[#dccfb7] bg-[linear-gradient(180deg,#f9f1df_0%,#efe0bf_100%)] p-6 shadow-[0_26px_80px_rgba(15,35,28,0.16)]">
      <div className="absolute inset-[1.1rem] overflow-hidden rounded-[1.9rem] border border-[#dccfb7]">
        <Image
          src={worldTradeBackdrop}
          alt="World trade backdrop highlighting India export movement"
          fill
          sizes="(min-width: 1024px) 48vw, 100vw"
          className="object-cover"
          style={{ objectPosition: "center 30%" }}
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(248,239,219,0.32),rgba(18,43,34,0.72))]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_22%_70%,rgba(247,228,181,0.28),transparent_16%),radial-gradient(circle_at_82%_18%,rgba(247,228,181,0.14),transparent_18%)]" />
      </div>
      <div className="absolute left-[26%] top-[47%] h-24 w-24 rounded-full border border-[#f4c98d]/50 bg-[#efbb73]/20 shadow-[0_0_50px_rgba(210,152,74,0.24)]" />
      <div className="absolute left-[29.5%] top-[50%] rounded-full border border-[#f4c98d]/55 bg-[#efbb73] px-5 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-[#183225]">
        India
      </div>
      <div className="absolute left-[20%] top-[72%] rounded-[1.6rem] border border-[#d8c49c] bg-[#fff8ed]/88 px-5 py-4 text-xs leading-6 text-[#4b5d50] shadow-[0_16px_40px_rgba(24,50,37,0.14)] backdrop-blur-md">
        <p className="uppercase tracking-[0.28em] text-[#7d5c2c]">Origin node</p>
        <p className="mt-2 text-sm font-semibold text-[#173124]">Rajkot, Gujarat</p>
      </div>

      {destinations.map((destination, index) => (
        <motion.div
          key={destination.name}
          className="absolute"
          style={{ top: destination.top, left: destination.left }}
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.55, delay: 0.1 * index }}
        >
          <motion.div
            animate={{ scale: [1, 1.15, 1], opacity: [0.55, 1, 0.55] }}
            transition={{ duration: 2.8 + index * 0.35, repeat: Number.POSITIVE_INFINITY }}
            className="absolute left-1/2 top-1/2 h-10 w-10 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#efbb73]/30 blur-md"
          />
          <div className="relative rounded-[1.45rem] border border-[#d8c49c] bg-[#fff8ed]/90 px-4 py-3 shadow-[0_18px_40px_rgba(24,50,37,0.16)] backdrop-blur-md">
            <p className="text-[11px] uppercase tracking-[0.28em] text-[#7d5c2c]">{destination.region}</p>
            <p className="mt-1 text-sm font-semibold text-[#173124]">{destination.name}</p>
          </div>
        </motion.div>
      ))}

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8 }}
        className="absolute inset-0"
      >
        <div className="absolute left-[38%] top-[54%] h-px w-[20%] rotate-[-23deg] bg-gradient-to-r from-[#e2a75a]/80 to-transparent" />
        <div className="absolute left-[38%] top-[55%] h-px w-[14%] rotate-[-8deg] bg-gradient-to-r from-[#e2a75a]/80 to-transparent" />
        <div className="absolute left-[38%] top-[56%] h-px w-[17%] rotate-[9deg] bg-gradient-to-r from-[#e2a75a]/80 to-transparent" />
        <div className="absolute left-[38%] top-[57%] h-px w-[24%] rotate-[17deg] bg-gradient-to-r from-[#e2a75a]/80 to-transparent" />
      </motion.div>
    </div>
  );
}
