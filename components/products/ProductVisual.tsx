import type { ReactNode } from "react";
import type { Product } from "@/content/types";
import { BowlImage } from "./BowlImage";
import { ProductChip } from "./ProductChip";

/**
 * Bowl + the real-product chip beside it, in one relative box. Every bowl placement
 * (home arc, family grids, cards, product hero) goes through here so the chip sits in
 * the same spot everywhere. `children` is for the caller's hover glow (rendered behind).
 */
export function ProductVisual({
  product,
  chip = "sm",
  className = "",
  bowlClassName = "",
  priority = false,
  decorative = true,
  sizes,
  children,
  ...data
}: {
  product: Product;
  chip?: "sm" | "md" | "lg" | "none";
  className?: string;
  bowlClassName?: string;
  priority?: boolean;
  decorative?: boolean;
  sizes?: string;
  children?: ReactNode;
} & Record<`data-${string}`, string | boolean | undefined>) {
  return (
    <div className={`relative ${className}`}>
      {children}
      <BowlImage
        product={product}
        priority={priority}
        decorative={decorative}
        sizes={sizes}
        className={bowlClassName}
        {...data}
      />
      {chip !== "none" ? <ProductChip product={product} size={chip} /> : null}
    </div>
  );
}
