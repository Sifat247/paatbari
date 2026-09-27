---
name: pk-08-i18n-seo
description: PaatKotha PROMPT 8 — i18n, SEO, analytics, content pages. Use only when the owner types /pk-08-i18n-seo.
---

Phase 8.
- Complete bn/en translations (messages/bn.json, en.json); Bangla digits in bn.
- SEO: metadata per page and locale, hreflang, sitemap.xml, robots.txt, JSON-LD (Product+Offer in BDT, BreadcrumbList, Organization, WebSite).
- GA4 + Meta Pixel + server Conversions API; events: view_item, add_to_cart, begin_checkout, add_payment_info, purchase, generate_lead, search, sign_up. IDs via env.
- Pages: /about, /blog (MDX, 3 starter posts: পাটের পণ্যের যত্ন, কেন পাট?, কর্পোরেট গিফট আইডিয়া), /faq, /contact, /shipping, /returns, /privacy, /terms, 404 — with PLACEHOLDER contact data clearly marked.
- Account page: orders, quotes, addresses, profile, language, DELETE ACCOUNT (also DELETE /api/v1/me).
Lighthouse report for home, product, checkout.

Workflow: Planning mode → implementation plan → wait for approval → build → run tests → browser-agent check (360/768/1280, bn+en) → walkthrough → update docs/CHANGELOG.md + docs/DECISIONS.md → give me the git commit command.
