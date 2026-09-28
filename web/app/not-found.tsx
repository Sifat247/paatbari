import React from "react";
import Link from "next/link";
import { ShoppingBag, ArrowLeft, Search, Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-16">
      <div className="max-w-md w-full text-center space-y-6 bg-white border border-sand rounded-2xl p-8 sm:p-10 shadow-card">
        {/* Visual Badge */}
        <div className="w-20 h-20 rounded-full bg-sand/40 mx-auto flex items-center justify-center text-jute-deep border-2 border-jute/30">
          <span className="font-bold text-3xl font-mono text-forest">404</span>
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl sm:text-3xl font-bold font-bn-display text-forest">
            পাতাটি খুঁজে পাওয়া যায়নি
          </h1>
          <p className="text-xs sm:text-sm text-ink/70 font-bn leading-relaxed">
            দুঃখিত, আপনি যে লিংকটিতে প্রবেশ করার চেষ্টা করছেন তা হয়তো স্থানান্তরিত হয়েছে অথবা লিংকটিতে কোনো ভুল রয়েছে।
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <Link
            href="/"
            className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-leaf text-white text-xs font-semibold hover:bg-forest transition-colors shadow-xs"
          >
            <Home className="w-4 h-4" />
            <span>হোমে ফিরে যান</span>
          </Link>

          <Link
            href="/shop"
            className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border border-sand bg-cream text-ink text-xs font-semibold hover:border-jute transition-colors"
          >
            <ShoppingBag className="w-4 h-4 text-leaf" />
            <span>শপ ব্রাউজ করুন</span>
          </Link>
        </div>

        {/* Quick Links */}
        <div className="border-t border-sand/60 pt-4 text-xs text-ink/60 space-x-3">
          <Link href="/b2b" className="hover:text-leaf">কর্পোরেট কোট</Link>
          <span>•</span>
          <Link href="/bundles" className="hover:text-leaf">বান্ডেল অফার</Link>
          <span>•</span>
          <Link href="/faq" className="hover:text-leaf">প্রশ্নোত্তর (FAQ)</Link>
        </div>
      </div>
    </div>
  );
}
