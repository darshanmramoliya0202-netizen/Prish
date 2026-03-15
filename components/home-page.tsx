"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  ArrowUpRight,
  BadgeCheck,
  Boxes,
  CircleDashed,
  Globe2,
  Leaf,
  PackageCheck,
  Sparkles
} from "lucide-react";
import AnimatedCounter from "@/components/animated-counter";
import AnimatedSection from "@/components/animated-section";
import ClipReveal from "@/components/clip-reveal";
import ExportMap from "@/components/export-map";
import HorizontalScroll from "@/components/horizontal-scroll";
import IngredientCloud from "@/components/ingredient-cloud";
import InquiryForm from "@/components/inquiry-form";
import KineticText from "@/components/kinetic-text";
import Marquee from "@/components/marquee";
import OriginGallery from "@/components/origin-gallery";
import PageTransition from "@/components/page-transition";
import SiteShell from "@/components/site-shell";
import TextReveal from "@/components/text-reveal";
import TiltCard from "@/components/tilt-card";
import {
  applicationSectors,
  contact,
  experiencePillars,
  leadershipContext,
  markets,
  partnershipSignals,
  productFamilies,
  stats,
  tradeFlow,
  worldviewPillars
} from "@/data/site";

export default function HomePage() {
  const [activePillarIndex, setActivePillarIndex] = useState(1);
  const activePillar = worldviewPillars[activePillarIndex];
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <SiteShell>
      <PageTransition>
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
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#d8c49c] bg-white/60 px-4 py-2 text-xs uppercase tracking-[0.28em] text-[#7d5c2c] backdrop-blur-sm"
            >
              <Sparkles className="h-4 w-4" />
              From Indian farms to global formulations
            </motion.div>
            <h1 className="max-w-4xl font-serif text-3xl leading-[0.96] text-[#173124] sm:text-5xl md:text-6xl lg:text-[5.6rem]">
              <KineticText text="India, translated into" delay={0.2} />
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="block bg-gradient-to-r from-[#b98342] to-[#8a6433] bg-clip-text text-transparent"
              >
                ingredient confidence for the world.
              </motion.span>
            </h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.5 }}
              className="mt-5 max-w-2xl text-base leading-7 text-[#5a7062] sm:mt-8 sm:text-lg sm:leading-8 lg:text-xl"
            >
              Prish Overseas pairs origin depth, controlled processing, and export composure to serve global formulation teams with traceable powders, dehydrated ingredients, rice, and spice-led supply.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="mt-10 flex flex-col gap-4 sm:flex-row"
            >
              <Link
                href="/products"
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-[#173124] px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-[#1f4433] hover:shadow-[0_8px_30px_rgba(23,49,36,0.22)]"
              >
                Explore products
                <ArrowUpRight className="h-4 w-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
              <Link
                href="/inquiry"
                className="inline-flex items-center justify-center rounded-full border border-[#c9b896] bg-white/60 px-7 py-3.5 text-sm font-semibold text-[#173124] backdrop-blur-sm transition hover:border-[#173124] hover:bg-[#173124] hover:text-white"
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
                <div key={stat.label} className="group rounded-2xl border border-[#e2d6bf] bg-white/50 p-5 transition hover:border-[#c99c63]/50 hover:shadow-[0_16px_40px_rgba(0,0,0,0.06)]">
                  <AnimatedCounter value={stat.value} className="font-serif text-4xl text-[#b98342]" />
                  <p className="mt-3 max-w-[16rem] text-sm leading-6 text-[#5a7062]">{stat.label}</p>
                  <div
                    className="mt-5 h-0.5 rounded-full bg-gradient-to-r from-[#c99c63] to-transparent transition-all duration-700 group-hover:w-full"
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

      <section className="relative mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-10">
        <Marquee speed={35} className="py-4">
          {["FSSAI Compliant", "ISO/HACCP Aligned", "2500+ MT Monthly Capacity", "280+ Sunshine Days", "100+ Specifications Supported", "No Artificial Colors", "Batch-wise Consistency", "Third-Party Testing", "Export Documentation Support", "Multi-Origin Sourcing"].map((item) => (
            <span key={item} className="flex items-center gap-3 whitespace-nowrap text-sm text-[#5a7062]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#c99c63]" />
              {item}
            </span>
          ))}
        </Marquee>
      </section>

      <section className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-10">
        <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
          <AnimatedSection className="rounded-2xl border border-[#e2d6bf] bg-white/50 p-5 backdrop-blur-sm sm:p-8">
            <p className="text-xs uppercase tracking-[0.35em] text-[#8a6433]">Why global buyers partner</p>
            <h2 className="mt-4 font-serif text-4xl text-[#173124]">Origin integrity, export composure, and ingredient depth from India.</h2>
            <p className="mt-5 text-sm leading-7 text-[#5a7062]">
              Prish Overseas frames sourcing philosophy, processing control, and buyer readiness into a premium export experience.
            </p>
          </AnimatedSection>
          <div className="grid gap-4 sm:grid-cols-2">
            {experiencePillars.map((pillar, index) => (
              <AnimatedSection
                key={pillar.title}
                delay={index * 0.1}
              >
                <TiltCard className="group h-full rounded-2xl border border-[#e2d6bf] bg-white/50 p-6 transition hover:border-[#c99c63]/40 hover:shadow-[0_16px_40px_rgba(0,0,0,0.06)]">
                  <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[#173124] text-white transition group-hover:bg-[#1f4433]">
                    {index === 0 ? <Leaf className="h-5 w-5" /> : index === 1 ? <CircleDashed className="h-5 w-5" /> : index === 2 ? <BadgeCheck className="h-5 w-5" /> : <Boxes className="h-5 w-5" />}
                  </div>
                  <h3 className="text-2xl font-serif text-[#173124]">{pillar.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-[#5a7062]">{pillar.description}</p>
                </TiltCard>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <section className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-10">
        <AnimatedSection className="mb-10">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.35em] text-[#8a6433]">A more human export story</p>
              <h2 className="mt-4 max-w-3xl font-serif text-3xl text-[#173124] sm:text-5xl">Farm roots, process discipline, and container-ready execution.</h2>
            </div>
            <p className="max-w-xl text-sm leading-7 text-[#5a7062]">
              Sourcing geography, controlled production, and export movement — told through real imagery.
            </p>
          </div>
        </AnimatedSection>
        <OriginGallery />
      </section>

      <section className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-10">
        <div className="grid gap-6 lg:grid-cols-[1.08fr_0.92fr]">
          <AnimatedSection className="rounded-2xl border border-[#e2d6bf] bg-white/50 p-8 backdrop-blur-sm">
            <p className="text-xs uppercase tracking-[0.35em] text-[#8a6433]">{leadershipContext.eyebrow}</p>
            <h2 className="mt-4 max-w-3xl font-serif text-5xl leading-[1.02] text-[#173124]">{leadershipContext.title}</h2>
            <TextReveal text={leadershipContext.summary} className="mt-6 max-w-3xl text-base leading-8 text-[#5a7062]" />
            <TextReveal text={leadershipContext.interpretation} className="mt-5 max-w-3xl text-sm leading-7 text-[#5a7062]" />

            <motion.div
              key={activePillar.title}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.28, ease: "easeOut" }}
              className="mt-6 rounded-xl border border-[#e2d6bf] bg-white/60 p-5"
            >
              <div className="flex items-center justify-between gap-4">
                <p className="text-xs uppercase tracking-[0.28em] text-[#8a6433]">Current worldview lens</p>
                <div className="rounded-full bg-[#173124] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-white">
                  {String(activePillarIndex + 1).padStart(2, "0")}
                </div>
              </div>
              <p className="mt-3 font-serif text-2xl text-[#173124]">{activePillar.title}</p>
              <p className="mt-2 text-sm leading-7 text-[#5a7062]">{activePillar.text}</p>
            </motion.div>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {worldviewPillars.map((pillar, index) => (
                <motion.button
                  key={pillar.title}
                  type="button"
                  onMouseEnter={() => setActivePillarIndex(index)}
                  onFocus={() => setActivePillarIndex(index)}
                  onClick={() => setActivePillarIndex(index)}
                  whileHover={{ y: -6 }}
                  animate={{
                    y: activePillarIndex === index ? -4 : 0,
                    scale: activePillarIndex === index ? 1.01 : 1
                  }}
                  className={`rounded-xl border p-5 text-left transition ${
                    activePillarIndex === index
                      ? "border-[#c99c63] bg-[#173124] text-white shadow-[0_16px_40px_rgba(23,49,36,0.18)]"
                      : "border-[#e2d6bf] bg-white/50 text-[#173124] hover:border-[#c99c63]/40"
                  }`}
                >
                  <p className={`text-xs uppercase tracking-[0.28em] ${activePillarIndex === index ? "text-[#c99c63]" : "text-[#8a6433]"}`}>{pillar.title}</p>
                  <p className={`mt-3 text-sm leading-7 ${activePillarIndex === index ? "text-white/80" : "text-[#5a7062]"}`}>{pillar.text}</p>
                </motion.button>
              ))}
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.1} className="rounded-2xl border border-[#e2d6bf] bg-white/50 p-8 backdrop-blur-sm">
            <div className="overflow-hidden rounded-xl border border-[#e2d6bf]">
              <div className="relative h-[22rem] w-full">
                <Image
                  src="https://commons.wikimedia.org/wiki/Special:FilePath/Official%20Photograph%20of%20Prime%20Minister%20Narendra%20Modi%20Portrait.png"
                  alt="Official portrait of Prime Minister Narendra Modi"
                  fill
                  sizes="(min-width: 1024px) 28vw, 100vw"
                  className="object-cover object-top"
                />
              </div>
            </div>
            <div className="mt-6">
              <p className="text-xs uppercase tracking-[0.35em] text-[#8a6433]">Shared prosperity lens</p>
              <h3 className="mt-4 font-serif text-4xl leading-tight text-[#173124]">An India-rooted philosophy translated into export behaviour.</h3>
              <p className="mt-4 text-sm leading-7 text-[#5a7062]">The spiritual language remains timeless, but its business expression is practical: trust, continuity, quality, and dignity in cross-border trade.</p>
              <div className="mt-6 space-y-3">
                {partnershipSignals.map((signal) => (
                  <div key={signal} className="rounded-xl border border-[#e2d6bf] bg-[#faf5ec] px-4 py-3 text-sm text-[#294135]">
                    {signal}
                  </div>
                ))}
              </div>
              <p className="mt-6 text-xs leading-6 text-[#8a9b8f]">{leadershipContext.sourceNote}</p>
              <Link href="/about" className="group mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#173124] transition hover:text-[#8a6433]">
                Explore the philosophy in detail
                <ArrowUpRight className="h-4 w-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <section id="portfolio" className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-10">
        <AnimatedSection className="mb-12">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.35em] text-[#8a6433]">Portfolio architecture</p>
              <h2 className="mt-4 max-w-3xl font-serif text-5xl text-[#173124]">A portfolio shaped for formulation, sourcing clarity, and export rhythm.</h2>
            </div>
            <Link href="/products" className="group inline-flex items-center gap-2 text-sm font-semibold text-[#173124] transition hover:text-[#8a6433]">
              See detailed category mapping
              <ArrowUpRight className="h-4 w-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>
        </AnimatedSection>

        <div className="grid gap-6 lg:grid-cols-3">
          {productFamilies.map((family, index) => (
            <AnimatedSection
              key={family.title}
              delay={index * 0.1}
              className="group relative overflow-hidden rounded-2xl border border-[#e2d6bf] bg-white/50 p-7 transition hover:border-[#c99c63]/40 hover:shadow-[0_16px_40px_rgba(0,0,0,0.06)]"
            >
              <div className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${family.accent}`} />
              <p className="text-xs uppercase tracking-[0.34em] text-[#8a6433]">{family.eyebrow}</p>
              <h3 className="mt-4 font-serif text-3xl text-[#173124]">{family.title}</h3>
              <p className="mt-4 text-sm leading-7 text-[#5a7062]">{family.description}</p>
              <div className="mt-8 flex flex-wrap gap-2">
                {family.items.map((item) => (
                  <span key={item} className="rounded-full border border-[#e2d6bf] bg-[#faf5ec] px-3 py-2 text-xs uppercase tracking-[0.18em] text-[#5a7062]">
                    {item}
                  </span>
                ))}
              </div>
            </AnimatedSection>
          ))}
        </div>
      </section>

      <section className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-10">
        <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
          <AnimatedSection className="rounded-2xl border border-[#e2d6bf] bg-white/50 p-8 backdrop-blur-sm">
            <p className="text-xs uppercase tracking-[0.35em] text-[#8a6433]">Application focus</p>
            <h2 className="mt-4 max-w-xl font-serif text-4xl text-[#173124]">Built for teams balancing formulation demands with sourcing discipline.</h2>
            <div className="mt-8 flex flex-wrap gap-3">
              {applicationSectors.map((sector) => (
                <div key={sector} className="rounded-full border border-[#e2d6bf] bg-[#faf5ec] px-4 py-3 text-sm text-[#294135] transition hover:border-[#c99c63]/40 hover:bg-white">
                  {sector}
                </div>
              ))}
            </div>
            <div className="mt-8 rounded-xl border border-[#e2d6bf] bg-white/60 p-5">
              <p className="text-xs uppercase tracking-[0.3em] text-[#8a6433]">Positioning frame</p>
              <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
                {["Origin", "Process", "Proof", "Supply"].map((label) => (
                  <div key={label} className="rounded-xl border border-[#e2d6bf] bg-[#faf5ec] px-3 py-4 text-center text-xs uppercase tracking-[0.24em] text-[#5a7062]">
                    {label}
                  </div>
                ))}
              </div>
            </div>
          </AnimatedSection>

          <div className="space-y-4">
            {tradeFlow.map((item, index) => (
              <AnimatedSection
                key={item.stage}
                delay={index * 0.1}
                className="flex gap-4 rounded-2xl border border-[#e2d6bf] bg-white/50 p-5 transition hover:border-[#c99c63]/40 hover:shadow-[0_12px_30px_rgba(0,0,0,0.05)]"
              >
                <div className="flex flex-col items-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#173124] text-white">
                    <PackageCheck className="h-5 w-5" />
                  </div>
                  {index < tradeFlow.length - 1 ? <div className="mt-2 h-full w-px bg-gradient-to-b from-[#c99c63]/40 to-transparent" /> : null}
                </div>
                <div className="pt-1">
                  <p className="text-xs uppercase tracking-[0.32em] text-[#8a6433]">{item.stage}</p>
                  <p className="mt-2 text-2xl font-serif text-[#173124]">{item.stage} with intent</p>
                  <p className="mt-2 text-sm leading-7 text-[#5a7062]">{item.text}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <section className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-10">
        <AnimatedSection className="mb-10">
          <p className="text-xs uppercase tracking-[0.35em] text-[#8a6433]">Global reach</p>
          <h2 className="mt-4 max-w-2xl font-serif text-5xl text-[#173124]">A calm export presence moving from India into key commercial markets.</h2>
        </AnimatedSection>
        <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <AnimatedSection>
            <ExportMap />
          </AnimatedSection>
          <AnimatedSection delay={0.1} className="rounded-2xl border border-[#e2d6bf] bg-white/50 p-8 backdrop-blur-sm">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.35em] text-[#8a6433]">Market clusters</p>
                <h3 className="mt-4 font-serif text-4xl text-[#173124]">Trusted across strategic destinations.</h3>
              </div>
              <Globe2 className="h-8 w-8 shrink-0 text-[#8a6433]" />
            </div>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {markets.map((market, index) => (
                <div key={market} className="rounded-xl border border-[#e2d6bf] bg-[#faf5ec] p-5 transition hover:border-[#c99c63]/40 hover:bg-white">
                  <p className="text-xs uppercase tracking-[0.3em] text-[#8a6433]/80">Market {String(index + 1).padStart(2, "0")}</p>
                  <p className="mt-3 text-2xl font-serif text-[#173124]">{market}</p>
                </div>
              ))}
            </div>
            <div className="mt-8 rounded-xl border border-[#d8c49c] bg-[#fff8ea] p-5 text-sm leading-7 text-[#5a7062]">
              <p className="text-xs uppercase tracking-[0.3em] text-[#8a6433]">Contact node</p>
              <p className="mt-3 font-semibold text-[#173124]">{contact.company}</p>
              {contact.address.map((line) => (
                <p key={line}>{line}</p>
              ))}
              <Link href="/about" className="group mt-4 inline-flex items-center gap-2 text-sm text-[#173124] transition hover:text-[#8a6433]">
                Explore sourcing story
                <ArrowUpRight className="h-4 w-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <section id="contact" className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-10 lg:pb-28">
        <AnimatedSection className="mb-12">
          <p className="text-xs uppercase tracking-[0.35em] text-[#8a6433]">Inquiry experience</p>
          <h2 className="mt-4 max-w-3xl font-serif text-5xl text-[#173124]">A proper intake flow for buyers who need more than a generic contact button.</h2>
        </AnimatedSection>
        <InquiryForm mode="compact" />
      </section>
      </PageTransition>
    </SiteShell>
  );
}
