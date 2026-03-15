import type { Metadata } from "next";
import HomePage from "@/components/home-page";
import { createPageMetadata } from "@/data/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Prish Overseas | India-Rooted Export Ingredients for Global Buyers",
  description:
    "Discover Prish Overseas, an India-rooted export partner for botanical powders, dehydrated ingredients, rice, and specification-ready global sourcing.",
  path: "/",
  keywords: ["Indian export partner", "botanical powders India", "dehydrated ingredients India"]
});

export default function Page() {
  return <HomePage />;
}
