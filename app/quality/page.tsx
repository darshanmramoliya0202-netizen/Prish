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
      <section className="mx-auto max-w-7xl px-4 pb-12 pt-10 sm:px-6 sm:pb-16 sm:pt-16 lg:px-10 lg:pt-24">
        <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.4em] text-emerald-600">Quality & Export Readiness</p>
            <h1 className="mt-5 max-w-4xl font-sans text-3xl font-bold text-[#0f172a] sm:text-5xl lg:text-6xl">Processing control and documentation discipline you can verify.</h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
              Trust here is built through operational detail: how raw materials are handled, how consistency is protected, and how export-specific requirements are supported across markets.
            </p>
          </div>
          <div className="grid gap-4">
            {qualitySignals.map((signal) => (
              <div key={signal.title} className="rounded-2xl border border-slate-200 bg-white p-6">
                <p className="text-xs uppercase tracking-[0.34em] text-saffron">{signal.title}</p>
                <ul className="mt-4 space-y-3 text-sm leading-7 text-slate-600">
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
            <div key={step.title} className="rounded-2xl border border-slate-200 bg-white p-6">
              <p className="text-xs uppercase tracking-[0.32em] text-saffron">Stage {String(index + 1).padStart(2, "0")}</p>
              <h2 className="mt-4 font-sans text-2xl font-bold text-[#0f172a]">{step.title}</h2>
              <p className="mt-4 text-sm leading-7 text-slate-600">{step.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-12 sm:px-8 lg:px-10 lg:pb-24">
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
            <SectionHeading
              eyebrow="Packaging matrix"
              title="Formats aligned to handling, storage, and buyer preference."
              description="Packaging support is presented as a trade-enabling service, not an afterthought."
            />
            <ul className="mt-8 space-y-4 text-sm leading-7 text-slate-600">
              {packagingMatrix.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-slate-300 bg-slate-50 p-6 sm:p-8">
            <SectionHeading
              eyebrow="Documentation support"
              title="Destination-aware export support for serious commercial conversations."
              description="Beyond production, the workflow includes the paperwork and timing discipline global buyers expect."
            />
            <ul className="mt-8 space-y-4 text-sm leading-7 text-slate-600">
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
