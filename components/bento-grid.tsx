"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { Activity, Truck, Leaf, Thermometer, Eye, BarChart3 } from "lucide-react";
import AnimatedCounter from "@/components/animated-counter";
const heroPowders = "/images/hero/hero-spice-bowls.png";
const labProcess = "/images/sections/lab-quality-control.png";

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
    alt: "Vibrant Indian spice powders in bowls — turmeric, star anise, cinnamon",
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
        <p className="text-xs font-semibold uppercase tracking-[0.4em] text-saffron">At a Glance</p>
        <h2 className="mt-4 max-w-xl font-serif text-3xl text-ink sm:text-4xl">
          Everything you need to know —{" "}
          <span className="text-ink-soft">in one view.</span>
        </h2>
      </div>

      <div className="grid auto-rows-[140px] gap-3 grid-cols-1 sm:grid-cols-2 sm:auto-rows-[160px] lg:grid-cols-3">
        {bentoItems.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20, scale: 0.97 }}
            animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{ duration: 0.45, delay: index * 0.06 }}
            className={`group relative overflow-hidden rounded-2xl border border-wheat/25 transition hover:border-saffron/30 hover:shadow-card-light ${item.span === 'col-span-2' ? 'col-span-1 sm:col-span-2' : item.span}`}
          >
            {item.type === "image" && (
              <>
                <Image
                  src={item.image!}
                  alt={item.alt!}
                  fill
                  sizes="(min-width: 1024px) 33vw, 50vw"
                  className="object-cover transition duration-700 group-hover:scale-105"
                  style={{ objectPosition: item.image === heroPowders ? "center 40%" : "center 50%" }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white">{item.overlay}</p>
                </div>
              </>
            )}

            {item.type === "counter" && (() => {
              const Icon = item.icon!;
              return (
                <div className="flex h-full flex-col justify-between bg-leaf-dark p-5">
                  <div className="flex items-center justify-between">
                    <Icon className="h-5 w-5 text-saffron" />
                    <span className="rounded-full bg-leaf/20 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-sprout">
                      Live
                    </span>
                  </div>
                  <div>
                    <div className="flex items-baseline gap-2">
                      <AnimatedCounter value={item.value!} className="font-serif text-3xl text-parchment" />
                      <span className="text-sm text-parchment/60">{item.unit}</span>
                    </div>
                    <p className="mt-1 text-xs text-parchment/50">{item.sublabel}</p>
                  </div>
                </div>
              );
            })()}

            {item.type === "stat" && (() => {
              const Icon = item.icon!;
              return (
                <div className="flex h-full flex-col justify-between bg-white p-5">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-saffron/10 text-saffron">
                    <Icon className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-ink">{item.title}</p>
                    <p className="mt-1 text-xs leading-5 text-ink-soft">{item.text}</p>
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
