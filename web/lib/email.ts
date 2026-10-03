import nodemailer from "nodemailer";
import type { StoredOrder } from "./orders-store";

export interface EmailResult {
  success: boolean;
  messageId?: string;
  error?: string;
  driver: "resend" | "smtp" | "log";
}

/**
 * Generate a clean, responsive HTML email template for Paatbari order confirmation.
 */
export function generateOrderConfirmationHTML(order: StoredOrder): string {
  const itemsHtml = order.items
    .map(
      (item) => `
      <tr style="border-bottom: 1px solid #e5e7eb;">
        <td style="padding: 12px 8px; font-size: 14px; color: #1f2937;">
          <strong>${item.productName}</strong><br/>
          <span style="font-size: 12px; color: #6b7280;">ভ্যারিয়েন্ট: ${item.variantName || "Standard"}</span>
        </td>
        <td style="padding: 12px 8px; text-align: center; font-size: 14px; color: #4b5563;">
          ${item.qty}টি
        </td>
        <td style="padding: 12px 8px; text-align: right; font-size: 14px; font-weight: bold; color: #166534;">
          ৳${item.totalPrice}
        </td>
      </tr>
    `
    )
    .join("");

  const address = `${order.addressLine}${order.area ? `, ${order.area}` : ""}, ${order.district}`;

  return `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>পাটবাড়ি অর্ডার কনফার্মেশন #${order.orderNumber}</title>
  </head>
  <body style="margin: 0; padding: 0; background-color: #f7f1e3; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #1f2937;">
    <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #f7f1e3; padding: 24px 12px;">
      <tr>
        <td align="center">
          <table width="100%" border="0" cellspacing="0" cellpadding="0" style="max-width: 600px; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05); border: 1px solid #e2d9c8;">
            <!-- Header -->
            <tr>
              <td style="background-color: #1b382b; padding: 28px 24px; text-align: center;">
                <h1 style="margin: 0; color: #d4a373; font-size: 28px; font-weight: bold; letter-spacing: 1px;">পাটবাড়ি</h1>
                <p style="margin: 4px 0 0 0; color: #e5e7eb; font-size: 13px;">সোনালি আঁশের বাড়ি — Home of the golden fibre</p>
              </td>
            </tr>

            <!-- Status Banner -->
            <tr>
              <td style="padding: 24px 24px 8px 24px; text-align: center;">
                <div style="display: inline-block; background-color: #dcfce7; color: #166534; font-weight: bold; font-size: 13px; padding: 6px 16px; border-radius: 9999px; margin-bottom: 12px;">
                  ✓ অর্ডারটি সফলভাবে গৃহীত হয়েছে
                </div>
                <h2 style="margin: 0; color: #1b382b; font-size: 20px;">ধন্যবাদ, ${order.customerName}!</h2>
                <p style="margin: 6px 0 0 0; font-size: 14px; color: #4b5563;">
                  আপনার অর্ডার নম্বর: <strong style="color: #c2410c; font-family: monospace; font-size: 16px;">#${order.orderNumber}</strong>
                </p>
              </td>
            </tr>

            <!-- Order Items -->
            <tr>
              <td style="padding: 16px 24px;">
                <table width="100%" border="0" cellspacing="0" cellpadding="0" style="border-collapse: collapse;">
                  <thead>
                    <tr style="background-color: #f8fafc; border-bottom: 2px solid #e2e8f0;">
                      <th style="padding: 10px 8px; text-align: left; font-size: 12px; color: #64748b; text-transform: uppercase;">পণ্য</th>
                      <th style="padding: 10px 8px; text-align: center; font-size: 12px; color: #64748b; text-transform: uppercase;">পরিমাণ</th>
                      <th style="padding: 10px 8px; text-align: right; font-size: 12px; color: #64748b; text-transform: uppercase;">মূল্য</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${itemsHtml}
                  </tbody>
                </table>
              </td>
            </tr>

            <!-- Price Breakdown -->
            <tr>
              <td style="padding: 8px 24px 20px 24px;">
                <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #fcfbf9; border-radius: 12px; padding: 14px; border: 1px solid #f1ece1;">
                  <tr>
                    <td style="padding: 4px 0; font-size: 13px; color: #4b5563;">সাবটোটাল:</td>
                    <td style="padding: 4px 0; font-size: 13px; text-align: right; font-weight: 600; color: #1f2937;">৳${order.subtotal}</td>
                  </tr>
                  <tr>
                    <td style="padding: 4px 0; font-size: 13px; color: #4b5563;">ডেলিভারি চার্জ:</td>
                    <td style="padding: 4px 0; font-size: 13px; text-align: right; font-weight: 600; color: #1f2937;">৳${order.deliveryFee}</td>
                  </tr>
                  ${
                    order.discount > 0
                      ? `
                  <tr>
                    <td style="padding: 4px 0; font-size: 13px; color: #166534;">ডিসকাউন্ট:</td>
                    <td style="padding: 4px 0; font-size: 13px; text-align: right; font-weight: 600; color: #166534;">-৳${order.discount}</td>
                  </tr>`
                      : ""
                  }
                  <tr style="border-top: 1px solid #e5e7eb;">
                    <td style="padding: 8px 0 0 0; font-size: 16px; font-weight: bold; color: #1b382b;">সর্বমোট:</td>
                    <td style="padding: 8px 0 0 0; font-size: 18px; font-weight: bold; text-align: right; color: #166534;">৳${order.total}</td>
                  </tr>
                </table>
              </td>
            </tr>

            <!-- Delivery & Payment Info -->
            <tr>
              <td style="padding: 0 24px 24px 24px;">
                <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #f8fafc; border-radius: 12px; padding: 14px; border: 1px solid #e2e8f0;">
                  <tr>
                    <td style="padding-bottom: 8px;">
                      <strong style="font-size: 13px; color: #1b382b;">📍 ডেলিভারি ঠিকানা:</strong><br/>
                      <span style="font-size: 13px; color: #334155; line-height: 1.5;">${address}</span>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding-bottom: 8px;">
                      <strong style="font-size: 13px; color: #1b382b;">📞 ফোন নম্বর:</strong><br/>
                      <span style="font-size: 13px; color: #334155;">${order.customerPhone}</span>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <strong style="font-size: 13px; color: #1b382b;">💳 পেমেন্ট মাধ্যম:</strong><br/>
                      <span style="font-size: 13px; color: #334155; text-transform: uppercase;">${order.paymentMethod === "cod" ? "ক্যাশ অন ডেলিভারি (পণ্য হাতে পেয়ে মূল্য পরিশোধ)" : order.paymentMethod}</span>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <!-- Next Steps Notice -->
            <tr>
              <td style="padding: 0 24px 24px 24px;">
                <div style="background-color: #fefce8; border-left: 4px solid #ca8a04; padding: 12px 16px; border-radius: 4px; font-size: 13px; color: #854d0e; line-height: 1.5;">
                  <strong>পরবর্তী ধাপ:</strong> আমাদের একজন প্রতিনিধি আপনার ফোন নম্বরে যোগাযোগ করে ডেলিভারির তথ্য নিশ্চিত করার পর পার্সেলটি প্যাকেজিং ও কুরিয়ারে হস্তান্তর করা হবে।
                </div>
              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td style="background-color: #fcfbf9; padding: 20px 24px; text-align: center; border-top: 1px solid #f1ece1; font-size: 12px; color: #6b7280;">
                <p style="margin: 0 0 4px 0;">যেকোনো প্রয়োজনে আমাদের সাথে যোগাযোগ করুন:</p>
                <p style="margin: 0; color: #1b382b; font-weight: 600;">ওয়েবসাইট: <a href="https://paatbari.vercel.app" style="color: #166534; text-decoration: none;">paatbari.vercel.app</a></p>
                <p style="margin: 8px 0 0 0; color: #9ca3af; font-size: 11px;">© ${new Date().getFullYear()} পাটবাড়ি (Paatbari). সর্বস্বত্ব সংরক্ষিত।</p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
  </html>
  `;
}

