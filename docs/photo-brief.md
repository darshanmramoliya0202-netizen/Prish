# Photo brief — Prish Overseas v3

*Assessment of where the site needs real imagery, the honesty rules for it, the house style, the shot list with generator prompts, and how to deliver files so they appear on the site with no code changes.*

Companion file: [`photo-prompts-products.md`](photo-prompts-products.md) — the 27 × 3 product prompts, generated from the catalogue (`npm run photos:prompts`).

---

## 0. Where the site stands

Today the site has **no photography at all** — the seal logo and a grain texture are the only raster images. Everything else is code-drawn: product bowls, journey scenes, maps, the rangoli. That is why it reads "not practical": a buyer who sources chilli powder wants to see chilli powder.

What is now wired and waiting for files (every slot is optional — nothing renders until the file exists, never a placeholder):

| Where | What appears when supplied | File |
|---|---|---|
| Every bowl (home arc, family grids, cards, product hero) | the real product in the house bowl replaces the render; the burst becomes fragments of that photo | `products/<slug>/bowl` |
| Beside every bowl | the **"Actual product"** chip — a small round close-up; on the product hero it opens a gallery | `products/<slug>/macro` |
| Product page → Origin | the raw ingredient / field it comes from, next to the origin map | `products/<slug>/source` |
| Home → hero | a very dark photographic backdrop behind the Namaste | `site/hero-dawn` |
| Home → Farm → Port → World | a photograph per scene replaces the drawn scene (still parallaxes) | `site/journey-soil` … `journey-coast` |
| Home → six families | a small 3:2 photo at the start of each family row | `site/family-<family slug>` |
| Home → sample-kit CTA | the kit itself, left of the copy | `site/sample-kit` |
| Story → Heritage in seasons | a 4:3 photo above each of the four seasons | `site/season-sowing` … `season-trade` |
| Quality → Packaging (new strip) | the four brochure packaging formats | `site/pack-hdpe` `pack-kraft` `pack-box` `pack-drum` |
| Home + Story → Director | Yash's portrait (duotone treatment already built) | `public/images/people/yash-talaviya.jpg` — **real photo only** |
| Quality → Certificates | certificate scans (`preview` field in `content/certificates.ts`) | `public/images/certificates/*` — **real scans only** |

---

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

## 3. The product set — 27 SKUs × 3

Per-SKU prompts: [`photo-prompts-products.md`](photo-prompts-products.md). Three files per product:

### `bowl` — the product in the house bowl

**Best route (recommended): shoot it for real.** One bowl, one white sheet, one window, one phone, 27 samples. Same spot on the table, same phone position (mark the tripod / phone stand with tape), same time of day. This gives perfectly consistent bowls, it is the honest article, and the knock-out script handles the white background.

**Generated route:** make the **master bowl** once, then use image-edit with the master and each SKU's bowl prompt so all 27 are the same object.

Master bowl prompt:

> A single empty hand-thrown matte charcoal stoneware bowl — low and wide, unglazed rough exterior, softer dark glaze inside, slightly uneven rim — three-quarter view from about 25° above, centred, on a plain seamless pure-white sweep. One soft window light from the upper left, a gentle grounded shadow to the lower right. Editorial product photography, honest and unretouched-looking, real texture, no text, no labels, no props. Square, 2048×2048.

Requirements for either route: **dark matte bowl** (not glass, not white ceramic — the knock-out keeps dark objects and treats light low-chroma pixels near the ground as shadow), plain white or transparent background, product heaped naturally (slightly higher on one side, a little dusting on the rim for powders, a few pieces fallen beside the bowl for seeds / flakes), square frame, 2048 px or more.

### `macro` — the "Actual product" chip — **real photos**

Phone guide: put a spoonful of the sample on a **black slate tile** (powders, rice) or a **white ceramic plate** (dark seeds, chillies), by a window, phone 15–20 cm above pointing straight down, tap to focus, no flash, no filter. Fill the frame with product. Shoot square if the phone allows; the script crops square anyway. Aim for the grain to be visible: fineness of a powder, ridges on a cumin seed, curl of an onion flake — that is exactly what a buyer is judging.

