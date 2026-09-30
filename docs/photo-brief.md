# Photo brief — Prish Overseas v3

*Assessment of where the site needs real imagery, the honesty rules for it, the house style, the shot list with generator prompts, and how to deliver files so they appear on the site with no code changes.*

Companion file: [`photo-prompts-products.md`](photo-prompts-products.md) — the 27 × 3 product prompts, generated from the catalogue (`npm run photos:prompts`).

---

## 0. Where the site stands

**As of 30 Sept 2026 every product runs on the owner's own product sheets** — 27 generated collages (bowl sheet on top; dark-slate bowl, field and close-up tiles below) in `F:\Prish Overseas\product-photos\webphotos\products photos\products photos\`. `scripts/photos-import-archive.mjs` (`SHEETS`) crops each collage into `bowl` (plus `bowl-2` where the sheet has two) and `source` (the field tile), and writes the hand-measured bowl box (§5); the nine large dark-slate `scene`s still come from `F:\Prish Overseas\archive`. `npm run photos:prep` knocks the bowls out, cuts the loose crop into the burst atlas, and writes the manifest. **Real photographs dropped into the same slots replace them with no code change** — the importer never overwrites a newer file.

What each product has today: **27 / 27 photographed bowls (26 with burst pieces; onion flakes bursts as dust), 27 / 27 origin (field) photos, 9 / 27 dark-slate hero scenes, 0 / 27 macros.** Basmati 1509 uses the 1121 sheet, mirrored. The small dark-slate and close-up tiles in each collage are not used: the first are too small for the full-bleed hero (~460 px), the second are generated and so can never be the "Actual product" chip. Six extra sheets (blackberry, blueberry, cranberry, raspberry and strawberry powder, ajwain, fennel) are on hold — they are not in the 27-product catalogue.

Where the photos appear: the bowl everywhere a product is shown (home arc, family pages, cards, OG image, spec sheet, catalogue cover) and in the burst; the field photo in the origin section, the hero chip ("Where it grows"), softly behind the bowl on the 18 product heroes without a scene, and as a glow behind the home arc when its bowl is hovered.

Site slots filled: `hero-dawn` (five bowls on slate, behind the Namaste), `journey-soil / harvest / sun / mill / coast`, `season-sowing / tending / harvest / trade`, `quality-lab`. Still empty: `family-*` (six), `sample-kit`, `pack-*` (four), Yash's portrait, certificate scans, every "Actual product" macro.

Roles, per product (`assets-src/photos/products/<slug>/`):

| File | What appears | Notes |
|---|---|---|
| `bowl.*` | the product in its bowl **with the raw crop beside it**, on a plain sweep → knocked out; the pieces beside the bowl become the burst | square-ish, 1000 px or more; dark bowl or white bowl both fine; label text at the bottom is erased when a sibling `bowl.json` says `{ "text": true }` |
| `scene.*` | full photograph behind the product hero (replaces the bowl there) | any aspect; the copy side gets a colour-world scrim |
| `macro.*` | the **"Actual product"** chip + gallery — **real photo only** | square close-up |
| `source.*` | the origin section, beside the map | 4:3 |

Site slots (`assets-src/photos/site/<id>.*`) are unchanged — see §4. The image-by-image verdict (keep / replace / generate) is in [`photo-review.md`](photo-review.md).

## 1. The honesty line

You do not want an "AI" label, and you do want the site to feel honest. Both are achievable with one rule:

> **A photograph may be generated only when it makes no factual claim about Prish Overseas.**
> Anything that *is* a claim about Prish — people, documents, certificates, facilities, machinery, the samples a buyer will receive — is photographed for real or not shown.

Concretely:

**Must be real (never generate):**
- Yash Talaviya's portrait, and any future team member.
- Certificate / licence scans, spec sheets, COAs, packing lists — no fabricated paperwork, ever.
- The **"Actual product" macro chips.** The label literally says *actual product* — a generated close-up would make it false. Shoot these with a phone (guide in §3). It is one afternoon's work for 27 SKUs and it is the single most credible image on each page.
- Anything that shows or implies *our* plant, *our* warehouse, *our* lab, *our* trucks (owner rule: never "our factory").

