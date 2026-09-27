"use client";

import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { PRODUCTS, ProductVariant } from "@/lib/catalog";
import { useCart } from "@/lib/cart-context";
import { PriceTag } from "@/components/ui/PriceTag";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { QtyStepper } from "@/components/ui/QtyStepper";
import { VariantPicker } from "@/components/ui/VariantPicker";
import { ProductCard } from "@/components/ui/ProductCard";
import { formatPrice } from "@/lib/utils";
import {
  Truck,
  ShieldCheck,
  ShoppingBag,
  ArrowRight,
  Sparkles,
  Heart,
  Share2,
  Check,
} from "lucide-react";

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params?.slug as string;

  const product = PRODUCTS.find((p) => p.slug === slug) || PRODUCTS[0];

  const [selectedVariant, setSelectedVariant] = useState<ProductVariant>(
    product.variants[0]
  );
  const [qty, setQty] = useState(1);
  const [activeTab, setActiveTab] = useState<"desc" | "care" | "shipping">("desc");
  const [selectedZone, setSelectedZone] = useState<"dhaka_city" | "dhaka_sub" | "outside">("dhaka_city");

  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(product, selectedVariant, qty);
  };

  const handleBuyNow = () => {
    addToCart(product, selectedVariant, qty);
    router.push("/checkout");
  };

  const relatedProducts = PRODUCTS.filter(
    (p) => p.cat === product.cat && p.id !== product.id
  ).slice(0, 4);

  const deliveryRates = {
    dhaka_city: { label: "ঢাকা সিটি", fee: 70, time: "২৪–৪৮ ঘণ্টা" },
    dhaka_sub: { label: "ঢাকা উপশহর", fee: 100, time: "২–৩ দিন" },
    outside: { label: "ঢাকার বাইরে (সারা দেশ)", fee: 130, time: "৩–৫ দিন" },
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-16 pb-24">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs text-ink/60">
        <Link href="/" className="hover:text-leaf">হোম</Link>
        <span>/</span>
        <Link href="/shop" className="hover:text-leaf">শপ</Link>
        <span>/</span>
        <span className="text-leaf font-medium truncate max-w-xs">{product.bn}</span>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left: Product Image Frame */}
        <div className="lg:col-span-6 space-y-4">
          <div className="relative w-full aspect-[4/5] rounded-2xl bg-white border-2 border-sand p-8 flex flex-col items-center justify-center text-center shadow-card overflow-hidden">
            {product.badge && (
              <div className="absolute top-4 left-4 z-10">
                <Badge variant={product.badge.variant}>{product.badge.text}</Badge>
              </div>
            )}
            <div className="w-32 h-32 rounded-full bg-cream flex items-center justify-center text-leaf mb-4 shadow-inner">
              <ShoppingBag className="w-16 h-16 opacity-80" />
            </div>
            <h3 className="font-bn-display text-xl font-bold text-forest max-w-xs">
              {product.bn}
            </h3>
            <p className="text-xs text-ink/60 mt-1">১০০% প্রাকৃতিক সোনালি আঁশ</p>
          </div>

          <div className="grid grid-cols-3 gap-3">
            {[1, 2, 3].map((idx) => (
              <div
                key={idx}
                className="aspect-square rounded-lg bg-cream border border-sand flex items-center justify-center text-leaf/60 text-xs font-medium cursor-pointer hover:border-leaf"
              >
                ছবি {idx}
              </div>
            ))}
          </div>
        </div>

        {/* Right: Purchase Controls & Specs */}
        <div className="lg:col-span-6 space-y-6">
          <div>
            <span className="text-xs font-bold text-jute-deep uppercase tracking-wider">
              {product.cat.toUpperCase()}
            </span>
            <h1 className="text-2xl sm:text-3xl font-bold font-bn-display text-forest mt-1">
              {product.bn}
            </h1>
            <p className="text-xs text-ink/60 mt-0.5">{product.en}</p>
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-3 pb-3 border-b border-sand">
            <PriceTag price={selectedVariant.price} locale="bn" size="lg" />
            <span className="text-xs text-leaf font-medium bg-leaf/10 px-2 py-0.5 rounded-full">
              স্টকে আছে
            </span>
          </div>

          {/* Variant Selector */}
          {product.variants.length > 1 && (
            <div className="space-y-2">
              <label className="text-xs font-bold text-ink/80 block">
                ভ্যারিয়েন্ট / সাইজ বেছে নিন:
              </label>
              <div className="flex flex-wrap gap-2.5">
                {product.variants.map((v) => (
                  <button
                    key={v.k}
                    type="button"
                    onClick={() => setSelectedVariant(v)}
                    className={`px-4 py-2 rounded-md text-sm transition-all border ${
                      selectedVariant.k === v.k
                        ? "border-leaf bg-leaf text-white font-medium shadow-xs"
                        : "border-sand bg-white text-ink hover:border-jute"
                    }`}
                  >
                    <span>{v.bn}</span>
                    <span className="ml-1 text-xs opacity-90">({formatPrice(v.price, "bn")})</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity Selector */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-ink/80 block">পরিমাণ (১–২০):</label>
            <QtyStepper value={qty} onChange={setQty} locale="bn" />
          </div>

          {/* Actions */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <Button
              variant="secondary"
              size="lg"
              onClick={handleAddToCart}
              className="flex items-center justify-center gap-2"
            >
              <ShoppingBag className="w-5 h-5" />
              <span>ব্যাগে যোগ করুন</span>
            </Button>

            <Button
              variant="primary"
              size="lg"
              onClick={handleBuyNow}
              className="flex items-center justify-center gap-2 shadow-md"
            >
              <span>এখনই কিনুন</span>
              <ArrowRight className="w-5 h-5" />
            </Button>
          </div>

          {/* Delivery Estimator */}
          <div className="bg-sand/30 border border-sand p-4 rounded-xl space-y-3">
            <div className="flex items-center justify-between text-xs font-bold text-forest">
              <span className="flex items-center gap-1.5">
                <Truck className="w-4 h-4 text-leaf" />
                <span>ডেলিভারি চার্জ ও সময়</span>
              </span>
              <span className="text-leaf font-semibold">৳২,৫০০+ অর্ডারে সম্পূর্ণ ফ্রি</span>
            </div>

            <div className="grid grid-cols-3 gap-2 text-xs">
              {(["dhaka_city", "dhaka_sub", "outside"] as const).map((z) => (
                <button
                  key={z}
                  type="button"
                  onClick={() => setSelectedZone(z)}
                  className={`p-2 rounded-md border text-center transition-all ${
                    selectedZone === z
                      ? "border-leaf bg-white font-bold text-forest shadow-xs"
                      : "border-transparent bg-cream/70 text-ink/70"
                  }`}
                >
                  <span className="block text-[11px] truncate">{deliveryRates[z].label}</span>
                  <strong className="block text-sm text-leaf mt-0.5">৳{deliveryRates[z].fee}</strong>
                </button>
              ))}
            </div>

            <p className="text-[11px] text-ink/70 text-center">
              সম্ভাব্য ডেলিভারি সময়: <strong>{deliveryRates[selectedZone].time}</strong> (সারা দেশে ক্যাশ অন ডেলিভারি)
            </p>
          </div>
        </div>
      </div>

      {/* Tabs Section */}
      <div className="bg-white border border-sand rounded-xl p-6 sm:p-8 shadow-card space-y-6">
        <div className="flex border-b border-sand gap-6 text-sm font-semibold">
          {[
            { id: "desc", label: "পণ্যের বিবরণ" },
            { id: "care", label: "সাইজ ও যত্ন" },
            { id: "shipping", label: "ডেলিভারি ও রিটার্ন" },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id as any)}
              className={`pb-3 relative transition-colors ${
                activeTab === tab.id
                  ? "text-leaf font-bold border-b-2 border-leaf"
                  : "text-ink/60 hover:text-ink"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="text-sm text-ink/80 leading-relaxed font-bn">
          {activeTab === "desc" && (
            <div className="space-y-3">
              <p>
                বাংলার ঐতিহ্যবাহী সোনালি আঁশ ও নিখুঁত কারিগরি দক্ষতায় তৈরি {product.bn}। এটি অত্যন্ত মজবুত, পরিবেশবান্ধব এবং দীর্ঘস্থায়ী।
              </p>
              <ul className="list-disc list-inside space-y-1 text-xs text-ink/75 pt-1">
                <li>১০০% খাঁটি ও বায়োডিগ্রেডেবল পাট</li>
                <li>দেশীয় গ্রামীণ নারী ও তাঁতিদের হাতে বোনা</li>
                <li>প্লাস্টিকের ক্ষতিকর প্রভাবমুক্ত টেকসই জীবনযাত্রার আদর্শ পছন্দ</li>
              </ul>
            </div>
          )}

          {activeTab === "care" && (
            <div className="space-y-3">
              <h4 className="font-bold text-forest text-sm">পরিষ্কার ও সংরক্ষণের নিয়ম:</h4>
              <ul className="list-disc list-inside space-y-1.5 text-xs text-ink/75">
                <li>পানি দিয়ে ভেজাবেন না; শুকনো বা হালকা ভেজা সুতি কাপড় দিয়ে দাগ মুছে নিন।</li>
                <li>কড়া রোদে দীর্ঘক্ষণ ফেলে রাখবেন না, ছায়াযুক্ত স্থানে শুকিয়ে নিন।</li>
                <li>ভেজা অবস্থায় ব্যবহার না করে শুকিয়ে সাধারণ তাপমাত্রায় সংরক্ষণ করুন।</li>
              </ul>
            </div>
          )}

          {activeTab === "shipping" && (
            <div className="space-y-3">
              <h4 className="font-bold text-forest text-sm">ডেলিভারি ও রিটার্ন পলিসি:</h4>
              <p className="text-xs text-ink/75">
                আমরা দেশের ৬৪টি জেলা ও প্রত্যন্ত অঞ্চলেও দ্রুততম সময়ে ক্যাশ অন ডেলিভারি সুবিধা প্রদান করি। পণ্য হাতে পেয়ে চেক করে নেওয়ার সুযোগ রয়েছে। কোনো ক্রটি বা ভাঙা পণ্য পাওয়া গেলে ৭ দিনের মধ্যে বিনামূল্যে এক্সচেঞ্জ সুবিধা উপভোগ করুন।
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold font-bn-display text-forest">
            সম্পর্কিত পণ্যসমূহ
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((p) => (
              <ProductCard
                key={p.id}
                id={p.id}
                name={p.bn}
                slug={p.slug}
                price={p.variants[0].price}
                hasVariants={p.variants.length > 1}
                badge={p.badge}
                locale="bn"
                onQuickAdd={() => addToCart(p, p.variants[0], 1)}
              />
            ))}
          </div>
        </div>
      )}

      {/* Mobile Sticky Add to Cart Bar */}
      <div className="lg:hidden fixed bottom-16 left-0 right-0 z-30 bg-white/95 backdrop-blur-md border-t border-sand p-3.5 flex items-center justify-between gap-4 shadow-lg">
        <div>
          <span className="text-[11px] text-ink/60 block">{selectedVariant.bn}</span>
          <PriceTag price={selectedVariant.price} locale="bn" size="md" />
        </div>
        <Button
          variant="primary"
          size="md"
          onClick={handleAddToCart}
          className="flex-1 max-w-[200px]"
        >
          ব্যাগে যোগ করুন
        </Button>
      </div>
    </div>
  );
}
