import { NextRequest, NextResponse } from "next/server";
import { ordersStore } from "@/lib/orders-store";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { orderNumber, phone } = body;

    if (!orderNumber || !phone) {
      return NextResponse.json(
        { error: "অর্ডার নম্বর ও মোবাইল নম্বর দিন" },
        { status: 400 }
      );
    }

    const order = ordersStore.getByNumberAndPhone(orderNumber, phone);
    if (!order) {
      return NextResponse.json(
        { error: "প্রদত্ত তথ্য অনুযায়ী কোনো অর্ডার পাওয়া যায়নি। সঠিক অর্ডার নম্বর ও নম্বর চেক করুন।" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      order,
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "INTERNAL_ERROR" },
      { status: 500 }
    );
  }
}
