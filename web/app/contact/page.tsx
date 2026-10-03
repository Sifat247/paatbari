"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/lib/i18n-context";
import { Button } from "@/components/ui/Button";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  MessageCircle,
  Send,
  CheckCircle2,
  Building2,
  FileText,
} from "lucide-react";

export default function ContactPage() {
  const { locale } = useLanguage();
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    subject: "general",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.message.trim()) return;
    setSubmitted(true);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-16 space-y-12 pb-24">
      {/* Title */}
      <div className="border-b border-sand pb-6">
        <div className="flex items-center gap-2 text-xs text-ink/60 mb-2">
          <Link href="/" className="hover:text-leaf">
            {locale === "bn" ? "হোম" : "Home"}
          </Link>
          <span>/</span>
          <span className="text-leaf font-medium">
            {locale === "bn" ? "যোগাযোগ" : "Contact"}
          </span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold font-bn-display text-forest">
          {locale === "bn" ? "যোগাযোগ করুন" : "Get in Touch"}
        </h1>
        <p className="text-xs sm:text-sm text-ink/75 mt-2 font-bn max-w-xl leading-relaxed">
          {locale === "bn"
            ? "আপনার যেকোনো প্রশ্ন, বাল্ক অর্ডারের চাহিদা বা মতামতের জন্য সরাসরি যোগাযোগ করতে পারেন।"
            : "Have a query about orders, bespoke corporate gifting, or artisan partnerships? We are here to help."}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left: Contact Info & Placeholders */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white border border-sand rounded-2xl p-6 shadow-card space-y-5">
            <h2 className="font-bold text-forest text-base border-b border-sand pb-3">
              {locale === "bn" ? "সরাসরি যোগাযোগ মাধ্যম" : "Direct Contact Channels"}
            </h2>

            <div className="space-y-4 text-xs sm:text-sm text-ink/80">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-full bg-leaf/10 text-leaf flex items-center justify-center flex-shrink-0">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[11px] text-ink/50 block font-medium">
                    {locale === "bn" ? "হেল্পলাইন (সকাল ৯টা - রাত ৮টা)" : "Helpline (9am - 8pm)"}
                  </span>
                  <a href="tel:+8801793648214" className="font-bold text-forest hover:text-leaf">
                    +880 1793-648214
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-full bg-[#25D366]/10 text-[#25D366] flex items-center justify-center flex-shrink-0">
                  <MessageCircle className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[11px] text-ink/50 block font-medium">
                    {locale === "bn" ? "হোয়াটসঅ্যাপ সাপোর্ট" : "WhatsApp Support"}
                  </span>
                  <a
                    href="https://wa.me/8801793648214"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-bold text-forest hover:text-leaf"
                  >
                    +880 1793-648214
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-full bg-sand text-forest flex items-center justify-center flex-shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[11px] text-ink/50 block font-medium">
                    {locale === "bn" ? "অফিসিয়াল ইমেইল" : "Official Email"}
                  </span>
                  <a href="mailto:sifatphychee@gmail.com" className="font-bold text-forest hover:text-leaf">
                    sifatphychee@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-full bg-clay/10 text-clay flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[11px] text-ink/50 block font-medium">
                    {locale === "bn" ? "প্রধান কার্যালয় ও ঠিকানা" : "Main Office & Address"}
                  </span>
                  <p className="font-medium text-forest">
                    {locale === "bn" ? "মানিকগঞ্জ সদর, মানিকগঞ্জ ১৮০০, বাংলাদেশ" : "Manikganj Sadar, Manikganj 1800, Bangladesh"}
                  </p>
                  <p className="text-[11px] text-ink/60 mt-0.5">
                    {locale === "bn" ? "স্বত্বাধিকারী: সিফাত সাঈকী (Sifat Phychee)" : "Owner: Sifat Phychee"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Legal / Statutory Compliance Placeholders */}
          <div className="bg-sand/30 border border-sand rounded-xl p-5 space-y-3 text-xs">
            <h3 className="font-bold text-forest flex items-center gap-1.5">
              <FileText className="w-4 h-4 text-leaf" />
              <span>{locale === "bn" ? "ব্যবসার তথ্য ও অবস্থান" : "Business Details & Location"}</span>
            </h3>
            <div className="space-y-1 text-ink/75 font-mono text-[11px]">
              <p>{locale === "bn" ? "প্রতিষ্ঠাতা ও স্বত্বাধিকারী: সিফাত সাঈকী (Sifat Phychee)" : "Founder & Owner: Sifat Phychee"}</p>
              <p>{locale === "bn" ? "অবস্থান: মানিকগঞ্জ সদর, মানিকগঞ্জ ১৮০০" : "Location: Manikganj Sadar, Manikganj 1800"}</p>
              <p>{locale === "bn" ? "কারখানা ও তাঁত হাব: মানিকগঞ্জ ও গ্রামীণ কারুশিল্প হাব" : "Factory & Loom Hub: Manikganj & Rural Artisan Hubs"}</p>
            </div>
          </div>
        </div>

        {/* Right: Interactive Message Form */}
        <div className="lg:col-span-7">
          <div className="bg-white border border-sand rounded-2xl p-6 sm:p-8 shadow-card">
            {submitted ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-leaf/10 text-leaf mx-auto flex items-center justify-center">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="font-bold text-xl text-forest font-bn-display">
                  {locale === "bn" ? "আপনার বার্তাটি পৌঁছেছে!" : "Message Received!"}
                </h3>
                <p className="text-xs sm:text-sm text-ink/70 font-bn max-w-sm mx-auto">
                  {locale === "bn"
                    ? "পাটবাড়ির সাথে যোগাযোগের জন্য ধন্যবাদ। আমাদের কাস্টমার সাপোর্ট টিম অতি দ্রুত আপনার সাথে যোগাযোগ করবে।"
                    : "Thank you for reaching out to Paatbari. Our team will review your message and reply promptly."}
                </p>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({ name: "", contact: "", subject: "general", message: "" });
                  }}
                >
                  {locale === "bn" ? "আরেকটি বার্তা পাঠান" : "Send Another Message"}
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <h2 className="font-bold text-forest text-lg font-bn-display">
                  {locale === "bn" ? "আমাদের একটি বার্তা পাঠান" : "Send Us a Message"}
                </h2>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-ink/80 block">
                    {locale === "bn" ? "আপনার নাম *" : "Your Name *"}
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder={locale === "bn" ? "যেমন: আপনার নাম" : "e.g., Your Name"}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-sand bg-cream/40 text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-jute text-ink"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-ink/80 block">
                    {locale === "bn" ? "মোবাইল নম্বর বা ইমেইল *" : "Phone Number or Email *"}
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.contact}
                    onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                    placeholder={locale === "bn" ? "017XXXXXXXX বা name@example.com" : "017XXXXXXXX or name@example.com"}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-sand bg-cream/40 text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-jute text-ink"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-ink/80 block">
                    {locale === "bn" ? "বিষয়" : "Subject"}
                  </label>
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-sand bg-cream/40 text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-jute text-ink cursor-pointer"
                  >
                    <option value="general">
                      {locale === "bn" ? "সাধারণ জিজ্ঞাসা" : "General Inquiry"}
                    </option>
                    <option value="order">
                      {locale === "bn" ? "অর্ডার ও ডেলিভারি সম্পর্কিত" : "Order & Delivery Status"}
                    </option>
                    <option value="b2b">
                      {locale === "bn" ? "কর্পোরেট ও পাইকারি কোটেশন" : "B2B Bulk Quotation"}
                    </option>
                    <option value="return">
                      {locale === "bn" ? "রিটার্ন বা কমপ্লেইন" : "Returns & Complaints"}
                    </option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-ink/80 block">
                    {locale === "bn" ? "আপনার বিস্তারিত বার্তা *" : "Your Message *"}
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder={
                      locale === "bn"
                        ? "আপনার প্রশ্ন বা চাহিদার বিবরণ লিখুন..."
                        : "Write your question or request..."
                    }
                    className="w-full px-3.5 py-2.5 rounded-lg border border-sand bg-cream/40 text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-jute text-ink resize-none font-bn"
                  />
                </div>

                <Button
                  type="submit"
                  variant="primary"
                  size="md"
                  className="w-full flex items-center justify-center gap-2 shadow-sm min-h-[44px]"
                >
                  <Send className="w-4 h-4" />
                  <span>{locale === "bn" ? "বার্তা পাঠান" : "Send Message"}</span>
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
