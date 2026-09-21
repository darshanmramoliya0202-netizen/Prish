import Link from "next/link";
import { orderedClusters, getProduct, productPath, home } from "@/content";
import { ProductVisual } from "@/components/products/ProductVisual";
import { SectionHeading } from "@/components/ui/primitives";

/**
 * Section 2 — six family-hero bowls in an arc (echoing the brochure cover).
 * Each bowl is a real link; the burst-on-click interaction wraps these in the motion phase.
 */
export function ProductWorld() {
  const heroes = orderedClusters.map((c) => ({
    cluster: c,
    product: getProduct(c.heroProductId)!,
  }));
  return (
    <section
      data-theme="dark"
      data-product-world
      className="relative overflow-hidden bg-forest-950 py-section text-cream-50"
    >
      <div className="container-x">
        <SectionHeading
          eyebrow="The product world"
          title={home.worldTitle}
          sub={home.worldSub}
          align="center"
        />

        <ul
          className="mx-auto mt-16 grid max-w-6xl grid-cols-2 gap-x-4 gap-y-10 sm:grid-cols-3 lg:grid-cols-6"
          role="list"
          data-reveal-group
        >
          {heroes.map(({ cluster, product }, i) => {
            // gentle arc: outer bowls sit lower than the centre ones
            const lift = [0, 24, 40, 40, 24, 0][i] ?? 0;
            return (
              <li
                key={product.id}
                className="lg:translate-y-0"
                style={{ ["--lift" as string]: `${lift}px` }}
                data-reveal
              >
                <Link
                  href={productPath(product)}
                  data-burst={product.slug}
                  className="group block rounded-xl p-2 text-center outline-none transition-transform duration-3 ease-out-expo hover:-translate-y-2 focus-visible:ring-2 focus-visible:ring-gold-500 lg:-translate-y-[var(--lift)] lg:hover:-translate-y-[calc(var(--lift)+8px)]"
                  style={{ ["--world" as string]: product.colourWorld.primary }}
                >
                  <ProductVisual
                    product={product}
                    chip="md"
                    bowlClassName="w-full drop-shadow-2xl"
                    sizes="(min-width: 1024px) 16vw, 45vw"
                  >
                    <div
                      aria-hidden
                      className="absolute inset-x-6 bottom-4 top-10 -z-10 rounded-full opacity-0 blur-2xl transition-opacity duration-4 group-hover:opacity-60"
                      style={{ background: product.colourWorld.primary }}
                    />
                  </ProductVisual>
                  <p className="mt-2 font-display text-display-md leading-none">
                    {product.shortName}
                  </p>
                  <p className="eyebrow mt-2 opacity-60">{cluster.shortName}</p>
                </Link>
              </li>
            );
          })}
        </ul>

        <p className="mt-14 text-center text-small opacity-60">
          27 products · six families · one paper trail
        </p>
      </div>
    </section>
  );
}
