import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { AlertCircle, RefreshCw, MessageCircle } from "lucide-react";

export default function PaymentFailPage() {
  return (
    <div className="max-w-md mx-auto px-4 py-20 text-center space-y-6">
      <div className="w-16 h-16 rounded-full bg-clay/10 text-clay mx-auto flex items-center justify-center">
        <AlertCircle className="w-8 h-8" />
      </div>

      <div className="space-y-2">
        <h1 className="text-2xl font-bold font-bn-display text-forest">পেমেন্ট সম্পন্ন হয়নি</h1>
        <p className="text-xs text-ink/70 leading-relaxed font-bn">
          ব্যাংক বা মোবাইল ব্যাংকিং অ্যাপ থেকে লেনদেনটি সম্পন্ন করা সম্ভব হয়নি। আপনার অ্যাকাউন্ট থেকে কোনো টাকা কাটা হয়নি।
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Button href="/checkout" variant="primary" size="md" className="w-full sm:w-auto flex items-center justify-center gap-2">
          <RefreshCw className="w-4 h-4" />
          <span>আবার চেষ্টা করুন</span>
        </Button>
        <Button href="/cart" variant="secondary" size="md" className="w-full sm:w-auto">
          ব্যাগে ফিরে যান
        </Button>
      </div>

      <div className="pt-4 text-xs text-ink/60 border-t border-sand">
        সহায়তার জন্য কল করুন: <strong>+880 1793-648214</strong>
      </div>
    </div>
  );
}
