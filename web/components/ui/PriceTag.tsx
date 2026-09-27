import React from "react";
import { formatPrice } from "@/lib/utils";

export interface PriceTagProps {
  price: number;
  compareAtPrice?: number;
  locale?: "bn" | "en";
  className?: string;
  size?: "sm" | "md" | "lg";
}

export function PriceTag({
  price,
  compareAtPrice,
  locale = "bn",
  className = "",
  size = "md",
}: PriceTagProps) {
  const sizeClasses = {
    sm: "text-sm",
    md: "text-base font-semibold",
    lg: "text-2xl font-bold font-bn-display",
  };

  const isSale = compareAtPrice && compareAtPrice > price;

  return (
    <div className={`inline-flex items-baseline gap-2 ${className}`}>
      <span className={`${sizeClasses[size]} ${isSale ? "text-clay font-bold" : "text-ink"}`}>
        {formatPrice(price, locale)}
      </span>
      {isSale && (
        <span className="text-sm text-[#6B665C] line-through">
          {formatPrice(compareAtPrice, locale)}
        </span>
      )}
    </div>
  );
}
