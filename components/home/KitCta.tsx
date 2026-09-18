import { home, cta } from "@/content/copy";
import { ButtonLink } from "@/components/ui/primitives";
import { IconArrow, IconWhatsApp } from "@/components/ui/icons";
import { waLink } from "@/lib/whatsapp";

/** Section 10 — conversion. Gradient shifts with the pointer in the motion phase. */
export function KitCta() {
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
      <div className="container-x text-center">
        <h2 className="mx-auto max-w-3xl text-display-xl">{home.kitTitle}</h2>
        <p className="mx-auto mt-6 max-w-2xl text-lead opacity-85">
          {home.kitSub}
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
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
    </section>
  );
}
