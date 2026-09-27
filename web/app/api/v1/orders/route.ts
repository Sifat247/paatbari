import { NextRequest, NextResponse } from "next/server";
import { quoteB2C } from "@/lib/pricing";
import { ordersStore, StoredOrder } from "@/lib/orders-store";
import { isValidBDPhone } from "@/lib/locations";

const defaultDb = {
  variants: [
    { id: "P01-natural", price: 450 },
    { id: "P01-dyed", price: 450 },
    { id: "P02-std", price: 1450 },
    { id: "P03-std", price: 950 },
    { id: "P04-std", price: 380 },
    { id: "P05-S", price: 450 },
    { id: "P05-M", price: 650 },
    { id: "P05-L", price: 850 },
    { id: "P06-2x3", price: 1200 },
    { id: "P06-3x5", price: 2400 },
    { id: "P07-std", price: 350 },
    { id: "P08-std", price: 550 },
    { id: "P09-std", price: 900 },
    { id: "P10-std", price: 250 },
    { id: "P11-std", price: 750 },
    { id: "P12-std", price: 400 },
    { id: "P13-std", price: 300 },
    { id: "P14-std", price: 1500 },
  ],
  bundles: [
    {
      id: "BN1",
      discountPct: 10,
      items: [
        { variantId: "P07-std", qty: 2 },
        { variantId: "P08-std", qty: 1 },
        { variantId: "P10-std", qty: 1 },
      ],
    },
  ],
  coupons: [
    { code: "JUTE10", type: "percent" as const, value: 10, active: true },
  ],
  settings: {
    zones: [
      { key: "dhaka_city", fee: 70 },
      { key: "dhaka_sub", fee: 100 },
      { key: "outside", fee: 130 },
    ],
    freeThreshold: 2500,
  },
};

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      customerName,
      customerPhone,
      customerEmail,
      division,
      district,
      area,
      addressLine,
      zone,
      lines = [],
      bundles = [],
      coupon = null,
      notes,
      paymentMethod = "cod",
    } = body;

    // 1. Validation
    if (!customerName || !customerName.trim()) {
      return NextResponse.json({ error: "গ্রাহকের নাম আবশ্যক" }, { status: 400 });
    }
    if (!customerPhone || !isValidBDPhone(customerPhone)) {
      return NextResponse.json({ error: "সঠিক ১১ ডিজিটের বাংলাদেশী মোবাইল নম্বর দিন (যেমন: 017xxxxxxxx)" }, { status: 400 });
    }
    if (!addressLine || !district) {
      return NextResponse.json({ error: "সম্পূর্ণ ঠিকানা ও জেলা নির্বাচন করুন" }, { status: 400 });
    }
    if (!lines || lines.length === 0) {
      return NextResponse.json({ error: "কার্টে কোনো পণ্য নেই" }, { status: 400 });
    }

    // 2. Recalculate Pricing on Server (tampered client totals are ignored)
    const quote = quoteB2C(
      { lines, bundles, coupon, zone: zone || "dhaka_city" },
      defaultDb
    );

    // 3. Generate Order Number
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const orderNumber = `PB-2609-${randomSuffix}`;

    const chosenPayment = paymentMethod === "sslcommerz" ? "sslcommerz" : "cod";

    const newOrder: StoredOrder = {
      id: `ord-${Date.now()}`,
      orderNumber,
      customerName: customerName.trim(),
      customerPhone: customerPhone.trim(),
      customerEmail: customerEmail?.trim(),
      division: division || "Dhaka",
      district: district || "Dhaka",
      area: area || "",
      addressLine: addressLine.trim(),
      zone: zone || "dhaka_city",
      subtotal: quote.subtotal,
      discount: quote.discount,
      deliveryFee: quote.delivery,
      total: quote.total,
      status: "pending",
      paymentMethod: chosenPayment,
      paymentStatus: "pending",
      items: lines.map((l: any) => {
        const v = defaultDb.variants.find((x) => x.id === l.variantId);
        const unitPrice = v ? v.price : 450;
        return {
          variantId: l.variantId,
          productName: l.productName || "পাটপণ্য",
          variantName: l.variantName || "স্ট্যান্ডার্ড",
          unitPrice,
          qty: l.qty,
          totalPrice: unitPrice * l.qty,
        };
      }),
      createdAt: new Date().toISOString(),
      notes,
      events: [
        {
          time: new Date().toLocaleTimeString("bn-BD", { hour: "2-digit", minute: "2-digit" }),
          title: chosenPayment === "sslcommerz" ? "অনলাইন পেমেন্ট প্রক্রিয়াধীন" : "অর্ডার অপেক্ষমাণ (Pending)",
          desc: chosenPayment === "sslcommerz" ? "SSLCommerz গেটওয়েতে রিডাইরেক্ট করা হচ্ছে।" : "অর্ডারটি সফলভাবে গৃহীত হয়েছে। আমাদের প্রতিনিধি শীঘ্রই কনফার্মেশনের জন্য কল করবেন।",
        },
      ],
    };

    ordersStore.save(newOrder);

    // Send SMS for COD
    if (chosenPayment === "cod") {
      try {
        const { sendSMS, smsTemplates } = await import("@/lib/sms");
        await sendSMS(newOrder.customerPhone, smsTemplates.orderPlacedCOD(newOrder.orderNumber, newOrder.total));
      } catch (e) {
        console.error("SMS notification failed:", e);
      }
    }

    return NextResponse.json({
      success: true,
      orderNumber: newOrder.orderNumber,
      total: newOrder.total,
      status: newOrder.status,
      paymentMethod: newOrder.paymentMethod,
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "INTERNAL_ERROR" },
      { status: 500 }
    );
  }
}
