import type { Metadata } from "next";
import Image from "next/image";
import SiteShell from "@/components/site-shell";
import SectionHeading from "@/components/section-heading";
import { aboutPrinciples, aboutStory, originRegions } from "@/data/content";
import { createPageMetadata } from "@/data/seo";
import { leadershipContext, partnershipSignals, stats, worldviewPillars } from "@/data/site";

export const metadata: Metadata = createPageMetadata({
  title: "About | Indian Sourcing Depth and Export Discipline",
  description:
    "Learn how Prish Overseas combines Indian sourcing networks, controlled processing, and export clarity to support global ingredient buyers.",
  path: "/about",
  keywords: ["about Prish Overseas", "India sourcing partner", "Rajkot exporter"]
});

export default function AboutPage() {
  return (
    <SiteShell>
      <section className="mx-auto max-w-7xl px-4 pb-12 pt-10 sm:px-6 sm:pb-16 sm:pt-16 lg:px-10 lg:pt-24">
        <div className="grid gap-10 rounded-[2.6rem] border border-slate-200 bg-white p-8 shadow-card-light lg:grid-cols-[1.05fr_0.95fr] sm:p-10">
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-saffron">About</p>
            <h1 className="mt-5 max-w-4xl font-serif text-5xl text-[#0f172a] sm:text-6xl">A sourcing partner shaped by Indian agricultural depth and export discipline.</h1>
            <div className="mt-6 space-y-5 text-base leading-8 text-slate-500">
              {aboutStory.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {stats.map((stat) => (
              <div key={stat.label} className="rounded-[2rem] border border-slate-200 bg-slate-50 p-6 shadow-card-light">
                <p className="font-serif text-4xl text-saffron">{stat.value}</p>
                <p className="mt-3 text-sm leading-7 text-slate-500">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-12 sm:px-8 lg:px-10 lg:py-20">
        <div className="rounded-[2.2rem] border border-slate-200 bg-white p-8 shadow-card-light">
          <SectionHeading
            eyebrow="Operating principles"
            title="The company narrative is built on method, not marketing noise."
            description="These principles explain why the site positions Prish Overseas as an origin-to-export partner instead of a generic broker."
          />
        </div>
        <div className="mt-10 grid gap-5 lg:grid-cols-4">
          {aboutPrinciples.map((principle) => (
            <div key={principle.title} className="rounded-[2rem] border border-slate-200 bg-slate-50 p-6 shadow-card-light">
              <h2 className="font-serif text-3xl text-[#0f172a]">{principle.title}</h2>
              <p className="mt-4 text-sm leading-7 text-slate-500">{principle.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-12 sm:px-8 lg:px-10 lg:py-20">
        <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="rounded-[2.2rem] border border-slate-200 bg-white p-8 shadow-card-light">
            <p className="text-xs uppercase tracking-[0.35em] text-saffron">{leadershipContext.eyebrow}</p>
            <h2 className="mt-4 max-w-3xl font-serif text-4xl leading-[1.04] text-[#0f172a] sm:text-5xl">{leadershipContext.title}</h2>
            <p className="mt-6 text-base leading-8 text-slate-500">{leadershipContext.summary}</p>
            <p className="mt-5 text-sm leading-7 text-slate-500">{leadershipContext.interpretation}</p>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {worldviewPillars.map((pillar) => (
                <div key={pillar.title} className="rounded-[1.8rem] border border-slate-200 bg-slate-50 p-5">
                  <p className="text-xs uppercase tracking-[0.3em] text-saffron">{pillar.title}</p>
                  <p className="mt-3 text-sm leading-7 text-slate-500">{pillar.text}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[2.2rem] border border-slate-200 bg-slate-50 p-8 shadow-card-light">
            <div className="overflow-hidden rounded-[1.8rem] border border-slate-200 bg-slate-100">
              <div className="relative h-[24rem] w-full">
                <Image
                  src="https://commons.wikimedia.org/wiki/Special:FilePath/Official%20Photograph%20of%20Prime%20Minister%20Narendra%20Modi%20Portrait.png"
                  alt="Official portrait of Prime Minister Narendra Modi"
                  fill
                  sizes="(min-width: 1024px) 28vw, 100vw"
                  className="object-cover object-top"
                />
              </div>
            </div>
            <h3 className="mt-6 font-serif text-3xl text-[#0f172a]">What this means for Prish Overseas</h3>
            <p className="mt-4 text-sm leading-7 text-slate-500">The philosophy remains cultural in origin, but its business expression is practical: steadiness, trust, and respect carried from Indian origin to international partnerships.</p>
            <div className="mt-6 space-y-3">
              {partnershipSignals.map((signal) => (
                <div key={signal} className="rounded-[1.2rem] border border-slate-200 bg-white px-4 py-3 text-sm text-[#1e293b] shadow-card-light">
                  {signal}
                </div>
              ))}
            </div>
            <p className="mt-6 text-xs leading-6 text-slate-400">{leadershipContext.sourceNote}</p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-12 sm:px-8 lg:px-10 lg:pb-24">
        <div className="rounded-[2.2rem] border border-slate-200 bg-white p-8 shadow-card-light">
          <SectionHeading
            eyebrow="Origin network"
            title="Indian growing regions interpreted as a sourcing system."
            description="The sourcing story is broader than one geography. Prish Overseas draws from multiple Indian belts to create flexibility, diversity, and continuity for global buyers."
          />
        </div>
        <div className="mt-10 grid gap-5 lg:grid-cols-2">
          {originRegions.map((region, index) => (
            <div key={region.region} className="flex gap-4 rounded-[2rem] border border-slate-200 bg-slate-50 p-6 shadow-card-light">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#0f172a] text-sm font-semibold text-white">
                {String(index + 1).padStart(2, "0")}
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.32em] text-saffron">{region.region}</p>
                <p className="mt-3 text-sm leading-7 text-slate-500">{region.focus}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </SiteShell>
  );
}
