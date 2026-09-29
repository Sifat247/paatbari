"use client";

import React from "react";
import Link from "next/link";
import { useLanguage } from "@/lib/i18n-context";
import { Truck, Clock, MapPin, ShieldCheck, CheckCircle2 } from "lucide-react";

export default function ShippingPolicyPage() {
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
            {locale === "bn" ? "ডেলিভারি নীতি" : "Shipping Policy"}
          </span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold font-bn-display text-forest">
          {locale === "bn" ? "ডেলিভারি ও শিপিং নীতিমালা" : "Shipping & Delivery Policy"}
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
            <Truck className="w-5 h-5 text-leaf" />
            <span>{locale === "bn" ? "১. ডেলিভারি এলাকা ও চার্জ" : "1. Delivery Zones & Fees"}</span>
          </h2>
          <p>
            {locale === "bn"
              ? "পাটবাড়ি বাংলাদেশের ৬৪টি জেলায় নির্ভরযোগ্য কুরিয়ার পার্টনারের (Steadfast / Pathao / RedX) মাধ্যমে ডোরস্টেপ ক্যাশ অন ডেলিভারি সেবা প্রদান করে।"
              : "Paatbari provides doorstep delivery across all 64 districts in Bangladesh via verified logistics partners."}
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left border border-sand rounded-lg overflow-hidden">
              <thead className="bg-sand/40 text-forest font-bold">
                <tr>
                  <th className="p-3">{locale === "bn" ? "এলাকা (Zone)" : "Zone"}</th>
                  <th className="p-3">{locale === "bn" ? "চার্জ (Fee)" : "Fee"}</th>
                  <th className="p-3">{locale === "bn" ? "সম্ভাব্য সময় (Estimated Time)" : "Estimated Delivery"}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-sand/50">
                <tr>
                  <td className="p-3 font-semibold text-forest">{locale === "bn" ? "ঢাকা সিটি কর্পোরেশন" : "Dhaka City Corporation"}</td>
                  <td className="p-3">{locale === "bn" ? "৳৭০" : "৳70"}</td>
                  <td className="p-3">{locale === "bn" ? "২৪ থেকে ৪৮ ঘণ্টা" : "24 to 48 hours"}</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-forest">{locale === "bn" ? "ঢাকা উপশহর (সাভার, কেরানীগঞ্জ, গাজীপুর, নারায়ণগঞ্জ)" : "Dhaka Suburbs (Savar, Keraniganj, Gazipur, Narayanganj)"}</td>
                  <td className="p-3">{locale === "bn" ? "৳১০০" : "৳100"}</td>
                  <td className="p-3">{locale === "bn" ? "২ থেকে ৩ কার্যদিবস" : "2 to 3 working days"}</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-forest">{locale === "bn" ? "ঢাকার বাইরে (সারা দেশের সকল জেলা)" : "Outside Dhaka (All 64 Districts)"}</td>
                  <td className="p-3">{locale === "bn" ? "৳১৩০" : "৳130"}</td>
                  <td className="p-3">{locale === "bn" ? "৩ থেকে ৫ কার্যদিবস" : "3 to 5 working days"}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Section 2 */}
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-forest flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-leaf" />
            <span>{locale === "bn" ? "২. ফ্রি ডেলিভারি সুবিধা" : "2. Free Delivery Threshold"}</span>
          </h2>
          <p>
            {locale === "bn"
              ? "আপনার শপিং ব্যাগের মূল পণ্যের মোট মূল্য (সাবটোটাল) ৳২,৫০০ বা তার বেশি হলে সারা দেশে সম্পূর্ণ ফ্রি ডেলিভারি প্রদান করা হয়। চেকআউটের সময় স্বয়ংক্রিয়ভাবে ডেলিভারি ফি শূন্য (০৳) নির্ধারিত হবে।"
              : "Orders of ৳2,500 or more automatically qualify for FREE nationwide shipping across Bangladesh."}
          </p>
        </section>

        {/* Section 3 */}
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-forest flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-leaf" />
            <span>{locale === "bn" ? "৩. পার্সেল রিসিভ ও যাচাই" : "3. Parcel Inspection on Delivery"}</span>
          </h2>
          <p>
            {locale === "bn"
              ? "ডেলিভারি ম্যান উপস্থিত থাকাকালীন পার্সেলটি গ্রহণ করে ভিতরের পণ্য যাচাই করে নেওয়ার অনুরোধ করা হচ্ছে। যদি কোনো পণ্য ভাঙা, ছেঁড়া বা অমিল থাকে, তবে তাৎক্ষণিকভাবে ডেলিভারি ম্যানের উপস্থিতিতে আমাদের হেল্পলাইনে (+880 1793-648214) যোগাযোগ করুন।"
              : "Customers are encouraged to inspect parcels in the presence of the delivery courier before signing acceptance. For any discrepancy, contact our helpline at +880 1793-648214 immediately."}
          </p>
        </section>

        {/* Section 4 */}
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-forest flex items-center gap-2">
            <Clock className="w-5 h-5 text-leaf" />
            <span>{locale === "bn" ? "৪. ট্র্যাকিং ও নোটিফিকেশন" : "4. Real-time Tracking & SMS"}</span>
          </h2>
          <p>
            {locale === "bn"
              ? "অর্ডার কনফার্মেশনের পর স্বয়ংক্রিয় এসএমএস নোটিফিকেশন পাঠানো হবে। অর্ডার ট্র্যাকিং পেইজে (/track) আপনার অর্ডার নম্বর এবং মোবাইল নম্বর দিয়ে যেকোনো সময় ডেলিভারির লাইভ স্ট্যাটাস দেখতে পারবেন।"
              : "Live order tracking is available anytime at /track using your order ID and mobile number."}
          </p>
        </section>
      </div>
    </div>
  );
}
