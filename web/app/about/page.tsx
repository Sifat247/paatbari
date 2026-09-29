"use client";

import React from "react";
import Link from "next/link";
import { useLanguage } from "@/lib/i18n-context";
import { Button } from "@/components/ui/Button";
import {
  Sparkles,
  Heart,
  Leaf,
  ShieldCheck,
  Users,
  Compass,
  ArrowRight,
} from "lucide-react";

export default function AboutPage() {
  const { locale } = useLanguage();

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-16 space-y-16 pb-24">
      {/* Hero Section */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <span className="text-xs font-bold text-jute-deep uppercase tracking-widest bg-jute/20 px-3 py-1 rounded-full border border-jute/30">
          {locale === "bn" ? "আমাদের গল্প" : "Our Story"}
        </span>
        <h1 className="text-3xl sm:text-5xl font-bold font-bn-display text-forest leading-tight">
          {locale === "bn"
            ? "বাংলার সোনালি আঁশ, বিশ্বমানের আধুনিক রূপ"
            : "Reimagining the Golden Fibre for Modern Living"}
        </h1>
        <p className="text-sm sm:text-base text-ink/75 font-bn leading-relaxed">
          {locale === "bn"
            ? "পাটবাড়ি (Paatbari) শুধুমাত্র একটি ব্র্যান্ড নয় — এটি বাংলার ঐতিহ্যবাহী সোনালি আঁশের পুনর্জাগরণ এবং প্লাস্টিকমুক্ত টেকসই জীবনযাত্রার এক অঙ্গীকার।"
            : "Paatbari is more than a brand — it is a movement to revive Bangladesh's timeless golden fibre with contemporary artisanal craftsmanship and zero-plastic integrity."}
        </p>
      </div>

      {/* Narrative Section with Jute Texture background */}
      <div className="bg-sand/30 border border-sand rounded-2xl p-8 sm:p-12 shadow-card space-y-6">
        <h2 className="text-2xl font-bold font-bn-display text-forest border-b border-sand pb-3">
          {locale === "bn" ? "সোনালি আঁশের বাড়ি — পাটবাড়ির সূচনা" : "How Paatbari Began"}
        </h2>
        <div className="space-y-4 text-sm sm:text-base text-ink/80 leading-relaxed font-bn">
          <p>
            {locale === "bn"
              ? "একসময় বাংলার পাট ছিল বিশ্বের সবচেয়ে সমাদৃত প্রাকৃতিক তন্তু। কিন্তু কালের পরিক্রমায় সস্তা সিন্থেটিক ও প্লাস্টিকের আগ্রাসনে হারিয়ে যেতে বসেছিল এই ঐতিহ্য। সেই শূন্যতা থেকেই পাটবাড়ির যাত্রা শুরু — আমাদের লক্ষ্য আধুনিক তরুণ প্রজন্ম ও পরিবেশসচেতন নাগরিকদের কাছে পাটপণ্যকে প্রিমিয়াম, স্টাইলিশ ও দীর্ঘস্থায়ী হিসেবে ফিরিয়ে আনা।"
              : "Once revered globally as the finest natural fibre, Bengal jute lost ground to synthetic mass-produced plastics. Paatbari was born from a desire to reclaim that glory — crafting elegant, highly functional, and sustainable lifestyle essentials for conscious homes."}
          </p>
          <p>
            {locale === "bn"
              ? "ফরিদপুর, জামালপুর ও টাঙ্গাইলের গ্রামীণ নারী কারিগর ও অভিজ্ঞ তাঁতিদের প্রত্যক্ষ তত্ত্বাবধানে তৈরি হয় আমাদের প্রতিটি টোট ব্যাগ, স্টোরেজ ঝুড়ি ও ফ্লোর ম্যাট। কোনো রাসায়নিক ব্লীচ ছাড়া, প্রাকৃতিক সুতায় হাতে বোনা প্রতিটি পণ্য বহন করে দেশীয় মাটির উষ্ণ অনুভূতি।"
              : "Every tote, basket, and rug is handcrafted by rural women artisans and master weavers across Faridpur and Tangail. Using unbleached, eco-processed raw jute, each piece embodies genuine warmth, durability, and ethical pride."}
          </p>
        </div>
      </div>

      {/* Core Values Pillars */}
      <div className="space-y-8">
        <div className="text-center space-y-2">
          <span className="text-xs font-bold text-leaf uppercase tracking-wider">
            {locale === "bn" ? "আমাদের মূল দর্শন" : "Core Philosophy"}
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold font-bn-display text-forest">
            {locale === "bn" ? "যে ৩টি মূলনীতিতে আমরা অবিচল" : "Our Three Guiding Commitments"}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white border border-sand p-6 rounded-xl shadow-card space-y-3">
            <div className="w-12 h-12 rounded-full bg-leaf/10 text-leaf flex items-center justify-center">
              <Leaf className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-forest">
              {locale === "bn" ? "১০০% প্রাকৃতিক ও শূন্য প্লাস্টিক" : "100% Pure & Zero Plastic"}
            </h3>
            <p className="text-xs text-ink/75 leading-relaxed font-bn">
              {locale === "bn"
                ? "আমাদের উৎপাদনে ও প্যাকেজিংয়ে কোনো ক্ষতিকর পলিথিন বা প্লাস্টিক ব্যবহার করা হয় না। শতভাগ বায়োডিগ্রেডেবল ও পরিবেশবান্ধব।"
                : "Zero single-use plastic used in manufacturing or packaging. 100% compostable and gentle on Mother Earth."}
            </p>
          </div>

          <div className="bg-white border border-sand p-6 rounded-xl shadow-card space-y-3">
            <div className="w-12 h-12 rounded-full bg-jute/20 text-forest flex items-center justify-center">
              <Users className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-forest">
              {locale === "bn" ? "ন্যায্য মজুরি ও নারী ক্ষমতায়ন" : "Fair Wages & Empowerment"}
            </h3>
            <p className="text-xs text-ink/75 leading-relaxed font-bn">
              {locale === "bn"
                ? "গ্রামীণ নারী কারিগর ও তাঁতিদের জন্য সরাসরি কর্মসংস্থান এবং বাজারে ন্যায্য মূল্যায়ন নিশ্চিত করে জীবনযাত্রার মান উন্নয়ন।"
                : "Direct partnership with artisan collectives ensuring dignified living wages and sustainable livelihoods."}
            </p>
          </div>

          <div className="bg-white border border-sand p-6 rounded-xl shadow-card space-y-3">
            <div className="w-12 h-12 rounded-full bg-clay/10 text-clay flex items-center justify-center">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-forest">
              {locale === "bn" ? "নিখুঁত কোয়ালিটি ও স্বচ্ছতা" : "Artisanal Quality & Trust"}
            </h3>
            <p className="text-xs text-ink/75 leading-relaxed font-bn">
              {locale === "bn"
                ? "প্রতিটি সেলাই ও বুননে কঠোর মান নিয়ন্ত্রণ। কোনো কৃত্রিম বা ভুয়া রিভিউ নয় — গ্রাহকের প্রকৃত সন্তুষ্টিই আমাদের শক্তি।"
                : "Rigorous quality inspections on every weave and seam. Zero fake reviews and transparent nationwide service."}
            </p>
          </div>
        </div>
      </div>

      {/* Founder & Artisan Heritage Section */}
      <div className="bg-gradient-to-br from-cream via-sand/30 to-cream border border-sand/80 rounded-3xl p-8 sm:p-12 shadow-card grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-6 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-leaf/10 text-leaf text-xs font-semibold border border-leaf/20">
            <Sparkles className="w-3.5 h-3.5 text-jute" />
            <span>{locale === "bn" ? "প্রতিষ্ঠাতার ভাবনা" : "Founder's Vision"}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold font-bn-display text-forest">
            {locale === "bn" ? "ঐতিহ্য ও আধুনিকতার মেলবন্ধন" : "Heritage Meets Modern Design"}
          </h2>
          <p className="text-xs sm:text-sm text-ink/80 leading-relaxed font-bn">
            {locale === "bn"
              ? "পাটবাড়ি (Paatbari)-এর যাত্রা শুরু মানিকগঞ্জ থেকে। প্রতিষ্ঠাতা সিফাত সাঈকী (Sifat Phychee) বাংলার লোকশিল্প ও সোনালি আঁশের দীর্ঘ ঐতিহ্যকে বিশ্বমানের আধুনিক লাইফস্টাইল ব্র্যান্ডে রূপান্তরের স্বপ্ন দেখেছেন। মানিকগঞ্জ এবং দেশের বিভিন্ন প্রান্তের নিপুণ কারিগরদের হাত ধরে প্রতিটি পণ্য পৌঁছে যাচ্ছে প্রকৃতিপ্রেমী মানুষের ঘরে।"
              : "Paatbari's story stems from Manikganj, founded by Sifat Phychee with a vision to transform Bengal's indigenous golden fibre into globally admired contemporary lifestyle essentials while empowering rural artisanal communities."}
          </p>
          <div className="pt-2 border-t border-sand/60 flex items-center justify-between text-xs">
            <div>
              <p className="font-bold text-forest text-sm">{locale === "bn" ? "সিফাত সাঈকী (Sifat Phychee)" : "Sifat Phychee"}</p>
              <p className="text-ink/60 text-[11px]">
                {locale === "bn" ? "প্রতিষ্ঠাতা ও প্রধান নির্বাহী, পাটবাড়ি" : "Founder & Owner, Paatbari"}
              </p>
            </div>
            <div className="text-right">
              <span className="text-jute-deep font-semibold block text-[11px]">
                {locale === "bn" ? "মানিকগঞ্জ সদর, মানিকগঞ্জ ১৮০০" : "Manikganj Sadar, Manikganj"}
              </span>
              <span className="text-ink/50 text-[10px]">{locale === "bn" ? "বাংলাদেশ" : "Bangladesh"}</span>
            </div>
          </div>
        </div>
        <div className="lg:col-span-6 relative">
          <div className="relative rounded-2xl overflow-hidden shadow-pop border-2 border-sand/80 aspect-[4/3] group">
            <img
              src="/images/artisan/artisan-loom.jpg"
              alt="Artisan hand-weaving golden jute at Paatbari workshop"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-forest/80 via-transparent to-transparent opacity-80" />
            <div className="absolute bottom-3 left-4 right-4 text-white text-xs">
              <span className="font-bold text-sm block">{locale === "bn" ? "ঐতিহ্যবাহী তাঁত ও নিপুণ কারুশিল্প" : "Traditional Loom & Master Craftsmanship"}</span>
              <span className="text-white/80 text-[11px]">{locale === "bn" ? "হাতে বোনা ১০০% খাঁটি পাটজাত পণ্য" : "Handwoven 100% Pure Jute Products"}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Call to action */}
      <div className="bg-forest text-white rounded-2xl p-8 sm:p-12 text-center space-y-6 shadow-pop">
        <h2 className="text-2xl sm:text-3xl font-bold font-bn-display text-sand">
          {locale === "bn" ? "আপনার ঘরের সৌন্দর্যে যুক্ত করুন সোনালি আঁশ" : "Bring Golden Jute into Your Daily Life"}
        </h2>
        <p className="text-xs sm:text-sm text-sand/80 max-w-lg mx-auto font-bn leading-relaxed">
          {locale === "bn"
            ? "আমাদের শপ থেকে আজই বেছে নিন আপনার পছন্দের ব্যাগ, ঝুড়ি বা টেবিল রানার। ৬৪ জেলায় হোম ডেলিভারি সুবিধা।"
            : "Explore our collection of durable tote bags, artisan storage baskets, and natural living accents."}
        </p>
        <div className="flex flex-wrap justify-center gap-4 pt-2">
          <Link href="/shop">
            <Button variant="jute" size="lg" className="font-bold flex items-center gap-2">
              <span>{locale === "bn" ? "পণ্য কালেকশন দেখুন" : "Explore Shop"}</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
          <Link href="/contact">
            <Button variant="secondary" size="lg" className="bg-white/10 text-white hover:bg-white/20 border-white/30">
              {locale === "bn" ? "আমাদের সাথে যোগাযোগ" : "Contact Us"}
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
