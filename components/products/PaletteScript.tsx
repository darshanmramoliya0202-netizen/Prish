import { products, productPhotos } from "@/content";

/**
 * Exposes what the burst needs per product — colour world, and for photographed bowls
 * the bowl's box and the piece atlas layout — without shipping the whole model.
 * `window.__prishPalettes` stays for the page-transition check; the rest is
 * `window.__prishBurstMeta` (see lib/burst.ts › BurstMeta).
 */
export function PaletteScript() {
  const palettes = Object.fromEntries(
    products.map((p) => [p.slug, p.colourWorld.particles]),
  );
  const meta = Object.fromEntries(
    products.map((p) => {
      const ph = productPhotos(p.slug);
      const m: Record<string, unknown> = { palette: p.colourWorld.particles };
      if (ph.bowl && ph.anchor)
        m.anchor = [ph.anchor.x, ph.anchor.y, ph.anchor.w, ph.anchor.h];
      if (ph.bowl && ph.pieces)
        m.pieces = {
          src: ph.pieces.src,
          cell: ph.pieces.cell,
          cols: ph.pieces.cols,
          rows: ph.pieces.rows,
          // the sprite size rides along when the manifest has it (see content/photos.ts › PieceBox)
          items: ph.pieces.items.map((b) =>
            b.tw && b.th ? [b.x, b.y, b.w, b.h, b.tw, b.th] : [b.x, b.y, b.w, b.h],
          ),
        };
      return [p.slug, m];
    }),
  );
  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `window.__prishPalettes=${JSON.stringify(palettes)};window.__prishBurstMeta=${JSON.stringify(meta)}`,
      }}
    />
  );
}
