/**
 * Emits docs/photo-prompts-products.md — one block per SKU with the three product
 * shots the site consumes (bowl / macro / source), generated from the catalogue so the
 * names, forms and origin belts never drift from content. The visual notes below are the
 * only hand-authored part: what the finished product actually looks like and what its
 * raw source looks like in the field. Run: npm run photos:prompts
 */
import { writeFileSync } from "node:fs";
import { join } from "node:path";
import { products } from "../content/products";
import { clusters } from "../content/clusters";
import type { ProductForm } from "../content/types";

/** how the finished product looks (colour, grain, form) and where it comes from */
const LOOK: Record<string, { product: string; source: string }> = {
  jamun_powder: {
    product:
      "deep plum-purple powder with a faint dusty bloom, very fine with a few soft clumps (fruit powders are hygroscopic)",
    source:
      "ripe jamun (Java plum) fruits, glossy purple-black with a violet stain where one is split, heaped on a woven bamboo tray with a few leaves, Gujarat orchard shade",
  },
  apple_powder: {
    product:
      "pale cream-beige powder with a light golden tint, very fine, matte, a few soft clumps",
    source:
      "red-and-green Himalayan apples in a weathered wooden crate at an orchard edge in Himachal, cool morning light, pine slopes soft in the distance",
  },
  pineapple_powder: {
    product: "warm golden-yellow powder, fine with a slightly fibrous texture",
    source:
      "ripe pineapples with spiky crowns on a plantation slope in Tripura / Assam, humid green hills, low mist",
  },
  raw_mango_powder: {
    product: "khaki-olive amchur powder, matte, fine with tiny darker specks",
    source:
      "green raw mangoes hanging on the tree beside halved raw-mango slices sun-drying on a bamboo mat, Uttar Pradesh farmyard",
  },
  guava_powder: {
    product: "soft pink-peach powder, fine, faintly fibrous, matte",
    source:
      "pink-fleshed guavas, one halved to show the seeds, on a jute cloth under a guava tree, Prayagraj orchard",
  },
  mulberry_powder: {
    product: "dark violet-maroon powder, fine, with a few minute seed specks",
    source:
      "black mulberries ripening on the branch, some red, some black, on a Karnataka silk-belt farm, dappled light",
  },
  orange_powder: {
    product: "bright orange powder, fine and slightly granular, matte",
    source:
      "Nagpur oranges with glossy leaves in an orchard, one peeled segment on a wooden surface, late-afternoon warmth",
  },
  lemon_powder: {
    product: "pale lemon-yellow powder, very fine, matte, a few soft clumps",
    source:
      "fresh lemons in a bamboo basket at the edge of an Andhra lemon orchard, hard bright sunlight",
  },
  beetroot_powder: {
    product:
      "deep magenta-crimson powder, very fine and intensely coloured, matte",
    source:
      "freshly pulled beetroots with soil on the roots and leaves attached, lying on dark black-cotton soil, Maharashtra field",
  },
  spinach_powder: {
    product: "dark green leaf powder, fine, matte, with tiny leaf specks",
    source:
      "bunches of fresh spinach just cut in the field at dawn, dew on the leaves, Gujarat farm rows behind",
  },
  tomato_powder: {
    product: "brick-red to deep red-orange powder, fine, slightly clumpy",
    source:
      "ripe red tomatoes in plastic crates at a Nashik farm, vines behind, warm evening light",
  },
  ginger_powder: {
    product: "pale tan-beige powder, fine, with fibrous specks",
    source:
      "fresh ginger rhizomes with soil clinging to them in a cane basket, Kerala plantation floor, wet leaves",
  },
  turmeric_powder: {
    product:
      "vivid saffron orange-yellow powder, fine, matte, staining slightly where it touches the rim",
    source:
      "boiled-and-dried turmeric fingers heaped in the sun at Erode, ochre and orange, a few broken to show the bright core",
  },
  garlic_powder: {
    product: "off-white cream powder, fine, slightly grainy, matte",
    source:
      "garlic bulbs in open jute sacks at a mandi in Mandsaur, papery skins, dusty warm light",
  },
  sea_buckthorn_powder: {
    product: "bright orange powder, fine, matte with a faint oily sheen",
    source:
      "sea buckthorn shrubs heavy with orange berries against a bare high-altitude Ladakh valley, thin blue sky",
  },
  dehydrated_onion_powder: {
    product: "cream-white powder, fine, matte, faintly yellowish",
    source:
      "white onions freshly harvested and heaped in the field at Mahuva, Gujarat, papery skins catching the sun",
  },
  dehydrated_onion_flakes: {
    product:
      "cream-white to pale golden dehydrated onion flakes (kibbled), irregular curled pieces 3–10 mm",
    source:
      "sliced white onion spread on drying trays under the open sun, Mahuva, rows of trays receding",
  },
  dehydrated_garlic_flakes: {
    product:
      "pale cream dehydrated garlic flakes, irregular thin slices, some translucent at the edge",
    source:
      "peeled garlic cloves sliced on stainless trays before drying, Mandsaur, cool daylight",
  },
  fried_onion: {
    product:
      "golden-brown crispy fried onion slivers, glossy and curled, a few darker caramelised edges",
    source:
      "thin-slivered white onion drying on trays before frying, Mahuva, warm light",
  },
  dry_red_chilli: {
    product:
      "whole dried red chillies, glossy deep red, wrinkled, with stems, some curled (Guntur / Byadgi types)",
    source:
      "red chillies drying in a vast open yard at Guntur, an ocean of red to the horizon, hazy noon sun",
  },
  chilli_powder: {
    product:
      "vivid brick-red chilli powder, fine, with a faint oily sheen and a few coarser flecks",
    source:
      "dried red chillies heaped at a chilli yard in Guntur, hard sunlight, a wooden rake resting against the heap",
  },
  turmeric_finger: {
    product:
      "dried turmeric fingers, knobbly and curved, ochre-brown skin, one snapped to show the bright orange core",
    source:
      "fresh turmeric rhizomes just dug with soil on them, Erode farm, farmer's hands and a hoe (no face)",
  },
  cumin_seed: {
    product: "cumin seeds, slender ridged tan-brown seeds about 5 mm, matte",
    source:
      "cumin plants at harvest, feathery leaves and seed umbels, sandy Rajasthan / Saurashtra field at dawn",
  },
  coriander_seed: {
    product:
      "coriander seeds, round-ish ribbed straw-gold seeds, a few split halves",
    source:
      "coriander plants gone to seed in a Rajasthan field, pale umbels, morning light",
  },
  moringa_leaf_powder: {
    product: "deep olive-green moringa leaf powder, fine, matte",
    source:
      "a moringa tree with feathery leaves and pods on a Tamil Nadu farm, morning light through the leaves",
  },
  basmati_1121: {
    product:
      "long slender white basmati rice grains (8 mm+), slightly translucent, uncooked",
    source:
      "a golden paddy field at harvest in Punjab, cut sheaves stacked, low evening sun",
  },
  basmati_1509: {
    product: "long white basmati rice grains, uncooked, slightly translucent",
    source:
      "basmati grains pouring from a jute sack at a Haryana mandi, dusty warm light",
  },
};

