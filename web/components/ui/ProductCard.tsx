"use client";

import React from "react";
import Link from "next/link";
import { Badge } from "./Badge";
import { PriceTag } from "./PriceTag";
import { Button } from "./Button";
import { ShoppingBag } from "lucide-react";

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
  locale = "bn",
  onQuickAdd,
  className = "",
}: ProductCardProps) {
  return (
    <div
      className={`group relative bg-white border border-sand rounded-xl overflow-hidden shadow-card hover:shadow-pop transition-all duration-200 flex flex-col justify-between ${className}`}
    >
      {/* 4:5 Aspect Ratio Clickable Image / Placeholder */}
      <Link href={`/p/${slug}`} className="block relative w-full aspect-[4/5] bg-cream border-b border-sand/50 overflow-hidden">
        <div className="w-full h-full flex flex-col items-center justify-center p-4 text-center">
          {/* Subtle jute-pattern placeholder box */}
          <div className="w-16 h-16 rounded-full bg-sand/60 flex items-center justify-center text-leaf mb-2 group-hover:scale-110 transition-transform duration-300">
            <ShoppingBag className="w-8 h-8 opacity-70" />
          </div>
          <span className="text-xs text-ink/70 font-medium px-2.5 py-1 bg-white/80 rounded-md max-w-[85%] truncate shadow-xs">
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
                {locale === "bn" ? "শুরু" : "From"}
              </span>
            )}
            <PriceTag
              price={price}
              compareAtPrice={compareAtPrice}
              locale={locale}
              size="md"
            />
          </div>
        </div>

        <Button
          variant="secondary"
          size="sm"
          className="w-full flex items-center justify-center gap-2 group-hover:bg-leaf group-hover:text-white transition-all"
          onClick={(e) => {
            e.stopPropagation();
            onQuickAdd?.(id);
          }}
        >
          <ShoppingBag className="w-4 h-4" />
          <span>{locale === "bn" ? "ব্যাগে যোগ করুন" : "Add to Bag"}</span>
        </Button>
      </div>
    </div>
  );
}
