-- PaatBari (পাটবাড়ি) Idempotent Seed Data
-- Categories
INSERT INTO categories (id, en, bn, sort_order) VALUES
  ('bags', 'Bags', 'ব্যাগ', 1),
  ('home', 'Home Décor', 'হোম ডেকোর', 2),
  ('table', 'Kitchen & Table', 'কিচেন ও টেবিল', 3),
  ('office', 'Office & Stationery', 'অফিস ও স্টেশনারি', 4),
  ('gifts', 'Gifts', 'গিফট', 5),
  ('corporate', 'Corporate & Bulk (B2B)', 'কর্পোরেট ও পাইকারি', 6)
ON CONFLICT (id) DO UPDATE SET en = EXCLUDED.en, bn = EXCLUDED.bn;

-- Products
INSERT INTO products (id, category_id, slug, en, bn, is_bestseller) VALUES
  ('P01', 'bags', 'classic-jute-tote-bag', 'Classic Jute Tote Bag', 'ক্লাসিক পাটের টোট ব্যাগ', true),
  ('P02', 'bags', 'jute-laptop-bag', 'Jute Laptop Bag 15.6"', 'পাটের ল্যাপটপ ব্যাগ ১৫.৬"', false),
  ('P03', 'bags', 'ladies-jute-handbag', 'Ladies Jute Handbag', 'লেডিস পাটের হ্যান্ডব্যাগ', true),
  ('P04', 'bags', 'large-jute-shopping-bag', 'Large Jute Shopping Bag', 'বড় পাটের বাজারের ব্যাগ', false),
  ('P05', 'home', 'jute-storage-basket', 'Jute Storage Basket', 'পাটের স্টোরেজ ঝুড়ি', true),
  ('P06', 'home', 'jute-floor-rug', 'Jute Floor Rug', 'পাটের ফ্লোর ম্যাট/রাগ', true),
  ('P07', 'home', 'jute-cushion-cover', 'Jute Cushion Cover 16×16', 'পাটের কুশন কভার ১৬×১৬', false),
  ('P08', 'table', 'jute-table-runner', 'Jute Table Runner', 'পাটের টেবিল রানার', false),
  ('P09', 'table', 'jute-placemat-set', 'Jute Placemat (set of 6)', 'পাটের প্লেসম্যাট (৬টি)', false),
  ('P10', 'table', 'jute-coaster-set', 'Jute Coaster (set of 6)', 'পাটের কোস্টার (৬টি)', false),
  ('P11', 'home', 'jute-wall-hanging', 'Jute Wall Hanging', 'পাটের ওয়াল হ্যাঙ্গিং', false),
  ('P12', 'home', 'jute-plant-hanger', 'Jute Plant Hanger', 'পাটের শিকা (প্ল্যান্ট হ্যাঙ্গার)', false),
  ('P13', 'office', 'jute-file-folder', 'Jute File Folder', 'পাটের ফাইল ফোল্ডার', false),
  ('P14', 'gifts', 'jute-gift-hamper-box', 'Jute Gift Hamper Box', 'পাটের গিফট হ্যাম্পার বক্স', false)
ON CONFLICT (id) DO UPDATE SET en = EXCLUDED.en, bn = EXCLUDED.bn, is_bestseller = EXCLUDED.is_bestseller;

