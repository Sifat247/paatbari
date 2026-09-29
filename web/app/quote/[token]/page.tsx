"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { formatPrice, toBanglaNumber } from "@/lib/utils";
import { useLanguage } from "@/lib/i18n-context";
import {
  FileText,
  Building2,
  Calendar,
  CheckCircle2,
  Clock,
  CreditCard,
  Building,
  Upload,
  MessageCircle,
  ArrowLeft,
  AlertCircle,
  Truck,
  Package,
} from "lucide-react";

interface B2BQuoteData {
  token: string;
  createdAt: string;
  companyName: string;
  contactName: string;
  phone: string;
  email: string;
  productId: string;
  productName: string;
  qty: number;
  includeLogo: boolean;
  deadline?: string;
  deliveryAddress?: string;
  notes?: string;
  unitPrice: number;
  setupFee: number;
  totalPrice: number;
  depositAmount: number;
  status:
    | "quote_requested"
    | "quoted"
    | "deposit_paid"
    | "in_production"
    | "ready"
    | "balance_paid"
    | "dispatched"
    | "completed"
    | "cancelled";
  statusNote?: string;
}

const statusMap: Record<string, { label: string; enLabel: string; color: string; desc: string; enDesc: string }> = {
  quote_requested: {
    label: "কোটেশন অনুরোধ",
    enLabel: "Quote Requested",
    color: "bg-sand text-ink",
    desc: "আপনার অনুরোধটি গৃহীত হয়েছে। আমাদের টিম পর্যালোচনা করছে।",
    enDesc: "Your request has been received. Our team is reviewing it.",
  },
  quoted: {
    label: "কোটেশন পাঠানো হয়েছে",
    enLabel: "Quote Sent",
    color: "bg-leaf/10 text-leaf border-leaf",
    desc: "চূড়ান্ত মূল্য ও শর্তাবলী নির্ধারণ করা হয়েছে। অনুগ্রহ করে গ্রহণ করুন।",
    enDesc: "Final price and terms have been set. Please accept.",
  },
  deposit_paid: {
    label: "৫০% অগ্রিম পরিশোধিত",
    enLabel: "50% Deposit Paid",
    color: "bg-forest text-white",
    desc: "অগ্রিম পেমেন্ট কনফার্ম হয়েছে। কারখানা প্রস্তুত হচ্ছে।",
    enDesc: "Deposit confirmed. Factory is preparing.",
  },
  in_production: {
    label: "কারখানায় তৈরি হচ্ছে",
    enLabel: "In Production",
    color: "bg-jute text-forest",
    desc: "আপনার কাস্টম পণ্যের প্রিন্টিং ও সেলাই প্রক্রিয়া চলছে।",
    enDesc: "Printing and stitching of your custom product is in progress.",
  },
  ready: {
    label: "ডেলিভারির জন্য প্রস্তুত",
    enLabel: "Ready for Delivery",
    color: "bg-leaf text-white",
    desc: "প্রোডাক্ট তৈরি সম্পন্ন। অবশিষ্ট ব্যালেন্স পরিশোধের পর পাঠানো হবে।",
    enDesc: "Product ready. Will be dispatched after balance payment.",
  },
  balance_paid: {
    label: "সম্পূর্ণ পরিশোধিত",
    enLabel: "Fully Paid",
    color: "bg-leaf text-white",
    desc: "পূর্ণাঙ্গ মূল্য পরিশোধ সম্পন্ন।",
    enDesc: "Full payment completed.",
  },
  dispatched: {
    label: "কুরিয়ারে পাঠানো হয়েছে",
    enLabel: "Dispatched",
    color: "bg-blue-600 text-white",
    desc: "পণ্য কুরিয়ারে হ্যান্ডওভার করা হয়েছে।",
    enDesc: "Product handed over to courier.",
  },
  completed: {
    label: "সম্পন্ন",
    enLabel: "Completed",
    color: "bg-forest text-white",
    desc: "অর্ডার সফলভাবে পৌঁছে দেওয়া হয়েছে।",
    enDesc: "Order delivered successfully.",
  },
  cancelled: {
    label: "বাতিল",
    enLabel: "Cancelled",
    color: "bg-clay text-white",
    desc: "এই কোটেশনটি বাতিল করা হয়েছে।",
    enDesc: "This quote has been cancelled.",
  },
};

