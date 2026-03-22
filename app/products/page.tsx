import type { Metadata } from "next";
import Link from "next/link";
import SiteShell from "@/components/site-shell";
import SectionHeading from "@/components/section-heading";
import { createPageMetadata } from "@/data/seo";
import { applicationMatrix, productCategories } from "@/data/content";

export const metadata: Metadata = createPageMetadata({
  title: "Products | Botanical Powders, Dehydrated Ingredients, Rice, and Spice Supply",
  description:
    "Explore Prish Overseas product categories across botanical powders, dehydrated ingredients, export staples, and application-led sourcing solutions.",
  path: "/products",
  keywords: ["product catalog", "jamun powder exporter", "dehydrated onion powder", "rice exporter India"]
});

export default function ProductsPage() {
  return (
    <SiteShell>
      <section className="mx-auto max-w-7xl px-4 pb-12 pt-10 sm:px-6 sm:pb-16 sm:pt-16 lg:px-10 lg:pt-24">
        <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-saffron">Products</p>
            <h1 className="mt-5 max-w-4xl font-serif text-3xl text-[#0f172a] sm:text-5xl lg:text-6xl">A richer ingredient system for buyers balancing formulation needs and export structure.</h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-500">
              The portfolio is organized around commercial use, product behavior, and buyer relevance — not brochure blocks. Each family is presented as part of a sourcing and formulation logic.
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Link href="/inquiry" className="inline-flex items-center justify-center rounded-full bg-[#0f172a] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#1e293b] hover:shadow-[0_8px_24px_rgba(23,49,36,0.18)]">
                Request a product brief
              </Link>
              <Link href="/quality" className="inline-flex items-center justify-center rounded-full border border-slate-300 px-6 py-3 text-sm font-semibold text-[#0f172a] transition hover:border-[#0f172a] hover:bg-[#0f172a] hover:text-white">
                Review quality systems
              </Link>
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {applicationMatrix.map((item) => (
              <div key={item.sector} className="rounded-2xl border border-slate-200 bg-white p-6">
                <p className="text-xs uppercase tracking-[0.34em] text-saffron">{item.sector}</p>
                <p className="mt-4 text-sm leading-7 text-slate-500">{item.requirement}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {item.solutions.map((solution) => (
                    <span key={solution} className="rounded-full border border-slate-200 bg-white px-3 py-2 text-xs uppercase tracking-[0.18em] text-slate-500">
                      {solution}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl space-y-10 px-6 py-12 sm:px-8 lg:px-10 lg:py-20">
        <SectionHeading
          eyebrow="Category depth"
          title="Product families mapped to use cases, formats, and sourcing rationale."
          description="Each category below connects ingredient type, buyer application, processing behavior, and export-readiness into a cleaner decision-making view."
        />
        <div className="space-y-8">
          {productCategories.map((category) => (
            <article key={category.slug} className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
              <div className="grid gap-8 lg:grid-cols-[0.78fr_1.22fr]">
                <div>
                  <p className="text-xs uppercase tracking-[0.34em] text-saffron">{category.eyebrow}</p>
                  <h2 className="mt-4 font-serif text-4xl text-[#0f172a]">{category.title}</h2>
                  <p className="mt-4 text-sm leading-7 text-slate-500">{category.overview}</p>
                  <div className="mt-6 rounded-xl border border-slate-300 bg-slate-50 p-5 text-sm leading-7 text-slate-500">
                    <p className="text-xs uppercase tracking-[0.3em] text-saffron">Sourcing lens</p>
                    <p className="mt-3">{category.sourcing}</p>
                  </div>
                </div>
                <div className="grid gap-6">
                  <div className="grid gap-6 md:grid-cols-2">
                    <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">
                      <p className="text-xs uppercase tracking-[0.3em] text-saffron">Applications</p>
                      <ul className="mt-4 space-y-3 text-sm leading-7 text-slate-500">
                        {category.applications.map((application) => (
                          <li key={application}>{application}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">
                      <p className="text-xs uppercase tracking-[0.3em] text-saffron">Formats & alignment</p>
                      <ul className="mt-4 space-y-3 text-sm leading-7 text-slate-500">
                        {category.formats.map((format) => (
                          <li key={format}>{format}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <div className="grid gap-4 xl:grid-cols-3">
                    {category.products.map((product) => (
                      <div key={product.name} className="rounded-xl border border-slate-200 bg-white p-5">
                        <h3 className="font-serif text-2xl text-[#0f172a]">{product.name}</h3>
                        <p className="mt-3 text-sm leading-7 text-slate-500">{product.profile}</p>
                        <div className="mt-5 flex flex-wrap gap-2">
                          {product.useCases.map((useCase) => (
                            <span key={useCase} className="rounded-full border border-slate-200 bg-slate-50 px-3 py-2 text-[11px] uppercase tracking-[0.18em] text-slate-500">
                              {useCase}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </SiteShell>
  );
}
