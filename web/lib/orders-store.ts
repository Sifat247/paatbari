export interface StoredOrder {
  id: string;
  orderNumber: string;
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  division: string;
  district: string;
  area: string;
  addressLine: string;
  zone: string;
  subtotal: number;
  discount: number;
  deliveryFee: number;
  total: number;
  status: "pending" | "confirmed" | "packed" | "shipped" | "delivered" | "cancelled";
  paymentMethod: "cod" | "sslcommerz" | "bank_transfer";
  paymentStatus: "pending" | "paid";
  items: {
    variantId: string;
    productName: string;
    variantName: string;
    unitPrice: number;
    qty: number;
    totalPrice: number;
  }[];
  createdAt: string;
  notes?: string;
  events: {
    time: string;
    title: string;
    desc: string;
  }[];
}

// Global orders cache for demo/local execution
declare global {
  var __paatbari_orders: StoredOrder[] | undefined;
}

if (!globalThis.__paatbari_orders) {
  globalThis.__paatbari_orders = [
    {
      id: "ord-demo-01",
      orderNumber: "PB-2609-1001",
      customerName: "আব্দুল করিম",
      customerPhone: "01712345678",
      division: "Dhaka",
      district: "Dhaka",
      area: "মিরপুর-১০",
      addressLine: "বাড়ি #১২, রোড #৪",
      zone: "dhaka_city",
      subtotal: 450,
      discount: 0,
      deliveryFee: 70,
      total: 520,
      status: "confirmed",
      paymentMethod: "cod",
      paymentStatus: "pending",
      items: [
        {
          variantId: "P01-natural",
          productName: "ক্লাসিক পাটের টোট ব্যাগ",
          variantName: "ন্যাচারাল",
          unitPrice: 450,
          qty: 1,
          totalPrice: 450,
        },
      ],
      createdAt: new Date().toISOString(),
      events: [
        {
          time: "সকাল ১০:৩০",
          title: "অর্ডার অপেক্ষমাণ (Pending)",
          desc: "অর্ডারটি সফলভাবে গৃহীত হয়েছে।",
        },
        {
          time: "বেলা ১১:০০",
          title: "অর্ডার নিশ্চিত (Confirmed)",
          desc: "ফোন কলের মাধ্যমে অর্ডার কনফার্ম করা হয়েছে।",
        },
      ],
    },
  ];
}

export const ordersStore = {
  getAll: () => globalThis.__paatbari_orders || [],
  getByNumber: (orderNumber: string) =>
    (globalThis.__paatbari_orders || []).find(
      (o) => o.orderNumber.toUpperCase() === orderNumber.toUpperCase()
    ),
  getByNumberAndPhone: (orderNumber: string, phone: string) => {
    const cleanPhone = phone.replace(/[\s-]/g, "");
    return (globalThis.__paatbari_orders || []).find(
      (o) =>
        o.orderNumber.toUpperCase() === orderNumber.toUpperCase() &&
        o.customerPhone.replace(/[\s-]/g, "").endsWith(cleanPhone.slice(-8))
    );
  },
  save: (order: StoredOrder) => {
    if (!globalThis.__paatbari_orders) globalThis.__paatbari_orders = [];
    globalThis.__paatbari_orders.unshift(order);
    return order;
  },
};
