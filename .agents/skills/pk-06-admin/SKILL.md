---
name: pk-06-admin
description: PaatKotha PROMPT 6 — Admin panel. Use only when the owner types /pk-06-admin.
---

Phase 6. Build /admin (role-protected; roles owner, order_manager, packer, b2b_sales) per PRD §14:
dashboard, orders (filters, detail, status change writes order_events, courier + tracking ID, printable invoice & packing slip, call/WhatsApp buttons),
packing queue (packer sees only confirmed orders), products (CRUD, variants, images drag-sort, stock, CSV price import/export),
bundles & coupons, quotes board (edit price, generate PDF quote, send link, record payments, production notes, mock-up photo),
customers (notes, fake-order flag), settings (delivery zones & fees, free threshold, COD limit, B2B tiers/fees, contacts, announcement, payment methods on/off),
staff (invite + role), reports (sales by product/zone, COD success rate, CSV).
Owner account comes from env OWNER_EMAIL. Big, simple Bangla UI for staff.
Test: change Tote price to 500 and free threshold to 3000 in settings → site updates; old orders unchanged. Then revert.

Workflow: Planning mode → implementation plan → wait for approval → build → run tests → browser-agent check (360/768/1280, bn+en) → walkthrough → update docs/CHANGELOG.md + docs/DECISIONS.md → give me the git commit command.
