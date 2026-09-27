"use client";

import React, { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useCart } from "@/lib/cart-context";
import { DIVISIONS, determineZone, isValidBDPhone } from "@/lib/locations";
import { Button } from "@/components/ui/Button";
import { formatPrice, toBanglaNumber } from "@/lib/utils";
import {
  Truck,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  Phone,
  MapPin,
  CreditCard,
  Banknote,
} from "lucide-react";

export default function CheckoutPage() {
  const router = useRouter();
  const { items, subtotal, clearCart } = useCart();

  // Customer State
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");

  // Address State
  const [selectedDivision, setSelectedDivision] = useState("Dhaka");
  const [selectedDistrict, setSelectedDistrict] = useState("Dhaka");
  const [isDhakaCity, setIsDhakaCity] = useState(true);
  const [area, setArea] = useState("");
  const [addressLine, setAddressLine] = useState("");
  const [notes, setNotes] = useState("");

  // UI state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Delivery zone resolution
  const zone = useMemo(() => {
    return determineZone(selectedDistrict, isDhakaCity);
  }, [selectedDistrict, isDhakaCity]);

  const zoneFee = {
    dhaka_city: 70,
    dhaka_sub: 100,
    outside: 130,
  }[zone];

  const deliveryFee = subtotal >= 2500 ? 0 : zoneFee;
  const total = subtotal + deliveryFee;

  // Handle Division change
  const handleDivisionChange = (divName: string) => {
    setSelectedDivision(divName);
    const firstDistrict = DIVISIONS[divName].districts[0].en;
    setSelectedDistrict(firstDistrict);
  };

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    if (!items || items.length === 0) {
      setErrorMessage("কার্টে কোনো পণ্য নেই। অনুগ্রহ করে শপ থেকে পণ্য যোগ করুন।");
      return;
    }

    if (!isValidBDPhone(customerPhone)) {
      setErrorMessage("সঠিক ১১ ডিজিটের বাংলাদেশী মোবাইল নম্বর দিন (যেমন: 01712345678)");
      return;
    }

    if (!customerName.trim() || !addressLine.trim()) {
      setErrorMessage("দয়া করে নাম ও সম্পূর্ণ ঠিকানা পূরণ করুন।");
      return;
    }

    setIsSubmitting(true);

    try {
      const payload = {
        customerName,
        customerPhone,
        customerEmail,
        division: selectedDivision,
        district: selectedDistrict,
        area: area || (isDhakaCity ? "ঢাকা সিটি" : "ঢাকা উপশহর"),
        addressLine,
        zone,
        lines: items.map((i) => ({
          variantId: `${i.product.id}-${i.variant.k}`,
          productName: i.product.bn,
          variantName: i.variant.bn,
          qty: i.qty,
        })),
        notes,
      };

      const res = await fetch("/api/v1/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "অর্ডার সম্পন্ন করা সম্ভব হয়নি।");
      }

      // Success
      clearCart();
      router.push(`/order/${data.orderNumber}`);
    } catch (err: any) {
      setErrorMessage(err.message || "সার্ভার এরর, অনুগ্রহ করে আবার চেষ্টা করুন।");
      setIsSubmitting(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center space-y-4">
        <h1 className="text-2xl font-bold font-bn-display text-forest">
          আপনার ব্যাগটি খালি!
        </h1>
        <p className="text-xs text-ink/70">
          চেকআউট করার পূর্বে শপ থেকে পণ্য ব্যাগে যোগ করুন।
        </p>
        <Link href="/shop">
          <Button variant="primary" size="md">শপ ব্রাউজ করুন</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-8 pb-24">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs text-ink/60">
        <Link href="/" className="hover:text-leaf">হোম</Link>
        <span>/</span>
        <Link href="/cart" className="hover:text-leaf">ব্যাগ</Link>
        <span>/</span>
        <span className="text-leaf font-medium">ক্যাশ অন ডেলিভারি চেকআউট</span>
      </div>

      <div className="border-b border-sand pb-4">
        <h1 className="text-2xl sm:text-3xl font-bold font-bn-display text-forest">
          অর্ডার ও ডেলিভারি তথ্য (COD)
        </h1>
        <p className="text-xs text-ink/60 mt-1 font-bn">
          পণ্য হাতে পেয়ে মূল্য পরিশোধ করুন। সারা দেশে দ্রুত ও নিরাপদ হোম ডেলিভারি।
        </p>
      </div>

      {errorMessage && (
        <div className="p-4 bg-clay/10 border border-clay/30 rounded-xl text-xs text-clay font-semibold flex items-center gap-2">
          <AlertCircle className="w-5 h-5 flex-shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Form: Delivery Address */}
        <div className="lg:col-span-7 space-y-6">
          {/* Customer Contact */}
          <div className="bg-white border border-sand rounded-xl p-6 shadow-card space-y-4">
            <h2 className="font-bold text-base text-forest flex items-center gap-2 border-b border-sand pb-3">
              <Phone className="w-4 h-4 text-leaf" />
              <span>১. যোগাযোগের তথ্য</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="space-y-1">
                <label className="font-bold text-ink/80 block">আপনার নাম *</label>
                <input
                  type="text"
                  required
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="যেমন: সাকিব আল হাসান"
                  className="w-full px-3.5 py-2.5 rounded-lg border border-sand bg-cream text-ink focus:outline-none focus:ring-1 focus:ring-jute"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-ink/80 block">মোবাইল নম্বর (১১ ডিজিট) *</label>
                <input
                  type="tel"
                  required
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  placeholder="017xxxxxxxx"
                  className="w-full px-3.5 py-2.5 rounded-lg border border-sand bg-cream text-ink focus:outline-none focus:ring-1 focus:ring-jute"
                />
              </div>

              <div className="sm:col-span-2 space-y-1">
                <label className="font-bold text-ink/80 block">ইমেইল (ঐচ্ছিক - ইনভয়েস পাওয়ার জন্য)</label>
                <input
                  type="email"
                  value={customerEmail}
                  onChange={(e) => setCustomerEmail(e.target.value)}
                  placeholder="youremail@gmail.com"
                  className="w-full px-3.5 py-2.5 rounded-lg border border-sand bg-cream text-ink focus:outline-none focus:ring-1 focus:ring-jute"
                />
              </div>
            </div>
          </div>

          {/* Delivery Address (8 Divisions + 64 Districts) */}
          <div className="bg-white border border-sand rounded-xl p-6 shadow-card space-y-4">
            <h2 className="font-bold text-base text-forest flex items-center gap-2 border-b border-sand pb-3">
              <MapPin className="w-4 h-4 text-leaf" />
              <span>২. ডেলিভারি ঠিকানা (৬৪ জেলা)</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="space-y-1">
                <label className="font-bold text-ink/80 block">বিভাগ *</label>
                <select
                  value={selectedDivision}
                  onChange={(e) => handleDivisionChange(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-sand bg-cream text-ink focus:outline-none focus:ring-1 focus:ring-jute cursor-pointer"
                >
                  {Object.keys(DIVISIONS).map((divKey) => (
                    <option key={divKey} value={divKey}>
                      {DIVISIONS[divKey].bn} ({DIVISIONS[divKey].en})
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-ink/80 block">জেলা (৬৪ জেলা) *</label>
                <select
                  value={selectedDistrict}
                  onChange={(e) => setSelectedDistrict(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-sand bg-cream text-ink focus:outline-none focus:ring-1 focus:ring-jute cursor-pointer"
                >
                  {DIVISIONS[selectedDivision].districts.map((d) => (
                    <option key={d.en} value={d.en}>
                      {d.bn} ({d.en})
                    </option>
                  ))}
                </select>
              </div>

              {/* Special check if Dhaka District */}
              {selectedDistrict === "Dhaka" && (
                <div className="sm:col-span-2 p-3.5 rounded-lg bg-sand/30 border border-sand space-y-2">
                  <span className="font-bold text-forest block">ঢাকার এলাকা নির্ধারণ করুন:</span>
                  <div className="flex gap-4">
                    <label className="flex items-center gap-2 cursor-pointer font-medium">
                      <input
                        type="radio"
                        name="dhakaArea"
                        checked={isDhakaCity}
                        onChange={() => setIsDhakaCity(true)}
                        className="accent-leaf"
                      />
                      <span>ঢাকা সিটি কর্পোরেশন (চার্জ: ৳৭০)</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer font-medium">
                      <input
                        type="radio"
                        name="dhakaArea"
                        checked={!isDhakaCity}
                        onChange={() => setIsDhakaCity(false)}
                        className="accent-leaf"
                      />
                      <span>উপশহর / সাভার / কেরানীগঞ্জ (চার্জ: ৳১০০)</span>
                    </label>
                  </div>
                </div>
              )}

              <div className="sm:col-span-2 space-y-1">
                <label className="font-bold text-ink/80 block">থানা / উপজেলা / এলাকা *</label>
                <input
                  type="text"
                  required
                  value={area}
                  onChange={(e) => setArea(e.target.value)}
                  placeholder="যেমন: ধানমন্ডি / উত্তরা / সদর"
                  className="w-full px-3.5 py-2.5 rounded-lg border border-sand bg-cream text-ink focus:outline-none focus:ring-1 focus:ring-jute"
                />
              </div>

              <div className="sm:col-span-2 space-y-1">
                <label className="font-bold text-ink/80 block">সম্পূর্ণ ঠিকানা (বাসা, রোড ও বিস্তারিত) *</label>
                <textarea
                  rows={2}
                  required
                  value={addressLine}
                  onChange={(e) => setAddressLine(e.target.value)}
                  placeholder="বাড়ি নম্বর, রোড নম্বর, ফ্ল্যাট বা নিকটস্থ পরিচিত স্থান..."
                  className="w-full px-3.5 py-2 rounded-lg border border-sand bg-cream text-ink focus:outline-none focus:ring-1 focus:ring-jute"
                />
              </div>
            </div>
          </div>

          {/* Payment Method Choice */}
          <div className="bg-white border border-sand rounded-xl p-6 shadow-card space-y-4">
            <h2 className="font-bold text-base text-forest flex items-center gap-2 border-b border-sand pb-3">
              <Banknote className="w-4 h-4 text-leaf" />
              <span>৩. পেমেন্ট পদ্ধতি</span>
            </h2>

            <div className="p-4 rounded-xl border-2 border-leaf bg-leaf/5 flex items-start gap-3">
              <input
                type="radio"
                checked
                readOnly
                className="mt-1 accent-leaf w-4 h-4"
              />
              <div className="text-xs">
                <strong className="text-forest font-bold text-sm block">
                  ক্যাশ অন ডেলিভারি (Cash on Delivery)
                </strong>
                <p className="text-ink/75 mt-0.5 font-bn">
                  পণ্য হাতে পেয়ে ডেলিভারি ম্যানের কাছে মূল্য পরিশোধ করুন। অগ্রিম কোনো ফি প্রদান করতে হবে না।
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Sidebar: Order Summary */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white border border-sand rounded-xl p-6 shadow-card space-y-6 sticky top-24">
            <h2 className="font-bold text-base text-forest border-b border-sand pb-3">
              অর্ডার বিবরণী ({toBanglaNumber(items.length)}টি পণ্য)
            </h2>

            {/* Items summary */}
            <div className="space-y-3 max-h-60 overflow-y-auto divide-y divide-sand/40 pr-1 text-xs">
              {items.map((i) => (
                <div key={`${i.product.id}-${i.variant.k}`} className="pt-2 first:pt-0 flex justify-between gap-3">
                  <div>
                    <h4 className="font-semibold text-forest">{i.product.bn}</h4>
                    <span className="text-ink/60 text-[11px] block">
                      {i.variant.bn} × {toBanglaNumber(i.qty)}
                    </span>
                  </div>
                  <span className="font-bold text-forest">
                    {formatPrice(i.variant.price * i.qty, "bn")}
                  </span>
                </div>
              ))}
            </div>

            {/* Calculations */}
            <div className="border-t border-sand pt-4 space-y-2 text-xs">
              <div className="flex justify-between text-ink/75">
                <span>পণ্যের মোট মূল্য:</span>
                <span className="font-semibold">{formatPrice(subtotal, "bn")}</span>
              </div>

              <div className="flex justify-between text-ink/75">
                <span>ডেলিভারি এলাকা:</span>
                <span className="font-semibold">
                  {zone === "dhaka_city" ? "ঢাকা সিটি (৳৭০)" : zone === "dhaka_sub" ? "উপশহর (৳১০০)" : "ঢাকার বাইরে (৳১৩০)"}
                </span>
              </div>

              <div className="flex justify-between text-ink/75">
                <span>ডেলিভারি চার্জ:</span>
                <span className="font-semibold">
                  {deliveryFee === 0 ? (
                    <span className="text-leaf font-bold">ফ্রি ডেলিভারি (০৳)</span>
                  ) : (
                    formatPrice(deliveryFee, "bn")
                  )}
                </span>
              </div>

              <div className="border-t border-sand pt-3 flex justify-between items-baseline">
                <span className="font-bold text-forest text-base">সর্বমোট প্রদেয় বিল:</span>
                <span className="text-2xl font-bold font-bn-display text-forest">
                  {formatPrice(total, "bn")}
                </span>
              </div>
            </div>

            {/* Place Order CTA */}
            <Button
              variant="primary"
              size="lg"
              type="submit"
              isLoading={isSubmitting}
              className="w-full shadow-md flex items-center justify-center gap-2"
            >
              <CheckCircle2 className="w-5 h-5" />
              <span>অর্ডার কনফার্ম করুন (ক্যাশ অন ডেলিভারি)</span>
            </Button>

            <p className="text-[11px] text-ink/60 text-center font-bn leading-relaxed">
              অর্ডার প্লেস করার পর আমরা দ্রুততম সময়ে ফোন করে ঠিকানা ও পণ্য নিশ্চিত করব।
            </p>
          </div>
        </div>
      </form>
    </div>
  );
}
