"use client";

import React from "react";
import { formatPrice } from "@/lib/utils";

export interface VariantOption {
  id: string;
  name: string;
  price?: number;
  inStock?: boolean;
}

export interface VariantPickerProps {
  label: string;
  options: VariantOption[];
  selectedId: string;
  onSelect: (id: string) => void;
  locale?: "bn" | "en";
  className?: string;
}

export function VariantPicker({
  label,
  options,
  selectedId,
  onSelect,
  locale = "bn",
  className = "",
}: VariantPickerProps) {
  return (
    <div className={`space-y-2 ${className}`}>
      <span className="block text-sm font-medium text-ink/80">{label}</span>
      <div role="radiogroup" aria-label={label} className="flex flex-wrap gap-2.5">
        {options.map((option) => {
          const isSelected = option.id === selectedId;
          const isAvailable = option.inStock !== false;

          return (
            <button
              key={option.id}
              type="button"
              role="radio"
              aria-checked={isSelected}
              disabled={!isAvailable}
              onClick={() => onSelect(option.id)}
              className={`px-3.5 py-2 rounded-md text-sm transition-all border ${
                isSelected
                  ? "border-leaf bg-leaf text-white font-medium shadow-xs"
                  : "border-sand bg-white text-ink hover:border-jute"
              } ${
                !isAvailable
                  ? "opacity-40 cursor-not-allowed line-through"
                  : "cursor-pointer"
              }`}
            >
              <span>{option.name}</span>
              {option.price !== undefined && (
                <span className={`ml-1.5 text-xs ${isSelected ? "text-white/90" : "text-ink/60"}`}>
                  ({formatPrice(option.price, locale)})
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
