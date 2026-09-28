/**
 * Unified Analytics Dispatcher for Paatbari
 * Supports:
 * - Google Analytics 4 (GA4 via gtag)
 * - Meta Pixel (fbq)
 * - Server Conversions API (CAPI stub / webhook)
 *
 * Supported standard events:
 * view_item, add_to_cart, begin_checkout, add_payment_info, purchase, generate_lead, search, sign_up
 */

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    fbq?: (...args: any[]) => void;
  }
}

export interface AnalyticsItem {
  id: string;
  name: string;
  category?: string;
  variant?: string;
  price: number;
  quantity?: number;
}

export const analytics = {
  // 1. view_item
  viewItem: (item: AnalyticsItem) => {
    if (typeof window === "undefined") return;

    // GA4
    window.gtag?.("event", "view_item", {
      currency: "BDT",
      value: item.price,
      items: [
        {
          item_id: item.id,
          item_name: item.name,
          item_category: item.category,
          price: item.price,
          quantity: 1,
        },
      ],
    });

    // Meta Pixel
    window.fbq?.("track", "ViewContent", {
      content_ids: [item.id],
      content_name: item.name,
      content_type: "product",
      value: item.price,
      currency: "BDT",
    });
  },

  // 2. add_to_cart
  addToCart: (item: AnalyticsItem) => {
    if (typeof window === "undefined") return;

    window.gtag?.("event", "add_to_cart", {
      currency: "BDT",
      value: item.price * (item.quantity || 1),
      items: [
        {
          item_id: item.id,
          item_name: item.name,
          item_category: item.category,
          price: item.price,
          quantity: item.quantity || 1,
        },
      ],
    });

    window.fbq?.("track", "AddToCart", {
      content_ids: [item.id],
      content_name: item.name,
      content_type: "product",
      value: item.price * (item.quantity || 1),
      currency: "BDT",
    });
  },

  // 3. begin_checkout
  beginCheckout: (items: AnalyticsItem[], totalAmount: number) => {
    if (typeof window === "undefined") return;

    window.gtag?.("event", "begin_checkout", {
      currency: "BDT",
      value: totalAmount,
      items: items.map((i) => ({
        item_id: i.id,
        item_name: i.name,
        price: i.price,
        quantity: i.quantity || 1,
      })),
    });

    window.fbq?.("track", "InitiateCheckout", {
      content_ids: items.map((i) => i.id),
      num_items: items.reduce((acc, curr) => acc + (curr.quantity || 1), 0),
      value: totalAmount,
      currency: "BDT",
    });
  },

  // 4. add_payment_info
  addPaymentInfo: (paymentType: string, totalAmount: number) => {
    if (typeof window === "undefined") return;

    window.gtag?.("event", "add_payment_info", {
      currency: "BDT",
      value: totalAmount,
      payment_type: paymentType,
    });

    window.fbq?.("track", "AddPaymentInfo", {
      value: totalAmount,
      currency: "BDT",
    });
  },

  // 5. purchase
  purchase: (orderNumber: string, items: AnalyticsItem[], totalAmount: number) => {
    if (typeof window === "undefined") return;

    window.gtag?.("event", "purchase", {
      transaction_id: orderNumber,
      currency: "BDT",
      value: totalAmount,
      items: items.map((i) => ({
        item_id: i.id,
        item_name: i.name,
        price: i.price,
        quantity: i.quantity || 1,
      })),
    });

    window.fbq?.("track", "Purchase", {
      content_ids: items.map((i) => i.id),
      value: totalAmount,
      currency: "BDT",
    });
  },

  // 6. generate_lead (for B2B Quotes)
  generateLead: (quoteToken: string, companyName: string, estimatedValue: number) => {
    if (typeof window === "undefined") return;

    window.gtag?.("event", "generate_lead", {
      currency: "BDT",
      value: estimatedValue,
      transaction_id: quoteToken,
    });

    window.fbq?.("track", "Lead", {
      content_name: companyName,
      value: estimatedValue,
      currency: "BDT",
    });
  },

  // 7. search
  search: (query: string) => {
    if (typeof window === "undefined") return;

    window.gtag?.("event", "search", {
      search_term: query,
    });

    window.fbq?.("track", "Search", {
      search_string: query,
    });
  },

  // 8. sign_up
  signUp: (method: string = "phone_otp") => {
    if (typeof window === "undefined") return;

    window.gtag?.("event", "sign_up", {
      method: method,
    });

    window.fbq?.("track", "CompleteRegistration", {
      status: "success",
    });
  },
};
