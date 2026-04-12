# Prish Overseas — Redesign Plan
> Last updated: Apr 12, 2026 | Status: IN PROGRESS

---

## Brand North Star
**Authenticity** is the #1 feeling in 3 seconds for B2B buyers.
Every image, color, and section decision reinforces: *India-origin, real farm sourcing, traceable supply chain.*

---

## Execution Order

| # | Task | Status | File(s) |
|---|---|---|---|
| 1 | Tailwind config color update | ✅ Done | `tailwind.config.ts` |
| 2 | Full hardcoded hex audit & replacement | ✅ Done | 15 component files + globals.css |
| 3 | Fix products page purple → forest green | ✅ Done | `app/products/page.tsx` |
| 4 | Header frosted glass on scroll | ✅ Done | `components/site-header.tsx` |
| 5 | Remove Founder Feed from homepage | ✅ Done | `components/home-page.tsx` |
| 6 | Build Sourcing Regions section | ✅ Done | new `components/sourcing-regions.tsx` |
| 7 | Update all component image paths | ✅ Done | 5 components |
| 8 | Generate & place AI images | ⏳ Your task | `public/images/**` |

---

## Step 1 — Tailwind Color Update

### Problem
Current palette is muddy/outdated, lacks contrast, and doesn't feel premium enough for B2B buyers.

### New Palette

```ts
colors: {
  // Base tones
  ink: "#1a1a0e",
  "ink-soft": "#6b6352",
  charcoal: "#1e293b",
  slate: "#64748b",

  // Light surfaces
  cream: "#fdfcf7",
  parchment: "#f7f3ea",
  powder: "#fafaf9",
  mist: "#f1f5f9",
  surface: "#f8fafc",

  // Greens — agriculture core
  forest: "#0f5132",
  "leaf-dark": "#163a1e",
  leaf: "#22873a",
  sprout: "#4a9e52",
  olive: "#3a6b4a",

  // Earth tones — warmth & grounding
  soil: "#2a1a0a",
  earth: "#5a3418",
  bark: "#8a6040",
  wheat: "#d4a96a",
  copper: "#c4924e",

  // Spice accents — Indian agricultural warmth
  saffron: "#f5a623",
  turmeric: "#e09800",
  "gold-warm": "#d4910a",
  ember: "#e85d1a",
  chili: "#d42a2a",
}
```

### Updated hero-radial gradient
```ts
"hero-radial": "radial-gradient(ellipse at 30% 0%, rgba(34,135,58,0.10), transparent 50%), radial-gradient(ellipse at 70% 100%, rgba(224,152,0,0.07), transparent 50%), linear-gradient(180deg, #fdfcf7 0%, #f7f3ea 100%)"
```

---

## Step 2 — Full Hex Audit

Replace every hardcoded hex in component files with the nearest new token via CSS variable or Tailwind class.

### Known hardcoded values to hunt
| Old hex | New token | Used in |
|---|---|---|
| `#1c1208` | `ink` | multiple |
| `#faf7f0` | `parchment` | multiple |
| `#fdfcf9` | `cream` | multiple |
| `#1a3318` | `leaf-dark` | multiple |
| `#0f172a` | `charcoal` | bento-grid, origin-gallery, reels |
| `rgba(74,124,64,...)` | `leaf` based rgba | hero-radial, ingredient-cloud |
| `rgba(217,119,6,...)` | `turmeric` based rgba | hero-radial, soil-to-scale |
| `rgba(245,158,11,...)` | `saffron` based rgba | world-map-svg, reels |
| `rgba(92,51,23,...)` | `earth` based rgba | box shadows |
| `rgba(44,26,14,...)` | `soil` based rgba | box shadows |

---

## Step 3 — Products Page

### Problem
Purple gradient (`from-slate-950 via-slate-900 to-amber-950`) with `rgba(120,58,180,0.3)` purple glows is completely off-theme for an agricultural exporter.

