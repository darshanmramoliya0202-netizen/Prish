import Image from "next/image";
import type { Person } from "@/content/types";

/**
 * The one real photo, treated as a duotone (forest + cream) with grain so it belongs to
 * the illustrated world; full colour on hover. Falls back to an initial monogram when
 * no photo has been supplied yet.
 */
export function Portrait({ person, className = "" }: { person: Person; className?: string }) {
  const initials = person.name
    .split(/\s+/)
    .map((w) => w[0])
    .join("")
    .slice(0, 2);
  return (
    <figure className={`relative aspect-[4/5] w-full max-w-md overflow-hidden rounded-xl bg-forest-900 shadow-deep ${className}`}>
      <svg className="absolute size-0" aria-hidden>
        <filter id="duotone-forest">
          <feColorMatrix type="matrix" values="0.3 0.59 0.11 0 0  0.3 0.59 0.11 0 0  0.3 0.59 0.11 0 0  0 0 0 1 0" />
          <feComponentTransfer>
            <feFuncR type="table" tableValues="0.04 0.98" />
            <feFuncG type="table" tableValues="0.24 0.97" />
            <feFuncB type="table" tableValues="0.18 0.95" />
          </feComponentTransfer>
        </filter>
      </svg>
      {person.photo ? (
        <Image
          src={person.photo}
          alt={`${person.name}, ${person.role}`}
          fill
          sizes="(min-width: 1024px) 40vw, 100vw"
          className="object-cover transition-[filter] duration-4 [filter:url(#duotone-forest)] hover:[filter:none]"
        />
      ) : (
        <div className="grid h-full place-items-center text-cream-50">
          <span className="font-display text-[8rem] leading-none text-gold-400">{initials}</span>
        </div>
      )}
      <div aria-hidden className="grain absolute inset-0" />
      <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-forest-950/90 to-transparent p-5 text-cream-50">
        <span className="font-display text-display-md leading-none">{person.name}</span>
        <span className="eyebrow mt-1 block opacity-80">{person.role} · Rajkot</span>
      </figcaption>
    </figure>
  );
}
