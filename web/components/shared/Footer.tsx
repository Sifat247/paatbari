import React from "react";
import Link from "next/link";
import { Truck, ShieldCheck, HeartHandshake, Phone, Mail } from "lucide-react";

export interface FooterProps {
  locale?: "bn" | "en";
}

export function Footer({ locale = "bn" }: FooterProps) {
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
              <span className="font-bn-display text-2xl font-bold text-white">পাটবাড়ি</span>
              <span className="w-2 h-2 rounded-full bg-jute" />
            </div>
            <p className="text-xs text-sand/80 leading-relaxed">
              {locale === "bn"
                ? "সোনালি আঁশের গল্প, আপনার ঘরে। আধুনিক ডিজাইন ও নিখুঁত ফিনিশিংয়ে তৈরি পাটজাত পণ্যের নির্ভরযোগ্য প্ল্যাটফর্ম।"
                : "The golden fibre story, brought home. Bringing modern handcrafted jute lifestyle products to everyday life."}
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-white text-sm mb-3">
              {locale === "bn" ? "পণ্য বিভাগ" : "Categories"}
            </h4>
            <ul className="space-y-2 text-xs text-sand/70">
              <li>
                <Link href="/shop" className="hover:text-jute transition-colors">
                  {locale === "bn" ? "পাট ও ক্যানভাস টোট ব্যাগ" : "Jute Tote & Shopping Bags"}
                </Link>
              </li>
              <li>
                <Link href="/shop" className="hover:text-jute transition-colors">
                  {locale === "bn" ? "হ্যান্ডমেড ঝুড়ি ও প্ল্যান্টার" : "Handmade Baskets & Planters"}
                </Link>
              </li>
              <li>
                <Link href="/shop" className="hover:text-jute transition-colors">
                  {locale === "bn" ? "ফ্লোর রাগ ও ম্যাট" : "Floor Rugs & Mats"}
                </Link>
              </li>
              <li>
                <Link href="/shop" className="hover:text-jute transition-colors">
                  {locale === "bn" ? "হোম ডেকর ও কুশন কভার" : "Home Decor & Cushions"}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white text-sm mb-3">
              {locale === "bn" ? "সহায়তা ও সেবা" : "Customer Care"}
            </h4>
            <ul className="space-y-2 text-xs text-sand/70">
              <li>
                <Link href="/track" className="hover:text-jute transition-colors">
                  {locale === "bn" ? "অর্ডার ট্র্যাক করুন" : "Track Order"}
                </Link>
              </li>
              <li>
                <Link href="/b2b" className="hover:text-jute transition-colors">
                  {locale === "bn" ? "পাইকারি ও করপোরেট কোট" : "B2B / Bulk Quotes"}
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-jute transition-colors">
                  {locale === "bn" ? "ডেলিভারি ও রিটার্ন পলিসি" : "Delivery & Return Policy"}
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
                <Phone className="w-4 h-4 text-jute" />
                <span>+880 1700-000000</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-jute" />
                <span>support@paatkotha.com</span>
              </div>
              <p className="text-[11px] text-sand/50 pt-2">
                {locale === "bn"
                  ? "সকাল ৯টা – রাত ৮টা (শুক্রবার বন্ধ)"
                  : "9:00 AM – 8:00 PM (Closed Friday)"}
              </p>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-6 border-t border-sand/10 text-center text-xs text-sand/50">
          <p>© 2026 PaatBari (পাটবাড়ি). All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
