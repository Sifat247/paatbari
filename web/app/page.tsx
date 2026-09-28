"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { ProductCard } from "@/components/ui/ProductCard";
import { Badge } from "@/components/ui/Badge";
import { PriceTag } from "@/components/ui/PriceTag";
import { CATEGORIES, PRODUCTS, BUNDLE_PROMO } from "@/lib/catalog";
import { useCart } from "@/lib/cart-context";
import { useLanguage } from "@/lib/i18n-context";
import { ProductArt } from "@/components/ui/ProductArt";
import {
  ArrowRight,
  Leaf,
  Sparkles,
  ShoppingBag,
  Briefcase,
  Heart,
  Star,
  CheckCircle2,
  Package,
  MessageCircle,
  HelpCircle,
  Info,
  Truck,
  ShieldCheck,
  Award,
  RefreshCw,
} from "lucide-react";

const CATEGORY_ART_MAP: Record<string, string> = {
  bags: "classic-jute-tote-bag",
  home: "jute-plant-hanger-shika",
  table: "jute-table-runner-woven",
  office: "jute-conference-folder-file",
  gifts: "jute-gift-box-hamper",
  corporate: "classic-jute-tote-bag",
};

export default function HomePage() {
  const { addToCart, setIsMiniCartOpen } = useCart();
  const { locale, formatPrice, toLocaleDigits } = useLanguage();
  const [b2bQty, setB2bQty] = useState(100);
  const [showReviewNotice, setShowReviewNotice] = useState(false);
  const bestsellers = PRODUCTS.filter((p) => p.isBestseller);

  const handleQuickAdd = (productId: string) => {
    const product = PRODUCTS.find((p) => p.id === productId);
    if (product) {
      addToCart(product, product.variants[0], 1);
    }
  };

  const handleBundleAdd = () => {
    const prod = PRODUCTS.find((p) => p.slug.includes("cushion")) || PRODUCTS[0];
    addToCart(
      prod,
      {
        k: "bundle-bn1",
        bn: BUNDLE_PROMO.bn,
        en: BUNDLE_PROMO.en,
        price: 1350,
      },
      1
    );
    setIsMiniCartOpen(true);
  };

  // Quick B2B calculator teaser (100 bags = 180 BDT/unit, 200 = 160 BDT/unit, 500 = 140 BDT/unit)
  const getB2bUnitPrice = (qty: number) => {
    if (qty >= 500) return 140;
    if (qty >= 200) return 160;
    return 180;
  };
  const b2bUnit = getB2bUnitPrice(b2bQty);
  const b2bTotal = b2bUnit * b2bQty;
  const b2bDeposit = Math.round(b2bTotal * 0.5);

  return (
    <div className="space-y-16 sm:space-y-24 pb-20">
      {/* 1. Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-cream via-sand/20 to-cream border-b border-sand/60 py-16 sm:py-24">
        {/* Ambient Warm Golden & Emerald Glows */}
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-jute/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 -right-32 w-96 h-96 bg-leaf/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-32 left-1/3 w-80 h-80 bg-clay/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-leaf/10 text-leaf text-xs sm:text-sm font-semibold border border-leaf/20 shadow-xs">
                <Sparkles className="w-4 h-4 text-jute animate-pulse" />
                <span>
                  {locale === "bn"
                    ? "প্রকৃতি ও ঐতিহ্যের মেলবন্ধন · ১০০% দেশীয় পাট"
                    : "Heritage Meets Nature · 100% Eco Jute"}
                </span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-bn-display text-forest tracking-tight leading-[1.25]">
                {locale === "bn" ? (
                  <>
                    সোনালি আঁশের বাড়ি —{" "}
                    <span className="text-leaf">পাটবাড়ি</span>
                  </>
                ) : (
                  <>
                    Home of the Golden Fibre —{" "}
                    <span className="text-leaf">Paatbari</span>
                  </>
                )}
              </h1>

              <p className="text-base sm:text-lg text-ink/80 max-w-xl mx-auto lg:mx-0 leading-relaxed font-bn">
                {locale === "bn"
                  ? "বাংলার ঐতিহ্যবাহী হাতে বোনা পাটের ব্যাগ, হোম ডেকোর ও নান্দনিক গিফট কালেকশন। প্রতিটি পণ্য পরিবেশবান্ধব, টেকসই এবং দক্ষ কারিগরদের ভালোবাসায় তৈরি।"
                  : "Handcrafted natural jute bags, home living decor, and exclusive gifting sets. 100% sustainable, durable, and empowered by local artisans."}
              </p>

              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
                <Link href="/shop">
                  <Button variant="primary" size="lg" className="flex items-center gap-2 shadow-pop hover:shadow-glow transition-all">
                    <ShoppingBag className="w-5 h-5" />
                    <span>{locale === "bn" ? "কালেকশন দেখুন" : "Explore Shop"}</span>
                  </Button>
                </Link>

                <Link href="/b2b">
                  <Button variant="quote" size="lg" className="flex items-center gap-2 shadow-md hover:border-clay/60 transition-all">
                    <Briefcase className="w-5 h-5 text-clay" />
                    <span>{locale === "bn" ? "কর্পোরেট বাল্ক অর্ডার" : "Corporate Orders"}</span>
                  </Button>
                </Link>
              </div>

              {/* Highlights */}
              <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-ink/75 font-medium">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-leaf" />
                  <span>{locale === "bn" ? "৬৪ জেলায় ক্যাশ অন ডেলিভারি" : "Cash on Delivery in 64 Districts"}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-leaf" />
                  <span>{locale === "bn" ? "৳২,৫০০+ অর্ডারে ফ্রি ডেলিভারি" : "Free Shipping ৳2,500+"}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-leaf" />
                  <span>{locale === "bn" ? "১০০% বায়োডিগ্রেডেবল" : "100% Biodegradable"}</span>
                </div>
              </div>
            </div>

            {/* Right Lifestyle Showcase Frame */}
            <div className="lg:col-span-5 flex justify-center relative">
              {/* Floating Verified Artisan Badge (Desktop only) */}
              <div className="hidden sm:flex absolute -top-3 left-2 z-20 bg-white/95 backdrop-blur-md border border-sand px-3 py-1.5 rounded-full shadow-card items-center gap-2 animate-float">
                <span className="w-2 h-2 rounded-full bg-leaf animate-pulse" />
                <span className="text-[11px] font-bold text-forest">
                  {locale === "bn" ? "হাতে তৈরি ১০০% খাঁটি পাট" : "100% Handcrafted Jute"}
                </span>
              </div>

              {/* Floating Delivery Badge (Desktop only) */}
              <div className="hidden sm:flex absolute -bottom-3 right-2 z-20 bg-white/95 backdrop-blur-md border border-sand px-3 py-1.5 rounded-full shadow-card items-center gap-2">
                <Truck className="w-3.5 h-3.5 text-clay" />
                <span className="text-[11px] font-bold text-forest">
                  {locale === "bn" ? "সারা দেশে হোম ডেলিভারি" : "Nationwide Delivery"}
                </span>
              </div>

              <div className="relative w-full max-w-md aspect-[4/5] rounded-3xl bg-white border-2 border-sand overflow-hidden shadow-pop flex flex-col justify-between group">
                <div className="relative w-full h-[62%] overflow-hidden bg-sand/10">
                  <img
                    src="/images/products/classic-tote.jpg"
                    alt="পাটবাড়ি ক্লাসিক টোট ব্যাগ"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute top-4 right-4 z-10 drop-shadow-md">
                    <Badge variant="handmade">
                      {locale === "bn" ? "১০০% প্রাকৃতিক পাট" : "100% Eco Jute"}
                    </Badge>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-forest/60 via-transparent to-transparent opacity-60" />
                  <div className="absolute bottom-3 left-4 text-white text-xs drop-shadow-md">
                    <span className="font-bold block text-sm">হাতে বোনা প্রিমিয়াম ফিনিশিং</span>
                    <span className="text-white/80 text-[11px]">মানিকগঞ্জ সদর, মানিকগঞ্জ ১৮০০</span>
                  </div>
                </div>

                <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between bg-white">
                  <div>
                    <div className="flex items-center gap-1.5 text-xs text-jute-deep font-semibold">
                      <span className="text-jute text-xs tracking-tighter">★★★★★</span>
                      <span className="text-ink/60 text-[11px]">১০০% পরিবেশবান্ধব তন্তু</span>
                    </div>
                    <h3 className="font-bn-display text-lg sm:text-xl font-bold text-forest mt-0.5">
                      {locale === "bn" ? "ক্লাসিক পাটের টোট ব্যাগ" : "Classic Jute Tote Bag"}
                    </h3>
                    <p className="text-xs text-ink/70 mt-1 line-clamp-1 leading-relaxed font-bn">
                      {locale === "bn"
                        ? "টেকসই কটন রোপ হ্যান্ডেল ও নিখুঁত সেলাই। প্রাত্যহিক ব্যবহার ও নান্দনিক উপহারের শ্রেষ্ঠ পছন্দ।"
                        : "Durable cotton rope handles and fine stitching. Ideal for everyday elegance."}
                    </p>
                  </div>

                  <div className="bg-cream/95 backdrop-blur-xs rounded-xl p-3 border border-sand/80 flex items-center justify-between text-xs mt-2 shadow-xs">
                    <div>
                      <span className="font-bold text-leaf text-base block font-bn-display">৳৪৫০</span>
                      <p className="text-ink/50 text-[10px]">সারা দেশে ক্যাশ অন ডেলিভারি</p>
                    </div>
                    <Link href="/p/classic-jute-tote-bag" className="bg-leaf text-white px-4 py-2 rounded-lg font-bold hover:bg-forest transition-colors flex items-center gap-1.5 shadow-xs hover:shadow-md">
                      <span>{locale === "bn" ? "অর্ডার করুন" : "Order Now"}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust & Guarantee Banner */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          <div className="bg-white border border-sand/80 rounded-2xl p-4 shadow-card flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-leaf/10 flex items-center justify-center text-leaf flex-shrink-0">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-forest">
                {locale === "bn" ? "ক্যাশ অন ডেলিভারি" : "Cash on Delivery"}
              </h4>
              <p className="text-[11px] text-ink/60">
                {locale === "bn" ? "পণ্য দেখে মূল্য পরিশোধ" : "Inspect before paying"}
              </p>
            </div>
          </div>

          <div className="bg-white border border-sand/80 rounded-2xl p-4 shadow-card flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-jute/20 flex items-center justify-center text-jute-deep flex-shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-forest">
                {locale === "bn" ? "ফ্রি ডেলিভারি" : "Free Delivery"}
              </h4>
              <p className="text-[11px] text-ink/60">
                {locale === "bn" ? "৳২,৫০০+ অর্ডারে প্রযোজ্য" : "On orders ৳2,500+"}
              </p>
            </div>
          </div>

          <div className="bg-white border border-sand/80 rounded-2xl p-4 shadow-card flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-clay/10 flex items-center justify-center text-clay flex-shrink-0">
              <Heart className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-forest">
                {locale === "bn" ? "গ্রামীণ কারিগর" : "Artisan Handcrafted"}
              </h4>
              <p className="text-[11px] text-ink/60">
                {locale === "bn" ? "ন্যায্য পারিশ্রমিক ও সম্মান" : "Direct fair wages"}
              </p>
            </div>
          </div>

          <div className="bg-white border border-sand/80 rounded-2xl p-4 shadow-card flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-leaf/10 flex items-center justify-center text-leaf flex-shrink-0">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-forest">
                {locale === "bn" ? "সহজ রিপ্লেসমেন্ট" : "7-Day Replacement"}
              </h4>
              <p className="text-[11px] text-ink/60">
                {locale === "bn" ? "৭ দিনের মধ্যে পরিবর্তন" : "Hassle-free exchange"}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Category Tiles (6) */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 space-y-8">
        <div className="text-center space-y-2">
          <span className="text-xs font-semibold text-jute-deep uppercase tracking-wider">
            {locale === "bn" ? "কালেকশন অনুযায়ী বেছে নিন" : "Browse by Collections"}
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold font-bn-display text-forest">
            {locale === "bn" ? "পণ্য বিভাগ" : "Product Categories"}
          </h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.key}
              href={`/shop?category=${cat.key}`}
              className="group bg-white border border-sand/80 hover:border-leaf p-4 sm:p-5 rounded-2xl text-center shadow-card hover:shadow-pop hover:-translate-y-2 transition-all duration-300 flex flex-col items-center justify-center gap-3 relative overflow-hidden"
            >
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-b from-cream to-sand/40 group-hover:from-leaf/10 group-hover:to-sand/50 border border-sand/60 p-2 flex items-center justify-center transition-colors">
                <ProductArt
                  slug={CATEGORY_ART_MAP[cat.key] || cat.key}
                  category={cat.key}
                  className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <div>
                <h3 className="text-sm font-bold text-ink group-hover:text-leaf transition-colors">
                  {locale === "bn" ? cat.bn : cat.en}
                </h3>
                <span className="text-[11px] text-ink/50 block mt-0.5">
                  {toLocaleDigits(cat.count || 4)} {locale === "bn" ? "টি পণ্য" : "items"}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 3. Bestsellers Carousel / Grid */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 space-y-8">
        <div className="flex items-end justify-between border-b border-sand pb-4">
          <div>
            <span className="text-xs font-semibold text-jute-deep uppercase tracking-wider">
              গ্রাহকদের সর্বাধিক পছন্দের
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold font-bn-display text-forest mt-1">
              বেস্টসেলার কালেকশন
            </h2>
          </div>
          <Link
            href="/shop"
            className="text-sm font-semibold text-leaf hover:underline flex items-center gap-1.5"
          >
            <span>সকল পণ্য দেখুন</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {bestsellers.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              name={product.bn}
              slug={product.slug}
              price={product.variants[0].price}
              compareAtPrice={product.badge?.variant === "sale" ? product.variants[0].price + 150 : undefined}
              hasVariants={product.variants.length > 1}
              badge={product.badge}
              locale="bn"
              onQuickAdd={handleQuickAdd}
            />
          ))}
        </div>
      </section>

      {/* 4. Why Jute (3 Icons) */}
      <section className="bg-sand/30 border-y border-sand/60 py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-10 text-center">
          <div>
            <span className="text-xs font-semibold text-leaf uppercase tracking-wider">
              পাটপণ্য কেন ব্যবহার করবেন?
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold font-bn-display text-forest mt-1">
              সোনালি আঁশের অনন্য বৈশিষ্ট্য
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white border border-sand p-6 rounded-xl shadow-card space-y-3">
              <div className="w-14 h-14 mx-auto rounded-full bg-leaf/10 text-leaf flex items-center justify-center">
                <Leaf className="w-7 h-7" />
              </div>
              <h3 className="text-lg font-bold text-forest">প্রাকৃতিক ও পচনশীল</h3>
              <p className="text-xs text-ink/75 leading-relaxed font-bn">
                ১০০% পরিবেশবান্ধব। ব্যবহার শেষে মাটিতে সহজেই মিশে যায়, প্রকৃতি বা পরিবেশের কোনো ক্ষতি করে না।
              </p>
            </div>

            <div className="bg-white border border-sand p-6 rounded-xl shadow-card space-y-3">
              <div className="w-14 h-14 mx-auto rounded-full bg-jute/20 text-jute-deep flex items-center justify-center">
                <Sparkles className="w-7 h-7" />
              </div>
              <h3 className="text-lg font-bold text-forest">হাতে তৈরি ও দীর্ঘস্থায়ী</h3>
              <p className="text-xs text-ink/75 leading-relaxed font-bn">
                নিখুঁত বুনন ও টেকসই ফিনিশিং। দৈনন্দিন ভারবহনে নির্ভরযোগ্য এবং বছরের পর বছর সহজে ব্যবহারযোগ্য।
              </p>
            </div>

            <div className="bg-white border border-sand p-6 rounded-xl shadow-card space-y-3">
              <div className="w-14 h-14 mx-auto rounded-full bg-clay/10 text-clay flex items-center justify-center">
                <Heart className="w-7 h-7" />
              </div>
              <h3 className="text-lg font-bold text-forest">বাংলাদেশের কারিগরদের তৈরি</h3>
              <p className="text-xs text-ink/75 leading-relaxed font-bn">
                দেশের স্থানীয় তাঁতি ও নারী কারিগরদের কর্মসংস্থান তৈরি এবং দেশীয় ঐতিহ্য সংরক্ষণে সহায়ক।
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Bundle Promo */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="bg-gradient-to-r from-forest via-[#16382a] to-forest text-white rounded-3xl p-8 sm:p-12 shadow-pop relative overflow-hidden border border-jute/30">
          {/* Subtle Golden Pattern Background Overlay */}
          <div className="absolute inset-0 bg-[radial-gradient(#c8a165_1px,transparent_1px)] [background-size:20px_20px] opacity-10 pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            <div className="lg:col-span-8 space-y-5">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-jute text-ink text-xs font-bold rounded-full shadow-xs">
                <span>🔥</span>
                <span>{locale === "bn" ? "বিশেষ বান্ডেল অফার · ১০% সরাসরি ছাড়" : "Curated Living Set · Save 10%"}</span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-bold font-bn-display text-white">
                {locale === "bn" ? BUNDLE_PROMO.bn : BUNDLE_PROMO.en}
              </h2>

              <p className="text-sm text-sand/90 leading-relaxed font-bn max-w-xl">
                {locale === "bn"
                  ? `${BUNDLE_PROMO.itemsText}। আপনার ড্রয়িং ও ডাইনিং স্পেসকে আধুনিক ও রুচিশীল সাজে সাজিয়ে তুলুন এক সেটেই।`
                  : "Includes 2 Cushion Covers, 1 Table Runner, and 6 Coasters. Handcrafted from 100% natural jute."}
              </p>

              {/* Bundle items pill check */}
              <div className="flex flex-wrap gap-2 pt-1 text-xs">
                <span className="bg-white/10 border border-white/20 px-3 py-1 rounded-full flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-jute" />
                  <span>{locale === "bn" ? "২টি কুশন কভার (১৬×১৬)" : "2x Cushion Covers"}</span>
                </span>
                <span className="bg-white/10 border border-white/20 px-3 py-1 rounded-full flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-jute" />
                  <span>{locale === "bn" ? "১টি প্রিমিয়াম টেবিল রানার" : "1x Table Runner"}</span>
                </span>
                <span className="bg-white/10 border border-white/20 px-3 py-1 rounded-full flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-jute" />
                  <span>{locale === "bn" ? "১ সেট কোস্টার (৬টি)" : "6x Coasters Set"}</span>
                </span>
              </div>

              <div className="flex items-baseline gap-4 pt-2">
                <span className="text-3xl sm:text-4xl font-bold font-bn-display text-jute">
                  ৳১,৩৫০
                </span>
                <span className="text-lg text-sand/60 line-through">
                  ৳১,৫০০
                </span>
                <span className="text-xs text-sand/90 bg-white/15 px-3 py-1 rounded-full font-semibold border border-white/10">
                  {locale === "bn" ? "সেভ করুন ৳১৫০" : "Save ৳150"}
                </span>
              </div>

              <div className="pt-2 flex flex-wrap items-center gap-4">
                <Button
                  variant="jute"
                  size="lg"
                  onClick={handleBundleAdd}
                  className="font-bold shadow-glow hover:shadow-pop transition-all px-8"
                >
                  {locale === "bn" ? "বান্ডেল কার্টে যোগ করুন" : "Add Bundle to Bag"}
                </Button>
                <Link href="/bundles" className="text-xs text-sand hover:text-white underline underline-offset-4">
                  {locale === "bn" ? "সকল বান্ডেল দেখুন →" : "View all bundles →"}
                </Link>
              </div>
            </div>

            {/* Right Artwork Preview */}
            <div className="lg:col-span-4 flex justify-center">
              <div className="w-48 h-48 sm:w-60 sm:h-60 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 p-4 flex items-center justify-center drop-shadow-2xl">
                <ProductArt slug="cushion" className="w-full h-full object-contain" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5.5 Artisan Heritage & Founder's Story Banner */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="bg-gradient-to-br from-cream via-sand/30 to-cream border border-sand/80 rounded-3xl p-6 sm:p-10 shadow-card grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden shadow-pop border-2 border-sand aspect-[4/3] group">
              <img
                src="/images/artisan/artisan-loom.jpg"
                alt="Artisan hand-weaving natural jute at Paatbari workshop"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-forest/80 via-transparent to-transparent opacity-80" />
              <div className="absolute bottom-3 left-4 right-4 text-white text-xs">
                <span className="font-bold text-sm block">মানিকগঞ্জ ও বাংলার নিপুণ কারুশিল্প</span>
                <span className="text-white/80 text-[11px]">১০০% হাতে বোনা প্রাকৃতিক সোনালি আঁশ</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-leaf/10 text-leaf text-xs font-semibold border border-leaf/20">
              <Sparkles className="w-3.5 h-3.5 text-jute" />
              <span>{locale === "bn" ? "ঐতিহ্য ও স্বনির্ভরতার গল্প" : "Artisan Heritage"}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold font-bn-display text-forest">
              {locale === "bn" ? "প্রকৃতির পরম স্পর্শে তৈরি প্রতিটি পণ্য" : "Woven with Love, Dignity & Sustainability"}
            </h2>
            <p className="text-xs sm:text-sm text-ink/80 leading-relaxed font-bn">
              {locale === "bn"
                ? "পাটবাড়ি (Paatbari) বিশ্বাস করে পরিবেশ রক্ষার সেরা উপায় দেশীয় ঐতিহ্যে ফিরে যাওয়া। মানিকগঞ্জের সদর থেকে শুরু হওয়া আমাদের এই যাত্রায় গ্রামীণ অভিজ্ঞ তাঁতি ও নারী কারিগররা পরম যত্নে প্রতিটি সুতো বোনেন। কোনো কৃত্রিম কেমিক্যাল নয় — সম্পূর্ণ প্রাকৃতিক উপায়ে প্রস্তুত প্রতিটি ব্যাগ, ঝুড়ি ও হোম ডেকর।"
                : "From the heart of Manikganj, Paatbari revives Bangladesh's golden fibre heritage. Every thread is woven by skilled artisans ensuring zero chemicals, fair wages, and genuine sustainable living."}
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
              <div className="bg-white/80 border border-sand/80 rounded-xl p-3 text-center">
                <span className="text-base sm:text-lg font-bold text-forest block font-bn-display">১০০%</span>
                <span className="text-[11px] text-ink/70">প্রাকৃতিক পাট</span>
              </div>
              <div className="bg-white/80 border border-sand/80 rounded-xl p-3 text-center">
                <span className="text-base sm:text-lg font-bold text-leaf block font-bn-display">৫০+</span>
                <span className="text-[11px] text-ink/70">গ্রামীণ কারিগর</span>
              </div>
              <div className="bg-white/80 border border-sand/80 rounded-xl p-3 text-center col-span-2 sm:col-span-1">
                <span className="text-base sm:text-lg font-bold text-clay block font-bn-display">০%</span>
                <span className="text-[11px] text-ink/70">প্লাস্টিক ব্যবহার</span>
              </div>
            </div>

            <div className="pt-2 flex items-center justify-between border-t border-sand/60 text-xs">
              <div>
                <p className="font-bold text-forest text-sm">Sifat Phychee</p>
                <p className="text-ink/60 text-[11px]">
                  {locale === "bn" ? "প্রতিষ্ঠাতা ও স্বত্বাধিকারী · মানিকগঞ্জ ১৮০০" : "Founder & Owner · Manikganj"}
                </p>
              </div>
              <Link href="/about" className="text-leaf font-bold hover:underline flex items-center gap-1">
                <span>{locale === "bn" ? "বিস্তারিত গল্প পড়ুন" : "Read Full Story"}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 6. B2B Corporate Banner with Calculator Teaser */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="bg-white border-2 border-sand rounded-2xl p-6 sm:p-10 shadow-card">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Info */}
            <div className="lg:col-span-7 space-y-4">
              <Badge variant="sale">কর্পোরেট ও পাইকারি অর্ডার</Badge>
              <h2 className="text-2xl sm:text-3xl font-bold font-bn-display text-forest">
                প্রতিষ্ঠানের নিজস্ব লোগো ও কাস্টমাইজেশন
              </h2>
              <p className="text-sm text-ink/80 leading-relaxed font-bn">
                যেকোনো কনফারেন্স, সেমিনার বা কর্পোরেট গিফটিংয়ের জন্য ৫০ পিস থেকে শুরু করে বাল্ক অর্ডার করুন। সরাসরি কারখানা থেকে নির্ধারিত মূল্যে দ্রুত ডেলিভারি।
              </p>

              <div className="space-y-2 text-xs text-ink/75 pt-2">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-leaf" />
                  <span>সর্বনিম্ন অর্ডার মাত্র ৫০ পিস (MOQ: 50)</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-leaf" />
                  <span>স্ক্রিন প্রিন্ট বা ডিজিটাল লোগো প্রিন্টিং সুবিধা</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-leaf" />
                  <span>ভলিউম অনুযায়ী সর্বোচ্চ সাশ্রয়ী টায়ার প্রাইসিং</span>
                </div>
              </div>
            </div>

            {/* Teaser Calculator */}
            <div className="lg:col-span-5 bg-cream border border-sand p-6 rounded-xl space-y-4">
              <h3 className="font-bold text-sm text-forest flex items-center justify-between">
                <span>দ্রুত এস্টিমেট ক্যালকুলেটর</span>
                <span className="text-xs text-clay font-semibold">টোট ব্যাগ</span>
              </h3>

              <div className="space-y-2">
                <div className="flex justify-between text-xs text-ink/70">
                  <span>পরিমাণ: <strong>{b2bQty} পিস</strong></span>
                  <span>প্রতি পিস: <strong>৳{b2bUnit}</strong></span>
                </div>
                <input
                  type="range"
                  min="50"
                  max="600"
                  step="50"
                  value={b2bQty}
                  onChange={(e) => setB2bQty(Number(e.target.value))}
                  className="w-full accent-leaf cursor-pointer"
                />
              </div>

              <div className="border-t border-sand pt-3 space-y-1.5 text-xs">
                <div className="flex justify-between text-ink/80">
                  <span>মোট আনুমানিক মূল্য:</span>
                  <span className="font-bold text-sm text-forest">৳{b2bTotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-ink/60">
                  <span>অগ্রিম কনফার্মেশন (৫০%):</span>
                  <span>৳{b2bDeposit.toLocaleString()}</span>
                </div>
              </div>

              <Link href="/b2b" className="block pt-2">
                <Button variant="quote" className="w-full">
                  বিস্তারিত কোট রিকোয়েস্ট করুন
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Reviews Section (Empty state - No fake reviews per rule) */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 space-y-6">
        <div className="text-center space-y-2">
          <span className="text-xs font-semibold text-jute-deep uppercase tracking-wider">
            গ্রাহকের মূল্যায়ন
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold font-bn-display text-forest">
            গ্রাহক রিভিউ
          </h2>
        </div>

        {/* Empty State Card */}
        <div className="bg-white border border-sand rounded-xl p-10 text-center max-w-lg mx-auto shadow-card space-y-4">
          <div className="w-14 h-14 mx-auto rounded-full bg-sand/40 flex items-center justify-center text-jute">
            <Star className="w-7 h-7 fill-jute text-jute" />
          </div>
          <div>
            <h3 className="font-bold text-base text-forest">প্রথম রিভিউটি দিন আপনি!</h3>
            <p className="text-xs text-ink/70 mt-1 font-bn leading-relaxed">
              আমরা শতভাগ স্বচ্ছতায় বিশ্বাসী। কোনো কৃত্রিম বা ভুয়া রিভিউ নয় — আমাদের পণ্য ব্যবহার করে আপনার মূল্যবান মতামত ও অভিজ্ঞতা প্রকাশ করুন।
            </p>
          </div>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => setShowReviewNotice(!showReviewNotice)}
          >
            {locale === "bn" ? "রিভিউ লিখবেন যেভাবে" : "How to submit a review"}
          </Button>

          {showReviewNotice && (
            <div className="p-3 bg-cream border border-sand rounded-lg text-xs text-forest/90 font-bn text-left space-y-1">
              <div className="flex items-center gap-1.5 font-semibold text-leaf">
                <Info className="w-4 h-4 flex-shrink-0" />
                <span>{locale === "bn" ? "ভেরিফায়েড ক্রেতা রিভিউ নীতি" : "Verified Buyer Review Policy"}</span>
              </div>
              <p className="text-[11px] text-ink/75 leading-relaxed">
                {locale === "bn"
                  ? "অর্ডার সফলভাবে ডেলিভারি সম্পন্ন হওয়ার পর স্বয়ংক্রিয়ভাবে আপনার মোবাইলে এসএমএসে গোপন ওয়ান-টাইম রিভিউ লিংক পৌঁছে যাবে।"
                  : "Once your order is successfully delivered, a secure one-time review invitation link will be sent to your verified mobile number via SMS."}
              </p>
            </div>
          )}
        </div>
      </section>

      {/* 8. Newsletter & WhatsApp Join */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="bg-sand/30 border border-sand rounded-2xl p-8 sm:p-12 text-center space-y-6">
          <div className="max-w-xl mx-auto space-y-2">
            <h2 className="text-2xl sm:text-3xl font-bold font-bn-display text-forest">
              পাটবাড়ির সাথে সবসময় যুক্ত থাকুন
            </h2>
            <p className="text-xs sm:text-sm text-ink/75 leading-relaxed font-bn">
              নতুন পণ্যের আগমন, বিশেষ মূল্যছাড় ও পরিবেশবান্ধব লাইফস্টাইল টিপস পেতে সরাসরি হোয়াটসঅ্যাপ বা ইমেইলে নোটিফিকেশন পান।
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 max-w-md mx-auto">
            <a
              href="https://wa.me/8801700000000?text=I%20want%20to%20join%20Paatbari%20community"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto"
            >
              <Button
                variant="primary"
                className="w-full sm:w-auto flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1ebc57] text-white border-0"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>WhatsApp-এ যুক্ত হন</span>
              </Button>
            </a>

            <Link href="/shop" className="w-full sm:w-auto">
              <Button variant="secondary" className="w-full sm:w-auto">
                পণ্যসমূহ ব্রাউজ করুন
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
