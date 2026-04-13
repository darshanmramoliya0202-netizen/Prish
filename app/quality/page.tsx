import type { Metadata } from "next";
import Image from "next/image";
import SiteShell from "@/components/site-shell";
import SectionHeading from "@/components/section-heading";
import DarkStrip from "@/components/dark-strip";
import BrandButton from "@/components/brand-button";
import { ArrowUpRight } from "lucide-react";
import { documentationSupport, packagingMatrix, processJourney, qualitySignals } from "@/data/content";
import { createPageMetadata } from "@/data/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Quality | Processing Control, Packaging, and Export Documentation",
  description:
    "Review the Prish Overseas quality systems covering processing excellence, packaging formats, compliance readiness, and export documentation support.",
  path: "/quality",
  keywords: ["quality systems", "export documentation", "packaging matrix", "ingredient compliance"]
});

export default function QualityPage() {
  return (
    <SiteShell>
      <div className="pointer-events-none absolute inset-x-0 top-16 h-20 bg-gradient-to-b from-leaf-dark/6 to-transparent" />
      <section className="mx-auto max-w-7xl px-4 pb-12 pt-10 sm:px-6 sm:pb-16 sm:pt-16 lg:px-10 lg:pt-24">
        <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.4em] text-gold-warm">Quality & Export Readiness</p>
            <h1 className="mt-5 max-w-4xl font-serif text-3xl text-ink sm:text-5xl lg:text-6xl">Processing control and documentation discipline you can verify.</h1>
            <p className="mt-6 max-w-xl text-base leading-7 text-ink-soft">
              Trust here is built through operational detail: how raw materials are handled, how consistency is protected, and how export-specific requirements are supported across markets.
            </p>
            <div className="mt-8 relative h-48 w-full overflow-hidden rounded-2xl">
              <Image src="/images/products/turmeric-raw.jpg" alt="Quality processing" fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              <p className="absolute bottom-4 left-4 text-xs font-semibold uppercase tracking-wider text-white">From soil to specification</p>
            </div>
          </div>
          <div className="grid gap-4">
            {qualitySignals.map((signal) => (
              <div key={signal.title} className="rounded-2xl border border-wheat/25 bg-white/80 p-5 shadow-card-light">
                <p className="text-xs uppercase tracking-[0.34em] text-gold-warm">{signal.title}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {signal.items.map((item) => (
                    <span key={item} className="rounded-full border border-wheat/20 bg-parchment/40 px-3 py-1.5 text-xs text-ink-soft">{item}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-12 sm:px-8 lg:px-10 lg:py-20">
        <SectionHeading
          eyebrow="Process journey"
          title="From selection to export release, the workflow is part of the brand promise."
          description="Every step from raw material intake to container release follows a documented, auditable workflow designed for international buyers."
        />
        <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {processJourney.map((step, index) => (
            <div key={step.title} className="rounded-2xl border border-wheat/25 bg-white/80 p-6 shadow-card-light">
              <p className="text-xs uppercase tracking-[0.32em] text-gold-warm">Stage {String(index + 1).padStart(2, "0")}</p>
              <h2 className="mt-4 font-serif text-2xl text-ink">{step.title}</h2>
              <p className="mt-4 text-sm leading-7 text-ink-soft">{step.text}</p>
            </div>
          ))}
        </div>
        <div className="relative mt-10 h-56 w-full overflow-hidden rounded-2xl">
          <Image src="/images/sections/farm-sourcing.png" alt="Spice farm sourcing — Gujarat, India" fill sizes="100vw" className="object-cover object-center" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent" />
          <p className="absolute bottom-4 left-6 text-xs font-semibold uppercase tracking-wider text-white">Farm-linked sourcing &mdash; Gujarat &amp; Rajasthan</p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-12 sm:px-8 lg:px-10 lg:pb-24">
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border border-wheat/25 bg-white/80 p-6 shadow-card-light sm:p-8">
            <SectionHeading
              eyebrow="Packaging matrix"
              title="Formats aligned to handling, storage, and buyer preference."
              description="Multiple packaging formats available across all product lines — aligned to your handling, storage, and market requirements."
            />
            <ul className="mt-8 space-y-4 text-sm leading-7 text-ink-soft">
              {packagingMatrix.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-wheat/25 bg-parchment/35 p-6 shadow-card-light sm:p-8">
            <SectionHeading
              eyebrow="Documentation support"
              title="Destination-aware export support for serious commercial conversations."
              description="Destination-aware documentation prepared for EU, GCC, US, and Southeast Asia — from pre-shipment testing to certificate of origin."
            />
            <ul className="mt-8 space-y-4 text-sm leading-7 text-ink-soft">
              {documentationSupport.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
        <div className="relative mt-10 h-56 w-full overflow-hidden rounded-2xl">
          <Image src="/images/sections/lab-quality-control.png" alt="Quality testing lab — Prish Overseas, Rajkot" fill sizes="100vw" className="object-cover object-center" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent" />
          <p className="absolute bottom-4 left-6 text-xs font-semibold uppercase tracking-wider text-white">Quality control &amp; testing — Rajkot facility</p>
        </div>
      </section>
      <DarkStrip variant="cta">
        <p className="text-xs font-semibold uppercase tracking-[0.4em] text-saffron">Ready to verify?</p>
        <h2 className="mt-4 font-serif text-3xl text-parchment sm:text-4xl">
          See the quality process in action.
        </h2>
        <p className="mt-4 max-w-lg text-base leading-7 text-parchment/70">
          Request a sample kit and receive batch documentation, spec sheets, and lab reports.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <BrandButton variant="primary" href="/inquiry">
            Request samples <ArrowUpRight className="h-4 w-4" />
          </BrandButton>
          <BrandButton
            variant="outline"
            href="https://wa.me/919586616746"
            target="_blank"
            rel="noopener noreferrer"
            className="border-parchment/30 text-parchment hover:bg-parchment/10 hover:text-parchment"
          >
            WhatsApp us
          </BrandButton>
        </div>
      </DarkStrip>
    </SiteShell>
  );
}
