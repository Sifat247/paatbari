import { NextRequest, NextResponse } from "next/server";
import { otpStore } from "@/lib/otp-store";
import { isValidBDPhone } from "@/lib/locations";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { phone, code } = body;

    const cleanPhone = (phone || "").replace(/[^0-9]/g, "");
    if (!isValidBDPhone(cleanPhone) || !code) {
      return NextResponse.json({ error: "INVALID_INPUT", message: "ফোন ও কোড আবশ্যক" }, { status: 400 });
    }

    const result = otpStore.verify(cleanPhone, code.trim());
    if (!result.success) {
      return NextResponse.json({ error: "VERIFICATION_FAILED", message: result.error }, { status: 401 });
    }

    return NextResponse.json({
      success: true,
      message: "মোবাইল নম্বর সফলভাবে যাচাই হয়েছে",
      verified: true,
      phone: cleanPhone,
    });
  } catch (err: any) {
    return NextResponse.json({ error: "SERVER_ERROR", message: err.message }, { status: 500 });
  }
}
