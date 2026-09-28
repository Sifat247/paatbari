# Paatbari (পাটবাড়ি) — API v1 Documentation

**Target Audience:** Web Frontend, Mobile App (Flutter), and Integration Services  
**Base URL (Local):** `http://localhost:3000/api/v1`  
**Base URL (Production):** `https://paatbari.com/api/v1`  
**Content-Type:** `application/json`

---

## Table of Contents
1. [Authentication & OTP](#1-authentication--otp)
2. [B2C Cart & Pricing Engine](#2-b2c-cart--pricing-engine)
3. [Orders & Tracking](#3-orders--tracking)
4. [B2B Corporate Quotes](#4-b2b-corporate-quotes)
5. [Payments (SSLCommerz)](#5-payments-sslcommerz)
6. [User Profile & Right to Erasure](#6-user-profile--right-to-erasure)
7. [Admin & Staff APIs](#7-admin--staff-apis)

---

## 1. Authentication & OTP

### 1.1 Send Phone OTP
- **Endpoint:** `POST /auth/otp/send`
- **Description:** Sends a 6-digit verification code to a Bangladeshi mobile number (max 3 sends per 10 mins).
- **Request Body:**
```json
{
  "phone": "01711223344"
}
```
- **Response (200 OK):**
```json
{
  "success": true,
  "message": "ওটিপি সফলভাবে পাঠানো হয়েছে",
  "expiresIn": 300
}
```

### 1.2 Verify Phone OTP
- **Endpoint:** `POST /auth/otp/verify`
- **Description:** Verifies the 6-digit OTP code. Locked for 15 mins after 5 failed attempts.
- **Request Body:**
```json
{
  "phone": "01711223344",
  "code": "123456"
}
```
- **Response (200 OK):**
```json
{
  "success": true,
  "message": "মোবাইল নম্বর সফলভাবে যাচাই হয়েছে",
  "verified": true,
  "phone": "01711223344"
}
```

---

## 2. B2C Cart & Pricing Engine

### 2.1 Calculate Authoritative Cart Quote
- **Endpoint:** `POST /cart/quote`
- **Description:** Calculates server-side subtotal, bundle discounts, coupon savings, and zone shipping fees.
- **Request Body:**
```json
{
  "lines": [
    { "variantId": "P01-natural", "qty": 2 }
  ],
  "bundles": [],
  "coupon": "JUTE10",
  "zone": "dhaka_city"
}
```
- **Response (200 OK):**
```json
{
  "subtotal": 900,
  "discount": 90,
  "delivery": 70,
  "total": 880,
  "calc": [
    { "variantId": "P01-natural", "unit": 450, "qty": 2, "line": 900 }
  ]
}
```

---

## 3. Orders & Tracking

### 3.1 Place New Order
- **Endpoint:** `POST /orders`
- **Description:** Validates customer address, recalculates authoritative prices, snapshots unit costs, and creates order.
- **Request Body:**
```json
{
  "customerName": "তানভীর আহমেদ",
  "customerPhone": "01711223344",
  "customerEmail": "tanvir@example.com",
  "division": "Dhaka",
  "district": "Dhaka",
  "area": "উত্তরা সেক্টর ৭",
  "addressLine": "বাড়ি ১২, রোড ৪",
  "items": [
    {
      "id": "P01",
      "variantId": "P01-natural",
      "name": "ক্লাসিক পাটের টোট ব্যাগ",
      "variantName": "ন্যাচারাল",
      "unitPrice": 450,
      "qty": 1
    }
  ],
  "paymentMethod": "cod",
  "couponCode": null,
  "notes": "সন্ধ্যার পর ডেলিভারি দিন"
}
```
- **Response (200 OK):**
```json
{
  "success": true,
  "orderNumber": "PB-2609-1004",
  "total": 520,
  "status": "pending",
  "message": "আপনার অর্ডারটি সফলভাবে গ্রহণ করা হয়েছে।"
}
```

### 3.2 Track Order
- **Endpoint:** `POST /track`
- **Description:** Look up live order timeline and courier tracking by order number and phone.
- **Request Body:**
```json
{
  "orderNumber": "PB-2609-1001",
  "phone": "01712345678"
}
```
- **Response (200 OK):**
```json
{
  "success": true,
  "order": {
    "orderNumber": "PB-2609-1001",
    "status": "confirmed",
    "total": 520,
    "paymentMethod": "cod",
    "courierName": "Steadfast",
    "trackingId": "SF-98765432",
    "events": [
      {
        "time": "10:30 AM",
        "title": "অর্ডার গৃহীত হয়েছে",
        "desc": "ক্যাশ অন ডেলিভারি অর্ডার সিস্টেমভুক্ত।"
      },
      {
        "time": "11:15 AM",
        "title": "ফোন কলের মাধ্যমে অর্ডার কনফার্মড",
        "desc": "গ্রাহকের সাথে কথা বলে ঠিকানা যাচাই করা হয়েছে।"
      }
    ]
  }
}
```

---

## 4. B2B Corporate Quotes

### 4.1 Estimate Bulk Pricing
- **Endpoint:** `POST /b2b/estimate`
- **Description:** Calculates volume tier pricing with MOQ 50 enforcement and smart tier nudges.
- **Request Body:**
```json
{
  "qty": 100,
  "logo": true
}
```
- **Response (200 OK):**
```json
{
  "success": true,
  "qty": 100,
  "logo": true,
  "unit": 205,
  "total": 22000,
  "deposit": 11000,
  "nudge": {
    "targetQty": 200,
    "targetUnit": 185,
    "addMore": 100,
    "savingsPerUnit": 20
  }
}
```

### 4.2 Submit Custom Quote Request
- **Endpoint:** `POST /b2b/quote`
- **Description:** Generates unique token `QT-2609-XXXX` for corporate quote review.
- **Request Body:**
```json
{
  "companyName": "ব্র্যাক এন্টারপ্রাইজ",
  "contactName": "তানভীর আহমেদ",
  "phone": "01711223344",
  "email": "tanvir@brac.net",
  "productId": "B01",
  "qty": 300,
  "includeLogo": true,
  "logoUrl": "https://example.com/logo.png",
  "deadline": "2026-10-15",
  "deliveryAddress": "মহাখালী, ঢাকা",
  "notes": "বার্ষিক সাধারণ সভার উপহার"
}
```
- **Response (200 OK):**
```json
{
  "success": true,
  "token": "QT-2609-1001",
  "quoteUrl": "/quote/QT-2609-1001",
  "totalPrice": 57000,
  "depositAmount": 28500
}
```

---

## 5. Payments (SSLCommerz)

### 5.1 Initialize Hosted Payment Session
- **Endpoint:** `POST /payments/sslcommerz/init`
- **Request Body:**
```json
{
  "orderNumber": "PB-2609-1001"
}
```
- **Response (200 OK):**
```json
{
  "success": true,
  "gatewayUrl": "https://sandbox.sslcommerz.com/gwprocess/v4/gw.php?Q=...",
  "tranId": "TR-PB-2609-1001-3902"
}
```

### 5.2 Server-to-Server IPN Webhook
- **Endpoint:** `POST /payments/sslcommerz/ipn`
- **Description:** Validates transaction `val_id` directly against SSLCommerz, upgrades order to `confirmed`, and fires Bangla confirmation SMS.

---

## 6. User Profile & Right to Erasure

### 6.1 Get Profile & History
- **Endpoint:** `GET /me`
- **Response (200 OK):**
```json
{
  "success": true,
  "user": {
    "name": "তানভীর আহমেদ",
    "phone": "01711000000",
    "email": "tanvir.ahmed@example.com"
  },
  "addresses": [...],
  "orders": [...],
  "quotes": [...]
}
```

### 6.2 Permanent Account Deletion
- **Endpoint:** `DELETE /me`
- **Description:** Erases customer profile, cookies, and delivery addresses from database.
- **Response (200 OK):**
```json
{
  "success": true,
  "message": "আপনার অ্যাকাউন্ট এবং সংরক্ষিত সকল ব্যক্তিগত তথ্য স্থায়ীভাবে মুছে ফেলা হয়েছে।"
}
```

---

## 7. Admin & Staff APIs

| Endpoint | Method | Role | Description |
|---|:---:|:---:|---|
| `/admin/orders` | `GET` | All staff | Retrieve list of orders |
| `/admin/orders` | `PATCH` | Order Manager / Packer | Advance status (`confirmed`, `packed`, etc.) |
| `/admin/products` | `GET` | Owner / Manager | Retrieve catalog prices and stock |
| `/admin/products` | `PATCH` | Owner | Update variant price or toggle in-stock |
| `/admin/settings` | `GET` | Owner | Retrieve delivery fees and free threshold |
| `/admin/settings` | `PATCH` | Owner | Update free threshold (৳2,500) and zone fees |
