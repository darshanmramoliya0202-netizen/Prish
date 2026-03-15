"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import sourcingMap from "@/brochure/Brochure Draft 4 edit lite_page-0002.jpg";
import labProcess from "@/brochure/Brochure Draft 4 edit lite_page-0004.jpg";
import exportExecution from "@/brochure/Brochure Draft 4 edit lite_page-0007.jpg";

const galleryCards = [
  {
    title: "Farm-linked sourcing",
    description: "India-led sourcing regions, crop diversity, and multi-origin traceability framed through a warmer agricultural lens.",
    image: sourcingMap,
    objectPosition: "center 52%"
  },
  {
    title: "Controlled processing",
    description: "Lab, hygiene, and process control visuals bring confidence to the category without making the site feel clinical.",
    image: labProcess,
    objectPosition: "center 80%"
  },
  {
    title: "Export execution",
    description: "Packaging, documentation, and container movement make the trade story feel real and commercially credible.",
    image: exportExecution,
    objectPosition: "center 56%"
  }
] as const;

export default function OriginGallery() {
  return (
    <div className="grid gap-4 lg:grid-cols-[1.02fr_0.98fr] lg:grid-rows-2">
      {galleryCards.map((card, index) => (
        <motion.article
          key={card.title}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.55, delay: index * 0.08 }}
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
              className="object-cover transition duration-700 group-hover:scale-[1.03]"
              style={{ objectPosition: card.objectPosition }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#132d22]/82 via-[#132d22]/24 to-transparent" />
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
  );
}
