"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/lib/i18n-context";
import { ChevronDown, HelpCircle, MessageCircle, Phone, Search } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface FAQItem {
  qBn: string;
  qEn: string;
  aBn: string;
  aEn: string;
  cat: "shipping" | "payment" | "quality" | "b2b";
}

const FAQ_LIST: FAQItem[] = [
  {
    cat: "shipping",
    qBn: "অর্ডার ডেলিভারি হতে কত দিন সময় লাগে?",
    qEn: "How long does delivery take?",
    aBn: "ঢাকা সিটির ভেতরে ২৪ থেকে ৪৮ ঘণ্টার মধ্যে এবং ঢাকা উপশহর ও সারা দেশের অন্যান্য ৬৪টি জেলায় ৩ থেকে ৫ কার্যদিবসের মধ্যে ডেলিভারি সম্পন্ন হয়।",
    aEn: "Within Dhaka city, delivery takes 24–48 hours. For Dhaka suburbs and nationwide districts across Bangladesh, delivery takes 3–5 working days.",
  },
  {
    cat: "shipping",
    qBn: "ডেলিভারি চার্জ কত এবং ফ্রি ডেলিভারি পাওয়ার নিয়ম কি?",
    qEn: "What are the shipping charges and free delivery threshold?",
    aBn: "ঢাকা সিটিতে ডেলিভারি চার্জ ৳৭০, ঢাকা উপশহরে ৳১০০ এবং সারা দেশে ৳১৩০। তবে আপনার শপিং ব্যাগের সাবটোটাল ৳২,৫০০ বা তার বেশি হলে সারা দেশে সম্পূর্ণ ফ্রি ডেলিভারি প্রদান করা হয়।",
    aEn: "Delivery fee is ৳70 in Dhaka city, ৳100 for suburbs, and ৳130 nationwide. On all orders of ৳2,500 and above, delivery is completely FREE nationwide.",
  },
  {
    cat: "payment",
    qBn: "আমি কি পণ্য হাতে পেয়ে মূল্য পরিশোধ (ক্যাশ অন ডেলিভারি) করতে পারি?",
    qEn: "Can I pay Cash on Delivery (COD)?",
    aBn: "হ্যাঁ, দেশের ৬৪টি জেলাতেই ক্যাশ অন ডেলিভারি সুবিধা রয়েছে। আপনি ডেলিভারি ম্যানের সামনে পণ্য দেখে চেক করে মূল্য পরিশোধ করতে পারবেন। তবে ৳১০,০০০ টাকার বেশি অর্ডারে অগ্রিম অনলাইন পেমেন্ট প্রযোজ্য।",
    aEn: "Yes, Cash on Delivery is available across all 64 districts in Bangladesh. You may inspect the package upon receipt before payment. Orders exceeding ৳10,000 require advance digital payment.",
  },
  {
    cat: "payment",
    qBn: "অনলাইনে কি কি মাধ্যমে পেমেন্ট করা যায়?",
    qEn: "What digital payment methods do you accept?",
    aBn: "আমরা SSLCommerz গেটওয়ের মাধ্যমে বিকাশ (bKash), নগদ (Nagad), রকেট (Rocket), উপায় এবং যেকোনো ভিসা ও মাস্টারকার্ড ডেবিট/ক্রেডিট কার্ডের মাধ্যমে শতভাগ নিরাপদ পেমেন্ট গ্রহণ করি।",
    aEn: "We accept bKash, Nagad, Rocket, Upay, and all major Visa/Mastercard debit and credit cards via secure SSLCommerz payment gateway.",
  },
  {
    cat: "quality",
    qBn: "পাটবাড়ির পণ্যের উপাদান কি শতভাগ খাঁটি পাট?",
    qEn: "Are Paatbari products made of 100% natural jute?",
    aBn: "হ্যাঁ! আমাদের প্রতিটি পণ্য প্রাকৃতিক সোনালি আঁশ দিয়ে তৈরি। কোনো সিন্থেটিক বা প্লাস্টিকের মিশ্রণ নেই। ফলে এটি অত্যন্ত টেকসই, মজবুত এবং পুরোপুরি পরিবেশবান্ধব।",
    aEn: "Yes, our collection is handcrafted from 100% pure biodegradable Bangladeshi golden jute with zero synthetic blending or toxic coatings.",
  },
  {
    cat: "quality",
    qBn: "পণ্য নষ্ট বা ছেঁড়া পেলে কি করব? রিটার্ন পলিসি কি?",
    qEn: "What if my item arrives damaged? What is your return policy?",
    aBn: "ডেলিভারি পাওয়ার পর পণ্যটি চেক করে কোনো ত্রুটি বা ড্যামেজ থাকলে ৭ দিনের মধ্যে আমাদের হোয়াটসঅ্যাপে ছবিসহ জানালে সম্পূর্ণ ফ্রিতে নতুন পণ্য এক্সচেঞ্জ বা ফুল রিফান্ড দেওয়া হয়।",
    aEn: "If any item arrives damaged or defective, notify us on WhatsApp with photos within 7 days. We provide a hassle-free free replacement or full refund.",
  },
  {
    cat: "b2b",
    qBn: "কর্পোরেট অর্ডারে সর্বনিম্ন পরিমাণ (MOQ) কত এবং লোগো প্রিন্ট করা যায় কি?",
    qEn: "What is the corporate bulk minimum order (MOQ) and can logos be printed?",
    aBn: "কর্পোরেট কাস্টম অর্ডারের সর্বনিম্ন পরিমাণ মাত্র ৫০ পিস (MOQ: 50)। আপনার প্রতিষ্ঠানের নিজস্ব লোগো স্ক্রিন প্রিন্ট বা ডিজিটাল প্রিন্ট করে তৈরি করে দেওয়া হয়। পরিমাণ যত বেশি হবে, প্রতি পিসের দাম তত কমবে।",
    aEn: "Minimum order quantity for corporate custom orders is only 50 units (MOQ: 50). Custom company logos can be screen-printed or embroidered, with substantial volume discounts.",
  },
];

