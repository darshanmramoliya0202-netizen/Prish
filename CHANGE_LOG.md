# Change Log

## 2026-03-15 17:06 IST
- Files:
  - `.windsurf/rules/prish-overseas-website-rules.md`
  - `.windsurf/skills/prish-overseas-website-skills.md`
  - `CHANGE_LOG.md`
- Change: Created the Windsurf rule system, skill guidance, and project change log.
- Reason: Establish a guiding mechanism before implementation and enforce timestamped tracking for every code change.
- Impact: The project now has an explicit creative, execution, and documentation baseline for all future website work.
- Risk/Notes: These rules should remain the authority if future implementation choices conflict with brochure aesthetics.

## 2026-03-15 17:10 IST
- Files:
  - `README.md`
  - `package.json`
  - `tsconfig.json`
  - `next-env.d.ts`
  - `next.config.mjs`
  - `postcss.config.js`
  - `tailwind.config.ts`
  - `.gitignore`
  - `.eslintrc.json`
- Change: Scaffolded the Next.js, TypeScript, Tailwind CSS, and linting foundation for the website project.
- Reason: Create a modern frontend base suitable for a premium interactive website built from scratch.
- Impact: The workspace now contains the required application configuration and development entry points.
- Risk/Notes: Dependencies still need to be installed before the IDE can fully resolve framework and JSX types.

## 2026-03-15 17:12 IST
- Files:
  - `app/layout.tsx`
  - `app/page.tsx`
  - `app/globals.css`
  - `components/home-page.tsx`
  - `data/site.ts`
- Change: Implemented the first homepage experience with a distinct premium visual system, structured product storytelling, market sections, and inquiry paths.
- Reason: Start execution with a website direction that is original, interactive, and clearly separate from the brochure's print layout.
- Impact: The project now has a live homepage concept driven by brand story, product families, export strength, and contact conversion.
- Risk/Notes: A later pass should add richer product depth, supporting pages, and final content polish after runtime validation.

## 2026-03-15 17:14 IST
- Files:
  - `components/home-page.tsx`
  - `CHANGE_LOG.md`
- Change: Refined public-facing homepage copy and corrected CTA interaction details.
- Reason: Remove internal/meta wording from the interface and make contact actions more production-ready.
- Impact: The site now reads more like a polished brand experience and less like a design note.
- Risk/Notes: Type and module lint errors currently shown in the IDE should resolve after dependency installation.

## 2026-03-15 17:26 IST
- Files:
  - `package.json`
  - `data/content.ts`
  - `components/site-header.tsx`
  - `components/site-footer.tsx`
  - `components/site-shell.tsx`
  - `components/section-heading.tsx`
  - `components/export-map.tsx`
  - `components/ingredient-cloud.tsx`
  - `components/inquiry-form.tsx`
  - `app/api/inquiry/route.ts`
  - `app/products/page.tsx`
  - `app/about/page.tsx`
  - `app/quality/page.tsx`
  - `app/inquiry/page.tsx`
  - `components/home-page.tsx`
  - `CHANGE_LOG.md`
- Change: Added a shared multi-page site system, richer product/about/quality pages, a structured inquiry form flow with API validation, animated homepage export visuals, and upgraded Next.js to a patched 14.2.35 release.
- Reason: Execute the second-phase website expansion while hardening the framework version and replacing the email-only conversion path with a more useful buyer intake experience.
- Impact: The website now has clear navigation, deeper content architecture, stronger homepage choreography, and a validated path for collecting inquiry details in a production-oriented format.
- Risk/Notes: The inquiry route currently validates and acknowledges submissions in-app; a future deployment can connect this intake to email, CRM, or database infrastructure if persistence is required.

## 2026-03-15 17:48 IST
- Files:
  - `data/seo.ts`
  - `app/layout.tsx`
  - `app/page.tsx`
  - `app/products/page.tsx`
  - `app/about/page.tsx`
  - `app/quality/page.tsx`
  - `app/inquiry/page.tsx`
  - `app/sitemap.ts`
  - `app/robots.ts`
  - `app/manifest.ts`
  - `app/not-found.tsx`
  - `app/opengraph-image.tsx`
  - `app/twitter-image.tsx`
  - `app/icon.tsx`
  - `README.md`
  - `CHANGE_LOG.md`
