# Changelog

## v0.3.0 — 2026-09-28 (Phase 3: Shop, Product Details, B2B & Cart)
- Built /shop catalog page with category filtering (6 categories), price range filtering, sorting, and mobile filter sheet.
- Built /p/[slug] Product Detail page with variant selection, live price updates, 1–20 quantity stepper, delivery charge estimator by zone, tabbed specs (বিবরণ, সাইজ ও যত্ন, ডেলিভারি ও রিটার্ন), related products, and sticky mobile add-to-cart bar.
- Built interactive /b2b page with live volume pricing calculator (50-600+ pcs, 3 tiers), smart tier nudges, custom logo option (+৳25/unit, ৳1,500 setup fee), and quote request form with logo upload.
- Implemented global CartContext (client state + quoteB2C calculations) and MiniCart slide-over with line calculations ("২ × ৳৪৫০ = ৳৯০০") and FreeDeliveryProgress.
- Built full /cart page with item quantity management, coupon code input (JUTE10), and delivery zone selector (Dhaka city, suburbs, outside).
- 15/15 Vitest pricing unit tests passing; all 8 routes prerender cleanly.

## v0.2.0 — 2026-09-28 (Phase 2: Home Page)
- Built complete Home page ("/") according to SPEC.pages["/"] and SPEC.data.
- Hero section with headline ("সোনালি আঁশের গল্প, আপনার ঘরে"), subtitle, Shop and Corporate CTAs, and lifestyle frame.
- 6 Category tiles (Bags, Home Décor, Kitchen & Table, Office & Stationery, Gifts, Corporate & Bulk).
- Bestsellers showcase (Classic Jute Tote, Storage Basket, Floor Rug, Handbag) with quick-add.
- Why-jute value proposition section (Biodegradable, Handmade, Bangladeshi artisans).
- Bundle promo banner for BN1 "ইকো হোম স্টার্টার বান্ডেল" (10% discount).
- B2B corporate order banner with interactive volume pricing teaser calculator.
- Honest reviews empty state ("প্রথম রিভিউটি দিন আপনি!", zero fake reviews per project rules).
- WhatsApp community and newsletter subscription banner.
- Verified build and 15/15 passing Vitest pricing tests.

## v0.1.0 — 2026-09-27 (Phase 1: Foundation & Design System)
- Initialized Next.js 14 App Router, TypeScript strict, and Tailwind CSS in web/.
- Configured brand tokens from SPEC.brand.tokens (leaf, forest, jute, sand, cream, clay, ink).
- Integrated Google Fonts via next/font (Noto Serif Bengali, Hind Siliguri, Inter, Fraunces).
- Built core UI components: Button (variants & states), Badge, PriceTag, QtyStepper, FreeDeliveryProgress, VariantPicker, ProductCard.
- Created global layout: Header (with announcement bar, logo, language switcher), MobileDrawer, BottomNav, Footer, WhatsApp floating CTA.
- Created /styleguide page (noindex) displaying tokens, typography scale, buttons, states, and product previews.
- Verified pricing engine with 15/15 passing Vitest tests.

## v0.0.0 — 2026-09-27
- Starter kit: PRD v1.0, SPEC.json v1.0, prompt pack, playbook, reference pricing engine with 15 tests.
