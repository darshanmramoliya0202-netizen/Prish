import Image from "next/image";
import { story } from "@/content/story";
import { Accent } from "@/components/ui/primitives";

/**
 * Vasudhaiva Kutumbakam — the company's worldview, with India's 2023 G20 theme as
 * national context. The PM portrait renders only when a licensed image is configured,
 * always with credit; no quote is ever attributed to him.
 */
export function Worldview({ compact = false }: { compact?: boolean }) {
  const w = story.worldview;
  return (
    <section
      data-theme="dark"
      className="relative overflow-hidden grain bg-forest-950 py-section text-cream-50"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -left-40 top-1/2 size-[70vmin] -translate-y-1/2 rounded-full border border-cream-50/10"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-24 top-1/2 size-[50vmin] -translate-y-1/2 rounded-full border border-cream-50/10"
      />
      <div className="container-x relative grid gap-12 lg:grid-cols-12 lg:items-center">
        <div className={w.pm.image ? "lg:col-span-7" : "lg:col-span-8"}>
          <Accent
            accent={{
              script: "deva",
              text: w.sanskrit,
              roman: w.roman,
              lang: "hi",
            }}
            translation={w.translation}
            size={compact ? "md" : "lg"}
            className="text-gold-300"
          />
          <p className="mt-6 max-w-xl text-lead text-cream-100/85">
            {w.origin}
          </p>
          <ul className="mt-10 space-y-4">
            {w.lines.map((l) => {
              const [head, ...rest] = l.split(":");
              return (
                <li key={l} className="flex gap-4">
                  <span
                    className="mt-2 size-2 shrink-0 rounded-full bg-gold-500"
                    aria-hidden
                  />
                  <p className="text-body">
                    <strong className="font-display text-display-md font-normal">
                      {head}
                    </strong>
                    <span className="block text-cream-100/80">
                      {rest.join(":").trim()}
                    </span>
                  </p>
                </li>
              );
            })}
          </ul>
          <p className="mt-10 border-l-2 border-gold-500 pl-5 text-small text-cream-100/70">
            <span className="font-semibold text-cream-50">{w.g20.theme}</span> —{" "}
            {w.g20.attribution}
          </p>
        </div>
        {w.pm.image ? (
          <figure className="lg:col-span-5">
            <div className="relative aspect-[4/5] overflow-hidden rounded-xl">
              <Image
                src={w.pm.image}
                alt={w.pm.caption}
                fill
                sizes="(min-width:1024px) 35vw, 100vw"
                className="object-cover"
              />
            </div>
            <figcaption className="mt-3 text-small text-cream-100/70">
              {w.pm.caption}{" "}
              <span className="block opacity-70">{w.pm.credit}</span>
            </figcaption>
          </figure>
        ) : null}
      </div>
    </section>
  );
}
