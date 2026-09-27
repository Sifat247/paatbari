import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  return handleCancel(req);
}

export async function GET(req: NextRequest) {
  return handleCancel(req);
}

function handleCancel(req: NextRequest) {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || req.headers.get("origin") || "http://localhost:3000";
  return NextResponse.redirect(`${baseUrl}/checkout/cancel`, 303);
}