**May be generated (representative, not a claim):**
- Landscapes and farm scenes of the actual growing belts (Saurashtra, Guntur, Erode, Mahuva, Punjab …) — they show *where this comes from*, which is true.
- The product itself heaped in the house bowl — it is what the product looks like; the bowl is a prop.
- Generic process moments common to the whole trade (chillies drying in an open yard, onion slices on trays, sacks at a mandi) — framed wide and anonymous, never as "our" anything.
- Packaging formats from the brochure list — plain, unbranded.
- Still-lifes: a sample kit of plain kraft pouches, spices on jute.

**Never, in any image:** text, labels, logos, signage, watermarks, licence plates, brand-new branded machinery, invented documents, faces (people only as hands or distant figures — a face implies "our team").

### Why the *look* matters as much as the subject

A glossy stock-photo aesthetic reads as fake even when it is real. Every image on the site should share one **documentary house style** so the set feels like one photographer's honest record:

- natural light only (dawn / late afternoon / open shade / a single window), never studio flash glare
- 35 mm-film feel: slightly muted, warm, visible grain, gentle contrast — nothing HDR or oversaturated
- imperfection kept: dust, uneven heaps, a chipped rim, wear on a tray
- India-specific detail: black-cotton soil, jute, bamboo trays, kurta cuffs, the light of the Saurashtra plain
- shallow but honest depth of field — the subject sharp, the context readable
- square-on or three-quarter compositions with room to breathe; no dramatic wide-angle distortion

Run the prep script once and every file is graded to the same size and quality, which does half the job of making them feel like one set.

---

## 2. House style — paste before every prompt

**Style preamble (documentary / site set):**

> Documentary photograph, 35 mm film look, natural light, honest and unposed, slightly muted warm colour grade with visible grain, India. No faces, no signage, no text, no logos, no brand-new machinery. Composition simple and square-on, subject sharp, background readable.

**Style preamble (product still-life / bowl set):**

> Editorial product photography, honest and unretouched-looking: real texture, natural light from one soft window, shallow but not blurry depth of field. No text, no labels, no logos, no watermark, no hands, no props other than what is named.

**Negative prompt (everything):**

> text, letters, watermark, logo, label, packaging, faces, cartoon, illustration, 3D render, plastic look, oversaturated, HDR, glossy stock-photo look, studio flash glare, lens flare, tilt-shift

Generator notes: use the tool's **image-edit / reference-image** mode wherever consistency matters (the bowl set, the four packaging shots). Fix one seed / style reference for the whole site set. Ask for the largest output the tool offers; the prep script downsizes.

---

## 3. The product set — one sheet per SKU

Every product gets **one generated image** that covers everything the site needs from it: the house bowl with the product in it, and around it — each piece separate — the real crop it comes from (the fruit whole and cut open to show the pulp, its leaves and seeds; the spice whole and broken). `npm run photos:prep` knocks the sweep out, shows the composition as the pot, and lifts every loose piece into the burst. The per-product ingredient lines and finished prompts are in [`photo-prompts-products.md`](photo-prompts-products.md); the verdict on what exists is in [`photo-review.md`](photo-review.md).

**The house bowl (in every prompt):**

> a plain matte white ceramic bowl — low and wide, thin slightly uneven rim, unglazed foot — the same bowl in every image, seen three-quarter from about 25° above, centred

