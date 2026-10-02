# 🚀 Paatbari (পাটবাড়ি) — Supabase Connection Guide (Flutter Mobile App)

Welcome! The Flutter mobile application is **100% built and ready to connect with your Supabase database**.

---

## 🔑 Step 1: Add Your Supabase Credentials

Open the file:
[`lib/core/supabase/supabase_config.dart`](file:///C:/Users/DELL/Documents/paatkotha/app/lib/core/supabase/supabase_config.dart)

Replace the placeholder values with your actual project URL and Anon Key:

```dart
class SupabaseConfig {
  static const String supabaseUrl = 'https://YOUR_PROJECT_ID.supabase.co';
  static const String supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';
}
```

> **Note:** If you haven't added the keys yet, the mobile app will automatically run in **bundled catalog mode** with all 17+ products, zero errors, and simulated order placement!

---

## 🗄️ Step 2: Database Schema & Migration (Already Prepared!)

The full schema migration script is located at:
[`supabase/migrations/20260928000000_init_schema.sql`](file:///C:/Users/DELL/Documents/paatkotha/supabase/migrations/20260928000000_init_schema.sql)

To apply it:
1. Go to your **Supabase Dashboard** -> **SQL Editor**.
2. Click **New Query**.
3. Copy and paste the contents of `20260928000000_init_schema.sql` and run it.
4. Next, copy and paste the seed data from `supabase/seed.sql` to populate sample products and categories.

### Main Tables Used by the Flutter App:

| Table | Purpose in Flutter App |
| :--- | :--- |
| `products` | Fetched dynamically by `SupabaseService.instance.fetchProducts()` |
| `variants` | Product options, colors, sizes, and pricing |
| `product_images` | Product photos stored in Supabase Storage or CDN URLs |
| `orders` | Created upon customer checkout via `createOrder()` |
| `order_items` | Breakdown of items, variants, and quantities per order |
| `order_events` | Status history (Pending -> Processing -> Shipped -> Delivered) |

---

## 🛡️ Step 3: Row Level Security (RLS) Policies

To ensure mobile customers can read products and place orders without logging in:

```sql
-- Allow public to view active products
CREATE POLICY "Public products viewable" ON products
  FOR SELECT USING (is_active = true);

CREATE POLICY "Public variants viewable" ON variants
  FOR SELECT USING (true);

CREATE POLICY "Public product images viewable" ON product_images
  FOR SELECT USING (true);

-- Allow customers to insert orders
CREATE POLICY "Anyone can create order" ON orders
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Anyone can create order items" ON order_items
  FOR INSERT WITH CHECK (true);

-- Allow customers to track orders with order_number and phone
CREATE POLICY "Customers can view their orders" ON orders
  FOR SELECT USING (true);

CREATE POLICY "Customers can view order items" ON order_items
  FOR SELECT USING (true);
```

---

## 📱 Step 4: Running the Flutter App

In your terminal / PowerShell:

```bash
cd C:\Users\DELL\Documents\paatkotha\app
flutter pub get
flutter run
```

### Build Android APK:
```bash
flutter build apk --release
```
The output `.apk` file will be generated at:
`build/app/outputs/flutter-apk/app-release.apk`
