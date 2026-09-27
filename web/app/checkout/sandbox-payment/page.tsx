"use client";

import React, { Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { ShieldCheck, CreditCard, AlertCircle, ArrowLeft, CheckCircle2, XCircle } from "lucide-react";

function SandboxPaymentContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const tranId = searchParams.get("tran_id") || "TR-PB-DEMO-001";
  const amount = searchParams.get("amount") || "520";
  const orderNumber = searchParams.get("order") || "PB-2609-1001";

  const handleSimulateSuccess = () => {
    const valId = `sim_val_${Date.now()}`;
    router.push(`/api/v1/payments/sslcommerz/success?tran_id=${tranId}&val_id=${valId}&amount=${amount}`);
  };

  const handleSimulateFail = () => {
    router.push(`/api/v1/payments/sslcommerz/fail?tran_id=${tranId}`);
  };

  const handleSimulateCancel = () => {
    router.push(`/api/v1/payments/sslcommerz/cancel?tran_id=${tranId}`);
  };

  return (
    <div className="max-w-xl mx-auto px-4 py-12 sm:py-16 space-y-6">
      <div className="bg-white border-2 border-leaf/40 rounded-2xl p-6 sm:p-8 shadow-card space-y-6">
        {/* Gateway Header */}
        <div className="flex items-center justify-between border-b border-sand pb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-full bg-leaf/10 flex items-center justify-center text-leaf font-bold">
              SSL
            </div>
            <div>
              <h1 className="font-bold text-base text-forest">SSLCommerz পেমেন্ট গেটওয়ে</h1>
              <span className="text-[11px] text-amber-700 bg-amber-50 px-2 py-0.5 rounded font-semibold border border-amber-200">
                SANDBOX সিমুলেটর
              </span>
            </div>
          </div>
          <div className="text-right">
            <span className="text-xs text-ink/60 block">প্রদেয় মূল্য:</span>
            <span className="font-bold text-xl font-bn-display text-forest">৳{Number(amount).toLocaleString()}</span>
          </div>
        </div>

        {/* Transaction Details */}
        <div className="bg-cream p-4 rounded-xl text-xs space-y-1.5 border border-sand">
          <div className="flex justify-between">
            <span className="text-ink/60">অর্ডার / রেফারেন্স:</span>
            <span className="font-bold font-mono text-leaf">{orderNumber}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-ink/60">ট্রানজ্যাকশন আইডি:</span>
            <span className="font-mono text-ink/80 text-[11px]">{tranId}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-ink/60">মার্চেন্ট:</span>
            <span className="font-semibold text-forest">Paatbari Enterprise (পাটবাড়ি)</span>
          </div>
        </div>

        {/* Payment Methods Available */}
        <div className="space-y-3">
          <span className="text-xs font-bold text-forest block">উপলব্ধ পেমেন্ট মেথড:</span>
          <div className="grid grid-cols-4 gap-2 text-center text-[11px] font-bold text-ink">
            <div className="p-2.5 rounded-lg border border-pink-200 bg-pink-50/50 text-[#D8236B]">bKash</div>
            <div className="p-2.5 rounded-lg border border-orange-200 bg-orange-50/50 text-[#F7941D]">Nagad</div>
            <div className="p-2.5 rounded-lg border border-purple-200 bg-purple-50/50 text-[#8C3494]">Rocket</div>
            <div className="p-2.5 rounded-lg border border-blue-200 bg-blue-50/50 text-[#1A1F71]">Cards</div>
          </div>
        </div>

        {/* Sandbox Action Buttons */}
        <div className="space-y-2.5 pt-2 border-t border-sand">
          <span className="text-xs text-ink/60 block text-center">
            স্যান্ডবক্স টেস্ট করুন (নিচের বাটনে ক্লিক করে ফলাফল যাচাই করুন):
          </span>

          <Button
            variant="primary"
            size="lg"
            onClick={handleSimulateSuccess}
            className="w-full flex items-center justify-center gap-2 bg-leaf hover:bg-forest text-white"
          >
            <CheckCircle2 className="w-4 h-4 text-jute" />
            <span>সফল পেমেন্ট সিমুলেট করুন (Success)</span>
          </Button>

          <div className="grid grid-cols-2 gap-3 pt-1">
            <Button
              variant="secondary"
              size="sm"
              onClick={handleSimulateFail}
              className="text-clay border-clay/40 hover:bg-clay/10 flex items-center justify-center gap-1.5"
            >
              <AlertCircle className="w-4 h-4" />
              <span>ব্যর্থ পেমেন্ট (Fail)</span>
            </Button>

            <Button
              variant="secondary"
              size="sm"
              onClick={handleSimulateCancel}
              className="text-ink/70 border-sand hover:bg-cream flex items-center justify-center gap-1.5"
            >
              <XCircle className="w-4 h-4" />
              <span>বাতিল করুন (Cancel)</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function SandboxPaymentPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-sm">পেমেন্ট গেটওয়ে লোড হচ্ছে...</div>}>
      <SandboxPaymentContent />
    </Suspense>
  );
}
