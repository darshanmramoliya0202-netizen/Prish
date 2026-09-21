import Image from "next/image";
import type { Product } from "@/content/types";
import { productPhotos } from "@/content/photos";

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
  const photo = productPhotos(product.slug).bowl;
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
