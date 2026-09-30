"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, ShoppingBag, Briefcase, ShoppingCart, User } from "lucide-react";
import { toBanglaNumber } from "@/lib/utils";
import { useCart } from "@/lib/cart-context";
import { useLanguage } from "@/lib/i18n-context";

export function BottomNav({ locale: propLocale }: { locale?: "bn" | "en" }) {
  const pathname = usePathname();
  const { cartCount, setIsMiniCartOpen } = useCart();
  const { locale: contextLocale } = useLanguage();
  const locale = propLocale || contextLocale || "bn";

  if (pathname && (pathname.startsWith("/admin") || pathname.startsWith("/present"))) {
    return null;
  }

  const items = [
    {
      href: "/",
      label: locale === "bn" ? "হোম" : "Home",
      icon: Home,
    },
    {
      href: "/shop",
      label: locale === "bn" ? "শপ" : "Shop",
      icon: ShoppingBag,
    },
    {
      href: "/b2b",
      label: locale === "bn" ? "কোট" : "B2B",
      icon: Briefcase,
    },
    {
      href: "/account",
      label: locale === "bn" ? "প্রোফাইল" : "Profile",
      icon: User,
    },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-sand shadow-lg pb-safe">
      <div className="grid grid-cols-5 h-16">
        {items.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center justify-center relative min-h-[44px] transition-colors ${
                isActive ? "text-leaf font-semibold" : "text-ink/60 hover:text-ink"
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? "stroke-[2.2] scale-110" : "stroke-[1.75]"} transition-transform`} />
              <span className="text-[11px] mt-1">{item.label}</span>
              {isActive && <span className="absolute bottom-1 w-1.5 h-1.5 rounded-full bg-leaf animate-pulse" />}
            </Link>
          );
        })}

        {/* Cart Trigger */}
        <button
          type="button"
          onClick={() => setIsMiniCartOpen(true)}
          className="flex flex-col items-center justify-center relative min-h-[44px] text-ink/60 hover:text-ink transition-colors"
        >
          <div className="relative">
            <ShoppingCart className="w-5 h-5 stroke-[1.75]" />
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-2 bg-clay text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {locale === "bn" ? toBanglaNumber(cartCount) : cartCount}
              </span>
            )}
          </div>
          <span className="text-[11px] mt-1">{locale === "bn" ? "ব্যাগ" : "Bag"}</span>
        </button>
      </div>
    </nav>
  );
}
