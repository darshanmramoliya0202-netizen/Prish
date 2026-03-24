import type { Metadata } from "next";
import Image from "next/image";
import modiPortrait from "../../modi-g-3.jpg";
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
        <div className="grid gap-10 rounded-[2.6rem] border border-wheat/25 bg-white/85 p-8 shadow-card-light lg:grid-cols-[1.05fr_0.95fr] sm:p-10">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.4em] text-gold-warm">About</p>
            <h1 className="mt-5 max-w-4xl font-serif text-4xl text-ink sm:text-5xl">Indian agricultural depth meets export discipline.</h1>
            <div className="mt-6 space-y-5 text-base leading-8 text-ink-soft">
              {aboutStory.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {stats.map((stat) => (
              <div key={stat.label} className="rounded-[2rem] border border-wheat/20 bg-parchment/35 p-6 shadow-card-light">
                <p className="font-serif text-3xl text-gold-warm">{stat.value}</p>
                <p className="mt-3 text-sm leading-7 text-ink-soft">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-12 sm:px-8 lg:px-10 lg:py-20">
        <div className="rounded-[2.2rem] border border-wheat/25 bg-white/85 p-8 shadow-card-light">
          <SectionHeading
            eyebrow="Operating principles"
            title="The company narrative is built on method, not marketing noise."
            description="These principles explain why the site positions Prish Overseas as an origin-to-export partner instead of a generic broker."
          />
        </div>
        <div className="mt-10 grid gap-5 lg:grid-cols-4">
          {aboutPrinciples.map((principle) => (
            <div key={principle.title} className="rounded-[2rem] border border-wheat/20 bg-parchment/35 p-6 shadow-card-light">
              <h2 className="font-serif text-2xl text-ink">{principle.title}</h2>
              <p className="mt-4 text-sm leading-7 text-ink-soft">{principle.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-12 sm:px-8 lg:px-10 lg:py-20">
        <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="rounded-[2.2rem] border border-wheat/25 bg-white/85 p-8 shadow-card-light">
            <p className="text-xs uppercase tracking-[0.35em] text-gold-warm">{leadershipContext.eyebrow}</p>
            <h2 className="mt-4 max-w-3xl font-serif text-3xl leading-[1.1] text-ink sm:text-4xl">{leadershipContext.title}</h2>
            <p className="mt-6 text-base leading-8 text-ink-soft">{leadershipContext.summary}</p>
            <p className="mt-5 text-sm leading-7 text-ink-soft">{leadershipContext.interpretation}</p>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {worldviewPillars.map((pillar) => (
                <div key={pillar.title} className="rounded-[1.8rem] border border-wheat/20 bg-parchment/35 p-5">
                  <p className="text-xs uppercase tracking-[0.3em] text-gold-warm">{pillar.title}</p>
                  <p className="mt-3 text-sm leading-7 text-ink-soft">{pillar.text}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[2.2rem] border border-wheat/25 bg-parchment/35 p-8 shadow-card-light">
            <div className="overflow-hidden rounded-[1.8rem] border border-wheat/20 bg-white/80">
              <div className="relative h-[24rem] w-full">
                <Image
                  src={modiPortrait}
                  alt="Official portrait of Prime Minister Narendra Modi"
                  fill
                  sizes="(min-width: 1024px) 28vw, 100vw"
                  className="object-cover object-top"
                />
              </div>
            </div>
            <h3 className="mt-6 font-serif text-2xl text-ink">What this means for Prish Overseas</h3>
            <p className="mt-4 text-sm leading-7 text-ink-soft">The philosophy remains cultural in origin, but its business expression is practical: steadiness, trust, and respect carried from Indian origin to international partnerships.</p>
            <div className="mt-6 space-y-3">
              {partnershipSignals.map((signal) => (
                <div key={signal} className="rounded-[1.2rem] border border-wheat/20 bg-white/85 px-4 py-3 text-sm text-ink shadow-card-light">
                  {signal}
                </div>
              ))}
            </div>
            <p className="mt-6 text-xs leading-6 text-ink-soft">{leadershipContext.sourceNote}</p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-12 sm:px-8 lg:px-10 lg:pb-24">
        <div className="rounded-[2.2rem] border border-wheat/25 bg-white/85 p-8 shadow-card-light">
          <SectionHeading
            eyebrow="Origin network"
            title="Indian growing regions interpreted as a sourcing system."
            description="The sourcing story is broader than one geography. Prish Overseas draws from multiple Indian belts to create flexibility, diversity, and continuity for global buyers."
          />
        </div>
        <div className="mt-10 grid gap-5 lg:grid-cols-2">
          {originRegions.map((region, index) => (
            <div key={region.region} className="flex gap-4 rounded-[2rem] border border-wheat/20 bg-parchment/35 p-6 shadow-card-light">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-leaf-dark text-sm font-semibold text-parchment">
                {String(index + 1).padStart(2, "0")}
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.32em] text-gold-warm">{region.region}</p>
                <p className="mt-3 text-sm leading-7 text-ink-soft">{region.focus}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </SiteShell>
  );
}
