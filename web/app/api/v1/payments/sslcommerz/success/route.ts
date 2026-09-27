import { NextRequest, NextResponse } from "next/server";
import { sslcommerz } from "@/lib/sslcommerz";
import { ordersStore } from "@/lib/orders-store";
import { getQuoteByToken, updateQuoteStatus } from "@/lib/quotes-store";

export async function POST(req: NextRequest) {
  return handleSuccess(req);
}

export async function GET(req: NextRequest) {
  return handleSuccess(req);
}

async function handleSuccess(req: NextRequest) {
  let tranId = "";
  let valId = "";

  if (req.method === "POST") {
    try {
      const formData = await req.formData();
      tranId = formData.get("tran_id")?.toString() || "";
      valId = formData.get("val_id")?.toString() || "";
    } catch {
      // json fallback
    }
  } else {
    const { searchParams } = new URL(req.url);
    tranId = searchParams.get("tran_id") || "";
    valId = searchParams.get("val_id") || "";
  }

  const idMatches = tranId.match(/TR-([A-Za-z0-9-]+)-\d+/);
  const identifier = idMatches ? idMatches[1] : "";
  const isB2B = tranId.includes("-QT-");

  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || req.headers.get("origin") || "http://localhost:3000";

  if (identifier) {
    if (isB2B) {
      const quote = getQuoteByToken(identifier);
      if (quote) {
        updateQuoteStatus(identifier, "deposit_paid", `৫০% ডিপোজিট পেমেন্ট সফল (TranID: ${tranId})`);
        return NextResponse.redirect(`${baseUrl}/quote/${identifier}?payment=success`, 303);
      }
    } else {
      const order = ordersStore.getByNumber(identifier);
      if (order) {
        order.paymentStatus = "paid";
        ordersStore.updateStatus(
          identifier,
          "confirmed",
          "অনলাইন পেমেন্ট সম্পন্ন",
          `বিকাশ/নগদ/কার্ডে পেমেন্ট গৃহীত হয়েছে (TranID: ${tranId})`
        );
        return NextResponse.redirect(`${baseUrl}/order/${identifier}?payment=success`, 303);
      }
    }
  }

  return NextResponse.redirect(`${baseUrl}/checkout/success`, 303);
}
