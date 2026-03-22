"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { Activity, Truck, Leaf, Thermometer, Eye, BarChart3 } from "lucide-react";
import AnimatedCounter from "@/components/animated-counter";
import heroPowders from "@/brochure/Brochure Draft 4 edit lite_page-0001.jpg";
import labProcess from "@/brochure/Brochure Draft 4 edit lite_page-0004.jpg";

const bentoItems = [
  {
    id: "live-capacity",
    type: "counter" as const,
    span: "col-span-1",
    icon: Activity,
    label: "Monthly Capacity",
    value: "2500+",
    unit: "MT",
    sublabel: "Processing & export ready"
  },
  {
    id: "visual-farm",
    type: "image" as const,
    span: "col-span-1 row-span-2",
    image: heroPowders,
    alt: "Vibrant Indian spice powders — turmeric, chili, beetroot",
    overlay: "From soil to specification"
  },
  {
    id: "countries",
    type: "counter" as const,
    span: "col-span-1",
    icon: Truck,
    label: "Export Destinations",
    value: "15+",
    unit: "countries",
    sublabel: "4 major market clusters"
  },
  {
    id: "organic",
    type: "stat" as const,
    span: "col-span-1",
    icon: Leaf,
    title: "Clean Label",
    text: "Zero artificial colors, flavors, or adulteration. Natural ingredient integrity guaranteed across every batch."
  },
  {
    id: "specs",
    type: "counter" as const,
    span: "col-span-1",
    icon: BarChart3,
    label: "Spec Profiles",
    value: "100+",
    unit: "supported",
    sublabel: "Customizable per buyer"
  },
  {
    id: "visual-lab",
    type: "image" as const,
    span: "col-span-2",
    image: labProcess,
    alt: "Quality control lab and processing facility",
    overlay: "Metrology-level quality checks"
  },
  {
    id: "temp",
    type: "stat" as const,
    span: "col-span-1",
    icon: Thermometer,
    title: "Low-Temp Drying",
    text: "Controlled dehydration preserves active compounds, natural color, and nutritional integrity in every product."
  },
  {
    id: "vision",
    type: "stat" as const,
    span: "col-span-1",
    icon: Eye,
    title: "Vision Inspection",
    text: "Automated optical sorting and impurity detection. Technology-driven quality you can trust over promises."
  }
];

export default function BentoGrid() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.15 });

  return (
    <section ref={ref} className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-10">
      <div className="mb-10">
        <p className="text-xs font-semibold uppercase tracking-[0.4em] text-amber-600">At a Glance</p>
        <h2 className="mt-4 max-w-xl font-sans text-3xl font-bold text-[#0f172a] sm:text-4xl">
          Everything you need to know —{" "}
          <span className="text-slate-400">in one view.</span>
        </h2>
      </div>

      <div className="grid auto-rows-[160px] gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {bentoItems.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20, scale: 0.97 }}
            animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{ duration: 0.45, delay: index * 0.06 }}
            className={`group relative overflow-hidden rounded-2xl border border-slate-200 transition hover:border-saffron/30 hover:shadow-card-light ${item.span}`}
          >
            {item.type === "image" && (
              <>
                <Image
                  src={item.image!}
                  alt={item.alt!}
                  fill
                  sizes="(min-width: 1024px) 33vw, 50vw"
                  className="object-cover transition duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a]/80 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white">{item.overlay}</p>
                </div>
              </>
            )}

            {item.type === "counter" && (() => {
              const Icon = item.icon!;
              return (
                <div className="flex h-full flex-col justify-between bg-[#0f172a] p-5">
                  <div className="flex items-center justify-between">
                    <Icon className="h-5 w-5 text-saffron" />
                    <span className="rounded-full bg-emerald-500/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-emerald-600">
                      Live
                    </span>
                  </div>
                  <div>
                    <div className="flex items-baseline gap-2">
                      <AnimatedCounter value={item.value!} className="font-sans text-3xl font-bold text-white" />
                      <span className="text-sm text-slate-400">{item.unit}</span>
                    </div>
                    <p className="mt-1 text-xs text-slate-400">{item.sublabel}</p>
                  </div>
                </div>
              );
            })()}

            {item.type === "stat" && (() => {
              const Icon = item.icon!;
              return (
                <div className="flex h-full flex-col justify-between bg-white p-5">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-500/10 text-amber-600">
                    <Icon className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[#0f172a]">{item.title}</p>
                    <p className="mt-1 text-xs leading-5 text-slate-600">{item.text}</p>
                  </div>
                </div>
              );
            })()}
          </motion.div>
        ))}
      </div>
    </section>
  );
}
