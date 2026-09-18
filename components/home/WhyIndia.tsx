import { home } from "@/content/copy";
import { site } from "@/content/site";
import { SectionHeading } from "@/components/ui/primitives";
import { Rangoli } from "@/components/motion/Rangoli";

/** Section 5 — brochure p2 "Why source Indian ingredients", polished, with code-drawn rangoli. */
const reasons = [
  {
    title: `${site.sunshineDays} sunshine days`,
    text: "Strong sunlight in the major growing regions does the first half of drying and deepens colour, aroma and potency.",
  },
  {
    title: "Many agro-climatic zones",
    text: "From Ladakh’s sea buckthorn to Saurashtra’s cumin and Andhra’s chilli — one country, a dozen growing calendars.",
  },
  {
    title: "Traditional expertise, modern processing",
    text: "Families who have farmed for generations, and low-temperature drying and fine milling to keep what the field grew.",
  },
  {
    title: "Year-round availability",
    text: "Staggered harvests across belts mean most lines can be booked in every quarter — new crop or from stock.",
  },
];

export function WhyIndia() {
  return (
    <section
      data-theme="light"
      className="relative overflow-hidden bg-cream-100 py-section text-ink-900"
    >
      <Rangoli className="pointer-events-none absolute -right-40 top-1/2 h-[120vmin] w-[120vmin] -translate-y-1/2 text-forest-900/10 md:-right-64" />
      <div className="container-x relative">
        <SectionHeading
          eyebrow="Origin"
          title={home.whyIndiaTitle}
          sub="India has been a trusted source of agricultural and botanical ingredients for centuries. Here is what that means in practice."
        />
        <ul
          className="mt-14 grid gap-10 md:grid-cols-2 max-w-4xl"
          data-reveal-group
        >
          {reasons.map((r) => (
            <li
              key={r.title}
              className="border-l-2 border-gold-500 pl-6"
              data-reveal
            >
              <h3 className="font-display text-display-md">{r.title}</h3>
              <p className="mt-3 text-body text-ink-700">{r.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