### Fix
Replace with deep forest green consistent with `reels-products` section:
```tsx
// OLD
<div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-amber-950">
  <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(120,58,180,0.3),transparent_50%)]" />
  <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(217,119,6,0.2),transparent_50%)]" />
</div>

// NEW
<div className="absolute inset-0 bg-gradient-to-br from-leaf-dark via-forest to-soil">
  <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(34,135,58,0.20),transparent_50%)]" />
  <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(212,145,10,0.12),transparent_50%)]" />
</div>
```

---

## Step 4 — Header Frosted Glass

### Fix
On scroll, header becomes semi-transparent `leaf-dark` with `backdrop-blur`:
```tsx
// scrolled state className:
"bg-leaf-dark/80 backdrop-blur-md border-b border-white/10"
// instead of solid bg-leaf-dark
```

---

## Step 5 — Remove Founder Feed

### Reason
All image folders are empty. Founder Feed captions say "No stock photos. No corporate polish" — AI-generating founder photos would be dishonest to B2B buyers. Better to remove entirely and add back when real photos exist.

### Action
- Remove `<FounderFeed />` from `components/home-page.tsx`
- Keep the file, just don't render it (easy to restore later)

---

## Step 6 — New: Sourcing Regions Section

### Purpose
Fills the authenticity gap left by Founder Feed removal. Shows real India-origin traceability.

### Data (confirmed)
| State | Products |
|---|---|
| Gujarat | Cumin, Fennel, Coriander |
| Rajasthan | Cumin, Chili |
| Maharashtra | Turmeric, Onion |

### Design
- SVG India map with 3 state callout pins
- Each pin expands on hover to show state name + products sourced
- Color: `leaf` green pins, `gold-warm` accent lines
- Located after `origin-gallery` in homepage order

---

## Step 7 — Image Path Updates

### Component → Correct Image Mapping

#### `ingredient-cloud.tsx` (hero section — journey story)
| Slot | Current (wrong) | Correct |
|---|---|---|
| Main large card | `turmeric-raw.jpg` | `/images/hero/hero-spice-bowls.jpg` |
| Top-right card | `spinach-powder.jpg` | `/images/sections/lab-quality-control.jpg` |
| Bottom-left card | `strawberry-powder.jpg` | `/images/sections/farm-sourcing.jpg` |

#### `bento-grid.tsx`
| Slot | Current (wrong) | Correct |
|---|---|---|
| Tall "soil to spec" card | `orange-powder.jpg` | `/images/hero/hero-spice-bowls.jpg` |
| Wide "quality checks" card | `ginger-powder.jpg` | `/images/sections/lab-quality-control.jpg` |

#### `origin-gallery.tsx`
| Card | Current (wrong) | Correct |
|---|---|---|
| Farm sourcing | `raw-mango-powder.jpg` | `/images/sections/farm-sourcing.jpg` |
| Processing lab | `tomato-powder.jpg` | `/images/sections/lab-quality-control.jpg` |
| Export execution | `lemon-powder.jpg` | `/images/sections/export-logistics.jpg` |

#### `soil-to-scale.tsx`
| Layer | Current (wrong) | Correct |
|---|---|---|
| Farm layer | `coriander-seeds.jpg` | `/images/sections/farm-sourcing.jpg` |
| Trade layer | `cumin-powder.jpg` | `/images/sections/export-logistics.jpg` |

#### `reels-products.tsx` (already has correct paths — just need files to exist)
| Product | Path | Status |
|---|---|---|
| Turmeric | `/images/products/turmeric-product.jpg` | Missing file |
| Red Chilli | `/images/products/red-chilli-collage.png` | Has brochure text — regenerate |
| Jamun | `/images/products/jamun-powder-bowl.png` | Missing file |
| Beetroot | `/images/products/beetroot-powder.jpg` | Missing file |
| Sea Buckthorn | `/images/products/sea-buckthorn-powder.jpg` | Missing file |

#### `world-map-svg.tsx`
- India origin pulse: change to `gold-warm (#d4910a)` from current saffron

---

## Step 8 — AI Image Generation Guide

