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
  status: "pending" | "confirmed" | "packing" | "shipped" | "delivered" | "cancelled" | "returned";
  paymentMethod: "cod" | "sslcommerz" | "bank_transfer";
  paymentStatus: "pending" | "paid";
  courierName?: string;
  trackingId?: string;
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

// Initial mock orders covering various statuses for Admin Dashboard and Packing Queue
const initialOrders: StoredOrder[] = [
  {
    id: "ord-demo-01",
    orderNumber: "PB-2609-1001",
    customerName: "আব্দুল করিম",
    customerPhone: "01712345678",
    customerEmail: "karim@gmail.com",
    division: "Dhaka",
    district: "Dhaka",
    area: "মিরপুর-১০",
    addressLine: "বাড়ি #১২, রোড #৪, মিরপুর",
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
    createdAt: "2026-09-28T03:30:00Z",
    events: [
      {
        time: "সকাল ১০:৩০",
        title: "অর্ডার অপেক্ষমাণ (Pending)",
        desc: "অর্ডারটি সফলভাবে গৃহীত হয়েছে।",
      },
      {
        time: "বেলা ১১:০০",
        title: "অর্ডার নিশ্চিত (Confirmed)",
        desc: "ফোন কলের মাধ্যমে কাস্টমার কনফার্ম করেছেন।",
      },
    ],
  },
  {
    id: "ord-demo-02",
    orderNumber: "PB-2609-1002",
    customerName: "নুসরাত জাহান",
    customerPhone: "01811223344",
    customerEmail: "nusrat@yahoo.com",
    division: "Chittagong",
    district: "Chittagong",
    area: "জিইসি মোড়",
    addressLine: "হোল্ডিং #৮৫, ও আর নিজাম রোড",
    zone: "outside",
    subtotal: 1550,
    discount: 155,
    deliveryFee: 130,
    total: 1525,
    status: "pending",
    paymentMethod: "cod",
    paymentStatus: "pending",
    items: [
      {
        variantId: "P01-natural",
        productName: "ক্লাসিক পাটের টোট ব্যাগ",
        variantName: "ন্যাচারাল",
        unitPrice: 450,
        qty: 2,
        totalPrice: 900,
      },
      {
        variantId: "P05-M",
        productName: "পাটের স্টোরেজ ঝুড়ি",
        variantName: "মাঝারি (M)",
        unitPrice: 650,
        qty: 1,
        totalPrice: 650,
      },
    ],
    createdAt: "2026-09-28T04:15:00Z",
    events: [
      {
        time: "সকাল ০৯:১৫",
        title: "অর্ডার অপেক্ষমাণ (Pending)",
        desc: "ফোন কল করে কনফার্মেশনের অপেক্ষা করা হচ্ছে।",
      },
    ],
  },
  {
    id: "ord-demo-03",
    orderNumber: "PB-2609-1003",
    customerName: "ফারহান কবির",
    customerPhone: "01999887766",
    customerEmail: "farhan@outlook.com",
    division: "Dhaka",
    district: "Gazipur",
    area: "জয়দেবপুর",
    addressLine: "বাসা #৪৫, চান্দনা চৌরাস্তা",
    zone: "dhaka_sub",
    subtotal: 2550,
    discount: 0,
    deliveryFee: 0,
    total: 2550,
    status: "packing",
    paymentMethod: "cod",
    paymentStatus: "pending",
    items: [
      {
        variantId: "P01-dyed",
        productName: "ক্লাসিক পাটের টোট ব্যাগ",
        variantName: "রঙিন",
        unitPrice: 450,
        qty: 3,
        totalPrice: 1350,
      },
      {
        variantId: "P06-2x3",
        productName: "পাটের ফ্লোর ম্যাট/রাগ",
        variantName: "২×৩ ফুট",
        unitPrice: 1200,
        qty: 1,
        totalPrice: 1200,
      },
    ],
    createdAt: "2026-09-27T16:00:00Z",
    events: [
      {
        time: "গতকাল বিকেল ০৪:০০",
        title: "অর্ডার কনফার্মড",
        desc: "ফোন ভেরিফিকেশন সম্পন্ন।",
      },
      {
        time: "আজ সকাল ০৯:৩০",
        title: "প্যাকিং চলছে",
        desc: "প্যাকার প্রোডাক্ট সংগ্রহ করে বক্সে ভরছে।",
      },
    ],
  },
  {
    id: "ord-demo-04",
    orderNumber: "PB-2609-1004",
    customerName: "মেহজাবীন চৌধুরী",
    customerPhone: "01622334455",
    division: "Dhaka",
    district: "Dhaka",
    area: "বনানী",
    addressLine: "রোড #১১, ব্লক #ডি",
    zone: "dhaka_city",
    subtotal: 1450,
    discount: 0,
    deliveryFee: 70,
    total: 1520,
    status: "shipped",
    paymentMethod: "sslcommerz",
    paymentStatus: "paid",
    courierName: "Steadfast Courier",
    trackingId: "SF-8849102",
    items: [
      {
        variantId: "P02-std",
        productName: 'পাটের ল্যাপটপ ব্যাগ ১৫.৬"',
        variantName: "স্ট্যান্ডার্ড",
        unitPrice: 1450,
        qty: 1,
        totalPrice: 1450,
      },
    ],
    createdAt: "2026-09-27T10:00:00Z",
    events: [
      {
        time: "গতকাল সকাল ১০:০০",
        title: "পেমেন্ট সম্পন্ন ও কনফার্মড",
        desc: "বিকাশের মাধ্যমে অনলাইন পেমেন্ট গৃহীত হয়েছে।",
      },
      {
        time: "গতকাল দুপুর ০১:০০",
        title: "প্যাকিং সম্পন্ন",
        desc: "প্যাকেজিং শেষ হয়েছে।",
      },
      {
        time: "আজ সকাল ১০:০০",
        title: "কুরিয়ারে হস্তান্তর",
        desc: "Steadfast Courier ট্র্যাকিং ID: SF-8849102",
      },
    ],
  },
];

declare global {
  var __paatbari_orders: StoredOrder[] | undefined;
}

if (!globalThis.__paatbari_orders) {
  globalThis.__paatbari_orders = [...initialOrders];
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
  updateStatus: (
    orderNumber: string,
    status: StoredOrder["status"],
    title: string,
    desc: string,
    courierName?: string,
    trackingId?: string
  ): StoredOrder | null => {
    const order = (globalThis.__paatbari_orders || []).find(
      (o) => o.orderNumber.toUpperCase() === orderNumber.toUpperCase()
    );
    if (!order) return null;
    order.status = status;
    if (courierName) order.courierName = courierName;
    if (trackingId) order.trackingId = trackingId;
    order.events.push({
      time: new Date().toLocaleTimeString("bn-BD", { hour: "2-digit", minute: "2-digit" }),
      title,
      desc,
    });
    return order;
  },
};
