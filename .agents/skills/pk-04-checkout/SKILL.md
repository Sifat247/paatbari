---
name: pk-04-checkout
description: PaatKotha PROMPT 4 — Database, cart, checkout (COD), tracking. Use only when the owner types /pk-04-checkout.
---

Phase 4. Supabase.
- Write migrations for the tables in PRD §12 (profiles, addresses, categories, products, variants, product_images, bundles, bundle_items, coupons, settings, orders, order_items, order_events, payments, quotes, reviews, otp_requests) with RLS and a has_role() function.
- seed.sql from SPEC.data (categories, products, variants, bundle, coupon JUTE10, settings incl. delivery zones, free_threshold 2500, cod_limit 10000, b2b tiers). Idempotent.
- API: GET catalog endpoints, POST /api/v1/cart/quote (server pricing), POST /api/v1/orders (recalculate, snapshot prices, Idempotency-Key), POST /api/v1/track.
- Switch the site to read from Supabase and use /cart/quote for all totals.
- /cart and /checkout per SPEC; AddressForm with all 8 divisions and 64 districts from SPEC.data.locations; phone validation ^01[3-9]\d{8}$; zone auto-selection per SPEC.data.zone_mapping.
- Payment in this phase: COD only. Order created as "pending" → /order/[number] success page with timeline and text "আমরা শীঘ্রই কল করে অর্ডার কনফার্ম করবো।"
- /track page (order number + phone).
- Tests: all SPEC.business_rules.pricing test examples through the API; tampered client price is ignored.
I will put the Supabase keys in web/.env.local myself (git-ignored) — tell me the names. Show test results + browser-agent screenshots.

Workflow: Planning mode → implementation plan → wait for approval → build → run tests → browser-agent check (360/768/1280, bn+en) → walkthrough → update docs/CHANGELOG.md + docs/DECISIONS.md → give me the git commit command.
