"use client";

import React, { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useCart } from "@/lib/cart-context";
import { DIVISIONS, determineZone, isValidBDPhone } from "@/lib/locations";
import { Button } from "@/components/ui/Button";
import { ProductArt } from "@/components/ui/ProductArt";
import { useLanguage } from "@/lib/i18n-context";
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
  const { locale, formatPrice, toLocaleDigits, t } = useLanguage();

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
  const [paymentMethod, setPaymentMethod] = useState<"cod" | "sslcommerz">("cod");

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

  const codLimit = 10000;
  const isCodAllowed = total <= codLimit;

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
      setErrorMessage(locale === "bn" ? "কার্টে কোনো পণ্য নেই। অনুগ্রহ করে শপ থেকে পণ্য যোগ করুন।" : "Cart is empty. Please add products from the shop.");
      return;
    }

    if (!isValidBDPhone(customerPhone)) {
      setErrorMessage(locale === "bn" ? "সঠিক ১১ ডিজিটের বাংলাদেশী মোবাইল নম্বর দিন (যেমন: 01712345678)" : "Please enter a valid 11-digit Bangladeshi mobile number (e.g., 01712345678)");
      return;
    }

    if (!customerName.trim() || !addressLine.trim()) {
      setErrorMessage(locale === "bn" ? "দয়া করে নাম ও সম্পূর্ণ ঠিকানা পূরণ করুন।" : "Please fill in your name and full address.");
      return;
    }

    const selectedMethod = !isCodAllowed ? "sslcommerz" : paymentMethod;

    setIsSubmitting(true);

    try {
      const payload = {
        customerName,
        customerPhone,
        customerEmail,
        division: selectedDivision,
        district: selectedDistrict,
        area: area || (isDhakaCity ? (locale === "bn" ? "ঢাকা সিটি" : "Dhaka City") : (locale === "bn" ? "ঢাকা উপশহর" : "Dhaka Suburbs")),
        addressLine,
        zone,
        paymentMethod: selectedMethod,
        lines: items.map((i) => ({
          variantId: `${i.product.id}-${i.variant.k}`,
          productName: locale === "bn" ? i.product.bn : (i.product.en || i.product.bn),
          variantName: locale === "bn" ? i.variant.bn : (i.variant.en || i.variant.bn),
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
        throw new Error(data.error || (locale === "bn" ? "অর্ডার সম্পন্ন করা সম্ভব হয়নি।" : "Could not complete the order."));
      }

      // If SSLCommerz selected, initiate payment session
      if (selectedMethod === "sslcommerz") {
        const initRes = await fetch("/api/v1/payments/sslcommerz/init", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ orderNumber: data.orderNumber }),
        });

        const initData = await initRes.json();
        if (initData.success && initData.gatewayUrl) {
          clearCart();
          window.location.href = initData.gatewayUrl;
          return;
        }
      }

      // COD Success
      clearCart();
      router.push(`/order/${data.orderNumber}`);
    } catch (err: any) {
      setErrorMessage(err.message || (locale === "bn" ? "সার্ভার এরর, অনুগ্রহ করে আবার চেষ্টা করুন।" : "Server error, please try again."));
      setIsSubmitting(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center space-y-4">
        <h1 className="text-2xl font-bold font-bn-display text-forest">
          {locale === "bn" ? "আপনার ব্যাগটি খালি!" : "Your bag is empty!"}
        </h1>
        <p className="text-xs text-ink/70">
          {locale === "bn" ? "চেকআউট করার পূর্বে শপ থেকে পণ্য ব্যাগে যোগ করুন।" : "Please add products to your bag from the shop before checking out."}
        </p>
        <div className="pt-2">
          <Button href="/shop" variant="primary" size="md">{locale === "bn" ? "শপ ব্রাউজ করুন" : "Browse Shop"}</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-8 pb-24">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs text-ink/60">
        <Link href="/" className="hover:text-leaf">{locale === "bn" ? "হোম" : "Home"}</Link>
        <span>/</span>
        <Link href="/cart" className="hover:text-leaf">{locale === "bn" ? "ব্যাগ" : "Bag"}</Link>
        <span>/</span>
        <span className="text-leaf font-medium">{locale === "bn" ? "ক্যাশ অন ডেলিভারি চেকআউট" : "Cash on Delivery Checkout"}</span>
      </div>

      <div className="border-b border-sand pb-4">
        <h1 className="text-2xl sm:text-3xl font-bold font-bn-display text-forest">
          {locale === "bn" ? "অর্ডার ও ডেলিভারি তথ্য (COD)" : "Order & Delivery Information (COD)"}
        </h1>
        <p className="text-xs text-ink/60 mt-1 font-bn">
          {locale === "bn" ? "পণ্য হাতে পেয়ে মূল্য পরিশোধ করুন। সারা দেশে দ্রুত ও নিরাপদ হোম ডেলিভারি।" : "Pay upon receiving the product. Fast and secure home delivery across the country."}
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
              <span>{locale === "bn" ? "১. যোগাযোগের তথ্য" : "1. Contact Information"}</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="space-y-1">
                <label className="font-bold text-ink/80 block">{locale === "bn" ? "আপনার নাম *" : "Your Name *"}</label>
                <input
                  type="text"
                  required
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder={locale === "bn" ? "যেমন: সাকিব আল হাসান" : "e.g., Shakib Al Hasan"}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-sand bg-cream text-ink focus:outline-none focus:ring-1 focus:ring-jute"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-ink/80 block">{locale === "bn" ? "মোবাইল নম্বর (১১ ডিজিট) *" : "Mobile Number (11 digits) *"}</label>
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
                <label className="font-bold text-ink/80 block">{locale === "bn" ? "ইমেইল (ঐচ্ছিক - ইনভয়েস পাওয়ার জন্য)" : "Email (Optional - for invoice)"}</label>
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
              <span>{locale === "bn" ? "২. ডেলিভারি ঠিকানা (৬৪ জেলা)" : "2. Delivery Address (64 Districts)"}</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="space-y-1">
                <label className="font-bold text-ink/80 block">{locale === "bn" ? "বিভাগ *" : "Division *"}</label>
                <select
                  value={selectedDivision}
                  onChange={(e) => handleDivisionChange(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-sand bg-cream text-ink focus:outline-none focus:ring-1 focus:ring-jute cursor-pointer"
                >
                  {Object.keys(DIVISIONS).map((divKey) => (
                    <option key={divKey} value={divKey}>
                      {locale === "bn" ? DIVISIONS[divKey].bn : DIVISIONS[divKey].en}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-ink/80 block">{locale === "bn" ? "জেলা (৬৪ জেলা) *" : "District (64 Districts) *"}</label>
                <select
                  value={selectedDistrict}
                  onChange={(e) => setSelectedDistrict(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-sand bg-cream text-ink focus:outline-none focus:ring-1 focus:ring-jute cursor-pointer"
                >
                  {DIVISIONS[selectedDivision].districts.map((d) => (
                    <option key={d.en} value={d.en}>
                      {locale === "bn" ? d.bn : d.en}
                    </option>
                  ))}
                </select>
              </div>

              {/* Special check if Dhaka District */}
              {selectedDistrict === "Dhaka" && (
                <div className="sm:col-span-2 p-3.5 rounded-lg bg-sand/30 border border-sand space-y-2">
                  <span className="font-bold text-forest block">{locale === "bn" ? "ঢাকার এলাকা নির্ধারণ করুন:" : "Select Dhaka Area:"}</span>
                  <div className="flex gap-4">
                    <label className="flex items-center gap-2 cursor-pointer font-medium">
                      <input
                        type="radio"
                        name="dhakaArea"
                        checked={isDhakaCity}
                        onChange={() => setIsDhakaCity(true)}
                        className="accent-leaf"
                      />
                      <span>{locale === "bn" ? "ঢাকা সিটি কর্পোরেশন (চার্জ: ৳৭০)" : `Dhaka City Corporation (Charge: ${formatPrice(70)})`}</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer font-medium">
                      <input
                        type="radio"
                        name="dhakaArea"
                        checked={!isDhakaCity}
                        onChange={() => setIsDhakaCity(false)}
                        className="accent-leaf"
                      />
                      <span>{locale === "bn" ? "উপশহর / সাভার / কেরানীগঞ্জ (চার্জ: ৳১০০)" : `Suburbs / Savar / Keraniganj (Charge: ${formatPrice(100)})`}</span>
                    </label>
                  </div>
                </div>
              )}

              <div className="sm:col-span-2 space-y-1">
                <label className="font-bold text-ink/80 block">{locale === "bn" ? "থানা / উপজেলা / এলাকা *" : "Thana / Upazila / Area *"}</label>
                <input
                  type="text"
                  required
                  value={area}
                  onChange={(e) => setArea(e.target.value)}
                  placeholder={locale === "bn" ? "যেমন: ধানমন্ডি / উত্তরা / সদর" : "e.g., Dhanmondi / Uttara / Sadar"}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-sand bg-cream text-ink focus:outline-none focus:ring-1 focus:ring-jute"
                />
              </div>

              <div className="sm:col-span-2 space-y-1">
                <label className="font-bold text-ink/80 block">{locale === "bn" ? "সম্পূর্ণ ঠিকানা (বাসা, রোড ও বিস্তারিত) *" : "Full Address (House, Road & Details) *"}</label>
                <textarea
                  rows={2}
                  required
                  value={addressLine}
                  onChange={(e) => setAddressLine(e.target.value)}
                  placeholder={locale === "bn" ? "বাড়ি নম্বর, রোড নম্বর, ফ্ল্যাট বা নিকটস্থ পরিচিত স্থান..." : "House number, road number, flat or nearby landmark..."}
                  className="w-full px-3.5 py-2 rounded-lg border border-sand bg-cream text-ink focus:outline-none focus:ring-1 focus:ring-jute"
                />
              </div>
            </div>
          </div>

          {/* Payment Method Choice */}
          <div className="bg-white border border-sand rounded-xl p-6 shadow-card space-y-4">
            <h2 className="font-bold text-base text-forest flex items-center gap-2 border-b border-sand pb-3">
              <Banknote className="w-4 h-4 text-leaf" />
              <span>{locale === "bn" ? "৩. পেমেন্ট পদ্ধতি নির্বাচন করুন" : "3. Select Payment Method"}</span>
            </h2>

            {/* COD Option */}
            <label
              className={`p-4 rounded-xl border-2 flex items-start gap-3 transition-all ${
                !isCodAllowed
                  ? "opacity-50 cursor-not-allowed bg-sand/20 border-sand"
                  : paymentMethod === "cod"
                  ? "border-leaf bg-leaf/5 cursor-pointer ring-1 ring-leaf"
                  : "border-sand hover:bg-cream cursor-pointer"
              }`}
            >
              <input
                type="radio"
                name="paymentMethod"
                value="cod"
                disabled={!isCodAllowed}
                checked={isCodAllowed && paymentMethod === "cod"}
                onChange={() => setPaymentMethod("cod")}
                className="mt-1 accent-leaf w-4 h-4 cursor-pointer"
              />
              <div className="text-xs space-y-0.5">
                <strong className="text-forest font-bold text-sm block">
                  {locale === "bn" ? "ক্যাশ অন ডেলিভারি (Cash on Delivery)" : "Cash on Delivery"}
                </strong>
                <p className="text-ink/75 font-bn">
                  {locale === "bn" ? "পণ্য হাতে পেয়ে ডেলিভারি ম্যানের কাছে মূল্য পরিশোধ করুন। সারা দেশে প্রযোজ্য।" : "Pay the delivery man upon receiving the product. Applicable nationwide."}
                </p>
                {!isCodAllowed && (
                  <span className="text-[11px] text-clay font-bold block pt-1">
                    {locale === "bn" ? "⚠️ ৳১০,০০০ এর বেশি অর্ডারে অগ্রিম অনলাইন পেমেন্ট বাধ্যতামূলক।" : `⚠️ Advance online payment is mandatory for orders above ${formatPrice(10000)}.`}
                  </span>
                )}
              </div>
            </label>

            {/* SSLCommerz Option */}
            <label
              className={`p-4 rounded-xl border-2 flex items-start gap-3 transition-all cursor-pointer ${
                paymentMethod === "sslcommerz" || !isCodAllowed
                  ? "border-leaf bg-leaf/5 ring-1 ring-leaf"
                  : "border-sand hover:bg-cream"
              }`}
            >
              <input
                type="radio"
                name="paymentMethod"
                value="sslcommerz"
                checked={paymentMethod === "sslcommerz" || !isCodAllowed}
                onChange={() => setPaymentMethod("sslcommerz")}
                className="mt-1 accent-leaf w-4 h-4 cursor-pointer"
              />
              <div className="text-xs space-y-1.5 flex-1">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <strong className="text-forest font-bold text-sm">
                    {locale === "bn" ? "বিকাশ / নগদ / রকেট / কার্ড" : "bKash / Nagad / Rocket / Card"}
                  </strong>
                  <span className="text-[10px] bg-sand/40 text-forest px-2 py-0.5 rounded font-bold uppercase">
                    SSLCommerz গেটওয়ে
                  </span>
                </div>
                <p className="text-ink/75 font-bn">
                  {locale === "bn" ? "bKash, Nagad, Rocket, ও যেকোনো ডেবিট/ক্রেডিট কার্ডের মাধ্যমে তাৎক্ষণিক ও নিরাপদ পেমেন্ট।" : "Instant and secure payment via bKash, Nagad, Rocket, and any debit/credit card."}
                </p>
                <div className="flex items-center gap-1.5 text-[11px] font-bold text-ink/70 pt-1">
                  <span className="text-[#D8236B]">bKash</span> ·{" "}
                  <span className="text-[#F7941D]">Nagad</span> ·{" "}
                  <span className="text-[#8C3494]">Rocket</span> ·{" "}
                  <span className="text-blue-800">Visa / Mastercard</span>
                </div>
              </div>
            </label>
          </div>
        </div>

        {/* Right Sidebar: Order Summary */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white border border-sand rounded-xl p-6 shadow-card space-y-6 sticky top-24">
            <h2 className="font-bold text-base text-forest border-b border-sand pb-3">
              {locale === "bn" ? `অর্ডার বিবরণী (${toLocaleDigits(items.length)}টি পণ্য)` : `Order Summary (${toLocaleDigits(items.length)} items)`}
            </h2>

            {/* Items summary */}
            <div className="space-y-3 max-h-64 overflow-y-auto divide-y divide-sand/40 pr-1 text-xs">
              {items.map((i) => (
                <div key={`${i.product.id}-${i.variant.k}`} className="pt-2.5 first:pt-0 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-10 h-12 rounded-md bg-cream border border-sand p-1 flex items-center justify-center flex-shrink-0">
                      <ProductArt slug={i.product.slug} className="w-full h-full object-contain" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-forest line-clamp-1">{i.product.bn}</h4>
                      <span className="text-ink/60 text-[11px] block">
                        {i.variant.bn} × {toLocaleDigits(i.qty)}
                      </span>
                    </div>
                  </div>
                  <span className="font-bold text-forest whitespace-nowrap">
                    {formatPrice(i.variant.price * i.qty)}
                  </span>
                </div>
              ))}
            </div>

            {/* Calculations */}
            <div className="border-t border-sand pt-4 space-y-2 text-xs">
              <div className="flex justify-between text-ink/75">
                <span>{locale === "bn" ? "পণ্যের মোট মূল্য:" : "Products Total Price:"}</span>
                <span className="font-semibold">{formatPrice(subtotal)}</span>
              </div>

              <div className="flex justify-between text-ink/75">
                <span>{locale === "bn" ? "ডেলিভারি এলাকা:" : "Delivery Area:"}</span>
                <span className="font-semibold">
                  {zone === "dhaka_city" ? (locale === "bn" ? "ঢাকা সিটি (৳৭০)" : `Dhaka City (${formatPrice(70)})`) : zone === "dhaka_sub" ? (locale === "bn" ? "উপশহর (৳১০০)" : `Suburbs (${formatPrice(100)})`) : (locale === "bn" ? "ঢাকার বাইরে (৳১৩০)" : `Outside Dhaka (${formatPrice(130)})`)}
                </span>
              </div>

              <div className="flex justify-between text-ink/75">
                <span>{locale === "bn" ? "ডেলিভারি চার্জ:" : "Delivery Charge:"}</span>
                <span className="font-semibold">
                  {deliveryFee === 0 ? (
                    <span className="text-leaf font-bold">{locale === "bn" ? "ফ্রি ডেলিভারি (০৳)" : `Free Delivery (${formatPrice(0)})`}</span>
                  ) : (
                    formatPrice(deliveryFee)
                  )}
                </span>
              </div>

              <div className="border-t border-sand pt-3 flex justify-between items-baseline">
                <span className="font-bold text-forest text-base">{locale === "bn" ? "সর্বমোট প্রদেয় বিল:" : "Total Payable Bill:"}</span>
                <span className="text-2xl font-bold font-bn-display text-forest">
                  {formatPrice(total)}
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
              <span>
                {paymentMethod === "sslcommerz" || !isCodAllowed
                  ? locale === "bn" ? "অনলাইন পেমেন্টে এগিয়ে যান (bKash/নগদ/কার্ড)" : "Proceed to Online Payment (bKash/Nagad/Card)"
                  : locale === "bn" ? "অর্ডার কনফার্ম করুন (ক্যাশ অন ডেলিভারি)" : "Confirm Order (Cash on Delivery)"}
              </span>
            </Button>

            <p className="text-[11px] text-ink/60 text-center font-bn leading-relaxed">
              {paymentMethod === "sslcommerz" || !isCodAllowed
                ? locale === "bn" ? "বাটনটিতে ক্লিক করলে নিরাপদ SSLCommerz পেমেন্ট গেটওয়েতে রিডাইরেক্ট করা হবে।" : "Clicking the button will redirect you to the secure SSLCommerz payment gateway."
                : locale === "bn" ? "অর্ডার প্লেস করার পর আমরা দ্রুততম সময়ে ফোন করে ঠিকানা ও পণ্য নিশ্চিত করব।" : "After placing the order, we will call you as soon as possible to confirm the address and product."}
            </p>
          </div>
        </div>
      </form>
    </div>
  );
}
