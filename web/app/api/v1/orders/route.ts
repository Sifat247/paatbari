import { NextRequest, NextResponse } from "next/server";
import { quoteB2C } from "@/lib/pricing";
import { ordersStore, StoredOrder } from "@/lib/orders-store";
import { isValidBDPhone } from "@/lib/locations";
import { PRODUCTS } from "@/lib/catalog";
import { settingsStore } from "@/lib/settings-store";
import crypto from "crypto";
import { isAdmin, justPlacedOrder, setOrderCookie, verifiedPhone } from "@/lib/auth";

export const dynamic = "force-dynamic";

// Prices always come from the server-side catalog (lib/catalog.ts) — the same
// prices customers see on the website. Client-sent prices are ignored.
const CATALOG_VARIANTS = PRODUCTS.flatMap((p) =>
  p.variants.map((v) => ({
    id: `${p.id}-${v.k}`,
    price: v.price,
    productBn: p.bn,
    productEn: p.en,
    variantBn: v.bn,
    variantEn: v.en,
    inStock: p.inStock !== false,
  }))
);

const COUPONS = [{ code: "JUTE10", type: "percent" as const, value: 10, active: true }];

function makeOrderNumber() {
  const d = new Date(Date.now() + 6 * 60 * 60 * 1000); // Asia/Dhaka
  const ymd = d.toISOString().slice(2, 10).replace(/-/g, "");
  const rand = crypto.randomInt(10000, 100000);
  return `PB-${ymd}-${rand}`;
}

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
      source = "web",
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
    const cleanLines = (lines as any[]).map((l) => ({ variantId: String(l.variantId), qty: Number(l.qty) }));
    for (const l of cleanLines) {
      const v = CATALOG_VARIANTS.find((x) => x.id === l.variantId);
      if (!v) return NextResponse.json({ error: `পণ্যটি পাওয়া যায়নি (${l.variantId})` }, { status: 400 });
      if (!v.inStock) return NextResponse.json({ error: `${v.productBn} এখন স্টকে নেই` }, { status: 409 });
    }
    const settings = await settingsStore.get();
    let quote;
    try {
      quote = quoteB2C(
        { lines: cleanLines, bundles: [], coupon, zone: zone || "dhaka_city" },
        {
          variants: CATALOG_VARIANTS,
          bundles: [],
          coupons: COUPONS,
          settings: {
            zones: Object.entries(settings.zones).map(([key, fee]) => ({ key, fee: Number(fee) })),
            freeThreshold: settings.freeThreshold,
          },
        }
      );
    } catch (e: any) {
      return NextResponse.json({ error: `অর্ডারের তথ্য সঠিক নয় (${e.message})` }, { status: 400 });
    }

    // 3. Generate Order Number
    const orderNumber = makeOrderNumber();

    const chosenPayment = paymentMethod === "sslcommerz" ? "sslcommerz" : "cod";

    const newOrder: StoredOrder = {
      id: "",
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
      items: cleanLines.map((l) => {
        const v = CATALOG_VARIANTS.find((x) => x.id === l.variantId)!;
        return {
          variantId: l.variantId,
          productName: v.productBn,
          variantName: v.variantBn,
          unitPrice: v.price,
          qty: l.qty,
          totalPrice: v.price * l.qty,
        };
      }),
      createdAt: new Date().toISOString(),
      notes: typeof notes === "string" ? notes.slice(0, 1000) : undefined,
      events: [
        {
          time: new Date().toLocaleTimeString("bn-BD", { hour: "2-digit", minute: "2-digit" }),
          title: chosenPayment === "sslcommerz" ? "অনলাইন পেমেন্ট প্রক্রিয়াধীন" : "অর্ডার অপেক্ষমাণ (Pending)",
          desc: chosenPayment === "sslcommerz" ? "SSLCommerz গেটওয়েতে রিডাইরেক্ট করা হচ্ছে।" : "অর্ডারটি সফলভাবে গৃহীত হয়েছে। আমাদের প্রতিনিধি শীঘ্রই কনফার্মেশনের জন্য কল করবেন।",
        },
      ],
    };

    await ordersStore.save(newOrder, source === "app" ? "app" : "web");

    // Send SMS for COD
    if (chosenPayment === "cod") {
      try {
        const { sendSMS, smsTemplates } = await import("@/lib/sms");
        await sendSMS(newOrder.customerPhone, smsTemplates.orderPlacedCOD(newOrder.orderNumber, newOrder.total));
      } catch (e) {
        console.error("SMS notification failed:", e);
      }
    }

    // Send Email confirmation if customer provided email
    if (newOrder.customerEmail) {
      try {
        const { sendOrderConfirmationEmail } = await import("@/lib/email");
        await sendOrderConfirmationEmail(newOrder);
      } catch (e) {
        console.error("Email notification failed:", e);
      }
    }

    const res = NextResponse.json({
      success: true,
      orderNumber: newOrder.orderNumber,
      subtotal: newOrder.subtotal,
      deliveryFee: newOrder.deliveryFee,
      total: newOrder.total,
      status: newOrder.status,
      paymentMethod: newOrder.paymentMethod,
    });
    setOrderCookie(res, newOrder.orderNumber);
    return res;
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "INTERNAL_ERROR" },
      { status: 500 }
    );
  }
}

// GET /api/v1/orders?number=PB-...  → order details for the confirmation page.
// Allowed for: the browser that just placed it, a phone-verified customer who owns it, or admin.
export async function GET(req: NextRequest) {
  const number = (req.nextUrl.searchParams.get("number") || "").trim().toUpperCase();
  if (!number) return NextResponse.json({ error: "MISSING_NUMBER" }, { status: 400 });
  try {
    const order = await ordersStore.getByNumber(number);
    if (!order) return NextResponse.json({ error: "ORDER_NOT_FOUND" }, { status: 404 });
    const phone = verifiedPhone(req);
    const owns =
      justPlacedOrder(req) === number ||
      (phone && order.customerPhone.replace(/[^0-9]/g, "").slice(-10) === phone.slice(-10)) ||
      isAdmin(req);
    if (!owns) return NextResponse.json({ error: "FORBIDDEN" }, { status: 403 });
    return NextResponse.json({ success: true, order });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "INTERNAL_ERROR" }, { status: 500 });
  }
}