**The sweep (background):** flat, seamless, no gradient, no vignette, no horizon line. **Pure white (#FFFFFF)** for coloured products; **mid warm grey (#BFBAB2)** for pale ones (onion, garlic, rice, lemon, apple) so white powder and white cloves stay separable. One soft window light from the upper left; only a small contact shadow under each object.

**The layout:** pieces about a finger's width from the bowl and from each other, none touching, none overlapping, none cut by the frame; the whole arrangement compact, filling about four fifths of the square. Touching pieces fly as one lump; a piece touching the bowl does not fly at all.

**More pieces:** generate the same prompt again ("a different arrangement of the same things") and save it as `bowl-2.png` (`bowl-3.png` …). Only the pieces are taken from those; the pot stays `bowl.png`.

**Real bowls (recommended in the long run):** one white bowl, one white sheet (or a grey card for the pale products), one window, one phone, 27 samples and the raw crop from the market — same layout rules. The pipeline treats a photograph and a generation identically.

**`macro` — the "Actual product" chip — real photos only.** A spoonful of the sample on a black slate tile (powders, rice) or a white plate (dark seeds, chillies), phone 15–20 cm above pointing straight down, window light, no flash, fill the frame. Never generated: the label says *actual*.

**`scene` (optional)** — the dark-slate still life behind the product hero; prompt per product in the prompts file. **`source` (optional)** — the origin photo; prompt per product in the prompts file.

## 4. The site set — shot list with prompts

All documentary style (§2 preamble + negative prompt). Sizes are the *minimum*; larger is fine.

### Home

**`hero-dawn`** · hero backdrop · 16:9, 2400×1350 · *optional — it costs a little LCP; try it and check Lighthouse.* Kept at ~30 % opacity behind the Namaste, so it needs a dark, quiet composition.
> Saurashtra plain at first light: flat black-cotton-soil fields to a far horizon, a thin line of neem trees, a faint band of orange at the horizon under a deep green-black sky. Very dark, quiet, wide, cinematic but honest. Nothing in the foreground.

**`journey-soil`** · scene 01 "Soil & seed" · 12:7, 2400×1400 · *today's file is a harvest scene — replace*
> Freshly ploughed black cotton soil in Saurashtra at first light, furrows running toward a low orange sun, a few cumin seedlings breaking through in the nearest row, dew on the clods, a neem tree small on the horizon. Low camera, honest, no people, no machinery.

**`journey-harvest`** · scene 02 "Harvest" · 12:7
> A farmer's weathered hands (no face) holding a double handful of freshly picked red chillies over a jute sack in a Guntur field, plants behind, hard morning light, dust in the air.

**`journey-sun`** · scene 03 "Sun & drying" · 12:7 · *today's file is hands holding grain — replace*
> Open-air drying yard under a white-hot noon sun: broad strips of red chillies and ochre turmeric fingers spread on tarpaulins, receding to the horizon, heat haze, a lone wooden rake lying across one strip, no people, no signage.

**`journey-mill`** · scene 04 "Milling & packing" · 12:7 · *framed as the trade's standard packaging, not a facility of ours; today's file (sacks and a truck in a field) is a placeholder*
> Export packaging ready to ship, photographed generically: plain 25 kg food-grade fibre drums, unprinted white HDPE bags and one plain brown bulk carton on a wooden pallet in soft daylight from a large doorway, a light dusting of turmeric on the floor, no signage, no machinery, no people, no logos.

**`journey-coast`** · scene 05 "The Gujarat coast" · 12:7
> Shipping containers stacked at a Gujarat port yard at golden hour, gantry cranes as silhouettes, a haze over the sea beyond, dust and warm light; no readable container markings, no logos, no people.

**`family-fruit-powders`** · 3:2, 1800×1200
> A weathered wooden tray of Indian fruit — jamun, guava, raw mango, a Nagpur orange, a lemon — on a jute cloth in open shade, dappled light, a few leaves.

**`family-vegetable-herbal-powders`** · 3:2
> Freshly harvested beetroots with soil on them, a bunch of spinach and ripe tomatoes in a cane basket at the edge of a field, dawn light.

**`family-dehydrated-onion-garlic`** · 3:2
> White onions heaped after harvest at Mahuva, Gujarat, a few garlic bulbs in the foreground, papery skins catching low warm sun.

**`family-raw-whole-spices`** · 3:2
> Small heaps of whole spices on rough jute — dried red chillies, turmeric fingers, cumin seed, coriander seed — top-down, window light from one side, honest texture.

**`family-botanicals`** · 3:2
> Fresh moringa leaves on their feathery stems laid on a bamboo tray, a small heap of deep green leaf powder beside them, soft morning light.

**`family-basmati-rice`** · 3:2
> Long-grain basmati pouring from a jute sack into a brass measure at a Punjab mandi, dusty warm light, grains sharp in the foreground.

**`sample-kit`** · 4:3, 2000×1500 · *the kit as buyers actually receive it — best shot for real when you assemble one*
> An open corrugated shipping box with eight small plain kraft-paper sample pouches, each with a blank cream tag on a string, a few pouches out on a cream tabletop with a spoon of red chilli powder and a spoon of turmeric beside them, soft daylight, no text on anything.

### Story

**`season-sowing`** · 4:3, 1600×1200 · *today's file is an aerial view of fields — replace*
> A farmer's weathered hands (no face) dropping cumin seed into a shallow furrow in dark black-cotton soil, Saurashtra, low morning sun raking across the field, the next furrows soft behind.

**`season-tending`** · 4:3
> Young cumin plants in neat rows on sandy soil under a wide sky, a farmer's feet and the hem of a dhoti at the edge of frame, irrigation channel glinting, afternoon light.

**`season-harvest`** · 4:3
> A heap of just-harvested red chillies on a tarpaulin, a woven basket tipped beside it, hard noon light, a Guntur field behind.

**`season-trade`** · 4:3
> Jute sacks of dried produce stacked at a mandi at dusk, a brass scale and weights on a wooden counter, warm tungsten glow against a blue evening, no signage, no faces.

### Quality — packaging (new strip; appears when at least one exists)

All four: same setup, image-edit from the first so they match. 1:1, 1600×1600.
> A single [item] standing on a plain cream seamless background, three-quarter view, soft window light from the left, honest unretouched product photography, no text, no logo, no label, square.

- **`pack-hdpe`** — [item] = *white food-grade HDPE woven export bag, 25 kg size, stitched top, unprinted*
- **`pack-kraft`** — *multi-wall brown kraft paper bag with a BOPP inner, 25 kg, unprinted*
- **`pack-box`** — *multi-layer laminated bulk carton, plain brown, sealed, unprinted*
- **`pack-drum`** — *25 kg food-grade fibre drum with a metal locking ring lid, plain kraft brown, unprinted*

### Real-only slots (no prompt — shoot them)

- **Yash's portrait** → `public/images/people/yash-talaviya.jpg`, 4:5 or taller, 1600 px wide, natural light, plain background, looking at camera or at work. The site renders it duotone, colour on hover. Set `photo` in `content/story.ts`.
- **Certificate scans** → `public/images/certificates/<id>.webp`, set `preview` in `content/certificates.ts`. Only certificates actually held (APEDA stays "under approval").
- **Sample kit** if you prefer the real one (recommended).
- **Bowl set and macro set** if you take the real route (§3).

---

## 5. Delivering files

```
assets-src/photos/
  products/<slug>/bowl.png|jpg   scene.jpg   macro.jpg   source.jpg   (+ optional <role>.txt caption, bowl.json options)
  site/<id>.jpg                                                       (+ optional <id>.txt caption)
```

- `<slug>` is the product slug used in the URL (`chilli-powder`, `cumin-seeds`, `basmati-rice-1121` …) — listed at the top of each block in the prompts file.
- `<id>` is exactly the id in §4 (`journey-soil`, `family-raw-whole-spices`, `pack-drum` …). Kebab-case only.
- Any input size / format. For `bowl`: a plain white or pale sweep works (the script knocks it out and keeps the ground shadow as real transparency); transparent PNG is trusted as-is. Put the fruit / seeds **beside** the bowl with a little space around each piece — touching pieces fly as one.
- **Tell the script where the bowl is.** `bowl.json` → `{ "bowl": [x0, y0, x1, y1] }` in percent of the processed 1600² bowl image (rim ends left/right, back of the rim, bottom of the foot — read them off `public/photos/products/<slug>/bowl.webp`). With it, the bowl is always kept whole (no bites out of lit glaze), fruit leaning on the bowl is cut along its outline and flies, and the uneven ground of a generated sweep is knocked out. Optional: `mound` (how high the heap rises above the rim, in rim half-widths, default 0.45 — raise it for a bowl heaped with whole chillies or turmeric fingers), `ra` (rim ellipse height/width, 0.3), `foot` (foot width/rim width, 0.55). The importer (`scripts/photos-import-archive.mjs`, `SHEETS`) writes these for the owner's sheets.

Then:

```bash
npm run photos:prep
```

writes `public/photos/**` (web-sized, graded, plus the burst atlas and a PNG bowl for OG images and PDFs) and `content/generated/photos.json`, and the slots light up on the next dev reload / build. `npm run build` runs it automatically. Commit `public/photos/**` and `content/generated/photos.json`; the originals in `assets-src/photos/` are git-ignored (keep them on F: with the other sources).

`npm run verify:content` reports photo coverage (bowls / pieces / scenes / macros) so you can see what is still missing. `node scripts/qa/seg-debug.mjs <photo> out.png` shows how a bowl photo will be cut before you commit to a setup.

## 6. Suggested order

1. **Real bowls for the eight still rendered** — onion powder, onion flakes, fried onion, garlic flakes, moringa, 1121 and 1509 basmati, dry red chilli (whole). Same setup as §3: white bowl, white sheet, one window, the raw crop beside the bowl.
2. **The 27 "Actual product" macros** — the only slot that must be a real photograph, and the most credible image on each page.
3. Yash's portrait, `sample-kit`, the six `family-*` photos, the four `pack-*`.
4. Re-shoot any bowl you want to replace: drop the file over the imported one and run the prep again.
