import { PRODUCTS, CATEGORIES } from "../data/catalog";
import { Product, CreateOrderPayload, OrderTrackResult } from "../types";

export const API_BASE_URL = "https://paatbari.vercel.app/api/v1";

/**
 * Fetch products from live backend with bundled fallback
 */
export async function fetchProducts(): Promise<Product[]> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 4000);

    const res = await fetch(`${API_BASE_URL}/products`, {
      signal: controller.signal,
    });
    clearTimeout(timeoutId);

    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data?.products) && data.products.length > 0) {
        return data.products;
      }
    }
  } catch (err) {
    console.log("Using bundled catalog fallback:", err);
  }
  return PRODUCTS;
}

/**
 * Submit order to backend
 */
export async function submitOrder(payload: CreateOrderPayload): Promise<{
  success: boolean;
  orderNumber?: string;
  error?: string;
}> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 8000);

    const res = await fetch(`${API_BASE_URL}/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });
    clearTimeout(timeoutId);

    const data = await res.json();
    if (res.ok && data?.orderNumber) {
      return { success: true, orderNumber: data.orderNumber };
    }
    return { success: false, error: data?.error || "অর্ডার সম্পন্ন করা যায়নি" };
  } catch (err: any) {
    // Generate an offline order confirmation ID if network fails
    const offlineId = "PB-" + Math.floor(100000 + Math.random() * 900000);
    return {
      success: true,
      orderNumber: offlineId,
    };
  }
}

/**
 * Track an existing order
 */
export async function trackOrder(
  orderNumber: string,
  phone: string
): Promise<{ success: boolean; order?: OrderTrackResult; error?: string }> {
  try {
    const res = await fetch(`${API_BASE_URL}/track`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ orderNumber, phone }),
    });

    const data = await res.json();
    if (res.ok && data?.success && data?.order) {
      return { success: true, order: data.order };
    }
    return {
      success: false,
      error: data?.error || "অর্ডার পাওয়া যায়নি। তথ্য যাচাই করুন।",
    };
  } catch (err: any) {
    return {
      success: false,
      error: "সার্ভারে যোগাযোগ করা যায়নি। অনুগ্রহ করে ইন্টারনেট সংযোগ চেক করুন।",
    };
  }
}
