import { accents, home } from "@/content/copy";
import { site } from "@/content/site";
import { ButtonLink } from "@/components/ui/primitives";
import { IconArrow } from "@/components/ui/icons";
import { NamasteHands } from "@/components/motion/NamasteHands";
import { SitePhoto } from "@/components/ui/SitePhoto";

/**
 * Section 1 — the Namaste identity moment. LCP is the h1, which is never hidden; the
 * word, hands and [data-hero-fade] bits start at opacity 0 (globals.css) and the
 * MotionDirector brings them in: the two hands slide together and draw on, dip in a
 * slight bow, then नमस्ते is written akshara by akshara (never split by code point).
 */
export function Hero() {
  return (
    <section
      data-theme="dark"
      data-hero
      className="relative isolate min-h-dvh overflow-hidden grain bg-forest-950 text-cream-50"
    >
      {/* optional photographic backdrop (photos/site/hero-dawn.jpg), kept very dark so the
          greeting and the h1 stay the subject */}
      <SitePhoto
        id="hero-dawn"
        alt=""
        fill
        priority
        sizes="100vw"
        quality={70}
        className="pointer-events-none -z-20 object-cover opacity-[.32] [mask-image:linear-gradient(to_bottom,black_40%,transparent_95%)]"
      />
      {/* radial glow behind the word */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(60% 50% at 50% 42%, rgba(212,162,76,0.16), transparent 70%)",
        }}
      />

      <div className="container-x flex min-h-dvh flex-col items-center justify-center pt-24 pb-20 text-center">
        <NamasteHands className="mb-4 h-28 w-auto text-gold-400 md:h-36" />
        <p className="font-deva text-display-2xl text-gold-400">
          <span lang={accents.namaste.lang} data-namaste aria-hidden>
            {accents.namaste.aksharas.map((a, i) => (
              <span key={i} data-akshara className="inline-block">
                {a}
              </span>
            ))}
          </span>
          <span className="sr-only">
            {accents.namaste.text} — {accents.namaste.roman},{" "}
            {accents.namaste.translation}
          </span>
        </p>
        <p className="eyebrow mt-3 text-cream-300" data-hero-fade>
          {accents.namaste.roman} · {accents.namaste.translation}
        </p>

        <h1 className="mt-10 max-w-4xl text-display-xl">
          From Indian farms to{" "}
          <span className="wonk text-gold-300">global</span> formulations.
        </h1>
        <p
          className="mt-6 max-w-2xl text-lead text-cream-100/85"
          data-hero-fade
        >
          {home.heroSub}
        </p>

        <div
          className="mt-10 flex flex-wrap items-center justify-center gap-3"
          data-hero-fade
        >
          <ButtonLink href="/products" size="lg" variant="primary">
            See the products <IconArrow />
          </ButtonLink>
          <ButtonLink href="/quality" size="lg" variant="secondary">
            Audit us first
          </ButtonLink>
        </div>

        <p className="eyebrow mt-14 text-cream-300/70" data-hero-fade>
          {home.heroEyebrow}
        </p>
      </div>

      <div
        aria-hidden
        className="absolute bottom-6 left-1/2 -translate-x-1/2 text-cream-300/60"
      >
        <span className="eyebrow">Scroll</span>
      </div>
      <span className="sr-only">{site.company}</span>
    </section>
  );
}
