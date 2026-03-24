"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { Handshake, Award, Globe, Shield } from "lucide-react";

const partnerships = [
  {
    title: "G20 New Delhi Summit",
    description: "India's leadership in global agricultural trade policy and sustainable supply chains during the 2023 G20 presidency.",
    image: "/images/sections/g20-new-delhi.jpg",
    icon: Globe,
    year: "2023",
    location: "New Delhi"
  },
  {
    title: "EU-India Strategic Partnership",
    description: "Framework agreement on agricultural trade, quality standards, and sustainable sourcing between the European Union and India.",
    image: "/images/sections/eu-india-deal.jpg",
    icon: Handshake,
    year: "2023",
    location: "Brussels"
  }
];

export default function GlobalPartnerships() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section ref={ref} className="relative overflow-hidden bg-white py-16 sm:py-24">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_20%,rgba(245,158,11,0.05),transparent_40%)]" />
      
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
            className="mx-auto mt-4 max-w-2xl font-sans text-3xl font-bold text-[#0f172a] sm:text-4xl"
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
            className="mx-auto mt-4 max-w-lg text-base leading-7 text-slate-600"
          >
            Active participation in global trade policy and strategic partnerships that strengthen international supply chains.
          </motion.p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          {partnerships.map((partnership, index) => {
            const Icon = partnership.icon;
            return (
              <motion.div
                key={partnership.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.15 * index }}
                className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-lg transition-all hover:shadow-xl hover:border-saffron/30"
              >
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={partnership.image}
                    alt={partnership.title}
                    fill
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                  
                  <div className="absolute bottom-6 left-6 right-6">
                    <div className="flex items-center gap-3 text-white">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/20 backdrop-blur-sm">
                        <Icon className="h-5 w-5" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-white">{partnership.title}</h3>
                        <div className="flex items-center gap-4 text-sm text-white/80">
                          <span>{partnership.year}</span>
                          <span>•</span>
                          <span>{partnership.location}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="p-6">
                  <p className="text-base leading-7 text-slate-600">{partnership.description}</p>
                  
                  <div className="mt-6 flex items-center gap-4">
                    <div className="flex items-center gap-2 text-sm text-slate-500">
                      <Award className="h-4 w-4" />
                      <span>Strategic Initiative</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-500">
                      <Shield className="h-4 w-4" />
                      <span>Trade Framework</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
