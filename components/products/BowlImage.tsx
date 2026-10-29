import Image from "next/image";
import type { Product } from "@/content/types";
import { productPhotos } from "@/content/photos";

/** median bowl width across the 27 sheets (fraction of the 1600² image) */
const BOWL_W = 0.39;
const BOWL_CX = 0.52;
const BOWL_CY = 0.46;

/**
 * Every sheet frames its bowl differently (0.35–0.51 of the image wide, some off-centre),
 * so on the arc and in grids the bowls jumped in size. Scale and nudge each image so its
 * measured bowl box lands at the same width and centre. Clamped so the loose crop around
 * the bowl is never pushed out of view. The burst measures the transformed rect, so the
 * pieces still start where they are seen.
 */
function normalise(anchor: { x: number; y: number; w: number; h: number } | undefined) {
  if (!anchor) return undefined;
  const s = Math.min(1.1, Math.max(0.8, BOWL_W / anchor.w));
  const cx = anchor.x + anchor.w / 2;
  const cy = anchor.y + anchor.h / 2;
  const clamp = (v: number) => Math.min(0.08, Math.max(-0.08, v));
  const tx = clamp((BOWL_CX - 0.5 - s * (cx - 0.5)) );
  const ty = clamp((BOWL_CY - 0.5 - s * (cy - 0.5)) );
  if (Math.abs(s - 1) < 0.02 && Math.abs(tx) < 0.005 && Math.abs(ty) < 0.005) return undefined;
  return {
    transform: `translate(${(tx * 100).toFixed(2)}%, ${(ty * 100).toFixed(2)}%) scale(${s.toFixed(3)})`,
  };
}

/**
 * The bowl. When a real photo of the product in the house bowl exists
 * (public/photos/products/<slug>/bowl.png, via `photos:prep`) it is used; otherwise the
 * pre-rendered illustration (`render:bowls` → public/illustrations/products/<slug>.svg)
 * as a plain <img>. List pages show up to 27 bowls at once; inline SVG there meant
 * ~2,000 extra DOM nodes and a 600 KB document, so the file is always an <img>.
 * Both carry data-bowl-img + data-form so the burst can sample the silhouette and pick
 * the particle behaviour (dust for powders, tumbling pieces for seeds/flakes/grain).
 */
export function BowlImage({
  product,
  className = "",
  priority = false,
  decorative = true,
  sizes = "(min-width: 1024px) 20vw, 45vw",
  ...rest
}: {
  product: Product;
  className?: string;
  /** above the fold: eager + high fetch priority */
  priority?: boolean;
  /** false → announces the alt text (product hero) */
  decorative?: boolean;
  /** responsive hint for the photo variant */
  sizes?: string;
} & Record<`data-${string}`, string | boolean | undefined>) {
  const photos = productPhotos(product.slug);
  const photo = photos.bowl;
  if (photo) {
    return (
      <Image
        src={photo.src}
        alt={decorative ? "" : `${product.name} in a bowl`}
        width={photo.width}
        height={photo.height}
        sizes={sizes}
        priority={priority}
        loading={priority ? "eager" : "lazy"}
        quality={82}
        draggable={false}
        data-bowl-img={product.slug}
        data-form={product.form}
        data-photo
        className={className}
        style={normalise(photos.anchor)}
        {...rest}
      />
    );
  }
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
      data-form={product.form}
      className={className}
      {...rest}
    />
  );
}
