import { NextRequest, NextResponse } from "next/server";
import { quoteB2B, B2BConfig } from "@/lib/pricing";
import { saveQuote, getAllQuotes, getQuoteByToken, updateQuoteStatus, B2BQuote } from "@/lib/quotes-store";

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

const productNames: Record<string, string> = {
  B01: "কাস্টম লোগো প্রিন্ট পাটের ব্যাগ (Custom Promotional Jute Bag)",
  B02: "কর্পোরেট গিফট সেট (Corporate Gift Set)",
  B03: "হেসিয়ান / বস্তা (পাইকারি) (Hessian / Sacking Bags)",
  B04: "এক্সপোর্ট / কাস্টম ম্যানুফ্যাকচারিং (Export / Custom Manufacturing)",
};

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const token = searchParams.get("token");

  if (token) {
    const quote = getQuoteByToken(token);
    if (!quote) {
      return NextResponse.json({ error: "QUOTE_NOT_FOUND", message: "কোটেশন পাওয়া যায়নি" }, { status: 404 });
    }
    return NextResponse.json({ success: true, quote });
  }

  const quotes = getAllQuotes();
  return NextResponse.json({ success: true, count: quotes.length, quotes });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      companyName,
      contactName,
      phone,
      email,
      productId = "B01",
      qty = 100,
      includeLogo = true,
      logoUrl,
      deadline,
      deliveryAddress,
      notes,
    } = body;

    // Validate phone
    const cleanPhone = (phone || "").replace(/[^0-9]/g, "");
    if (!/^01[3-9]\d{8}$/.test(cleanPhone)) {
      return NextResponse.json(
        { error: "INVALID_PHONE", message: "১১ ডিজিটের সঠিক মোবাইল নম্বর দিন (০১৭xxxxxxxx)" },
        { status: 400 }
      );
    }

    if (!companyName || !contactName) {
      return NextResponse.json(
        { error: "MISSING_FIELDS", message: "প্রতিষ্ঠান ও কর্মকর্তার নাম আবশ্যক" },
        { status: 400 }
      );
    }

    const numQty = Number(qty);
    if (isNaN(numQty) || numQty < b2bConfig.moq) {
      return NextResponse.json(
        { error: "BELOW_MOQ", message: `সর্বনিম্ন অর্ডার ${b2bConfig.moq} পিস` },
        { status: 422 }
      );
    }

    // Calculate pricing based on product type
    let unitPrice = 180;
    let setupFee = includeLogo ? b2bConfig.setupFee : 0;
    let totalPrice = 0;
    let depositAmount = 0;

    if (productId === "B01") {
      const estimate = quoteB2B(numQty, includeLogo, b2bConfig);
      unitPrice = estimate.unit;
      totalPrice = estimate.total;
      depositAmount = estimate.deposit;
    } else {
      // Custom estimated pricing for B02-B04
      const baseUnits: Record<string, number> = { B02: 450, B03: 95, B04: 300 };
      unitPrice = (baseUnits[productId] || 200) + (includeLogo ? b2bConfig.logoFee : 0);
      totalPrice = unitPrice * numQty + setupFee;
      depositAmount = Math.round(totalPrice * 0.5);
    }

    // Generate token
    const token = `QT-2609-${Math.floor(1000 + Math.random() * 9000)}`;

    const newQuote: B2BQuote = {
      token,
      createdAt: new Date().toISOString(),
      companyName,
      contactName,
      phone: cleanPhone,
      email: email || "",
      productId,
      productName: productNames[productId] || productNames.B01,
      qty: numQty,
      includeLogo: Boolean(includeLogo),
      logoUrl: logoUrl || "",
      deadline: deadline || "",
      deliveryAddress: deliveryAddress || "",
      notes: notes || "",
      unitPrice,
      setupFee,
      totalPrice,
      depositAmount,
      status: "quote_requested",
      statusNote: "নতুন অনুরোধ জমা হয়েছে।",
    };

    saveQuote(newQuote);

    return NextResponse.json({
      success: true,
      message: "কোটেশন অনুরোধ সফলভাবে গ্রহণ করা হয়েছে",
      token: newQuote.token,
      quote: newQuote,
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: "SERVER_ERROR", message: err.message || "কোটেশন সংরক্ষণে ত্রুটি" },
      { status: 500 }
    );
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const { token, status, statusNote, unitPrice, setupFee, totalPrice, depositAmount } = body;

    if (!token) {
      return NextResponse.json({ error: "MISSING_TOKEN", message: "টোকেন আবশ্যক" }, { status: 400 });
    }

    const extra: Partial<B2BQuote> = {};
    if (unitPrice !== undefined) extra.unitPrice = Number(unitPrice);
    if (setupFee !== undefined) extra.setupFee = Number(setupFee);
    if (totalPrice !== undefined) extra.totalPrice = Number(totalPrice);
    if (depositAmount !== undefined) extra.depositAmount = Number(depositAmount);

    const updated = updateQuoteStatus(token, status, statusNote, extra);
    if (!updated) {
      return NextResponse.json({ error: "QUOTE_NOT_FOUND", message: "কোটেশন পাওয়া যায়নি" }, { status: 404 });
    }

    return NextResponse.json({ success: true, quote: updated });
  } catch (err: any) {
    return NextResponse.json({ error: "SERVER_ERROR", message: err.message }, { status: 500 });
  }
}
