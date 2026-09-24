/**
 * Emits docs/photo-prompts-products.md — one block per SKU, generated from the catalogue
 * so names, forms and origin belts never drift from content. The only hand-authored
 * part is the SHEET table below: what goes in the bowl, which loose pieces of the raw
 * crop sit beside it (these become the burst), what the dark hero scene shows, and what
 * the origin photo shows. Run: npm run photos:prompts
 *
 * The concept every product sheet serves: one bowl, the product in it, the real crop
 * beside it — the fruit whole and cut open, its leaves, its seeds — each piece separate
 * so scripts/prep-photos.mjs can lift it and the burst can fling it.
 */
import { writeFileSync } from "node:fs";
import { join } from "node:path";
import { products } from "../content/products";
import { clusters } from "../content/clusters";

interface Sheet {
  /** what is in the bowl */
  contents: string;
  /** the loose pieces around the bowl — every one separate */
  pieces: string;
  /** the pinch spilled beside the bowl */
  spill: string;
  /** white for coloured products; grey for pale ones so the knock-out can tell them apart */
  bg: "white" | "grey";
  /** the dark-slate hero scene (optional shot) */
  scene: string;
  /** the origin photo (product page) */
  source: string;
}

const SHEET: Record<string, Sheet> = {
  jamun_powder: {
    contents:
      "deep plum-purple jamun powder, very fine with a few soft clumps, in a soft mound",
    pieces:
      "six whole ripe jamun (glossy purple-black, oval, one with its short stalk), two jamun halves showing the pale pink-white pulp and the seed, two bare jamun seeds, four glossy lance-shaped jamun leaves, one short twig carrying two fruits",
    spill: "purple powder",
    bg: "white",
    scene:
      "a dark hand-thrown bowl heaped with jamun powder, a scatter of whole jamun and one split fruit showing its pale pulp beside it, a few leaves",
    source:
      "ripe jamun (Java plum) fruits, glossy purple-black with a violet stain where one is split, heaped on a woven bamboo tray with a few leaves, Gujarat orchard shade",
  },
  apple_powder: {
    contents:
      "pale cream-beige apple powder with a light golden tint, very fine and matte, in a soft mound",
    pieces:
      "three red-and-green Himalayan apples (one with a leaf on its stem), two apple halves showing white flesh and the seed star, three thin apple slices, five dried apple chips, two apple leaves",
    spill: "cream powder",
    bg: "grey",
    scene:
      "a dark bowl of pale apple powder, two red apples and a halved apple beside it, dried apple chips scattered",
    source:
      "red-and-green Himalayan apples in a weathered wooden crate at an orchard edge in Himachal, cool morning light, pine slopes soft in the distance",
  },
  pineapple_powder: {
    contents:
      "pale golden-yellow pineapple powder, fine with a faint fibrous texture, in a soft mound",
    pieces:
      "one small ripe pineapple with its spiky crown, three pineapple rings, three wedges showing the fibrous yellow flesh, two chunks, four dried pineapple pieces",
    spill: "yellow powder",
    bg: "white",
    scene:
      "a dark bowl of golden pineapple powder, pineapple rings and wedges beside it, one crown leaning in from the edge",
    source:
      "ripe pineapples with spiky crowns on a plantation slope in Tripura / Assam, humid green hills, low mist",
  },
  raw_mango_powder: {
    contents:
      "khaki-olive amchur powder, matte, fine with tiny darker specks, in a soft mound",
    pieces:
      "three whole green raw mangoes, one raw mango cut open showing pale yellow-green flesh and the stone, four raw-mango slices, six leathery sun-dried amchur slices, two mango leaves",
    spill: "khaki powder",
    bg: "white",
    scene:
      "a dark bowl of amchur powder, green raw mangoes and dried amchur slices beside it",
    source:
      "green raw mangoes hanging on the tree beside halved raw-mango slices sun-drying on a bamboo mat, Uttar Pradesh farmyard",
  },
  guava_powder: {
    contents:
      "soft pink-peach guava powder, fine, faintly fibrous, matte, in a soft mound",
    pieces:
      "three whole green guavas, two guava halves showing pink flesh and seeds, three wedges, four guava leaves",
    spill: "pink powder",
    bg: "white",
    scene:
      "a dark bowl of pink guava powder, whole and halved pink-fleshed guavas beside it",
    source:
      "pink-fleshed guavas, one halved to show the seeds, on a jute cloth under a guava tree, Prayagraj orchard",
  },
  mulberry_powder: {
    contents:
      "dark violet-maroon mulberry powder, fine, with minute seed specks, in a soft mound",
    pieces:
      "twelve ripe black mulberries laid out one by one (elongated, glossy), two red half-ripe ones, three mulberry halves, four heart-shaped serrated mulberry leaves, one short twig",
    spill: "violet powder",
    bg: "white",
    scene:
      "a dark bowl of mulberry powder, black and red mulberries scattered beside it with two leaves",
    source:
      "black mulberries ripening on the branch, some red, some black, on a Karnataka silk-belt farm, dappled light",
  },
  orange_powder: {
    contents:
      "bright orange powder, fine and slightly granular, matte, in a soft mound",
    pieces:
      "two whole Nagpur oranges (one with a leaf on the stem), two orange halves showing the segments, four wedges, three curls of orange peel, two glossy leaves",
    spill: "orange powder",
    bg: "white",
    scene:
      "a dark bowl of orange powder, a halved Nagpur orange and curls of peel beside it",
    source:
      "Nagpur oranges with glossy leaves in an orchard, one peeled segment on a wooden surface, late-afternoon warmth",
  },
  lemon_powder: {
    contents:
      "pale lemon-yellow powder, very fine and matte, in a soft mound",
    pieces:
      "three whole lemons, two lemon halves, four wedges, three twists of lemon peel, two lemon leaves",
    spill: "pale yellow powder",
    bg: "grey",
    scene:
      "a dark bowl of pale lemon powder, halved lemons and twists of peel beside it",
    source:
      "fresh lemons in a bamboo basket at the edge of an Andhra lemon orchard, hard bright sunlight",
  },
  beetroot_powder: {
    contents:
      "deep magenta-crimson beetroot powder, very fine, intensely coloured, in a soft mound",
    pieces:
      "two whole beetroots with leaves and stems attached, four round beetroot slices showing the rings, two wedges, three beet leaves with red stems",
    spill: "magenta powder",
    bg: "white",
    scene:
      "a dark bowl of magenta beetroot powder, beetroot slices showing their rings beside it",
    source:
      "freshly pulled beetroots with soil on the roots and leaves attached, lying on dark black-cotton soil, Maharashtra field",
  },
  spinach_powder: {
    contents:
      "dark green spinach powder, fine, matte, with tiny leaf specks, in a soft mound",
    pieces:
      "eight fresh spinach leaves laid out one by one, one small bunch of spinach with stems, six dried spinach leaf flakes",
    spill: "green powder",
    bg: "white",
    scene:
      "a dark bowl of green spinach powder, fresh spinach leaves and dried leaf flakes beside it",
    source:
      "bunches of fresh spinach just cut in the field at dawn, dew on the leaves, Gujarat farm rows behind",
  },
  tomato_powder: {
    contents:
      "brick-red tomato powder, fine, slightly clumpy, in a soft mound",
    pieces:
      "four ripe red tomatoes (one still on the vine), two tomato halves showing the seed chambers, three slices, five sun-dried tomato halves",
    spill: "red powder",
    bg: "white",
    scene:
      "a dark bowl of brick-red tomato powder, halved tomatoes and sun-dried tomato halves beside it",
    source:
      "ripe red tomatoes in plastic crates at a Nashik farm, vines behind, warm evening light",
  },
  ginger_powder: {
    contents:
      "pale tan-beige ginger powder, fine with fibrous specks, in a soft mound",
    pieces:
      "two fresh ginger rhizomes (one snapped to show the pale yellow flesh), five ginger slices, four pieces of dried ginger (sonth), one sprig of ginger leaf",
    spill: "tan powder",
    bg: "white",
    scene:
      "a dark bowl of ginger powder, a snapped ginger rhizome and dried ginger pieces beside it",
    source:
      "fresh ginger rhizomes with soil clinging to them in a cane basket, Kerala plantation floor, wet leaves",
  },
  turmeric_powder: {
    contents:
      "vivid saffron-orange turmeric powder, fine and matte, a light stain on the rim, in a soft mound",
    pieces:
      "five fresh turmeric rhizomes (one snapped showing the bright orange core), four turmeric slices, three dried turmeric fingers, one turmeric leaf",
    spill: "turmeric powder",
    bg: "white",
    scene:
      "a dark bowl tipped so turmeric powder spills onto the slate, fresh turmeric rhizomes beside it",
    source:
      "boiled-and-dried turmeric fingers heaped in the sun at Erode, ochre and orange, a few broken to show the bright core",
  },
  garlic_powder: {
    contents:
      "off-white cream garlic powder, fine, slightly grainy, matte, in a soft mound",
    pieces:
      "two whole garlic bulbs with papery skins, six loose cloves (three peeled, three in their skin), four dried garlic flakes, one loose papery skin",
    spill: "cream powder",
    bg: "grey",
    scene:
      "a dark bowl of cream garlic powder, whole bulbs and peeled cloves beside it",
    source:
      "garlic bulbs in open jute sacks at a mandi in Mandsaur, papery skins, dusty warm light",
  },
  sea_buckthorn_powder: {
    contents:
      "bright orange sea buckthorn powder, fine, matte with a faint oily sheen, in a soft mound",
    pieces:
      "three small clusters of orange sea buckthorn berries on their twig, twenty loose berries laid out one by one, three sprigs of narrow silver-green sea buckthorn leaves",
    spill: "orange powder",
    bg: "white",
    scene:
      "a dark bowl of orange sea buckthorn powder, a berry-laden twig and loose berries beside it",
    source:
      "sea buckthorn shrubs heavy with orange berries against a bare high-altitude Ladakh valley, thin blue sky",
  },
  dehydrated_onion_powder: {
    contents:
      "cream-white onion powder, fine, matte, faintly yellowish, in a soft mound",
    pieces:
      "three white onions with papery skins (one halved to show the rings), four thick raw onion rings, six dried onion kibbles, two loose papery onion skins",
    spill: "cream powder",
    bg: "grey",
    scene:
      "a dark bowl of white onion powder, halved white onions and dried kibbles beside it",
    source:
      "white onions freshly harvested and heaped in the field at Mahuva, Gujarat, papery skins catching the sun",
  },
  dehydrated_onion_flakes: {
    contents:
      "pale cream-to-golden dehydrated onion flakes (kibbled), irregular curled pieces, heaped loosely with a few over the rim",
    pieces:
      "two white onions (one halved), three raw onion rings, fifteen loose dried onion flakes laid out one by one, two papery onion skins",
    spill: "onion flakes",
    bg: "grey",
    scene:
      "a dark bowl heaped with dried onion flakes, a halved white onion and loose flakes beside it",
    source:
      "sliced white onion spread on drying trays under the open sun, Mahuva, rows of trays receding",
  },
  dehydrated_garlic_flakes: {
    contents:
      "pale cream dehydrated garlic flakes, thin irregular slices, some translucent at the edges, heaped loosely",
    pieces:
      "two garlic bulbs, five loose cloves (two peeled), twelve loose dried garlic flakes laid out one by one",
    spill: "garlic flakes",
    bg: "grey",
    scene:
      "a dark bowl heaped with dried garlic flakes, bulbs and loose flakes beside it",
    source:
      "peeled garlic cloves sliced on stainless trays before drying, Mandsaur, cool daylight",
  },
  fried_onion: {
    contents:
      "golden-brown crispy fried onion slivers, glossy and curled with a few darker caramelised edges, heaped loosely",
    pieces:
      "two white onions (one halved), three raw onion rings, six small clusters of crispy fried onion laid out one by one",
    spill: "crispy fried onion",
    bg: "white",
    scene:
      "a dark bowl heaped with golden fried onion, a halved raw onion and loose crisp clusters beside it",
    source:
      "thin-slivered white onion drying on trays before frying, Mahuva, warm light",
  },
  dry_red_chilli: {
    contents:
      "whole dried red chillies (Guntur and Byadgi types), glossy deep red, wrinkled, stems on, heaped in the bowl with two resting on the rim",
    pieces:
      "six loose dried red chillies laid out one by one (curved, stems on), two broken open showing the pale seeds, two fresh red chillies, a small pinch of chilli seeds",
    spill: "chilli flakes",
    bg: "white",
    scene:
      "a dark bowl heaped with whole dried red chillies, more chillies and a dusting of flakes on the slate",
    source:
      "red chillies drying in a vast open yard at Guntur, an ocean of red to the horizon, hazy noon sun",
  },
  chilli_powder: {
    contents:
      "vivid brick-red chilli powder, fine, faint oily sheen, a few coarser flecks, in a soft mound",
    pieces:
      "six dried red chillies laid out one by one, two fresh red chillies, three broken chilli pieces showing seeds",
    spill: "red powder",
    bg: "white",
    scene:
      "a dark bowl of brick-red chilli powder, whole dried chillies and a dusting of powder on the slate",
    source:
      "dried red chillies heaped at a chilli yard in Guntur, hard sunlight, a wooden rake resting against the heap",
  },
  turmeric_finger: {
    contents:
      "dried turmeric fingers, knobbly and curved, ochre-brown skin, heaped in the bowl with two on the rim",
    pieces:
      "six loose dried turmeric fingers laid out one by one, two snapped to show the bright orange core, two fresh turmeric rhizomes with a little soil, a small pinch of turmeric powder",
    spill: "turmeric powder",
    bg: "white",
    scene:
      "a dark bowl heaped with dried turmeric fingers, snapped fingers showing the orange core beside it",
    source:
      "fresh turmeric rhizomes just dug with soil on them, Erode farm, farmer's hands and a hoe (no face)",
  },
  cumin_seed: {
    contents:
      "cumin seeds — slender, ridged, tan-brown — heaped in a smooth mound",
    pieces:
      "three small separate pinches of cumin seeds, two sprigs of cumin plant with feathery leaves and seed umbels, a small pinch of ground cumin",
    spill: "cumin seeds",
    bg: "white",
    scene:
      "a dark bowl heaped with cumin seeds, seeds spilling across the slate, a cumin sprig",
    source:
      "cumin plants at harvest, feathery leaves and seed umbels, sandy Rajasthan / Saurashtra field at dawn",
  },
  coriander_seed: {
    contents:
      "round ribbed straw-gold coriander seeds heaped in a smooth mound, a few split halves",
    pieces:
      "three small separate pinches of coriander seeds, four sprigs of fresh coriander (cilantro) with leaves, two dried coriander umbels with seeds, a small pinch of ground coriander",
    spill: "coriander seeds",
    bg: "white",
    scene:
      "a dark bowl heaped with coriander seeds, seeds spilling across the slate, a fresh coriander sprig",
    source:
      "coriander plants gone to seed in a Rajasthan field, pale umbels, morning light",
  },
  moringa_leaf_powder: {
    contents:
      "deep olive-green moringa leaf powder, fine, matte, in a soft mound",
    pieces:
      "four sprays of fresh moringa leaves on their thin stems, twelve loose moringa leaflets, two short pieces of moringa pod (drumstick), four dried moringa seeds",
    spill: "green powder",
    bg: "white",
    scene:
      "a dark bowl of olive-green moringa powder, fresh moringa sprays and a piece of pod beside it",
    source:
      "a moringa tree with feathery leaves and pods on a Tamil Nadu farm, morning light through the leaves",
  },
  basmati_1121: {
    contents:
      "long slender white 1121 basmati grains, uncooked, slightly translucent, in a smooth heap",
    pieces:
      "two rice panicles (paddy ears) with husked grains, three small separate mounds of rice grains, a scatter of a dozen single grains",
    spill: "rice grains",
    bg: "grey",
    scene:
      "a dark bowl heaped with long white basmati grains, grains spilling across the slate, a paddy ear",
    source:
      "a golden paddy field at harvest in Punjab, cut sheaves stacked, low evening sun",
  },
  basmati_1509: {
    contents:
      "long white 1509 basmati grains, uncooked, slightly translucent, in a smooth heap",
    pieces:
      "two paddy ears, three small separate mounds of white grains, one small mound of golden sella (parboiled) grains for contrast, a scatter of single grains",
    spill: "rice grains",
    bg: "grey",
    scene:
      "a dark bowl heaped with basmati grains beside a small mound of golden sella grains, a paddy ear",
    source:
      "basmati grains pouring from a jute sack at a Haryana mandi, dusty warm light",
  },
};

