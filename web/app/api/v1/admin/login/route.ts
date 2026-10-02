import { NextRequest, NextResponse } from "next/server";
import { ADMIN_COOKIE, checkAdminPassword, setAdminCookie } from "@/lib/auth";

export const dynamic = "force-dynamic";

// Simple brute-force slow-down (per server instance)
const fails = new Map<string, { n: number; until: number }>();

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "local";
  const f = fails.get(ip);
  if (f && f.until > Date.now()) {
    return NextResponse.json({ error: "TOO_MANY_TRIES", message: "অনেকবার ভুল হয়েছে, ১০ মিনিট পর চেষ্টা করুন" }, { status: 429 });
  }

  if (!process.env.ADMIN_PASSWORD || process.env.ADMIN_PASSWORD.length < 8) {
    return NextResponse.json(
      { error: "NOT_CONFIGURED", message: "ADMIN_PASSWORD (৮+ অক্ষর) .env.local / Vercel-এ সেট করা নেই" },
      { status: 500 }
    );
  }

  const { password } = await req.json().catch(() => ({ password: "" }));
  if (!checkAdminPassword(String(password || ""))) {
    const n = (f?.n || 0) + 1;
    fails.set(ip, { n, until: n >= 5 ? Date.now() + 10 * 60 * 1000 : 0 });
    return NextResponse.json({ error: "WRONG_PASSWORD", message: "পাসওয়ার্ড ভুল" }, { status: 401 });
  }

  fails.delete(ip);
  const res = NextResponse.json({ success: true });
  setAdminCookie(res);
  return res;
}

export async function DELETE() {
  const res = NextResponse.json({ success: true });
  res.cookies.set(ADMIN_COOKIE, "", { maxAge: 0, path: "/" });
  return res;
}
