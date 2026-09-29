import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { XCircle, ArrowLeft } from "lucide-react";

export default function PaymentCancelPage() {
  return (
    <div className="max-w-md mx-auto px-4 py-20 text-center space-y-6">
      <div className="w-16 h-16 rounded-full bg-sand/40 text-ink/60 mx-auto flex items-center justify-center">
        <XCircle className="w-8 h-8" />
      </div>

      <div className="space-y-2">
        <h1 className="text-2xl font-bold font-bn-display text-forest">পেমেন্ট বাতিল করা হয়েছে</h1>
        <p className="text-xs text-ink/70 leading-relaxed font-bn">
          আপনি অনলাইন পেমেন্ট প্রক্রিয়াটি বাতিল করেছেন। আপনি চাইলে ক্যাশ অন ডেলিভারি (COD) নির্বাচন করে পুনরায় অর্ডার করতে পারেন।
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Button href="/checkout" variant="primary" size="md" className="w-full sm:w-auto flex items-center justify-center gap-2">
          <span>চেকআউটে ফিরে যান</span>
        </Button>
        <Button href="/cart" variant="secondary" size="md" className="w-full sm:w-auto">
          শপিং ব্যাগ দেখুন
        </Button>
      </div>
    </div>
  );
}
