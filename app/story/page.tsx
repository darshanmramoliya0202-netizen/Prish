import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo";
import { story } from "@/content/story";
import { site } from "@/content/site";
import { regions } from "@/content/regions";
import {
  Accent,
  ButtonLink,
  Pill,
  SectionHeading,
} from "@/components/ui/primitives";
import { Portrait } from "@/components/story/Portrait";
import { SitePhoto } from "@/components/ui/SitePhoto";
import { Worldview } from "@/components/home/Worldview";
import { SpiceRouteMap } from "@/components/story/SpiceRouteMap";
import { IconArrow, IconWhatsApp } from "@/components/ui/icons";
import { waLink } from "@/lib/whatsapp";
import { cta } from "@/content/copy";

export const metadata: Metadata = createPageMetadata({
  title: "Our story — Khet Se, from the field",
  description:
    "A farming family from Saurashtra, now exporting Indian-origin ingredients with the paperwork global buyers need. Heritage told in seasons, not dates.",
  path: "/story",
});

export default function StoryPage() {
  const h = story.heritage;
  return (
    <>
      <section
        data-theme="dark"
        className="relative overflow-hidden grain bg-forest-950 pt-32 pb-20 text-cream-50 md:pt-40 md:pb-28"
      >
        <div className="container-x">
          <Accent
            accent={h.accent}
            translation={h.accent.translation}
            size="lg"
            className="text-gold-400"
          />
          <h1 className="mt-10 max-w-4xl text-display-xl">{h.headline}</h1>
          <div className="mt-8 max-w-2xl space-y-4 text-lead text-cream-100/85">
            {h.lines.map((l) => (
              <p key={l}>{l}</p>
            ))}
          </div>
        </div>
      </section>

      <section
        data-theme="light"
        className="bg-cream-50 py-section text-ink-900"
      >
        <div className="container-x">
          <SectionHeading
            eyebrow="Heritage, in seasons"
            title="What a year looks like."
            sub="We do not count years. We count seasons — the same four every generation has counted."
          />
          <ol className="mt-14 grid gap-8 md:grid-cols-4">
            {h.seasons.map((s, i) => (
              <li key={s.key} className="border-t-2 border-gold-500 pt-6">
                <SitePhoto
                  id={`season-${s.key}`}
                  alt=""
                  sizes="(min-width: 768px) 22vw, 90vw"
                  className="mb-6 aspect-[4/3] w-full rounded-lg object-cover"
                />
                <p className="font-display text-display-lg text-forest-900 leading-none">
                  0{i + 1}
                </p>
                <h3 className="mt-4 font-display text-display-md">{s.title}</h3>
                <p className="mt-3 text-body text-ink-700">{s.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section
        data-theme="light"
        className="bg-cream-100 py-section text-ink-900"
      >
        <div className="container-x grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeading
              eyebrow="Ancient roots"
              title="Gujarat has been shipping spices for four thousand years."
              sub="Before there were incoterms there were monsoon winds. A few facts, with sources."
            />
            <ol className="mt-10 space-y-8">
              {story.ancientRoots.map((r) => (
                <li key={r.title}>
                  <h3 className="font-display text-display-md">{r.title}</h3>
                  <p className="mt-2 text-body text-ink-700">{r.text}</p>
                  <p className="mt-2 text-small text-ink-500">
                    Source: {r.source}
                  </p>
                </li>
              ))}
            </ol>
          </div>
          <div className="lg:col-span-7">
            <SpiceRouteMap className="w-full rounded-xl bg-forest-950 p-4 text-cream-50 shadow-deep" />
          </div>
        </div>
      </section>

      <section
        data-theme="light"
        className="bg-cream-50 py-section text-ink-900"
      >
        <div className="container-x grid items-center gap-12 lg:grid-cols-12">
          {story.people.map((person, i) => (
            <div
              key={person.name}
              className={
                i === 0 ? "lg:col-span-5" : "lg:col-span-5 lg:col-start-8"
              }
            >
              <Portrait person={person} />
            </div>
          ))}
          <div className="lg:col-span-7">
            <SectionHeading
              eyebrow="The people"
              title={`${story.people[0]?.name ?? "Yash Talaviya"}, ${story.people[0]?.role ?? "Director"}`}
            />
            <div className="mt-6 space-y-4 text-lead text-ink-700">
              {story.people[0]?.note.map((l) => (
                <p key={l}>{l}</p>
              ))}
            </div>
            <a
              href={waLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex h-12 items-center gap-2 rounded-full bg-[#25D366] px-6 font-semibold text-[#062a16]"
              data-umami-event="whatsapp_click"
              data-umami-event-placement="story"
            >
              <IconWhatsApp /> {cta.talk}
            </a>
          </div>
        </div>
      </section>

      <section
        data-theme="light"
        className="bg-cream-100 py-section text-ink-900"
      >
        <div className="container-x grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeading
              eyebrow="How we work"
              title="Farm-rooted. Export-documented."
            />
          </div>
          <div className="space-y-5 text-lead text-ink-700 lg:col-span-7">
            <p>
              We are farm-rooted, with our own and partner processing across the
              growing belts. Selection of premium raw material, low-temperature
              drying, fine milling and hygienic packing — batch-wise, with
              third-party testing on request.
            </p>
            <p>
              We serve {regions.map((r) => r.name).join(", ")}. We quote{" "}
              {site.incoterms.join(" and ")}. We answer on WhatsApp.
            </p>
            <ul className="flex flex-wrap gap-2 pt-2">
              {[
                "No artificial colours or flavours",
                "No adulteration",
                "Batch-wise consistency",
                "Export-ready documentation",
              ].map((x) => (
                <li key={x}>
                  <Pill tone="ok">{x}</Pill>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <Worldview compact />

      {story.stories.length ? (
        <section
          data-theme="light"
          className="bg-cream-50 py-section text-ink-900"
        >
          <div className="container-x">
            <SectionHeading
              eyebrow="From buyers"
              title="What actually happened."
              sub="Anonymised, real. We only publish what we can stand behind."
            />
            <ul className="mt-12 grid gap-6 md:grid-cols-3">
              {story.stories.map((s, i) => (
                <li
                  key={i}
                  className="rounded-lg border border-ink-900/10 bg-cream-100 p-6"
                >
                  <p className="text-body text-ink-700">{s.text}</p>
                  <p className="mt-4 text-small text-ink-500">
                    {s.product} · {regions.find((r) => r.id === s.region)?.name}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      <section
        data-theme="dark"
        className="bg-forest-950 py-16 text-cream-50 md:py-24"
      >
        <div className="container-x flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between">
          <h2 className="text-display-lg">
            Tell us what you&apos;re sourcing.
          </h2>
          <ButtonLink href="/inquiry" size="lg">
            {cta.kit} <IconArrow />
          </ButtonLink>
        </div>
      </section>
    </>
  );
}
