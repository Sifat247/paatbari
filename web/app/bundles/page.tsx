"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useCart } from "@/lib/cart-context";
import { useLanguage } from "@/lib/i18n-context";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { ProductArt } from "@/components/ui/ProductArt";
import { PRODUCTS } from "@/lib/catalog";
import {
  Sparkles,
  ShoppingBag,
  CheckCircle2,
  Gift,
  ArrowRight,
  ShieldCheck,
  Truck,
} from "lucide-react";

interface BundleItem {
  id: string;
  titleBn: string;
  titleEn: string;
  slug: string;
  itemsBn: string[];
  itemsEn: string[];
  originalPrice: number;
  bundlePrice: number;
  discountPct: number;
  tagBn: string;
  tagEn: string;
  artSlug: string;
}

const BUNDLES_DATA: BundleItem[] = [
  {
    id: "BN1",
    titleBn: "ইকো হোম স্টার্টার বান্ডেল",
    titleEn: "Eco Home Starter Bundle",
    slug: "eco-home-starter-bundle",
    itemsBn: [
      "২টি পাটের কুশন কভার (১৬×১৬ ইঞ্চি)",
      "১টি প্রিমিয়াম পাটের টেবিল রানার",
      "১ সেট গোল পাটের কোস্টার (৬টি)",
    ],
    itemsEn: [
      "2x Jute Cushion Covers (16×16 in)",
      "1x Premium Jute Table Runner",
      "1x Set of Jute Coasters (6 pcs)",
    ],
    originalPrice: 1500,
    bundlePrice: 1350,
    discountPct: 10,
    tagBn: "🔥 সর্বাধিক বিক্রিত",
    tagEn: "🔥 Bestseller",
    artSlug: "jute-cushion-cover",
  },
  {
    id: "BN2",
    titleBn: "কিচেন ও ডাইনিং প্রিমিয়াম বান্ডেল",
    titleEn: "Kitchen & Dining Premium Set",
    slug: "kitchen-dining-premium-bundle",
    itemsBn: [
      "১ সেট গোল পাটের প্লেসম্যাট (৬টি)",
      "১টি হ্যান্ডমেড পাটের টেবিল রানার",
      "১ সেট পাটের কোস্টার (৬টি)",
    ],
    itemsEn: [
      "1x Set of Jute Placemats (6 pcs)",
      "1x Handcrafted Jute Table Runner",
      "1x Set of Jute Coasters (6 pcs)",
    ],
    originalPrice: 1700,
    bundlePrice: 1490,
    discountPct: 12,
    tagBn: "✨ নতুন কম্বো",
    tagEn: "✨ New Combo",
    artSlug: "jute-table-runner",
  },
  {
    id: "BN3",
    titleBn: "ইকো লিভিং স্টোরেজ ডুও",
    titleEn: "Eco Living Storage Duo",
    slug: "eco-living-storage-duo",
    itemsBn: [
      "১টি বড় সাইজের পাটের স্টোরেজ ঝুড়ি",
      "১টি ঐতিহ্যবাহী পাটের শিকা (প্ল্যান্টার)",
    ],
    itemsEn: [
      "1x Large Jute Storage Basket",
      "1x Traditional Jute Plant Hanger (Shika)",
    ],
    originalPrice: 1250,
    bundlePrice: 1090,
    discountPct: 13,
    tagBn: "🌿 পরিবেশবান্ধব",
    tagEn: "🌿 Eco Choice",
    artSlug: "jute-storage-basket",
  },
];

