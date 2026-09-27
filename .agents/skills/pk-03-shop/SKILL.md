---
name: pk-03-shop
description: PaatKotha PROMPT 3 — Shop, product, bundles. Use only when the owner types /pk-03-shop.
---

Phase 3. Build /shop, /shop/[category], /p/[slug], /bundles per SPEC.pages using SPEC.data (14 products, 1 bundle).
- Filters (category, price, colour, size); mobile filter bottom sheet; sort.
- Product page: gallery, variant chips (show price per variant), qty 1–20, add to cart, buy now, delivery estimate by zone + free-delivery note, tabs (বিবরণ, সাইজ ও যত্ন, ডেলিভারি ও রিটার্ন), related products, sticky mobile add-to-cart.
- Mini-cart slide-over with calculation lines "২ × ৳৪৫০ = ৳৯০০" and FreeDeliveryProgress.
- For now cart is client state but totals come from pricing.ts (will switch to API in Phase 4).
Browser-agent screenshots at 360/1280 px.

Workflow: Planning mode → implementation plan → wait for approval → build → run tests → browser-agent check (360/768/1280, bn+en) → walkthrough → update docs/CHANGELOG.md + docs/DECISIONS.md → give me the git commit command.
