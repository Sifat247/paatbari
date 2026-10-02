-- ============================================================
-- পাটবাড়ি (Paatbari) — Connect website backend to Supabase
-- Safe to run more than once. Run the whole file in:
-- https://supabase.com/dashboard/project/gtwzurvaryvwwebasydo/sql/new
--
-- What it does:
--   1. Makes the `orders` table match the website (adds missing columns)
--   2. Creates b2b_quotes, app_settings, otp_requests tables
--   3. Locks customer data: only the website server (service_role key)
--      can read/write orders, quotes, settings and OTPs.
--      Products / categories / variants stay publicly readable.
-- ============================================================

-- ---------- 1. ORDERS ----------
CREATE TABLE IF NOT EXISTS public.orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_number TEXT UNIQUE NOT NULL,
  customer_name TEXT NOT NULL,
  customer_phone TEXT NOT NULL,
  customer_email TEXT,
  district TEXT NOT NULL,
  address_line TEXT NOT NULL,
  note TEXT,
  subtotal INT NOT NULL DEFAULT 0,
  delivery_fee INT NOT NULL DEFAULT 0,
  total INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS division     TEXT;
ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS area         TEXT;
ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS zone         TEXT NOT NULL DEFAULT 'dhaka_city';
ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS discount     INT  NOT NULL DEFAULT 0;
ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS note         TEXT;
ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS courier_name TEXT;
ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS tracking_id  TEXT;
ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS tran_id      TEXT;
ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS source       TEXT NOT NULL DEFAULT 'web';
ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS items        JSONB NOT NULL DEFAULT '[]'::jsonb;
ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS events       JSONB NOT NULL DEFAULT '[]'::jsonb;
ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS status         TEXT;
ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS payment_method TEXT;
ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS payment_status TEXT;

-- The old setup used enum types that don't include 'packing' / 'returned'.
-- Convert those columns to plain text with a CHECK so the website's statuses fit.
ALTER TABLE public.orders ALTER COLUMN status DROP DEFAULT;
ALTER TABLE public.orders ALTER COLUMN status TYPE TEXT USING status::text;
UPDATE public.orders SET status = 'packing' WHERE status = 'packed';
UPDATE public.orders SET status = 'pending' WHERE status IS NULL;
ALTER TABLE public.orders ALTER COLUMN status SET DEFAULT 'pending';
ALTER TABLE public.orders ALTER COLUMN status SET NOT NULL;

ALTER TABLE public.orders ALTER COLUMN payment_method DROP DEFAULT;
ALTER TABLE public.orders ALTER COLUMN payment_method TYPE TEXT USING payment_method::text;
UPDATE public.orders SET payment_method = 'cod' WHERE payment_method IS NULL;
ALTER TABLE public.orders ALTER COLUMN payment_method SET DEFAULT 'cod';
ALTER TABLE public.orders ALTER COLUMN payment_method SET NOT NULL;

ALTER TABLE public.orders ALTER COLUMN payment_status DROP DEFAULT;
ALTER TABLE public.orders ALTER COLUMN payment_status TYPE TEXT USING payment_status::text;
UPDATE public.orders SET payment_status = 'pending' WHERE payment_status IS NULL;
ALTER TABLE public.orders ALTER COLUMN payment_status SET DEFAULT 'pending';
ALTER TABLE public.orders ALTER COLUMN payment_status SET NOT NULL;

ALTER TABLE public.orders DROP CONSTRAINT IF EXISTS orders_status_check;
ALTER TABLE public.orders ADD CONSTRAINT orders_status_check CHECK (status IN
  ('pending','confirmed','packing','shipped','delivered','cancelled','returned'));
ALTER TABLE public.orders DROP CONSTRAINT IF EXISTS orders_payment_method_check;
ALTER TABLE public.orders ADD CONSTRAINT orders_payment_method_check CHECK (payment_method IN
  ('cod','sslcommerz','bank_transfer'));
ALTER TABLE public.orders DROP CONSTRAINT IF EXISTS orders_payment_status_check;
ALTER TABLE public.orders ADD CONSTRAINT orders_payment_status_check CHECK (payment_status IN
  ('pending','paid','failed','refunded'));

CREATE INDEX IF NOT EXISTS orders_created_at_idx ON public.orders (created_at DESC);
CREATE INDEX IF NOT EXISTS orders_phone_idx      ON public.orders (customer_phone);
CREATE INDEX IF NOT EXISTS orders_status_idx     ON public.orders (status);

