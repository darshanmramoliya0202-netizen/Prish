import type { Metadata } from "next";
import { createPageMetadata, defaultDescription } from "@/lib/seo";
import { site } from "@/content/site";

export const metadata: Metadata = createPageMetadata({
  title: `${site.company} — Khet Se · From Indian farms to global formulations`,
  description: defaultDescription,
  path: "/",
});

export default function HomePage() {
  return (
    <main>
      <section data-theme="dark" className="min-h-dvh grid place-items-center container-x grain">
        <div className="text-center">
          <p lang="hi" className="font-deva text-display-2xl text-gold-400">
            नमस्ते
          </p>
          <h1 className="text-display-lg mt-6">{site.tagline}</h1>
          <p className="eyebrow mt-8 text-cream-300">
            {site.city}, {site.state} · 22.30° N 70.80° E
          </p>
        </div>
      </section>
    </main>
  );
}
