# Photo review — 24 September 2026

*Every image the site uses today, judged against the concept: one white bowl with the product in it, the real crop beside it, and that crop flying when the bowl is hit. Prompts for everything below are in [`photo-prompts-products.md`](photo-prompts-products.md) (products) and [`photo-brief.md`](photo-brief.md) §4 (site scenes).*

## The concept, in one line per slot

| Slot | What it is for | Rule |
|---|---|---|
| `bowl` (product sheet) | the pot on the home arc, family pages, cards; its loose pieces become the burst | generated is fine; **one bowl for all 27**, pieces separate, flat sweep |
| `scene` | full-bleed photo behind the product hero | generated is fine; dark slate, moody |
| `source` | the origin section, next to the map | generated is fine; documentary, no faces |
| `macro` | the **"Actual product"** chip | **real photo only** — the label says so |
| `site/*` | hero, journey, seasons, quality, families, kit, packaging | generated is fine except people, documents, our facilities |

## Product bowls — verdicts

| Product | Today | Verdict | Why |
|---|---|---|---|
| jamun | white bowl, jamun + halves + leaves + seeds, scoop | **keep** | best in the set; the scoop is a prop but harmless |
| beetroot | top-down white bowl, beet slices + leaves | keep | good; regenerate later only for the three-quarter view |
| sea buckthorn | top-down, berry clusters | keep | good pieces |
| spinach | top-down, leaves | keep | good |
| tomato | top-down, tomatoes touching the bowl | keep | fine; no flying pieces until regenerated with gaps |
| turmeric powder | top-down, rhizomes around | keep | good |
| guava | white bowl, guava pair with pink flesh | keep | good |
| mulberry | white bowl, berries + leaves | keep | good |
| raw mango (amchur) | white bowl, mango + cut mango | keep | good |
| ginger | white bowl, rhizomes touching | keep | fine; regenerate with gaps for pieces |
| orange | white bowl, oranges touching | keep | fine; regenerate with gaps for pieces |
| pineapple | white bowl, slices + crowns at a distance | keep | fine |
| garlic powder | top-down, cloves | keep | fine; grey sweep next time (white cloves) |
| **apple** | bowl of **red flakes** + apples | **replace** | apple powder is cream-beige; this reads as chilli |
| **chilli powder** | **grey stoneware** bowl, spoon, wide crop | **replace** | different bowl, prop, wrong shape |
| **coriander seeds** | **wooden** bowl of **powder**, spoon | **replace** | wrong bowl, wrong contents (the product is seeds) |
| **cumin seeds** | small bowl of **powder**, seeds beside | **replace** | wrong contents (the product is seeds) |
| **turmeric finger** | bowl of **powder**, fingers around | **replace** | wrong contents (the product is dried fingers) |
| **lemon** | white powder, lemons pressed to the bowl, green edge remnants | **replace** | shoot on the grey sweep, pieces apart |
| dry red chilli | *render* | **generate** | — |
| onion powder · onion flakes · fried onion | *render* | **generate** | — |
| garlic flakes | *render* | **generate** | — |
| moringa | *render* | **generate** | — |
| basmati 1121 · 1509 | *render* | **generate** | — |

**Order of work:** the 8 missing, then the 6 replacements, then (optional, for a perfectly uniform arc) the 13 keeps regenerated with the same master prompt. Every product sheet takes the same prompt shape, so a batch of 27 is one afternoon.

## Hero scenes — verdicts

| Product | Today | Verdict |
|---|---|---|
| chilli powder, dry red chilli | dark slate, chillies + bowl of powder | **keep** (used for both) |
| turmeric powder, turmeric finger | dark slate, tipped bowl pouring powder, rhizomes | **keep**; a fingers-first scene for the finger SKU is optional |
| beetroot, jamun, sea buckthorn | dark slate scenes | **keep** |
| garlic powder, garlic flakes | wooden bowl on a wooden table with a basket | keep — warmer than the set; a dark-slate version is optional |
| the other 18 | colour-world gradient + bowl | optional: prompts provided |

## Origin photos — verdicts

