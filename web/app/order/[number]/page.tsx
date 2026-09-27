"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ordersStore, StoredOrder } from "@/lib/orders-store";
import { Button } from "@/components/ui/Button";
import { formatPrice, toBanglaNumber } from "@/lib/utils";
import {
  CheckCircle2,
  Package,
  Phone,
  MapPin,
  Clock,
  ArrowRight,
  Truck,
  ShoppingBag,
} from "lucide-react";

export default function OrderSuccessPage() {
  const params = useParams();
  const orderNumber = params?.number as string;

  const [order, setOrder] = useState<StoredOrder | null>(null);

  useEffect(() => {
    if (orderNumber) {
      const found = ordersStore.getByNumber(orderNumber);
      if (found) {
        setOrder(found);
      }
    }
  }, [orderNumber]);

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12 sm:py-16 space-y-10 pb-24">
      {/* Success Card */}
      <div className="bg-white border-2 border-leaf/40 rounded-2xl p-8 sm:p-10 text-center space-y-5 shadow-pop">
        <div className="w-20 h-20 rounded-full bg-leaf/10 text-leaf mx-auto flex items-center justify-center animate-bounce">
          <CheckCircle2 className="w-12 h-12" />
        </div>

        <div>
          <span className="inline-block px-3 py-1 bg-leaf/15 text-leaf font-bold text-xs rounded-full mb-2">
            অর্ডারটি সফলভাবে গৃহীত হয়েছে
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold font-bn-display text-forest">
            ধন্যবাদ! আপনার অর্ডার নম্বর:{" "}
            <span className="text-clay">{orderNumber}</span>
          </h1>
          <p className="text-sm font-semibold text-leaf mt-2">
            আমরা শীঘ্রই কল করে আপনার অর্ডারটি কনফার্ম করবো।
          </p>
        </div>

        <div className="p-4 bg-sand/30 border border-sand rounded-xl text-xs text-ink/75 max-w-lg mx-auto font-bn leading-relaxed">
          আপনার অর্ডারটি বর্তমানে <strong>অপেক্ষমাণ (Pending)</strong> অবস্থায় আছে। আমাদের প্রতিনিধি আপনার প্রদত্ত নম্বরে যোগাযোগ করে ডেলিভারি ঠিকানা যাচাই করার পর পার্সেলটি প্যাকেজিং ও কুরিয়ারে প্রেরণ করা হবে।
        </div>
      </div>

      {/* Order Status Timeline */}
      <div className="bg-white border border-sand rounded-2xl p-6 sm:p-8 shadow-card space-y-6">
        <h2 className="font-bold text-base text-forest flex items-center gap-2 border-b border-sand pb-3">
          <Clock className="w-4 h-4 text-leaf" />
          <span>অর্ডার টাইমলাইন</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-center">
          <div className="p-3 rounded-xl bg-leaf/10 border border-leaf text-leaf space-y-1">
            <span className="text-xs font-bold block">১. অপেক্ষমাণ</span>
            <span className="text-[11px] opacity-80 block">অর্ডার গৃহীত হয়েছে</span>
          </div>

          <div className="p-3 rounded-xl bg-cream border border-sand text-ink/60 space-y-1">
            <span className="text-xs font-bold block">২. কনফার্মড</span>
            <span className="text-[11px] block">ফোনে কনফার্মেশন</span>
          </div>

          <div className="p-3 rounded-xl bg-cream border border-sand text-ink/60 space-y-1">
            <span className="text-xs font-bold block">৩. প্যাকেজিং</span>
            <span className="text-[11px] block">পণ্য প্রস্তুত হচ্ছে</span>
          </div>

          <div className="p-3 rounded-xl bg-cream border border-sand text-ink/60 space-y-1">
            <span className="text-xs font-bold block">৪. কুরিয়ারে হস্তান্তর</span>
            <span className="text-[11px] block">হোম ডেলিভারি</span>
          </div>
        </div>
      </div>

      {/* Order Details & Summary */}
      {order && (
        <div className="bg-white border border-sand rounded-2xl p-6 sm:p-8 shadow-card space-y-6">
          <h2 className="font-bold text-base text-forest flex items-center gap-2 border-b border-sand pb-3">
            <Package className="w-4 h-4 text-leaf" />
            <span>ডেলিভারি ও পণ্য বিবরণ</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs">
            <div className="space-y-1.5">
              <span className="font-bold text-ink/60 block">প্রাপকের নাম ও যোগাযোগ:</span>
              <p className="font-semibold text-forest text-sm">{order.customerName}</p>
              <p className="text-ink/80">{order.customerPhone}</p>
              {order.customerEmail && <p className="text-ink/60">{order.customerEmail}</p>}
            </div>

            <div className="space-y-1.5">
              <span className="font-bold text-ink/60 block">ডেলিভারি ঠিকানা:</span>
              <p className="text-ink/90 font-medium">
                {order.addressLine}, {order.area}
              </p>
              <p className="text-ink/70">
                জেলা: {order.district}, বিভাগ: {order.division}
              </p>
            </div>
          </div>

          {/* Items */}
          <div className="border-t border-sand pt-4 space-y-3">
            <span className="font-bold text-ink/60 text-xs block">অর্ডারকৃত পণ্য:</span>
            <div className="divide-y divide-sand/40 text-xs">
              {order.items.map((i, idx) => (
                <div key={idx} className="py-2.5 flex justify-between items-center">
                  <div>
                    <h4 className="font-semibold text-forest">{i.productName}</h4>
                    <span className="text-[11px] text-ink/60">
                      {i.variantName} × {toBanglaNumber(i.qty)}
                    </span>
                  </div>
                  <span className="font-bold text-forest">
                    {formatPrice(i.totalPrice, "bn")}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Pricing snapshot */}
          <div className="border-t border-sand pt-4 space-y-2 text-xs">
            <div className="flex justify-between text-ink/75">
              <span>সাবটোটাল:</span>
              <span>{formatPrice(order.subtotal, "bn")}</span>
            </div>
            <div className="flex justify-between text-ink/75">
              <span>ডেলিভারি ফি:</span>
              <span>{order.deliveryFee === 0 ? "ফ্রি (০৳)" : formatPrice(order.deliveryFee, "bn")}</span>
            </div>
            <div className="border-t border-sand pt-3 flex justify-between items-baseline text-sm">
              <span className="font-bold text-forest text-base">পরিশোধযোগ্য মোট বিল (COD):</span>
              <span className="text-2xl font-bold font-bn-display text-forest">
                {formatPrice(order.total, "bn")}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex flex-wrap items-center justify-center gap-4">
        <Link href="/track">
          <Button variant="secondary" size="lg" className="flex items-center gap-2">
            <Truck className="w-5 h-5 text-leaf" />
            <span>অর্ডার ট্র্যাক করুন</span>
          </Button>
        </Link>

        <Link href="/shop">
          <Button variant="primary" size="lg" className="flex items-center gap-2 shadow-md">
            <span>আরো কেনাকাটা করুন</span>
            <ArrowRight className="w-5 h-5" />
          </Button>
        </Link>
      </div>
    </div>
  );
}
