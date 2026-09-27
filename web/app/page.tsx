"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { ProductCard } from "@/components/ui/ProductCard";
import { Badge } from "@/components/ui/Badge";
import { PriceTag } from "@/components/ui/PriceTag";
import { CATEGORIES, PRODUCTS, BUNDLE_PROMO } from "@/lib/catalog";
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
} from "lucide-react";

export default function HomePage() {
  const [b2bQty, setB2bQty] = useState(100);
  const bestsellers = PRODUCTS.filter((p) => p.isBestseller);

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
      <section className="relative overflow-hidden bg-gradient-to-b from-cream via-sand/25 to-cream border-b border-sand/60 py-16 sm:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-leaf/10 text-leaf text-xs sm:text-sm font-semibold border border-leaf/20">
                <Sparkles className="w-4 h-4 text-jute" />
                <span>প্রকৃতি ও ঐতিহ্যের মেলবন্ধন</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-bn-display text-forest tracking-tight leading-[1.25]">
                সোনালি আঁশের গল্প, আপনার ঘরে
              </h1>

              <p className="text-base sm:text-lg text-ink/80 max-w-xl mx-auto lg:mx-0 leading-relaxed font-bn">
                হাতে বোনা পাটের ব্যাগ, হোম ডেকোর আর গিফট — সারা বাংলাদেশে ক্যাশ অন ডেলিভারি। পরিবেশের সুরক্ষায় টেকসই জীবনের সঙ্গী।
              </p>

              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
                <Link href="/shop">
                  <Button variant="primary" size="lg" className="flex items-center gap-2 shadow-md">
                    <ShoppingBag className="w-5 h-5" />
                    <span>শপ করুন</span>
                  </Button>
                </Link>

                <Link href="/b2b">
                  <Button variant="quote" size="lg" className="flex items-center gap-2 shadow-md">
                    <Briefcase className="w-5 h-5" />
                    <span>কর্পোরেট অর্ডার</span>
                  </Button>
                </Link>
              </div>

              {/* Highlights */}
              <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-ink/70">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-leaf" />
                  <span>৬৪ জেলায় ডেলিভারি</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-leaf" />
                  <span>৳২,৫০০+ অর্ডারে ফ্রি ডেলিভারি</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-leaf" />
                  <span>ক্যাশ অন ডেলিভারি (COD)</span>
                </div>
              </div>
            </div>

            {/* Right Lifestyle Placeholder Frame */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-full max-w-md aspect-[4/5] rounded-2xl bg-white border-2 border-sand p-6 shadow-pop flex flex-col justify-between overflow-hidden group">
                <div className="absolute top-4 right-4 z-10">
                  <Badge variant="handmade">১০০% প্রাকৃতিক পাট</Badge>
                </div>

                <div className="flex-1 flex flex-col items-center justify-center text-center p-6">
                  <div className="w-24 h-24 rounded-full bg-sand/50 flex items-center justify-center text-leaf mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Leaf className="w-12 h-12 text-leaf" />
                  </div>
                  <h3 className="font-bn-display text-xl font-bold text-forest">
                    হস্তশিল্প ও গ্রামীণ ঐতিহ্য
                  </h3>
                  <p className="text-xs text-ink/70 mt-2 max-w-xs leading-relaxed">
                    বাংলাদেশের দক্ষ কারিগরদের পরম মমতায় তৈরি প্রতিটি পাটপণ্য প্লাস্টিকমুক্ত পরিচ্ছন্ন আগামীর প্রতীক।
                  </p>
                </div>

                <div className="bg-cream/80 backdrop-blur-xs rounded-xl p-3.5 border border-sand/60 flex items-center justify-between text-xs">
                  <div>
                    <span className="font-semibold text-leaf">ক্লাসিক টোট ব্যাগ</span>
                    <p className="text-ink/60">শুরু মাত্র ৳৪৫০ থেকে</p>
                  </div>
                  <Link href="/shop" className="text-leaf font-bold hover:underline flex items-center gap-1">
                    <span>দেখুন</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Category Tiles (6) */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 space-y-8">
        <div className="text-center space-y-2">
          <span className="text-xs font-semibold text-jute-deep uppercase tracking-wider">
            কালেকশন অনুযায়ী বেছে নিন
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold font-bn-display text-forest">
            পণ্য বিভাগ
          </h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.key}
              href={`/shop?category=${cat.key}`}
              className="group bg-white border border-sand hover:border-leaf/50 p-5 rounded-xl text-center shadow-card hover:shadow-pop transition-all flex flex-col items-center justify-center gap-3"
            >
              <div className="w-14 h-14 rounded-full bg-cream group-hover:bg-leaf/10 flex items-center justify-center text-leaf transition-colors">
                <ShoppingBag className="w-7 h-7" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-ink group-hover:text-leaf transition-colors">
                  {cat.bn}
                </h3>
                <span className="text-[11px] text-ink/50 block mt-0.5">
                  {cat.count}টি পণ্য
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
              onQuickAdd={(id) => alert(`পণ্য ব্যাগে যোগ করা হয়েছে (${id})`)}
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
        <div className="bg-gradient-to-r from-forest via-[#1b4333] to-forest text-white rounded-2xl p-8 sm:p-12 shadow-pop relative overflow-hidden">
          <div className="max-w-xl space-y-5 relative z-10">
            <div className="inline-block px-3 py-1 bg-jute text-ink text-xs font-bold rounded-full">
              🔥 বিশেষ বান্ডেল অফার · ১০% ছাড়
            </div>

            <h2 className="text-3xl sm:text-4xl font-bold font-bn-display text-white">
              {BUNDLE_PROMO.bn}
            </h2>

            <p className="text-sm text-sand/90 leading-relaxed font-bn">
              {BUNDLE_PROMO.itemsText}। আপনার ঘরকে আধুনিক ও প্রাকৃতিক সাজে সাজিয়ে তুলুন এক সেটেই।
            </p>

            <div className="flex items-baseline gap-4 pt-2">
              <span className="text-3xl font-bold font-bn-display text-jute">
                ৳১,৩৫০
              </span>
              <span className="text-base text-sand/60 line-through">
                ৳১,৫০০
              </span>
              <span className="text-xs text-sand/80 bg-white/10 px-2 py-0.5 rounded">
                সেভ করুন ৳১৫০
              </span>
            </div>

            <div className="pt-2">
              <Button
                variant="jute"
                size="lg"
                onClick={() => alert("ইকো হোম স্টার্টার বান্ডেল কার্টে যোগ হয়েছে!")}
                className="font-bold shadow-md"
              >
                বান্ডেল কার্টে যোগ করুন
              </Button>
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
            onClick={() => alert("অর্ডার ডেলিভারির পর রিভিউ সাবমিট করার লিংক এসএমএসে পৌঁছে যাবে।")}
          >
            রিভিউ লিখুন
          </Button>
        </div>
      </section>

      {/* 8. Newsletter & WhatsApp Join */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="bg-sand/30 border border-sand rounded-2xl p-8 sm:p-12 text-center space-y-6">
          <div className="max-w-xl mx-auto space-y-2">
            <h2 className="text-2xl sm:text-3xl font-bold font-bn-display text-forest">
              পাটকথার সাথে সবসময় যুক্ত থাকুন
            </h2>
            <p className="text-xs sm:text-sm text-ink/75 leading-relaxed font-bn">
              নতুন পণ্যের আগমন, বিশেষ মূল্যছাড় ও পরিবেশবান্ধব লাইফস্টাইল টিপস পেতে সরাসরি হোয়াটসঅ্যাপ বা ইমেইলে নোটিফিকেশন পান।
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 max-w-md mx-auto">
            <a
              href="https://wa.me/8801700000000?text=I%20want%20to%20join%20PaatKotha%20community"
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
