import Link from "next/link";
import { certificates } from "@/content/certificates";
import { home } from "@/content/copy";
import { ButtonLink, Pill, SectionHeading } from "@/components/ui/primitives";
import { IconArrow } from "@/components/ui/icons";

/**
 * Section 7 — "Audit us before you buy". Lists the certificate *types* we hold; the
 * numbers and scans render on /quality only when the owner has supplied them.
 */
export function AuditUs() {
  const held = certificates.filter((c) => c.status === "held" && c.showOn.includes("quality"));
  const pending = certificates.filter((c) => c.status === "in_process");
  return (
    <section data-theme="light" className="bg-cream-100 py-section text-ink-900">
      <div className="container-x grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <SectionHeading eyebrow="Proof, not promises" title={home.auditTitle} sub={home.auditSub} />
          <ButtonLink href="/quality" className="mt-8">
            See the documents <IconArrow />
          </ButtonLink>
        </div>
        <ul className="grid gap-4 sm:grid-cols-2 lg:col-span-7" role="list">
          {held.map((c) => (
            <li key={c.id} className="rounded-lg border border-ink-900/10 bg-cream-50 p-5 shadow-paper">
              <p className="font-display text-display-md leading-tight">{c.name}</p>
              <p className="mt-2 text-small text-ink-500">{c.issuer}</p>
              <p className="mt-4">{c.number ? <Pill tone="ok">On file · {c.number}</Pill> : <Pill tone="muted">Held · number on request</Pill>}</p>
            </li>
          ))}
          {pending.map((c) => (
            <li key={c.id} className="rounded-lg border border-dashed border-ink-900/20 p-5">
              <p className="font-display text-display-md leading-tight">{c.name}</p>
              <p className="mt-2 text-small text-ink-500">{c.issuer}</p>
              <p className="mt-4">
                <Pill tone="gold">Under approval</Pill>
              </p>
            </li>
          ))}
        </ul>
        <p className="text-small text-ink-500 lg:col-span-12">
          Every consignment ships with a lot-specific Certificate of Analysis. Third-party laboratory testing on request.{" "}
          <Link href="/quality" className="underline underline-offset-4">
            How testing works →
          </Link>
        </p>
      </div>
    </section>
  );
}