- Change: Added a production-readiness SEO layer with reusable page metadata, canonical URLs, organization structured data, sitemap, robots, manifest, branded not-found handling, and generated social-preview assets.
- Reason: Improve search discoverability, social sharing quality, and deployment readiness after the core site experience was completed.
- Impact: The website now exposes cleaner metadata and indexing signals across all main routes, while also supporting richer link previews and clearer deployment configuration.
- Risk/Notes: Set `NEXT_PUBLIC_SITE_URL` during deployment so canonical and sitemap URLs resolve to the final production domain. Generated metadata-image routes intentionally use `edge` runtime, which can produce a benign Next.js build warning while still building successfully.

## 2026-03-15 18:08 IST
- Files:
  - `package.json`
  - `package-lock.json`
  - `tsconfig.json`
  - `eslint.config.mjs`
  - `.env.example`
  - `.gitignore`
  - `netlify.toml`
  - `lib/inquiry-email.ts`
  - `app/api/inquiry/route.ts`
  - `components/inquiry-form.tsx`
  - `README.md`
  - `CHANGE_LOG.md`
- Change: Migrated the project to Next.js 16 with React 19, switched linting to ESLint flat config, added SMTP-backed inquiry delivery with honeypot protection, and prepared deployment/environment files for hosting.
- Reason: Complete the requested framework hardening, real inquiry delivery integration, and deployment preparation phase.
- Impact: The site now builds successfully on Next.js 16.1.6, `npm audit` reports zero vulnerabilities, and the inquiry flow is ready to deliver real emails once production SMTP secrets are configured.
- Risk/Notes: Managed deployment creation failed twice due provider-side internal errors, and the Netlify CLI is not installed locally. To finish live deployment, use a CLI fallback or reattempt deployment later with final domain and SMTP values available.

## 2026-03-15 18:34 IST
- Files:
  - `.gitignore`
  - `CHANGE_LOG.md`
- Change: Initialized a local Git repository, removed brochure/reference assets from version control via updated ignore rules, merged the remote GitHub repository history, and pushed the website codebase to GitHub for Netlify import.
- Reason: Shift deployment strategy from failing direct site creation to a Git-based Netlify workflow.
- Impact: The project is now available at `https://github.com/darshanmramoliya0202-netizen/Prish.git` and is ready to be imported into Netlify from GitHub.
- Risk/Notes: Live deployment still requires a manual Netlify import plus environment variable configuration for the production domain and SMTP delivery.

## 2026-03-15 18:55 IST
- Files:
  - `.gitignore`
  - `app/globals.css`
  - `tailwind.config.ts`
  - `components/home-page.tsx`
  - `components/ingredient-cloud.tsx`
  - `components/origin-gallery.tsx`
  - `components/export-map.tsx`
  - `components/site-header.tsx`
  - `components/site-footer.tsx`
  - `components/site-shell.tsx`
  - `CHANGE_LOG.md`
- Change: Reworked the homepage into a lighter, food-powder-inspired and photo-led experience using brochure imagery, replaced the abstract ingredient orbit with a product collage, upgraded the export map with a more grounded world-trade treatment, and rebuilt the footer with stronger hierarchy and conversion cues.
- Reason: Align the live site more closely with the user's preference for a warmer, less blue, less abstract, more agricultural/export-relevant visual language.
- Impact: The homepage now feels more connected to real ingredients, farmers-to-export storytelling, and B2B credibility while keeping the site distinct from a brochure replica.
- Risk/Notes: The brochure JPG assets are now intentionally readable in the workspace again for design use. Build and lint remain successful after the redesign.

## 2026-03-15 20:56 IST
- Files:
  - `data/site.ts`
  - `components/section-heading.tsx`
  - `components/ingredient-cloud.tsx`
  - `components/origin-gallery.tsx`
  - `components/export-map.tsx`
  - `components/home-page.tsx`
  - `app/about/page.tsx`
  - `next.config.mjs`
  - `CHANGE_LOG.md`
- Change: Added an India-rooted philosophy layer around Vasudhaiva Kutumbakam and One Earth, One Family, One Future, integrated a public-source PM Modi portrait, unified homepage/about contrast onto premium light reading surfaces, and implemented a dedicated interaction pass across the hero collage, values section, gallery transitions, and export map.
- Reason: Move the site closer to the original goal of feeling premium, interactive, memorable, and distinctly India-rooted rather than reading like a standard export brochure site.
- Impact: The homepage now has stronger motion depth, more user-driven interaction, more readable section hierarchy, and a clearer cultural/business worldview that differentiates the brand experience.
- Risk/Notes: Remote portrait imagery depends on Wikimedia availability through configured remote image hosts. Lint and production build pass after the interaction and readability changes.
