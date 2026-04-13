import type { Metadata } from "next";
import Image from "next/image";
import InquiryForm from "@/components/inquiry-form";
import SiteShell from "@/components/site-shell";
import SectionHeading from "@/components/section-heading";
import DarkStrip from "@/components/dark-strip";
import { contact } from "@/data/site";
import { inquiryTopics } from "@/data/content";
import { createPageMetadata } from "@/data/seo";

const whyChooseUs = [
  { title: "Direct Farm Sourcing", text: "No middlemen. We source directly from Indian agricultural belts for authentic quality and competitive pricing." },
  { title: "Export-Ready Documentation", text: "FSSAI, ISO/HACCP aligned. Pre-shipment docs prepared for EU, GCC, US, and Southeast Asia." },
  { title: "Custom Specifications", text: "100+ spec profiles. We align mesh size, moisture, curcumin levels, and packaging to your exact needs." },
  { title: "Reliable Container Supply", text: "2500+ MT monthly capacity. FCL and LCL movements with consistent batch quality." }
];

export const metadata: Metadata = createPageMetadata({
  title: "Inquiry | Start a Product, Packaging, or Supply Conversation",
  description:
    "Submit a structured inquiry to Prish Overseas for product sourcing, packaging options, specification alignment, and export market support.",
  path: "/inquiry",
  keywords: ["inquiry form", "export inquiry", "bulk ingredient sourcing", "packaging request"]
});

export default function InquiryPage() {
  return (
    <SiteShell>
      <div className="pointer-events-none absolute inset-x-0 top-16 h-20 bg-gradient-to-b from-leaf-dark/6 to-transparent" />
      <section className="mx-auto max-w-7xl px-4 pb-12 pt-10 sm:px-6 sm:pb-16 sm:pt-16 lg:px-10 lg:pt-24">
        <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr]">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.4em] text-gold-warm">Inquiry</p>
            <h1 className="mt-5 max-w-4xl font-serif text-2xl text-ink sm:text-4xl lg:text-6xl">Start a product, packaging, or supply conversation.</h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-ink-soft">
              This form is designed to collect the key context an export-oriented discussion needs: product interest, target market, commercial volume, and documentation or packaging expectations.
            </p>
            <div className="mt-8 rounded-2xl border border-wheat/25 bg-white/80 p-6 shadow-card-light">
              <p className="text-xs uppercase tracking-[0.34em] text-gold-warm">Direct contact</p>
              <div className="mt-4 space-y-2 text-sm leading-7 text-ink-soft">
                {contact.address.map((line) => (
                  <p key={line}>{line}</p>
                ))}
                <a href={`mailto:${contact.email}`} className="block transition hover:text-ink">
                  {contact.email}
                </a>
                {contact.phones.map((phone) => (
                  <a key={phone} href={`tel:${phone.replace(/\s+/g, "")}`} className="block transition hover:text-ink">
                    {phone}
                  </a>
                ))}
              </div>
            </div>
          </div>
          <div className="rounded-2xl border border-wheat/25 bg-parchment/35 p-6 shadow-card-light sm:p-8">
            <SectionHeading
              eyebrow="Inquiry topics"
              title="Structured around real buyer questions."
              description="Use the intake to start a conversation around sourcing, documentation, validation, packaging, or long-term supply planning."
            />
            <div className="mt-8 flex flex-wrap gap-3">
              {inquiryTopics.map((topic) => (
                <span key={topic} className="rounded-full border border-wheat/20 bg-white/80 px-4 py-3 text-xs uppercase tracking-[0.18em] text-ink-soft">
                  {topic}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-10">
        <div className="mb-10">
          <p className="text-xs font-semibold uppercase tracking-[0.4em] text-gold-warm">Why Partner With Us</p>
          <h2 className="mt-4 max-w-xl font-serif text-2xl text-ink sm:text-3xl">Built for serious buyers, not casual browsers.</h2>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {whyChooseUs.map((item) => (
            <div key={item.title} className="rounded-2xl border border-wheat/25 bg-white/80 p-5 shadow-card-light transition hover:-translate-y-0.5 hover:border-gold-warm/25">
              <h3 className="text-sm font-semibold text-ink">{item.title}</h3>
              <p className="mt-2 text-xs leading-5 text-ink-soft">{item.text}</p>
            </div>
          ))}
        </div>
        <div className="mt-6 relative h-40 w-full overflow-hidden rounded-2xl">
          <Image src="/images/products/orange-powder.jpg" alt="Premium Indian ingredients" fill sizes="100vw" className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent" />
          <p className="absolute bottom-4 left-6 text-sm font-semibold text-white">Premium Indian-origin ingredients for global B2B buyers</p>
        </div>
      </section>

      <DarkStrip
        variant="stats"
        stats={[
          { value: "24 hrs", label: "Average response time", sublabel: "Mon – Sat" },
          { value: "100+", label: "Spec profiles supported", sublabel: "Per-buyer customisation" },
          { value: "15+", label: "Countries served", sublabel: "Active export destinations" },
        ]}
      />

      <section className="mx-auto max-w-7xl px-6 py-12 sm:px-8 lg:px-10 lg:pb-24">
        <InquiryForm />
      </section>
    </SiteShell>
  );
}
