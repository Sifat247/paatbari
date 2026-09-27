---
trigger: always_on
---
# 01 — Project
- Business: Bangladeshi jute products. B2C store + B2B custom-logo/bulk quotes. Bangla-first, English second.
- Payments: ONLY Cash on Delivery (B2C), SSLCommerz (bKash/Nagad/Rocket/cards), bank transfer (B2B).
- Pricing: all prices/fees/tiers in the database/settings. `web/lib/pricing.ts` is the only calculator, used only on the server (`/api/v1/cart/quote`, `/api/v1/orders`, `/api/v1/b2b/estimate`). Orders store price snapshots.
- Layout: `web/` (Next.js), `supabase/` (migrations, seed), `app/` (Flutter), `docs/` (SPEC.json = source of truth).
- Working style: plan first → approval → small steps → local test + browser-agent check → update docs/CHANGELOG.md + docs/DECISIONS.md.
- Ask the owner before changing prices, payment logic, DB schema, public API, or anything approved.
- Never put secrets in code, commits or chat. Provide `.env.example` with names only. Never touch production data without the word "deploy" from the owner.
- No fake reviews, client logos, statistics or eco claims.

- Antigravity: use Planning mode for every phase; produce an implementation plan artifact and WAIT for owner approval before coding.
- After each phase: run tests + dev server, verify with the browser agent (screenshots 360/768/1280, bn + en), write a walkthrough, then tell the owner the exact git commit command. Never push or deploy without the word "deploy".
- Secrets live only in web/.env.local (git-ignored) and in Vercel env settings — ask the owner to fill them.
