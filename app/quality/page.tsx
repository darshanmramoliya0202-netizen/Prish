import type { Metadata } from "next";
import Image from "next/image";
import { createPageMetadata } from "@/lib/seo";
import { certificates } from "@/content/certificates";
import { regions } from "@/content/regions";
import { site } from "@/content/site";
import { cta, specsDisclaimer } from "@/content/copy";
import { ButtonLink, Pill, SectionHeading } from "@/components/ui/primitives";
import { IconArrow, IconDownload } from "@/components/ui/icons";

export const metadata: Metadata = createPageMetadata({
  title: "Quality & documents — audit us before you buy",
  description:
    "Certificates we hold, how we process and test, what ships with every consignment, and what each market asks for. Spec sheets and catalogue to download.",
  path: "/quality",
});

const processing = [
  {
    t: "Selection of premium-grade raw material",
    d: "Booked in the field by belt, season and grower. Moisture and colour checked before a lot moves.",
  },
  {
    t: "Low-temperature drying",
    d: "To preserve active compounds, colour and aroma — the sun does the first half, controlled drying the second.",
  },
  {
    t: "Fine milling",
    d: "Uniform particle size to your mesh; flakes, kibbled and granules cut to spec.",
  },
  {
    t: "Hygienic processing under controlled conditions",
    d: "Food-grade lines and packing; batch numbers on every pack.",
  },
];
const commitments = [
  "No artificial colours or flavours",
  "No adulteration",
  "Batch-wise consistency",
  "Export-ready documentation",
];
const consignment = [
  "Commercial invoice",
  "Packing list",
  "Certificate of origin",
  "Phytosanitary certificate (where applicable)",
  "Lot-specific Certificate of Analysis",
  "ETO-free declaration (spices, on request)",
  "Exporter-oriented IEC & documentation support",
  "Freight quotation and proforma invoice",
];

