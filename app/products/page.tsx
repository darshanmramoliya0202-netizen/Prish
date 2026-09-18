import type { Metadata } from "next";
import Link from "next/link";
import { createPageMetadata } from "@/lib/seo";
import { orderedClusters, productsByCluster, clusterPath, productPath, clusterOf, products, cta } from "@/content";
import { Accent, ButtonLink } from "@/components/ui/primitives";
import { ProductBowl } from "@/components/products/ProductBowl";
import { SearchPalette } from "@/components/products/SearchPalette";
import { toSearchEntries } from "@/components/products/search-entries";
import { IconArrow } from "@/components/ui/icons";
import { JsonLd } from "@/components/seo/JsonLd";
import { resolveUrl } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Products — six families, 27 Indian-origin ingredients",
  description: "Fruit, vegetable and herbal powders, dehydrated onion and garlic, raw whole spices, moringa and basmati rice. One family per screen, every product with its origin belt and paperwork.",
  path: "/products",
});

/** One family per screen (owner note). Scroll-snap on touch; the pinned version arrives with motion. */
export default function ProductsPage() {
  const entries = toSearchEntries(products, productPath, (p) => clusterOf(p).shortName);
  return (
    <>
      <JsonLd data={{ "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: resolveUrl("/") }, { "@type": "ListItem", position: 2, name: "Products", item: resolveUrl("/products") }] }} />
      <section data-theme="dark" className="bg-forest-950 pt-32 pb-12 text-cream-50">
        <div className="container-x flex flex-col items-start gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="eyebrow opacity-70">Products</p>
            <h1 className="mt-3 text-display-xl">Six families.</h1>
            <p className="mt-4 max-w-xl text-lead opacity-85">One family per screen. Tap any bowl for its origin belt, typical specs and the documents your market asks for.</p>
          </div>
          <SearchPalette entries={entries} />
        </div>
      </section>

      <div className="snap-y snap-proximity">
        {orderedClusters.map((c, i) => {
          const list = productsByCluster(c.id);
          const dark = i % 2 === 0;
          return (
            <section
              key={c.id}
              id={c.slug}
              data-theme={dark ? "dark" : "light"}
              data-family={c.id}
              className={`snap-start min-h-dvh py-20 ${dark ? "bg-forest-950 text-cream-50" : "bg-cream-50 text-ink-900"}`}
              style={{ ["--world" as string]: c.colourWorld.primary }}
            >
              <div className="container-x grid gap-10 lg:grid-cols-12 lg:items-center">
                <div className="lg:col-span-4">
                  <Accent accent={c.accent} size="md" className="text-gold-400" />
                  <h2 className="mt-6 text-display-lg">{c.name}</h2>
                  <p className="mt-4 text-lead opacity-85">{c.promise}</p>
                  <p className="mt-4 text-body opacity-70">{c.description}</p>
                  <ButtonLink href={clusterPath(c)} variant={dark ? "primary" : "primary"} className="mt-8">
                    Open the family <IconArrow />
                  </ButtonLink>
                </div>
                <ul className={`grid gap-2 lg:col-span-8 ${list.length <= 2 ? "grid-cols-2 max-w-md" : list.length <= 5 ? "grid-cols-3 sm:grid-cols-5" : "grid-cols-3 sm:grid-cols-4"}`} role="list">
                  {list.map((p) => (
                    <li key={p.id}>
                      <Link href={productPath(p)} data-burst={p.slug} className="group block rounded-xl p-2 text-center outline-none focus-visible:ring-2 focus-visible:ring-gold-500" style={{ ["--world" as string]: p.colourWorld.primary }}>
                        <ProductBowl product={p} className="w-full transition-transform duration-3 ease-out-expo group-hover:-translate-y-1.5" />
                        <span className="mt-1 block font-display text-display-md leading-none">{p.shortName}</span>
                        {p.desiName ? <span className="eyebrow mt-1 block opacity-60">{p.desiName.roman}</span> : null}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          );
        })}
      </div>

      <section data-theme="light" className="bg-cream-100 py-section text-ink-900">
        <div className="container-x text-center">
          <h2 className="text-display-lg">Not seeing what you source?</h2>
          <p className="mx-auto mt-4 max-w-xl text-lead text-ink-700">We add lines when buyers ask and when we can source them with a straight face. Tell us what you need.</p>
          <ButtonLink href="/inquiry" size="lg" className="mt-8">
            {cta.kit} <IconArrow />
          </ButtonLink>
        </div>
      </section>
    </>
  );
}
