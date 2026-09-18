import Link from "next/link";
import type { Product } from "@/content/types";
import { productPath } from "@/content";
import { ProductBowl } from "./ProductBowl";
import { AddToKitButton } from "./AddToKitButton";

/** Illustration-only card: the label lives outside the image (owner note). */
export function ProductCard({ product, showKit = true }: { product: Product; showKit?: boolean }) {
  return (
    <article className="group relative flex flex-col rounded-xl p-3 transition-colors hover:bg-current/5" style={{ ["--world" as string]: product.colourWorld.primary }}>
      <Link href={productPath(product)} data-burst={product.slug} className="block rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-gold-500">
        <div className="relative">
          <div aria-hidden className="absolute inset-x-8 bottom-6 top-12 -z-10 rounded-full opacity-0 blur-2xl transition-opacity duration-4 group-hover:opacity-50" style={{ background: product.colourWorld.primary }} />
          <ProductBowl product={product} className="w-full transition-transform duration-3 ease-out-expo group-hover:-translate-y-1" />
        </div>
        <h3 className="mt-1 font-display text-display-md leading-tight">{product.shortName}</h3>
        {product.desiName ? (
          <p className="mt-1 text-small opacity-70">
            <span lang={product.desiName.lang} className="font-deva text-body">
              {product.desiName.text}
            </span>{" "}
            · {product.desiName.roman}
          </p>
        ) : null}
        <p className="mt-2 text-small opacity-70">{product.originRegions.slice(0, 2).join(" · ")}</p>
      </Link>
      {showKit ? <AddToKitButton productId={product.id} size="sm" className="mt-4 self-start" /> : null}
    </article>
  );
}
