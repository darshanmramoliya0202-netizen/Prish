"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import sourcingMap from "@/brochure/Brochure Draft 4 edit lite_page-0002.jpg";
import labProcess from "@/brochure/Brochure Draft 4 edit lite_page-0004.jpg";
import exportExecution from "@/brochure/Brochure Draft 4 edit lite_page-0007.jpg";

const galleryCards = [
  {
    title: "Farm-linked sourcing",
    description: "India-led sourcing regions, crop diversity, and multi-origin traceability framed through a warmer agricultural lens.",
    image: sourcingMap,
    objectPosition: "center 52%",
    detail: "Major growing belts are interpreted as a living sourcing network, not a static supplier list.",
    metric: "04 sourcing belts"
  },
  {
    title: "Controlled processing",
    description: "Lab, hygiene, and process control visuals bring confidence to the category without making the site feel clinical.",
    image: labProcess,
    objectPosition: "center 80%",
    detail: "Processing becomes part of the brand promise when buyers can feel discipline, cleanliness, and consistency in the experience.",
    metric: "03 validation layers"
  },
  {
    title: "Export execution",
    description: "Packaging, documentation, and container movement make the trade story feel real and commercially credible.",
    image: exportExecution,
    objectPosition: "center 56%",
    detail: "The gallery closes the loop between India-origin sourcing and destination-market execution with movement, logistics, and readiness.",
    metric: "FCL + LCL ready"
  }
] as const;

export default function OriginGallery() {
   const [activeIndex, setActiveIndex] = useState(0);
   const activeCard = galleryCards[activeIndex];

  return (
    <div className="space-y-4">
      <div className="grid gap-4 lg:grid-cols-[1.02fr_0.98fr] lg:grid-rows-2">
        {galleryCards.map((card, index) => (
          <motion.article
            key={card.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.55, delay: index * 0.08 }}
            animate={{
              scale: activeIndex === index ? 1.01 : 0.985,
              opacity: activeIndex === index ? 1 : 0.82,
              y: activeIndex === index ? 0 : 6
            }}
            onHoverStart={() => setActiveIndex(index)}
            onFocusCapture={() => setActiveIndex(index)}
            onClick={() => setActiveIndex(index)}
            className={`group relative overflow-hidden rounded-[2rem] border border-[#dccfb7] bg-[#f8f0de] ${
              index === 0 ? "lg:row-span-2" : ""
            }`}
          >
            <div className={`relative ${index === 0 ? "h-full min-h-[32rem]" : "h-[15.5rem]"}`}>
              <Image
                src={card.image}
                alt={card.title}
                fill
                sizes={index === 0 ? "(min-width: 1024px) 34vw, 100vw" : "(min-width: 1024px) 24vw, 100vw"}
                className="object-cover transition duration-700 group-hover:scale-[1.06]"
                style={{ objectPosition: card.objectPosition }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#132d22]/82 via-[#132d22]/24 to-transparent" />
              <motion.div
                animate={{ opacity: activeIndex === index ? 1 : 0, y: activeIndex === index ? 0 : 14 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="absolute right-5 top-5 rounded-[1.4rem] border border-[#f3d09a]/35 bg-[#163326]/78 px-4 py-3 text-right text-[#fff8ef] backdrop-blur-md"
              >
                <p className="text-[10px] uppercase tracking-[0.28em] text-[#f3d09a]">Active frame</p>
                <p className="mt-2 text-sm font-semibold">{card.metric}</p>
              </motion.div>
              <div className="absolute inset-x-0 bottom-0 p-6 sm:p-7">
                <div className="inline-flex rounded-full border border-[#f5deb4]/35 bg-[#f7edd4]/12 px-3 py-2 text-[11px] uppercase tracking-[0.28em] text-[#f3d09a]">
                  {index === 0 ? "Origin network" : index === 1 ? "Process discipline" : "Trade movement"}
                </div>
                <h3 className="mt-4 font-serif text-3xl text-[#fff8ef]">{card.title}</h3>
                <p className="mt-3 max-w-md text-sm leading-7 text-[#f2ead8]/82">{card.description}</p>
              </div>
            </div>
          </motion.article>
        ))}
      </div>

      <div className="rounded-[2rem] border border-[#dccfb7] bg-[#fff8ea] p-6 shadow-[0_18px_50px_rgba(19,45,34,0.08)]">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-[#8a6433]">Gallery transition layer</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {galleryCards.map((card, index) => (
                <button
                  key={card.title}
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  className={`rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] transition ${
                    activeIndex === index
                      ? "border-[#c99c63] bg-[#173124] text-[#fff8ed]"
                      : "border-[#dccfb7] bg-[#f7efdf] text-[#496052] hover:border-[#c99c63] hover:text-[#173124]"
                  }`}
                >
                  {String(index + 1).padStart(2, "0")}
                </button>
              ))}
            </div>
          </div>
          <p className="text-xs uppercase tracking-[0.3em] text-[#8a6433]">{activeCard.metric}</p>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeCard.title}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.28, ease: "easeOut" }}
            className="mt-6 grid gap-4 lg:grid-cols-[1.1fr_0.9fr]"
          >
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-[#8a6433]">Current scene</p>
              <h3 className="mt-3 font-serif text-3xl text-[#173124]">{activeCard.title}</h3>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-[#496052]">{activeCard.description}</p>
            </div>
            <div className="rounded-[1.6rem] border border-[#dccfb7] bg-[#f7efdf] p-5">
              <p className="text-xs uppercase tracking-[0.3em] text-[#8a6433]">Why it matters</p>
              <p className="mt-3 text-sm leading-7 text-[#496052]">{activeCard.detail}</p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
