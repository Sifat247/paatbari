"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Truck, ShieldCheck, HeartHandshake, Phone, Mail, MapPin } from "lucide-react";
import { useLanguage } from "@/lib/i18n-context";

export interface FooterProps {
  locale?: "bn" | "en";
}

export function Footer({ locale: propLocale }: FooterProps) {
  const pathname = usePathname();
  const { locale: contextLocale, t } = useLanguage();
  const locale = propLocale || contextLocale || "bn";

  if (pathname && pathname.startsWith("/admin")) {
    return null;
  }

  return (
    <footer className="bg-forest text-sand pt-12 pb-24 md:pb-12 border-t border-forest">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Trust Badges */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pb-10 border-b border-sand/15">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-full bg-sand/10 flex items-center justify-center text-jute flex-shrink-0">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-semibold text-white text-sm">
                {locale === "bn" ? "৬৪ জেলায় ক্যাশ অন ডেলিভারি" : "Cash on Delivery in 64 Districts"}
              </h4>
              <p className="text-xs text-sand/70">
                {locale === "bn" ? "পণ্য হাতে পেয়ে মূল্য পরিশোধের সুবিধা" : "Pay after receiving your package"}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-full bg-sand/10 flex items-center justify-center text-jute flex-shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-semibold text-white text-sm">
                {locale === "bn" ? "১০০% খাঁটি ও পরিবেশবান্ধব পাট" : "100% Eco-Friendly Golden Jute"}
              </h4>
              <p className="text-xs text-sand/70">
                {locale === "bn" ? "প্লাস্টিকের শ্রেষ্ঠ বিকল্প ও টেকসই" : "Sustainable and durable craftsmanship"}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-full bg-sand/10 flex items-center justify-center text-jute flex-shrink-0">
              <HeartHandshake className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-semibold text-white text-sm">
                {locale === "bn" ? "দেশীয় কারিগরদের তৈরি" : "Handcrafted by Local Artisans"}
              </h4>
              <p className="text-xs text-sand/70">
                {locale === "bn" ? "বাংলার ঐতিহ্য ও স্বনির্ভরতার প্রতীক" : "Empowering Bangladeshi weavers"}
              </p>
            </div>
          </div>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 py-10">
          <div className="space-y-3">
            <div className="flex items-baseline gap-1.5">
              <span className="font-bn-display text-2xl font-bold text-white">পাটবাড়ি</span>
              <span className="w-2 h-2 rounded-full bg-jute" />
            </div>
            <p className="text-xs text-sand/80 leading-relaxed">
              {locale === "bn"
                ? "সোনালি আঁশের বাড়ি — আধুনিক ডিজাইন ও নিখুঁত ফিনিশিংয়ে তৈরি পাটজাত পণ্যের নির্ভরযোগ্য প্ল্যাটফর্ম।"
                : "Home of the golden fibre — Bringing modern handcrafted jute lifestyle products to everyday life."}
            </p>
            <div className="pt-2 text-[11px] text-sand/60 space-y-1">
              <p>ট্রেড লাইসেন্স: ⟨PLACEHOLDER: TRAD/DSCC/019283/2026⟩</p>
              <p>ই-টিন (TIN): ⟨PLACEHOLDER: 492019482910⟩</p>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-white text-sm mb-3">
              {locale === "bn" ? "পণ্য ও অফার" : "Products & Offers"}
            </h4>
            <ul className="space-y-2 text-xs text-sand/70">
              <li>
                <Link href="/shop" className="hover:text-jute transition-colors">
                  {locale === "bn" ? "সকল পণ্য (Shop)" : "All Products"}
                </Link>
              </li>
              <li>
                <Link href="/bundles" className="hover:text-jute transition-colors text-jute">
                  {locale === "bn" ? "🔥 বান্ডেল অফার (১০% ছাড়)" : "🔥 Starter Bundles (10% Off)"}
                </Link>
              </li>
              <li>
                <Link href="/b2b" className="hover:text-jute transition-colors">
                  {locale === "bn" ? "পাইকারি ও কর্পোরেট (B2B)" : "B2B / Bulk Corporate"}
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-jute transition-colors">
                  {locale === "bn" ? "ব্লগ ও টিপস" : "Blog & Tips"}
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-jute transition-colors">
                  {locale === "bn" ? "আমাদের কথা" : "About Us"}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white text-sm mb-3">
              {locale === "bn" ? "সহায়তা ও নীতিমালা" : "Support & Legal"}
            </h4>
            <ul className="space-y-2 text-xs text-sand/70">
              <li>
                <Link href="/track" className="hover:text-jute transition-colors">
                  {locale === "bn" ? "অর্ডার ট্র্যাক করুন" : "Track Order"}
                </Link>
              </li>
              <li>
                <Link href="/account" className="hover:text-jute transition-colors">
                  {locale === "bn" ? "আমার অ্যাকাউন্ট" : "My Account"}
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-jute transition-colors">
                  {locale === "bn" ? "সাধারণ জিজ্ঞাসা (FAQ)" : "FAQs"}
                </Link>
              </li>
              <li>
                <Link href="/shipping" className="hover:text-jute transition-colors">
                  {locale === "bn" ? "ডেলিভারি ও শিপিং নীতি" : "Shipping Policy"}
                </Link>
              </li>
              <li>
                <Link href="/returns" className="hover:text-jute transition-colors">
                  {locale === "bn" ? "রিটার্ন ও রিফান্ড নীতি" : "Returns & Refunds"}
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-jute transition-colors">
                  {locale === "bn" ? "গোপনীয়তা নীতি" : "Privacy Policy"}
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-jute transition-colors">
                  {locale === "bn" ? "শর্তাবলী" : "Terms & Conditions"}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white text-sm mb-3">
              {locale === "bn" ? "যোগাযোগ" : "Contact Us"}
            </h4>
            <div className="space-y-2 text-xs text-sand/70">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-jute flex-shrink-0" />
                <span>+880 1700-000000</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-jute flex-shrink-0" />
                <span>support@paatbari.com</span>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-jute flex-shrink-0 mt-0.5" />
                <span>ধানমন্ডি, ঢাকা ১২০৫, বাংলাদেশ</span>
              </div>
              <p className="text-[11px] text-sand/50 pt-2">
                {locale === "bn"
                  ? "সকাল ৯টা – রাত ৮টা (শুক্রবার বন্ধ)"
                  : "9:00 AM – 8:00 PM (Closed Friday)"}
              </p>
              <div className="pt-2">
                <Link
                  href="/contact"
                  className="inline-block text-xs text-jute underline hover:text-white"
                >
                  {locale === "bn" ? "যোগাযোগ ফর্ম পূরণ করুন →" : "Contact Form →"}
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-6 border-t border-sand/10 text-center text-xs text-sand/50">
          <p>© ২০২৬ পাটবাড়ি (Paatbari). সর্বস্বত্ব সংরক্ষিত।</p>
        </div>
      </div>
    </footer>
  );
}
