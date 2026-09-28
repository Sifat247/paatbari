"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingBag, Menu, X, User } from "lucide-react";
import { toBanglaNumber } from "@/lib/utils";
import { useCart } from "@/lib/cart-context";
import { useLanguage } from "@/lib/i18n-context";

export interface HeaderProps {
  locale?: "bn" | "en";
  onLanguageToggle?: () => void;
}

export function Header({
  locale: propLocale,
  onLanguageToggle,
}: HeaderProps) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { cartCount, setIsMiniCartOpen } = useCart();
  const { locale: contextLocale, toggleLocale, t } = useLanguage();

  const locale = propLocale || contextLocale || "bn";
  const handleToggle = onLanguageToggle || toggleLocale;

  if (pathname && (pathname.startsWith("/admin") || pathname.startsWith("/present"))) {
    return null;
  }

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-sand/60">
      {/* 1. Announcement Bar */}
      <div className="bg-gradient-to-r from-forest via-leaf to-forest text-white text-xs py-2 px-4 text-center font-medium tracking-wide flex items-center justify-center gap-2 border-b border-leaf/40 shadow-xs">
        <span className="w-2 h-2 rounded-full bg-jute animate-pulse flex-shrink-0" />
        <span>
          {locale === "bn"
            ? "🌿 ৳২,৫০০+ অর্ডারে সারা দেশে ফ্রি হোম ডেলিভারি · ৬৪ জেলায় ক্যাশ অন ডেলিভারি (COD)"
            : "🌿 Free Nationwide Delivery on ৳2,500+ · Cash on Delivery in all 64 Districts"}
        </span>
      </div>

      {/* 2. Main Navigation Bar */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Mobile Menu Button */}
        <div className="flex items-center gap-2 md:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 -ml-2 text-ink hover:text-leaf"
            aria-label="Toggle Navigation"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Brand Wordmark */}
        <Link href="/" className="flex items-baseline gap-1.5 group">
          <span className="font-bn-display text-2xl sm:text-3xl font-bold text-leaf tracking-tight">
            পাটবাড়ি
          </span>
          <span className="w-2 h-2 rounded-full bg-jute mb-1 group-hover:scale-125 transition-transform" />
          <span className="text-xs text-ink/60 uppercase tracking-widest font-sans font-medium hidden sm:inline">
            Paatbari
          </span>
        </Link>

        {/* Desktop Links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-ink">
          <Link href="/" className="hover:text-leaf transition-colors">
            {locale === "bn" ? "হোম" : "Home"}
          </Link>
          <Link href="/shop" className="hover:text-leaf transition-colors">
            {locale === "bn" ? "শপ" : "Shop"}
          </Link>
          <Link href="/bundles" className="text-leaf hover:text-leaf/80 transition-colors font-medium">
            {locale === "bn" ? "বান্ডেল" : "Bundles"}
          </Link>
          <Link href="/b2b" className="text-clay hover:text-clay/80 transition-colors font-semibold">
            {locale === "bn" ? "কর্পোরেট (B2B)" : "B2B / Corporate"}
          </Link>
          <Link href="/blog" className="hover:text-leaf transition-colors text-ink/80">
            {locale === "bn" ? "ব্লগ" : "Blog"}
          </Link>
          <Link href="/about" className="hover:text-leaf transition-colors text-ink/80">
            {locale === "bn" ? "আমাদের কথা" : "About"}
          </Link>
        </nav>

        {/* Right Actions: Lang Switch + Account + Cart */}
        <div className="flex items-center gap-3">
          {/* Language Toggle */}
          <button
            type="button"
            onClick={handleToggle}
            className="px-2.5 py-1 text-xs font-semibold rounded-md border border-sand bg-cream hover:border-jute transition-colors text-ink"
            aria-label="Toggle Language"
          >
            {locale === "bn" ? "English" : "বাংলা"}
          </button>

          {/* Account Icon */}
          <Link
            href="/account"
            className="p-2 text-ink/75 hover:text-leaf hover:bg-cream rounded-full transition-colors hidden sm:flex items-center justify-center"
            aria-label="User Account"
          >
            <User className="w-5 h-5" />
          </Link>

          {/* Cart Trigger */}
          <button
            type="button"
            onClick={() => setIsMiniCartOpen(true)}
            className="relative p-2 text-leaf hover:bg-cream rounded-full transition-colors"
            aria-label="Shopping Cart"
          >
            <ShoppingBag className="w-6 h-6" />
            {cartCount > 0 && (
              <span className="absolute top-0 right-0 w-5 h-5 rounded-full bg-clay text-white text-[11px] font-bold flex items-center justify-center shadow-xs">
                {locale === "bn" ? toBanglaNumber(cartCount) : cartCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-cream border-b border-sand px-5 py-4 space-y-3 animate-in slide-in-from-top-2 duration-200">
          <Link
            href="/"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-base font-medium text-ink hover:text-leaf border-b border-sand/40"
          >
            {locale === "bn" ? "হোম" : "Home"}
          </Link>
          <Link
            href="/shop"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-base font-medium text-ink hover:text-leaf border-b border-sand/40"
          >
            {locale === "bn" ? "সকল পণ্য (Shop)" : "All Products"}
          </Link>
          <Link
            href="/bundles"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-base font-medium text-leaf border-b border-sand/40"
          >
            {locale === "bn" ? "বান্ডেল অফার (১০% ছাড়)" : "Special Bundles"}
          </Link>
          <Link
            href="/b2b"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-base font-semibold text-clay border-b border-sand/40"
          >
            {locale === "bn" ? "পাইকারি ও করপোরেট অর্ডার (B2B)" : "B2B Custom Quotes"}
          </Link>
          <Link
            href="/track"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-base font-medium text-ink/80 border-b border-sand/40"
          >
            {locale === "bn" ? "অর্ডার ট্র্যাকিং" : "Track Order"}
          </Link>
          <Link
            href="/account"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-base font-medium text-ink/80 border-b border-sand/40"
          >
            {locale === "bn" ? "আমার অ্যাকাউন্ট" : "My Account"}
          </Link>
          <Link
            href="/blog"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-base font-medium text-ink/80 border-b border-sand/40"
          >
            {locale === "bn" ? "ব্লগ ও টিপস" : "Blog & Tips"}
          </Link>
          <Link
            href="/about"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-base font-medium text-ink/80"
          >
            {locale === "bn" ? "আমাদের কথা" : "About Us"}
          </Link>
        </div>
      )}
    </header>
  );
}