export default function QuoteDetailPage() {
  const params = useParams();
  const token = params?.token as string;
  const { locale, formatPrice, toLocaleDigits } = useLanguage();

  const [quote, setQuote] = useState<B2BQuoteData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [paymentMode, setPaymentMode] = useState<"ssl" | "bank">("ssl");
  const [receiptUploaded, setReceiptUploaded] = useState(false);
  const [accepted, setAccepted] = useState(false);

  useEffect(() => {
    if (!token) return;

    fetch(`/api/v1/b2b/quote?token=${encodeURIComponent(token)}`)
      .then((res) => {
        if (!res.ok) throw new Error(locale === "bn" ? "কোটেশন খুঁজে পাওয়া যায়নি" : "Quote not found");
        return res.json();
      })
      .then((data) => {
        if (data.quote) {
          setQuote(data.quote);
        } else {
          setError(locale === "bn" ? "কোটেশন তথ্য মেলেনি" : "Quote information mismatch");
        }
      })
      .catch((err) => {
        setError(err.message || (locale === "bn" ? "ত্রুটি ঘটেছে" : "An error occurred"));
      })
      .finally(() => setLoading(false));
  }, [token, locale]);

  const handleAcceptQuote = async () => {
    try {
      const res = await fetch("/api/v1/b2b/quote", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          token,
          status: "quoted",
          statusNote: locale === "bn" ? "গ্রাহক কোটেশন গ্রহণ করেছেন। অগ্রিম পেমেন্টের অপেক্ষায়।" : "Customer accepted quote. Awaiting advance payment.",
        }),
      });
      const data = await res.json();
      if (data.quote) {
        setQuote(data.quote);
        setAccepted(true);
      }
    } catch {
      alert(locale === "bn" ? "কোটেশন গ্রহণে ত্রুটি হয়েছে" : "Error accepting quote");
    }
  };

  const handleSimulatePayment = async () => {
    try {
      const res = await fetch("/api/v1/b2b/quote", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          token,
          status: "deposit_paid",
          statusNote: locale === "bn" ? "৫০% অগ্রিম ডিপোজিট পরিশোধিত (স্যান্ডবক্স ভেরিফাইড)" : "50% advance deposit paid (sandbox verified)",
        }),
      });
      const data = await res.json();
      if (data.quote) {
        setQuote(data.quote);
        alert(locale === "bn" ? "অগ্রিম পেমেন্ট সফলভাবে সম্পন্ন হয়েছে! উৎপাদন প্রক্রিয়া শুরু হচ্ছে।" : "Advance payment successful! Production is starting.");
      }
    } catch {
      alert(locale === "bn" ? "পেমেন্ট আপডেটে ত্রুটি হয়েছে" : "Error updating payment");
    }
  };

  if (loading) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-24 text-center">
        <div className="w-12 h-12 border-4 border-leaf border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-sm font-semibold text-ink/70">{locale === "bn" ? "কোটেশনের তথ্য লোড হচ্ছে..." : "Loading quote information..."}</p>
      </div>
    );
  }

  if (error || !quote) {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center space-y-4">
        <div className="w-16 h-16 rounded-full bg-clay/10 text-clay flex items-center justify-center mx-auto">
          <AlertCircle className="w-8 h-8" />
        </div>
        <h1 className="text-2xl font-bold font-bn-display text-forest">{locale === "bn" ? "কোটেশন পাওয়া যায়নি" : "Quote not found"}</h1>
        <p className="text-sm text-ink/70">
          {locale === "bn" ? `টোকেন ` : `No quote record for token `}<strong>{token}</strong>{locale === "bn" ? ` এর বিপরীতে কোনো কোটেশন রেকর্ড নেই। সঠিক লিঙ্কটি ব্যবহার করুন।` : `. Please use the correct link.`}
        </p>
        <Button href="/b2b" variant="primary">{locale === "bn" ? "নতুন কোটেশনের জন্য ক্লিক করুন" : "Click for a new quote"}</Button>
      </div>
    );
  }

  const currentStatus = statusMap[quote.status] || {
    label: quote.status,
    enLabel: quote.status,
    color: "bg-sand text-ink",
    desc: "",
    enDesc: "",
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-14 space-y-8 pb-24">
      {/* Breadcrumb Navigation */}
      <div className="flex items-center justify-between">
        <Link
          href="/b2b"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-leaf hover:underline"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{locale === "bn" ? "কর্পোরেট পেজে ফিরে যান" : "Back to Corporate Page"}</span>
        </Link>
        <span className="text-xs font-mono text-ink/50 bg-sand/30 px-2.5 py-1 rounded">
          {quote.token}
        </span>
      </div>

      {/* Header Banner */}
      <div className="bg-white border-2 border-sand rounded-2xl p-6 sm:p-8 shadow-card space-y-6">
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 border-b border-sand/80 pb-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="font-bold text-xs uppercase tracking-wider text-jute-deep">
                {locale === "bn" ? "অফিসিয়াল কর্পোরেট কোটেশন" : "Official Corporate Quote"}
              </span>
              <span
                className={`text-xs px-2.5 py-0.5 rounded-full font-bold border ${currentStatus.color}`}
              >
                {locale === "bn" ? currentStatus.label : currentStatus.enLabel}
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold font-bn-display text-forest">
              {quote.companyName}
            </h1>
            <p className="text-xs text-ink/70 mt-1">
              {locale === "bn" ? "দায়িত্বপ্রাপ্ত কর্মকর্তা:" : "Officer in Charge:"} {quote.contactName} ({quote.phone})
            </p>
          </div>

          <div className="text-left sm:text-right text-xs text-ink/60 space-y-1">
            <div>
              {locale === "bn" ? "তারিখ:" : "Date:"}{" "}
              {new Date(quote.createdAt).toLocaleDateString(locale === "bn" ? "bn-BD" : "en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </div>
            {quote.deadline && (
              <div className="text-clay font-semibold">
                {locale === "bn" ? "ডেলিভারি ডেডলাইন:" : "Delivery Deadline:"} {quote.deadline}
              </div>
            )}
          </div>
        </div>

        {/* Status description alert */}
        <div className="p-3.5 bg-cream rounded-xl text-xs flex items-start gap-2.5 text-ink/80 border border-sand">
          <Clock className="w-4 h-4 text-leaf flex-shrink-0 mt-0.5" />
          <div>
            <span className="font-bold block text-forest">{locale === "bn" ? "বর্তমান অবস্থা:" : "Current Status:"}</span>
            <span>{quote.statusNote || (locale === "bn" ? currentStatus.desc : currentStatus.enDesc)}</span>
          </div>
        </div>

        {/* Product & Pricing Table */}
        <div className="space-y-4">
          <h2 className="font-bold text-sm text-forest uppercase tracking-wide">
            {locale === "bn" ? "অর্ডারের বিবরণ ও মূল্য তালিকা" : "Order Details & Pricing"}
          </h2>
          <div className="border border-sand rounded-xl overflow-hidden text-xs">
            <div className="bg-sand/30 font-bold p-3 grid grid-cols-12 text-ink">
              <span className="col-span-6 sm:col-span-7">{locale === "bn" ? "পণ্যের বিবরণ" : "Product Description"}</span>
              <span className="col-span-3 sm:col-span-2 text-center">{locale === "bn" ? "পরিমাণ" : "Qty"}</span>
              <span className="col-span-3 text-right">{locale === "bn" ? "মূল্য" : "Price"}</span>
            </div>

            <div className="p-3.5 grid grid-cols-12 border-b border-sand/40 items-center">
              <div className="col-span-6 sm:col-span-7 space-y-1">
                <span className="font-bold text-forest block">{quote.productName}</span>
                {quote.includeLogo && (
                  <span className="text-[11px] text-leaf font-semibold block">
                    {locale === "bn" ? "✓ কাস্টম লোগো প্রিন্ট সহ (+৳২৫/পিস)" : "✓ Custom Logo Print (+৳25/pc)"}
                  </span>
                )}
                {quote.notes && (
                  <p className="text-[11px] text-ink/60 italic">{locale === "bn" ? "নির্দেশনা:" : "Notes:"} {quote.notes}</p>
                )}
              </div>
              <div className="col-span-3 sm:col-span-2 text-center font-bold text-ink">
                {toLocaleDigits(quote.qty)} {locale === "bn" ? "পিস" : "pcs"}
              </div>
              <div className="col-span-3 text-right font-bold text-forest">
                {formatPrice(quote.unitPrice * quote.qty)}
              </div>
            </div>

            {quote.includeLogo && quote.setupFee > 0 && (
              <div className="p-3.5 grid grid-cols-12 border-b border-sand/40 items-center bg-cream/30">
                <div className="col-span-6 sm:col-span-7">
                  <span className="font-semibold text-ink">{locale === "bn" ? "স্ক্রিন প্রিন্টিং সেটআপ ও ডাই ফি" : "Screen Print Setup & Die Fee"}</span>
                  <span className="text-[11px] text-ink/50 block">{locale === "bn" ? "এককালীন এক রঙের ফ্রেম সেটআপ" : "One-time single color frame setup"}</span>
                </div>
                <div className="col-span-3 sm:col-span-2 text-center text-ink/60">{toLocaleDigits(1)} {locale === "bn" ? "সেট" : "set"}</div>
                <div className="col-span-3 text-right font-bold text-forest">
                  {formatPrice(quote.setupFee)}
                </div>
              </div>
            )}

            {/* Calculations Breakdown */}
            <div className="p-4 bg-sand/20 space-y-2 text-ink">
              <div className="flex justify-between">
                <span>{locale === "bn" ? "ইউনিট রেট:" : "Unit Rate:"}</span>
                <span className="font-semibold">{formatPrice(quote.unitPrice)} / {locale === "bn" ? "পিস" : "pc"}</span>
              </div>
              <div className="flex justify-between font-bold text-sm text-forest border-t border-sand/50 pt-2">
                <span>{locale === "bn" ? "সর্বমোট চুক্তি মূল্য:" : "Total Contract Value:"}</span>
                <span className="text-base text-forest font-bn-display">
                  {formatPrice(quote.totalPrice)}
                </span>
              </div>
              <div className="flex justify-between font-bold text-xs text-clay border-t border-sand/40 pt-2">
                <span>{locale === "bn" ? "৫০% উৎপাদন অগ্রিম (Advance Deposit):" : "50% Advance Deposit:"}</span>
                <span className="text-sm font-bn-display">
                  {formatPrice(quote.depositAmount)}
                </span>
              </div>
              <div className="flex justify-between text-[11px] text-ink/60">
                <span>{locale === "bn" ? "অবশিষ্ট ৫০% পরিশোধ:" : "Remaining 50% Due:"}</span>
                <span>{locale === "bn" ? "ডেলিভারির পূর্বে পরিশোধযোগ্য" : "Payable before delivery"}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Action Panel based on Status */}
        {quote.status === "quote_requested" && (
          <div className="p-4 bg-jute/15 rounded-xl border border-jute/40 text-xs space-y-3">
            <h3 className="font-bold text-forest text-sm">{locale === "bn" ? "কোটেশনটি অনুমোদন করুন" : "Approve the Quote"}</h3>
            <p className="text-ink/80 leading-relaxed">
              {locale === "bn" ? "উক্ত দর ও শর্তাবলীতে সম্মত থাকলে নিচে ক্লিক করে কোটেশনটি গ্রহণ করুন। এরপর আপনি ৫০% অগ্রিম পরিশোধ করে উৎপাদন শুরু করতে পারবেন।" : "If you agree to the rates and terms above, please click below to accept the quote. You can then pay the 50% advance to start production."}
            </p>
            <Button
              variant="primary"
              size="md"
              onClick={handleAcceptQuote}
              className="w-full sm:w-auto"
            >
              {locale === "bn" ? "কোটেশন গ্রহণ করুন" : "Accept Quote"}
            </Button>
          </div>
        )}

        {/* Payment Panel for Quoted status */}
        {(quote.status === "quoted" || accepted) && (
          <div className="border border-sand rounded-xl p-5 bg-white space-y-4">
            <div className="border-b border-sand pb-3">
              <h3 className="font-bold text-forest text-sm flex items-center gap-2">
                <CreditCard className="w-4 h-4 text-leaf" />
                <span>{locale === "bn" ? "৫০% অগ্রিম পেমেন্ট করুন —" : "Pay 50% Advance —"} {formatPrice(quote.depositAmount)}</span>
              </h3>
              <p className="text-[11px] text-ink/60 mt-0.5">
                {locale === "bn" ? "উৎপাদন শুরুর জন্য ৫০% অগ্রিম ডিপোজিট প্রয়োজন। নিচের যেকোনো মাধ্যমে পরিশোধ করতে পারেন:" : "A 50% advance deposit is required to start production. You can pay via any of the methods below:"}
              </p>
            </div>

            {/* Payment Method Selector */}
            <div className="grid grid-cols-2 gap-3 text-xs">
              <button
                type="button"
                onClick={() => setPaymentMode("ssl")}
                className={`p-3 rounded-lg border text-left transition-all ${
                  paymentMode === "ssl"
                    ? "border-leaf bg-leaf/10 font-bold text-forest"
                    : "border-sand hover:bg-cream"
                }`}
              >
                <span className="block font-bold">{locale === "bn" ? "বিকাশ / নগদ / রকেট / কার্ড" : "bKash / Nagad / Rocket / Card"}</span>
                <span className="text-[10px] text-ink/60">{locale === "bn" ? "SSLCommerz গেটওয়ে (তাত্ক্ষণিক)" : "SSLCommerz Gateway (Instant)"}</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMode("bank")}
                className={`p-3 rounded-lg border text-left transition-all ${
                  paymentMode === "bank"
                    ? "border-leaf bg-leaf/10 font-bold text-forest"
                    : "border-sand hover:bg-cream"
                }`}
              >
                <span className="block font-bold">{locale === "bn" ? "ব্যাংক ট্রান্সফার / EFTN" : "Bank Transfer / EFTN"}</span>
                <span className="text-[10px] text-ink/60">{locale === "bn" ? "সরাসরি করপোরেট ব্যাংক একাউন্টে" : "Direct to Corporate Bank Account"}</span>
              </button>
            </div>

            {paymentMode === "ssl" ? (
              <div className="space-y-3 pt-2">
                <div className="p-3 bg-cream rounded-lg text-xs text-ink/80 flex items-center justify-between">
                  <span>{locale === "bn" ? "পরিশোধযোগ্য অগ্রিম:" : "Advance Payable:"}</span>
                  <span className="text-base font-bold text-forest font-bn-display">
                    {formatPrice(quote.depositAmount)}
                  </span>
                </div>
                <Button
                  variant="quote"
                  size="lg"
                  onClick={handleSimulatePayment}
                  className="w-full shadow-md flex items-center justify-center gap-2"
                >
                  <CreditCard className="w-4 h-4" />
                  <span>{locale === "bn" ? "বিকাশ / নগদ / কার্ডে পে করুন" : "Pay via bKash / Nagad / Card"}</span>
                </Button>
              </div>
            ) : (
              <div className="space-y-4 pt-2 text-xs">
                <div className="bg-cream p-4 rounded-xl space-y-2 border border-sand">
                  <span className="font-bold text-forest block">{locale === "bn" ? "পাটবাড়ি ব্যাংক হিসাব বিবরণী:" : "Paatbari Bank Account Details:"}</span>
                  <div className="grid grid-cols-2 gap-2 text-[11px] text-ink/80">
                    <div>{locale === "bn" ? "ব্যাংক:" : "Bank:"} <strong>City Bank Limited</strong></div>
                    <div>{locale === "bn" ? "হিসাবের নাম:" : "Account Name:"} <strong>Paatbari Enterprise</strong></div>
                    <div>{locale === "bn" ? "হিসাব নম্বর:" : "Account No:"} <strong>1102839182001</strong></div>
                    <div>{locale === "bn" ? "শাখা:" : "Branch:"} <strong>Dhanmondi Branch, Dhaka</strong></div>
                    <div>{locale === "bn" ? "রাউটিং নম্বর:" : "Routing No:"} <strong>225272345</strong></div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="font-bold text-ink/80 block">{locale === "bn" ? "ব্যাংক জমার রসিদ বা স্লিপ আপলোড:" : "Upload Bank Deposit Receipt or Slip:"}</label>
                  <div className="border-2 border-dashed border-sand rounded-xl p-4 text-center bg-cream/40">
                    {receiptUploaded ? (
                      <div className="text-leaf font-bold flex items-center justify-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4" />
                        <span>{locale === "bn" ? "রসিদ সফলভাবে আপলোড হয়েছে (যাচাই প্রক্রিয়াধীন)" : "Receipt uploaded successfully (Verification pending)"}</span>
                      </div>
                    ) : (
                      <div
                        onClick={() => {
                          setReceiptUploaded(true);
                          alert(locale === "bn" ? "রসিদ ফাইল আপলোড সিমুলেশন সম্পন্ন" : "Receipt file upload simulation complete");
                        }}
                        className="cursor-pointer"
                      >
                        <Upload className="w-5 h-5 mx-auto text-ink/40 mb-1" />
                        <span className="text-[11px] text-ink/70 block">
                          {locale === "bn" ? "ক্লিক করে স্লিপ বা ব্যাংক কনফার্মেশন স্ক্রিনশট আপলোড করুন" : "Click to upload slip or bank confirmation screenshot"}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Live Support Bar */}
        <div className="border-t border-sand pt-4 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-ink/70">
          <span>{locale === "bn" ? "যেকোনো প্রশ্ন বা কাস্টমাইজেশনের জন্য সরাসরি কথা বলুন:" : "For any questions or customization, speak to us directly:"}</span>
          <a
            href={`https://wa.me/8801700000000?text=${encodeURIComponent(
              locale === "bn" ? `হ্যালো পাটবাড়ি, আমার কোটেশন টোকেন ${quote.token} সম্পর্কে জানতে চাই।` : `Hello Paatbari, I would like to know about my quote token ${quote.token}.`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-leaf font-bold hover:underline"
          >
            <MessageCircle className="w-4 h-4" />
            <span>{locale === "bn" ? "হোয়াটসঅ্যাপে যোগাযোগ (২৪/৭)" : "Contact on WhatsApp (24/7)"}</span>
          </a>
        </div>
      </div>
    </div>
  );
}
