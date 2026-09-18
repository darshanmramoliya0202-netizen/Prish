import type { Product } from "@/content/types";

/**
 * The pre-rendered bowl (`render:bowls` → public/illustrations/products/<slug>.svg) as a
 * plain <img>. List pages show up to 27 bowls at once; inline SVG there meant ~2,000 extra
 * DOM nodes and a 600 KB document (shipped twice — HTML + RSC payload). The file is the
 * same markup, so the burst sampler can still read the silhouette from it.
 * The product hero uses it too (eager); inline <ProductBowl> is now only rendered at build.
 */
export function BowlImage({
  product,
  className = "",
  priority = false,
  decorative = true,
  ...rest
}: {
  product: Product;
  className?: string;
  /** above the fold: eager + high fetch priority */
  priority?: boolean;
  /** false → announces the illustration's alt text (product hero) */
  decorative?: boolean;
} & Record<`data-${string}`, string | boolean | undefined>) {
  return (
    // eslint-disable-next-line @next/next/no-img-element -- static SVG, nothing to optimise
    <img
      src={`/illustrations/products/${product.slug}.svg`}
      alt={decorative ? "" : product.illustration.alt}
      width={1000}
      height={1000}
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : undefined}
      decoding="async"
      draggable={false}
      data-bowl-img={product.slug}
      className={className}
      {...rest}
    />
  );
}