-- Variants
INSERT INTO variants (id, product_id, sku, k, en, bn, price, stock) VALUES
  ('P01-natural', 'P01', 'PB-BAG-01-NAT', 'natural', 'Natural', 'ন্যাচারাল', 450, 150),
  ('P01-dyed', 'P01', 'PB-BAG-01-DYE', 'dyed', 'Dyed (Green/Maroon)', 'রঙিন', 450, 100),
  ('P02-std', 'P02', 'PB-BAG-02-STD', 'std', 'Standard', 'স্ট্যান্ডার্ড', 1450, 50),
  ('P03-std', 'P03', 'PB-BAG-03-STD', 'std', 'Standard', 'স্ট্যান্ডার্ড', 950, 80),
  ('P04-std', 'P04', 'PB-BAG-04-STD', 'std', 'Standard', 'স্ট্যান্ডার্ড', 380, 200),
  ('P05-S', 'P05', 'PB-BSK-05-S', 'S', 'Small', 'ছোট', 450, 100),
  ('P05-M', 'P05', 'PB-BSK-05-M', 'M', 'Medium', 'মাঝারি', 650, 100),
  ('P05-L', 'P05', 'PB-BSK-05-L', 'L', 'Large', 'বড়', 850, 75),
  ('P06-2x3', 'P06', 'PB-RUG-06-2X3', '2x3', '2×3 ft', '২×৩ ফুট', 1200, 60),
  ('P06-3x5', 'P06', 'PB-RUG-06-3X5', '3x5', '3×5 ft', '৩×৫ ফুট', 2400, 40),
  ('P07-std', 'P07', 'PB-CSH-07-STD', 'std', 'Standard', 'স্ট্যান্ডার্ড', 350, 150),
  ('P08-std', 'P08', 'PB-RUN-08-STD', 'std', 'Standard', 'স্ট্যান্ডার্ড', 550, 90),
  ('P09-std', 'P09', 'PB-MAT-09-STD', 'std', 'Set of 6', '৬টির সেট', 900, 70),
  ('P10-std', 'P10', 'PB-CST-10-STD', 'std', 'Set of 6', '৬টির সেট', 250, 120),
  ('P11-std', 'P11', 'PB-WAL-11-STD', 'std', 'Standard', 'স্ট্যান্ডার্ড', 750, 40),
  ('P12-std', 'P12', 'PB-PLT-12-STD', 'std', 'Standard', 'স্ট্যান্ডার্ড', 400, 60),
  ('P13-std', 'P13', 'PB-OFF-13-STD', 'std', 'Standard', 'স্ট্যান্ডার্ড', 300, 100),
  ('P14-std', 'P14', 'PB-GFT-14-STD', 'std', 'Standard', 'স্ট্যান্ডার্ড', 1500, 30)
ON CONFLICT (id) DO UPDATE SET price = EXCLUDED.price, stock = EXCLUDED.stock;

-- Bundle BN1
INSERT INTO bundles (id, en, bn, discount_pct) VALUES
  ('BN1', 'Eco Home Starter', 'ইকো হোম স্টার্টার', 10)
ON CONFLICT (id) DO UPDATE SET discount_pct = EXCLUDED.discount_pct;

DELETE FROM bundle_items WHERE bundle_id = 'BN1';
INSERT INTO bundle_items (bundle_id, variant_id, qty) VALUES
  ('BN1', 'P07-std', 2),
  ('BN1', 'P08-std', 1),
  ('BN1', 'P10-std', 1);

-- Coupon JUTE10
INSERT INTO coupons (code, type, value, active, min_order) VALUES
  ('JUTE10', 'percent', 10, true, 0)
ON CONFLICT (code) DO UPDATE SET value = EXCLUDED.value, active = EXCLUDED.active;

-- Store Settings
INSERT INTO settings (key, value) VALUES
  ('delivery_zones', '[{"key": "dhaka_city", "fee": 70}, {"key": "dhaka_sub", "fee": 100}, {"key": "outside", "fee": 130}]'::jsonb),
  ('free_threshold', '2500'::jsonb),
  ('cod_limit', '10000'::jsonb),
  ('b2b_config', '{"moq": 50, "tiers": [{"min": 50, "max": 199, "unit": 180}, {"min": 200, "max": 499, "unit": 160}, {"min": 500, "max": null, "unit": 140}], "logoFee": 25, "setupFee": 1500, "depositPct": 50}'::jsonb),
  ('announcement', '{"bn": "🌿 ৳২,৫০০+ অর্ডারে সারা দেশে ফ্রি ডেলিভারি!", "en": "🌿 Free Delivery Nationwide on orders ৳2,500+!"}'::jsonb)
ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value;
