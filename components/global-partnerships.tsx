"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { Handshake, Award, Globe, Shield } from "lucide-react";

const partnerships = [
  {
    title: "G20 New Delhi Summit",
    description: "India's leadership in global agricultural trade policy and sustainable supply chains during the 2023 G20 presidency — positioning Indian agri-exports on the world stage.",
    image: "/images/sections/g20-new-delhi.jpg",
    icon: Globe,
    year: "2023",
    location: "New Delhi",
    featured: true
  },
  {
    title: "EU-India Strategic Partnership",
    description: "Framework agreement on agricultural trade, quality standards, and sustainable sourcing between the European Union and India.",
    image: "/images/sections/eu-india-deal.jpg",
    icon: Handshake,
    year: "2023",
    location: "Brussels",
    featured: false
  },
  {
    title: "APEDA Export Excellence",
    description: "Recognized under India's Agricultural & Processed Food Products Export Development Authority framework for quality-driven export practices.",
    image: "/images/products/turmeric-raw.jpg",
    icon: Award,
    year: "2024",
    location: "India",
    featured: false
  },
  {
    title: "GCC Market Expansion",
    description: "Strategic entry into Gulf Cooperation Council markets with compliant documentation, halal-aligned processing, and buyer-specific packaging.",
    image: "/images/products/cumin-seeds.jpg",
    icon: Shield,
    year: "2024",
    location: "Dubai",
    featured: false
  }
];

export default function GlobalPartnerships() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section ref={ref} className="relative overflow-hidden bg-transparent py-16 sm:py-24">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_20%,rgba(245,166,35,0.05),transparent_40%)]" />
      
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        <div className="mb-12 text-center">
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-xs font-semibold uppercase tracking-[0.5em] text-saffron"
          >
            Global Partnerships
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mx-auto mt-4 max-w-2xl font-serif text-3xl text-parchment sm:text-4xl"
          >
            Diplomatic Engagement.{" "}
            <span className="bg-gradient-to-r from-saffron to-turmeric bg-clip-text text-transparent">
              Trade Excellence.
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mx-auto mt-4 max-w-lg text-base leading-7 text-wheat/70"
          >
            Active participation in global trade policy and strategic partnerships that strengthen international supply chains.
          </motion.p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {partnerships.map((partnership, index) => {
            const Icon = partnership.icon;
            return (
              <motion.div
                key={partnership.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.12 * index }}
                className={`group relative overflow-hidden rounded-2xl border bg-white/8 shadow-md transition-all hover:shadow-xl ${
                  partnership.featured ? "border-saffron/40 ring-2 ring-saffron/20 sm:col-span-2 lg:col-span-2" : "border-white/10 hover:border-saffron/30"
                }`}
              >
                <div className={`relative overflow-hidden ${partnership.featured ? "h-72" : "h-48"}`}>
                  <Image
                    src={partnership.image}
                    alt={partnership.title}
                    fill
                    sizes={partnership.featured ? "(min-width: 1024px) 50vw, 100vw" : "(min-width: 1024px) 25vw, 50vw"}
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                  
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="flex items-center gap-3 text-white">
                      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/20 backdrop-blur-sm">
                        <Icon className="h-4 w-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className={`font-semibold text-parchment ${partnership.featured ? "text-xl" : "text-base"}`}>{partnership.title}</h3>
                        <div className="flex items-center gap-3 text-xs text-white/80">
                          <span className="rounded-full bg-saffron/80 px-2 py-0.5 text-[10px] font-semibold text-white">{partnership.year}</span>
                          <span>{partnership.location}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="p-4">
                  <p className={`leading-6 text-wheat/70 ${partnership.featured ? "text-sm" : "text-xs"}`}>{partnership.description}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
