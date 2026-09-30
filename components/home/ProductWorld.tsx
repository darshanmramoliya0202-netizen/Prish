import Image from "next/image";
import Link from "next/link";
import {
  orderedClusters,
  getProduct,
  productPath,
  productPhotos,
  home,
} from "@/content";
import { ProductVisual } from "@/components/products/ProductVisual";
import { SectionHeading } from "@/components/ui/primitives";

// slugs go straight into a CSS attribute selector, so only ever these characters
const SAFE_SLUG = /^[a-z0-9-]+$/;

/**
 * "Hover a bowl, stand in its field": while a bowl is hovered or keyboard-focused, its
 * field layer fades up. Plain CSS :has() so the section stays a server component. The
 * rules sit behind (hover: hover): a tap on a phone leaves a sticky :hover, and the
 * layers are display:none there anyway. motion-safe: only hears the OS, so the footer
 * "Motion: reduced" toggle (html[data-motion=reduced]) drops the fade here too.
 */
function fieldCss(slugs: string[]) {
  const rules = slugs.map(
    (s) =>
      `[data-product-world]:has([data-burst="${s}"]:is(:hover,:focus-visible)) [data-field="${s}"]{opacity:.35}`,
  );
  return `@media (hover:hover){${rules.join("")}}html[data-motion="reduced"] [data-product-world] [data-field]{transition:none}`;
}

/**
 * Section 2 — six family-hero bowls in an arc (echoing the brochure cover).
 * Each bowl is a real link; the burst-on-click interaction wraps these in the motion phase.
 */
export function ProductWorld() {
  const heroes = orderedClusters.map((c) => ({
    cluster: c,
    product: getProduct(c.heroProductId)!,
  }));
  // one field per hero that has a source photo; a hero without one just gets no glow
  const fields = heroes.flatMap(({ product }) => {
    const source = productPhotos(product.slug).source;
    return source && SAFE_SLUG.test(product.slug)
      ? [{ slug: product.slug, source }]
      : [];
  });
  return (
    <section
      data-theme="dark"
      data-product-world
      className="relative overflow-hidden bg-forest-950 py-section text-cream-50"
    >
      {fields.length ? (
        <style
          dangerouslySetInnerHTML={{
            __html: fieldCss(fields.map((f) => f.slug)),
          }}
        />
      ) : null}
      {/* each hero's source photo, blurred and dimmed to a glow of the place rather than
          a picture — decorative (generated imagery: no alt, no caption). Hidden where
          nothing hovers so phones never fetch them; lazy + low quality elsewhere. The
          mask keeps the glow off the seam with the hero above. */}
      {fields.map(({ slug, source }) => (
        <div
          key={slug}
          aria-hidden
          data-field={slug}
          className="pointer-events-none absolute -inset-16 hidden opacity-0 [mask-image:linear-gradient(to_bottom,transparent,black_25%,black_80%,transparent)] motion-safe:transition-opacity motion-safe:duration-(--duration-4) motion-safe:ease-out-expo [@media(hover:hover)]:block"
        >
          <Image
            src={source.src}
            alt=""
            fill
            loading="lazy"
            sizes="100vw"
            quality={45}
            className="object-cover blur-2xl brightness-75"
          />
        </div>
      ))}

      {/* z-10: the arc and copy always paint over the field layers */}
      <div className="container-x relative z-10">
        <SectionHeading
          eyebrow="The product world"
          title={home.worldTitle}
          sub={home.worldSub}
          align="center"
        />

        <ul
          className="mx-auto mt-12 grid max-w-6xl grid-cols-3 gap-x-2 gap-y-8 sm:gap-x-4 md:mt-16 lg:grid-cols-6"
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
                    sizes="(min-width: 1024px) 16vw, 30vw"
                  >
                    <div
                      aria-hidden
                      className="absolute inset-x-6 bottom-4 top-10 -z-10 rounded-full opacity-0 blur-2xl transition-opacity duration-4 group-hover:opacity-60"
                      style={{ background: product.colourWorld.primary }}
                    />
                  </ProductVisual>
                  <p className="mt-2 font-display text-display-sm leading-none md:text-display-md">
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
