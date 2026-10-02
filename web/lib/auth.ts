// Small signed-cookie helpers (server-only).
//  • Admin login  → cookie "pb_admin"  (set by POST /api/v1/admin/login)
//  • Customer OTP → cookie "pb_phone"  (set by POST /api/v1/auth/otp/verify)
import "server-only";
import crypto from "crypto";
import type { NextRequest, NextResponse } from "next/server";

export const ADMIN_COOKIE = "pb_admin";
export const PHONE_COOKIE = "pb_phone";

function secret(): string {
  const s = process.env.SESSION_SECRET || process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!s) throw new Error("SESSION_SECRET (or SUPABASE_SERVICE_ROLE_KEY) is not set");
  return s;
}

function sign(payload: string): string {
  const mac = crypto.createHmac("sha256", secret()).update(payload).digest("base64url");
  return `${Buffer.from(payload).toString("base64url")}.${mac}`;
}

function unsign(token: string | undefined): string | null {
  if (!token || !token.includes(".")) return null;
  const [b64, mac] = token.split(".");
  let payload: string;
  try {
    payload = Buffer.from(b64, "base64url").toString();
  } catch {
    return null;
  }
  const expected = crypto.createHmac("sha256", secret()).update(payload).digest("base64url");
  const a = Buffer.from(mac);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) return null;
  return payload;
}

function makeToken(kind: string, value: string, days: number): { token: string; maxAge: number } {
  const exp = Date.now() + days * 24 * 60 * 60 * 1000;
  return { token: sign(`${kind}|${value}|${exp}`), maxAge: days * 24 * 60 * 60 };
}

function readToken(kind: string, token: string | undefined): string | null {
  const payload = unsign(token);
  if (!payload) return null;
  const [k, value, exp] = payload.split("|");
  if (k !== kind || !exp || Date.now() > Number(exp)) return null;
  return value;
}

const cookieOpts = (maxAge: number) => ({
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
  path: "/",
  maxAge,
});

// ---------- Admin ----------
export function checkAdminPassword(input: string): boolean {
  const pw = process.env.ADMIN_PASSWORD;
  if (!pw || pw.length < 8) return false;
  const a = crypto.createHash("sha256").update(input || "").digest();
  const b = crypto.createHash("sha256").update(pw).digest();
  return crypto.timingSafeEqual(a, b);
}

export function setAdminCookie(res: NextResponse) {
  const { token, maxAge } = makeToken("admin", "owner", 7);
  res.cookies.set(ADMIN_COOKIE, token, cookieOpts(maxAge));
}

export function isAdminToken(token: string | undefined): boolean {
  try {
    return readToken("admin", token) === "owner";
  } catch {
    return false;
  }
}

export function isAdmin(req: NextRequest): boolean {
  return isAdminToken(req.cookies.get(ADMIN_COOKIE)?.value);
}

// ---------- Customer (verified phone) ----------
export function setPhoneCookie(res: NextResponse, phone: string) {
  const { token, maxAge } = makeToken("phone", phone, 30);
  res.cookies.set(PHONE_COOKIE, token, cookieOpts(maxAge));
}

export function verifiedPhone(req: NextRequest): string | null {
  try {
    return readToken("phone", req.cookies.get(PHONE_COOKIE)?.value);
  } catch {
    return null;
  }
}

export const unauthorized = () =>
  Response.json({ error: "UNAUTHORIZED", message: "অ্যাডমিন লগইন প্রয়োজন" }, { status: 401 });

// ---------- Just-placed order (lets the buyer see the confirmation page) ----------
export const ORDER_COOKIE = "pb_order";

export function setOrderCookie(res: NextResponse, orderNumber: string) {
  const { token, maxAge } = makeToken("order", orderNumber.toUpperCase(), 2);
  res.cookies.set(ORDER_COOKIE, token, cookieOpts(maxAge));
}

export function justPlacedOrder(req: NextRequest): string | null {
  try {
    return readToken("order", req.cookies.get(ORDER_COOKIE)?.value);
  } catch {
    return null;
  }
}