const BG = {
  white: "flat seamless pure white (#FFFFFF)",
  grey: "flat seamless mid warm grey (#BFBAB2) — the product is pale, so the grey keeps it separable",
};

/** the house bowl — one bowl for all 27 */
const HOUSE_BOWL =
  "a plain matte white ceramic bowl — low and wide, thin slightly uneven rim, unglazed foot — the same bowl in every image, seen three-quarter from about 25° above, centred";

const SHEET_LEAD = "Editorial product photograph made for a background knock-out:";

const SHEET_LAYOUT =
  "Arranged loosely around the bowl on the same surface, each piece clearly separate — about a finger's width from the bowl and from each other, none touching, none overlapping, none cut by the frame — and the whole arrangement compact enough to fill about four fifths of the square:";

const SHEET_STYLE =
  "One soft window light from the upper left; only a small soft contact shadow directly under each object; no gradient, no vignette, no horizon line and nothing else in the frame. Honest, unretouched look: real texture, true colour, sharp from front to back. No text, no labels, no logos, no watermark, no hands, no spoons, no cloth, no props other than what is named. Square, 2048×2048.";

const SCENE_STYLE =
  "Moody editorial still life on a dark slate slab, portrait 3:4:";
const SCENE_TAIL =
  "Low raking light from the left, deep soft shadows, a fine dusting of the product on the slate, the background a matte dark wall falling to black. Real texture, true colour, no text, no labels, no watermark, no hands, no props other than what is named.";

