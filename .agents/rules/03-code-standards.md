---
trigger: always_on
---
# 03 — Code standards
- TypeScript strict; server components by default; Route Handlers for /api/v1; zod validation on every input.
- Supabase: RLS on every table; `has_role()` for staff; service key server-only.
- Payments: confirm only after SSLCommerz validation API + amount match; idempotent handlers.
- Tests: Vitest for pricing (all SPEC test_examples) and API; Playwright smoke test for checkout. CI must stay green.
- Flutter: Riverpod, go_router, dio, freezed, secure storage, ARB l10n; never calculate final prices in the app.
