import { NextRequest, NextResponse } from "next/server";
import { quoteB2C, Settings, Variant, Bundle, Coupon } from "@/lib/pricing";

const defaultDb = {
  variants: [
    { id: "P01-natural", price: 450 },
    { id: "P01-dyed", price: 450 },
    { id: "P02-std", price: 1450 },
    { id: "P03-std", price: 950 },
    { id: "P04-std", price: 380 },
    { id: "P05-S", price: 450 },
    { id: "P05-M", price: 650 },
    { id: "P05-L", price: 850 },
    { id: "P06-2x3", price: 1200 },
    { id: "P06-3x5", price: 2400 },
    { id: "P07-std", price: 350 },
    { id: "P08-std", price: 550 },
    { id: "P09-std", price: 900 },
    { id: "P10-std", price: 250 },
    { id: "P11-std", price: 750 },
    { id: "P12-std", price: 400 },
    { id: "P13-std", price: 300 },
    { id: "P14-std", price: 1500 },
  ],
  bundles: [
    {
      id: "BN1",
      discountPct: 10,
      items: [
        { variantId: "P07-std", qty: 2 },
        { variantId: "P08-std", qty: 1 },
        { variantId: "P10-std", qty: 1 },
      ],
    },
  ],
  coupons: [
    { code: "JUTE10", type: "percent" as const, value: 10, active: true },
  ],
  settings: {
    zones: [
      { key: "dhaka_city", fee: 70 },
      { key: "dhaka_sub", fee: 100 },
      { key: "outside", fee: 130 },
    ],
    freeThreshold: 2500,
  },
};

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { lines = [], bundles = [], coupon = null, zone = "dhaka_city" } = body;

    const quote = quoteB2C(
      { lines, bundles, coupon, zone },
      defaultDb
    );

    return NextResponse.json(quote);
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "BAD_REQUEST" },
      { status: 400 }
    );
  }
}
