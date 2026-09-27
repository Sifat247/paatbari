import { NextRequest, NextResponse } from "next/server";
import { sslcommerz } from "@/lib/sslcommerz";
import { ordersStore } from "@/lib/orders-store";
import { getQuoteByToken } from "@/lib/quotes-store";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { orderNumber, token, isB2B } = body;

    let amount = 0;
    let customerName = "";
    let customerPhone = "";
    let customerEmail = "";
    let address = "";
    let district = "";

    const baseUrl =
      process.env.NEXT_PUBLIC_APP_URL ||
      req.headers.get("origin") ||
      "http://localhost:3000";

    if (isB2B && token) {
      const quote = getQuoteByToken(token);
      if (!quote) {
        return NextResponse.json({ error: "QUOTE_NOT_FOUND", message: "কোটেশন পাওয়া যায়নি" }, { status: 404 });
      }
      amount = quote.depositAmount;
      customerName = quote.contactName;
      customerPhone = quote.phone;
      customerEmail = quote.email;
      address = quote.deliveryAddress || "Dhaka";
      district = "Dhaka";
    } else if (orderNumber) {
      const order = ordersStore.getByNumber(orderNumber);
      if (!order) {
        return NextResponse.json({ error: "ORDER_NOT_FOUND", message: "অর্ডার পাওয়া যায়নি" }, { status: 404 });
      }
      amount = order.total;
      customerName = order.customerName;
      customerPhone = order.customerPhone;
      customerEmail = order.customerEmail || "";
      address = order.addressLine;
      district = order.district;
    } else {
      return NextResponse.json({ error: "MISSING_IDENTIFIER", message: "অর্ডার নম্বর বা কোট টোকেন আবশ্যক" }, { status: 400 });
    }

    const initResult = await sslcommerz.initSession(
      {
        orderNumber: orderNumber || token,
        amount,
        customerName,
        customerPhone,
        customerEmail,
        address,
        district,
        isB2B: Boolean(isB2B),
      },
      baseUrl
    );

    if (!initResult.success) {
      return NextResponse.json({ error: "INIT_FAILED", message: initResult.error }, { status: 502 });
    }

    return NextResponse.json({
      success: true,
      gatewayUrl: initResult.gatewayUrl,
      tranId: initResult.tranId,
    });
  } catch (err: any) {
    return NextResponse.json({ error: "SERVER_ERROR", message: err.message }, { status: 500 });
  }
}