const FORM_WORD: Record<ProductForm, string> = {
  powder:
    "a soft natural mound of powder, slightly higher on one side, a little dusting on the rim",
  flakes: "a loose heap of flakes, pieces spilling naturally over the rim",
  whole:
    "a generous heap of whole pieces, a few resting on the rim and one on the surface beside the bowl",
  fried: "a loose crisp heap, a few slivers fallen beside the bowl",
  grain:
    "a smooth heap of grains, a small scatter on the surface beside the bowl",
};

const HOUSE_BOWL =
  "the same hand-thrown matte charcoal stoneware bowl (low, wide, unglazed outside, slightly uneven rim), three-quarter view from about 25° above, centred, on a plain seamless pure-white sweep with one soft window light from the upper left and a gentle grounded shadow";

const STYLE =
  "Editorial product photography, honest and unretouched-looking: real texture, natural light, shallow but not blurry depth of field, no text, no labels, no logos, no watermark, no hands, no props other than what is named.";

const MACRO_STYLE =
  "Macro / close-up photograph of the actual product only, filling the frame edge to edge, top-down, natural daylight from one side so grain and texture read clearly, true colour, sharp, square crop, no bowl, no text, no props.";

const SOURCE_STYLE =
  "Documentary photograph, 35 mm film look, natural light, honest and unposed, slightly muted warm colour grade with visible grain, India. No faces, no signage, no text, no logos, no brand-new machinery.";

const NEGATIVE =
  "text, letters, watermark, logo, label, packaging, hands, cartoon, illustration, 3D render, plastic look, oversaturated, HDR, glossy stock-photo look, studio flash glare";

function block(p: (typeof products)[number]): string {
  const look = LOOK[p.id];
  if (!look) throw new Error(`photo-prompts: no LOOK entry for ${p.id}`);
  const cluster = clusters.find((c) => c.id === p.cluster)!;
  const origin = p.originRegions.slice(0, 2).join(" / ");
  return `## ${p.name}  \`${p.slug}\`

*${cluster.shortName} · form: ${p.form} · ${origin}*

Drop files into \`assets-src/photos/products/${p.slug}/\` as \`bowl.*\`, \`macro.*\`, \`source.*\`.

**bowl** — the product in the house bowl (generated from the master bowl image, or shot for real in the same bowl):

> ${HOUSE_BOWL}, holding ${look.product} — ${FORM_WORD[p.form]}. ${STYLE} Square, 2048×2048, transparent background if the tool offers it.

**macro** — the "Actual product" chip. **Shoot this one for real** (phone macro of your own sample on a black slate or white ceramic plate). If you must generate it:

> ${MACRO_STYLE} Subject: ${look.product}.

**source** — where it comes from (product page, Origin section):

> ${SOURCE_STYLE} Scene: ${look.source}. 4:3, 2048×1536.

Negative prompt (all three): ${NEGATIVE}.
`;
}

const out = `# Product photo prompts — ${products.length} SKUs × 3 shots

Generated by \`npm run photos:prompts\` from the catalogue; edit \`scripts/photo-prompts.ts\` (the LOOK table) rather than this file.
Read \`docs/photo-brief.md\` first — it holds the house style, the honesty rules and the master bowl prompt every "bowl" shot is derived from.

**Workflow for the bowl set:** generate the master empty bowl once (brief §3), then use your tool's *image edit / reference* mode with that image and each product's bowl prompt, so all ${products.length} bowls are the same bowl. Then \`npm run photos:prep\`.

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
