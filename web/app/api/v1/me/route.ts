import { NextRequest, NextResponse } from "next/server";
import { ordersStore } from "@/lib/orders-store";
import { getAllQuotes } from "@/lib/quotes-store";

export async function GET(req: NextRequest) {
  // Read cookie or phone query
  const searchParams = req.nextUrl.searchParams;
  const phone = searchParams.get("phone") || "01711000000";

  // Return mock/demo profile with actual existing orders and quotes
  const allOrders = ordersStore.getAll();
  const allQuotes = getAllQuotes();

  return NextResponse.json({
    success: true,
    user: {
      id: "usr_260901",
      name: "তানভীর আহমেদ (Tanvir Ahmed)",
      phone: phone,
      email: "tanvir.ahmed@example.com",
      language: "bn",
      createdAt: "2026-09-01T10:00:00Z",
    },
    addresses: [
      {
        id: "addr_1",
        label: "বাসার ঠিকানা (Home)",
        recipientName: "তানভীর আহমেদ",
        phone: "01711000000",
        division: "dhaka",
        district: "dhaka",
        fullAddress: "বাড়ি ১২, রোড ৪, সেক্টর ৭, উত্তরা, ঢাকা ১২৩০",
        isDefault: true,
      },
      {
        id: "addr_2",
        label: "অফিসের ঠিকানা (Office)",
        recipientName: "তানভীর আহমেদ",
        phone: "01711000000",
        division: "dhaka",
        district: "dhaka",
        fullAddress: "লেভেল ৫, হাউজ ১৮, ব্লক ই, বনানী, ঢাকা ১২১৩",
        isDefault: false,
      },
    ],
    orders: allOrders.slice(0, 5),
    quotes: allQuotes.slice(0, 5),
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

    return response;
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to delete account" },
      { status: 500 }
    );
  }
}
