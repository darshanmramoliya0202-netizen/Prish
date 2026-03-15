import type { Metadata } from "next";
import SiteShell from "@/components/site-shell";
import SectionHeading from "@/components/section-heading";
import { aboutPrinciples, aboutStory, originRegions } from "@/data/content";
import { createPageMetadata } from "@/data/seo";
import { stats } from "@/data/site";

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
      <section className="mx-auto max-w-7xl px-6 pb-16 pt-16 sm:px-8 lg:px-10 lg:pt-24">
        <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-copper/80">About</p>
            <h1 className="mt-5 max-w-4xl font-serif text-5xl text-mist sm:text-6xl">A sourcing partner shaped by Indian agricultural depth and export discipline.</h1>
            <div className="mt-6 space-y-5 text-base leading-8 text-mist/68">
              {aboutStory.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {stats.map((stat) => (
              <div key={stat.label} className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6">
                <p className="font-serif text-4xl text-copper">{stat.value}</p>
                <p className="mt-3 text-sm leading-7 text-mist/66">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-12 sm:px-8 lg:px-10 lg:py-20">
        <SectionHeading
          eyebrow="Operating principles"
          title="The company narrative is built on method, not marketing noise."
          description="These principles explain why the site positions Prish Overseas as an origin-to-export partner instead of a generic broker."
        />
        <div className="mt-10 grid gap-5 lg:grid-cols-4">
          {aboutPrinciples.map((principle) => (
            <div key={principle.title} className="rounded-[2rem] border border-white/10 bg-white/[0.035] p-6">
              <h2 className="font-serif text-3xl text-mist">{principle.title}</h2>
              <p className="mt-4 text-sm leading-7 text-mist/66">{principle.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-12 sm:px-8 lg:px-10 lg:pb-24">
        <SectionHeading
          eyebrow="Origin network"
          title="Indian growing regions interpreted as a sourcing system."
          description="The sourcing story is broader than one geography. Prish Overseas draws from multiple Indian belts to create flexibility, diversity, and continuity for global buyers."
        />
        <div className="mt-10 grid gap-5 lg:grid-cols-2">
          {originRegions.map((region, index) => (
            <div key={region.region} className="flex gap-4 rounded-[2rem] border border-white/10 bg-white/[0.035] p-6">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-copper text-sm font-semibold text-ink">
                {String(index + 1).padStart(2, "0")}
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.32em] text-copper/80">{region.region}</p>
                <p className="mt-3 text-sm leading-7 text-mist/66">{region.focus}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </SiteShell>
  );
}
