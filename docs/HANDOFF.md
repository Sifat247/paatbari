# Paatbari (পাটবাড়ি) — Project Handoff & Operations Manual

**Brand:** Paatbari · পাটবাড়ি  
**Tagline:** সোনালি আঁশের বাড়ি — Home of the golden fibre  
**Owner:** Sifat  
**Production Target:** Vercel (Web) + Supabase (Database) + SSLCommerz (Payments) + Bulk SMS Gateway  
**Version:** v1.0.0 (Release Ready)

---

## 1. Quick Start (Running Locally)

### Prerequisites
- **Node.js**: v18.18+ or v20+ LTS installed
- **Git**: Installed and configured

### Installation & Execution
```bash
# 1. Clone or navigate to the repository
cd C:\Users\DELL\Documents\paatkotha\web

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev

# 4. Open in browser
# http://localhost:3000
```

### Production Build & Tests
```bash
# Run unit tests (15/15 Vitest pricing engine tests)
npm test

# Run Next.js production build (43 routes)
npm run build
```

---

## 2. Environment Variables Configuration

Copy `.env.example` to `web/.env.local` for local development, or add these keys to **Vercel Project Settings $\to$ Environment Variables**:

| Variable Name | Required | Default / Example | Purpose |
|---|:---:|---|---|
| `NEXT_PUBLIC_APP_URL` | Yes | `https://paatbari.com` | Base URL for callbacks & metadata |
| `NEXT_PUBLIC_SUPABASE_URL` | Yes | `https://xyz.supabase.co` | Supabase project API URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Yes | `eyJh...` | Public anonymous key |
| `SUPABASE_SERVICE_ROLE_KEY` | Yes | `eyJh...` | Secret service key for admin APIs |
| `SSLCOMMERZ_STORE_ID` | Yes | `paatbari_live` (or sandbox test) | SSLCommerz Merchant Store ID |
| `SSLCOMMERZ_STORE_PASS` | Yes | `secret_password` | SSLCommerz Merchant Password |
| `SSLCOMMERZ_IS_SANDBOX` | Yes | `true` (dev) / `false` (prod) | Switch between Sandbox & Live gateway |
| `SMS_PROVIDER_API_KEY` | Yes | `api_key_here` | Bulk SMS Gateway API Key |
| `SMS_SENDER_ID` | Yes | `Paatbari` | Approved Alpha Sender Masking ID |
| `NEXT_PUBLIC_GA4_ID` | Optional | `G-XXXXXXXXXX` | Google Analytics 4 Measurement ID |
| `NEXT_PUBLIC_META_PIXEL_ID` | Optional | `1234567890` | Meta (Facebook) Pixel ID |

---

## 3. Vercel Production Deployment Guide

1. **Push to GitHub**:
   Ensure all changes on the `master` branch are pushed to your remote repository.
2. **Import Project to Vercel**:
   - Go to [vercel.com](https://vercel.com) and click **"Add New Project"**.
   - Select the `paatkotha` repository.
   - **CRITICAL**: Set **Root Directory** to `web`.
   - Build Command: `next build` (default).
3. **Configure Environment Variables**:
   - Add all variables listed in Section 2 above.
4. **Deploy**:
   - Click **"Deploy"**. The build will complete and deploy the 43 routes.
5. **Connect Custom Domain**:
   - Go to **Project Settings $\to$ Domains**.
   - Add `paatbari.com` and `www.paatbari.com`.
   - Update DNS records (A Record: `76.76.21.21`, CNAME: `cname.vercel-dns.com`) at your domain registrar.

---

## 4. How to Manage Catalog & Add Products

### Method A: Via Admin Dashboard (`/admin`)
1. Log in to `https://paatbari.com/admin` with role `owner` or `order_manager`.
2. Navigate to the **"Catalog & Prices"** tab.
3. Edit prices or toggle stock status with 1-click. Changes reflect immediately across the entire catalog and new quotes.

### Method B: In Code / Database
- Static catalog definitions reside in `web/lib/catalog.ts`.
- In Supabase, products are managed in the `products` and `variants` tables:
```sql
INSERT INTO products (id, category_id, slug, name_en, name_bn, description_en, description_bn)
VALUES ('P15', 'bags', 'luxury-jute-backpack', 'Luxury Jute Backpack', 'বিলাসবহুল পাটের ব্যাকপ্যাক', '...', '...');
```

---

## 5. Staff Order Fulfillment Workflow

The system provides dedicated role-based queues to streamline operations:

```
[Customer Orders (COD / Online)]
           │
           ▼
[COD Verification Queue]  ── (Order Manager calls & confirms)
           │
           ▼
    [Packing Queue]       ── (Warehouse packer prints slip & boxes items)
           │
           ▼
  [Courier Dispatch]      ── (Tracking ID assigned, SMS sent to customer)
```

1. **COD Verification (`/admin` $\to$ COD Verification)**:
   - Order Managers review new cash-on-delivery orders.
   - Click the **Phone** or **WhatsApp** button to contact the customer.
   - Click **"কনফার্ম করুন"** to advance to confirmed status.
2. **Packing Queue (`/admin` $\to$ Packing Queue)**:
   - Packers view ONLY confirmed orders awaiting fulfillment.
   - Check off each variant on the packing list.
   - Click **"প্রিন্ট স্লিপ"** to generate a clean, branded packing slip for the box.
   - Mark as **"প্যাকিং সম্পন্ন"**.
3. **Courier Handover**:
   - Assign Steadfast / Pathao tracking number.
   - Order updates to `dispatched`; customer receives automated Bangla SMS with tracking link.

---

## 6. Database Backup & Restore

### Automated Supabase Daily Backups
- Supabase automatically performs daily WAL backups for Point-in-Time Recovery (PITR).

### Manual Export via CLI
```bash
# Export all tables & schema
supabase db dump -f supabase/backups/backup_$(date +%Y%m%d).sql

# Restore from backup
supabase db reset
supabase db push
```

---

## 7. Zero Fake Reviews Commitment

Per core project decisions:
- The customer review section displays an authentic, warm invitation empty state (*"প্রথম রিভিউটি দিন আপনি!"*).
- Never seed synthetic or fake reviews.
- Only verified purchasers who receive completed parcel deliveries are invited via SMS to submit genuine product feedback.
