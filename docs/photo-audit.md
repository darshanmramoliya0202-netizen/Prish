# Photo audit — 29 October 2026

Every image on the live site (www.prishoverseas.com, `906e140`), judged on the site's own dark green and in page context. Verdicts: **OK**, **Fix** (we can repair in code / crop), **Regenerate** (needs a new image from the owner).

## The three systemic problems

1. **Four visual styles that don't belong together.** Bowls are cut-outs with no background; hero scenes are moody dark slate; origin photos are bright, saturated, sunny; site scenes (journey, seasons) are warm muted documentary. A buyer moving home → product page → origin sees four different photographers.
2. **No fixed camera or scale for the bowls.** Some are top-down, some three-quarter; the bowl fills a third of the frame on pineapple and a tenth on rice; some arrangements are a wide strip (rice), others tall (pineapple). On the home arc and family rows the bowls jump in size and angle.
3. **Pale products on a grey generated sweep didn't cut cleanly.** Garlic, onion, rice, apple, lemon, pineapple, raw mango keep grey ground slabs, and white bulbs/rings have dark bites cut into them.

## Product bowls (27)

| Product | Verdict | What's wrong |
|---|---|---|
| fried onion | **Regenerate** | onion half hollowed out (dark spiral hole), rings broken into white arcs |
| onion flakes | **Regenerate** | grey ground under the whole arrangement, bites in the onion and rings, no burst pieces |
| onion powder | **Regenerate** | bites in the cut onion and rings, grey ground |
| garlic powder | **Regenerate** | dark bites in both bulbs and cloves, grey ground |
| garlic flakes | **Regenerate** | same bites, grey ground |
| basmati 1121 | **Regenerate** | grey ground slab left and under the bowl |
| basmati 1509 | **Regenerate** | mirror image of 1121 — identical photo for two products |
| apple | **Regenerate** | dark notches in the bowl's lower body, grey patch behind |
| pineapple | **Regenerate** | pale ground fused into the bowl, bowl and crown twice the scale of others |
| raw mango | Fix / Regenerate | grey ground under the bowl and slices |
| jamun | Fix | grey smear on the bowl's right side, small bites on the rim |
| lemon | Fix | pale green-grey ground patches, small bite in the bowl |
| coriander, cumin | OK | minor ground at the bottom edge |
| beetroot, chilli powder, dry red chilli, ginger, guava, mulberry, orange, sea buckthorn, spinach, tomato, turmeric powder, turmeric finger, moringa | OK | clean cut; only the angle/scale inconsistency above |

## Hero scenes (9 of 27)

| Item | Verdict | What's wrong |
|---|---|---|
| garlic powder + garlic flakes | **Regenerate** | light wooden table and window — the only non-slate scene; and one photo on two products |
| chilli powder + dry red chilli | Fix | one photo on two products |
| turmeric powder + turmeric finger | Fix | one photo on two products |
| beetroot, jamun | OK, minor | tinted red/purple backdrops vs the black slate of the rest |
| sea buckthorn | OK | — |
| the other 18 products | **Inconsistent** | no scene → hero shows a blurred origin photo instead, so product pages look like two different templates |

## Origin photos (27)

Style is consistent within the set (bright, sunny). Problems:
- **Duplicates:** 1121 and 1509 (same paddy field); onion flakes, garlic flakes and fried onion are near-identical drying-tray shots; chilli powder and dry chilli are both chilli yards.
- **Jamun** is landscape and cropped tighter than the 26 portrait ones.
- Clash with the rest of the site's muted documentary grade (systemic problem 1).

## Site photos

| Slot | Verdict | What's wrong |
|---|---|---|
| `hero-dawn` | OK | — |
| `journey-coast` | **Fix** | left 45% is a blank white wall; crop or replace |
| `journey-soil` | **Regenerate** | shows a harvest at dusk, not *Soil & seed*; also used as `season-harvest` |
| `journey-sun` | **Regenerate** | hands holding grain, not a drying yard |
| `journey-mill` | Regenerate (later) | sacks on a truck, not milling/packing; also used as `season-trade` |
| `journey-harvest` | OK | near-duplicate of the onion origin photo |
| `season-sowing` | **Regenerate** | bright aerial rice paddy — wrong moment and a completely different style |
| `season-tending` | Fix | same image as the onion-field origin photo |
| `season-harvest`, `season-trade` | Fix | duplicates of journey photos on the same visit path |
| `quality-lab` | OK | — |
| Yash portrait, `family-*`, `sample-kit`, `pack-*`, certificate scans, "Actual product" macros | Missing | real photos only (portrait, certs, macros) |

## Done in code (2026-10-29)

- `journey-coast` cropped to the container doorway.
- Hero scenes retired: every product page uses the same hero (blurred field behind the bowl), so the shared chilli / turmeric / garlic scenes and the off-style garlic table are gone.
- Season photos removed from the story page (two were journey photos again, sowing was an aerial paddy); the season cards show text until proper season photos exist.
- Every bowl rendered at one apparent bowl width and centre (`BowlImage` › `normalise`, from the measured bowl box; clamped so the crop around it stays in view).
- One colour grade for all origin and site photos at prep (`prep-photos.mjs` › `grade`).
- Jamun, lemon, raw mango: bowl boxes widened (bowl edge was clipped) and a `ground: true` pass clears the pale ground under the fruit.

## Originally proposed code fixes

1. Crop `journey-coast` to the container doorway.
2. Remove duplicates: drop the shared hero scene from one of each pair (chilli, turmeric, garlic) or give the twin the source-backdrop treatment; stop reusing journey photos as season photos.
3. One hero template for all 27 product pages: either scene everywhere (needs 18 images) or source-backdrop everywhere (drop the 9 slate scenes from heroes, keep them elsewhere).
4. Normalise bowl scale on the arc and family rows by sizing each image to its measured bowl box, so every bowl renders the same width.
5. Apply one colour grade (slight warm, slightly desaturated) to origin and site photos at prep time so the four styles converge.
6. Touch up jamun, lemon, raw mango residue by adjusting their bowl boxes / ground cap.

## What needs new images from the owner

One batch, all with the same camera: three-quarter view about 25° above, the bowl about 35% of frame width, centred, on a **flat charcoal sweep** (not grey):
fried onion, onion flakes, onion powder, garlic powder, garlic flakes, basmati 1121, basmati 1509 (a different arrangement), apple, pineapple.
Plus `journey-soil`, `journey-sun`, `season-sowing` (prompts in `photo-brief.md` §4) and a dark-slate scene for garlic.
