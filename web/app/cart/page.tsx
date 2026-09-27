"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useCart } from "@/lib/cart-context";
import { FreeDeliveryProgress } from "@/components/ui/FreeDeliveryProgress";
import { QtyStepper } from "@/components/ui/QtyStepper";
import { Button } from "@/components/ui/Button";
import { formatPrice, toBanglaNumber } from "@/lib/utils";
import { ShoppingBag, Trash2, ArrowRight, ShieldCheck, Tag } from "lucide-react";

export default function CartPage() {
  const { items, subtotal, updateQty, removeFromCart } = useCart();
  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);
  const [couponError, setCouponError] = useState("");
  const [selectedZone, setSelectedZone] = useState<"dhaka_city" | "dhaka_sub" | "outside">("dhaka_city");

  const zoneRates = {
    dhaka_city: { label: "ঢাকা সিটি", fee: 70 },
    dhaka_sub: { label: "ঢাকা উপশহর (সাভার/গাজীপুর/কেরানীগঞ্জ)", fee: 100 },
    outside: { label: "ঢাকার বাইরে (অন্যান্য জেলা)", fee: 130 },
  };

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (couponCode.trim().toUpperCase() === "JUTE10") {
      setAppliedCoupon("JUTE10");
      setCouponError("");
    } else {
      setCouponError("অবৈধ বা মেয়াদোত্তীর্ণ কুপন কোড (টেস্ট কোড: JUTE10)");
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
          আপনার শপিং ব্যাগ
        </h1>
        <p className="text-xs text-ink/60 mt-1 font-bn">
          অর্ডার কনফার্ম করার পূর্বে পণ্যের পরিমাণ ও ডেলিভারি তথ্য যাচাই করে নিন।
        </p>
      </div>

      {items.length === 0 ? (
        <div className="bg-white border border-sand rounded-2xl p-12 text-center space-y-4 shadow-card max-w-lg mx-auto">
          <div className="w-20 h-20 rounded-full bg-cream mx-auto flex items-center justify-center text-leaf">
            <ShoppingBag className="w-10 h-10" />
          </div>
          <h2 className="text-xl font-bold text-forest">আপনার ব্যাগটি এখন খালি!</h2>
          <p className="text-xs text-ink/70 leading-relaxed font-bn">
            আপনার পছন্দের প্রাকৃতিক ও টেকসই পাটপণ্য দিয়ে ব্যাগটি ভরিয়ে তুলুন।
          </p>
          <Link href="/shop" className="inline-block pt-2">
            <Button variant="primary" size="md">
              শপ ব্রাউজ করুন
            </Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Items List */}
          <div className="lg:col-span-8 space-y-6">
            <FreeDeliveryProgress currentAmount={subtotal - discount} threshold={2500} locale="bn" />

            <div className="bg-white border border-sand rounded-xl p-6 shadow-card space-y-6 divide-y divide-sand/50">
              {items.map((item) => {
                const lineTotal = item.variant.price * item.qty;
                return (
                  <div key={`${item.product.id}-${item.variant.k}`} className="pt-6 first:pt-0 flex gap-4 sm:gap-6">
                    <div className="w-24 h-28 rounded-lg bg-cream border border-sand flex items-center justify-center flex-shrink-0 text-leaf">
                      <ShoppingBag className="w-10 h-10 opacity-70" />
                    </div>

                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start gap-2">
                          <div>
                            <Link href={`/p/${item.product.slug}`} className="hover:text-leaf">
                              <h3 className="font-bold text-base text-forest leading-snug">
                                {item.product.bn}
                              </h3>
                            </Link>
                            <span className="text-xs text-ink/60 block mt-0.5">
                              ভ্যারিয়েন্ট: {item.variant.bn}
                            </span>
                          </div>
                          <button
                            type="button"
                            onClick={() => removeFromCart(item.product.id, item.variant.k)}
                            className="text-ink/40 hover:text-clay p-1"
                            title="মুছে ফেলুন"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      <div className="flex flex-wrap items-end justify-between gap-3 pt-4">
                        <QtyStepper
                          value={item.qty}
                          onChange={(newQty) => updateQty(item.product.id, item.variant.k, newQty)}
                          locale="bn"
                        />

                        <div className="text-right">
                          <span className="text-xs text-ink/60 block">
                            {toBanglaNumber(item.qty)} × {formatPrice(item.variant.price, "bn")}
                          </span>
                          <span className="text-lg font-bold text-forest">
                            {formatPrice(lineTotal, "bn")}
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
                অর্ডার সারাংশ
              </h2>

              {/* Delivery Zone Selector */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-ink/80 block">
                  ডেলিভারি এলাকা নির্বাচন করুন:
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
                      <span className="text-leaf font-bold">৳{zoneRates[z].fee}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Coupon Form */}
              <form onSubmit={handleApplyCoupon} className="space-y-2 pt-2">
                <label className="text-xs font-bold text-ink/80 block">
                  কুপন বা ডিসকাউন্ট কোড:
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    placeholder="যেমন: JUTE10"
                    className="flex-1 px-3 py-2 text-xs border border-sand rounded-md bg-cream text-ink uppercase focus:outline-none focus:ring-1 focus:ring-jute"
                  />
                  <Button variant="secondary" size="sm" type="submit">
                    প্রয়োগ
                  </Button>
                </div>
                {appliedCoupon && (
                  <p className="text-xs text-leaf font-semibold flex items-center gap-1">
                    <Tag className="w-3.5 h-3.5" />
                    <span>কুপন JUTE10 প্রয়োগ হয়েছে (১০% ছাড়)</span>
                  </p>
                )}
                {couponError && <p className="text-xs text-clay">{couponError}</p>}
              </form>

              {/* Price Breakdown */}
              <div className="border-t border-sand pt-4 space-y-2 text-xs">
                <div className="flex justify-between text-ink/75">
                  <span>সাবটোটাল:</span>
                  <span className="font-semibold">{formatPrice(subtotal, "bn")}</span>
                </div>

                {appliedCoupon && (
                  <div className="flex justify-between text-clay font-semibold">
                    <span>কুপন ছাড় (১০%):</span>
                    <span>- {formatPrice(discount, "bn")}</span>
                  </div>
                )}

                <div className="flex justify-between text-ink/75">
                  <span>ডেলিভারি ফি:</span>
                  <span className="font-semibold">
                    {deliveryFee === 0 ? (
                      <span className="text-leaf font-bold">ফ্রি (০৳)</span>
                    ) : (
                      formatPrice(deliveryFee, "bn")
                    )}
                  </span>
                </div>

                <div className="border-t border-sand pt-3 flex justify-between items-baseline text-sm">
                  <span className="font-bold text-forest text-base">সর্বমোট মূল্য:</span>
                  <span className="text-2xl font-bold font-bn-display text-forest">
                    {formatPrice(total, "bn")}
                  </span>
                </div>
              </div>

              <Link href="/checkout" className="block pt-2">
                <Button variant="primary" size="lg" className="w-full shadow-md flex items-center justify-center gap-2">
                  <span>চেকআউট করুন</span>
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
