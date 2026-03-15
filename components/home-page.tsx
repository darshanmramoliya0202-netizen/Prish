"use client";

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
import { applicationSectors, contact, experiencePillars, markets, productFamilies, stats, tradeFlow } from "@/data/site";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 }
};

export default function HomePage() {
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
          className="mb-10 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between"
        >
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-copper/80">A more human export story</p>
            <h2 className="mt-4 max-w-3xl font-serif text-5xl text-mist">Farm roots, process discipline, and container-ready execution shown through real imagery.</h2>
          </div>
          <p className="max-w-xl text-sm leading-7 text-mist/68">
            The homepage now leans into sourcing geography, controlled production, and export movement instead of abstract visual metaphors.
          </p>
        </motion.div>
        <OriginGallery />
      </section>

      <section id="portfolio" className="relative mx-auto max-w-7xl px-6 py-24 sm:px-8 lg:px-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
          variants={fadeUp}
          transition={{ duration: 0.6 }}
          className="mb-12 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between"
        >
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-copper/80">Portfolio architecture</p>
            <h2 className="mt-4 max-w-3xl font-serif text-5xl text-mist">A portfolio shaped for formulation, sourcing clarity, and export rhythm.</h2>
          </div>
          <Link href="/products" className="inline-flex items-center gap-2 text-sm text-copper transition hover:text-[#e0b885]">
            See detailed category mapping
            <ArrowUpRight className="h-4 w-4" />
          </Link>
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
        <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}
            variants={fadeUp}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <div>
              <p className="text-xs uppercase tracking-[0.35em] text-copper/80">Global reach</p>
              <h2 className="mt-4 max-w-2xl font-serif text-5xl text-mist">A calm export presence moving from India into key commercial markets.</h2>
            </div>
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
          className="mb-12"
        >
          <p className="text-xs uppercase tracking-[0.35em] text-copper/80">Inquiry experience</p>
          <h2 className="mt-4 max-w-3xl font-serif text-5xl text-mist">A proper intake flow for buyers who need more than a generic contact button.</h2>
        </motion.div>
        <InquiryForm mode="compact" />
      </section>
    </SiteShell>
  );
}
