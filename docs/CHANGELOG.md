# Changelog

## v0.7.0 — 2026-09-28 (Phase 7: SSLCommerz Payments & SMS Notifications)
- Integrated SSLCommerz hosted payment gateway with sandbox support and interactive checkout simulator (`/checkout/sandbox-payment`).
- Built server-to-server IPN webhook validation (`/api/v1/payments/sslcommerz/ipn`) that validates `val_id` against SSLCommerz validation API, ensures amount matching, upgrades order status to `confirmed`, and records event idempotently.
- Built payment callback routes: `/api/v1/payments/sslcommerz/success`, `fail`, `cancel`, and customer-facing pages `/checkout/fail` and `/checkout/cancel`.
- Updated Checkout page (`/checkout`): dual payment selector for Cash on Delivery and "বিকাশ / নগদ / রকেট / কার্ড", with automatic COD disabling and alert badge when order exceeds COD limit (৳10,000).
- Created pluggable SMS notification service driver (`web/lib/sms.ts`) with Bangla templates for order placed (COD), order confirmed, and courier dispatched.
- Created Phone OTP verification system (`POST /api/v1/auth/otp/send` & `verify`) with hashed storage, 5-minute expiry, rate limiting (3 sends / 10 min), and account lockout after 5 wrong attempts.
- Perfected UI & UX across storefront: fixed ProductCard clickability linking directly to `/p/[slug]`, auto-hidden storefront header/footer/bottom-nav on `/admin`, connected quick-add to cart on home page, and corrected domain to `paatbari.com`.
- All 30 routes compile and prerender cleanly; 15/15 Vitest pricing tests passing.

## v0.6.0 — 2026-09-28 (Phase 6: Admin Dashboard & Staff Queues)
- Built comprehensive `/admin` dashboard with role switcher (`owner`, `order_manager`, `packer`, `b2b_sales`).
- Implemented Dedicated Staff Queues:
  - **COD Verification Queue**: Pending cash-on-delivery orders awaiting phone confirmation, with direct phone and WhatsApp CTA buttons, and 1-click status advance to `confirmed` or `cancelled`.
  - **Packing Queue**: Minimalist view for warehouse packers showing ONLY confirmed orders to pack, with item and variant checklist, and printable packing slip generator.
  - **B2B Quotes Board**: Review custom bulk quote requests, view uploaded logos, calculate custom pricing, and advance quote status (`quote_requested` -> `quoted` -> `deposit_paid` -> `in_production` -> `dispatched`).
  - **Catalog & Price Manager**: Dynamic product price editing and in/out of stock toggles.
  - **Settings Manager**: Dynamic configuration for free delivery threshold (৳2,500), zone delivery fees (৳70/৳100/৳130), and COD order limit (৳10,000).
- Verified PRD §14 test cases: Tote price updated to 500 while old order snapshots remained unaffected at 450, free shipping threshold updated to 3000, and both safely reverted.
- Added API endpoints: `GET`/`PATCH /api/v1/admin/orders`, `GET`/`PATCH /api/v1/admin/products`, `GET`/`PATCH /api/v1/admin/settings`.
- All 20 Next.js routes compile and prerender cleanly; 15/15 Vitest pricing tests passing.

## v0.5.0 — 2026-09-28 (Phase 5: B2B Corporate Page & Quotes Flow)
- Built `POST /api/v1/b2b/estimate`: Server-authoritative volume pricing calculator using `web/lib/pricing.ts` with MOQ checks (50 pcs) and smart tier nudges.
- Built `POST /api/v1/b2b/quote`: Quotes creation API endpoint with unique token generation (`QT-2609-XXXX`), logo upload slot, and delivery deadline.
- Built `/quote/[token]` dynamic page: View quote breakdown, accept quote, and pay 50% advance deposit via SSLCommerz sandbox simulation or bank transfer receipt upload.
- Added `/corporate` redirect alias to `/b2b`.
- Enhanced `/b2b` page supporting 4 corporate products (B01 Promotional Bag, B02 Gift Set, B03 Hessian Bulk, B04 Custom Export).

## v0.4.0 — 2026-09-28 (Phase 4: Database, Checkout COD & Order Tracking)
- Updated brand name from "PaatKotha / পাটকথা" to "PaatBari / পাটবাড়ি" across header, footer, metadata, and copy.
- Created complete Supabase migration (20260928000000_init_schema.sql) with 17 tables (profiles, addresses, categories, products, variants, product_images, bundles, bundle_items, coupons, settings, orders, order_items, order_events, payments, quotes, reviews, otp_requests), has_role() function, and Row Level Security (RLS) policies.
- Created idempotent supabase/seed.sql with categories, products, variants, bundle (BN1), coupon (JUTE10), and settings.
- Built helper web/lib/locations.ts with all 8 divisions and 64 districts from SPEC.data.locations, automated delivery zone mapper, and phone validation regex.
- Created API endpoints:
  - POST /api/v1/cart/quote: Server-authoritative quote calculator using web/lib/pricing.ts.
  - POST /api/v1/orders: Validates 11-digit BD phone, recalculates pricing on server, generates order number (PB-2609-XXXX), snapshots item prices, and saves order as "pending".
  - POST /api/v1/track: Order tracking lookup by order number and phone.
- Built /checkout page with AddressForm (64 districts), auto zone resolution, Cash on Delivery option, and order summary.
- Built /order/[number] confirmation page with status timeline, address snapshot, item summary, and customer assistance note.
- Built /track page allowing customers to track order progress in real time.
- All 13 routes and endpoints compile and prerender cleanly; 15/15 Vitest pricing unit tests passing.

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
