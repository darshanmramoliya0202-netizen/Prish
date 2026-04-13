"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight, Sparkles } from "lucide-react";
import AnimatedCounter from "@/components/animated-counter";
import AnimatedSection from "@/components/animated-section";
import WorldMapD3 from "@/components/world-map-d3";
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
import GlobalPartnerships from "@/components/global-partnerships";
import BentoGrid from "@/components/bento-grid";
import GlassBox from "@/components/glass-box";
import ReelsProducts from "@/components/reels-products";
import SourcingRegions from "@/components/sourcing-regions";
import { contact, stats } from "@/data/site";

export default function HomePage() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const heroOpacity = useTransform(scrollYProgress, [0.5, 1.0], [1, 0]);

  return (
    <SiteShell>
      <PageTransition>

      {/* ─── 1. HERO (light) ─── */}
      <section ref={heroRef} className="relative mx-auto max-w-7xl px-4 pb-16 pt-8 sm:px-6 sm:pb-24 sm:pt-12 lg:px-10 lg:pt-20">
        <div className="absolute inset-x-4 top-0 -z-10 h-full rounded-[2.5rem] bg-hero-radial opacity-90 sm:inset-x-6 lg:inset-x-10" />
        <motion.div style={{ y: heroY, opacity: heroOpacity }}>
          <div className="grid items-center gap-10 sm:gap-14 lg:grid-cols-[1.05fr_0.95fr]">
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
              className="mb-7 inline-flex items-center gap-2 rounded-full border border-wheat/25 bg-white/80 px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-gold-warm shadow-card-light backdrop-blur-sm"
            >
              <Sparkles className="h-4 w-4" />
              From Indian farms to global formulations
            </motion.div>
            <h1 className="max-w-4xl font-serif text-3xl leading-[1.03] text-ink sm:text-5xl md:text-6xl lg:text-[5rem]">
              <KineticText text="Premium Indian spices &" delay={0.2} />
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="mt-1 block bg-gradient-to-r from-gold-warm to-saffron bg-clip-text text-transparent"
              >
                agri ingredients — exported to 15+ countries.
              </motion.span>
            </h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.5 }}
              className="mt-3 text-xs font-semibold uppercase tracking-[0.28em] text-gold-warm"
            >
              FSSAI Certified · APEDA Registered · Rajkot, Gujarat
            </motion.p>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.6 }}
              className="mt-4 max-w-xl text-[15px] leading-8 text-ink-soft sm:mt-6 sm:text-lg sm:leading-9"
            >
              Traceable powders, dehydrated ingredients, and spice-led supply — processed with precision, documented for compliance, and shipped container-ready.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="mt-10 flex flex-col gap-3 sm:flex-row"
            >
              <Link
                href="/products"
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-leaf-dark px-7 py-3.5 text-sm font-semibold text-parchment transition duration-300 hover:-translate-y-0.5 hover:bg-soil hover:shadow-paper"
              >
                Explore products
                <ArrowUpRight className="h-4 w-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
              <Link
                href="/inquiry"
                className="inline-flex items-center justify-center rounded-full border border-wheat/25 bg-white/80 px-7 py-3.5 text-sm font-semibold text-ink transition duration-300 hover:-translate-y-0.5 hover:border-gold-warm hover:text-gold-warm hover:shadow-card-light"
              >
                Start an inquiry
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.7 }}
              className="mt-12 grid gap-4 sm:grid-cols-2"
            >
              {stats.map((stat, index) => (
                <div key={stat.label} className="group rounded-[1.8rem] border border-wheat/25 bg-white/82 p-5 shadow-card-light transition duration-300 hover:-translate-y-0.5 hover:border-gold-warm/30 hover:shadow-paper">
                  <AnimatedCounter value={stat.value} className="font-serif text-3xl text-gold-warm" />
                  <p className="mt-2 max-w-[16rem] text-sm leading-6 text-ink-soft">{stat.label}</p>
                  <div
                    className="mt-4 h-0.5 rounded-full bg-gradient-to-r from-gold-warm to-transparent transition-all duration-700 group-hover:w-full"
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
            <span key={item} className="flex items-center gap-3 whitespace-nowrap text-sm font-medium text-ink-soft">
              <span className="h-1.5 w-1.5 rounded-full bg-gold-warm" />
              {item}
            </span>
          ))}
        </Marquee>
      </section>

      {/* ─── 3. SOIL TO SCALE (dark parallax) ─── */}
      <SoilToScale />

      {/* ─── 4. BENTO GRID (light — "at a glance" dashboard) ─── */}
      <BentoGrid />

      {/* ─── 10+11. INDIA MOMENTUM + GLOBAL PARTNERSHIPS (shared dark) ─── */}
      <section className="bg-leaf-dark">
        <IndiaMomentum />
        <GlobalPartnerships />
      </section>

      {/* ─── 12. ROLE SELECTOR (light — personalized) ─── */}
      <RoleSelector />

      {/* ─── 7. REELS PRODUCTS (dark — product showcase) ─── */}
      <ReelsProducts />

      {/* ─── 8. GLASS BOX (dark — tech transparency) ─── */}
      <GlassBox />

      {/* ─── 9. SOURCING REGIONS (light — authenticity) ─── */}
      <SourcingRegions />

      {/* ─── 10. SEED JOURNEY (dark — traceability) ─── */}
      <SeedJourney />

      {/* ─── 12. GLOBAL REACH (full-width D3 map) ─── */}
      <section className="relative overflow-hidden bg-leaf-dark py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
          <AnimatedSection className="mb-10">
            <p className="text-xs font-semibold uppercase tracking-[0.4em] text-saffron">Global Reach</p>
            <h2 className="mt-4 max-w-2xl font-serif text-3xl text-parchment sm:text-4xl">
              From Gujarat to the world —{" "}
              <span className="bg-gradient-to-r from-gold-warm to-saffron bg-clip-text text-transparent">15+ countries.</span>
            </h2>
            <p className="mt-4 max-w-xl text-sm leading-7 text-parchment/55">
              Our export network spans North America, Europe, the GCC, Southeast Asia, and beyond. Click any destination to see product relevance.
            </p>
          </AnimatedSection>
          <AnimatedSection>
            <WorldMapD3 />
          </AnimatedSection>
          <div className="mt-8 rounded-[1.8rem] border border-white/10 bg-white/5 p-5 backdrop-blur-sm sm:p-6">
            <p className="font-semibold text-parchment">{contact.company}</p>
            <p className="mt-1 text-sm text-parchment/50">{contact.address.join(", ")}</p>
            <div className="mt-3">
              <Link href="/inquiry" className="inline-flex items-center gap-1.5 text-sm font-semibold text-gold-warm transition hover:text-saffron">
                Start an inquiry <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 12. SAMPLE BUILDER (light — lead capture) ─── */}
      <SampleBuilder />

      </PageTransition>
    </SiteShell>
  );
}