### `source` — where it comes from (may be generated)

Field / orchard / yard scenes for the product page's Origin section, 4:3, 2048×1536, style preamble (documentary) + the SKU's scene from the prompts file. These are the images that make "Khet Se" true.

---

## 4. The site set — shot list with prompts

All documentary style (§2 preamble + negative prompt). Sizes are the *minimum*; larger is fine.

### Home

**`hero-dawn`** · hero backdrop · 16:9, 2400×1350 · *optional — it costs a little LCP; try it and check Lighthouse.* Kept at ~30 % opacity behind the Namaste, so it needs a dark, quiet composition.
> Saurashtra plain at first light: flat black-cotton-soil fields to a far horizon, a thin line of neem trees, a faint band of orange at the horizon under a deep green-black sky. Very dark, quiet, wide, cinematic but honest. Nothing in the foreground.

**`journey-soil`** · scene 01 "Soil & seed" · 12:7, 2400×1400
> Freshly ploughed black cotton soil in Saurashtra at dawn, furrows running toward a low sun, a few cumin or groundnut seedlings breaking through in the near rows, dew on clods. Low angle, honest, no people.

**`journey-harvest`** · scene 02 "Harvest" · 12:7
> A farmer's weathered hands (no face) holding a double handful of freshly picked red chillies over a jute sack in a Guntur field, plants behind, hard morning light, dust in the air.

**`journey-sun`** · scene 03 "Sun & drying" · 12:7
> Open-air drying yard: turmeric fingers and red chillies spread in broad strips on tarpaulins under a white-hot noon sun, receding to the horizon, heat haze, a lone wooden rake, no people.

**`journey-mill`** · scene 04 "Milling & packing" · 12:7 · *framed as the trade's standard packaging, not a facility of ours*
> Export packaging ready to ship, photographed generically: plain 25 kg food-grade fibre drums and unprinted white HDPE bags on a wooden pallet in soft daylight from a large doorway, no signage, no machinery, no people, no logos.

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

**`season-sowing`** · 4:3, 1600×1200
> Hands (no face) dropping seed into a shallow furrow in dark black-cotton soil, Saurashtra, low morning sun raking across the field.

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
  products/<slug>/bowl.png|jpg     macro.jpg     source.jpg     (+ optional bowl.txt / macro.txt / source.txt captions)
  site/<id>.jpg                                                 (+ optional <id>.txt caption)
```

- `<slug>` is the product slug used in the URL (`chilli-powder`, `cumin-seeds`, `basmati-rice-1121` …) — listed at the top of each block in the prompts file.
- `<id>` is exactly the id in §4 (`journey-soil`, `family-raw-whole-spices`, `pack-drum` …). Kebab-case only.
- Any input size / format. Transparent PNG is best for `bowl`; a white sweep also works (the script knocks it out and keeps the ground shadow as real transparency).

Then:

```bash
npm run photos:prep
```

writes `public/photos/**` (web-sized, graded) and `content/generated/photos.json`, and the slots light up on the next dev reload / build. `npm run build` runs it automatically. Commit `public/photos/**` and `content/generated/photos.json`; the originals in `assets-src/photos/` are git-ignored (keep them on F: with the other sources).

`npm run verify:content` reports photo coverage (bowls / macros per product) so you can see what is still missing.

---

## 6. Suggested order

1. **Six family-hero bowls + their macros** (jamun, turmeric, onion powder, cumin, moringa, 1121 basmati) — the home page arc changes character immediately.
2. **Remaining 21 bowls + macros**, `sample-kit`, Yash's portrait.
3. **`journey-*` five scenes** and the six **`family-*`** photos — the home page becomes a place.
4. **`source` for all 27**, the four **`season-*`**, the four **`pack-*`**.
5. `hero-dawn` last — check Lighthouse before and after; drop it if LCP suffers.