const SOURCE_STYLE =
  "Documentary photograph, 35 mm film look, natural light, honest and unposed, slightly muted warm colour grade with visible grain, India. No faces, no signage, no text, no logos, no brand-new machinery.";

const NEGATIVE =
  "text, letters, watermark, logo, label, packaging, hands, spoon, cloth, cartoon, illustration, 3D render, plastic look, oversaturated, HDR, glossy stock-photo look, studio flash glare, gradient background, vignette";

export function sheetPrompt(s: Sheet): string {
  return `${SHEET_LEAD} ${HOUSE_BOWL}, holding ${s.contents}. ${SHEET_LAYOUT} ${s.pieces}. A small pinch of ${s.spill} fallen beside the bowl. Background ${BG[s.bg]}. ${SHEET_STYLE}`;
}

function block(p: (typeof products)[number]): string {
  const s = SHEET[p.id];
  if (!s) throw new Error(`photo-prompts: no SHEET entry for ${p.id}`);
  const cluster = clusters.find((c) => c.id === p.cluster)!;
  const origin = p.originRegions.slice(0, 2).join(" / ");
  return `## ${p.name}  \`${p.slug}\`

*${cluster.shortName} · form: ${p.form} · ${origin} · sweep: ${s.bg}*

Files go in \`assets-src/photos/products/${p.slug}/\` as \`bowl.png\` (the product sheet), \`bowl-2.png\` … (more pieces), \`scene.jpg\`, \`source.jpg\`, \`macro.jpg\` (real photo only).

**Ingredients on the sheet** — in the bowl: ${s.contents}. Beside it: ${s.pieces}. Spill: ${s.spill}.

**bowl** — the product sheet (one generation covers the bowl, the crop beside it and the burst pieces):

> ${sheetPrompt(s)}

*Want more flying pieces? Generate the same prompt again ("a different arrangement of the same things") and save it as \`bowl-2.png\`; only its pieces are used.*

**scene** — the dark hero backdrop (optional; the colour-world gradient is the fallback):

> ${SCENE_STYLE} ${s.scene}. ${SCENE_TAIL}

**source** — where it comes from (product page, Origin section):

> ${SOURCE_STYLE} Scene: ${s.source}. 4:3, 2048×1536.

**macro** — the "Actual product" chip. **Real photo only**, never generated: a spoonful of your own sample on black slate (powders, rice) or a white plate (dark seeds, chillies), phone 15–20 cm above, window light, no flash, fill the frame.

Negative prompt (sheet and scene): ${NEGATIVE}.
`;
}

