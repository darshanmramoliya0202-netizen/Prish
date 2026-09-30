import Link from "next/link";
import {
  orderedClusters,
  productsByCluster,
  clusterPath,
  home,
} from "@/content";
import type { Cluster, Product } from "@/content";
import { Accent, SectionHeading } from "@/components/ui/primitives";
import { IconArrow } from "@/components/ui/icons";
import { SitePhoto, hasSitePhoto } from "@/components/ui/SitePhoto";
import { BowlImage } from "@/components/products/BowlImage";

/** up to three of the family's bowls, its hero first */
function shelfOf(c: Cluster, list: Product[]): Product[] {
  const hero = list.find((p) => p.id === c.heroProductId);
  return (hero ? [hero, ...list.filter((p) => p !== hero)] : list).slice(0, 3);
}

/**
 * Stand-in for a family photo we don't have: the family's own bowls on a little
 * shelf, the hero raised and in front. Percent margins resolve against the box
 * width, so the overlap holds at any size. Decorative — the row's text names the
 * family. `isolate` keeps the hero's z-index inside the row.
 */
function FamilyShelf({ products }: { products: Product[] }) {
  const [hero, left, right] = products;
  // with three, the hero takes the middle; with fewer it simply leads
  const row = hero && left && right ? [left, hero, right] : products;
  return (
    <div className="isolate flex aspect-[3/2] w-full max-w-[240px] items-end justify-center md:max-w-none">
      {row.map((p, i) => {
        const main = p === hero;
        // duration-(--duration-3), not duration-3: Tailwind reads bare duration-N as N ms
        return (
          <BowlImage
            key={p.id}
            product={p}
            sizes={
              main
                ? "(min-width: 768px) 9vw, 150px"
                : "(min-width: 768px) 7vw, 120px"
            }
            className={`shrink-0 drop-shadow-[0_6px_8px_rgb(20_17_12/0.16)] transition-transform duration-(--duration-3) ease-out-expo ${
              main
                ? "relative z-10 mb-[3%] w-[62%] group-hover:-translate-y-1.5"
                : `w-1/2 group-hover:-translate-y-1 ${i === 0 ? "-mr-[31%]" : "-ml-[31%]"}`
            }`}
          />
        );
      })}
    </div>
  );
}

/** Section 6 — six family rows with Gujarati accents; a photo or a shelf of bowls each. */
export function Families() {
  return (
    <section data-theme="light" className="bg-cream-50 py-section text-ink-900">
      <div className="container-x">
        <SectionHeading
          eyebrow="Products"
          title={home.familiesTitle}
          sub="Every family has its own growing belts, buyers and paperwork. Pick the one you source."
        />
        <ol
          className="mt-14 divide-y divide-ink-900/10 border-y border-ink-900/10"
          data-reveal-group
        >
          {orderedClusters.map((c) => {
            const list = productsByCluster(c.id);
            const n = list.length;
            const photo = hasSitePhoto(`family-${c.slug}`);
            const shelf = photo ? [] : shelfOf(c, list);
            // the shelf takes the photo's slot, so the row keeps the photo layout
            const visual = photo || shelf.length > 0;
            return (
              <li key={c.id} data-reveal>
                <Link
                  href={clusterPath(c)}
                  className="group grid items-center gap-6 py-8 md:grid-cols-12 md:py-10"
                >
                  {photo ? (
                    <div className="md:col-span-2">
                      <SitePhoto
                        id={`family-${c.slug}`}
                        alt=""
                        sizes="(min-width: 768px) 16vw, 90vw"
                        className="aspect-[3/2] w-full rounded-lg object-cover shadow-md transition-transform duration-(--duration-3) ease-out-expo group-hover:scale-[1.03]"
                      />
                    </div>
                  ) : shelf.length > 0 ? (
                    <div className="md:col-span-2">
                      <FamilyShelf products={shelf} />
                    </div>
                  ) : null}
                  <div className={visual ? "md:col-span-2" : "md:col-span-3"}>
                    <Accent accent={c.accent} size="sm" />
                  </div>
                  <div className={visual ? "md:col-span-5" : "md:col-span-6"}>
                    <h3 className="font-display text-display-md group-hover:underline decoration-gold-500 underline-offset-8">
                      {c.name}
                    </h3>
                    <p className="mt-2 text-body text-ink-700">{c.promise}</p>
                  </div>
                  <div className="flex items-center justify-between md:col-span-3 md:justify-end md:gap-6">
                    <span className="text-small text-ink-500 tabular">
                      {n} {n === 1 ? "product" : "products"}
                    </span>
                    <span className="inline-flex size-11 items-center justify-center rounded-full border border-ink-900/20 transition-colors group-hover:bg-forest-900 group-hover:text-cream-50">
                      <IconArrow />
                    </span>
                  </div>
                </Link>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