| Product | Today | Verdict |
|---|---|---|
| chilli powder, dry red chilli | heap of dried chillies (wide strip) | keep |
| onion powder, fried onion | onion basket in the field | keep |
| onion flakes | hands holding onions | keep |
| the other 22 | map only | optional: prompts provided |

## Site scenes — verdicts

| Slot | Today | Verdict | Why |
|---|---|---|---|
| `hero-dawn` | five bowls on dark slate | **keep** | exactly right behind the Namaste |
| `journey-harvest` | hands with onions in the field | keep | on message |
| `journey-mill` | sacks on pallets, a truck, workers | keep for now | the copy talks about milling and drums; a packing-line still life would fit better (prompt in brief §4) |
| `journey-coast` | container being loaded, men with a clipboard | keep | generic trade moment; small faces |
| **`journey-soil`** | tractor and workers harvesting at dusk | **replace** | this is a harvest; the scene is *Soil & seed* at dawn |
| **`journey-sun`** | hands holding grain | **replace** | the scene is *Sun & drying* — a drying yard |
| **`season-sowing`** | aerial view of green fields | **replace** | sowing is a hand dropping seed into a furrow |
| `season-tending` | onion held up over a basket | keep | close enough |
| `season-harvest` | tractor and workers at dusk | keep | right moment |
| `season-trade` | sacks and truck | keep | fine |
| `quality-lab` | gloved hands, sieve, turmeric | keep | no face, generic process; caption stays neutral |
| `family-*` (six) | — | generate | 3:2 still lifes, prompts in brief §4 |
| `sample-kit` | — | shoot for real if you can | else the brief's prompt |
| `pack-*` (four) | — | generate | plain, unbranded |
| Yash's portrait, certificate scans | — | **real only** | — |

Images in the archive that must **not** be used: the two lab photos with a face or a brand name on the sieve; the container-yard shot with shipping-line logos; every iStock preview.

## What "perfect" needs from you

1. Generate the 8 missing product sheets, then the 6 replacements (prompts: `photo-prompts-products.md`). Check each against its ingredient line before saving.
2. Generate the three replacement site scenes (`journey-soil`, `journey-sun`, `season-sowing`) and the six `family-*` stills (brief §4).
3. Shoot the 27 macros, Yash's portrait and the sample kit for real.
4. Drop everything into `assets-src/photos/…`, run `npm run photos:prep`, and look at `pieces.webp` per product — if a piece is missing, it was touching something; regenerate with more space.

---

## 30 September 2026 — the product sheets are in

The owner generated one collage per SKU (33 files; 27 used, 6 non-catalogue extras on hold). Every bowl verdict above is now settled: **all 27 products show the same white bowl with the right contents** (seeds for the seed products, dried fingers for turmeric finger, cream apple powder), the crop beside it, and **26 of 27 have pieces that fly in the burst** (onion flakes bursts as dust sampled from its photo: its flakes lie on one connected patch of grey ground). Basmati 1509 uses the 1121 sheet, mirrored. Every product also has an origin photo (the field tile).

| Slot | Now | Notes |
|---|---|---|
| `bowl` | 27 / 27, from the sheets | bowl box hand-measured per sheet (brief §5) |
| burst pieces | 26 / 27 | apple, pineapple, raw mango and jamun also use their second sheet; onion flakes is dust only |
| `source` | 27 / 27, the field tile | generated: shown uncaptioned or with the neutral role caption, never as a real place |
| `scene` | 9 / 27, unchanged | the collage's dark tile (~460 px) is too small for a full-bleed hero; a separate full-size dark-slate image per product would fill the other 18 |
| `macro` | 0 / 27 | the collage close-ups are generated, so they cannot be the "Actual product" chip; real phone macros still needed |

**Still imperfect — regenerate if you want them flawless:** the pale products shot on the grey sweep (garlic powder and flakes, onion powder and flakes, basmati, apple, lemon) keep a little grey ground under the arrangement, and the garlic bulbs and the cut onion by the fried onion have small bites where their shaded side matches the ground. The fix is in the source, not the code: generate those sheets on a **flat charcoal sweep** (pale crop on dark separates cleanly). Orange and garlic flakes have few flying pieces, and onion flakes none, because the crop overlaps or sits on connected ground; a sheet with more space between pieces gives more.
