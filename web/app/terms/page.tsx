"use client";

import React from "react";
import Link from "next/link";
import { useLanguage } from "@/lib/i18n-context";
import { FileText, ShieldCheck, CheckCircle2, AlertTriangle } from "lucide-react";

export default function TermsPage() {
  const { locale } = useLanguage();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-16 space-y-10 pb-24 font-bn">
      {/* Title */}
      <div className="border-b border-sand pb-4">
        <div className="flex items-center gap-2 text-xs text-ink/60 mb-2">
          <Link href="/" className="hover:text-leaf">
            {locale === "bn" ? "হোম" : "Home"}
          </Link>
          <span>/</span>
          <span className="text-leaf font-medium">
            {locale === "bn" ? "শর্তাবলী" : "Terms"}
          </span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold font-bn-display text-forest">
          {locale === "bn" ? "ব্যবহারের শর্তাবলী (Terms of Service)" : "Terms & Conditions"}
        </h1>
        <p className="text-xs text-ink/60 mt-1">
          {locale === "bn" ? "সর্বশেষ হালনাগাদ: ২৭ সেপ্টেম্বর ২০২৬" : "Last updated: 27 September 2026"}
        </p>
      </div>

      {/* Main Content */}
      <div className="bg-white border border-sand rounded-2xl p-6 sm:p-10 shadow-card space-y-8 text-sm text-ink/80 leading-relaxed">
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-forest flex items-center gap-2">
            <FileText className="w-5 h-5 text-leaf" />
            <span>{locale === "bn" ? "১. সাধারণ নিয়ম ও সেবা গ্রহণ" : "1. Acceptance of Terms"}</span>
          </h2>
          <p>
            {locale === "bn"
              ? "পাটবাড়ি (paatbari.com) ওয়েবসাইট বা মোবাইল অ্যাপ্লিকেশন ব্যবহার করে যেকোনো অর্ডার সম্পাদন করার মাধ্যমে আপনি এই শর্তাবলীর প্রতি পূর্ণ সম্মতি জ্ঞাপন করছেন।"
              : "By accessing and placing orders through Paatbari, you agree to be bound by these Terms of Service."}
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-forest flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-leaf" />
            <span>{locale === "bn" ? "২. পণ্যের মূল্য ও অর্ডার গ্রহণ" : "2. Pricing Integrity & Acceptance"}</span>
          </h2>
          <p>
            {locale === "bn"
              ? "ওয়েবসাইটে প্রদর্শিত সকল মূল্য বাংলাদেশি টাকায় (BDT) নির্ধারিত। কোনো কারিগরি ত্রুটির কারণে ভুল মূল্য প্রদর্শিত হলে পাটবাড়ি উক্ত অর্ডার সংশোধন বা বাতিল করার অধিকার সংরক্ষণ করে। তবে একবার অর্ডার কনফার্ম হয়ে ইনভয়েস জেনারেট হলে পূর্বনির্ধারিত মূল্যে পণ্য সরবরাহ নিশ্চিত করা হবে।"
              : "All prices are stated in Bangladeshi Taka (BDT). Prices snapshotted at invoice confirmation remain guaranteed."}
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-forest flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-leaf" />
            <span>{locale === "bn" ? "৩. হস্তনির্মিত পণ্যের অনন্যতা" : "3. Handcrafted Product Variations"}</span>
          </h2>
          <p>
            {locale === "bn"
              ? "যেহেতু আমাদের সকল পণ্য গ্রামীণ তাঁতিদের দ্বারা প্রাকৃতিক পাটের সুতায় হাতে বোনা হয়, তাই সুতার প্রাকৃতিক রঙের শেড বা বুননে সামান্য তারতম্য দেখা যেতে পারে। এটি কোনো ত্রুটি নয়, বরং খাঁটি হস্তনির্মিত পণ্যের নিজস্ব আভিজাত্য।"
              : "Due to the artisanal handloom nature of raw jute, slight organic variations in natural color tone or texture may exist, reflecting authentic artisanal individuality."}
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-forest flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-leaf" />
            <span>{locale === "bn" ? "৪. বুদ্ধিবৃত্তিক সম্পত্তি ও কপিরাইট" : "4. Intellectual Property"}</span>
          </h2>
          <p>
            {locale === "bn"
              ? "পাটবাড়ি-র ব্র্যান্ড নাম, লোগো, পণ্যের ছবি, টেক্সট ও ক্যাটালগের সকল স্বত্ব সংরক্ষিত। লিখিত অনুমতি ব্যতীত যেকোনো বাণিজ্যিক প্রতিলিপি তৈরি আইনত দণ্ডনীয়।"
              : "All trademarks, product photography, brand imagery, and text are proprietary to Paatbari."}
          </p>
        </section>
      </div>
    </div>
  );
}
