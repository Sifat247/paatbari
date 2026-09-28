# Decisions

| # | Date | Decision |
|---|---|---|
| D1 | 2026-09-27 | Model: B2C retail + B2B bulk/custom quotes |
| D2 | 2026-09-27 | Payments phase 1: COD + SSLCommerz (bKash, Nagad, Rocket, cards); B2B also bank transfer |
| D3 | 2026-09-27 | Builder: Google Antigravity (phase skills in .agents/skills); owner reviews every phase |
| D4 | 2026-09-27 | Brand "PaatKotha / পাটকথা" + palette = PLACEHOLDER until checked |
| D5 | 2026-09-27 | Stack: Next.js + Supabase on Vercel; Flutter app uses /api/v1 |
| D6 | 2026-09-27 | Launch order: Website → Android → iOS |
| D7 | 2026-09-27 | UI Architecture: Next.js App Router with Tailwind CSS variables for tokens |
| D8 | 2026-09-27 | Typography: Hind Siliguri (bn body) + Noto Serif Bengali (bn display) via next/font |
| D9 | 2026-09-28 | Catalog & Seed: Structured mock catalog in web/lib/catalog.ts matching SPEC.data |
| D10 | 2026-09-28 | Reviews policy: Zero fake reviews; empty state invitation until verified deliveries |
| D11 | 2026-09-28 | Cart state: React Context with localStorage persistence and quoteB2C calculations |
| D12 | 2026-09-28 | B2B flow: Live interactive volume calculator with tier nudges and custom logo calculation |
| D13 | 2026-09-28 | Brand official name: "PaatBari (পাটবাড়ি)" approved by owner |
| D14 | 2026-09-28 | Order flow: COD checkout with 64-district automated delivery zone resolution |
| D15 | 2026-09-28 | B2B Quotes: Unique tokenized URLs (/quote/[token]) with live status tracking and deposit acceptance |
| D16 | 2026-09-28 | Admin Architecture: Role-based permissions (owner, manager, packer, b2b_sales) with isolated packing queue for warehouse staff |
| D17 | 2026-09-28 | Payments: SSLCommerz hosted gateway, server IPN validation, phone OTP verification, and SMS notification templates |
| D18 | 2026-09-28 | i18n & Compliance: Complete bn/en localization engine with dynamic numerals, ProductArt vector craft components, full legal/compliance pages, and customer data erasure (DELETE /api/v1/me) |
