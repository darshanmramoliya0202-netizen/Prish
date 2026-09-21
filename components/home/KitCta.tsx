import { home, cta } from "@/content/copy";
import { ButtonLink } from "@/components/ui/primitives";
import { IconArrow, IconWhatsApp } from "@/components/ui/icons";
import { waLink } from "@/lib/whatsapp";
import { SitePhoto, hasSitePhoto } from "@/components/ui/SitePhoto";

/** Section 10 — conversion. Gradient shifts with the pointer in the motion phase. */
export function KitCta() {
  const photo = hasSitePhoto("sample-kit");
  return (
    <section
      data-theme="world"
      data-kit-cta
      className="relative overflow-hidden py-section"
      style={{
        ["--world" as string]: "#e0a106",
        ["--world-2" as string]: "#a5133f",
        ["--world-ink" as string]: "#14110c",
        background:
          "linear-gradient(120deg, var(--world) 0%, #f28a1c var(--mx, 45%), var(--world-2) 100%)",
        color: "var(--world-ink)",
      }}
    >
      <div
        className={`container-x ${photo ? "grid items-center gap-10 text-left lg:grid-cols-12" : "text-center"}`}
      >
        {photo ? (
          <div className="lg:col-span-5">
            <SitePhoto
              id="sample-kit"
              alt="A sample kit: small labelled pouches of powders and whole spices packed in a box"
              sizes="(min-width: 1024px) 40vw, 90vw"
              className="aspect-[4/3] w-full rounded-2xl object-cover shadow-deep"
            />
          </div>
        ) : null}
        <div className={photo ? "lg:col-span-7" : ""}>
          <h2 className={`max-w-3xl text-display-xl ${photo ? "" : "mx-auto"}`}>
            {home.kitTitle}
          </h2>
          <p
            className={`mt-6 max-w-2xl text-lead opacity-85 ${photo ? "" : "mx-auto"}`}
          >
            {home.kitSub}
          </p>
          <div
            className={`mt-10 flex flex-wrap items-center gap-3 ${photo ? "" : "justify-center"}`}
          >
            <ButtonLink
              href="/inquiry"
              size="lg"
              className="!bg-ink-900 !text-cream-50 hover:!bg-forest-950"
            >
              {cta.kit} <IconArrow />
            </ButtonLink>
            <ButtonLink
              href={waLink()}
              size="lg"
              variant="whatsapp"
              data-umami-event="whatsapp_click"
              data-umami-event-placement="kit_cta"
            >
              <IconWhatsApp /> {cta.priceWhatsApp}
            </ButtonLink>
          </div>
          <p className="mt-8 text-small opacity-75">{cta.samples}</p>
        </div>
      </div>
    </section>
  );
}
