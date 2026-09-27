import React from "react";
import { formatPrice } from "@/lib/utils";
import { Truck } from "lucide-react";

export interface FreeDeliveryProgressProps {
  currentAmount: number;
  threshold?: number;
  locale?: "bn" | "en";
  className?: string;
}

export function FreeDeliveryProgress({
  currentAmount,
  threshold = 2500,
  locale = "bn",
  className = "",
}: FreeDeliveryProgressProps) {
  const remaining = Math.max(0, threshold - currentAmount);
  const percentage = Math.min(100, Math.round((currentAmount / threshold) * 100));
  const isFree = remaining === 0;

  return (
    <div className={`bg-sand/30 border border-sand p-3.5 rounded-lg ${className}`}>
      <div className="flex items-center gap-2 text-sm text-ink mb-2">
        <Truck className="w-4 h-4 text-leaf flex-shrink-0" />
        {isFree ? (
          <span className="font-medium text-leaf">
            {locale === "bn"
              ? "🎉 অভিনন্দন! আপনি ফ্রি ডেলিভারি পাচ্ছেন।"
              : "🎉 Congratulations! You have unlocked Free Delivery."}
          </span>
        ) : (
          <span>
            {locale === "bn" ? (
              <>
                আর <strong className="text-leaf font-semibold">{formatPrice(remaining, "bn")}</strong> টাকার অর্ডারে <strong>ফ্রি ডেলিভারি</strong>!
              </>
            ) : (
              <>
                Add <strong className="text-leaf font-semibold">{formatPrice(remaining, "en")}</strong> more to get <strong>Free Delivery</strong>!
              </>
            )}
          </span>
        )}
      </div>

      <div className="w-full bg-sand/60 h-2 rounded-full overflow-hidden">
        <div
          className="bg-leaf h-full transition-all duration-300 ease-out"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
