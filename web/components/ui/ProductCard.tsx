"use client";

import React from "react";
import Link from "next/link";
import { Badge } from "./Badge";
import { PriceTag } from "./PriceTag";
import { Button } from "./Button";
import { ShoppingBag } from "lucide-react";
import { ProductArt } from "./ProductArt";
import { useLanguage } from "@/lib/i18n-context";

export interface ProductCardProps {
  id: string;
  name: string;
  slug: string;
  price: number;
  compareAtPrice?: number;
  hasVariants?: boolean;
  badge?: {
    text: string;
    variant: "eco" | "sale" | "handmade" | "neutral";
  };
  locale?: "bn" | "en";
  onQuickAdd?: (id: string) => void;
  className?: string;
}

export function ProductCard({
  id,
  name,
  slug,
  price,
  compareAtPrice,
  hasVariants = false,
  badge,
  locale: propLocale,
  onQuickAdd,
  className = "",
}: ProductCardProps) {
  const { locale: contextLocale, t } = useLanguage();
  const activeLocale = propLocale || contextLocale || "bn";

  return (
    <div
      className={`group relative bg-white border border-sand rounded-xl overflow-hidden shadow-card hover:shadow-pop transition-all duration-200 flex flex-col justify-between ${className}`}
    >
      {/* 4:5 Aspect Ratio Clickable Image / Vector Art */}
      <Link
        href={`/p/${slug}`}
        className="block relative w-full aspect-[4/5] bg-gradient-to-b from-cream to-[#f2e8d5] border-b border-sand/50 overflow-hidden"
      >
        <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center">
          <div className="w-full max-w-[150px] aspect-square flex items-center justify-center group-hover:scale-105 transition-transform duration-300 drop-shadow-md">
            <ProductArt slug={slug} className="w-full h-full object-contain" />
          </div>
          <span className="text-[11px] text-ink/75 font-medium px-2 py-0.5 bg-white/90 rounded-md max-w-[90%] truncate shadow-xs mt-2">
            {name}
          </span>
        </div>

        {/* Badges */}
        {badge && (
          <div className="absolute top-3 left-3 z-10">
            <Badge variant={badge.variant}>{badge.text}</Badge>
          </div>
        )}
      </Link>

      {/* Content */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
        <div>
          <Link href={`/p/${slug}`} className="block">
            <h3 className="text-base font-semibold text-ink group-hover:text-leaf transition-colors line-clamp-2">
              {name}
            </h3>
          </Link>
          <div className="mt-1 flex items-baseline gap-1.5">
            {hasVariants && (
              <span className="text-xs text-ink/60 font-medium">
                {activeLocale === "bn" ? "শুরু" : "From"}
              </span>
            )}
            <PriceTag
              price={price}
              compareAtPrice={compareAtPrice}
              locale={activeLocale}
              size="md"
            />
          </div>
        </div>

        <Button
          variant="secondary"
          size="sm"
          className="w-full flex items-center justify-center gap-2 group-hover:bg-leaf group-hover:text-white transition-all min-h-[40px]"
          onClick={(e) => {
            e.stopPropagation();
            onQuickAdd?.(id);
          }}
        >
          <ShoppingBag className="w-4 h-4" />
          <span>{t("common.add_to_cart", activeLocale === "bn" ? "ব্যাগে যোগ করুন" : "Add to Bag")}</span>
        </Button>
      </div>
    </div>
  );
}
