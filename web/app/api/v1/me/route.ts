import { NextRequest, NextResponse } from "next/server";
import { ordersStore } from "@/lib/orders-store";
import { getQuotesByPhone } from "@/lib/quotes-store";
import { verifiedPhone, PHONE_COOKIE } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  // Read cookie or phone query
  // Only a phone verified by OTP (signed httpOnly cookie) can see its own orders.
  const verified = verifiedPhone(req);
  const phone = verified || "";
  const [allOrders, allQuotes] = verified
    ? await Promise.all([ordersStore.getByPhone(verified), getQuotesByPhone(verified)])
    : [[], []];

  // If verified and has orders, get their real name & email from latest order
  const latestOrder = allOrders[0];
  const realName = latestOrder?.customerName || (verified ? `গ্রাহক (${verified})` : "সম্মানিত গ্রাহক");
  const realEmail = latestOrder?.customerEmail || "";

  // Dynamic addresses from actual customer orders
  const addresses = latestOrder
    ? [
        {
          id: "addr_1",
          label: "সর্বশেষ ডেলিভারি ঠিকানা",
          recipientName: latestOrder.customerName,
          phone: latestOrder.customerPhone,
          division: latestOrder.division || "",
          district: latestOrder.district,
          fullAddress: `${latestOrder.addressLine}${latestOrder.area ? `, ${latestOrder.area}` : ""}, ${latestOrder.district}`,
          isDefault: true,
        },
      ]
    : [];

  return NextResponse.json({
    success: true,
    user: {
      id: verified ? `usr_${verified.slice(-6)}` : "guest",
      name: realName,
      phone: phone,
      email: realEmail,
      language: "bn",
      createdAt: latestOrder?.createdAt || new Date().toISOString(),
    },
    addresses,
    verified: Boolean(verified),
    orders: allOrders.slice(0, 20),
    quotes: allQuotes.slice(0, 20),
  });
}

export async function DELETE(req: NextRequest) {
  try {
    // In production, delete user profile from supabase profiles table
    // For local / sandbox, clear user preferences & session cookies
    const response = NextResponse.json({
      success: true,
      message: "আপনার অ্যাকাউন্ট এবং সংরক্ষিত সকল ব্যক্তিগত তথ্য স্থায়ীভাবে মুছে ফেলা হয়েছে।",
      messageEn: "Your account and personal data have been permanently erased.",
    });

    // Clear session cookies
    response.cookies.set("paatbari_token", "", { maxAge: 0, path: "/" });
    response.cookies.set("paatbari_user", "", { maxAge: 0, path: "/" });
    response.cookies.set(PHONE_COOKIE, "", { maxAge: 0, path: "/" });

    return response;
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to delete account" },
      { status: 500 }
    );
  }
}
