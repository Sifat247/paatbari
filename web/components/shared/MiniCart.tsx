"use client";

import React from "react";
import Link from "next/link";
import { useCart } from "@/lib/cart-context";
import { FreeDeliveryProgress } from "@/components/ui/FreeDeliveryProgress";
import { QtyStepper } from "@/components/ui/QtyStepper";
import { Button } from "@/components/ui/Button";
import { formatPrice, toBanglaNumber } from "@/lib/utils";
import { X, ShoppingBag, Trash2, ArrowRight } from "lucide-react";

export function MiniCart({ locale = "bn" }: { locale?: "bn" | "en" }) {
  const {
    items,
    isMiniCartOpen,
    setIsMiniCartOpen,
    cartCount,
    subtotal,
    updateQty,
    removeFromCart,
  } = useCart();

  if (!isMiniCartOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden animate-in fade-in duration-200">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-ink/40 backdrop-blur-xs transition-opacity"
        onClick={() => setIsMiniCartOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col">
          {/* Header */}
          <div className="p-5 border-b border-sand flex items-center justify-between bg-cream/50">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-leaf" />
              <h2 className="font-bn-display text-lg font-bold text-forest">
                {locale === "bn" ? "আপনার ব্যাগ" : "Your Bag"}
                <span className="text-sm font-normal text-ink/60 ml-1.5">
                  ({locale === "bn" ? toBanglaNumber(cartCount) : cartCount}টি পণ্য)
                </span>
              </h2>
            </div>
            <button
              type="button"
              onClick={() => setIsMiniCartOpen(false)}
              className="p-1.5 text-ink/60 hover:text-ink rounded-full hover:bg-sand/30"
              aria-label="Close Cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Delivery Bar */}
          <div className="px-5 py-3 border-b border-sand/60">
            <FreeDeliveryProgress currentAmount={subtotal} threshold={2500} locale={locale} />
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4 divide-y divide-sand/50">
            {items.length === 0 ? (
              <div className="py-16 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-sand/30 mx-auto flex items-center justify-center text-ink/40">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h3 className="font-semibold text-forest">
                  {locale === "bn" ? "আপনার ব্যাগটি খালি" : "Your bag is empty"}
                </h3>
                <p className="text-xs text-ink/60 max-w-xs mx-auto">
                  {locale === "bn"
                    ? "সোনালি আঁশের তৈরি প্রাকৃতিক ও টেকসই পণ্য দিয়ে আপনার ঘর সাজান।"
                    : "Add handcrafted eco-friendly products to your bag."}
                </p>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => setIsMiniCartOpen(false)}
                >
                  <Link href="/shop">{locale === "bn" ? "শপ করুন" : "Browse Shop"}</Link>
                </Button>
              </div>
            ) : (
              items.map((item) => {
                const lineTotal = item.variant.price * item.qty;
                return (
                  <div key={`${item.product.id}-${item.variant.k}`} className="pt-4 first:pt-0 flex gap-4">
                    {/* Item Thumbnail */}
                    <div className="w-20 h-24 rounded-lg bg-cream border border-sand flex items-center justify-center flex-shrink-0 text-leaf">
                      <ShoppingBag className="w-8 h-8 opacity-60" />
                    </div>

                    {/* Details */}
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start gap-2">
                          <h4 className="font-semibold text-sm text-forest leading-snug line-clamp-1">
                            {locale === "bn" ? item.product.bn : item.product.en}
                          </h4>
                          <button
                            type="button"
                            onClick={() => removeFromCart(item.product.id, item.variant.k)}
                            className="text-ink/40 hover:text-clay p-1"
                            aria-label="Remove item"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                        <p className="text-xs text-ink/60 mt-0.5">
                          {locale === "bn" ? item.variant.bn : item.variant.en}
                        </p>
                      </div>

                      {/* Pricing calculation line */}
                      <div className="flex items-center justify-between pt-2">
                        <QtyStepper
                          value={item.qty}
                          onChange={(newQty) => updateQty(item.product.id, item.variant.k, newQty)}
                          locale={locale}
                          className="scale-90 origin-left"
                        />
                        <div className="text-right">
                          <span className="text-xs text-ink/60 block">
                            {locale === "bn" ? toBanglaNumber(item.qty) : item.qty} × {formatPrice(item.variant.price, locale)}
                          </span>
                          <span className="font-bold text-sm text-forest">
                            {formatPrice(lineTotal, locale)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Footer Subtotal & Checkout */}
          {items.length > 0 && (
            <div className="p-5 border-t border-sand bg-cream/40 space-y-4">
              <div className="flex justify-between items-baseline">
                <span className="text-sm font-semibold text-ink/75">
                  {locale === "bn" ? "মোট মূল্য (Subtotal):" : "Subtotal:"}
                </span>
                <span className="text-2xl font-bold font-bn-display text-forest">
                  {formatPrice(subtotal, locale)}
                </span>
              </div>
              <p className="text-[11px] text-ink/60 text-center">
                {locale === "bn"
                  ? "ডেলিভারি চার্জ চেকআউটের সময় জেলার ভিত্তিতে নির্ধারণ করা হবে।"
                  : "Delivery fees calculated at checkout based on district."}
              </p>

              <div className="grid grid-cols-2 gap-3">
                <Button
                  variant="secondary"
                  size="md"
                  onClick={() => setIsMiniCartOpen(false)}
                >
                  <Link href="/cart" className="w-full text-center">
                    {locale === "bn" ? "ব্যাগ দেখুন" : "View Bag"}
                  </Link>
                </Button>

                <Button
                  variant="primary"
                  size="md"
                  onClick={() => setIsMiniCartOpen(false)}
                >
                  <Link href="/checkout" className="w-full flex items-center justify-center gap-1.5">
                    <span>{locale === "bn" ? "চেকআউট" : "Checkout"}</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
