"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useCart } from "@/lib/cart-context";
import { FreeDeliveryProgress } from "@/components/ui/FreeDeliveryProgress";
import { QtyStepper } from "@/components/ui/QtyStepper";
import { Button } from "@/components/ui/Button";
import { ProductArt } from "@/components/ui/ProductArt";
import { useLanguage } from "@/lib/i18n-context";
import { ShoppingBag, Trash2, ArrowRight, ShieldCheck, Tag } from "lucide-react";

export default function CartPage() {
  const { items, subtotal, updateQty, removeFromCart } = useCart();
  const { locale, t, formatPrice, toLocaleDigits } = useLanguage();
  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);
  const [couponError, setCouponError] = useState("");
  const [selectedZone, setSelectedZone] = useState<"dhaka_city" | "dhaka_sub" | "outside">("dhaka_city");

  const zoneRates = {
    dhaka_city: { label: locale === "bn" ? "ঢাকা সিটি" : "Dhaka City", fee: 70 },
    dhaka_sub: { label: locale === "bn" ? "ঢাকা উপশহর (সাভার/গাজীপুর/কেরানীগঞ্জ)" : "Dhaka Suburb (Savar/Gazipur/Keraniganj)", fee: 100 },
    outside: { label: locale === "bn" ? "ঢাকার বাইরে (অন্যান্য জেলা)" : "Outside Dhaka (Other Districts)", fee: 130 },
  };

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (couponCode.trim().toUpperCase() === "JUTE10") {
      setAppliedCoupon("JUTE10");
      setCouponError("");
    } else {
      setCouponError(locale === "bn" ? "অবৈধ বা মেয়াদোত্তীর্ণ কুপন কোড (টেস্ট কোড: JUTE10)" : "Invalid or expired coupon code (Test code: JUTE10)");
    }
  };

  const discount = appliedCoupon ? Math.round(subtotal * 0.1) : 0;
  const deliveryFee = subtotal - discount >= 2500 ? 0 : zoneRates[selectedZone].fee;
  const total = subtotal - discount + deliveryFee;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-8 pb-20">
      {/* Title */}
      <div className="border-b border-sand pb-4">
        <h1 className="text-3xl font-bold font-bn-display text-forest">
          {locale === "bn" ? "আপনার শপিং ব্যাগ" : "Your Shopping Bag"}
        </h1>
        <p className="text-xs text-ink/60 mt-1 font-bn">
          {locale === "bn" ? "অর্ডার কনফার্ম করার পূর্বে পণ্যের পরিমাণ ও ডেলিভারি তথ্য যাচাই করে নিন।" : "Please verify product quantities and delivery information before confirming your order."}
        </p>
      </div>

      {items.length === 0 ? (
        <div className="bg-white border border-sand rounded-2xl p-12 text-center space-y-4 shadow-card max-w-lg mx-auto">
          <div className="w-20 h-20 rounded-full bg-cream mx-auto flex items-center justify-center text-leaf">
            <ShoppingBag className="w-10 h-10" />
          </div>
          <h2 className="text-xl font-bold text-forest">{locale === "bn" ? "আপনার ব্যাগটি এখন খালি!" : "Your bag is empty!"}</h2>
          <p className="text-xs text-ink/70 leading-relaxed font-bn">
            {locale === "bn" ? "আপনার পছন্দের প্রাকৃতিক ও টেকসই পাটপণ্য দিয়ে ব্যাগটি ভরিয়ে তুলুন।" : "Fill your bag with your favorite natural and sustainable jute products."}
          </p>
          <Link href="/shop" className="inline-block pt-2">
            <Button variant="primary" size="md">
              {locale === "bn" ? "শপ ব্রাউজ করুন" : "Browse Shop"}
            </Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Items List */}
          <div className="lg:col-span-8 space-y-6">
            <FreeDeliveryProgress currentAmount={subtotal - discount} threshold={2500} locale={locale} />

            <div className="bg-white border border-sand rounded-xl p-6 shadow-card space-y-6 divide-y divide-sand/50">
              {items.map((item) => {
                const lineTotal = item.variant.price * item.qty;
                return (
                  <div key={`${item.product.id}-${item.variant.k}`} className="pt-6 first:pt-0 flex gap-4 sm:gap-6">
                    <div className="w-24 h-28 rounded-lg bg-cream border border-sand p-2 flex items-center justify-center flex-shrink-0">
                      <ProductArt slug={item.product.slug} className="w-full h-full object-contain" />
                    </div>

                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start gap-2">
                          <div>
                            <Link href={`/p/${item.product.slug}`} className="hover:text-leaf">
                              <h3 className="font-bold text-base text-forest leading-snug">
                                {locale === "bn" ? item.product.bn : item.product.en}
                              </h3>
                            </Link>
                            <span className="text-xs text-ink/60 block mt-0.5">
                              {locale === "bn" ? "ভ্যারিয়েন্ট:" : "Variant:"} {locale === "bn" ? item.variant.bn : item.variant.en}
                            </span>
                          </div>
                          <button
                            type="button"
                            onClick={() => removeFromCart(item.product.id, item.variant.k)}
                            className="text-ink/40 hover:text-clay p-1"
                            title={locale === "bn" ? "মুছে ফেলুন" : "Remove"}
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      <div className="flex flex-wrap items-end justify-between gap-3 pt-4">
                        <QtyStepper
                          value={item.qty}
                          onChange={(newQty) => updateQty(item.product.id, item.variant.k, newQty)}
                          locale={locale}
                        />

                        <div className="text-right">
                          <span className="text-xs text-ink/60 block">
                            {toLocaleDigits(item.qty)} × {formatPrice(item.variant.price)}
                          </span>
                          <span className="text-lg font-bold text-forest">
                            {formatPrice(lineTotal)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white border border-sand rounded-xl p-6 shadow-card space-y-6">
              <h2 className="font-bold text-base text-forest border-b border-sand pb-3">
                {locale === "bn" ? "অর্ডার সারাংশ" : "Order Summary"}
              </h2>

              {/* Delivery Zone Selector */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-ink/80 block">
                  {locale === "bn" ? "ডেলিভারি এলাকা নির্বাচন করুন:" : "Select Delivery Zone:"}
                </label>
                <div className="space-y-1.5 text-xs">
                  {(["dhaka_city", "dhaka_sub", "outside"] as const).map((z) => (
                    <label
                      key={z}
                      className={`flex items-center justify-between p-2.5 rounded-lg border cursor-pointer transition-all ${
                        selectedZone === z
                          ? "border-leaf bg-leaf/5 font-semibold text-forest"
                          : "border-sand bg-cream/40 text-ink/70"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="cartZone"
                          checked={selectedZone === z}
                          onChange={() => setSelectedZone(z)}
                          className="accent-leaf"
                        />
                        <span>{zoneRates[z].label}</span>
                      </div>
                      <span className="text-leaf font-bold">{formatPrice(zoneRates[z].fee)}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Coupon Form */}
              <form onSubmit={handleApplyCoupon} className="space-y-2 pt-2">
                <label className="text-xs font-bold text-ink/80 block">
                  {locale === "bn" ? "কুপন বা ডিসকাউন্ট কোড:" : "Coupon or Discount Code:"}
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    placeholder={locale === "bn" ? "যেমন: JUTE10" : "e.g., JUTE10"}
                    className="flex-1 px-3 py-2 text-xs border border-sand rounded-md bg-cream text-ink uppercase focus:outline-none focus:ring-1 focus:ring-jute"
                  />
                  <Button variant="secondary" size="sm" type="submit">
                    {locale === "bn" ? "প্রয়োগ" : "Apply"}
                  </Button>
                </div>
                {appliedCoupon && (
                  <p className="text-xs text-leaf font-semibold flex items-center gap-1">
                    <Tag className="w-3.5 h-3.5" />
                    <span>{locale === "bn" ? "কুপন JUTE10 প্রয়োগ হয়েছে (১০% ছাড়)" : "Coupon JUTE10 applied (10% off)"}</span>
                  </p>
                )}
                {couponError && <p className="text-xs text-clay">{couponError}</p>}
              </form>

              {/* Price Breakdown */}
              <div className="border-t border-sand pt-4 space-y-2 text-xs">
                <div className="flex justify-between text-ink/75">
                  <span>{locale === "bn" ? "সাবটোটাল:" : "Subtotal:"}</span>
                  <span className="font-semibold">{formatPrice(subtotal)}</span>
                </div>

                {appliedCoupon && (
                  <div className="flex justify-between text-clay font-semibold">
                    <span>{locale === "bn" ? "কুপন ছাড় (১০%):" : "Coupon Discount (10%):"}</span>
                    <span>- {formatPrice(discount)}</span>
                  </div>
                )}

                <div className="flex justify-between text-ink/75">
                  <span>{locale === "bn" ? "ডেলিভারি ফি:" : "Delivery Fee:"}</span>
                  <span className="font-semibold">
                    {deliveryFee === 0 ? (
                      <span className="text-leaf font-bold">{locale === "bn" ? "ফ্রি (০৳)" : "Free (৳0)"}</span>
                    ) : (
                      formatPrice(deliveryFee)
                    )}
                  </span>
                </div>

                <div className="border-t border-sand pt-3 flex justify-between items-baseline text-sm">
                  <span className="font-bold text-forest text-base">{locale === "bn" ? "সর্বমোট মূল্য:" : "Total:"}</span>
                  <span className="text-2xl font-bold font-bn-display text-forest">
                    {formatPrice(total)}
                  </span>
                </div>
              </div>

              <Link href="/checkout" className="block pt-2">
                <Button variant="primary" size="lg" className="w-full shadow-md flex items-center justify-center gap-2">
                  <span>{locale === "bn" ? "চেকআউট করুন" : "Checkout"}</span>
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
