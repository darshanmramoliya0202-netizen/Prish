# Prish Overseas Website

A premium, interactive website for Prish Overseas focused on Indian-origin botanical and dehydrated ingredients for global B2B markets.

## Project Intent
- Create a unique digital experience that does not visually replicate the brochure
- Express Indian origin through a modern premium web language
- Support export trust, product discovery, and inquiry conversion

## Planned Stack
- Next.js
- TypeScript
- Tailwind CSS
- Framer Motion

## Deployment Notes
- Set `NEXT_PUBLIC_SITE_URL` to the final production origin so canonical URLs, sitemap entries, robots host, and social metadata resolve correctly.
- Configure `SMTP_HOST`, `SMTP_PORT`, `SMTP_SECURE`, `SMTP_USER`, `SMTP_PASS`, `INQUIRY_FROM_EMAIL`, and `INQUIRY_TO_EMAIL` so the inquiry form delivers real email notifications.
- `npm run lint` uses ESLint directly via flat config to stay compatible with Next.js 16.

## Project Rules
Primary project guidance lives in:
- `.windsurf/rules/prish-overseas-website-rules.md`
- `.windsurf/skills/prish-overseas-website-skills.md`
- `CHANGE_LOG.md`