export default function BundlesPage() {
  const { addToCart, setIsMiniCartOpen } = useCart();
  const { locale, formatPrice, t } = useLanguage();
  const [addedBundleId, setAddedBundleId] = useState<string | null>(null);

  const handleAddBundle = (bundle: BundleItem) => {
    // Add primary representative product to cart
    const prod = PRODUCTS.find((p) => p.slug.includes(bundle.artSlug)) || PRODUCTS[0];
    addToCart(prod, { ...prod.variants[0], price: bundle.bundlePrice, bn: bundle.titleBn, en: bundle.titleEn }, 1);
    setAddedBundleId(bundle.id);
    setIsMiniCartOpen(true);
    setTimeout(() => setAddedBundleId(null), 2500);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-12 pb-24">
      {/* Header */}
      <div className="border-b border-sand pb-6">
        <div className="flex items-center gap-2 text-xs text-ink/60 mb-2">
          <Link href="/" className="hover:text-leaf">
            {locale === "bn" ? "হোম" : "Home"}
          </Link>
          <span>/</span>
          <span className="text-leaf font-medium">
            {locale === "bn" ? "বান্ডেল অফার" : "Bundles"}
          </span>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-bold text-clay uppercase tracking-wider">
              {locale === "bn" ? "কম্বো অফার ও সর্বোচ্চ সাশ্রয়" : "Curated Gift & Living Sets"}
            </span>
            <h1 className="text-3xl sm:text-4xl font-bold font-bn-display text-forest mt-1">
              {locale === "bn" ? "বিশেষ বান্ডেল অফার" : "Exclusive Bundles"}
            </h1>
            <p className="text-sm text-ink/75 mt-2 font-bn max-w-2xl leading-relaxed">
              {locale === "bn"
                ? "একসাথে কিনুন, বেশি সাশ্রয় করুন! আপনার ঘরের নান্দনিক সাজ কিংবা প্রিয়জনকে উপহারের জন্য কিউরেটেড পাটজাত পণ্যের স্পেশাল বান্ডেল।"
                : "Buy together, save more! Specially curated handcrafted jute living sets perfect for home styling and premium gifting."}
            </p>
          </div>
          <div className="inline-flex items-center gap-2 bg-leaf/10 border border-leaf/30 text-leaf px-4 py-2 rounded-xl text-xs font-semibold">
            <Truck className="w-4 h-4" />
            <span>{locale === "bn" ? "সকল বান্ডেলে সারা দেশে ফ্রি হোম ডেলিভারি" : "Free delivery on all bundles"}</span>
          </div>
        </div>
      </div>

      {/* Bundles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {BUNDLES_DATA.map((bundle) => {
          const savings = bundle.originalPrice - bundle.bundlePrice;
          const isAdded = addedBundleId === bundle.id;

          return (
            <div
              key={bundle.id}
              className="bg-white border-2 border-sand hover:border-leaf/50 rounded-2xl p-6 shadow-card hover:shadow-pop transition-all flex flex-col justify-between relative overflow-hidden"
            >
              {/* Badge */}
              <div className="flex justify-between items-start mb-4">
                <span className="px-3 py-1 bg-jute/20 text-forest text-xs font-bold rounded-full border border-jute/40">
                  {locale === "bn" ? bundle.tagBn : bundle.tagEn}
                </span>
                <span className="px-2.5 py-0.5 bg-clay text-white text-xs font-bold rounded-md">
                  {bundle.discountPct}% {locale === "bn" ? "ছাড়" : "OFF"}
                </span>
              </div>

              {/* Artwork Frame */}
              <div className="relative w-full aspect-square rounded-xl bg-gradient-to-b from-cream via-[#f5ede0] to-[#ecd9be] border border-sand p-6 flex items-center justify-center mb-6">
                <ProductArt slug={bundle.artSlug} className="w-44 h-44 object-contain drop-shadow-md" />
              </div>

              {/* Content */}
              <div className="space-y-4 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-bold font-bn-display text-forest">
                    {locale === "bn" ? bundle.titleBn : bundle.titleEn}
                  </h3>

                  {/* Included Items Checklist */}
                  <div className="mt-4 pt-3 border-t border-sand/60 space-y-2">
                    <span className="text-[11px] font-bold text-ink/60 uppercase block">
                      {locale === "bn" ? "বান্ডেলের মধ্যে যা থাকছে:" : "Includes in this bundle:"}
                    </span>
                    <ul className="space-y-1.5 text-xs text-ink/80 font-bn">
                      {(locale === "bn" ? bundle.itemsBn : bundle.itemsEn).map((it, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-leaf flex-shrink-0 mt-0.5" />
                          <span>{it}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Price and CTA */}
                <div className="pt-5 border-t border-sand space-y-3">
                  <div className="flex items-baseline justify-between">
                    <div>
                      <span className="text-xs text-ink/50 line-through mr-2">
                        {formatPrice(bundle.originalPrice)}
                      </span>
                      <span className="text-2xl font-bold font-bn-display text-forest">
                        {formatPrice(bundle.bundlePrice)}
                      </span>
                    </div>
                    <span className="text-xs text-clay font-bold bg-clay/10 px-2 py-0.5 rounded">
                      {locale === "bn" ? `সাশ্রয় ${formatPrice(savings)}` : `Save ${formatPrice(savings)}`}
                    </span>
                  </div>

                  <Button
                    variant="primary"
                    size="md"
                    className="w-full flex items-center justify-center gap-2 shadow-sm min-h-[44px]"
                    onClick={() => handleAddBundle(bundle)}
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>
                      {isAdded
                        ? locale === "bn"
                          ? "✓ যোগ হয়েছে!"
                          : "✓ Added!"
                        : locale === "bn"
                        ? "বান্ডেল ব্যাগে যোগ করুন"
                        : "Add Bundle to Bag"}
                    </span>
                  </Button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom Guarantee Banner */}
      <div className="bg-sand/30 border border-sand rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-leaf text-white flex items-center justify-center flex-shrink-0">
            <Gift className="w-6 h-6" />
          </div>
          <div>
            <h4 className="font-bold text-forest text-base">
              {locale === "bn" ? "কর্পোরেট বা উপহারের জন্য বিশেষ কাস্টমাইজেশন চান?" : "Looking for Custom Gift Sets?"}
            </h4>
            <p className="text-xs text-ink/75 mt-0.5 font-bn">
              {locale === "bn"
                ? "যেকোনো অনুষ্ঠানের জন্য ৫০+ বান্ডেলে লোগো প্রিন্ট ও স্পেশাল গিফট প্যাকেজিং সুবিধা রয়েছে।"
                : "Custom logo printing and bespoke gift boxes available for bulk corporate orders (50+ sets)."}
            </p>
          </div>
        </div>
        <Button href="/b2b" variant="secondary" size="sm" className="whitespace-nowrap">
          {locale === "bn" ? "কর্পোরেট কোট চান →" : "Request B2B Quote →"}
        </Button>
      </div>
    </div>
  );
}
