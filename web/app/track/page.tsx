"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { formatPrice, toBanglaNumber } from "@/lib/utils";
import {
  Truck,
  Search,
  CheckCircle2,
  Clock,
  MapPin,
  Package,
  Phone,
  AlertCircle,
} from "lucide-react";

export default function TrackPage() {
  const [orderNumber, setOrderNumber] = useState("");
  const [phone, setPhone] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [orderData, setOrderData] = useState<any>(null);
  const [errorMessage, setErrorMessage] = useState("");

  const handleTrack = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    setOrderData(null);

    if (!orderNumber.trim() || !phone.trim()) {
      setErrorMessage("অর্ডার নম্বর এবং মোবাইল নম্বর উভয়ই পূরণ করুন।");
      return;
    }

    setIsLoading(true);

    try {
      const res = await fetch("/api/v1/track", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderNumber: orderNumber.trim(), phone: phone.trim() }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "অর্ডারটি খুঁজে পাওয়া যায়নি।");
      }

      setOrderData(data.order);
    } catch (err: any) {
      setErrorMessage(err.message || "সার্ভার এরর, অনুগ্রহ করে পুনরায় চেষ্টা করুন।");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-16 space-y-12 pb-24">
      {/* Title */}
      <div className="text-center space-y-3">
        <div className="w-14 h-14 rounded-full bg-cream mx-auto flex items-center justify-center text-leaf shadow-inner">
          <Truck className="w-7 h-7" />
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold font-bn-display text-forest">
          অর্ডার ট্র্যাকিং
        </h1>
        <p className="text-xs sm:text-sm text-ink/70 max-w-md mx-auto font-bn">
          আপনার অর্ডার নম্বর ও অর্ডার করার সময় ব্যবহৃত মোবাইল নম্বর দিয়ে পার্সেলের বর্তমান অবস্থান জানুন।
        </p>
      </div>

      {/* Tracking Search Form */}
      <div className="bg-white border border-sand rounded-2xl p-6 sm:p-8 shadow-card max-w-xl mx-auto space-y-4">
        {errorMessage && (
          <div className="p-3.5 bg-clay/10 border border-clay/30 rounded-xl text-xs text-clay font-semibold flex items-center gap-2">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        <form onSubmit={handleTrack} className="space-y-4 text-xs">
          <div className="space-y-1">
            <label className="font-bold text-ink/80 block">অর্ডার নম্বর *</label>
            <input
              type="text"
              required
              value={orderNumber}
              onChange={(e) => setOrderNumber(e.target.value)}
              placeholder="যেমন: PB-2609-1001"
              className="w-full px-3.5 py-2.5 rounded-lg border border-sand bg-cream text-ink uppercase focus:outline-none focus:ring-1 focus:ring-jute"
            />
          </div>

          <div className="space-y-1">
            <label className="font-bold text-ink/80 block">মোবাইল নম্বর *</label>
            <input
              type="tel"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="017xxxxxxxx"
              className="w-full px-3.5 py-2.5 rounded-lg border border-sand bg-cream text-ink focus:outline-none focus:ring-1 focus:ring-jute"
            />
          </div>

          <Button
            variant="primary"
            size="lg"
            type="submit"
            isLoading={isLoading}
            className="w-full shadow-md flex items-center justify-center gap-2"
          >
            <Search className="w-4 h-4" />
            <span>অর্ডারের অবস্থা দেখুন</span>
          </Button>
        </form>
      </div>

      {/* Tracking Result View */}
      {orderData && (
        <div className="bg-white border-2 border-leaf/30 rounded-2xl p-6 sm:p-8 shadow-pop space-y-8 animate-in fade-in duration-300">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-sand pb-4">
            <div>
              <span className="text-xs text-ink/60 block">অর্ডার নম্বর</span>
              <h2 className="text-xl sm:text-2xl font-bold font-bn-display text-forest">
                {orderData.orderNumber}
              </h2>
            </div>
            <div className="text-right">
              <span className="text-xs text-ink/60 block">বর্তমান স্ট্যাটাস</span>
              <span className="inline-block px-3 py-1 bg-leaf text-white text-xs font-bold rounded-full mt-0.5">
                {orderData.status === "pending"
                  ? "অপেক্ষমাণ (Pending)"
                  : orderData.status === "confirmed"
                  ? "নিশ্চিত (Confirmed)"
                  : orderData.status === "shipped"
                  ? "ডেলিভারিতে (Shipped)"
                  : "সম্পন্ন (Delivered)"}
              </span>
            </div>
          </div>

          {/* Timeline steps */}
          <div className="space-y-4">
            <h3 className="font-bold text-sm text-forest flex items-center gap-2">
              <Clock className="w-4 h-4 text-leaf" />
              <span>ডেলিভারি আপডেট ও ইতিহাস</span>
            </h3>

            <div className="space-y-4 border-l-2 border-leaf/40 pl-4 ml-2">
              {orderData.events?.map((ev: any, idx: number) => (
                <div key={idx} className="relative space-y-1">
                  <div className="absolute -left-[23px] top-1 w-3.5 h-3.5 rounded-full bg-leaf border-2 border-white" />
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-xs text-forest">{ev.title}</span>
                    <span className="text-[11px] text-ink/50 bg-sand/30 px-2 py-0.5 rounded">
                      {ev.time}
                    </span>
                  </div>
                  <p className="text-xs text-ink/70 font-bn">{ev.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Address & Payment Snapshot */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 p-4 rounded-xl bg-cream border border-sand text-xs">
            <div>
              <span className="font-bold text-forest block mb-1">প্রাপক ও ঠিকানা:</span>
              <p className="font-semibold text-ink">{orderData.customerName}</p>
              <p className="text-ink/80">{orderData.customerPhone}</p>
              <p className="text-ink/70 mt-1">
                {orderData.addressLine}, {orderData.area}, {orderData.district}
              </p>
            </div>

            <div>
              <span className="font-bold text-forest block mb-1">বিল ও পেমেন্ট:</span>
              <p className="text-ink/80">পেমেন্ট মেথড: ক্যাশ অন ডেলিভারি (COD)</p>
              <p className="text-ink/80">সাবটোটাল: {formatPrice(orderData.subtotal, "bn")}</p>
              <p className="text-ink/80">ডেলিভারি ফি: ৳{orderData.deliveryFee}</p>
              <p className="font-bold text-forest text-sm mt-1">
                মোট বিল: {formatPrice(orderData.total, "bn")}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
