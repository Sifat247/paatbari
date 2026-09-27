-- PaatBari (পাটবাড়ি) Database Schema Migration
-- Matches PRD §12 and SPEC.json

-- 1. Custom Types
CREATE TYPE user_role AS ENUM ('owner', 'manager', 'packer', 'customer');
CREATE TYPE order_status AS ENUM ('pending', 'confirmed', 'packed', 'shipped', 'delivered', 'cancelled');
CREATE TYPE payment_status AS ENUM ('pending', 'paid', 'failed', 'refunded');
CREATE TYPE payment_method AS ENUM ('cod', 'sslcommerz', 'bank_transfer');

-- 2. Profiles
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  role user_role NOT NULL DEFAULT 'customer',
  full_name TEXT NOT NULL,
  phone TEXT UNIQUE,
  email TEXT UNIQUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- has_role helper function for RLS
CREATE OR REPLACE FUNCTION has_role(required_role user_role)
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM profiles
    WHERE id = auth.uid() AND role = required_role
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 3. Addresses
CREATE TABLE IF NOT EXISTS addresses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  division TEXT NOT NULL,
  district TEXT NOT NULL,
  area TEXT NOT NULL,
  address_line TEXT NOT NULL,
  note TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 4. Categories
CREATE TABLE IF NOT EXISTS categories (
  id TEXT PRIMARY KEY,
  en TEXT NOT NULL,
  bn TEXT NOT NULL,
  sort_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 5. Products
CREATE TABLE IF NOT EXISTS products (
  id TEXT PRIMARY KEY,
  category_id TEXT NOT NULL REFERENCES categories(id) ON DELETE RESTRICT,
  slug TEXT UNIQUE NOT NULL,
  en TEXT NOT NULL,
  bn TEXT NOT NULL,
  description_bn TEXT,
  description_en TEXT,
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  is_bestseller BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 6. Variants
CREATE TABLE IF NOT EXISTS variants (
  id TEXT PRIMARY KEY,
  product_id TEXT NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  sku TEXT UNIQUE NOT NULL,
  k TEXT NOT NULL,
  en TEXT NOT NULL,
  bn TEXT NOT NULL,
  price INT NOT NULL CHECK (price >= 0),
  stock INT NOT NULL DEFAULT 100 CHECK (stock >= 0),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 7. Product Images
CREATE TABLE IF NOT EXISTS product_images (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id TEXT NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  url TEXT NOT NULL,
  alt TEXT,
  sort_order INT NOT NULL DEFAULT 0
);

-- 8. Bundles & Bundle Items
CREATE TABLE IF NOT EXISTS bundles (
  id TEXT PRIMARY KEY,
  en TEXT NOT NULL,
  bn TEXT NOT NULL,
  discount_pct INT NOT NULL CHECK (discount_pct >= 0 AND discount_pct <= 100),
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS bundle_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  bundle_id TEXT NOT NULL REFERENCES bundles(id) ON DELETE CASCADE,
  variant_id TEXT NOT NULL REFERENCES variants(id) ON DELETE RESTRICT,
  qty INT NOT NULL DEFAULT 1 CHECK (qty >= 1)
);

-- 9. Coupons
CREATE TABLE IF NOT EXISTS coupons (
  code TEXT PRIMARY KEY,
  type TEXT NOT NULL DEFAULT 'percent',
  value INT NOT NULL CHECK (value > 0 AND value <= 100),
  active BOOLEAN NOT NULL DEFAULT TRUE,
  min_order INT DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 10. Settings
CREATE TABLE IF NOT EXISTS settings (
  key TEXT PRIMARY KEY,
  value JSONB NOT NULL,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 11. Orders
CREATE TABLE IF NOT EXISTS orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_number TEXT UNIQUE NOT NULL,
  customer_name TEXT NOT NULL,
  customer_phone TEXT NOT NULL,
  customer_email TEXT,
  division TEXT NOT NULL,
  district TEXT NOT NULL,
  area TEXT NOT NULL,
  address_line TEXT NOT NULL,
  zone TEXT NOT NULL,
  subtotal INT NOT NULL CHECK (subtotal >= 0),
  discount INT NOT NULL DEFAULT 0 CHECK (discount >= 0),
  coupon_code TEXT,
  delivery_fee INT NOT NULL CHECK (delivery_fee >= 0),
  total INT NOT NULL CHECK (total >= 0),
  status order_status NOT NULL DEFAULT 'pending',
  payment_method payment_method NOT NULL DEFAULT 'cod',
  payment_status payment_status NOT NULL DEFAULT 'pending',
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 12. Order Items
CREATE TABLE IF NOT EXISTS order_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  variant_id TEXT NOT NULL REFERENCES variants(id),
  product_name TEXT NOT NULL,
  variant_name TEXT NOT NULL,
  unit_price INT NOT NULL CHECK (unit_price >= 0),
  qty INT NOT NULL CHECK (qty >= 1 AND qty <= 20),
  total_price INT NOT NULL CHECK (total_price >= 0)
);

-- 13. Order Events (Audit Log)
CREATE TABLE IF NOT EXISTS order_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  event_type TEXT NOT NULL,
  details JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 14. Payments
CREATE TABLE IF NOT EXISTS payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  amount INT NOT NULL,
  method payment_method NOT NULL,
  status payment_status NOT NULL DEFAULT 'pending',
  gateway_ref TEXT,
  raw_response JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 15. B2B Quotes
CREATE TABLE IF NOT EXISTS quotes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  token TEXT UNIQUE NOT NULL,
  company_name TEXT NOT NULL,
  contact_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT NOT NULL,
  qty INT NOT NULL CHECK (qty >= 50),
  include_logo BOOLEAN NOT NULL DEFAULT FALSE,
  unit_price INT NOT NULL,
  setup_fee INT NOT NULL DEFAULT 0,
  total_price INT NOT NULL,
  deposit_amount INT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 16. Reviews
CREATE TABLE IF NOT EXISTS reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id TEXT NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  customer_name TEXT NOT NULL,
  rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment TEXT NOT NULL,
  is_verified_purchase BOOLEAN NOT NULL DEFAULT FALSE,
  is_approved BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 17. OTP Requests
CREATE TABLE IF NOT EXISTS otp_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  phone TEXT NOT NULL,
  code TEXT NOT NULL,
  expires_at TIMESTAMPTZ NOT NULL,
  is_used BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Enable RLS on all tables
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE addresses ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE variants ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE bundles ENABLE ROW LEVEL SECURITY;
ALTER TABLE bundle_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE coupons ENABLE ROW LEVEL SECURITY;
ALTER TABLE settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE quotes ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE otp_requests ENABLE ROW LEVEL SECURITY;

-- Public Read Policies
CREATE POLICY "Public read categories" ON categories FOR SELECT USING (true);
CREATE POLICY "Public read active products" ON products FOR SELECT USING (is_active = true);
CREATE POLICY "Public read variants" ON variants FOR SELECT USING (true);
CREATE POLICY "Public read product_images" ON product_images FOR SELECT USING (true);
CREATE POLICY "Public read active bundles" ON bundles FOR SELECT USING (is_active = true);
CREATE POLICY "Public read bundle_items" ON bundle_items FOR SELECT USING (true);
CREATE POLICY "Public read settings" ON settings FOR SELECT USING (true);
CREATE POLICY "Public read approved reviews" ON reviews FOR SELECT USING (is_approved = true);

-- Staff Access Policies (Owner / Manager / Packer)
CREATE POLICY "Staff full access orders" ON orders FOR ALL USING (
  has_role('owner') OR has_role('manager') OR has_role('packer')
);
CREATE POLICY "Staff full access products" ON products FOR ALL USING (
  has_role('owner') OR has_role('manager')
);
CREATE POLICY "Staff full access settings" ON settings FOR ALL USING (
  has_role('owner')
);
