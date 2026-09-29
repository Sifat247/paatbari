"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { quoteB2B, B2BConfig } from "@/lib/pricing";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { ProductArt } from "@/components/ui/ProductArt";
import { useLanguage } from "@/lib/i18n-context";
import { EcoImpactCalculator } from "@/components/ui/EcoImpactCalculator";
import {
  Briefcase,
  Building2,
  CheckCircle2,
  Calculator,
  Upload,
  Send,
  Sparkles,
  AlertCircle,
  ArrowRight,
  ShieldCheck,
  FileCheck,
} from "lucide-react";

const b2bConfig: B2BConfig = {
  moq: 50,
  tiers: [
    { min: 50, max: 199, unit: 180 },
    { min: 200, max: 499, unit: 160 },
    { min: 500, max: null, unit: 140 },
  ],
  logoFee: 25,
  setupFee: 1500,
  depositPct: 50,
};

const b2bProducts = [
  { id: "B01", name: "কাস্টম লোগো প্রিন্ট পাটের ব্যাগ", nameEn: "Custom Logo Print Jute Bag", subtitle: "Custom Promotional Jute Bag (১৫×১৬ ইঞ্চি)", subtitleEn: "Custom Promotional Jute Bag (15x16 inch)" },
  { id: "B02", name: "কর্পোরেট গিফট সেট", nameEn: "Corporate Gift Set", subtitle: "Corporate Gift Set (ডায়েরি, পেনহোল্ডার, কি-রিং)", subtitleEn: "Corporate Gift Set (Diary, Penholder, Keyring)" },
  { id: "B03", name: "হেসিয়ান / বস্তা (পাইকারি)", nameEn: "Hessian / Sacking (Wholesale)", subtitle: "Hessian / Sacking Bulk Bags", subtitleEn: "Hessian / Sacking Bulk Bags" },
  { id: "B04", name: "এক্সপোর্ট / কাস্টম অর্ডার", nameEn: "Export / Custom Order", subtitle: "Export & Custom Manufacturing", subtitleEn: "Export & Custom Manufacturing" },
];

