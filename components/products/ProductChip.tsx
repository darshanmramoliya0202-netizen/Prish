import Image from "next/image";
import type { Product } from "@/content/types";
import { productPhotos, photoCaptions } from "@/content/photos";

const SIZE = {
  sm: { box: "size-12 sm:size-14", px: 56 },
  md: { box: "size-14 md:size-16", px: 64 },
  lg: { box: "size-24 md:size-28", px: 112 },
} as const;

/**
 * The "exact product" chip — a small round photo of the actual product (close-up of the
 * powder grain, the seeds, the flakes) sitting at the bowl's lower right, like a swatch
 * next to a render. Renders nothing until public/photos/products/<slug>/macro.jpg exists.
 * Decorative by default (the parent link already names the product); the hero passes
 * decorative={false} and wraps it in the gallery trigger.
 */
export function ProductChip({
  product,
  size = "sm",
  className = "",
  decorative = true,
}: {
  product: Product;
  size?: keyof typeof SIZE;
  className?: string;
  decorative?: boolean;
}) {
  const macro = productPhotos(product.slug).macro;
  if (!macro) return null;
  const s = SIZE[size];
  return (
    <span
      className={`pointer-events-none absolute right-[6%] bottom-[8%] block overflow-hidden rounded-full shadow-deep ring-2 ring-cream-50/90 transition-transform duration-3 ease-out-expo group-hover:scale-110 ${s.box} ${className}`}
      data-product-chip
    >
      <Image
        src={macro.src}
        alt={
          decorative
            ? ""
            : `${product.name} — ${photoCaptions.macro.toLowerCase()}`
        }
        width={s.px * 2}
        height={s.px * 2}
        sizes={`${s.px}px`}
        quality={80}
        draggable={false}
        className="size-full object-cover"
      />
    </span>
  );
}
