import Link from "next/link";
import {
  orderedClusters,
  productsByCluster,
  clusterPath,
  home,
} from "@/content";
import { Accent, SectionHeading } from "@/components/ui/primitives";
import { IconArrow } from "@/components/ui/icons";

/** Section 6 — six family rows with Gujarati accents. */
export function Families() {
  return (
    <section data-theme="light" className="bg-cream-50 py-section text-ink-900">
      <div className="container-x">
        <SectionHeading
          eyebrow="Products"
          title={home.familiesTitle}
          sub="Every family has its own growing belts, buyers and paperwork. Pick the one you source."
        />
        <ol
          className="mt-14 divide-y divide-ink-900/10 border-y border-ink-900/10"
          data-reveal-group
        >
          {orderedClusters.map((c) => {
            const n = productsByCluster(c.id).length;
            return (
              <li key={c.id} data-reveal>
                <Link
                  href={clusterPath(c)}
                  className="group grid items-center gap-6 py-8 md:grid-cols-12 md:py-10"
                >
                  <div className="md:col-span-3">
                    <Accent accent={c.accent} size="sm" />
                  </div>
                  <div className="md:col-span-6">
                    <h3 className="font-display text-display-md group-hover:underline decoration-gold-500 underline-offset-8">
                      {c.name}
                    </h3>
                    <p className="mt-2 text-body text-ink-700">{c.promise}</p>
                  </div>
                  <div className="flex items-center justify-between md:col-span-3 md:justify-end md:gap-6">
                    <span className="text-small text-ink-500 tabular">
                      {n} {n === 1 ? "product" : "products"}
                    </span>
                    <span className="inline-flex size-11 items-center justify-center rounded-full border border-ink-900/20 transition-colors group-hover:bg-forest-900 group-hover:text-cream-50">
                      <IconArrow />
                    </span>
                  </div>
                </Link>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
