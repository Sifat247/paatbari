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
  image?: string;
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
  image,
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
      className={`group relative bg-white border border-sand/80 rounded-2xl overflow-hidden shadow-card hover:shadow-pop hover:-translate-y-1.5 hover:border-leaf/40 transition-all duration-300 flex flex-col justify-between ${className}`}
    >
      {/* 4:5 Aspect Ratio Clickable Image / Vector Art */}
      <Link
        href={`/p/${slug}`}
        className="block relative w-full aspect-[4/5] bg-gradient-to-b from-cream via-[#f5ebdb] to-[#ede0cc] border-b border-sand/50 overflow-hidden group/img"
      >
        <div className="w-full h-full relative flex items-center justify-center overflow-hidden">
          <ProductArt slug={slug} image={image} className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover/img:scale-105" />
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-forest/70 via-forest/20 to-transparent opacity-0 group-hover/img:opacity-100 transition-opacity duration-300 p-3 flex items-end justify-between pointer-events-none">
            <span className="text-white text-[11px] font-bold tracking-wide flex items-center gap-1">
              <span>{activeLocale === "bn" ? "বিস্তারিত দেখুন" : "View Details"}</span>
              <span>→</span>
            </span>
          </div>
        </div>

        {/* Badges */}
        {badge && (
          <div className="absolute top-3 left-3 z-10 drop-shadow-xs">
            <Badge variant={badge.variant}>
              {activeLocale === "en" && (badge as any).textEn ? (badge as any).textEn : badge.text}
            </Badge>
          </div>
        )}
      </Link>

      {/* Content */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
        <div>
          <Link href={`/p/${slug}`} className="block">
            <h3 className="text-sm sm:text-base font-bold text-ink group-hover:text-leaf transition-colors line-clamp-2">
              {name}
            </h3>
          </Link>

          {/* Rating & Artisan Proof */}
          <div className="flex items-center gap-1.5 text-xs text-jute-deep mt-1 font-medium">
            <div className="flex text-jute text-xs tracking-tighter">
              ★★★★★
            </div>
            <span className="text-[11px] text-ink/50">
              {activeLocale === "bn" ? "১০০% পরিবেশবান্ধব" : "Eco Friendly"}
            </span>
          </div>

          <div className="mt-2 flex items-baseline gap-1.5">
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
          className="w-full flex items-center justify-center gap-2 bg-leaf/10 text-leaf border border-leaf/30 group-hover:bg-leaf group-hover:text-white group-hover:shadow-md transition-all duration-300 min-h-[40px] font-semibold"
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