### Style Spec for ALL images
- **No text, no logos, no watermarks, no irrelevant backgrounds**
- **No white background** (clashes with dark overlays in code)
- Minimum 1600px wide, landscape for sections, portrait 9:16 for product cards

### Prompts per image

#### `/images/hero/hero-spice-bowls.jpg`
```
Overhead flat-lay of 5 Indian spice powders in dark ceramic bowls on a dark slate surface. Turmeric yellow, chili red, beetroot crimson, coriander beige, jamun purple. Moody cinematic lighting from above. Editorial food photography. No text, no logos. 16:9 landscape.
```

#### `/images/sections/farm-sourcing.jpg`
```
Close-up of an Indian farmer's weathered hands cupping freshly harvested cumin seeds. Warm golden hour light. Authentic, not staged. Shallow depth of field. Rural Gujarat farmland blurred in background. No text, no logos.
```

#### `/images/sections/lab-quality-control.jpg`
```
Modern food processing lab interior. Stainless steel surfaces, white coat technician inspecting powder sample under bright clinical lighting. Clean, hygienic, professional. Soft depth of field. No text, no logos. Landscape orientation.
```

#### `/images/sections/export-logistics.jpg`
```
Indian customs documentation desk. Stack of COA certificates, shipping manifests, export papers neatly arranged. A hand signing a document. Professional desk environment with warm office lighting. No text readable. No logos. Close-mid shot.
```

#### `/images/products/turmeric-product.jpg`
```
Dramatic close-up of bright golden turmeric powder spilling from a dark ceramic bowl onto a dark slate surface. Raw turmeric rhizomes (knobbly orange roots) placed beside the bowl. Moody cinematic lighting with golden color cast. 9:16 portrait. No text, no logos.
```

#### `/images/products/red-chilli-collage.png` → regenerate as `.jpg`
```
Dramatic close-up of dried whole red Indian chilies and bright red chili powder on a dark background. Deep red tones. Moody cinematic lighting. 9:16 portrait. No text, no logos.
```

#### `/images/products/jamun-powder-bowl.png` → regenerate as `.jpg`
```
Deep purple jamun (Indian blackberry / java plum) powder in a dark bowl. Fresh jamun fruits scattered beside it showing deep purple-black color. Dark moody background with purple color wash. 9:16 portrait. No text, no logos.
```

#### `/images/products/beetroot-powder.jpg`
```
Rich crimson beetroot powder in a dark bowl, fresh beetroot slices cut open showing vivid red interior placed beside bowl. Dark moody background. Deep red cinematic lighting. 9:16 portrait. No text, no logos.
```

#### `/images/products/sea-buckthorn-powder.jpg`
```
Bright orange sea buckthorn berries on a branch with orange powder in a small bowl beside them. Clean dark background. Vivid orange color pop. 9:16 portrait. No text, no logos.
```

---

## Decisions Log (from interview)

| Question | Decision |
|---|---|
| Image source | AI-generate all (multiple tools) |
| Product card background style | Cinematic gradient/moody dark matching product color |
| Hero ingredient-cloud slots | 1 product hero + 1 lab + 1 farm (journey story) |
| Bento tall card | Overhead spice bowl flat-lay on dark slate |
| Origin gallery farm card | Farmer hands close-up holding produce |
| Soil-to-scale trade layer | Indian customs/documentation desk |
| Products page bg | Replace purple → deep forest green (`leaf-dark`) |
| World map India pulse | `gold-warm (#d4910a)` |
| Header scroll state | Semi-transparent `leaf-dark` + backdrop-blur |
| Founder Feed | Remove entirely (restore when real photos exist) |
| Authenticity gap replacement | New "Sourcing Regions" India map section |
| Sourcing data confirmed | Gujarat, Rajasthan, Maharashtra (3 states, 6 products) |
| Hex audit scope | Full — replace every hardcoded hex across all files |
| Brand #1 feeling in 3s | Authenticity — India-origin, traceable supply chain |
| Execution priority #1 | Tailwind config update |
| Plan file location | `REDESIGN_PLAN.md` root level |
