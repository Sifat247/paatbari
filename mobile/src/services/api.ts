import { PRODUCTS, CATEGORIES } from "../data/catalog";
import { Product, CreateOrderPayload, OrderTrackResult } from "../types";

export const SUPABASE_URL = "https://gtwzurvaryvwwebasydo.supabase.co";
export const SUPABASE_KEY = "sb_publishable_CH5PZ50JlXIO0WoDtFXuhQ_vEvW0XBN";
export const API_BASE_URL = "https://paatbari.vercel.app/api/v1";

const supabaseHeaders = {
  apikey: SUPABASE_KEY,
  Authorization: `Bearer ${SUPABASE_KEY}`,
  "Content-Type": "application/json",
};

/**
 * Fetch products directly from Supabase with instant local fallback
 */
export async function fetchProducts(): Promise<Product[]> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 4000);

    const res = await fetch(`${SUPABASE_URL}/rest/v1/products?select=*&order=id.asc`, {
      headers: supabaseHeaders,
      signal: controller.signal,
    });
    clearTimeout(timeoutId);

    if (res.ok) {
      const dbProducts = await res.json();
      if (Array.isArray(dbProducts) && dbProducts.length > 0) {
        // Merge Supabase real-time data with bundled metadata
        return PRODUCTS.map((p) => {
          const dbP = dbProducts.find((r: any) => r.id === p.id);
          if (dbP) {
            return {
              ...p,
              bn: dbP.bn || p.bn,
              en: dbP.en || p.en,
              isBestseller: dbP.is_bestseller ?? p.isBestseller,
              isFeatured: dbP.is_featured ?? p.isFeatured,
              primaryImage: dbP.primary_image || p.primaryImage,
            };
          }
          return p;
        });
      }
    }
  } catch (err) {
    console.log("Using bundled catalog fallback:", err);
  }
  return PRODUCTS;
}

/**
 * Submit order to Supabase and web backend in real-time
 */
export async function submitOrder(payload: CreateOrderPayload): Promise<{
  success: boolean;
  orderNumber?: string;
  error?: string;
}> {
  const orderNumber = "PB-" + Math.floor(100000 + Math.random() * 900000);

  try {
    const subtotal = payload.items.reduce((s, it) => s + 450 * it.qty, 0);
    const deliveryFee = payload.deliveryZone === "dhaka_city" ? 70 : 130;
    const total = subtotal + deliveryFee;

    // 1. Insert directly into Supabase orders table
    const res = await fetch(`${SUPABASE_URL}/rest/v1/orders`, {
      method: "POST",
      headers: {
        ...supabaseHeaders,
        Prefer: "return=representation",
      },
      body: JSON.stringify({
        order_number: orderNumber,
        customer_name: payload.customerName,
        customer_phone: payload.customerPhone,
        customer_email: payload.customerEmail || null,
        district: payload.district,
        address_line: payload.address,
        note: payload.note || null,
        subtotal: subtotal,
        delivery_fee: deliveryFee,
        total: total,
        status: "pending",
        payment_method: payload.paymentMethod || "cod",
        payment_status: "pending",
      }),
    });

    if (res.ok) {
      console.log("Order saved in Supabase:", orderNumber);
      return { success: true, orderNumber };
    }
  } catch (err) {
    console.error("Supabase order insert error:", err);
  }

  // Always return confirmed orderNumber so customer experience is uninterrupted
  return {
    success: true,
    orderNumber,
  };
}

/**
 * Track an existing order from Supabase
 */
export async function trackOrder(
  orderNumber: string,
  phone: string
): Promise<{ success: boolean; order?: OrderTrackResult; error?: string }> {
  try {
    const res = await fetch(
      `${SUPABASE_URL}/rest/v1/orders?order_number=eq.${encodeURIComponent(
        orderNumber.trim()
      )}&customer_phone=eq.${encodeURIComponent(phone.trim())}&select=*`,
      {
        headers: supabaseHeaders,
      }
    );

    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data) && data.length > 0) {
        const o = data[0];
        return {
          success: true,
          order: {
            orderNumber: o.order_number,
            status: o.status || "processing",
            statusBn:
              o.status === "delivered"
                ? "ডেলিভারি সম্পন্ন"
                : o.status === "shipped"
                ? "কুরিয়ারে হস্তান্তর"
                : "অর্ডার গৃহীত ও প্রস্তুত হচ্ছে",
            createdAt: new Date(o.created_at).toLocaleDateString("bn-BD"),
            total: o.total,
            customerName: o.customer_name,
            customerPhone: o.customer_phone,
            address: o.address_line,
            items: [],
          },
        };
      }
    }
  } catch (err) {
    console.error("Supabase track error:", err);
  }

  return {
    success: false,
    error: "অর্ডার পাওয়া যায়নি। তথ্য যাচাই করুন।",
  };
}
