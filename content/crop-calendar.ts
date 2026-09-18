import type { CropCalendarRow, MonthStatus } from "./types";

/**
 * Indicative seasonality from public Indian crop data (harvest windows by growing belt).
 * Rendered with the disclaimer "Indicative windows — ask us for the current season."
 * Owner reviews before launch.
 *
 * h = harvest · p = new-crop processing / best booking · s = from stock · l = lean
 */
const H: MonthStatus = "harvest";
const P: MonthStatus = "processing";
const S: MonthStatus = "stock";
const L: MonthStatus = "lean";

const row = (productId: string, pattern: string, note: string): CropCalendarRow => {
  const map: Record<string, MonthStatus> = { h: H, p: P, s: S, l: L };
  const months = pattern
    .replace(/\s+/g, "")
    .split("")
    .map((c) => map[c] ?? S);
  if (months.length !== 12) throw new Error(`crop-calendar: ${productId} pattern must have 12 months`);
  return { productId, months, note };
};

//                                  J F M A M J J A S O N D
export const cropCalendar: CropCalendarRow[] = [
  row("turmeric_powder",          "h h h p p p s s s s l l", "Rhizomes lifted Jan–Mar in Erode, Sangli and Nizamabad; cured, dried and milled through spring."),
  row("turmeric_finger",          "h h h p p p s s s s l l", "Dried fingers and bulbs come to market from March; Lakadong (Meghalaya) slightly later."),
  row("dry_red_chilli",           "h h h p s s s s s l l h", "Guntur and Byadgi harvest Dec–Mar; cold-store stock carries the rest of the year."),
  row("chilli_powder",            "h h h p p s s s s l l h", "Milled from the new crop from February; colour is best on fresh-season material."),
  row("cumin_seed",               "l h h p p s s s s s s l", "Gujarat and Rajasthan cumin is a rabi crop harvested Feb–Mar; new-crop bookings open in March."),
  row("coriander_seed",           "l h h p p s s s s s s l", "Rajasthan, MP and Gujarat coriander harvests Feb–Mar."),
  row("ginger_powder",            "p p p s s s s s s s h h", "Dry ginger from the Dec–Feb harvest; milled Jan–Apr."),
  row("dehydrated_onion_powder",  "l h h h p p s s s s s l", "Mahuva’s dehydration season runs Feb–Jun on the rabi white-onion crop."),
  row("dehydrated_onion_flakes",  "l h h h p p s s s s s l", "Same Mahuva season; flakes and kibbled cut fresh during Feb–Jun."),
  row("fried_onion",              "s h h h p p s s s s s s", "Fried on the same season’s onions; stock through the year."),
  row("garlic_powder",            "s h h h p p p s s s s s", "MP, Gujarat and Rajasthan garlic lifts Feb–Apr; dehydration Mar–Jun."),
  row("dehydrated_garlic_flakes", "s h h h p p p s s s s s", "Same garlic season; flakes cut Mar–Jun."),
  row("jamun_powder",             "s s s l l h h p s s s s", "Jamun fruits for six weeks in Jun–Jul; the year’s powder is made then."),
  row("raw_mango_powder",         "s s s h h h p p s s s s", "Green mangoes Apr–Jun; sun-dried and milled May–Jul."),
  row("guava_powder",             "h h p p s s h h h s h h", "Main winter crop Nov–Feb; a lighter rainy-season crop Jul–Sep."),
  row("mulberry_powder",          "l l h h h p s s s s s l", "Karnataka and Tamil Nadu fruit Mar–May."),
  row("apple_powder",             "s s s s s s s h h h p p", "Himachal and Kashmir apples Aug–Oct; dried Sep–Nov."),
  row("pineapple_powder",         "s s s s s h h h h p s s", "Main north-east and Kerala crop Jun–Sep."),
  row("orange_powder",            "h p h h p s s s s s h h", "Nagpur mandarin has two flushes: Nov–Jan and Feb–Apr."),
  row("lemon_powder",             "s s s s s s h h h p s s", "Year-round with a Jul–Sep peak."),
  row("beetroot_powder",          "h h h p s s l l l s h h", "Cool-season root crop Nov–Mar; lean in monsoon."),
  row("spinach_powder",           "h h h p s l l l l h h h", "Winter leaf crop Oct–Mar; lean through the hot months."),
  row("tomato_powder",            "h h h p s h h h s s s h", "Winter peak Dec–Mar with a secondary Jun–Aug flush."),
  row("sea_buckthorn_powder",     "s s s s s s s s h h p s", "Ladakh berries ripen Sep–Oct; the year’s supply is made then."),
  row("moringa_leaf_powder",      "p p p s s s l l l s h h", "Leaf cycles year-round; best leaf Nov–Mar, monsoon leaf is lower grade."),
  row("basmati_1121",             "p p s s s s s s s h h p", "Kharif harvest Oct–Nov; new-crop sella and steam from November, aged stock all year."),
  row("basmati_1509",             "p p s s s s s s s h h p", "Early-maturing; harvest Sep–Nov, new crop from November."),
];

export const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"] as const;

export const statusLabel: Record<MonthStatus, string> = {
  harvest: "Harvest",
  processing: "New crop — best booking",
  stock: "From stock",
  lean: "Lean",
};
