import { NextRequest, NextResponse } from "next/server";
import { sslcommerz } from "@/lib/sslcommerz";
import { ordersStore } from "@/lib/orders-store";
import { getQuoteByToken, updateQuoteStatus } from "@/lib/quotes-store";
import { sendSMS, smsTemplates } from "@/lib/sms";

export async function POST(req: NextRequest) {
  try {
    let payload: Record<string, string> = {};

    const contentType = req.headers.get("content-type") || "";
    if (contentType.includes("application/x-www-form-urlencoded")) {
      const formData = await req.formData();
      formData.forEach((val, key) => {
        payload[key] = val.toString();
      });
    } else {
      payload = await req.json();
    }

    const { val_id, tran_id, status } = payload;

    if (!val_id || !tran_id) {
      return NextResponse.json({ error: "MISSING_PARAMS" }, { status: 400 });
    }

    // Determine if B2B quote or retail order
    const isB2B = tran_id.includes("-QT-");
    const idMatches = tran_id.match(/TR-([A-Za-z0-9-]+)-\d+/);
    const identifier = idMatches ? idMatches[1] : "";

    if (!identifier) {
      return NextResponse.json({ error: "INVALID_TRAN_ID" }, { status: 400 });
    }

    let expectedAmount = 0;
    if (isB2B) {
      const quote = await getQuoteByToken(identifier);
      if (!quote) return NextResponse.json({ error: "QUOTE_NOT_FOUND" }, { status: 404 });
      expectedAmount = quote.depositAmount;
    } else {
      const order = await ordersStore.getByNumber(identifier);
      if (!order) return NextResponse.json({ error: "ORDER_NOT_FOUND" }, { status: 404 });
      expectedAmount = order.total;
    }

    // Server-to-server validation API call
    const validation = await sslcommerz.validatePayment(val_id, tran_id, expectedAmount);

    if (!validation.isValid) {
      console.warn(`[SSLCommerz IPN Invalid]: Tran ${tran_id} failed verification.`);
      return NextResponse.json({ error: "VALIDATION_FAILED", status: validation.status }, { status: 400 });
    }

    // Idempotent processing
    if (isB2B) {
      const quote = await getQuoteByToken(identifier);
      if (quote && quote.status !== "deposit_paid") {
        await updateQuoteStatus(identifier, "deposit_paid", `৫০% ডিপোজিট ভেরিফাইড (SSLCommerz TranID: ${tran_id})`);
        await sendSMS(
          quote.phone,
          `ধন্যবাদ! আপনার পাটবাড়ি কোটেশন #${identifier}-এর ৫০% ডিপোজিট সফলভাবে গৃহীত হয়েছে। উৎপাদন শুরু হচ্ছে।`
        );
      }
    } else {
      const order = await ordersStore.getByNumber(identifier);
      if (order && order.paymentStatus !== "paid") {
        await ordersStore.updateStatus(
          identifier,
          "confirmed",
          "অনলাইন পেমেন্ট নিশ্চিত (SSLCommerz)",
          `পেমেন্ট গেটওয়ে সফল — TranID: ${tran_id}, ValID: ${val_id}`,
          undefined,
          undefined,
          { paymentStatus: "paid", tranId: tran_id }
        );

        const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://paatbari.com";
        const trackUrl = `${baseUrl}/track?order=${identifier}`;
        await sendSMS(order.customerPhone, smsTemplates.orderConfirmed(identifier, trackUrl));
      }
    }

    return NextResponse.json({ success: true, message: "IPN Verified & Processed" });
  } catch (err: any) {
    console.error("[SSLCommerz IPN Exception]:", err.message);
    return NextResponse.json({ error: "SERVER_ERROR", message: err.message }, { status: 500 });
  }
}
