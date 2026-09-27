import { NextRequest, NextResponse } from "next/server";
import { quoteB2B, B2BConfig } from "@/lib/pricing";

const b2bConfig: B2BConfig = {
  moq: 50,
  tiers: [
    { min: 50, max: 199, unit: 180 },
    { min: 200, max: 499, unit: 160 },
    { min: 500, max: null, unit: 140 },
  ],
  logoFee: 25,
  setupFee: 1500,
  depositPct: 50,
};

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const qty = Number(body.qty);
    const logo = Boolean(body.logo);

    if (isNaN(qty) || !Number.isInteger(qty)) {
      return NextResponse.json(
        { error: "INVALID_QTY", message: "সঠিক পরিমাণ লিখুন" },
        { status: 400 }
      );
    }

    if (qty < b2bConfig.moq) {
      return NextResponse.json(
        {
          error: "BELOW_MOQ",
          message: `সর্বনিম্ন অর্ডার ${b2bConfig.moq} পিস`,
          moq: b2bConfig.moq,
        },
        { status: 422 }
      );
    }

    const quote = quoteB2B(qty, logo, b2bConfig);
    return NextResponse.json({
      success: true,
      qty,
      logo,
      ...quote,
    });
  } catch (err: any) {
    if (err.message === "BELOW_MOQ") {
      return NextResponse.json(
        {
          error: "BELOW_MOQ",
          message: `সর্বনিম্ন অর্ডার ${b2bConfig.moq} পিস`,
          moq: b2bConfig.moq,
        },
        { status: 422 }
      );
    }
    return NextResponse.json(
      { error: "SERVER_ERROR", message: err.message || "ক্যালকুলেশন ত্রুটি" },
      { status: 500 }
    );
  }
}
