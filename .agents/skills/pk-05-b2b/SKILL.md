---
name: pk-05-b2b
description: PaatKotha PROMPT 5 — B2B corporate page + quotes. Use only when the owner types /pk-05-b2b.
---

Phase 5. Build /corporate and the quote flow per SPEC.pages and SPEC.business_rules.b2b.
- QuoteCalculator calling POST /api/v1/b2b/estimate (qty, logo) → unit, total, deposit; MOQ error "সর্বনিম্ন অর্ডার ৫০ পিস"; tier nudge "আর {n}টি যোগ করলে প্রতি পিস ৳{price}".
- Quote form: company, contact person, phone, email, product (B01–B04), qty, logo upload (PNG/SVG/PDF ≤10MB to Supabase Storage), deadline, delivery address, notes; Turnstile.
- /quote/[token]: view quote, accept, then pay deposit (SSLCommerz placeholder button until Phase 7) or upload bank receipt.
- Statuses from SPEC.business_rules.b2b_statuses.
Tests Q1–Q6 must pass. Browser-agent screenshots.

Workflow: Planning mode → implementation plan → wait for approval → build → run tests → browser-agent check (360/768/1280, bn+en) → walkthrough → update docs/CHANGELOG.md + docs/DECISIONS.md → give me the git commit command.