export default function FAQPage() {
  const { locale } = useLanguage();
  const [openIdx, setOpenIdx] = useState<number | null>(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<string>("all");

  const filteredFaqs = FAQ_LIST.filter((item) => {
    if (activeTab !== "all" && item.cat !== activeTab) return false;
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      item.qBn.toLowerCase().includes(q) ||
      item.qEn.toLowerCase().includes(q) ||
      item.aBn.toLowerCase().includes(q) ||
      item.aEn.toLowerCase().includes(q)
    );
  });

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-14 space-y-10 pb-24">
      {/* Title */}
      <div className="text-center space-y-3">
        <span className="text-xs font-bold text-leaf uppercase tracking-wider bg-leaf/10 px-3 py-1 rounded-full">
          {locale === "bn" ? "সহায়তা কেন্দ্র" : "Help & FAQ"}
        </span>
        <h1 className="text-3xl sm:text-4xl font-bold font-bn-display text-forest">
          {locale === "bn" ? "সাধারণ জিজ্ঞাসা (FAQ)" : "Frequently Asked Questions"}
        </h1>
        <p className="text-xs sm:text-sm text-ink/70 font-bn max-w-lg mx-auto">
          {locale === "bn"
            ? "অর্ডার, ডেলিভারি, পেমেন্ট ও রিটার্ন সম্পর্কিত সচরাচর প্রশ্নের উত্তর এখানে পেয়ে যাবেন।"
            : "Quick answers to common questions about orders, shipping, payment methods, and returns."}
        </p>
      </div>

      {/* Search Bar */}
      <div className="relative max-w-lg mx-auto">
        <Search className="w-4 h-4 text-ink/40 absolute left-3.5 top-3.5" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder={locale === "bn" ? "যেকোনো প্রশ্ন অনুসন্ধান করুন..." : "Search questions..."}
          className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-sand bg-white text-ink text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-jute"
        />
      </div>

      {/* Category Pills */}
      <div className="flex flex-wrap items-center justify-center gap-2 text-xs">
        {[
          { id: "all", labelBn: "সকল প্রশ্ন", labelEn: "All" },
          { id: "shipping", labelBn: "ডেলিভারি ও চার্জ", labelEn: "Shipping" },
          { id: "payment", labelBn: "পেমেন্ট ও COD", labelEn: "Payment" },
          { id: "quality", labelBn: "কোয়ালিটি ও রিটার্ন", labelEn: "Quality & Returns" },
          { id: "b2b", labelBn: "কর্পোরেট (B2B)", labelEn: "B2B & Bulk" },
        ].map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id)}
            className={`px-3.5 py-1.5 rounded-full transition-colors font-medium ${
              activeTab === tab.id
                ? "bg-leaf text-white font-bold"
                : "bg-white border border-sand text-ink/75 hover:bg-cream"
            }`}
          >
            {locale === "bn" ? tab.labelBn : tab.labelEn}
          </button>
        ))}
      </div>

      {/* Accordion List */}
      <div className="space-y-3">
        {filteredFaqs.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-xl border border-sand p-6 text-ink/60 text-xs">
            {locale === "bn" ? "কোনো উত্তর পাওয়া যায়নি।" : "No answers matched your search."}
          </div>
        ) : (
          filteredFaqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className="bg-white border border-sand rounded-xl overflow-hidden shadow-2xs transition-all"
              >
                <button
                  type="button"
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 hover:bg-cream/40 transition-colors"
                >
                  <span className="font-bold text-sm sm:text-base text-forest font-bn">
                    {locale === "bn" ? faq.qBn : faq.qEn}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-leaf flex-shrink-0 transition-transform duration-200 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-4 sm:px-5 pb-5 pt-1 text-xs sm:text-sm text-ink/80 font-bn leading-relaxed border-t border-sand/40 bg-sand/10">
                    {locale === "bn" ? faq.aBn : faq.aEn}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* WhatsApp Help CTA */}
      <div className="bg-sand/30 border border-sand rounded-2xl p-6 text-center space-y-3">
        <h3 className="font-bold text-forest text-sm sm:text-base">
          {locale === "bn" ? "আপনার কাঙ্ক্ষিত প্রশ্নের উত্তর পাননি?" : "Still have questions?"}
        </h3>
        <p className="text-xs text-ink/70 font-bn">
          {locale === "bn"
            ? "আমাদের কাস্টমার সাপোর্ট টিম সরাসরি হোয়াটসঅ্যাপ বা ফোনে আপনাকে তাৎক্ষণিক সহায়তা করতে প্রস্তুত।"
            : "Our support specialists are ready to assist you via WhatsApp or direct phone call."}
        </p>
        <div className="pt-2 flex justify-center gap-3">
          <a
            href="https://wa.me/8801793648214"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#25D366] text-white px-4 py-2 rounded-xl text-xs font-bold hover:bg-[#20b858] transition-colors"
          >
            <MessageCircle className="w-4 h-4 fill-current" />
            <span>{locale === "bn" ? "WhatsApp চ্যাট করুন" : "Chat on WhatsApp"}</span>
          </a>
          <Link href="/contact">
            <Button variant="secondary" size="sm">
              {locale === "bn" ? "যোগাযোগ পাতা" : "Contact Page"}
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
