# Prish Overseas — website v3 ("Khet Se")

Indian-origin ingredients for global formulations. Rajkot, Gujarat.

- **Stack:** Next.js 16 · React 19 · TypeScript · Tailwind v4 · GSAP · Lenis · React Three Fiber · @react-pdf/renderer
- **Content:** typed files in `content/` generated from the owner's product master + catalogue (`scripts/generate-content.py`) and gated by `scripts/verify-content.ts`
- **Rules:** read `docs/content-rules.md` before writing any copy
- **Ops:** `docs/ops.md`

```bash
npm install
cp .env.example .env.local   # fill SMTP_* to test email locally; CRM_ENABLED=false
npm run dev
```

`npm run build` runs `render:bowls`, `photos:prep`, `verify:content` and `build:pdfs` first.

**Photography.** Drop files into `assets-src/photos/` (see `docs/photo-brief.md` for the slots) and run `npm run photos:prep`; commit `public/photos/**` and `content/generated/photos.json`. The current set is the owner's archive imagery, placed by `node scripts/photos-import-archive.mjs`. Product bowls are knocked out and their loose fruit / seeds become the burst.

**Visual QA** (headless, because the desktop-app browser pane stalls animation when hidden): `scripts/qa/tour.mjs` (every route, desktop + phone), `slice.mjs`, `sheet.mjs`, `shot.mjs`, `burst-frames.mjs`, `seg-debug.mjs` — usage in each file's header.
