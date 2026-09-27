---
name: pk-01-foundation
description: PaatKotha PROMPT 1 — Foundation + design system. Use only when the owner types /pk-01-foundation.
---

Phase 1. Scaffold the monorepo in this workspace with the structure you proposed (git is already initialised).
- Next.js + TS strict + Tailwind; put all brand tokens from SPEC.brand.tokens into CSS variables and tailwind.config.
- Load fonts via next/font (Noto Serif Bengali, Hind Siliguri, Fraunces, Inter).
- Build components from SPEC.components with all states, and a /styleguide page (noindex) showing tokens, type scale, buttons, cards, badges, forms, toasts.
- Add web/lib/pricing.ts using the existing reference file web/lib/pricing.ts and its Vitest tests; tests must pass in CI (GitHub Action).
- Header (with announcement bar "৳২,৫০০+ অর্ডারে ফ্রি ডেলিভারি"), mobile drawer, bottom nav, footer, WhatsApp floating button, language toggle বাংলা | EN.
Run the dev server and use the browser agent to capture screenshots at 360px and 1280px.

Workflow: Planning mode → implementation plan → wait for approval → build → run tests → browser-agent check (360/768/1280, bn+en) → walkthrough → update docs/CHANGELOG.md + docs/DECISIONS.md → give me the git commit command.
