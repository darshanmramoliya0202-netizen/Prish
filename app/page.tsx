import type { Metadata } from "next";
import { createPageMetadata, defaultDescription } from "@/lib/seo";
import { site } from "@/content/site";
import { Hero } from "@/components/home/Hero";
import { ProductWorld } from "@/components/home/ProductWorld";
import { JourneyStoryboard } from "@/components/journey/JourneyStoryboard";
import { ProofStrip } from "@/components/home/ProofStrip";
import { WhyIndia } from "@/components/home/WhyIndia";
import { Families } from "@/components/home/Families";
import { AuditUs } from "@/components/home/AuditUs";
import { Apnapan } from "@/components/home/Apnapan";
import { Worldview } from "@/components/home/Worldview";
import { KitCta } from "@/components/home/KitCta";

export const metadata: Metadata = createPageMetadata({
  title: `${site.company} — Khet Se · From Indian farms to global formulations`,
  description: defaultDescription,
  path: "/",
});

export default function HomePage() {
  return (
    <>
      <Hero />
      <ProductWorld />
      <JourneyStoryboard />
      <ProofStrip />
      <WhyIndia />
      <Families />
      <AuditUs />
      <Apnapan />
      <Worldview />
      <KitCta />
    </>
  );
}
