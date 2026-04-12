import Link from "next/link";

type Crumb = { label: string; href?: string };

export default function Breadcrumb({ crumbs }: { crumbs: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-1.5 text-xs text-ink-soft">
      {crumbs.map((crumb, i) => (
        <span key={i} className="flex items-center gap-1.5">
          {i > 0 && <span className="opacity-30">/</span>}
          {crumb.href ? (
            <Link href={crumb.href} className="transition hover:text-gold-warm">
              {crumb.label}
            </Link>
          ) : (
            <span className="font-medium text-ink">{crumb.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}
