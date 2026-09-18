import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo";
import { products, orderedClusters, buyerTypeLabel, cta } from "@/content";
import { site } from "@/content/site";
import type { BuyerTypeId } from "@/content/types";
import { KitBuilder } from "@/components/inquiry/KitBuilder";
import { QuickForm } from "@/components/inquiry/QuickForm";
import { toKitProducts } from "@/components/inquiry/kit-data";
import { IconMail, IconPhone, IconPin, IconWhatsApp } from "@/components/ui/icons";
import { waLink } from "@/lib/whatsapp";

export const metadata: Metadata = createPageMetadata({
  title: "Inquiry & sample kit — tell us what you're sourcing",
  description: "Build a sample kit from 27 Indian-origin ingredients, tell us your market, and get a quote against today's crop by email and WhatsApp. FOB and CIF.",
  path: "/inquiry",
});

const BUYER_TYPES = (Object.keys(buyerTypeLabel) as BuyerTypeId[]).map((id) => ({ id, label: buyerTypeLabel[id] }));

export default async function InquiryPage({ searchParams }: { searchParams: Promise<{ product?: string; kit?: string }> }) {
  const sp = await searchParams;
  const preselect = [sp.product, ...(sp.kit?.split(",") ?? [])].filter((s): s is string => !!s);
  return (
    <>
      <section data-theme="dark" className="grain bg-forest-950 pt-32 pb-14 text-cream-50 md:pt-40 md:pb-20">
        <div className="container-x">
          <p className="eyebrow text-gold-400">Sample kit</p>
          <h1 className="mt-4 max-w-4xl text-display-xl">Tell us what you&apos;re sourcing.</h1>
          <p className="mt-6 max-w-2xl text-lead text-cream-100/85">Pick products, add the spec brief and documents you need, tell us your market. We quote against today&apos;s crop — by email and WhatsApp. {cta.samples}</p>
        </div>
      </section>

      <section data-theme="light" className="bg-cream-50 py-16 text-ink-900 md:py-24">
        <div className="container-x">
          <KitBuilder products={toKitProducts(products)} buyerTypes={BUYER_TYPES} clusters={orderedClusters.map((c) => ({ id: c.id, name: c.shortName }))} preselect={preselect} />
        </div>
      </section>

      <section data-theme="light" className="bg-cream-100 py-16 text-ink-900 md:py-24">
        <div className="container-x grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="eyebrow text-ink-500">Just a question?</p>
            <h2 className="mt-3 text-display-lg">Ask it here.</h2>
            <p className="mt-4 text-body text-ink-700">No kit needed. Documents, availability, whether we can do a spec — ask and a person answers.</p>
            <ul className="mt-10 space-y-4 text-body">
              <li className="flex gap-3">
                <IconWhatsApp className="mt-1 shrink-0" />
                <a href={waLink()} target="_blank" rel="noopener noreferrer" className="underline-offset-4 hover:underline" data-umami-event="whatsapp_click" data-umami-event-placement="inquiry_contact">
                  WhatsApp {site.phones[0]}
                </a>
              </li>
              <li className="flex gap-3">
                <IconMail className="mt-1 shrink-0" />
                <a href={`mailto:${site.email}`} className="underline-offset-4 hover:underline">
                  {site.email}
                </a>
              </li>
              <li className="flex gap-3">
                <IconPhone className="mt-1 shrink-0" />
                <span>{site.phones.join(" · ")}</span>
              </li>
              <li className="flex gap-3">
                <IconPin className="mt-1 shrink-0" />
                <address className="not-italic">{site.address.join(", ")}</address>
              </li>
            </ul>
          </div>
          <div className="lg:col-span-7">
            <QuickForm />
          </div>
        </div>
      </section>
    </>
  );
}
