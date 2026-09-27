import { NextRequest, NextResponse } from "next/server";
import { ordersStore, StoredOrder } from "@/lib/orders-store";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const status = searchParams.get("status");

  let orders = ordersStore.getAll();
  if (status && status !== "all") {
    orders = orders.filter((o) => o.status === status);
  }

  return NextResponse.json({
    success: true,
    count: orders.length,
    orders,
  });
}

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const { orderNumber, status, eventTitle, eventDesc, courierName, trackingId } = body;

    if (!orderNumber || !status) {
      return NextResponse.json(
        { error: "MISSING_FIELDS", message: "অর্ডার নম্বর ও স্ট্যাটাস আবশ্যক" },
        { status: 400 }
      );
    }

    const title = eventTitle || `স্ট্যাটাস পরিবর্তন: ${status}`;
    const desc = eventDesc || "অ্যাডমিন প্যানেল থেকে স্ট্যাটাস আপডেট করা হয়েছে।";

    const updated = ordersStore.updateStatus(
      orderNumber,
      status as StoredOrder["status"],
      title,
      desc,
      courierName,
      trackingId
    );

    if (!updated) {
      return NextResponse.json({ error: "ORDER_NOT_FOUND", message: "অর্ডার পাওয়া যায়নি" }, { status: 404 });
    }

    return NextResponse.json({ success: true, order: updated });
  } catch (err: any) {
    return NextResponse.json({ error: "SERVER_ERROR", message: err.message }, { status: 500 });
  }
}
