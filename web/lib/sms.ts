export interface SMSPayload {
  to: string;
  message: string;
}

export interface SMSResponse {
  success: boolean;
  messageId?: string;
  error?: string;
  driver: "log" | "http";
}

export const smsTemplates = {
  orderPlacedCOD: (orderNumber: string, total: number) =>
    `ধন্যবাদ! পাটবাড়ি-তে আপনার অর্ডার #${orderNumber} (৳${total}) গৃহীত হয়েছে। শীঘ্রই কনফার্ম করতে কল করা হবে। হেল্পলাইন: 01700000000`,

  orderConfirmed: (orderNumber: string, trackUrl: string) =>
    `আপনার পাটবাড়ি অর্ডার #${orderNumber} নিশ্চিত করা হয়েছে। পার্সেল প্যাকিং চলছে। ট্র্যাক করুন: ${trackUrl}`,

  orderShipped: (orderNumber: string, courier: string, trackingId: string) =>
    `আপনার পাটবাড়ি অর্ডার #${orderNumber} ${courier}-এ হ্যান্ডওভার করা হয়েছে। ট্র্যাকিং আইডি: ${trackingId}`,

  otp: (code: string) =>
    `আপনার পাটবাড়ি ভেরিফিকেশন কোড: ${code}। এটি ৫ মিনিট কার্যকর থাকবে। কাউকে বলবেন না।`,

  quoteCreated: (token: string, total: number) =>
    `পাটবাড়ি: আপনার কর্পোরেট কোটেশন #${token} (৳${total}) তৈরি হয়েছে। পর্যালোচনা করুন: https://paatbari.com/quote/${token}`,
};

export async function sendSMS(to: string, message: string): Promise<SMSResponse> {
  const cleanPhone = to.replace(/[^0-9]/g, "");
  const driver = (process.env.SMS_DRIVER as "log" | "http") || "log";
  const apiUrl = process.env.SMS_API_URL;
  const apiKey = process.env.SMS_API_KEY;
  const senderId = process.env.SMS_SENDER_ID || "Paatbari";

  if (driver === "http" && apiUrl && apiKey) {
    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          api_key: apiKey,
          sender_id: senderId,
          recipient: cleanPhone,
          message: message,
        }),
      });

      const data = await response.json();
      return {
        success: true,
        messageId: data.message_id || `sms-${Date.now()}`,
        driver: "http",
      };
    } catch (err: any) {
      console.error("[SMS Gateway Error]:", err.message);
      // Fallback to console log so customer flow never crashes
      console.log(`[SMS FALLBACK LOG] To: ${cleanPhone} | Msg: ${message}`);
      return {
        success: false,
        error: err.message,
        driver: "log",
      };
    }
  }

  // Default driver: "log" (Development & Sandbox)
  console.log(`\n================== [PAATBARI SMS NOTIFICATION] ==================`);
  console.log(`📱 To: ${cleanPhone}`);
  console.log(`💬 Message: ${message}`);
  console.log(`⏰ Time: ${new Date().toISOString()}`);
  console.log(`=================================================================\n`);

  return {
    success: true,
    messageId: `mock-sms-${Date.now()}`,
    driver: "log",
  };
}
