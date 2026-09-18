import { journey } from "@/content/journey";
import { home } from "@/content/copy";
import { SectionHeading } from "@/components/ui/primitives";
import {
  SceneCoast,
  SceneHarvest,
  SceneMill,
  SceneSoil,
  SceneSun,
} from "./scenes";
import { WorldMap } from "./WorldMap";

const ART = {
  soil: SceneSoil,
  harvest: SceneHarvest,
  sun: SceneSun,
  mill: SceneMill,
  coast: SceneCoast,
} as const;

/**
 * Farm → Port → World as a vertical storyboard. This is the static/reduced-motion
 * rendering; the pinned scroll-scrub version (motion phase) reuses the same scenes.
 */
export function JourneyStoryboard() {
  return (
    <section
      data-theme="dark"
      data-journey
      className="relative grain bg-forest-950 py-section text-cream-50"
    >
      <div className="container-x">
        <SectionHeading
          eyebrow="Traceability"
          title={home.journeyTitle}
          sub={home.journeySub}
        />
        <ol className="mt-16 space-y-20">
          {journey.scenes.map((s) => {
            const Art = s.id === "world" ? null : ART[s.id as keyof typeof ART];
            return (
              <li
                key={s.id}
                className="grid items-center gap-8 lg:grid-cols-12"
                data-scene={s.id}
              >
                <div className="lg:col-span-4">
                  <p className="font-display text-display-xl text-gold-400 leading-none">
                    {s.index}
                  </p>
                  <h3 className="mt-4 text-display-md">{s.title}</h3>
                  <p className="mt-4 text-body text-cream-100/85">
                    {s.caption}
                  </p>
                  {s.accent ? (
                    <p className="mt-6">
                      <span
                        lang={s.accent.lang}
                        className="font-deva text-display-md text-gold-300"
                      >
                        {s.accent.text}
                      </span>
                      <span className="eyebrow ml-3 opacity-70">
                        {s.accent.roman}
                      </span>
                    </p>
                  ) : null}
                </div>
                <div className="overflow-hidden rounded-xl shadow-deep lg:col-span-8">
                  {Art ? (
                    <Art className="block w-full" />
                  ) : (
                    <WorldMap className="block w-full bg-forest-900 p-6 text-cream-50" />
                  )}
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
