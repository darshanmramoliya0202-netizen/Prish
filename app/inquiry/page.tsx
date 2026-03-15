import type { Metadata } from "next";
import InquiryForm from "@/components/inquiry-form";
import SiteShell from "@/components/site-shell";
import SectionHeading from "@/components/section-heading";
import { contact } from "@/data/site";
import { inquiryTopics } from "@/data/content";
import { createPageMetadata } from "@/data/seo";

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
      <section className="mx-auto max-w-7xl px-6 pb-16 pt-16 sm:px-8 lg:px-10 lg:pt-24">
        <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr]">
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-[#8a6433]">Inquiry</p>
            <h1 className="mt-5 max-w-4xl font-serif text-5xl text-[#173124] sm:text-6xl">A proper intake flow for product, market, packaging, and partnership conversations.</h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-[#5a7062]">
              This form is designed to collect the key context an export-oriented discussion needs: product interest, target market, commercial volume, and documentation or packaging expectations.
            </p>
            <div className="mt-8 rounded-2xl border border-[#e2d6bf] bg-white/50 p-6">
              <p className="text-xs uppercase tracking-[0.34em] text-[#8a6433]">Direct contact</p>
              <div className="mt-4 space-y-2 text-sm leading-7 text-[#5a7062]">
                {contact.address.map((line) => (
                  <p key={line}>{line}</p>
                ))}
                <a href={`mailto:${contact.email}`} className="block transition hover:text-[#173124]">
                  {contact.email}
                </a>
                {contact.phones.map((phone) => (
                  <a key={phone} href={`tel:${phone.replace(/\s+/g, "")}`} className="block transition hover:text-[#173124]">
                    {phone}
                  </a>
                ))}
              </div>
            </div>
          </div>
          <div className="rounded-2xl border border-[#d8c49c] bg-[#fff8ea] p-6 sm:p-8">
            <SectionHeading
              eyebrow="Inquiry topics"
              title="Structured around real buyer questions."
              description="Use the intake to start a conversation around sourcing, documentation, validation, packaging, or long-term supply planning."
            />
            <div className="mt-8 flex flex-wrap gap-3">
              {inquiryTopics.map((topic) => (
                <span key={topic} className="rounded-full border border-[#e2d6bf] bg-white/60 px-4 py-3 text-xs uppercase tracking-[0.18em] text-[#5a7062]">
                  {topic}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-12 sm:px-8 lg:px-10 lg:pb-24">
        <InquiryForm />
      </section>
    </SiteShell>
  );
}
