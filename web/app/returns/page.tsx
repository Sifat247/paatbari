"use client";

import React from "react";
import Link from "next/link";
import { useLanguage } from "@/lib/i18n-context";
import { RotateCcw, AlertCircle, ShieldCheck, CheckCircle2 } from "lucide-react";

export default function ReturnsPolicyPage() {
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
            {locale === "bn" ? "রিটার্ন ও রিফান্ড নীতি" : "Returns & Refund Policy"}
          </span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold font-bn-display text-forest">
          {locale === "bn" ? "রিটার্ন, এক্সচেঞ্জ ও রিফান্ড নীতি" : "Return, Exchange & Refund Policy"}
        </h1>
        <p className="text-xs text-ink/60 mt-1">
          {locale === "bn" ? "সর্বশেষ হালনাগাদ: ২৭ সেপ্টেম্বর ২০২৬" : "Last updated: 27 September 2026"}
        </p>
      </div>

      {/* Main Content */}
      <div className="bg-white border border-sand rounded-2xl p-6 sm:p-10 shadow-card space-y-8 text-sm text-ink/80 leading-relaxed">
        {/* Section 1 */}
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-forest flex items-center gap-2">
            <RotateCcw className="w-5 h-5 text-leaf" />
            <span>{locale === "bn" ? "১. ৭ দিনের ফ্রি রিপ্লেসমেন্ট গ্যারান্টি" : "1. 7-Day Hassle-Free Replacement"}</span>
          </h2>
          <p>
            {locale === "bn"
              ? "পাটবাড়ি থেকে ক্রয়কৃত যেকোনো পণ্যে যদি কারিগরি ত্রুটি, সাইজ অমিল বা ভুল পণ্য ডেলিভারি হয়, তবে পণ্য গ্রহণের দিন থেকে পরবর্তী ৭ (সাত) দিনের মধ্যে বিনামূল্যে এক্সচেঞ্জ সুবিধা উপভোগ করতে পারবেন।"
              : "If an item arrives defective or mismatched, notify us within 7 days of delivery for a 100% free product replacement."}
          </p>
        </section>

        {/* Section 2 */}
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-forest flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-leaf" />
            <span>{locale === "bn" ? "২. রিটার্ন গ্রহণের শর্তাবলী" : "2. Return Eligibility Criteria"}</span>
          </h2>
          <ul className="list-disc list-inside space-y-2 text-xs sm:text-sm pl-2">
            <li>পণ্যটি অব্যবহৃত এবং মূল প্যাকেজিং ও ট্যাগসহ থাকতে হবে।</li>
            <li>ক্ষতিগ্রস্ত বা ছেঁড়া পণ্যের ক্ষেত্রে আনবক্সিং বা ডেলিভারির সময় ধারণকৃত ছবি/ভিডিও প্রমাণ প্রয়োজন হবে।</li>
            <li>কর্পোরেট কাস্টম অর্ডারে (যেখানে ক্লায়েন্টের নিজস্ব লোগো প্রিন্ট করা হয়েছে) প্রুফ অনুমোদনের পর কোনো রিটার্ন প্রযোজ্য নয়, তবে প্রিন্টিংয়ে কারিগরি ত্রুটি থাকলে সম্পূর্ণ পুনরায় তৈরি করে দেওয়া হবে।</li>
          </ul>
        </section>

        {/* Section 3 */}
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-forest flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-leaf" />
            <span>{locale === "bn" ? "৩. রিফান্ড প্রক্রিয়া ও সময়সীমা" : "3. Refund Processing Timeline"}</span>
          </h2>
          <p>
            {locale === "bn"
              ? "রিটার্নকৃত পণ্য আমাদের ওয়্যারহাউসে পৌঁছানোর পর কোয়ালিটি যাচাই সম্পন্ন হলে ৩ কার্যদিবসের মধ্যে রিফান্ড অনুমোদন করা হয়।"
              : "Once the returned parcel reaches our facility and undergoes inspection, refunds are processed within 3 working days."}
          </p>
          <div className="bg-sand/30 p-4 rounded-xl space-y-2 text-xs text-forest">
            <p>
              • <strong>মোবাইল ব্যাংকিং (bKash / Nagad / Rocket):</strong> অনুমোদন পাওয়ার ২৪ থেকে ৪৮ ঘণ্টার মধ্যে রিফান্ড জমা হবে।
            </p>
            <p>
              • <strong>ডেবিট / ক্রেডিট কার্ড:</strong> ব্যাংকিং নিয়ম অনুযায়ী ৫ থেকে ৭ কার্যদিবসের মধ্যে আপনার মূল অ্যাকাউন্টে ফেরত যাবে।
            </p>
            <p>
              • <strong>ক্যাশ অন ডেলিভারি (COD):</strong> গ্রাহকের বিকাশ বা ব্যাংক অ্যাকাউন্টে ইলেকট্রনিক ফান্ড ট্রান্সফার করা হবে।
            </p>
          </div>
        </section>

        {/* Section 4 */}
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-forest flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-clay" />
            <span>{locale === "bn" ? "৪. কীভাবে রিটার্ন রিকোয়েস্ট করবেন?" : "4. How to Request a Return"}</span>
          </h2>
          <p>
            {locale === "bn"
              ? "রিটার্ন বা এক্সচেঞ্জের জন্য আপনার অর্ডার নম্বর এবং পণ্যের ছবিসহ সরাসরি আমাদের হোয়াটসঅ্যাপ নাম্বারে (+880 1700-000000) অথবা support@paatbari.com এ মেসেজ পাঠান। আমাদের ডেডিকেটেড টিম আপনার পার্সেল পিকআপের ব্যবস্থা করবে।"
              : "To initiate a return, WhatsApp your Order ID and photo evidence to +880 1700-000000 or email support@paatbari.com."}
          </p>
        </section>
      </div>
    </div>
  );
}
