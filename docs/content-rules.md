# Content rules (non-negotiable)

These rules exist because the previous site mixed a handful of brochure facts with a
large layer of invented claims. `scripts/verify-content.ts` enforces most of them at build.

1. **Every claim traces to a source.** Allowed sources: the brochure PDF, the `.docx`
   catalogue, `products.py` in the mail-CRM, or an explicit owner decision recorded in
   the plan. If it is in none of those, it does not go on the site.
2. **Numbers we publish** — 2500+ MT/month · 100+ specification profiles · 12–24 months
   shelf life · 280+ sunshine days · 4 export regions. Nothing else. No country counts,
   no purity percentages, no response-time promises, no MOQs, no prices.
3. **No founding year.** Heritage is told as seasons and generations, never dates.
4. **Regions, not countries:** United States · European Union · GCC · Southeast Asia.
5. **Certifications** render only from `content/certificates.ts` entries whose
   `number` is not null. Never write "FSSAI Certified"/"APEDA Registered" in copy.
   APEDA is *under approval* until the owner says otherwise. No Halal, no GMP.
6. **Business model wording:** "farm-rooted", "our own and partner processing
   network". Never "our factory", never "REAL FACTORY".
7. **People:** Yash Talaviya — Director. No other names unless the owner adds them to
   `content/story.ts › people`. No testimonials; anonymised stories only.
8. **Imagery:** nothing AI-generated is ever captioned as a real place, person, lot,
   lab or facility. Alt text for illustrations starts with "Illustration of".
   The only real photo is the founder's. The PM portrait carries credit + licence.
9. **Specs are "typical values"** — every spec table carries
   "Typical values — lot-specific COA on request". Grade tables are ranges, not promises.
10. **Commercial terms:** Incoterms FOB and CIF only. Samples: "Samples available — ask us."
11. **Voice:** founder-first, warm, direct, short. No consultant-speak
    ("specification-ready", "documentation discipline"). Cheeky lines live only in
    `content/copy.ts › loaderLines` and the 404.
12. **Desi words** always appear with romanisation + translation and a `lang` attribute.

## Photography

Real photos are optional drop-ins, never placeholders: `assets-src/photos/**` → `npm run photos:prep` → `public/photos/**` + `content/generated/photos.json` (commit both outputs; originals stay on F:). Product bowls, the "Actual product" chips, origin photos and the site slots all read the manifest through `content/photos.ts`. The honesty line, house style, shot list and prompts are in [`photo-brief.md`](photo-brief.md); per-SKU prompts are generated into [`photo-prompts-products.md`](photo-prompts-products.md) by `npm run photos:prompts`. Anything that makes a claim about Prish itself (people, documents, facilities, the "actual product" macros) must be a real photograph.