/**
 * Send order confirmation email to the customer.
 * Supports Resend API, SMTP/Nodemailer, and log fallback.
 */
export async function sendOrderConfirmationEmail(order: StoredOrder): Promise<EmailResult> {
  const recipientEmail = (order.customerEmail || "").trim();
  if (!recipientEmail || !recipientEmail.includes("@")) {
    return {
      success: false,
      error: "NO_VALID_EMAIL",
      driver: "log",
    };
  }

  const subject = `পাটবাড়ি অর্ডার নিশ্চিতকরণ #${order.orderNumber} (৳${order.total})`;
  const html = generateOrderConfirmationHTML(order);

  // 1. Try Resend API (Preferred on Vercel Edge/Serverless)
  const resendApiKey = process.env.RESEND_API_KEY;
  if (resendApiKey) {
    try {
      const fromEmail = process.env.RESEND_FROM_EMAIL || "Paatbari <orders@paatbari.com>";
      const response = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${resendApiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: fromEmail,
          to: [recipientEmail],
          subject: subject,
          html: html,
        }),
      });

      const data = await response.json();
      if (response.ok && data.id) {
        console.log(`[Email Sent via Resend] ID: ${data.id} to ${recipientEmail}`);
        return {
          success: true,
          messageId: data.id,
          driver: "resend",
        };
      } else {
        console.warn("[Resend Warning]:", data);
      }
    } catch (err: any) {
      console.error("[Resend Error]:", err.message);
    }
  }

  // 2. Try SMTP / Gmail (Nodemailer)
  const smtpHost = process.env.SMTP_HOST || (process.env.GMAIL_USER ? "smtp.gmail.com" : null);
  const smtpUser = process.env.SMTP_USER || process.env.GMAIL_USER;
  const smtpPass = process.env.SMTP_PASS || process.env.GMAIL_APP_PASSWORD;

  if (smtpHost && smtpUser && smtpPass) {
    try {
      const transporter = nodemailer.createTransport({
        host: smtpHost,
        port: Number(process.env.SMTP_PORT) || 465,
        secure: (process.env.SMTP_SECURE !== "false"),
        auth: {
          user: smtpUser,
          pass: smtpPass,
        },
      });

      const info = await transporter.sendMail({
        from: process.env.SMTP_FROM || `"পাটবাড়ি" <${smtpUser}>`,
        to: recipientEmail,
        subject: subject,
        html: html,
      });

      console.log(`[Email Sent via SMTP] MessageId: ${info.messageId} to ${recipientEmail}`);
      return {
        success: true,
        messageId: info.messageId,
        driver: "smtp",
      };
    } catch (err: any) {
      console.error("[SMTP Error]:", err.message);
    }
  }

  // 3. Fallback: Log to console in sandbox / dev
  console.log(`\n================== [PAATBARI EMAIL CONFIRMATION LOG] ==================`);
  console.log(`📧 To: ${recipientEmail}`);
  console.log(`📦 Order: #${order.orderNumber} (৳${order.total})`);
  console.log(`🕒 Time: ${new Date().toISOString()}`);
  console.log(`💡 Note: To send real emails, set RESEND_API_KEY or SMTP credentials in Vercel.`);
  console.log(`=======================================================================\n`);

  return {
    success: true,
    messageId: `log-email-${Date.now()}`,
    driver: "log",
  };
}
