"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
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
import ExportMap from "@/components/export-map";
import IngredientCloud from "@/components/ingredient-cloud";
import InquiryForm from "@/components/inquiry-form";
import OriginGallery from "@/components/origin-gallery";
import SiteShell from "@/components/site-shell";
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

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 }
};

export default function HomePage() {
  const [activePillarIndex, setActivePillarIndex] = useState(1);
  const activePillar = worldviewPillars[activePillarIndex];

  return (
    <SiteShell>
      <section className="relative mx-auto max-w-7xl px-6 pb-20 pt-16 sm:px-8 lg:px-10 lg:pt-24">
        <div className="overflow-hidden rounded-[2.8rem] border border-[#dccfb7] bg-[#f7efdf]/96 p-8 shadow-[0_30px_90px_rgba(8,24,18,0.18)] sm:p-10">
          <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative z-10"
          >
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#d8c49c] bg-[#fff8ea] px-4 py-2 text-xs uppercase tracking-[0.28em] text-[#7d5c2c]">
              <Sparkles className="h-4 w-4" />
              From Indian farms to global formulations
            </div>
            <h1 className="max-w-4xl font-serif text-6xl leading-[0.92] text-[#173124] sm:text-7xl lg:text-[6.2rem]">
              India, translated into
              <span className="block text-[#b98342]">ingredient confidence for the world.</span>
            </h1>
            <p className="mt-8 max-w-2xl text-lg leading-8 text-[#365241] sm:text-xl">
              Prish Overseas pairs origin depth, controlled processing, and export composure to serve global formulation teams with traceable powders, dehydrated ingredients, rice, and spice-led supply.
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Link
                href="/products"
                className="inline-flex items-center justify-center rounded-full bg-[#c99c63] px-6 py-3 text-sm font-semibold text-[#173124] transition hover:bg-[#ddb786]"
              >
                Explore products
              </Link>
              <Link
                href="/inquiry"
                className="inline-flex items-center justify-center rounded-full border border-[#d8c49c] bg-[#fff8ea] px-6 py-3 text-sm font-semibold text-[#173124] transition hover:border-[#c99c63] hover:bg-[#f3ead6]"
              >
                Start an inquiry
              </Link>
            </div>

            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              {stats.map((stat, index) => (
                <div key={stat.label} className="rounded-[1.6rem] border border-[#dccfb7] bg-[#fff7e8] p-5 shadow-[0_14px_34px_rgba(24,50,37,0.08)]">
                  <p className="text-4xl font-serif text-[#b98342]">{stat.value}</p>
                  <p className="mt-3 max-w-[16rem] text-sm leading-6 text-[#496052]">{stat.label}</p>
                  <div
                    className="mt-5 h-1 rounded-full bg-gradient-to-r from-[#c99c63] via-[#efdfc2] to-transparent"
                    style={{ width: `${78 - index * 12}%` }}
                  />
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.1, ease: "easeOut" }}
            className="relative mx-auto w-full max-w-xl"
          >
            <IngredientCloud />
          </motion.div>
        </div>
        </div>
      </section>

      <section className="relative mx-auto max-w-7xl px-6 py-12 sm:px-8 lg:px-10">
        <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}
            variants={fadeUp}
            transition={{ duration: 0.6 }}
            className="rounded-[2rem] border border-[#dccfb7] bg-[#f7efdf] p-8 shadow-[0_20px_60px_rgba(19,45,34,0.1)]"
          >
            <p className="text-xs uppercase tracking-[0.35em] text-[#8a6433]">Why global buyers partner</p>
            <h2 className="mt-4 font-serif text-4xl text-[#173124]">Origin integrity, export composure, and ingredient depth from India.</h2>
            <p className="mt-5 text-sm leading-7 text-[#496052]">
              The website experience now frames Prish Overseas through sourcing philosophy, processing control, and buyer readiness rather than brochure-style presentation.
            </p>
          </motion.div>
          <div className="grid gap-4 sm:grid-cols-2">
            {experiencePillars.map((pillar, index) => (
              <motion.article
                key={pillar.title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.25 }}
                variants={fadeUp}
                transition={{ duration: 0.55, delay: index * 0.08 }}
                className="rounded-[2rem] border border-[#dccfb7] bg-[#fff8ea] p-6 shadow-[0_18px_44px_rgba(24,50,37,0.08)]"
              >
                <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-[#d8c49c] bg-[#f4ead7] text-[#8a6433]">
                  {index === 0 ? <Leaf className="h-5 w-5" /> : index === 1 ? <CircleDashed className="h-5 w-5" /> : index === 2 ? <BadgeCheck className="h-5 w-5" /> : <Boxes className="h-5 w-5" />}
                </div>
                <h3 className="text-2xl font-serif text-[#173124]">{pillar.title}</h3>
                <p className="mt-3 text-sm leading-7 text-[#496052]">{pillar.description}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="relative mx-auto max-w-7xl px-6 py-14 sm:px-8 lg:px-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeUp}
          transition={{ duration: 0.6 }}
          className="mb-10 rounded-[2.2rem] border border-[#dccfb7] bg-[#f7efdf]/95 p-8 shadow-[0_18px_50px_rgba(19,45,34,0.08)]"
        >
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.35em] text-[#8a6433]">A more human export story</p>
              <h2 className="mt-4 max-w-3xl font-serif text-5xl text-[#173124]">Farm roots, process discipline, and container-ready execution shown through real imagery.</h2>
            </div>
            <p className="max-w-xl text-sm leading-7 text-[#496052]">
              The homepage now leans into sourcing geography, controlled production, and export movement instead of abstract visual metaphors.
            </p>
          </div>
        </motion.div>
        <OriginGallery />
      </section>

      <section className="relative mx-auto max-w-7xl px-6 py-14 sm:px-8 lg:px-10">
        <div className="grid gap-6 lg:grid-cols-[1.08fr_0.92fr]">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeUp}
            transition={{ duration: 0.6 }}
            className="rounded-[2.3rem] border border-[#dccfb7] bg-[#f7efdf] p-8 shadow-[0_20px_60px_rgba(19,45,34,0.1)]"
          >
            <p className="text-xs uppercase tracking-[0.35em] text-[#8a6433]">{leadershipContext.eyebrow}</p>
            <h2 className="mt-4 max-w-3xl font-serif text-5xl leading-[1.02] text-[#173124]">{leadershipContext.title}</h2>
            <p className="mt-6 max-w-3xl text-base leading-8 text-[#496052]">{leadershipContext.summary}</p>
            <p className="mt-5 max-w-3xl text-sm leading-7 text-[#496052]">{leadershipContext.interpretation}</p>

            <motion.div
              key={activePillar.title}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.28, ease: "easeOut" }}
              className="mt-6 rounded-[1.8rem] border border-[#dccfb7] bg-[#fff8ea] p-5 shadow-[0_10px_24px_rgba(19,45,34,0.06)]"
            >
              <div className="flex items-center justify-between gap-4">
                <p className="text-xs uppercase tracking-[0.28em] text-[#8a6433]">Current worldview lens</p>
                <div className="rounded-full border border-[#d8c49c] bg-[#f7efdf] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#365241]">
                  {String(activePillarIndex + 1).padStart(2, "0")}
                </div>
              </div>
              <p className="mt-3 font-serif text-2xl text-[#173124]">{activePillar.title}</p>
              <p className="mt-2 text-sm leading-7 text-[#496052]">{activePillar.text}</p>
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
                  className={`rounded-[1.7rem] border p-5 text-left transition ${
                    activePillarIndex === index
                      ? "border-[#c99c63] bg-[#173124] text-[#fff8ed] shadow-[0_18px_40px_rgba(23,49,36,0.18)]"
                      : "border-[#dccfb7] bg-[#fff8ea] text-[#173124]"
                  }`}
                >
                  <p className="text-xs uppercase tracking-[0.28em] text-[#8a6433]">{pillar.title}</p>
                  <p className={`mt-3 text-sm leading-7 ${activePillarIndex === index ? "text-[#f3ead7]" : "text-[#496052]"}`}>{pillar.text}</p>
                </motion.button>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeUp}
            transition={{ duration: 0.6, delay: 0.08 }}
            className="rounded-[2.3rem] border border-[#dccfb7] bg-[#fff8ea] p-8 shadow-[0_20px_60px_rgba(19,45,34,0.08)]"
          >
            <div className="overflow-hidden rounded-[1.8rem] border border-[#dccfb7] bg-[#f2e4c8]">
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
              <p className="mt-4 text-sm leading-7 text-[#496052]">The spiritual language remains timeless, but its business expression is practical: trust, continuity, quality, and dignity in cross-border trade.</p>
              <div className="mt-6 space-y-3">
                {partnershipSignals.map((signal) => (
                  <div key={signal} className="rounded-[1.2rem] border border-[#dccfb7] bg-[#f7efdf] px-4 py-3 text-sm text-[#294135] shadow-[0_8px_20px_rgba(19,45,34,0.04)]">
                    {signal}
                  </div>
                ))}
              </div>
              <p className="mt-6 text-xs leading-6 text-[#6a796f]">{leadershipContext.sourceNote}</p>
              <Link href="/about" className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#173124] transition hover:text-[#365241]">
                Explore the philosophy in detail
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <section id="portfolio" className="relative mx-auto max-w-7xl px-6 py-24 sm:px-8 lg:px-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
          variants={fadeUp}
          transition={{ duration: 0.6 }}
          className="mb-12 rounded-[2.2rem] border border-[#dccfb7] bg-[#f7efdf]/95 p-8 shadow-[0_18px_50px_rgba(19,45,34,0.08)]"
        >
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.35em] text-[#8a6433]">Portfolio architecture</p>
              <h2 className="mt-4 max-w-3xl font-serif text-5xl text-[#173124]">A portfolio shaped for formulation, sourcing clarity, and export rhythm.</h2>
            </div>
            <Link href="/products" className="inline-flex items-center gap-2 text-sm font-semibold text-[#173124] transition hover:text-[#365241]">
              See detailed category mapping
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </motion.div>

        <div className="grid gap-6 lg:grid-cols-3">
          {productFamilies.map((family, index) => (
            <motion.article
              key={family.title}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.25 }}
              variants={fadeUp}
              transition={{ duration: 0.55, delay: index * 0.08 }}
              className="group relative overflow-hidden rounded-[2rem] border border-[#dccfb7] bg-[#f7efdf] p-7 shadow-[0_20px_60px_rgba(16,36,28,0.1)]"
            >
              <div className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${family.accent}`} />
              <div className="absolute right-[-3rem] top-[-2rem] h-32 w-32 rounded-full bg-[#fff3de] blur-2xl transition duration-500 group-hover:scale-125" />
              <p className="text-xs uppercase tracking-[0.34em] text-[#8a6433]">{family.eyebrow}</p>
              <h3 className="mt-4 font-serif text-3xl text-[#173124]">{family.title}</h3>
              <p className="mt-4 text-sm leading-7 text-[#496052]">{family.description}</p>
              <div className="mt-8 flex flex-wrap gap-2">
                {family.items.map((item) => (
                  <span key={item} className="rounded-full border border-[#dccfb7] bg-[#fff8ea] px-3 py-2 text-xs uppercase tracking-[0.18em] text-[#496052]">
                    {item}
                  </span>
                ))}
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      <section className="relative mx-auto max-w-7xl px-6 py-24 sm:px-8 lg:px-10">
        <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}
            variants={fadeUp}
            transition={{ duration: 0.6 }}
            className="rounded-[2.2rem] border border-[#dccfb7] bg-[#f7efdf] p-8 shadow-[0_20px_60px_rgba(19,45,34,0.08)]"
          >
            <p className="text-xs uppercase tracking-[0.35em] text-[#8a6433]">Application focus</p>
            <h2 className="mt-4 max-w-xl font-serif text-4xl text-[#173124]">Built for teams balancing formulation demands with sourcing discipline.</h2>
            <div className="mt-8 flex flex-wrap gap-3">
              {applicationSectors.map((sector) => (
                <div key={sector} className="rounded-full border border-[#d8c49c] bg-[#fff7e8] px-4 py-3 text-sm text-[#294135]">
                  {sector}
                </div>
              ))}
            </div>
            <div className="mt-8 rounded-[1.8rem] border border-[#dccfb7] bg-[#fff8ea] p-5">
              <p className="text-xs uppercase tracking-[0.3em] text-[#8a6433]">Positioning frame</p>
              <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
                {[
                  "Origin",
                  "Process",
                  "Proof",
                  "Supply"
                ].map((label) => (
                  <div key={label} className="rounded-2xl border border-[#dccfb7] bg-[#f8f0de] px-3 py-4 text-center text-xs uppercase tracking-[0.24em] text-[#496052]">
                    {label}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          <div className="space-y-4">
            {tradeFlow.map((item, index) => (
              <motion.div
                key={item.stage}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.25 }}
                variants={fadeUp}
                transition={{ duration: 0.55, delay: index * 0.08 }}
                className="flex gap-4 rounded-[2rem] border border-[#dccfb7] bg-[#fff8ea] p-5 shadow-[0_16px_40px_rgba(19,45,34,0.08)]"
              >
                <div className="flex flex-col items-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#c99c63] text-[#173124]">
                    <PackageCheck className="h-5 w-5" />
                  </div>
                  {index < tradeFlow.length - 1 ? <div className="mt-2 h-full w-px bg-gradient-to-b from-[#c99c63]/60 to-transparent" /> : null}
                </div>
                <div className="pt-1">
                  <p className="text-xs uppercase tracking-[0.32em] text-[#8a6433]">{item.stage}</p>
                  <p className="mt-2 text-2xl font-serif text-[#173124]">{item.stage} with intent</p>
                  <p className="mt-2 text-sm leading-7 text-[#496052]">{item.text}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative mx-auto max-w-7xl px-6 py-24 sm:px-8 lg:px-10">
        <div className="mb-10 rounded-[2.2rem] border border-[#dccfb7] bg-[#f7efdf]/95 p-8 shadow-[0_18px_50px_rgba(19,45,34,0.08)]">
          <div className="flex flex-col gap-3">
            <p className="text-xs uppercase tracking-[0.35em] text-[#8a6433]">Global reach</p>
            <h2 className="max-w-2xl font-serif text-5xl text-[#173124]">A calm export presence moving from India into key commercial markets.</h2>
          </div>
        </div>
        <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}
            variants={fadeUp}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <ExportMap />
          </motion.div>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}
            variants={fadeUp}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="rounded-[2.2rem] border border-[#dccfb7] bg-[#f7efdf] p-8 shadow-[0_20px_60px_rgba(19,45,34,0.08)]"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.35em] text-[#8a6433]">Market clusters</p>
                <h3 className="mt-4 font-serif text-4xl text-[#173124]">Trusted across strategic destinations.</h3>
              </div>
              <Globe2 className="h-8 w-8 shrink-0 text-[#8a6433]" />
            </div>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {markets.map((market, index) => (
                <div key={market} className="rounded-[1.5rem] border border-[#dccfb7] bg-[#fff8ea] p-5">
                  <p className="text-xs uppercase tracking-[0.3em] text-[#8a6433]/80">Market {String(index + 1).padStart(2, "0")}</p>
                  <p className="mt-3 text-2xl font-serif text-[#173124]">{market}</p>
                </div>
              ))}
            </div>
            <div className="mt-8 rounded-[1.8rem] border border-[#d8c49c] bg-[#fff1d8] p-5 text-sm leading-7 text-[#496052]">
              <p className="text-xs uppercase tracking-[0.3em] text-[#8a6433]">Contact node</p>
              <p className="mt-3 font-semibold text-[#173124]">{contact.company}</p>
              {contact.address.map((line) => (
                <p key={line}>{line}</p>
              ))}
              <Link href="/about" className="mt-4 inline-flex items-center gap-2 text-sm text-[#173124] transition hover:text-[#365241]">
                Explore sourcing story
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <section id="contact" className="relative mx-auto max-w-7xl px-6 py-24 sm:px-8 lg:px-10 lg:pb-28">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
          variants={fadeUp}
          transition={{ duration: 0.6 }}
          className="mb-12 rounded-[2.2rem] border border-[#dccfb7] bg-[#f7efdf]/95 p-8 shadow-[0_18px_50px_rgba(19,45,34,0.08)]"
        >
          <p className="text-xs uppercase tracking-[0.35em] text-[#8a6433]">Inquiry experience</p>
          <h2 className="mt-4 max-w-3xl font-serif text-5xl text-[#173124]">A proper intake flow for buyers who need more than a generic contact button.</h2>
        </motion.div>
        <InquiryForm mode="compact" />
      </section>
    </SiteShell>
  );
}
