import { products } from "@/content";

/** Exposes product colour worlds to the burst interaction without shipping the whole model. */
export function PaletteScript() {
  const map = Object.fromEntries(
    products.map((p) => [p.slug, p.colourWorld.particles]),
  );
  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `window.__prishPalettes=${JSON.stringify(map)}`,
      }}
    />
  );
}
