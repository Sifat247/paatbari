"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { PRODUCTS, ProductVariant, Product } from "@/lib/catalog";
import { useCart } from "@/lib/cart-context";
import { PriceTag } from "@/components/ui/PriceTag";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { QtyStepper } from "@/components/ui/QtyStepper";
import { ProductCard } from "@/components/ui/ProductCard";
import { ProductArt } from "@/components/ui/ProductArt";
import { useLanguage } from "@/lib/i18n-context";
import {
  Truck,
  ShieldCheck,
  ShoppingBag,
  ArrowRight,
  Sparkles,
  Heart,
  Share2,
  Check,
  CheckCircle2,
  Info,
  Layers,
  Ruler,
  HelpCircle,
  Eye,
} from "lucide-react";

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params?.slug as string;
  const { locale, formatPrice, toLocaleDigits } = useLanguage();

  const product = PRODUCTS.find((p) => p.slug === slug) || PRODUCTS[0];

  const [selectedVariant, setSelectedVariant] = useState<ProductVariant>(
    product.variants[0]
  );
  const [selectedImage, setSelectedImage] = useState<string>(
    product.primaryImage || (product.images && product.images[0]) || ""
  );
  const [qty, setQty] = useState(1);
  const [activeTab, setActiveTab] = useState<"desc" | "care" | "story" | "shipping">("desc");
  const [selectedZone, setSelectedZone] = useState<"dhaka_city" | "dhaka_sub" | "outside">("dhaka_city");
  const [copiedLink, setCopiedLink] = useState(false);

  // Update selected variant & image when slug changes
  useEffect(() => {
    setSelectedVariant(product.variants[0]);
    setSelectedImage(product.primaryImage || (product.images && product.images[0]) || "");
  }, [product]);

  const { addToCart, setIsMiniCartOpen } = useCart();

  // JSON-LD structured data for rich snippet & SEO
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": locale === "bn" ? product.bn : product.en,
    "description": locale === "bn" ? product.descriptionBn : product.descriptionEn,
    "image": product.primaryImage,
    "offers": {
      "@type": "Offer",
      "priceCurrency": "BDT",
      "price": selectedVariant.price,
      "availability": "https://schema.org/InStock",
      "seller": {
        "@type": "Organization",
        "name": "Paatbari · পাটবাড়ি"
      }
    }
  };

  const handleAddToCart = () => {
    addToCart(product, selectedVariant, qty);
    setIsMiniCartOpen(true);
  };

  const handleBuyNow = () => {
    addToCart(product, selectedVariant, qty);
    router.push("/checkout");
  };

  const handleShare = () => {
    if (typeof window !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  const relatedProducts = PRODUCTS.filter(
    (p) => p.cat === product.cat && p.id !== product.id
  ).slice(0, 4);

  const deliveryRates = {
    dhaka_city: {
      label: locale === "bn" ? "ঢাকা সিটি" : "Dhaka City",
      fee: 70,
      time: locale === "bn" ? "২৪–৪৮ ঘণ্টা" : "24–48 Hours",
    },
    dhaka_sub: {
      label: locale === "bn" ? "ঢাকা উপশহর" : "Dhaka Suburbs",
      fee: 100,
      time: locale === "bn" ? "২–৩ দিন" : "2–3 Days",
    },
    outside: {
      label: locale === "bn" ? "ঢাকার বাইরে (সারা দেশ)" : "Outside Dhaka (All Districts)",
      fee: 130,
      time: locale === "bn" ? "৩–৫ দিন" : "3–5 Days",
    },
  };

  const allImages = [
    product.primaryImage,
    ...(product.images || []).filter((img) => img !== product.primaryImage),
  ].filter(Boolean);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-16 pb-32">
      {/* JSON-LD for Search Engines */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Breadcrumbs */}
      <div className="flex items-center gap-2 text-xs text-ink/60">
        <Link href="/" className="hover:text-leaf">
          {locale === "bn" ? "হোম" : "Home"}
        </Link>
        <span>/</span>
        <Link href="/shop" className="hover:text-leaf">
          {locale === "bn" ? "শপ" : "Shop"}
        </Link>
        <span>/</span>
        <span className="text-leaf font-medium truncate max-w-xs">
          {locale === "bn" ? product.bn : product.en}
        </span>
      </div>

      {/* Main Product Showcase Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left: Multi-Image Photo Gallery */}
        <div className="lg:col-span-6 space-y-4">
          {/* Main Large Showcase Frame */}
          <div className="relative w-full aspect-[4/5] rounded-3xl bg-sand/15 border-2 border-sand/80 overflow-hidden shadow-pop group">
            {/* Primary Product Photo or Vector Art */}
            {selectedImage ? (
              <img
                src={selectedImage}
                alt={locale === "bn" ? product.bn : product.en}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            ) : (
              <div className="w-full h-full p-8 flex items-center justify-center">
                <ProductArt
                  slug={product.slug}
                  className="w-full h-full object-contain drop-shadow-xl transition-transform duration-300 group-hover:scale-105"
                />
              </div>
            )}

            {/* Badges Overlay */}
            {product.badge && (
              <div className="absolute top-4 left-4 z-10 drop-shadow-md">
                <Badge variant={product.badge.variant}>
                  {locale === "bn" ? product.badge.text : (product.badge.textEn || product.badge.text)}
                </Badge>
              </div>
            )}

            {/* Share Button Overlay */}
            <button
              type="button"
              onClick={handleShare}
              className="absolute top-4 right-4 z-10 p-2.5 rounded-full bg-white/90 backdrop-blur-md border border-sand text-ink hover:text-leaf hover:bg-white transition-colors shadow-xs"
              title={locale === "bn" ? "লিংক কপি করুন" : "Copy Product Link"}
              aria-label="Share product"
            >
              {copiedLink ? <Check className="w-4 h-4 text-leaf" /> : <Share2 className="w-4 h-4" />}
            </button>

            {/* Gradient Scrim & Artisan Origin Tag */}
            <div className="absolute inset-0 bg-gradient-to-t from-forest/75 via-transparent to-transparent opacity-60 pointer-events-none" />
            <div className="absolute bottom-4 left-4 right-4 text-white text-xs drop-shadow-md flex items-end justify-between pointer-events-none">
              <div>
                <span className="font-bold text-sm block font-bn-display">
                  {locale === "bn" ? "হাতে বোনা প্রাকৃতিক পাট" : "100% Handcrafted Jute"}
                </span>
                <span className="text-white/80 text-[11px]">
                  {locale === "bn" ? "মানিকগঞ্জ সদর, মানিকগঞ্জ ১৮০০" : "Manikganj Sadar, Bangladesh"}
                </span>
              </div>
              <span className="bg-white/20 backdrop-blur-md px-2.5 py-1 rounded-full text-[10px] font-semibold">
                {locale === "bn" ? "১০০% অর্গানিক" : "Zero Plastic"}
              </span>
            </div>
          </div>

          {/* Interactive Multi-Image Thumbnail Carousel */}
          {allImages.length > 1 && (
            <div className="space-y-2">
              <span className="text-[11px] font-bold text-ink/60 uppercase tracking-wider block">
                {locale === "bn" ? "গ্যালারি ছবিসমূহ (" + toLocaleDigits(allImages.length) + "টি ভিউ):" : "Product Gallery (" + allImages.length + " Views):"}
              </span>
              <div className="flex items-center gap-3 overflow-x-auto pb-1">
                {allImages.map((imgSrc, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setSelectedImage(imgSrc)}
                    className={`relative w-20 h-20 rounded-2xl overflow-hidden border-2 flex-shrink-0 transition-all ${
                      selectedImage === imgSrc
                        ? "border-leaf ring-2 ring-leaf/30 shadow-md scale-105"
                        : "border-sand/80 opacity-70 hover:opacity-100 hover:border-jute"
                    }`}
                  >
                    <img
                      src={imgSrc}
                      alt={`${product.en} view ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Feature Highlights Grid */}
          <div className="grid grid-cols-3 gap-3 pt-2 text-xs">
            <div className="p-3 bg-white border border-sand/80 rounded-xl text-center shadow-2xs">
              <Sparkles className="w-4 h-4 text-jute mx-auto mb-1" />
              <span className="font-bold text-forest block">
                {locale === "bn" ? "১০০% খাঁটি পাট" : "100% Eco Jute"}
              </span>
              <span className="text-[10px] text-ink/60">
                {locale === "bn" ? "পরিবেশবান্ধব" : "Biodegradable"}
              </span>
            </div>

            <div className="p-3 bg-white border border-sand/80 rounded-xl text-center shadow-2xs">
              <Heart className="w-4 h-4 text-clay mx-auto mb-1" />
              <span className="font-bold text-forest block">
                {locale === "bn" ? "গ্রামীণ কারিগর" : "Artisan Craft"}
              </span>
              <span className="text-[10px] text-ink/60">
                {locale === "bn" ? "ন্যায্য পারিশ্রমিক" : "Fair Living Wage"}
              </span>
            </div>

            <div className="p-3 bg-white border border-sand/80 rounded-xl text-center shadow-2xs">
              <ShieldCheck className="w-4 h-4 text-leaf mx-auto mb-1" />
              <span className="font-bold text-forest block">
                {locale === "bn" ? "৭ দিনের রিটার্ন" : "7-Day Return"}
              </span>
              <span className="text-[10px] text-ink/60">
                {locale === "bn" ? "সহজ রিপ্লেসমেন্ট" : "Hassle-Free"}
              </span>
            </div>
          </div>
        </div>

        {/* Right: Purchase Controls, Variant Selection & Specs */}
        <div className="lg:col-span-6 space-y-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-bold text-jute-deep uppercase tracking-wider bg-jute/15 px-2.5 py-0.5 rounded-full">
                {product.cat.toUpperCase()}
              </span>
              <div className="flex items-center gap-1 text-xs text-jute">
                <span>★★★★★</span>
                <span className="font-bold text-ink/80 text-[11px]">
                  {product.rating || 4.9}
                </span>
                <span className="text-ink/50 text-[11px]">
                  ({locale === "bn" ? `${toLocaleDigits(product.reviewsCount || 120)}টি রিভিউ` : `${product.reviewsCount || 120} reviews`})
                </span>
              </div>
            </div>

            <h1 className="text-2xl sm:text-4xl font-bold font-bn-display text-forest mt-1">
              {locale === "bn" ? product.bn : product.en}
            </h1>

            <p className="text-xs sm:text-sm text-leaf font-medium mt-1">
              {locale === "bn" ? product.taglineBn : product.taglineEn}
            </p>
          </div>

          {/* Pricing & Stock Status */}
          <div className="flex items-baseline gap-4 pb-4 border-b border-sand">
            <PriceTag price={selectedVariant.price} locale={locale} size="lg" />
            <span className="inline-flex items-center gap-1 text-xs font-semibold text-leaf bg-leaf/10 border border-leaf/20 px-3 py-1 rounded-full">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>{locale === "bn" ? "স্টকে আছে" : "In Stock"}</span>
            </span>
            <span className="text-xs text-ink/50 hidden sm:inline">
              {locale === "bn" ? "ভ্যাট অন্তর্ভুক্ত" : "VAT Included"}
            </span>
          </div>

          {/* Variant Selector */}
          {product.variants.length > 1 && (
            <div className="space-y-2">
              <label className="text-xs font-bold text-ink/80 block">
                {locale === "bn" ? "ভ্যারিয়েন্ট / সাইজ বেছে নিন:" : "Select Variant / Size:"}
              </label>
              <div className="flex flex-wrap gap-2.5">
                {product.variants.map((v) => (
                  <button
                    key={v.k}
                    type="button"
                    onClick={() => setSelectedVariant(v)}
                    className={`px-4 py-2 rounded-xl text-xs sm:text-sm transition-all border font-medium ${
                      selectedVariant.k === v.k
                        ? "border-leaf bg-leaf text-white shadow-xs"
                        : "border-sand bg-white text-ink hover:border-jute"
                    }`}
                  >
                    <span>{locale === "bn" ? v.bn : v.en}</span>
                    <span className="ml-1.5 text-xs opacity-90">({formatPrice(v.price)})</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity Selector */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-ink/80 block">
              {locale === "bn" ? "পরিমাণ (১–২০):" : "Quantity (1–20):"}
            </label>
            <QtyStepper value={qty} onChange={setQty} locale={locale} />
          </div>

          {/* Action Buttons: Add to Bag & Buy Now */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <Button
              variant="secondary"
              size="lg"
              onClick={handleAddToCart}
              className="flex items-center justify-center gap-2 border-2 border-leaf text-leaf hover:bg-leaf hover:text-white transition-all shadow-xs"
            >
              <ShoppingBag className="w-5 h-5" />
              <span>{locale === "bn" ? "ব্যাগে যোগ করুন" : "Add to Bag"}</span>
            </Button>

            <Button
              variant="primary"
              size="lg"
              onClick={handleBuyNow}
              className="flex items-center justify-center gap-2 shadow-pop hover:shadow-glow transition-all"
            >
              <span>{locale === "bn" ? "এখনই কিনুন" : "Buy Now"}</span>
              <ArrowRight className="w-5 h-5" />
            </Button>
          </div>

          {/* Nationwide Delivery Estimator */}
          <div className="bg-sand/30 border border-sand rounded-2xl p-4 sm:p-5 space-y-3.5">
            <div className="flex items-center justify-between text-xs font-bold text-forest">
              <span className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-leaf" />
                <span>{locale === "bn" ? "ডেলিভারি চার্জ ও সময়" : "Nationwide Delivery Rates"}</span>
              </span>
              <span className="text-leaf font-bold bg-white/80 border border-sand px-2.5 py-0.5 rounded-full text-[11px]">
                {locale === "bn" ? "৳২,৫০০+ অর্ডারে সম্পূর্ণ ফ্রি" : "Free on orders ৳2,500+"}
              </span>
            </div>

            <div className="grid grid-cols-3 gap-2 text-xs">
              {(["dhaka_city", "dhaka_sub", "outside"] as const).map((z) => (
                <button
                  key={z}
                  type="button"
                  onClick={() => setSelectedZone(z)}
                  className={`p-2.5 rounded-xl border text-center transition-all ${
                    selectedZone === z
                      ? "border-leaf bg-white font-bold text-forest shadow-xs"
                      : "border-transparent bg-cream/70 text-ink/70 hover:bg-cream"
                  }`}
                >
                  <span className="block text-[11px] truncate">{deliveryRates[z].label}</span>
                  <strong className="block text-sm text-leaf mt-0.5">{formatPrice(deliveryRates[z].fee)}</strong>
                </button>
              ))}
            </div>

            <p className="text-[11px] text-ink/75 text-center">
              {locale === "bn" ? (
                <>
                  সম্ভাব্য ডেলিভারি সময়: <strong>{deliveryRates[selectedZone].time}</strong> (৬৪ জেলায় ক্যাশ অন ডেলিভারি)
                </>
              ) : (
                <>
                  Estimated Delivery: <strong>{deliveryRates[selectedZone].time}</strong> (Cash on Delivery in 64 Districts)
                </>
              )}
            </p>
          </div>

          {/* Quick Specifications Pill Bar */}
          <div className="p-4 bg-cream rounded-2xl border border-sand space-y-2 text-xs">
            <div className="flex items-center justify-between">
              <span className="text-ink/60">{locale === "bn" ? "পরিমাপ:" : "Dimensions:"}</span>
              <span className="font-semibold text-forest">{locale === "bn" ? product.dimensionsBn : product.dimensionsEn}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-ink/60">{locale === "bn" ? "উপাদান:" : "Material:"}</span>
              <span className="font-semibold text-forest text-right max-w-[240px] truncate">
                {locale === "bn" ? product.materialBn : product.materialEn}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Detailed Specification Tabs */}
      <div className="bg-white border border-sand rounded-3xl p-6 sm:p-10 shadow-card space-y-6">
        {/* Tab Headers */}
        <div className="flex border-b border-sand gap-6 sm:gap-8 text-sm font-semibold overflow-x-auto pb-1">
          {[
            { id: "desc", label: locale === "bn" ? "পণ্যের বিবরণ ও বৈশিষ্ট্য" : "Overview & Features" },
            { id: "care", label: locale === "bn" ? "সাইজ ও যত্ন প্রণালী" : "Dimensions & Care" },
            { id: "story", label: locale === "bn" ? "কারিগর ও ঐতিহ্য" : "Artisan Heritage" },
            { id: "shipping", label: locale === "bn" ? "ডেলিভারি ও রিটার্ন" : "Shipping & Returns" },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id as any)}
              className={`pb-3.5 relative transition-colors whitespace-nowrap ${
                activeTab === tab.id
                  ? "text-leaf font-bold border-b-2 border-leaf"
                  : "text-ink/60 hover:text-ink"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab 1: Description & Key Features */}
        {activeTab === "desc" && (
          <div className="space-y-6 text-sm text-ink/80 leading-relaxed font-bn">
            <p className="text-base text-forest font-medium">
              {locale === "bn" ? product.descriptionBn : product.descriptionEn}
            </p>

            <div className="space-y-3">
              <h4 className="font-bold text-forest text-sm uppercase tracking-wider">
                {locale === "bn" ? "প্রধান বৈশিষ্ট্যসমূহ:" : "Key Product Highlights:"}
              </h4>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-ink/80">
                {(locale === "bn" ? product.featuresBn : product.featuresEn).map((feat, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 bg-cream/60 p-3 rounded-xl border border-sand/60">
                    <CheckCircle2 className="w-4 h-4 text-leaf flex-shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* Tab 2: Dimensions & Care Instructions */}
        {activeTab === "care" && (
          <div className="space-y-6 text-sm text-ink/80 leading-relaxed font-bn">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-cream/60 p-4 rounded-2xl border border-sand">
                <span className="text-xs font-bold text-ink/60 block uppercase">
                  {locale === "bn" ? "সাইজ ও পরিমাপ" : "Product Dimensions"}
                </span>
                <p className="font-bold text-forest mt-1">
                  {locale === "bn" ? product.dimensionsBn : product.dimensionsEn}
                </p>
              </div>

              <div className="bg-cream/60 p-4 rounded-2xl border border-sand">
                <span className="text-xs font-bold text-ink/60 block uppercase">
                  {locale === "bn" ? "ব্যবহৃত কাঁচামাল" : "Materials & Finish"}
                </span>
                <p className="font-bold text-forest mt-1">
                  {locale === "bn" ? product.materialBn : product.materialEn}
                </p>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="font-bold text-forest text-sm">
                {locale === "bn" ? "পরিষ্কার ও সংরক্ষণের নিয়ম:" : "Care & Maintenance Guide:"}
              </h4>
              <ul className="list-disc list-inside space-y-2 text-xs text-ink/75">
                {(locale === "bn" ? product.careBn : product.careEn).map((careTip, idx) => (
                  <li key={idx}>{careTip}</li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* Tab 3: Artisan Story */}
        {activeTab === "story" && (
          <div className="space-y-4 text-sm text-ink/80 leading-relaxed font-bn">
            <div className="flex items-center gap-2 text-leaf font-semibold text-xs">
              <Sparkles className="w-4 h-4 text-jute" />
              <span>{locale === "bn" ? "বাংলার নিপুণ তাঁতের কারুশিল্প" : "Handcrafted with Generational Mastery"}</span>
            </div>
            <p className="text-forest text-base leading-relaxed">
              {locale === "bn" ? product.storyBn : product.storyEn}
            </p>
            <div className="p-4 bg-sand/20 rounded-2xl border border-sand flex items-center justify-between text-xs text-ink/75">
              <div>
                <strong className="block text-forest">Sifat Phychee</strong>
                <span>{locale === "bn" ? "প্রতিষ্ঠাতা, পাটবাড়ি · মানিকগঞ্জ সদর" : "Founder, Paatbari · Manikganj Sadar"}</span>
              </div>
              <span className="text-leaf font-bold">
                {locale === "bn" ? "১০০% দেশীয় কারিগর" : "100% Artisan Made"}
              </span>
            </div>
          </div>
        )}

        {/* Tab 4: Delivery & Returns */}
        {activeTab === "shipping" && (
          <div className="space-y-4 text-sm text-ink/80 leading-relaxed font-bn">
            <h4 className="font-bold text-forest text-sm">
              {locale === "bn" ? "সারাদেশে ক্যাশ অন ডেলিভারি ও রিটার্ন পলিসি:" : "Nationwide Cash on Delivery & Return Policy:"}
            </h4>
            <p className="text-xs text-ink/75 leading-relaxed">
              {locale === "bn"
                ? "পাটবাড়ি বাংলাদেশের ৬৪টি জেলা ও প্রত্যন্ত অঞ্চলেও দ্রুততম সময়ে ক্যাশ অন ডেলিভারি (COD) সুবিধা প্রদান করে। পার্সেল হাতে পেয়ে পণ্য চেক করে মূল্য পরিশোধ করতে পারবেন। যদি কোনো কারণে পণ্য ক্ষতিগ্রস্ত বা ক্রটিপূর্ণ হয়, তবে গ্রহণের ৭ দিনের মধ্যে বিনামূল্যে এক্সচেঞ্জ অথবা মানিব্যাক গ্যারান্টি উপভোগ করুন।"
                : "Paatbari delivers nationwide across all 64 districts with Cash on Delivery (COD). You can inspect the package upon arrival. If the product arrives defective or damaged, enjoy our hassle-free 7-day replacement guarantee."}
            </p>
          </div>
        )}
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="space-y-8">
          <div className="border-b border-sand pb-4 flex items-center justify-between">
            <h2 className="text-2xl sm:text-3xl font-bold font-bn-display text-forest">
              {locale === "bn" ? "সম্পর্কিত পণ্যসমূহ" : "Related Products"}
            </h2>
            <Link
              href={`/shop?category=${product.cat}`}
              className="text-xs font-semibold text-leaf hover:underline flex items-center gap-1"
            >
              <span>{locale === "bn" ? "আরো দেখুন" : "View More"}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((p) => (
              <ProductCard
                key={p.id}
                id={p.id}
                name={locale === "bn" ? p.bn : p.en}
                slug={p.slug}
                price={p.variants[0].price}
                compareAtPrice={p.badge?.variant === "sale" ? p.variants[0].price + 150 : undefined}
                hasVariants={p.variants.length > 1}
                badge={p.badge}
                locale={locale}
                onQuickAdd={() => addToCart(p, p.variants[0], 1)}
              />
            ))}
          </div>
        </div>
      )}

      {/* Mobile Sticky Add to Cart Bar */}
      <div className="lg:hidden fixed bottom-16 left-0 right-0 z-30 bg-white/95 backdrop-blur-md border-t border-sand p-3.5 flex items-center justify-between gap-4 shadow-lg">
        <div>
          <span className="text-[11px] text-ink/60 block">
            {locale === "bn" ? selectedVariant.bn : selectedVariant.en}
          </span>
          <PriceTag price={selectedVariant.price} locale={locale} size="md" />
        </div>
        <Button
          variant="primary"
          size="md"
          onClick={handleAddToCart}
          className="flex-1 max-w-[200px]"
        >
          {locale === "bn" ? "ব্যাগে যোগ করুন" : "Add to Bag"}
        </Button>
      </div>
    </div>
  );
}
