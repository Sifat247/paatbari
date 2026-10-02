# Supabase connection — পাটবাড়ি

Website (Next.js on Vercel) ↔ Supabase project `gtwzurvaryvwwebasydo`.

## What lives where
| Data | Where | Who can read |
|---|---|---|
| categories, products, variants | Supabase | public (publishable key) |
| orders | Supabase `orders` | website server only (service_role) |
| B2B quotes | Supabase `b2b_quotes` | website server only |
| admin settings (delivery fee, free threshold…) | Supabase `app_settings` | website server only |
| OTP codes (hashed) | Supabase `otp_requests` | website server only |
| product details / photos / prices shown on site | `web/lib/catalog.ts` | — |

The mobile app talks to the website API (`/api/v1/orders`, `/api/v1/track`), never to the orders table directly.

## One-time setup
1. Supabase Dashboard → SQL Editor → paste & run `supabase/migrations/20261002000000_connect_web_backend.sql`.
2. Supabase → Project Settings → API Keys → copy the **service_role / secret** key.
3. Add to `web/.env.local` **and** Vercel → Settings → Environment Variables:
   - `SUPABASE_SERVICE_ROLE_KEY` = (secret key)
   - `ADMIN_PASSWORD` = (your admin password, 8+ chars)
4. Redeploy on Vercel.
5. Open `/admin` → log in with ADMIN_PASSWORD.

## Security rules (keep these)
- Never put the service_role key in the mobile app, in `NEXT_PUBLIC_*` variables, or in git.
- Never add a public SELECT policy on `orders` — it would expose every customer's phone & address.
