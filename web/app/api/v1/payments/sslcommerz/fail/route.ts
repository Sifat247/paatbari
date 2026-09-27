import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  return handleFail(req);
}

export async function GET(req: NextRequest) {
  return handleFail(req);
}

function handleFail(req: NextRequest) {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || req.headers.get("origin") || "http://localhost:3000";
  return NextResponse.redirect(`${baseUrl}/checkout/fail`, 303);
}
