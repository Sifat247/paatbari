import crypto from "crypto";

export interface OTPRecord {
  phone: string;
  codeHash: string;
  expiresAt: number;
  sendCount: number;
  attempts: number;
  lockedUntil?: number;
}

declare global {
  var __paatbari_otps: Map<string, OTPRecord> | undefined;
}

if (!globalThis.__paatbari_otps) {
  globalThis.__paatbari_otps = new Map<string, OTPRecord>();
}

const otps = globalThis.__paatbari_otps;

export function hashCode(code: string): string {
  return crypto.createHash("sha256").update(code).digest("hex");
}

export const otpStore = {
  get: (phone: string) => otps.get(phone),

  generate: (phone: string): { code: string; error?: string } => {
    const now = Date.now();
    let record = otps.get(phone);

    if (record) {
      if (record.lockedUntil && now < record.lockedUntil) {
        const remainingMin = Math.ceil((record.lockedUntil - now) / 60000);
        return { code: "", error: `অ্যাকাউন্ট সাময়িকভাবে লক আছে। ${remainingMin} মিনিট পর চেষ্টা করুন।` };
      }

      if (record.sendCount >= 3 && now - record.expiresAt < 600000) {
        return { code: "", error: "১০ মিনিটে সর্বোচ্চ ৩ বার ওটিপি পাঠানো সম্ভব। অনুগ্রহ করে অপেক্ষা করুন।" };
      }
    }

    // Fixed demo OTP in dev or random 6-digit in prod
    const isDev = process.env.NODE_ENV !== "production";
    const code = isDev ? "123456" : Math.floor(100000 + Math.random() * 900000).toString();

    const newRecord: OTPRecord = {
      phone,
      codeHash: hashCode(code),
      expiresAt: now + 5 * 60 * 1000, // 5 minutes
      sendCount: (record?.sendCount || 0) + 1,
      attempts: 0,
    };

    otps.set(phone, newRecord);
    return { code };
  },

  verify: (phone: string, inputCode: string): { success: boolean; error?: string } => {
    const now = Date.now();
    const record = otps.get(phone);

    if (!record) {
      return { success: false, error: "কোনো ওটিপি পাওয়া যায়নি। পুনরায় পাঠান।" };
    }

    if (record.lockedUntil && now < record.lockedUntil) {
      return { success: false, error: "অ্যাকাউন্ট সাময়িকভাবে লক আছে।" };
    }

    if (now > record.expiresAt) {
      otps.delete(phone);
      return { success: false, error: "ওটিপির মেয়াদ শেষ হয়ে গেছে। নতুন কোড নিন।" };
    }

    if (record.attempts >= 5) {
      record.lockedUntil = now + 15 * 60 * 1000; // Lock for 15 mins
      return { success: false, error: "৫ বার ভুল কোড দেওয়ার কারণে ১৫ মিনিটের জন্য লক করা হয়েছে।" };
    }

    const inputHash = hashCode(inputCode);
    if (inputHash !== record.codeHash) {
      record.attempts += 1;
      return { success: false, error: `ভুল কোড। আর ${5 - record.attempts} বার চেষ্টা করতে পারবেন।` };
    }

    // Success: consume OTP
    otps.delete(phone);
    return { success: true };
  },
};
