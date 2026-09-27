"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { ProductCard } from "@/components/ui/ProductCard";
import { ArrowRight, Leaf, ShieldCheck, Truck, Sparkles } from "lucide-react";

export default function HomePage() {
  return (
    <div className="space-y-16 pb-16">
      {/* 1. Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-cream via-sand/20 to-cream border-b border-sand/60 py-16 sm:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-leaf/10 text-leaf text-xs sm:text-sm font-semibold border border-leaf/20">
            <Sparkles className="w-4 h-4 text-jute" />
            <span>সোনালি আঁশের গল্প, আপনার ঘরে</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-bold font-bn-display text-forest tracking-tight max-w-3xl mx-auto leading-[1.25]">
            বাংলার ঐতিহ্যে তৈরি আধুনিক ও টেকসই পাটপণ্য
          </h1>

          <p className="text-base sm:text-lg text-ink/80 max-w-2xl mx-auto leading-relaxed">
            দৈনন্দিন ব্যবহার ও পরিবেশের সুরক্ষায় প্লাস্টিকের শ্রেষ্ঠ বিকল্প। হাতে বোনা ব্যাগ, বাস্কেট ও হোম ডেকর সরাসরি আপনার দরজায়।
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <Link href="/shop">
              <Button variant="primary" size="lg" className="flex items-center gap-2">
                <span>পণ্যসমূহ দেখুন</span>
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>

            <Link href="/b2b">
              <Button variant="quote" size="lg">
                পাইকারি ও কাস্টম কোট
              </Button>
            </Link>

            <Link href="/styleguide">
              <Button variant="secondary" size="lg">
                স্টাইলগাইড দেখুন
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* 2. Value Props */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="bg-white border border-sand p-6 rounded-xl shadow-card flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-leaf/10 text-leaf flex items-center justify-center flex-shrink-0">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-semibold text-base text-forest">সারা দেশে ক্যাশ অন ডেলিভারি</h3>
              <p className="text-xs text-ink/70 mt-1">
                ৬৪ জেলায় হোম ডেলিভারি ও পণ্য দেখে মূল্য পরিশোধের সুবিধা।
              </p>
            </div>
          </div>

          <div className="bg-white border border-sand p-6 rounded-xl shadow-card flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-jute/20 text-jute-deep flex items-center justify-center flex-shrink-0">
              <Leaf className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-semibold text-base text-forest">১০০% বায়োডিগ্রেডেবল</h3>
              <p className="text-xs text-ink/70 mt-1">
                সম্পূর্ণ প্রাকৃতিক পাটের আঁশ থেকে তৈরি, পরিবেশের কোনো ক্ষতি করে না।
              </p>
            </div>
          </div>

          <div className="bg-white border border-sand p-6 rounded-xl shadow-card flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-clay/10 text-clay flex items-center justify-center flex-shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-semibold text-base text-forest">কর্পোরেট কাস্টমাইজেশন</h3>
              <p className="text-xs text-ink/70 mt-1">
                প্রতিষ্ঠানের নিজস্ব লোগো ও ব্র্যান্ডিং সহ ৫০ পিস থেকে বাল্ক অর্ডার।
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Featured Products */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 space-y-6">
        <div className="flex items-end justify-between border-b border-sand pb-4">
          <div>
            <span className="text-xs font-semibold text-jute-deep uppercase tracking-wider">
              বেস্টসেলার কালেকশন
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold font-bn-display text-forest mt-1">
              জনপ্রিয় পাটপণ্য
            </h2>
          </div>
          <Link href="/shop" className="text-sm font-semibold text-leaf hover:underline flex items-center gap-1">
            <span>সব দেখুন</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <ProductCard
            id="P01"
            name="ক্লাসিক পাটের শপিং টোট ব্যাগ"
            slug="classic-jute-tote"
            price={450}
            badge={{ text: "জনপ্রিয়", variant: "handmade" }}
            locale="bn"
            onQuickAdd={(id) => alert(`Added ${id} to cart`)}
          />

          <ProductCard
            id="P05"
            name="হ্যান্ডমেড রাউন্ড স্টোরেজ বাস্কেট (সেট)"
            slug="handmade-storage-basket"
            price={450}
            compareAtPrice={600}
            hasVariants={true}
            badge={{ text: "অফার", variant: "sale" }}
            locale="bn"
            onQuickAdd={(id) => alert(`Added ${id} to cart`)}
          />

          <ProductCard
            id="P06"
            name="ন্যাচারাল ফ্লোর রাগ ও ম্যাট (২×৩ ফুট)"
            slug="jute-floor-rug"
            price={1200}
            badge={{ text: "১০০% প্রাকৃতিক", variant: "eco" }}
            locale="bn"
            onQuickAdd={(id) => alert(`Added ${id} to cart`)}
          />

          <ProductCard
            id="P07"
            name="হস্তনির্মিত পাটের কুশন কভার"
            slug="jute-cushion-cover"
            price={350}
            locale="bn"
            onQuickAdd={(id) => alert(`Added ${id} to cart`)}
          />
        </div>
      </section>
    </div>
  );
}