export default function B2BPage() {
  const { locale, formatPrice, toLocaleDigits } = useLanguage();
  const [selectedProduct, setSelectedProduct] = useState("B01");
  const [qty, setQty] = useState<number>(100);
  const [includeLogo, setIncludeLogo] = useState<boolean>(true);
  const [loading, setLoading] = useState(false);
  const [createdQuote, setCreatedQuote] = useState<{ token: string; deposit: number; total: number } | null>(null);

  // Form inputs
  const [companyName, setCompanyName] = useState("");
  const [contactName, setContactName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [deadline, setDeadline] = useState("");
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [notes, setNotes] = useState("");
  const [formError, setFormError] = useState<string | null>(null);

  // Pricing calculation
  let quote: { unit: number; total: number; deposit: number } | null = null;
  let error: string | null = null;
  let nudge: string | null = null;

  try {
    if (selectedProduct === "B01") {
      const calc = quoteB2B(qty, includeLogo, b2bConfig);
      quote = calc;

      // Smart tier nudging (if qty close to next tier)
      if (qty >= 190 && qty < 200) {
        const diff = 200 - qty;
        nudge = locale === "bn" ? `💡 আর ${toLocaleDigits(diff)}টি যোগ করলে প্রতি পিসের রেট কমে ১৬০৳ হবে!` : `💡 Add ${diff} more to reduce the per piece rate to ${formatPrice(160)}!`;
      } else if (qty >= 490 && qty < 500) {
        const diff = 500 - qty;
        nudge = locale === "bn" ? `💡 আর ${toLocaleDigits(diff)}টি যোগ করলে প্রতি পিসের রেট কমে ১৪০৳ হবে!` : `💡 Add ${diff} more to reduce the per piece rate to ${formatPrice(140)}!`;
      }
    } else {
      const baseUnits: Record<string, number> = { B02: 450, B03: 95, B04: 300 };
      const unit = (baseUnits[selectedProduct] || 200) + (includeLogo ? b2bConfig.logoFee : 0);
      const setup = includeLogo ? b2bConfig.setupFee : 0;
      const total = unit * qty + setup;
      quote = { unit, total, deposit: Math.round(total * 0.5) };
    }
  } catch (err: any) {
    if (err.message === "BELOW_MOQ") {
      error = locale === "bn" ? "সর্বনিম্ন অর্ডার ৫০ পিস (MOQ: 50)" : "Minimum order 50 pieces (MOQ: 50)";
    } else {
      error = locale === "bn" ? "অর্ডারের পরিমাণ সঠিক নয়" : "Invalid order quantity";
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    // Validate phone
    const cleanPhone = phone.replace(/[^0-9]/g, "");
    if (!/^01[3-9]\d{8}$/.test(cleanPhone)) {
      setFormError(locale === "bn" ? "সঠিক ১১ ডিজিটের মোবাইল নম্বর দিন (০১৭xxxxxxxx)" : "Please enter a valid 11-digit mobile number (017xxxxxxxx)");
      return;
    }

    if (qty < b2bConfig.moq) {
      setFormError(locale === "bn" ? "সর্বনিম্ন অর্ডার ৫০ পিস" : "Minimum order 50 pieces");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/v1/b2b/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          companyName,
          contactName,
          phone: cleanPhone,
          email,
          productId: selectedProduct,
          qty,
          includeLogo,
          deadline,
          deliveryAddress,
          notes,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.message || (locale === "bn" ? "কোটেশন পাঠাতে সমস্যা হয়েছে" : "Failed to send quotation"));
      }

      setCreatedQuote({
        token: data.token,
        deposit: data.quote?.depositAmount || quote?.deposit || 0,
        total: data.quote?.totalPrice || quote?.total || 0,
      });
    } catch (err: any) {
      setFormError(err.message || (locale === "bn" ? "অনুরোধ সম্পন্ন করা যায়নি" : "Request could not be completed"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-16 space-y-16 pb-24">
      {/* Hero Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <Badge variant="sale">{locale === "bn" ? "পাইকারি ও করপোরেট সল্যুশন" : "Wholesale & Corporate Solutions"}</Badge>
        <h1 className="text-3xl sm:text-5xl font-bold font-bn-display text-forest tracking-tight">
          {locale === "bn" ? "কর্পোরেট ইভেন্ট ও ব্র্যান্ডেড পাটপণ্য" : "Corporate Events & Branded Jute Products"}
        </h1>
        <p className="text-sm sm:text-base text-ink/80 leading-relaxed font-bn">
          {locale === "bn" ? "প্রতিষ্ঠানের নিজস্ব লোগো ও ব্র্যান্ডিং সহ টেকসই ও পরিবেশবান্ধব পাটের ব্যাগ ও কর্পোরেট উপহার। কনফারেন্স, গিফটিং ও রিটেল বাল্ক অর্ডারের নির্ভরযোগ্য প্ল্যাটফর্ম।" : "Sustainable and eco-friendly jute bags and corporate gifts with your company's logo and branding. A reliable platform for conferences, gifting, and retail bulk orders."}
        </p>
      </div>

      {/* Main Interactive Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left: Interactive B2B Pricing Calculator */}
        <div className="lg:col-span-6 bg-white border-2 border-sand rounded-2xl p-6 sm:p-8 shadow-card space-y-6">
          <div className="flex items-center gap-3 border-b border-sand pb-4">
            <div className="w-10 h-10 rounded-full bg-cream flex items-center justify-center text-leaf">
              <Calculator className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-bold text-lg text-forest">{locale === "bn" ? "লাইভ প্রাইসিং ক্যালকুলেটর" : "Live Pricing Calculator"}</h2>
              <p className="text-xs text-ink/60">{locale === "bn" ? "বাল্ক অর্ডারের আনুমানিক রেট ও ডিপোজিট দেখুন" : "View estimated rate and deposit for bulk orders"}</p>
            </div>
          </div>

          {/* Product Type Selector */}
          <div className="space-y-2">
            <label className="font-bold text-xs text-forest block">{locale === "bn" ? "পণ্য নির্বাচন করুন:" : "Select Product:"}</label>
            <div className="grid grid-cols-1 gap-2">
              {b2bProducts.map((p) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => setSelectedProduct(p.id)}
                  className={`p-2.5 sm:p-3 rounded-xl border text-left transition-all flex items-center gap-3 ${
                    selectedProduct === p.id
                      ? "border-leaf bg-leaf/5 font-bold text-forest ring-1 ring-leaf"
                      : "border-sand/60 hover:bg-cream text-ink/80"
                  }`}
                >
                  <div className="w-11 h-11 rounded-lg bg-cream border border-sand/60 p-1 flex items-center justify-center flex-shrink-0">
                    <ProductArt slug={p.id} className="w-full h-full object-contain" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="block text-xs font-bold truncate">{locale === "bn" ? p.name : p.nameEn}</span>
                    <span className="text-[11px] text-ink/50 block truncate">{locale === "bn" ? p.subtitle : p.subtitleEn}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Volume Tiers Table */}
          {selectedProduct === "B01" && (
            <div className="bg-sand/20 border border-sand/60 rounded-xl p-4 space-y-2 text-xs">
              <span className="font-bold text-forest block">{locale === "bn" ? "ভলিউম টায়ার রেট:" : "Volume Tier Rate:"}</span>
              <div className="grid grid-cols-3 gap-2 text-center">
                <div
                  className={`p-2 rounded-lg border ${
                    qty >= 50 && qty < 200
                      ? "border-leaf bg-leaf/10 font-bold"
                      : "border-sand/40 bg-white"
                  }`}
                >
                  <span className="block text-[11px] text-ink/60">{locale === "bn" ? "৫০–১৯৯ পিস" : "50–199 pcs"}</span>
                  <span className="text-leaf font-bold">{formatPrice(180)}/{locale === "bn" ? "পিস" : "pc"}</span>
                </div>
                <div
                  className={`p-2 rounded-lg border ${
                    qty >= 200 && qty < 500
                      ? "border-leaf bg-leaf/10 font-bold"
                      : "border-sand/40 bg-white"
                  }`}
                >
                  <span className="block text-[11px] text-ink/60">{locale === "bn" ? "২০০–৪৯৯ পিস" : "200–499 pcs"}</span>
                  <span className="text-leaf font-bold">{formatPrice(160)}/{locale === "bn" ? "পিস" : "pc"}</span>
                </div>
                <div
                  className={`p-2 rounded-lg border ${
                    qty >= 500
                      ? "border-leaf bg-leaf/10 font-bold"
                      : "border-sand/40 bg-white"
                  }`}
                >
                  <span className="block text-[11px] text-ink/60">{locale === "bn" ? "৫০০+ পিস" : "500+ pcs"}</span>
                  <span className="text-leaf font-bold">{formatPrice(140)}/{locale === "bn" ? "পিস" : "pc"}</span>
                </div>
              </div>
            </div>
          )}

          {/* Controls */}
          <div className="space-y-4">
            <div className="space-y-1.5">
              <div className="flex justify-between items-center text-xs font-bold text-ink">
                <span>{locale === "bn" ? "অর্ডারের পরিমাণ:" : "Order Quantity:"}</span>
                <span className="text-sm text-forest font-bold">{toLocaleDigits(qty)} {locale === "bn" ? "পিস" : "pcs"}</span>
              </div>
              <input
                type="range"
                min="40"
                max="600"
                step="10"
                value={qty}
                onChange={(e) => setQty(Number(e.target.value))}
                className="w-full accent-leaf cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-ink/50">
                <span>{toLocaleDigits(50)} {locale === "bn" ? "পিস (MOQ)" : "pcs (MOQ)"}</span>
                <span>{toLocaleDigits(200)} {locale === "bn" ? "পিস" : "pcs"}</span>
                <span>৫০০+ পিস</span>
              </div>
            </div>

            {/* Custom Logo Checkbox */}
            <label className="flex items-center gap-3 p-3.5 rounded-xl border border-sand bg-cream/40 cursor-pointer hover:border-jute transition-colors">
              <input
                type="checkbox"
                checked={includeLogo}
                onChange={(e) => setIncludeLogo(e.target.checked)}
                className="w-4 h-4 accent-leaf rounded"
              />
              <div className="text-xs">
                <span className="font-bold text-forest block">{locale === "bn" ? "নিজস্ব ব্র্যান্ড লোগো প্রিন্ট যোগ করুন" : "Add custom brand logo print"}</span>
                <span className="text-ink/60">
                  {locale === "bn" ? "প্রতি পিসে +৳২৫ প্রিন্টিং ফি এবং এককালীন ৳১,৫০০ স্ক্রিন সেটআপ ফি।" : `+${formatPrice(25)} printing fee per piece and one-time ${formatPrice(1500)} screen setup fee.`}
                </span>
              </div>
            </label>
          </div>

          {/* Nudge Alert */}
          {nudge && (
            <div className="p-3 bg-jute/15 border border-jute/40 rounded-xl text-xs text-ink/90 flex items-start gap-2">
              <Sparkles className="w-4 h-4 text-jute-deep flex-shrink-0 mt-0.5" />
              <span>{nudge}</span>
            </div>
          )}

          {/* Error */}
          {error && (
            <div className="p-3 bg-clay/10 border border-clay/30 rounded-xl text-xs text-clay font-semibold flex items-center gap-2">
              <AlertCircle className="w-4 h-4" />
              <span>{error}</span>
            </div>
          )}

          {/* Price Summary Card */}
          {quote && (
            <div className="bg-forest text-white rounded-xl p-5 space-y-3">
              <div className="flex justify-between text-xs text-sand/80">
                <span>{locale === "bn" ? "প্রতি পিসের ইউনিট রেট:" : "Unit rate per piece:"}</span>
                <span className="font-semibold text-white">{formatPrice(quote.unit)}</span>
              </div>
              {includeLogo && (
                <div className="flex justify-between text-xs text-sand/80">
                  <span>{locale === "bn" ? "স্ক্রিন সেটআপ ফি:" : "Screen setup fee:"}</span>
                  <span className="font-semibold text-white">{formatPrice(1500)}</span>
                </div>
              )}
              <div className="border-t border-sand/20 pt-2 flex justify-between items-baseline">
                <span className="font-semibold text-sm">{locale === "bn" ? "মোট প্রাক্কলিত মূল্য:" : "Total estimated price:"}</span>
                <span className="text-2xl font-bold font-bn-display text-jute">
                  {formatPrice(quote.total)}
                </span>
              </div>
              <div className="flex justify-between text-xs text-sand/70 pt-1 border-t border-sand/10">
                <span>{locale === "bn" ? "প্রডাকশন শুরুর অগ্রিম (৫০%):" : "Production advance (50%):"}</span>
                <span className="font-bold text-sand">{formatPrice(quote.deposit)}</span>
              </div>
            </div>
          )}
        </div>

        {/* Right: Quote Request Form */}
        <div className="lg:col-span-6 bg-white border border-sand rounded-2xl p-6 sm:p-8 shadow-card space-y-6">
          <div className="border-b border-sand pb-4">
            <h2 className="font-bold text-lg text-forest flex items-center gap-2">
              <Building2 className="w-5 h-5 text-leaf" />
              <span>{locale === "bn" ? "অফিসিয়াল কোটেশন রিকোয়েস্ট" : "Official Quotation Request"}</span>
            </h2>
            <p className="text-xs text-ink/60 mt-1">
              {locale === "bn" ? "ফর্মটি পূরণ করুন, সিস্টেম তাৎক্ষণিক কোটেশন টোকেন তৈরি করবে এবং আমাদের কর্পোরেট টিম যোগাযোগ করবে।" : "Fill out the form, the system will generate an instant quotation token and our corporate team will contact you."}
            </p>
          </div>

          {createdQuote ? (
            <div className="py-8 text-center space-y-5">
              <div className="w-16 h-16 rounded-full bg-leaf/10 text-leaf mx-auto flex items-center justify-center">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <div className="space-y-1">
                <h3 className="text-xl font-bold text-forest">{locale === "bn" ? "কোটেশন রিকোয়েস্ট তৈরি হয়েছে!" : "Quotation Request Created!"}</h3>
                <p className="text-xs text-ink/70">
                  {locale === "bn" ? "আপনার কোটেশন টোকেন:" : "Your quotation token:"} <strong className="font-mono text-leaf text-sm">{createdQuote.token}</strong>
                </p>
              </div>

              <div className="bg-cream border border-sand p-4 rounded-xl text-xs space-y-2 text-left max-w-sm mx-auto">
                <div className="flex justify-between">
                  <span>{locale === "bn" ? "মোট চুক্তি মূল্য:" : "Total contract value:"}</span>
                  <span className="font-bold text-forest">{formatPrice(createdQuote.total)}</span>
                </div>
                <div className="flex justify-between text-clay">
                  <span>{locale === "bn" ? "৫০% উৎপাদন অগ্রিম:" : "50% production advance:"}</span>
                  <span className="font-bold">{formatPrice(createdQuote.deposit)}</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button href={`/quote/${createdQuote.token}`} variant="primary" size="md" className="w-full sm:w-auto flex items-center justify-center gap-1.5">
                  <span>{locale === "bn" ? "কোটেশন দেখুন ও গ্রহণ করুন" : "View and Accept Quotation"}</span>
                  <ArrowRight className="w-4 h-4" />
                </Button>
                <Button
                  variant="secondary"
                  size="md"
                  onClick={() => setCreatedQuote(null)}
                  className="w-full sm:w-auto"
                >
                  {locale === "bn" ? "আরেকটি কোটেশন তৈরি করুন" : "Create Another Quotation"}
                </Button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              {formError && (
                <div className="p-3 bg-clay/10 border border-clay/30 rounded-xl text-xs text-clay font-semibold flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  <span>{formError}</span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-bold text-ink/80 block">{locale === "bn" ? "প্রতিষ্ঠানের নাম *" : "Company Name *"}</label>
                  <input
                    type="text"
                    required
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    placeholder={locale === "bn" ? "কোম্পানি / সংস্থার নাম" : "Company / Organization Name"}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-sand bg-cream text-ink focus:outline-none focus:ring-1 focus:ring-jute"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-ink/80 block">{locale === "bn" ? "দায়িত্বপ্রাপ্ত কর্মকর্তার নাম *" : "Contact Person Name *"}</label>
                  <input
                    type="text"
                    required
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    placeholder={locale === "bn" ? "আপনার নাম" : "Your Name"}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-sand bg-cream text-ink focus:outline-none focus:ring-1 focus:ring-jute"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-bold text-ink/80 block">{locale === "bn" ? "মোবাইল নম্বর *" : "Mobile Number *"}</label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder={locale === "bn" ? "০১৭xxxxxxxx" : "017xxxxxxxx"}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-sand bg-cream text-ink focus:outline-none focus:ring-1 focus:ring-jute"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-ink/80 block">{locale === "bn" ? "অফিসিয়াল ইমেইল" : "Official Email"}</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="corporate@company.com"
                    className="w-full px-3.5 py-2.5 rounded-lg border border-sand bg-cream text-ink focus:outline-none focus:ring-1 focus:ring-jute"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-bold text-ink/80 block">{locale === "bn" ? "কাঙ্ক্ষিত ডেলিভারি তারিখ" : "Expected Delivery Date"}</label>
                  <input
                    type="date"
                    value={deadline}
                    onChange={(e) => setDeadline(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-sand bg-cream text-ink focus:outline-none focus:ring-1 focus:ring-jute"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-ink/80 block">{locale === "bn" ? "ডেলিভারি ঠিকানা / জেলা" : "Delivery Address / District"}</label>
                  <input
                    type="text"
                    value={deliveryAddress}
                    onChange={(e) => setDeliveryAddress(e.target.value)}
                    placeholder={locale === "bn" ? "যেমন: ঢাকা, চট্টগ্রাম..." : "e.g., Dhaka, Chittagong..."}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-sand bg-cream text-ink focus:outline-none focus:ring-1 focus:ring-jute"
                  />
                </div>
              </div>

              {/* Logo Upload Slot */}
              <div className="space-y-1">
                <label className="font-bold text-ink/80 block">
                  {locale === "bn" ? "লোগো বা রেফারেন্স ডিজাইন (ঐচ্ছিক):" : "Logo or Reference Design (Optional):"}
                </label>
                <div className="border-2 border-dashed border-sand rounded-xl p-4 text-center bg-cream/30 hover:border-leaf cursor-pointer transition-colors">
                  <Upload className="w-5 h-5 mx-auto text-ink/40 mb-1" />
                  <span className="text-[11px] text-ink/60 block">
                    {locale === "bn" ? "AI, EPS, PDF, বা হাই-রেজুলিউশন PNG ড্রপ করুন (সর্বোচ্চ ১০MB)" : "Drop AI, EPS, PDF, or high-resolution PNG (Max 10MB)"}
                  </span>
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-ink/80 block">{locale === "bn" ? "বিশেষ নির্দেশনা / স্পেসিফিকেশন" : "Special Instructions / Specifications"}</label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder={locale === "bn" ? "যেমন: ইভেন্টের উদ্দেশ্য, বিশেষ হ্যান্ডল বা বিশেষ সাইজ..." : "e.g., Event purpose, special handle or specific size..."}
                  className="w-full px-3.5 py-2 rounded-lg border border-sand bg-cream text-ink focus:outline-none focus:ring-1 focus:ring-jute"
                />
              </div>

              <Button
                variant="quote"
                size="lg"
                type="submit"
                disabled={loading}
                className="w-full shadow-md flex items-center justify-center gap-2"
              >
                {loading ? (
                  <span>{locale === "bn" ? "প্রসেসিং হচ্ছে..." : "Processing..."}</span>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>{locale === "bn" ? "কোটেশন রিকোয়েস্ট জমা দিন" : "Submit Quotation Request"}</span>
                  </>
                )}
              </Button>
            </form>
          )}
        </div>
      </div>

      {/* ESG & Corporate Carbon Offset Section */}
      <div className="pt-8">
        <EcoImpactCalculator initialUnits={qty || 250} isB2B={true} />
      </div>
    </div>
  );
}
