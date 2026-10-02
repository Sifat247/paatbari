import { NextRequest, NextResponse } from "next/server";
import { otpStore } from "@/lib/otp-store";
import { isValidBDPhone } from "@/lib/locations";
import { sendSMS, smsTemplates } from "@/lib/sms";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { phone } = body;

    const cleanPhone = (phone || "").replace(/[^0-9]/g, "");
    if (!isValidBDPhone(cleanPhone)) {
      return NextResponse.json(
        { error: "INVALID_PHONE", message: "১১ ডিজিটের সঠিক মোবাইল নম্বর দিন (০১৭xxxxxxxx)" },
        { status: 400 }
      );
    }

    const { code, error } = await otpStore.generate(cleanPhone);
    if (error) {
      return NextResponse.json({ error: "RATE_LIMITED", message: error }, { status: 429 });
    }

    // Send SMS notification
    await sendSMS(cleanPhone, smsTemplates.otp(code));

    const isDev = process.env.NODE_ENV !== "production";
    return NextResponse.json({
      success: true,
      message: "ওটিপি সফলভাবে পাঠানো হয়েছে",
      expiresIn: 300,
      devOtp: isDev ? code : undefined,
    });
  } catch (err: any) {
    return NextResponse.json({ error: "SERVER_ERROR", message: err.message }, { status: 500 });
  }
}
