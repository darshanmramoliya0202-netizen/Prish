"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { TrendingUp, Globe2, Package, Zap } from "lucide-react";

const macroStats = [
  {
    value: "#1",
    label: "Fastest-Growing Major Economy",
    sublabel: "IMF World Economic Outlook",
    icon: TrendingUp,
    sparkline: [20, 35, 28, 45, 52, 48, 65, 72, 68, 82, 90, 95]
  },
  {
    value: "$450B+",
    label: "Agricultural Export Potential by 2030",
    sublabel: "NITI Aayog Projections",
    icon: Globe2,
    sparkline: [15, 22, 30, 35, 42, 50, 55, 62, 70, 78, 85, 92]
  },
  {
    value: "2500+",
    label: "MT Monthly Processing Capacity",
    sublabel: "Prish Overseas Operations",
    icon: Package,
    sparkline: [40, 45, 50, 48, 55, 60, 58, 65, 70, 72, 78, 82]
  },
  {
    value: "15+",
    label: "Global Markets Served",
    sublabel: "Active Export Destinations",
    icon: Zap,
    sparkline: [10, 15, 20, 25, 35, 40, 50, 55, 60, 70, 80, 90]
  }
];

function MiniSparkline({ data, active }: { data: number[]; active: boolean }) {
  const width = 120;
  const height = 32;
  const max = Math.max(...data);
  const points = data.map((v, i) => {
    const x = (i / (data.length - 1)) * width;
    const y = height - (v / max) * height;
    return `${x},${y}`;
  }).join(" ");

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} className="overflow-visible">
      <defs>
        <linearGradient id="sparkGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="rgb(245 158 11)" stopOpacity="0.3" />
          <stop offset="100%" stopColor="rgb(245 158 11)" stopOpacity="0" />
        </linearGradient>
      </defs>
      <motion.polygon
        points={`0,${height} ${points} ${width},${height}`}
        fill="url(#sparkGrad)"
        initial={{ opacity: 0 }}
        animate={{ opacity: active ? 1 : 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      />
      <motion.polyline
        points={points}
        fill="none"
        stroke="rgb(245 158 11)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: active ? 1 : 0, opacity: active ? 1 : 0 }}
        transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
      />
    </svg>
  );
}

export default function IndiaMomentum() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section ref={ref} className="relative overflow-hidden bg-gradient-to-br from-charcoal to-soil py-16 sm:py-24">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_50%,rgba(20,83,45,0.15),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_20%,rgba(245,166,35,0.08),transparent_40%)]" />
        {/* Subtle grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
            backgroundSize: "60px 60px"
          }}
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        <div className="mb-12 text-center">
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-xs font-semibold uppercase tracking-[0.5em] text-amber-400"
          >
            India Momentum
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mx-auto mt-4 max-w-2xl font-sans text-3xl font-bold text-white sm:text-4xl"
          >
            India&apos;s Momentum.{" "}
            <span className="bg-gradient-to-r from-saffron to-turmeric bg-clip-text text-transparent">
              Delivered Globally.
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mx-auto mt-4 max-w-lg text-base leading-7 text-slate-200"
          >
            Powering the next phase of global agri-trade — from the world&apos;s fastest-growing economy to your supply chain.
          </motion.p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {macroStats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.15 * index }}
                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-sm transition hover:border-saffron/30 hover:bg-white/[0.07]"
              >
                <div className="flex items-center justify-between">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-saffron/10 text-saffron transition group-hover:bg-saffron/20">
                    <Icon className="h-5 w-5" />
                  </div>
                  <MiniSparkline data={stat.sparkline} active={isInView} />
                </div>
                <motion.p
                  className="mt-5 font-sans text-3xl font-bold text-white"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.6, delay: 0.3 + index * 0.1, type: "spring" }}
                >
                  {stat.value}
                </motion.p>
                <p className="mt-2 text-sm font-medium text-white/90">{stat.label}</p>
                <p className="mt-1 text-xs text-amber-300/70">{stat.sublabel}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
