# Prish Overseas — Website Photo Replacement Guide

## Problem
All current website images are **brochure PDF page exports** (from `brochure/` folder) with text, logos, and layout baked in. They look unprofessional on a modern website. We need clean, high-quality photographs without any text overlays.

---

## Master Photo List

### 1. `hero-spice-bowls.jpg`
- **Currently:** `Brochure Draft 4 edit lite_page-0001.jpg` (aliased as `heroPowders`)
- **Used in:** `ingredient-cloud.tsx` (hero main image), `reels-products.tsx` (Turmeric card), `bento-grid.tsx` (image tile)
- **What it should be:** Overhead/flat-lay of vibrant Indian spice powders in dark ceramic bowls — turmeric yellow, beetroot crimson, chili red, spinach green — on a dark slate or wooden surface. No text, no logos. Moody lighting, editorial food photography style. Landscape orientation preferred.
- **Search terms:** "Indian spice powders bowls flat lay", "colorful spice powder ceramic bowls dark background"

### 2. `farm-sourcing.jpg`
- **Currently:** `Brochure Draft 4 edit lite_page-0002.jpg` (aliased as `sourcingMap`)
- **Used in:** `soil-to-scale.tsx` (farm parallax layer), `origin-gallery.tsx` (Farm-linked sourcing card), `founder-feed.tsx` (Origin Run post)
- **What it should be:** Indian agricultural landscape — farmers working in spice/crop fields during golden hour. Gujarat or Rajasthan farmland with warm sunset tones. Authentic, not stock-looking. Wide landscape shot. Could show cumin, turmeric, or chili harvest.
- **Search terms:** "Indian farmer spice field harvest", "Gujarat agriculture golden hour", "turmeric farm India"

### 3. `world-trade-map.jpg`
- **Currently:** `Brochure Draft 4 edit lite_page-0003.jpg` (aliased as `worldTradeBackdrop`)
- **Used in:** `export-map.tsx` (world map background behind interactive pins)
- **What it should be:** Subtle, desaturated world map OR aerial view of shipping port/trade routes. Must be muted enough that interactive map pins and labels overlay cleanly. Light/neutral tones preferred (not dark). Think: soft cartographic texture or a stylized globe view.
- **Search terms:** "world map subtle light background", "global trade routes map minimal", "shipping routes world map light"

### 4. `lab-quality-control.jpg`
- **Currently:** `Brochure Draft 4 edit lite_page-0004.jpg` (aliased as `labProcess`)
- **Used in:** `reels-products.tsx` (Dehydrated Onion card), `origin-gallery.tsx` (Processing control card), `founder-feed.tsx` (QC Check post), `bento-grid.tsx` (lab image tile)
- **What it should be:** Modern food processing lab — technician in white coat and hairnet inspecting powder quality, clean stainless steel equipment, sterile hygienic environment. Professional, trustworthy feel. Should convey precision and quality control.
- **Search terms:** "food processing lab quality control", "food scientist testing powder", "ingredient quality lab technician"

### 5. `product-portfolio.jpg`
- **Currently:** `Brochure Draft 4 edit lite_page-0005.jpg` (aliased as `portfolioHighlight`)
- **Used in:** `ingredient-cloud.tsx` (portfolio card), `reels-products.tsx` (Jamun Powder card), `founder-feed.tsx` (Sales Grind post)
- **What it should be:** Beautifully arranged product display — multiple spice jars, pouches, or sample kits laid out on a clean surface. Could show branded packaging mockups or an elegant flat-lay of various ingredient powders in small containers. Professional product photography feel.
- **Search terms:** "spice product display arrangement", "ingredient jars collection flat lay", "food product portfolio photography"

### 6. `ingredient-closeup.jpg`
- **Currently:** `Brochure Draft 4 edit lite_page-0006.jpg` (aliased as `ingredientHighlights`)
- **Used in:** `ingredient-cloud.tsx` (highlights card), `reels-products.tsx` (Beetroot Powder card), `founder-feed.tsx` (Lab Notes post)
- **What it should be:** Macro/close-up shot of colorful ingredient powders showing texture and vibrant natural colors. Artistic food photography — think turmeric pile with scattered raw roots, or multiple powder colors arranged in a gradient. Shallow depth of field.
- **Search terms:** "spice powder macro texture", "colorful ingredient powder close up", "turmeric powder artistic photography"

