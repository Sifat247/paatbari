"use client";

import React from "react";
import Link from "next/link";
import { useLanguage } from "@/lib/i18n-context";
import { Lock, Eye, Database, Trash2, ShieldCheck } from "lucide-react";

export default function PrivacyPolicyPage() {
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
            {locale === "bn" ? "গোপনীয়তা নীতি" : "Privacy Policy"}
          </span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold font-bn-display text-forest">
          {locale === "bn" ? "গ্রাহক গোপনীয়তা নীতিমালা" : "Customer Privacy Policy"}
        </h1>
        <p className="text-xs text-ink/60 mt-1">
          {locale === "bn" ? "সর্বশেষ হালনাগাদ: ২৭ সেপ্টেম্বর ২০২৬" : "Last updated: 27 September 2026"}
        </p>
      </div>

      {/* Main Content */}
      <div className="bg-white border border-sand rounded-2xl p-6 sm:p-10 shadow-card space-y-8 text-sm text-ink/80 leading-relaxed">
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-forest flex items-center gap-2">
            <Lock className="w-5 h-5 text-leaf" />
            <span>{locale === "bn" ? "১. আমাদের অঙ্গীকার" : "1. Our Privacy Commitment"}</span>
          </h2>
          <p>
            {locale === "bn"
              ? "পাটবাড়ি (Paatbari) আপনার ব্যক্তিগত তথ্যের গোপনীয়তা ও সুরক্ষায় সর্বোচ্চ অগ্রাধিকার দেয়। এই নীতিমালায় স্পষ্টভাবে বর্ণনা করা হয়েছে আমরা কীভাবে আপনার তথ্য সংগ্রহ, সংরক্ষণ ও ব্যবহার করি।"
              : "Paatbari is committed to safeguarding customer personal data in accordance with digital data protection principles."}
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-forest flex items-center gap-2">
            <Database className="w-5 h-5 text-leaf" />
            <span>{locale === "bn" ? "২. সংগৃহীত তথ্যাবলী" : "2. Information We Collect"}</span>
          </h2>
          <p>
            {locale === "bn"
              ? "অর্ডার প্রসেসিং ও ডেলিভারির সুবিধার্থে আমরা নিম্নোক্ত তথ্যাবলী সংগ্রহ করে থাকি:"
              : "To process your purchases and fulfill courier deliveries, we collect:"}
          </p>
          <ul className="list-disc list-inside space-y-1.5 pl-2 text-xs sm:text-sm">
            <li>{locale === "bn" ? "গ্রাহকের পূর্ণ নাম, মোবাইল নম্বর এবং সম্পূর্ণ ডেলিভারি ঠিকানা (জেলা, থানা ও বাড়ি নম্বর)।" : "Customer full name, mobile number, and complete delivery address (district, area, and house number)."}</li>
            <li>{locale === "bn" ? "পেমেন্ট ট্রানজ্যাকশন আইডি ও পেমেন্ট মেথড (আমরা কোনো ডেবিট/ক্রেডিট কার্ডের পিন বা সিভিভি কোড সংরক্ষণ করি না — পেমেন্ট সম্পূর্ণভাবে SSLCommerz-এর এনক্রিপ্টেড গেটওয়েতে পরিচালিত হয়)।" : "Payment transaction ID and method (we never store card PINs or CVV codes — all payments are processed via SSLCommerz encrypted gateway)."}</li>
            <li>{locale === "bn" ? "কর্পোরেট ক্লায়েন্টদের ক্ষেত্রে প্রতিষ্ঠানের নাম, অফিশিয়াল ইমেইল ও লোগো ফাইল।" : "For corporate clients: company name, official email, and logo files."}</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-forest flex items-center gap-2">
            <Eye className="w-5 h-5 text-leaf" />
            <span>{locale === "bn" ? "৩. তথ্যের ব্যবহার" : "3. Purpose of Data Usage"}</span>
          </h2>
          <p>
            {locale === "bn"
              ? "আমরা কখনোই কোনো তৃতীয় পক্ষের কাছে আপনার ব্যক্তিগত তথ্য বা ফোন নম্বর বিক্রি, ভাড়া বা বাণিজ্যিক উদ্দেশ্যে হস্তান্তর করি না। সংগৃহীত তথ্য শুধুমাত্র অর্ডার কনফার্মেশন, কুরিয়ার ডেলিভারি ও এসএমএস ট্র্যাকিং নোটিফিকেশনের কাজে ব্যবহার করা হয়।"
              : "We never sell, rent, or trade customer data. Data is exclusively utilized to dispatch parcels, update delivery tracking, and provide support."}
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-forest flex items-center gap-2">
            <Trash2 className="w-5 h-5 text-clay" />
            <span>{locale === "bn" ? "৪. তথ্য মোছার অধিকার (Right to Erasure)" : "4. Account & Data Deletion"}</span>
          </h2>
          <p>
            {locale === "bn"
              ? "আপনি যেকোনো সময় আপনার অ্যাকাউন্ট পাতায় (/account) প্রবেশ করে 'অ্যাকাউন্ট মুছে ফেলুন' বাটনে ক্লিক করে আপনার সকল সংরক্ষিত প্রোফাইল ডাটা ও ঠিকানা সম্পূর্ণ মুছে ফেলার অধিকার রাখেন। এছাড়া support@paatbari.com এ অনুরোধ জানালেও ২৪ ঘণ্টার মধ্যে আপনার তথ্য স্থায়ীভাবে ডেটাবেজ থেকে মুছে দেওয়া হবে।"
              : "Customers have full autonomy to erase their profile and stored addresses anytime via the /account page or by emailing support@paatbari.com."}
          </p>
        </section>
      </div>
    </div>
  );
}
