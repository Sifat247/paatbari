# Paatbari (পাটবাড়ি) — Official Mobile App (Flutter)

> **"সোনালি আঁশের বাড়ি — Home of the golden fibre"**  
> Flutter cross-platform mobile application for Android & iOS.

---

## 1. Architecture Highlights

1. **Server-Authoritative Pricing Guarantee**:
   - The mobile application **never calculates checkout or cart prices locally**.
   - Every cart modification triggers `POST /api/v1/cart/quote` through Riverpod (`CartNotifier`), ensuring 100% parity with web pricing, coupons, and 64-district delivery tiers.

2. **State Management & Navigation**:
   - **Flutter Riverpod** for state management (`CartNotifier`, `AuthNotifier`).
   - **GoRouter** for declarative navigation, tab bars, and deep linking (`/p/:slug`, `/order/:number`, `/quote/:token`).

3. **Brand Styling & Typography**:
   - Leaf Green (`#1F4D3A`), Jute Gold (`#C8A165`), Cream (`#FAF6EE`), Clay (`#B5543C`).
   - Bengali Typography: **Hind Siliguri** (body) and **Noto Serif Bengali** (headings).
   - Dynamic Bengali numeral formatting (`PriceTag.toBanglaDigits`).

4. **Flavors**:
   - **Dev Flavor** (`lib/main_dev.dart`): Targets local Next.js dev server at `http://10.0.2.2:3000/api/v1` (Android Emulator loopback) or local IP.
   - **Prod Flavor** (`lib/main_prod.dart`): Targets production API at `https://paatbari.com/api/v1`.

---

## 2. Directory Structure

```
app/
├── lib/
│   ├── core/
│   │   ├── constants/api_endpoints.dart  # Flavor base URLs & endpoints
│   │   ├── network/api_client.dart       # Dio HTTP client + Auth Interceptor
│   │   └── theme/
│   │       ├── colors.dart               # Brand palette (Leaf, Jute, Cream)
│   │       └── app_theme.dart            # Material3 theme + GoogleFonts
│   ├── features/
│   │   ├── auth/providers/               # Phone OTP auth provider
│   │   ├── cart/                         # CartNotifier + POST /cart/quote
│   │   └── catalog/models/               # ProductModel & VariantModel
│   ├── l10n/                             # Bengali (bn default) & English (en)
│   ├── routes/app_router.dart            # GoRouter + Screens
│   ├── shared/widgets/                   # AppBar, BottomNav, PriceTag, Card
│   ├── main.dart                         # Default entry
│   ├── main_dev.dart                     # Development flavor
│   └── main_prod.dart                    # Production flavor
├── pubspec.yaml                          # Riverpod, GoRouter, Dio, Intl
└── analysis_options.yaml
```

---

## 3. How to Run

### Install Dependencies
```bash
flutter pub get
```

### Run in Development (pointing to local dev server)
```bash
flutter run -t lib/main_dev.dart
```

### Run in Production
```bash
flutter run -t lib/main_prod.dart --release
```
