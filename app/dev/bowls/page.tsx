import { products } from "@/content";
import { ProductBowl } from "@/components/products/ProductBowl";

export const metadata = { robots: { index: false, follow: false } };

export default async function BowlsDev({ searchParams }: { searchParams: Promise<{ form?: string }> }) {
  const { form } = await searchParams;
  const list = form ? products.filter((p) => p.form === form) : products;
  return (
    <main data-theme="light" className="container-x py-12">
      <div className="grid grid-cols-3 md:grid-cols-5 gap-6">
        {list.map((p) => (
          <figure key={p.id} className="rounded-lg bg-cream-100 p-3">
            <ProductBowl product={p} className="w-full" />
            <figcaption className="text-small mt-2 text-center">{p.shortName} · {p.form}</figcaption>
          </figure>
        ))}
      </div>
    </main>
  );
}
