"use client";

import React, { useState } from "react";
import { quoteB2B, B2BConfig } from "@/lib/pricing";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { formatPrice, toBanglaNumber } from "@/lib/utils";
import {
  Briefcase,
  Building2,
  CheckCircle2,
  Calculator,
  Upload,
  Send,
  Sparkles,
  AlertCircle,
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

export default function B2BPage() {
  const [qty, setQty] = useState<number>(100);
  const [includeLogo, setIncludeLogo] = useState<boolean>(true);
  const [submitted, setSubmitted] = useState<boolean>(false);

  // Form states
  const [companyName, setCompanyName] = useState("");
  const [contactName, setContactName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [notes, setNotes] = useState("");

  // Calculate pricing
  let quote = null;
  let error = null;
  let nudge = null;

  try {
    quote = quoteB2B(qty, includeLogo, b2bConfig);

    // Smart tier nudging (if qty close to next tier)
    if (qty >= 180 && qty < 200) {
      const diff = 200 - qty;
      nudge = `💡 আর ${toBanglaNumber(diff)}টি যোগ করে ২০০ পিস করলে প্রতি পিসের দাম ১৮০৳ থেকে কমে ১৬০৳ হবে!`;
    } else if (qty >= 480 && qty < 500) {
      const diff = 500 - qty;
      nudge = `💡 আর ${toBanglaNumber(diff)}টি যোগ করে ৫০০ পিস করলে প্রতি পিসের দাম ১৬০৳ থেকে কমে ১৪০৳ হবে!`;
    }
  } catch (err: any) {
    if (err.message === "BELOW_MOQ") {
      error = "সর্বনিম্ন অর্ডার ৫০ পিস (MOQ: 50)";
    } else {
      error = "অর্ডারের পরিমাণ সঠিক নয়";
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-16 space-y-16 pb-24">
      {/* Hero Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <Badge variant="sale">পাইকারি ও করপোরেট সল্যুশন</Badge>
        <h1 className="text-3xl sm:text-5xl font-bold font-bn-display text-forest tracking-tight">
          কর্পোরেট ইভেন্ট ও ব্র্যান্ডেড পাটপণ্য
        </h1>
        <p className="text-sm sm:text-base text-ink/80 leading-relaxed font-bn">
          প্রতিষ্ঠানের নিজস্ব লোগো ও ব্র্যান্ডিং সহ টেকসই ও পরিবেশবান্ধব পাটের ব্যাগ। কনফারেন্স, গিফটিং ও রিটেল বাল্ক অর্ডারের নির্ভরযোগ্য প্ল্যাটফর্ম।
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
              <h2 className="font-bold text-lg text-forest">লাইভ প্রাইসিং ক্যালকুলেটর</h2>
              <p className="text-xs text-ink/60">স্ট্যান্ডার্ড পাটের টোট ব্যাগ (১৫×১৬ ইঞ্চি)</p>
            </div>
          </div>

          {/* Volume Tiers Table */}
          <div className="bg-sand/20 border border-sand/60 rounded-xl p-4 space-y-2 text-xs">
            <span className="font-bold text-forest block">ভলিউম টায়ার রেট:</span>
            <div className="grid grid-cols-3 gap-2 text-center">
              <div className={`p-2 rounded-lg border ${qty >= 50 && qty < 200 ? "border-leaf bg-leaf/10 font-bold" : "border-sand/40 bg-white"}`}>
                <span className="block text-[11px] text-ink/60">৫০–১৯৯ পিস</span>
                <span className="text-leaf font-bold">৳১৮০/পিস</span>
              </div>
              <div className={`p-2 rounded-lg border ${qty >= 200 && qty < 500 ? "border-leaf bg-leaf/10 font-bold" : "border-sand/40 bg-white"}`}>
                <span className="block text-[11px] text-ink/60">২০০–৪৯৯ পিস</span>
                <span className="text-leaf font-bold">৳১৬০/পিস</span>
              </div>
              <div className={`p-2 rounded-lg border ${qty >= 500 ? "border-leaf bg-leaf/10 font-bold" : "border-sand/40 bg-white"}`}>
                <span className="block text-[11px] text-ink/60">৫০০+ পিস</span>
                <span className="text-leaf font-bold">৳১৪০/পিস</span>
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="space-y-4">
            <div className="space-y-1.5">
              <div className="flex justify-between items-center text-xs font-bold text-ink">
                <span>অর্ডারের পরিমাণ:</span>
                <span className="text-sm text-forest font-bold">{toBanglaNumber(qty)} পিস</span>
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
                <span>৫০ পিস (MOQ)</span>
                <span>২০০ পিস</span>
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
                <span className="font-bold text-forest block">নিজস্ব ব্র্যান্ড লোগো প্রিন্ট যোগ করুন</span>
                <span className="text-ink/60">
                  প্রতি পিসে +৳২৫ প্রিন্টিং ফি এবং এককালীন ৳১,৫০০ স্ক্রিন সেটআপ ফি।
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
                <span>প্রতি পিসের ইউনিট রেট:</span>
                <span className="font-semibold text-white">৳{quote.unit}</span>
              </div>
              {includeLogo && (
                <div className="flex justify-between text-xs text-sand/80">
                  <span>স্ক্রিন সেটআপ ফি:</span>
                  <span className="font-semibold text-white">৳১,৫০০</span>
                </div>
              )}
              <div className="border-t border-sand/20 pt-2 flex justify-between items-baseline">
                <span className="font-semibold text-sm">মোট প্রাক্কলিত মূল্য:</span>
                <span className="text-2xl font-bold font-bn-display text-jute">
                  ৳{quote.total.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between text-xs text-sand/70 pt-1 border-t border-sand/10">
                <span>প্রডাকশন শুরুর অগ্রিম (৫০%):</span>
                <span className="font-bold text-sand">৳{quote.deposit.toLocaleString()}</span>
              </div>
            </div>
          )}
        </div>

        {/* Right: Quote Request Form */}
        <div className="lg:col-span-6 bg-white border border-sand rounded-2xl p-6 sm:p-8 shadow-card space-y-6">
          <div className="border-b border-sand pb-4">
            <h2 className="font-bold text-lg text-forest flex items-center gap-2">
              <Building2 className="w-5 h-5 text-leaf" />
              <span>অফিসিয়াল কোটেশন রিকোয়েস্ট</span>
            </h2>
            <p className="text-xs text-ink/60 mt-1">
              ফর্মটি পূরণ করুন, আমাদের কর্পোরেট টিম ২৪ ঘণ্টার মধ্যে লিখিত প্রপোজাল পাঠাবে।
            </p>
          </div>

          {submitted ? (
            <div className="py-12 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-leaf/10 text-leaf mx-auto flex items-center justify-center">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h3 className="text-xl font-bold text-forest">ধন্যবাদ! কোট রিকোয়েস্ট জমা হয়েছে</h3>
              <p className="text-xs text-ink/70 max-w-sm mx-auto leading-relaxed">
                আপনার দেওয়া নম্বরে আমাদের কি-অ্যাকাউন্ট ম্যানেজার শীঘ্রই যোগাযোগ করবেন এবং ইমেইলে চূড়ান্ত চালানপত্র পৌঁছে যাবে।
              </p>
              <Button variant="secondary" size="sm" onClick={() => setSubmitted(false)}>
                নতুন রিকোয়েস্ট পাঠান
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-bold text-ink/80 block">প্রতিষ্ঠানের নাম *</label>
                  <input
                    type="text"
                    required
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    placeholder="কোম্পানি / সংস্থার নাম"
                    className="w-full px-3.5 py-2.5 rounded-lg border border-sand bg-cream text-ink focus:outline-none focus:ring-1 focus:ring-jute"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-ink/80 block">দায়িত্বপ্রাপ্ত কর্মকর্তার নাম *</label>
                  <input
                    type="text"
                    required
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    placeholder="আপনার নাম"
                    className="w-full px-3.5 py-2.5 rounded-lg border border-sand bg-cream text-ink focus:outline-none focus:ring-1 focus:ring-jute"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-bold text-ink/80 block">মোবাইল নম্বর *</label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="০১৭xxxxxxxx"
                    className="w-full px-3.5 py-2.5 rounded-lg border border-sand bg-cream text-ink focus:outline-none focus:ring-1 focus:ring-jute"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-ink/80 block">অফিসিয়াল ইমেইল *</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="corporate@company.com"
                    className="w-full px-3.5 py-2.5 rounded-lg border border-sand bg-cream text-ink focus:outline-none focus:ring-1 focus:ring-jute"
                  />
                </div>
              </div>

              {/* Logo Upload Slot */}
              <div className="space-y-1">
                <label className="font-bold text-ink/80 block">
                  লোগো বা রেফারেন্স ডিজাইন (ঐচ্ছিক):
                </label>
                <div className="border-2 border-dashed border-sand rounded-xl p-4 text-center bg-cream/30 hover:border-leaf cursor-pointer transition-colors">
                  <Upload className="w-5 h-5 mx-auto text-ink/40 mb-1" />
                  <span className="text-[11px] text-ink/60 block">
                    AI, EPS, PDF, বা হাই-রেজুলিউশন PNG ড্রপ করুন
                  </span>
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-ink/80 block">বিশেষ নির্দেশনা / ডেলিভারি সময়সীমা</label>
                <textarea
                  rows={3}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="যেমন: ইভেন্টের তারিখ, বিশেষ সাইজ বা প্যাকেজিংয়ের চাহিদা..."
                  className="w-full px-3.5 py-2 rounded-lg border border-sand bg-cream text-ink focus:outline-none focus:ring-1 focus:ring-jute"
                />
              </div>

              <Button variant="quote" size="lg" type="submit" className="w-full shadow-md flex items-center justify-center gap-2">
                <Send className="w-4 h-4" />
                <span>কোটেশন রিকোয়েস্ট জমা দিন</span>
              </Button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
