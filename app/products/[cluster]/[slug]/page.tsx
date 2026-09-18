import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { createPageMetadata, resolveUrl } from "@/lib/seo";
import {
  allProductParams,
  getProductBySlug,
  getClusterBySlug,
  productsByCluster,
  productPath,
  clusterPath,
  buyerTypeLabel,
  calendarFor,
  flagText,
  cta,
  hsDisclaimer,
} from "@/content";
import { BowlImage } from "@/components/products/BowlImage";
import { OriginMap } from "@/components/products/OriginMap";
import { SpecTable, GradeTable } from "@/components/products/SpecTable";
import { ComplianceTabs } from "@/components/products/ComplianceTabs";
import { Seasonality } from "@/components/products/Seasonality";
import { AddToKitButton } from "@/components/products/AddToKitButton";
import { ProductCard } from "@/components/products/ProductCard";
import { ButtonLink, Pill } from "@/components/ui/primitives";
import { IconArrow, IconDownload, IconWhatsApp } from "@/components/ui/icons";
import { JsonLd } from "@/components/seo/JsonLd";
import { waLink } from "@/lib/whatsapp";
import { site } from "@/content/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return allProductParams();
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ cluster: string; slug: string }>;
}): Promise<Metadata> {
  const { cluster, slug } = await params;
  const p = getProductBySlug(slug);
  const c = getClusterBySlug(cluster);
  if (!p || !c || p.cluster !== c.id) return {};
  return createPageMetadata({
    title: p.seo.title,
    description: p.seo.description,
    path: productPath(p),
    image: `${productPath(p)}/opengraph-image`,
  });
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ cluster: string; slug: string }>;
}) {
  const { cluster, slug } = await params;
  const p = getProductBySlug(slug);
  const c = getClusterBySlug(cluster);
  if (!p || !c || p.cluster !== c.id) notFound();
  const siblings = productsByCluster(c.id)
    .filter((x) => x.id !== p.id)
    .slice(0, 4);
  const row = calendarFor(p.id);
  const inkLight = p.colourWorld.ink === "light";
  const specPdf = `/downloads/spec-sheets/${p.slug}.pdf`;

  return (
    <>
      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "Product",
            name: p.name,
            description: p.seo.description,
            image: resolveUrl(`${productPath(p)}/opengraph-image`),
            brand: { "@type": "Brand", name: site.company },
            category: c.name,
            countryOfOrigin: "IN",
            additionalProperty: [
              {
                "@type": "PropertyValue",
                name: "HS code (6-digit)",
                value: p.hs.hs6,
              },
            ],
            url: resolveUrl(productPath(p)),
          },
          {
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
              {
                "@type": "ListItem",
                position: 4,
                name: p.name,
                item: resolveUrl(productPath(p)),
              },
            ],
          },
        ]}
      />

      {/* 1 — farm-view hero in the product's colour world */}
      <section
        data-theme="world"
        data-product-hero={p.slug}
        className="relative overflow-hidden grain pt-28 pb-16 md:pt-36"
        style={{
          ["--world" as string]: p.colourWorld.primary,
          ["--world-2" as string]: p.colourWorld.secondary,
          ["--world-ink" as string]: inkLight ? "#fbf8f1" : "#14110c",
          background: `radial-gradient(80% 70% at 70% 30%, ${p.colourWorld.particles[1]}55, transparent 60%), linear-gradient(160deg, ${p.colourWorld.primary}, ${p.colourWorld.secondary})`,
          color: inkLight ? "#fbf8f1" : "#14110c",
        }}
      >
        <div className="container-x grid gap-10 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-6">
            <nav aria-label="Breadcrumb" className="text-small opacity-75">
              <Link
                href="/products"
                className="underline-offset-4 hover:underline"
              >
                Products
              </Link>{" "}
              /{" "}
              <Link
                href={clusterPath(c)}
                className="underline-offset-4 hover:underline"
              >
                {c.name}
              </Link>
            </nav>
            {p.desiName ? (
              <p className="mt-6">
                <span
                  lang={p.desiName.lang}
                  className="font-deva text-display-lg leading-none"
                >
                  {p.desiName.text}
                </span>
                <span className="eyebrow ml-3 opacity-75">
                  {p.desiName.roman}
                </span>
              </p>
            ) : null}
            <h1 className="mt-3 text-display-xl">{p.name}</h1>
            <p className="mt-5 max-w-xl text-lead opacity-90">
              {p.profile.whyIndian}
            </p>
            <ul className="mt-6 flex flex-wrap gap-2">
              <li>
                <Pill className="border-current/40">{c.shortName}</Pill>
              </li>
              <li>
                <Pill className="border-current/40">Form: {p.form}</Pill>
              </li>
              <li>
                <Pill className="border-current/40 tabular">
                  HS {p.hs.hs6.slice(0, 4)}.{p.hs.hs6.slice(4)}
                </Pill>
              </li>
              {p.hs.verified && p.hs.itcHs ? (
                <li>
                  <Pill className="border-current/40 tabular">
                    ITC-HS {p.hs.itcHs}
                  </Pill>
                </li>
              ) : null}
            </ul>
            <div className="mt-8 flex flex-wrap gap-3">
              <AddToKitButton
                productId={p.id}
                size="lg"
                className="!border-current/60"
              />
              <a
                href={waLink({ products: [p.name] })}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-13 items-center gap-2 rounded-full bg-[#25D366] px-7 text-lead font-semibold text-[#062a16]"
                data-umami-event="whatsapp_click"
                data-umami-event-placement="product_hero"
                data-umami-event-product={p.slug}
              >
                <IconWhatsApp /> {cta.price}
              </a>
            </div>
          </div>
          <div className="lg:col-span-6">
            <BowlImage
              product={p}
              decorative={false}
              priority
              className="mx-auto w-full max-w-lg drop-shadow-2xl"
              data-hero-bowl
            />
          </div>
        </div>
      </section>

      {/* 2 — origin */}
      <section
        data-theme="light"
        className="bg-cream-50 py-16 text-ink-900 md:py-24"
      >
        <div className="container-x grid gap-10 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-5">
            <p className="eyebrow text-ink-500">Origin</p>
            <h2 className="mt-3 text-display-lg">Where it grows.</h2>
            <ul className="mt-6 flex flex-wrap gap-2">
              {p.originRegions.map((o) => (
                <li key={o}>
                  <Pill>{o}</Pill>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-body text-ink-700">{p.profile.science}</p>
          </div>
          <div className="lg:col-span-7">
            <OriginMap
              origins={p.originRegions}
              accent={p.colourWorld.primary}
              className="mx-auto w-full max-w-md text-forest-900"
            />
          </div>
        </div>
      </section>

      {/* 3 — science / why Indian / benefits */}
      <section
        data-theme="light"
        className="bg-cream-100 py-16 text-ink-900 md:py-24"
      >
        <div className="container-x grid gap-10 md:grid-cols-3">
          {[
            ["The science", p.profile.science],
            ["Why Indian", p.profile.whyIndian],
            ["What it does for your formulation", p.profile.benefits],
          ].map(([h, t]) => (
            <div key={h} className="border-l-2 border-gold-500 pl-5">
              <h3 className="font-display text-display-md">{h}</h3>
              <p className="mt-3 text-body text-ink-700">{t}</p>
            </div>
          ))}
          {p.profile.source === "authored" ? (
            <p className="text-small text-ink-500 md:col-span-3">
              Profile summarised from published ingredient science; lot-specific
              data on the COA.
            </p>
          ) : null}
        </div>
      </section>

      {/* 4 — specs */}
      <section
        data-theme="light"
        className="bg-cream-50 py-16 text-ink-900 md:py-24"
      >
        <div className="container-x grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <p className="eyebrow text-ink-500">Typical specifications</p>
            <h2 className="mt-3 text-display-lg">
              The numbers we quote against.
            </h2>
            <div className="mt-8">
              <SpecTable specs={p.specs} />
            </div>
          </div>
          <div className="lg:col-span-6">
            {p.gradeTable ? (
              <GradeTable rows={p.gradeTable} title={`${p.shortName} grades`} />
            ) : null}
            {p.variants ? (
              <div className={p.gradeTable ? "mt-10" : ""}>
                <p className="eyebrow text-ink-500">Variants</p>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {p.variants.map((v) => (
                    <li key={v}>
                      <Pill>{v}</Pill>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
            <div className="mt-10">
              <p className="eyebrow text-ink-500">Applications</p>
              <ul className="mt-3 flex flex-wrap gap-2">
                {p.applications.map((a) => (
                  <li key={a}>
                    <Pill>{a}</Pill>
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-10">
              <p className="eyebrow text-ink-500">Who buys this</p>
              <ul className="mt-3 flex flex-wrap gap-2">
                {p.buyerTypes.map((b) => (
                  <li key={b}>
                    <Pill tone="muted">{buyerTypeLabel[b]}</Pill>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 5 — compliance for your market */}
      <section
        data-theme="light"
        className="bg-cream-100 py-16 text-ink-900 md:py-24"
      >
        <div className="container-x">
          <p className="eyebrow text-ink-500">Compliance & documents</p>
          <h2 className="mt-3 text-display-lg">For your market.</h2>
          {p.flags.length ? (
            <ul className="mt-6 grid gap-3 md:grid-cols-2">
              {p.flags.map((f) => (
                <li
                  key={f}
                  className="rounded-lg border border-ink-900/10 bg-cream-50 p-4 text-small text-ink-700"
                >
                  {flagText[f]}
                </li>
              ))}
            </ul>
          ) : null}
          <ComplianceTabs flags={p.flags} className="mt-10" />
          <p className="mt-8 text-small text-ink-500">{hsDisclaimer}</p>
        </div>
      </section>

      {/* 6 — packaging, shelf life, seasonality */}
      <section
        data-theme="light"
        className="bg-cream-50 py-16 text-ink-900 md:py-24"
      >
        <div className="container-x grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="eyebrow text-ink-500">Packaging & shelf life</p>
            <h2 className="mt-3 text-display-lg">How it ships.</h2>
            <ul className="mt-6 space-y-2 text-body text-ink-700">
              {p.packaging.map((x) => (
                <li key={x} className="flex gap-3">
                  <span
                    className="mt-2.5 size-1.5 shrink-0 rounded-full bg-gold-500"
                    aria-hidden
                  />{" "}
                  {x}
                </li>
              ))}
            </ul>
            <p className="mt-6 text-body">
              Shelf life: <strong>{p.shelfLife}</strong> in cool, dry, hygienic
              storage. FCL and LCL.
            </p>
          </div>
          <div className="lg:col-span-7">
            <p className="eyebrow text-ink-500">Seasonality</p>
            <h2 className="mt-3 text-display-lg">When to book.</h2>
            <div className="mt-6">{row ? <Seasonality row={row} /> : null}</div>
          </div>
        </div>
      </section>

      {/* 7 — get it */}
      <section
        data-theme="dark"
        className="bg-forest-950 py-16 text-cream-50 md:py-24"
      >
        <div className="container-x grid gap-8 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-7">
            <h2 className="text-display-lg">
              Get {p.shortName.toLowerCase()} moving.
            </h2>
            <p className="mt-3 max-w-xl text-lead opacity-85">
              Add it to a sample kit, download the spec sheet, or ask for
              today&apos;s price. {cta.samples}
            </p>
          </div>
          <div className="flex flex-wrap gap-3 lg:col-span-5 lg:justify-end">
            <AddToKitButton productId={p.id} size="lg" />
            <a
              href={specPdf}
              className="inline-flex h-13 items-center gap-2 rounded-full border border-cream-50/40 px-7 text-lead font-semibold hover:border-cream-50"
              download
              data-umami-event="spec_sheet_download"
              data-umami-event-product={p.slug}
            >
              <IconDownload /> {cta.specSheet}
            </a>
          </div>
        </div>
      </section>

      {siblings.length ? (
        <section
          data-theme="light"
          className="bg-cream-50 py-16 text-ink-900 md:py-24"
        >
          <div className="container-x">
            <div className="flex items-end justify-between gap-6">
              <h2 className="text-display-lg">More from {c.name}</h2>
              <ButtonLink href={clusterPath(c)} variant="secondary" size="sm">
                All {c.shortName.toLowerCase()} <IconArrow />
              </ButtonLink>
            </div>
            <ul
              className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
              role="list"
            >
              {siblings.map((s) => (
                <li key={s.id}>
                  <ProductCard product={s} showKit={false} />
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}
    </>
  );
}
