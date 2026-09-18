import { site } from "@/content/site";
import { home } from "@/content/copy";
import { SectionHeading } from "@/components/ui/primitives";

/** Section 4 — the only numbers we publish (brochure). Count-up motion is attached later via data-count. */
export function ProofStrip() {
  return (
    <section
      data-theme="light"
      className="relative bg-cream-50 py-section text-ink-900"
    >
      <div className="container-x">
        <SectionHeading
          eyebrow="What we will put our name on"
          title={home.proofTitle}
          sub={home.proofSub}
        />
        <dl
          className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4"
          data-reveal-group
        >
          {site.stats.map((s) => (
            <div
              key={s.label}
              className="border-t border-ink-900/15 pt-6"
              data-reveal
            >
              <dd className="font-display text-display-lg leading-none tabular text-forest-900">
                <span data-count={s.value}>{s.value}</span>
                {s.unit ? (
                  <span className="ml-2 text-display-md text-ink-500">
                    {s.unit}
                  </span>
                ) : null}
              </dd>
              <dt className="mt-3 text-body text-ink-700">{s.label}</dt>
            </div>
          ))}
        </dl>
        <p className="mt-10 text-small text-ink-500">
          Source: our brochure. Ask for the current-season answer on anything
          else.
        </p>
      </div>
    </section>
  );
}