export default function QualityPage() {
  const held = certificates.filter((c) => c.status === "held");
  const pending = certificates.filter((c) => c.status === "in_process");
  const withNumbers = held.filter((c) => c.number);
  return (
    <>
      <section
        data-theme="dark"
        className="relative grain bg-forest-950 pt-32 pb-20 text-cream-50 md:pt-40 md:pb-28"
      >
        <div className="container-x">
          <p className="eyebrow text-gold-400">Proof, not promises</p>
          <h1 className="mt-4 max-w-4xl text-display-xl">
            Audit us before you buy.
          </h1>
          <p className="mt-6 max-w-2xl text-lead text-cream-100/85">
            Every real exporter can show you these. If a supplier can&apos;t,
            don&apos;t work with them. Here is what we hold, how we process, and
            what ships with your consignment.
          </p>
        </div>
      </section>

      <section
        data-theme="light"
        className="bg-cream-50 py-section text-ink-900"
      >
        <div className="container-x">
          <SectionHeading
            eyebrow="Certificates & registrations"
            title="What we hold."
            sub={
              withNumbers.length
                ? "Numbers are shown so you can verify them on the issuing portals."
                : "Registration numbers and scans are shared on request while we finish publishing them here."
            }
          />
          <ul
            className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
            role="list"
          >
            {held.map((c) => (
              <li
                key={c.id}
                className="flex flex-col rounded-lg border border-ink-900/10 bg-cream-100 p-6 shadow-paper"
              >
                <p className="eyebrow text-ink-500">{c.issuer}</p>
                <h3 className="mt-3 font-display text-display-md leading-tight">
                  {c.name}
                </h3>
                {c.scope ? (
                  <p className="mt-2 text-small text-ink-700">{c.scope}</p>
                ) : null}
                <div className="mt-auto pt-6">
                  {c.number ? (
                    <>
                      <p className="tabular text-body font-semibold">
                        {c.number}
                      </p>
                      {c.verifyUrl ? (
                        <a
                          href={c.verifyUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-1 inline-block text-small underline underline-offset-4"
                        >
                          Verify on the issuer&apos;s portal →
                        </a>
                      ) : null}
                    </>
                  ) : (
                    <Pill tone="muted">Held · copy on request</Pill>
                  )}
                  {c.preview ? (
                    <div className="relative mt-4 aspect-[4/3] overflow-hidden rounded-md border border-ink-900/10">
                      <Image
                        src={c.preview}
                        alt={`${c.name} — preview`}
                        fill
                        sizes="(min-width:1024px) 30vw, 100vw"
                        className="object-cover"
                      />
                    </div>
                  ) : null}
                </div>
              </li>
            ))}
            {pending.map((c) => (
              <li
                key={c.id}
                className="rounded-lg border border-dashed border-ink-900/20 p-6"
              >
                <p className="eyebrow text-ink-500">{c.issuer}</p>
                <h3 className="mt-3 font-display text-display-md leading-tight">
                  {c.name}
                </h3>
                <p className="mt-4">
                  <Pill tone="gold">Under approval</Pill>
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section
        data-theme="light"
        className="bg-cream-100 py-section text-ink-900"
      >
        <div className="container-x grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeading
              eyebrow="Processing"
              title="Controlled processing. Consistent quality."
            />
            <ul className="mt-8 flex flex-wrap gap-2">
              {commitments.map((x) => (
                <li key={x}>
                  <Pill tone="ok">{x}</Pill>
                </li>
              ))}
            </ul>
          </div>
          <ol className="space-y-6 lg:col-span-7">
            {processing.map((p, i) => (
              <li
                key={p.t}
                className="grid grid-cols-[3rem_1fr] gap-4 border-t border-ink-900/10 pt-6"
              >
                <span className="font-display text-display-md text-forest-900">
                  0{i + 1}
                </span>
                <div>
                  <h3 className="font-display text-display-md">{p.t}</h3>
                  <p className="mt-2 text-body text-ink-700">{p.d}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section
        data-theme="light"
        className="bg-cream-50 py-section text-ink-900"
      >
        <div className="container-x grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeading
              eyebrow="Testing & customisation"
              title="Tested, and specified to your destination."
              sub="Third-party laboratory testing available on request. Specifications and certificates can be customised as per buyer and destination-country requirements."
            />
            <p className="mt-6 text-small text-ink-500">{specsDisclaimer}</p>
          </div>
          <div className="lg:col-span-7">
            <p className="eyebrow text-ink-500">
              What ships with your consignment
            </p>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2">
              {consignment.map((x) => (
                <li
                  key={x}
                  className="flex gap-3 rounded-lg border border-ink-900/10 bg-cream-100 p-4 text-body"
                >
                  <span
                    className="mt-2 size-1.5 shrink-0 rounded-full bg-gold-500"
                    aria-hidden
                  />{" "}
                  {x}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section
        data-theme="light"
        className="bg-cream-100 py-section text-ink-900"
      >
        <div className="container-x">
          <SectionHeading
            eyebrow="By market"
            title="What each market usually asks for."
            sub="General guidance to help you prepare — the specifics are confirmed per product and per shipment."
          />
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {regions.map((r) => (
              <div
                key={r.id}
                className="rounded-lg border border-ink-900/10 bg-cream-50 p-6"
              >
                <h3 className="font-display text-display-md">{r.name}</h3>
                <ul className="mt-4 space-y-2 text-body text-ink-700">
                  {r.compliance.general.map((g) => (
                    <li key={g} className="flex gap-3">
                      <span
                        className="mt-2.5 size-1.5 shrink-0 rounded-full bg-gold-500"
                        aria-hidden
                      />{" "}
                      {g}
                    </li>
                  ))}
                </ul>
                <p className="mt-4 text-small text-ink-500">
                  Usually quoted {r.incotermDefault}. FOB and CIF both
                  available.
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        data-theme="dark"
        className="bg-forest-950 py-section text-cream-50"
      >
        <div className="container-x grid gap-10 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-7">
            <p className="eyebrow text-gold-400">Downloads</p>
            <h2 className="mt-3 text-display-lg">
              Take the paperwork with you.
            </h2>
            <p className="mt-4 max-w-xl text-lead opacity-85">
              A per-product spec sheet on every product page, and the full
              catalogue here. Certificate copies on request from {site.email}.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 lg:col-span-5 lg:justify-end">
            <a
              href="/downloads/prish-overseas-catalogue.pdf"
              download
              className="inline-flex h-13 items-center gap-2 rounded-full bg-cream-50 px-7 text-lead font-semibold text-forest-950"
              data-umami-event="catalogue_download"
            >
              <IconDownload /> {cta.catalogue}
            </a>
            <ButtonLink href="/inquiry" size="lg" variant="secondary">
              {cta.kit} <IconArrow />
            </ButtonLink>
          </div>
        </div>
      </section>
    </>
  );
}