const out = `# Product photo prompts — ${products.length} SKUs

Generated by \`npm run photos:prompts\` from the catalogue; edit \`scripts/photo-prompts.ts\` (the SHEET table) rather than this file. Read \`docs/photo-brief.md\` first — the house style, the honesty rules and how files are delivered — and \`docs/photo-review.md\` for which of these are needed first.

**The concept.** One plain white bowl for all ${products.length} products. In it, the product as it ships. Around it, on a flat sweep, the real crop it comes from — the fruit whole and cut open to show the pulp, its leaves and seeds, or the spice whole and broken — every piece separate. The pipeline knocks the sweep out, lifts every loose piece into a sprite atlas, and when a buyer hits the bowl on the site those exact pieces fly.

**Why the sweep colour matters.** Pure white for coloured products. Mid warm grey (#BFBAB2) for pale ones (onion, garlic, rice, lemon, apple) — otherwise white powder and white cloves vanish into the background. The prompt says which.

**Workflow.** Paste a product's *bowl* prompt into your generator. Check the result against the ingredient line (right contents in the bowl, pieces separate, nothing touching the bowl). Save as \`bowl.png\`. Repeat for \`bowl-2.png\` if you want more pieces. Then \`npm run photos:prep\` and look at \`public/photos/products/<slug>/pieces.webp\`.

${products.map(block).join("\n---\n\n")}`;

const target = join(
  import.meta.dirname,
  "..",
  "docs",
  "photo-prompts-products.md",
);
writeFileSync(target, out);
console.log(
  `photo-prompts — ${products.length} products → docs/photo-prompts-products.md`,
);