### 7. `export-logistics.jpg`
- **Currently:** `Brochure Draft 4 edit lite_page-0007.jpg` (aliased as `exportExecution`)
- **Used in:** `soil-to-scale.tsx` (trade parallax layer), `origin-gallery.tsx` (Export execution card), `founder-feed.tsx` (Export Day post)
- **What it should be:** Export/logistics operations — shipping containers at port, container being loaded onto vessel, or warehouse with palletized goods ready for dispatch. Industrial, professional. Shows scale and reliability. Blue/grey tones of steel containers work well.
- **Search terms:** "shipping container port loading", "export logistics warehouse", "container ship port India"

### 8. `turmeric-product.jpg` (NEW — individual product shot)
- **Used in:** `reels-products.tsx` (Turmeric Powder card — currently reusing hero image)
- **What it should be:** Close-up of bright golden turmeric powder in a bowl or spilling from a container, with raw turmeric roots/rhizomes nearby. Clean, dark or neutral background. Product photography style.
- **Search terms:** "turmeric powder bowl raw roots", "haldi powder close up dark background"

### 9. `dehydrated-onion.jpg` (NEW — individual product shot)
- **Used in:** `reels-products.tsx` (Dehydrated Onion card — currently reusing lab image)
- **What it should be:** Dehydrated onion flakes and powder — white/golden tones, clean presentation. Could show raw onions alongside the dehydrated product. Clean background.
- **Search terms:** "dehydrated onion flakes powder", "dried onion product photography"

### 10. `jamun-powder.jpg` (NEW — individual product shot)
- **Used in:** `reels-products.tsx` (Jamun Powder card — currently reusing portfolio image)
- **What it should be:** Deep purple jamun (Indian blackberry) powder with fresh jamun fruits. Rich, vibrant purple/violet tones. Clean background.
- **Search terms:** "jamun fruit powder purple", "Indian blackberry java plum powder"

### 11. `beetroot-powder.jpg` (NEW — individual product shot)
- **Used in:** `reels-products.tsx` (Beetroot Powder card — currently reusing ingredient image)
- **What it should be:** Deep crimson-red beetroot powder with fresh beetroot slices showing the interior color. Vibrant, natural. Clean background.
- **Search terms:** "beetroot powder red close up", "beet root powder fresh slices"

### 12. `founder-field-visit.jpg` (NEW — for Founder's Feed authenticity)
- **Used in:** `founder-feed.tsx` (Origin Run post — currently reusing sourcingMap brochure page)
- **What it should be:** Candid photo of a business person or entrepreneur visiting an Indian agricultural market or farm. Authentic, ground-level. Unjha mandi/spice market vibe.
- **Search terms:** "Indian spice market visit", "agricultural market India business", "spice mandi Gujarat"

### 13. `founder-sample-kits.jpg` (NEW — for Founder's Feed)
- **Used in:** `founder-feed.tsx` (Sales Grind post)
- **What it should be:** Sample kits being prepared — small pouches, COA documents, spec cards laid out on a desk. Professional but authentic workspace shot.
- **Search terms:** "product sample kit preparation", "spice sample pouches packaging"

### 14. `about-modi.jpg` (EXISTING external URL)
- **Currently:** Wikimedia Commons direct link
- **Used in:** `app/about/page.tsx` (leadership section)
- **Decision:** Keep as-is (official government portrait) or consider removing the section entirely if it doesn't add value.

---

## Folder Structure
```
public/images/
├── hero/
│   └── hero-spice-bowls.jpg
├── sections/
│   ├── farm-sourcing.jpg
│   ├── world-trade-map.jpg
│   ├── lab-quality-control.jpg
│   ├── export-logistics.jpg
│   └── ingredient-closeup.jpg
├── products/
│   ├── turmeric-product.jpg
│   ├── dehydrated-onion.jpg
│   ├── jamun-powder.jpg
│   ├── beetroot-powder.jpg
│   └── product-portfolio.jpg
└── founder/
    ├── founder-field-visit.jpg
    └── founder-sample-kits.jpg
```

## Notes
- All photos should be **minimum 1600px wide**, ideally 2400px for retina displays
- **Landscape orientation** preferred for section backgrounds and parallax layers
- **Square or portrait (9:16)** for product cards and founder feed posts
- Use **JPG format** for photographs, optimized to < 500KB each
- No watermarks, no text overlays, no logos baked into photos
- License: Unsplash/Pexels (free for commercial use) or original photography
