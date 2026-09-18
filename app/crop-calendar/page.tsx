import type { Metadata } from "next";
import Link from "next/link";
import { createPageMetadata } from "@/lib/seo";
import { cropCalendar, MONTHS, statusLabel } from "@/content/crop-calendar";
import {
  orderedClusters,
  productsByCluster,
  getProduct,
  productPath,
  calendarDisclaimer,
  cta,
} from "@/content";
import type { MonthStatus } from "@/content/types";
import { ButtonLink, SectionHeading } from "@/components/ui/primitives";
import { CurrentMonth } from "@/components/products/CurrentMonth";
import { IconArrow } from "@/components/ui/icons";

export const metadata: Metadata = createPageMetadata({
  title: "Crop calendar — when to book Indian ingredients",
  description:
    "Harvest and new-crop windows for turmeric, chilli, cumin, coriander, onion, garlic, fruit powders, moringa and basmati. Indicative windows from public Indian crop data.",
  path: "/crop-calendar",
});

const tone: Record<MonthStatus, string> = {
  harvest: "bg-gold-500",
  processing: "bg-forest-500",
  stock: "bg-ink-900/20",
  lean: "bg-ink-900/6",
};

export default function CropCalendarPage() {
  return (
    <>
      <CurrentMonth />
      <section
        data-theme="dark"
        className="grain bg-forest-950 pt-32 pb-16 text-cream-50 md:pt-40 md:pb-24"
      >
        <div className="container-x">
          <p className="eyebrow text-gold-400">Know before you book</p>
          <h1 className="mt-4 max-w-4xl text-display-xl">
            When each product is fresh crop.
          </h1>
          <p className="mt-6 max-w-2xl text-lead text-cream-100/85">
            New crop means fresher colour and, often, better pricing. Plan
            procurement around it. The current month is outlined.
          </p>
        </div>
      </section>

      <section
        data-theme="light"
        className="bg-cream-50 py-16 text-ink-900 md:py-24"
      >
        <div className="container-x">
          <ul className="flex flex-wrap gap-x-6 gap-y-2 text-small text-ink-700">
            {(Object.keys(statusLabel) as MonthStatus[]).map((k) => (
              <li key={k} className="inline-flex items-center gap-2">
                <span
                  className={`inline-block h-3 w-5 rounded-sm ${tone[k]}`}
                  aria-hidden
                />{" "}
                {statusLabel[k]}
              </li>
            ))}
          </ul>

          <div className="mt-10 overflow-x-auto">
            <table className="w-full min-w-[56rem] border-collapse text-small">
              <thead>
                <tr>
                  <th className="sticky left-0 bg-cream-50 py-3 pr-4 text-left font-semibold">
                    Product
                  </th>
                  {MONTHS.map((m, i) => (
                    <th
                      key={m}
                      className="px-1 py-3 text-center font-semibold"
                      data-month={i}
                    >
                      <span
                        className="inline-block rounded px-1.5 py-0.5 data-[now=true]:bg-forest-900 data-[now=true]:text-cream-50"
                        data-month={i}
                      >
                        {m}
                      </span>
                    </th>
                  ))}
                </tr>
              </thead>
              {orderedClusters.map((c) => (
                <tbody key={c.id}>
                  <tr>
                    <th
                      colSpan={13}
                      className="bg-cream-100 px-2 py-2 text-left font-display text-display-md"
                    >
                      {c.name}
                    </th>
                  </tr>
                  {productsByCluster(c.id).map((p) => {
                    const row = cropCalendar.find((r) => r.productId === p.id);
                    if (!row) return null;
                    return (
                      <tr key={p.id} className="border-t border-ink-900/10">
                        <th
                          scope="row"
                          className="sticky left-0 bg-cream-50 py-3 pr-4 text-left font-medium"
                        >
                          <Link
                            href={productPath(p)}
                            className="underline-offset-4 hover:underline"
                          >
                            {p.shortName}
                          </Link>
                        </th>
                        {row.months.map((m, i) => (
                          <td key={i} className="px-1 py-3" data-month={i}>
                            <div
                              className={`h-6 rounded-sm ${tone[m]} data-[now=true]:ring-2 data-[now=true]:ring-forest-900`}
                              title={`${MONTHS[i]}: ${statusLabel[m]}`}
                              data-month={i}
                            />
                          </td>
                        ))}
                      </tr>
                    );
                  })}
                </tbody>
              ))}
            </table>
          </div>
          <p className="mt-6 text-small text-ink-500">{calendarDisclaimer}</p>
        </div>
      </section>

      <section
        data-theme="light"
        className="bg-cream-100 py-16 text-ink-900 md:py-24"
      >
        <div className="container-x">
          <SectionHeading
            eyebrow="Notes by product"
            title="What the windows mean."
          />
          <dl className="mt-10 grid gap-x-10 gap-y-6 md:grid-cols-2">
            {cropCalendar.map((r) => {
              const p = getProduct(r.productId);
              if (!p) return null;
              return (
                <div
                  key={r.productId}
                  className="border-t border-ink-900/10 pt-4"
                >
                  <dt className="font-semibold">{p.name}</dt>
                  <dd className="mt-1 text-body text-ink-700">{r.note}</dd>
                </div>
              );
            })}
          </dl>
        </div>
      </section>

      <section
        data-theme="dark"
        className="bg-forest-950 py-16 text-cream-50 md:py-24"
      >
        <div className="container-x flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between">
          <h2 className="text-display-lg">Book against this season.</h2>
          <ButtonLink href="/inquiry" size="lg">
            {cta.kit} <IconArrow />
          </ButtonLink>
        </div>
      </section>
    </>
  );
}
