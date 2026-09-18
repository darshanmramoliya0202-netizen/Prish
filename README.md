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

`npm run build` runs `verify:content` and `build:pdfs` first.
