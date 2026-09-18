import { accents, home } from "@/content/copy";
import { site } from "@/content/site";
import { ButtonLink } from "@/components/ui/primitives";
import { IconArrow } from "@/components/ui/icons";
import { NamasteHands } from "@/components/motion/NamasteHands";

/**
 * Section 1 — the Namaste identity moment. LCP is text + inline SVG; no images.
 * Motion (SplitText resolve, DrawSVG hands) is attached by <HeroMotion/> in the motion phase.
 */
export function Hero() {
  return (
    <section data-theme="dark" data-hero className="relative isolate min-h-dvh overflow-hidden grain bg-forest-950 text-cream-50">
      {/* radial glow behind the word */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10" style={{ background: "radial-gradient(60% 50% at 50% 42%, rgba(212,162,76,0.16), transparent 70%)" }} />

      <div className="container-x flex min-h-dvh flex-col items-center justify-center pt-24 pb-20 text-center">
        <NamasteHands className="mb-6 h-24 w-auto text-gold-400 md:h-32" />
        <p lang={accents.namaste.lang} data-namaste className="font-deva text-display-2xl text-gold-400" aria-label={`${accents.namaste.roman} — ${accents.namaste.translation}`}>
          {accents.namaste.text}
        </p>
        <p className="eyebrow mt-3 text-cream-300">
          {accents.namaste.roman} · {accents.namaste.translation}
        </p>

        <h1 className="mt-10 max-w-4xl text-display-xl">
          From Indian farms to <span className="wonk text-gold-300">global</span> formulations.
        </h1>
        <p className="mt-6 max-w-2xl text-lead text-cream-100/85">{home.heroSub}</p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <ButtonLink href="/products" size="lg" variant="primary">
            See the products <IconArrow />
          </ButtonLink>
          <ButtonLink href="/quality" size="lg" variant="secondary">
            Audit us first
          </ButtonLink>
        </div>

        <p className="eyebrow mt-14 text-cream-300/70">{home.heroEyebrow}</p>
      </div>

      <div aria-hidden className="absolute bottom-6 left-1/2 -translate-x-1/2 text-cream-300/60">
        <span className="eyebrow">Scroll</span>
      </div>
      <span className="sr-only">{site.company}</span>
    </section>
  );
}
