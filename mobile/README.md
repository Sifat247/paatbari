# পাটবাড়ি (Paatbari) · React Native (Expo) Mobile App

The official Android and iOS mobile application for **পাটবাড়ি (Paatbari)** — Bangladesh's premier direct-from-artisan golden jute lifestyle and eco-goods platform.

---

## 📱 Features

- **Bilingual Interface**: Seamless 1-tap toggle between **বাংলা (Bangla)** and **English** across all screens and notifications.
- **Offline-First & Live Sync**: Bundled catalog with instantaneous offline loading; automatically syncs with the live production backend at `https://paatbari.vercel.app/api/v1`.
- **Zero-Crop Product Imagery**: Responsive image container frames (`resizeMode="contain"`) displaying photoshoot products without edge clipping.
- **Image Lightbox & Zoom**: High-definition tap-to-zoom preview modal for detailed weave and stitching inspection.
- **Artisan Transparent Costing (ELI5)**: Direct pricing breakdown highlighting fair wages paid to rural women artisans in Manikganj.
- **Persistent Cart**: Powered by `@react-native-async-storage/async-storage` — saved across app relaunches.
- **Nationwide 64-District Checkout**: Complete Bangladesh district selector with intelligent delivery fee computation (Dhaka ৳70 vs Nationwide ৳130; Free Delivery above ৳2500).
- **Flexible Payment**:
  - Cash on Delivery (COD)
  - bKash / Nagad mobile financial services
- **1-Tap WhatsApp Direct Ordering**: Direct integration (`Linking.openURL`) prefilling product name, variant, and quantity into WhatsApp.
- **Order Tracking**: Visual status timeline tracking orders from Manikganj artisan hub to courier handover and door delivery.
- **Artisan Heritage Stories**: Highlighting the women weavers, sustainable jute cultivation, and environmental impact.

---

## 🛠️ Architecture & Folder Structure

```
mobile/
├── App.tsx                     # App entry point with safe-area, theme & context providers
├── app.json                    # Expo config (package: com.paatbari.app, branding)
├── src/
│   ├── components/
│   │   ├── Badge.tsx           # Themed badge (eco, handmade, sale)
│   │   ├── Header.tsx          # Top branding bar with lang switcher & cart counter
│   │   └── ProductCard.tsx     # 2-column product card with quick-add
│   ├── constants/
│   │   └── theme.ts            # Brand colors (#143528 forest, #C8A165 jute, #FAF6EF cream)
│   ├── context/
│   │   ├── CartContext.tsx     # Persistent cart state & price calculator
│   │   └── LanguageContext.tsx # Bangla / English localization provider
│   ├── data/
│   │   ├── catalog.ts          # Bundled rich product catalog with live CDN asset URLs
│   │   └── districts.ts        # All 64 districts of Bangladesh (Bangla + English)
│   ├── navigation/
│   │   ├── RootNavigator.tsx   # Native stack navigator (PDP, Checkout, Stories)
│   │   └── TabNavigator.tsx    # Bottom tab bar (Home, Shop, Cart, Track, Artisans)
│   ├── screens/
│   │   ├── HomeScreen.tsx      # Hero banner, category pills, bestsellers, trust badges
│   │   ├── ShopScreen.tsx      # Search, filter tabs, sort, 2-column catalog grid
│   │   ├── ProductDetailScreen.tsx # Image carousel, zoom modal, variants, WhatsApp CTA
│   │   ├── CartScreen.tsx      # Item list, delivery zone picker, free-delivery meter
│   │   ├── CheckoutScreen.tsx  # Customer details, district picker, COD/bKash, confirmation
│   │   ├── TrackScreen.tsx     # Visual order timeline & support hotlines
│   │   └── ArtisanStoryScreen.tsx # Manikganj women artisans spotlight
│   ├── services/
│   │   └── api.ts              # REST client with backend fallback handling
│   └── types/
│       └── index.ts            # Shared TypeScript data models
```

---

## 🚀 Running the App Locally

### 1. Requirements
- Node.js (v18 or v20+)
- **Expo Go** app installed on your Android smartphone (download from Google Play Store).

### 2. Start Development Server
```bash
cd mobile
npm start
```

### 3. Run on Android Device
- Open **Expo Go** on your Android phone.
- Scan the QR code displayed in your terminal or browser window.
- The app will bundle and load immediately with hot-reloading enabled.

---

## 📦 Building Standalone Android APK (.apk / .aab)

To generate a standalone APK that can be installed on any Android device without Expo Go or published to Google Play:

1. **Install EAS CLI** (if not already installed):
   ```bash
   npm install -g eas-cli
   ```

2. **Login to Expo**:
   ```bash
   eas login
   ```

3. **Configure & Build Android APK**:
   ```bash
   eas build -p android --profile preview
   ```
   *This builds an installable `.apk` file hosted in the cloud.*

4. **Production Google Play Store Bundle (`.aab`)**:
   ```bash
   eas build -p android --profile production
   ```
