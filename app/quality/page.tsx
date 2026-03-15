import type { Metadata } from "next";
import SiteShell from "@/components/site-shell";
import SectionHeading from "@/components/section-heading";
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
      <section className="mx-auto max-w-7xl px-6 pb-16 pt-16 sm:px-8 lg:px-10 lg:pt-24">
        <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-copper/80">Quality & export readiness</p>
            <h1 className="mt-5 max-w-4xl font-serif text-5xl text-mist sm:text-6xl">Processing control, documentation discipline, and quality signals buyers can evaluate clearly.</h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-mist/68">
              Trust here is built through operational detail: how raw materials are handled, how consistency is protected, and how export-specific requirements are supported across markets.
            </p>
          </div>
          <div className="grid gap-4">
            {qualitySignals.map((signal) => (
              <div key={signal.title} className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6">
                <p className="text-xs uppercase tracking-[0.34em] text-copper/80">{signal.title}</p>
                <ul className="mt-4 space-y-3 text-sm leading-7 text-mist/66">
                  {signal.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-12 sm:px-8 lg:px-10 lg:py-20">
        <SectionHeading
          eyebrow="Process journey"
          title="From selection to export release, the workflow is part of the brand promise."
          description="This page turns brochure proof points into a more complete web narrative around control, consistency, and partner confidence."
        />
        <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {processJourney.map((step, index) => (
            <div key={step.title} className="rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02))] p-6">
              <p className="text-xs uppercase tracking-[0.32em] text-copper/80">Stage {String(index + 1).padStart(2, "0")}</p>
              <h2 className="mt-4 font-serif text-3xl text-mist">{step.title}</h2>
              <p className="mt-4 text-sm leading-7 text-mist/66">{step.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-12 sm:px-8 lg:px-10 lg:pb-24">
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 sm:p-8">
            <SectionHeading
              eyebrow="Packaging matrix"
              title="Formats aligned to handling, storage, and buyer preference."
              description="Packaging support is presented as a trade-enabling service, not an afterthought."
            />
            <ul className="mt-8 space-y-4 text-sm leading-7 text-mist/66">
              {packagingMatrix.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div className="rounded-[2rem] border border-copper/20 bg-copper/10 p-6 sm:p-8">
            <SectionHeading
              eyebrow="Documentation support"
              title="Destination-aware export support for serious commercial conversations."
              description="Beyond production, the workflow includes the paperwork and timing discipline global buyers expect."
            />
            <ul className="mt-8 space-y-4 text-sm leading-7 text-mist/74">
              {documentationSupport.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
