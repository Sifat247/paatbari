import crypto from "crypto";
import { db } from "@/lib/supabase-server";

// ------------------------------------------------------------
// OTPs are stored hashed in Supabase (table: public.otp_requests).
// Limits: max 3 sends per 10 min, 5 wrong tries → 15 min lock, 5 min expiry.
// ------------------------------------------------------------

type OtpRow = {
  phone: string;
  code_hash: string;
  expires_at: string;
  send_count: number;
  window_start: string;
  attempts: number;
  locked_until: string | null;
};

const SECRET = () => process.env.SUPABASE_SERVICE_ROLE_KEY || "paatbari";

export function hashCode(code: string, phone = ""): string {
  return crypto.createHmac("sha256", SECRET()).update(`${phone}:${code}`).digest("hex");
}

async function getRow(phone: string): Promise<OtpRow | null> {
  const { data, error } = await db().from("otp_requests").select("*").eq("phone", phone).maybeSingle();
  if (error) throw new Error(error.message);
  return (data as OtpRow) || null;
}

export const otpStore = {
  generate: async (phone: string): Promise<{ code: string; error?: string }> => {
    const now = Date.now();
    const record = await getRow(phone);

    if (record?.locked_until && now < Date.parse(record.locked_until)) {
      const remainingMin = Math.ceil((Date.parse(record.locked_until) - now) / 60000);
      return { code: "", error: `অ্যাকাউন্ট সাময়িকভাবে লক আছে। ${remainingMin} মিনিট পর চেষ্টা করুন।` };
    }

    const windowFresh = record && now - Date.parse(record.window_start) < 10 * 60 * 1000;
    const sendCount = windowFresh ? record!.send_count : 0;
    if (sendCount >= 3) {
      return { code: "", error: "১০ মিনিটে সর্বোচ্চ ৩ বার ওটিপি পাঠানো সম্ভব। অনুগ্রহ করে অপেক্ষা করুন।" };
    }

    const isDev = process.env.NODE_ENV !== "production";
    const code = isDev ? "123456" : crypto.randomInt(100000, 1000000).toString();

    const { error } = await db().from("otp_requests").upsert({
      phone,
      code_hash: hashCode(code, phone),
      expires_at: new Date(now + 5 * 60 * 1000).toISOString(),
      send_count: sendCount + 1,
      window_start: windowFresh ? record!.window_start : new Date(now).toISOString(),
      attempts: 0,
      locked_until: null,
    });
    if (error) throw new Error(error.message);
    return { code };
  },

  verify: async (phone: string, inputCode: string): Promise<{ success: boolean; error?: string }> => {
    const now = Date.now();
    const record = await getRow(phone);

    if (!record) {
      return { success: false, error: "কোনো ওটিপি পাওয়া যায়নি। পুনরায় পাঠান।" };
    }
    if (record.locked_until && now < Date.parse(record.locked_until)) {
      return { success: false, error: "অ্যাকাউন্ট সাময়িকভাবে লক আছে।" };
    }
    if (now > Date.parse(record.expires_at)) {
      await db().from("otp_requests").delete().eq("phone", phone);
      return { success: false, error: "ওটিপির মেয়াদ শেষ হয়ে গেছে। নতুন কোড নিন।" };
    }
    if (record.attempts >= 5) {
      await db()
        .from("otp_requests")
        .update({ locked_until: new Date(now + 15 * 60 * 1000).toISOString() })
        .eq("phone", phone);
      return { success: false, error: "৫ বার ভুল কোড দেওয়ার কারণে ১৫ মিনিটের জন্য লক করা হয়েছে।" };
    }

    const a = Buffer.from(hashCode(inputCode, phone));
    const b = Buffer.from(record.code_hash);
    if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) {
      const attempts = record.attempts + 1;
      await db().from("otp_requests").update({ attempts }).eq("phone", phone);
      return { success: false, error: `ভুল কোড। আর ${Math.max(0, 5 - attempts)} বার চেষ্টা করতে পারবেন।` };
    }

    await db().from("otp_requests").delete().eq("phone", phone);
    return { success: true };
  },
};
