"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight, Sparkles } from "lucide-react";
import AnimatedCounter from "@/components/animated-counter";
import AnimatedSection from "@/components/animated-section";
import ExportMap from "@/components/export-map";
import IngredientCloud from "@/components/ingredient-cloud";
import KineticText from "@/components/kinetic-text";
import Marquee from "@/components/marquee";
import PageTransition from "@/components/page-transition";
import SiteShell from "@/components/site-shell";
import SeedJourney from "@/components/seed-journey";
import RoleSelector from "@/components/role-selector";
import SampleBuilder from "@/components/sample-builder";
import SoilToScale from "@/components/soil-to-scale";
import IndiaMomentum from "@/components/india-momentum";
import BentoGrid from "@/components/bento-grid";
import GlassBox from "@/components/glass-box";
import FounderFeed from "@/components/founder-feed";
import ReelsProducts from "@/components/reels-products";
import { contact, markets, stats } from "@/data/site";

export default function HomePage() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <SiteShell>
      <PageTransition>

      {/* ─── 1. HERO (light) ─── */}
      <section ref={heroRef} className="relative mx-auto max-w-7xl px-4 pb-12 pt-8 sm:px-6 sm:pb-20 sm:pt-12 lg:px-10 lg:pt-20">
        <motion.div style={{ y: heroY, opacity: heroOpacity }}>
          <div className="grid items-center gap-8 sm:gap-12 lg:grid-cols-[1.05fr_0.95fr]">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10"
          >
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-emerald-600 backdrop-blur-sm"
            >
              <Sparkles className="h-4 w-4" />
              From Indian farms to global formulations
            </motion.div>
            <h1 className="max-w-4xl font-sans text-3xl font-bold leading-[1.05] text-[#0f172a] sm:text-5xl md:text-6xl lg:text-[5rem]">
              <KineticText text="India, translated into" delay={0.2} />
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="block bg-gradient-to-r from-saffron to-turmeric bg-clip-text text-transparent"
              >
                ingredient confidence.
              </motion.span>
            </h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.5 }}
              className="mt-5 max-w-xl text-base leading-7 text-slate-600 sm:mt-8 sm:text-lg sm:leading-8"
            >
              Traceable powders, dehydrated ingredients, and spice-led supply — processed with precision, documented for compliance, and shipped container-ready.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="mt-8 flex flex-col gap-3 sm:flex-row"
            >
              <Link
                href="/products"
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-[#0f172a] px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-[#1e293b] hover:shadow-[0_8px_30px_rgba(0,0,0,0.18)]"
              >
                Explore products
                <ArrowUpRight className="h-4 w-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
              <Link
                href="/inquiry"
                className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-7 py-3.5 text-sm font-semibold text-[#0f172a] transition hover:border-[#0f172a] hover:bg-[#0f172a] hover:text-white"
              >
                Start an inquiry
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.7 }}
              className="mt-10 grid gap-4 sm:grid-cols-2"
            >
              {stats.map((stat, index) => (
                <div key={stat.label} className="group rounded-2xl border border-slate-200 bg-white p-5 transition hover:border-saffron/30 hover:shadow-[0_16px_40px_rgba(0,0,0,0.06)]">
                  <AnimatedCounter value={stat.value} className="font-sans text-3xl font-bold text-saffron" />
                  <p className="mt-2 max-w-[16rem] text-sm leading-6 text-slate-600">{stat.label}</p>
                  <div
                    className="mt-4 h-0.5 rounded-full bg-gradient-to-r from-saffron to-transparent transition-all duration-700 group-hover:w-full"
                    style={{ width: `${78 - index * 12}%` }}
                  />
                </div>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="relative mx-auto w-full max-w-xl"
          >
            <IngredientCloud />
          </motion.div>
        </div>
        </motion.div>
      </section>

      {/* ─── 2. MARQUEE (light) ─── */}
      <section className="relative mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-10">
        <Marquee speed={35} className="py-3">
          {["FSSAI Compliant", "ISO/HACCP Aligned", "2500+ MT Capacity", "280+ Sunshine Days", "100+ Specs Supported", "No Artificial Colors", "Third-Party Testing", "Multi-Origin Sourcing"].map((item) => (
            <span key={item} className="flex items-center gap-3 whitespace-nowrap text-sm font-medium text-slate-500">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              {item}
            </span>
          ))}
        </Marquee>
      </section>

      {/* ─── 3. SOIL TO SCALE (dark parallax) ─── */}
      <SoilToScale />

      {/* ─── 4. BENTO GRID (light — "at a glance" dashboard) ─── */}
      <BentoGrid />

      {/* ─── 5. INDIA MOMENTUM (dark stats) ─── */}
      <IndiaMomentum />

      {/* ─── 6. ROLE SELECTOR (light — personalized) ─── */}
      <RoleSelector />

      {/* ─── 7. REELS PRODUCTS (dark — product showcase) ─── */}
      <ReelsProducts />

      {/* ─── 8. GLASS BOX (dark — tech transparency) ─── */}
      <GlassBox />

      {/* ─── 9. FOUNDER FEED (light — social proof) ─── */}
      <FounderFeed />

      {/* ─── 10. SEED JOURNEY (dark — traceability) ─── */}
      <SeedJourney />

      {/* ─── 11. GLOBAL REACH (light — map + markets) ─── */}
      <section className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-10">
        <AnimatedSection className="mb-10">
          <p className="text-xs font-semibold uppercase tracking-[0.4em] text-blue-600">Global Reach</p>
          <h2 className="mt-4 max-w-2xl font-sans text-3xl font-bold text-[#0f172a] sm:text-4xl">
            Active across 4 market clusters,{" "}
            <span className="text-slate-400">15+ countries.</span>
          </h2>
        </AnimatedSection>
        <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <AnimatedSection>
            <ExportMap />
          </AnimatedSection>
          <AnimatedSection delay={0.1} className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
            <div className="grid gap-3 sm:grid-cols-2">
              {markets.map((market, index) => (
                <div key={market} className="rounded-xl border border-slate-200 bg-slate-50 p-4 transition hover:border-blue-200 hover:bg-white">
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-blue-500">Market {String(index + 1).padStart(2, "0")}</p>
                  <p className="mt-2 text-lg font-semibold text-[#0f172a]">{market}</p>
                </div>
              ))}
            </div>
            <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-4">
              <p className="font-semibold text-[#0f172a]">{contact.company}</p>
              <p className="mt-1 text-sm text-slate-600">{contact.address.join(", ")}</p>
              <div className="mt-3 flex flex-wrap gap-3">
                <Link href="/inquiry" className="inline-flex items-center gap-1.5 text-sm font-semibold text-saffron transition hover:text-turmeric">
                  Get in touch <ArrowUpRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ─── 12. SAMPLE BUILDER (light — lead capture) ─── */}
      <SampleBuilder />

      </PageTransition>
    </SiteShell>
  );
}
