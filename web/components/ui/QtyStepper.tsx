"use client";

import React from "react";
import { Minus, Plus } from "lucide-react";
import { toBanglaNumber } from "@/lib/utils";

export interface QtyStepperProps {
  value: number;
  min?: number;
  max?: number;
  onChange: (val: number) => void;
  locale?: "bn" | "en";
  className?: string;
}

export function QtyStepper({
  value,
  min = 1,
  max = 20,
  onChange,
  locale = "bn",
  className = "",
}: QtyStepperProps) {
  const handleDecrement = () => {
    if (value > min) onChange(value - 1);
  };

  const handleIncrement = () => {
    if (value < max) onChange(value + 1);
  };

  return (
    <div
      className={`inline-flex items-center border border-sand bg-white rounded-md shadow-xs ${className}`}
    >
      <button
        type="button"
        onClick={handleDecrement}
        disabled={value <= min}
        aria-label="Decrease quantity"
        className="w-10 h-10 flex items-center justify-center text-ink hover:bg-sand/30 disabled:opacity-30 disabled:pointer-events-none rounded-l-md transition-colors"
      >
        <Minus className="w-4 h-4" />
      </button>
      <span className="w-12 text-center text-base font-medium text-ink select-none">
        {locale === "bn" ? toBanglaNumber(value) : value}
      </span>
      <button
        type="button"
        onClick={handleIncrement}
        disabled={value >= max}
        aria-label="Increase quantity"
        className="w-10 h-10 flex items-center justify-center text-ink hover:bg-sand/30 disabled:opacity-30 disabled:pointer-events-none rounded-r-md transition-colors"
      >
        <Plus className="w-4 h-4" />
      </button>
    </div>
  );
}
