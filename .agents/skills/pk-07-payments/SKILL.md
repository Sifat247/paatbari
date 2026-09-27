---
name: pk-07-payments
description: PaatKotha PROMPT 7 — Payments + notifications. Use only when the owner types /pk-07-payments.
---

Phase 7. SSLCommerz (SANDBOX first).
- POST /api/v1/payments/sslcommerz/init and /ipn; success/fail/cancel pages; confirm order ONLY after calling SSLCommerz validation API and matching amount + tran_id; idempotent.
- Checkout shows two methods only: "ক্যাশ অন ডেলিভারি" and "বিকাশ / নগদ / রকেট / কার্ড". B2B deposit/balance also via SSLCommerz.
- COD limit from settings: above it, hide COD.
- SMS via a pluggable provider interface (driver "log" for dev, "http" for a Bangladeshi SMS gateway configured by env SMS_API_URL/SMS_API_KEY/SMS_SENDER_ID). Templates from PRD §16 in Bangla.
- Email via Resend (or Brevo) for order/quote emails + admin alerts.
- Phone OTP login: /api/v1/auth/otp/send + verify (hashed codes, 5-min expiry, 3 sends/10min, lock after 5 wrong).
Env names only in .env.example — I will fill web/.env.local myself. Test sandbox success/fail/cancel and report.

Workflow: Planning mode → implementation plan → wait for approval → build → run tests → browser-agent check (360/768/1280, bn+en) → walkthrough → update docs/CHANGELOG.md + docs/DECISIONS.md → give me the git commit command.
