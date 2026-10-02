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
 * Place an order through the website API.
 * The server re-checks every price, saves the order in Supabase and returns the real order number.
 * (The app never writes to the orders table directly — customer data stays private.)
 */
export async function submitOrder(payload: CreateOrderPayload): Promise<{
  success: boolean;
  orderNumber?: string;
  total?: number;
  error?: string;
}> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 15000);
    const res = await fetch(`${API_BASE_URL}/orders`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      signal: controller.signal,
      body: JSON.stringify({
        source: "app",
        customerName: payload.customerName,
        customerPhone: payload.customerPhone,
        customerEmail: payload.customerEmail,
        district: payload.district,
        addressLine: payload.address,
        zone: payload.deliveryZone,
        paymentMethod: "cod",
        notes: [payload.paymentMethod === "bkash" ? "পেমেন্ট: বিকাশ (অ্যাপ)" : "", payload.note || ""]
          .filter(Boolean)
          .join(" · "),
        lines: payload.items.map((i) => ({ variantId: i.variantId, qty: i.qty })),
      }),
    });
    clearTimeout(timeoutId);
    const data = await res.json().catch(() => ({}));
    if (res.ok && data.success && data.orderNumber) {
      return { success: true, orderNumber: data.orderNumber, total: data.total };
    }
    return { success: false, error: data.error || "অর্ডার সম্পন্ন করা যায়নি। আবার চেষ্টা করুন।" };
  } catch (err) {
    console.error("Order submit error:", err);
    return { success: false, error: "ইন্টারনেট সংযোগ পরীক্ষা করে আবার চেষ্টা করুন।" };
  }
}

const STATUS_BN: Record<string, string> = {
  pending: "অর্ডার গৃহীত, কনফার্মেশনের অপেক্ষায়",
  confirmed: "অর্ডার কনফার্ম হয়েছে",
  packing: "প্যাকিং চলছে",
  shipped: "কুরিয়ারে হস্তান্তর",
  delivered: "ডেলিভারি সম্পন্ন",
  cancelled: "অর্ডার বাতিল",
  returned: "ফেরত এসেছে",
};

/**
 * Track an order (order number + phone) through the website API
 */
export async function trackOrder(
  orderNumber: string,
  phone: string
): Promise<{ success: boolean; order?: OrderTrackResult; error?: string }> {
  try {
    const res = await fetch(`${API_BASE_URL}/track`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ orderNumber: orderNumber.trim(), phone: phone.trim() }),
    });
    const data = await res.json().catch(() => ({}));
    if (res.ok && data.order) {
      const o = data.order;
      const appStatus: OrderTrackResult["status"] =
        o.status === "delivered" || o.status === "shipped" || o.status === "cancelled" || o.status === "pending"
          ? o.status
          : "processing";
      return {
        success: true,
        order: {
          orderNumber: o.orderNumber,
          status: appStatus,
          statusBn: STATUS_BN[o.status] || o.status,
          createdAt: new Date(o.createdAt).toLocaleDateString("bn-BD"),
          total: o.total,
          customerName: o.customerName,
          customerPhone: o.customerPhone,
          address: o.addressLine,
          items: (o.items || []).map((it: any) => ({
            variantId: it.variantId,
            productId: String(it.variantId).split("-")[0],
            name: `${it.productName} (${it.variantName})`,
            qty: it.qty,
            price: it.unitPrice,
          })),
        },
      };
    }
    return { success: false, error: data.error || "অর্ডার পাওয়া যায়নি। তথ্য যাচাই করুন।" };
  } catch (err) {
    console.error("Track error:", err);
    return { success: false, error: "ইন্টারনেট সংযোগ পরীক্ষা করে আবার চেষ্টা করুন।" };
  }
}
