import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { createPageMetadata, resolveUrl } from "@/lib/seo";
import {
  getClusterBySlug,
  orderedClusters,
  productsByCluster,
  clusterPath,
  buyerTypeLabel,
  calendarFor,
  flagText,
  cta,
} from "@/content";
import type { BuyerTypeId, FlagId } from "@/content/types";
import { Accent, ButtonLink, Pill } from "@/components/ui/primitives";
import { ProductCard } from "@/components/products/ProductCard";
import { ComplianceTabs } from "@/components/products/ComplianceTabs";
import { Seasonality } from "@/components/products/Seasonality";
import { JsonLd } from "@/components/seo/JsonLd";
import { IconArrow } from "@/components/ui/icons";

export const dynamicParams = false;

export function generateStaticParams() {
  return orderedClusters.map((c) => ({ cluster: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ cluster: string }>;
}): Promise<Metadata> {
  const { cluster } = await params;
  const c = getClusterBySlug(cluster);
  if (!c) return {};
  return createPageMetadata({
    title: `${c.name} from India`,
    description: `${c.promise} ${c.description}`.slice(0, 200),
    path: clusterPath(c),
  });
}

export default async function ClusterPage({
  params,
}: {
  params: Promise<{ cluster: string }>;
}) {
  const { cluster } = await params;
  const c = getClusterBySlug(cluster);
  if (!c) notFound();
  const list = productsByCluster(c.id);
  const flags = Array.from(new Set(list.flatMap((p) => p.flags))) as FlagId[];
  const buyers = Array.from(
    new Set(list.flatMap((p) => p.buyerTypes)),
  ) as BuyerTypeId[];
  const dark = c.colourWorld.ink === "light";

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            {
              "@type": "ListItem",
              position: 1,
              name: "Home",
              item: resolveUrl("/"),
            },
            {
              "@type": "ListItem",
              position: 2,
              name: "Products",
              item: resolveUrl("/products"),
            },
            {
              "@type": "ListItem",
              position: 3,
              name: c.name,
              item: resolveUrl(clusterPath(c)),
            },
          ],
        }}
      />
      <section
        data-theme="world"
        className="relative overflow-hidden grain pt-32 pb-16"
        style={{
          ["--world" as string]: c.colourWorld.primary,
          ["--world-2" as string]: c.colourWorld.secondary,
          ["--world-ink" as string]: dark ? "#fbf8f1" : "#14110c",
          background: `linear-gradient(160deg, ${c.colourWorld.primary}, ${c.colourWorld.secondary})`,
        }}
      >
        <div className="container-x">
          <nav aria-label="Breadcrumb" className="text-small opacity-70">
            <Link
              href="/products"
              className="underline-offset-4 hover:underline"
            >
              Products
            </Link>{" "}
            / {c.name}
          </nav>
          <div className="mt-8 grid gap-8 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-8">
              <Accent accent={c.accent} size="sm" />
              <h1 className="mt-4 text-display-xl">{c.name}</h1>
              <p className="mt-5 max-w-2xl text-lead opacity-90">{c.promise}</p>
            </div>
            <div className="lg:col-span-4">
              <p className="eyebrow opacity-70">Who buys this family</p>
              <ul className="mt-3 flex flex-wrap gap-2">
                {buyers.slice(0, 6).map((b) => (
                  <li key={b}>
                    <Pill className="border-current/40">
                      {buyerTypeLabel[b]}
                    </Pill>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section
        data-theme="light"
        className="bg-cream-50 py-16 text-ink-900 md:py-24"
      >
        <div className="container-x">
          <p className="max-w-3xl text-lead text-ink-700">{c.description}</p>
          <ul
            className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
            role="list"
          >
            {list.map((p) => (
              <li key={p.id}>
                <ProductCard product={p} />
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section
        data-theme="light"
        className="bg-cream-100 py-16 text-ink-900 md:py-24"
      >
        <div className="container-x">
          <p className="eyebrow text-ink-500">Compliance, by market</p>
          <h2 className="mt-3 text-display-lg">
            What your market will ask for.
          </h2>
          {flags.length ? (
            <ul className="mt-6 flex flex-wrap gap-2">
              {flags.map((f) => (
                <li
                  key={f}
                  className="max-w-md rounded-lg border border-ink-900/10 bg-cream-50 p-4 text-small text-ink-700"
                >
                  {flagText[f]}
                </li>
              ))}
            </ul>
          ) : null}
          <ComplianceTabs flags={flags} className="mt-10" />
        </div>
      </section>

      <section
        data-theme="light"
        className="bg-cream-50 py-16 text-ink-900 md:py-24"
      >
        <div className="container-x grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="eyebrow text-ink-500">Seasonality</p>
            <h2 className="mt-3 text-display-lg">When to book.</h2>
            <p className="mt-4 text-body text-ink-700">
              New crop means fresher colour and, often, better pricing.
              Indicative windows — ask us for the current season.
            </p>
            <ButtonLink
              href="/crop-calendar"
              variant="secondary"
              className="mt-6"
            >
              Full crop calendar <IconArrow />
            </ButtonLink>
          </div>
          <ul className="space-y-5 lg:col-span-8">
            {list.map((p) => {
              const row = calendarFor(p.id);
              if (!row) return null;
              return (
                <li
                  key={p.id}
                  className="grid items-center gap-3 sm:grid-cols-12"
                >
                  <span className="font-semibold sm:col-span-3">
                    {p.shortName}
                  </span>
                  <div className="sm:col-span-9">
                    <Seasonality row={row} compact />
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      <section
        data-theme="dark"
        className="bg-forest-950 py-16 text-cream-50 md:py-24"
      >
        <div className="container-x flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-display-lg">
              Source {c.shortName.toLowerCase()} from us.
            </h2>
            <p className="mt-3 max-w-xl text-lead opacity-85">
              Add what you need to a sample kit and we quote against
              today&apos;s crop.
            </p>
          </div>
          <ButtonLink href="/inquiry" size="lg">
            {cta.kit} <IconArrow />
          </ButtonLink>
        </div>
      </section>
    </>
  );
}
