import { NextRequest, NextResponse } from "next/server";
import { catalogStore } from "@/lib/catalog";
import { isAdmin, unauthorized } from "@/lib/auth";

export async function GET() {
  const products = catalogStore.getAll();
  return NextResponse.json({
    success: true,
    count: products.length,
    products,
  });
}

export async function PATCH(req: NextRequest) {
  if (!isAdmin(req)) return unauthorized();
  try {
    const body = await req.json();
    const { productId, variantKey, price, toggleStock, reset } = body;

    if (reset) {
      catalogStore.reset();
      return NextResponse.json({ success: true, message: "ক্যাটালগ রিসেট সফল", products: catalogStore.getAll() });
    }

    if (toggleStock && productId) {
      catalogStore.toggleStock(productId);
      return NextResponse.json({
        success: true,
        message: "স্টক স্ট্যাটাস আপডেট হয়েছে",
        products: catalogStore.getAll(),
      });
    }

    if (!productId || !variantKey || price === undefined) {
      return NextResponse.json(
        { error: "MISSING_FIELDS", message: "প্রোডাক্ট আইডি, ভ্যারিয়েন্ট ও মূল্য আবশ্যক" },
        { status: 400 }
      );
    }

    const numPrice = Number(price);
    if (isNaN(numPrice) || numPrice < 0) {
      return NextResponse.json({ error: "INVALID_PRICE", message: "সঠিক মূল্য লিখুন" }, { status: 400 });
    }

    const updated = catalogStore.updateVariantPrice(productId, variantKey, numPrice);
    if (!updated) {
      return NextResponse.json({ error: "PRODUCT_NOT_FOUND", message: "পণ্য বা ভ্যারিয়েন্ট পাওয়া যায়নি" }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: "মূল্য সফলভাবে আপডেট হয়েছে",
      products: catalogStore.getAll(),
    });
  } catch (err: any) {
    return NextResponse.json({ error: "SERVER_ERROR", message: err.message }, { status: 500 });
  }
}
