"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, ShoppingBag, Briefcase, ShoppingCart } from "lucide-react";
import { toBanglaNumber } from "@/lib/utils";

export interface BottomNavProps {
  locale?: "bn" | "en";
  cartCount?: number;
}

export function BottomNav({ locale = "bn", cartCount = 2 }: BottomNavProps) {
  const pathname = usePathname();

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
      label: locale === "bn" ? "কোট" : "Quote",
      icon: Briefcase,
    },
    {
      href: "/cart",
      label: locale === "bn" ? "ব্যাগ" : "Bag",
      icon: ShoppingCart,
      badge: cartCount,
    },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-sand shadow-lg pb-safe">
      <div className="grid grid-cols-4 h-16">
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
              <div className="relative">
                <Icon className={`w-5 h-5 ${isActive ? "stroke-[2.2]" : "stroke-[1.75]"}`} />
                {item.badge && item.badge > 0 ? (
                  <span className="absolute -top-1.5 -right-2 bg-clay text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                    {locale === "bn" ? toBanglaNumber(item.badge) : item.badge}
                  </span>
                ) : null}
              </div>
              <span className="text-[11px] mt-1">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