-- ---------- 2. B2B QUOTES ----------
CREATE TABLE IF NOT EXISTS public.b2b_quotes (
  token            TEXT PRIMARY KEY,
  company_name     TEXT NOT NULL,
  contact_name     TEXT NOT NULL,
  phone            TEXT NOT NULL,
  email            TEXT,
  product_id       TEXT NOT NULL,
  product_name     TEXT NOT NULL,
  qty              INT  NOT NULL CHECK (qty > 0),
  include_logo     BOOLEAN NOT NULL DEFAULT false,
  logo_url         TEXT,
  deadline         TEXT,
  delivery_address TEXT,
  notes            TEXT,
  unit_price       INT NOT NULL DEFAULT 0,
  setup_fee        INT NOT NULL DEFAULT 0,
  total_price      INT NOT NULL DEFAULT 0,
  deposit_amount   INT NOT NULL DEFAULT 0,
  status           TEXT NOT NULL DEFAULT 'quote_requested' CHECK (status IN
    ('quote_requested','quoted','deposit_paid','in_production','ready',
     'balance_paid','dispatched','completed','cancelled')),
  status_note      TEXT,
  bank_receipt_url TEXT,
  created_at       TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at       TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS b2b_quotes_created_at_idx ON public.b2b_quotes (created_at DESC);

-- ---------- 3. APP SETTINGS (single row, JSON) ----------
CREATE TABLE IF NOT EXISTS public.app_settings (
  id         INT PRIMARY KEY DEFAULT 1 CHECK (id = 1),
  data       JSONB NOT NULL,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ---------- 4. OTP REQUESTS ----------
CREATE TABLE IF NOT EXISTS public.otp_requests (
  phone        TEXT PRIMARY KEY,
  code_hash    TEXT NOT NULL,
  expires_at   TIMESTAMPTZ NOT NULL,
  send_count   INT NOT NULL DEFAULT 0,
  window_start TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  attempts     INT NOT NULL DEFAULT 0,
  locked_until TIMESTAMPTZ
);

-- ---------- 5. updated_at trigger ----------
CREATE OR REPLACE FUNCTION public.set_updated_at() RETURNS trigger
LANGUAGE plpgsql AS $$ BEGIN NEW.updated_at = NOW(); RETURN NEW; END $$;

DROP TRIGGER IF EXISTS orders_updated_at ON public.orders;
CREATE TRIGGER orders_updated_at BEFORE UPDATE ON public.orders
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
DROP TRIGGER IF EXISTS b2b_quotes_updated_at ON public.b2b_quotes;
CREATE TRIGGER b2b_quotes_updated_at BEFORE UPDATE ON public.b2b_quotes
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- ---------- 6. SECURITY (Row Level Security) ----------
ALTER TABLE public.orders       ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.b2b_quotes   ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.app_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.otp_requests ENABLE ROW LEVEL SECURITY;

-- Remove the old "anyone can read/create orders" policies — they exposed
-- every customer's name, phone and address to the public key.
DROP POLICY IF EXISTS "Public can create orders"   ON public.orders;
DROP POLICY IF EXISTS "Public can view own order"  ON public.orders;
DO $$ BEGIN
  IF to_regclass('public.order_items') IS NOT NULL THEN
    EXECUTE 'DROP POLICY IF EXISTS "Public can create order items" ON public.order_items';
    EXECUTE 'DROP POLICY IF EXISTS "Public can view order items" ON public.order_items';
  END IF;
END $$;

-- No anon/authenticated policies on these four tables = public key gets nothing.
-- The website server uses the service_role key, which bypasses RLS.
REVOKE ALL ON public.orders, public.b2b_quotes, public.app_settings, public.otp_requests FROM anon, authenticated;
GRANT ALL ON public.orders, public.b2b_quotes, public.app_settings, public.otp_requests TO service_role;

-- Catalog stays publicly readable (already set up)
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products   ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.variants   ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public can view categories" ON public.categories;
CREATE POLICY "Public can view categories" ON public.categories FOR SELECT USING (true);
DROP POLICY IF EXISTS "Public can view products" ON public.products;
CREATE POLICY "Public can view products" ON public.products FOR SELECT USING (true);
DROP POLICY IF EXISTS "Public can view variants" ON public.variants;
CREATE POLICY "Public can view variants" ON public.variants FOR SELECT USING (true);

NOTIFY pgrst, 'reload schema';
-- Done ✅
