import { db } from "@/lib/supabase-server";

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

// ------------------------------------------------------------
// Orders are stored in Supabase (table: public.orders).
// Server-side only — uses the service_role key via lib/supabase-server.
// ------------------------------------------------------------

type OrderRow = {
  id: string;
  order_number: string;
  customer_name: string;
  customer_phone: string;
  customer_email: string | null;
  division: string | null;
  district: string;
  area: string | null;
  address_line: string;
  zone: string | null;
  subtotal: number;
  discount: number | null;
  delivery_fee: number;
  total: number;
  status: StoredOrder["status"];
  payment_method: StoredOrder["paymentMethod"];
  payment_status: string;
  courier_name: string | null;
  tracking_id: string | null;
  items: StoredOrder["items"] | null;
  events: StoredOrder["events"] | null;
  note: string | null;
  created_at: string;
};

function fromRow(r: OrderRow): StoredOrder {
  return {
    id: r.id,
    orderNumber: r.order_number,
    customerName: r.customer_name,
    customerPhone: r.customer_phone,
    customerEmail: r.customer_email || undefined,
    division: r.division || "",
    district: r.district,
    area: r.area || "",
    addressLine: r.address_line,
    zone: r.zone || "dhaka_city",
    subtotal: r.subtotal,
    discount: r.discount || 0,
    deliveryFee: r.delivery_fee,
    total: r.total,
    status: r.status,
    paymentMethod: r.payment_method,
    paymentStatus: r.payment_status === "paid" ? "paid" : "pending",
    courierName: r.courier_name || undefined,
    trackingId: r.tracking_id || undefined,
    items: Array.isArray(r.items) ? r.items : [],
    createdAt: r.created_at,
    notes: r.note || undefined,
    events: Array.isArray(r.events) ? r.events : [],
  };
}

function toRow(o: StoredOrder, source = "web") {
  return {
    order_number: o.orderNumber,
    customer_name: o.customerName,
    customer_phone: o.customerPhone,
    customer_email: o.customerEmail || null,
    division: o.division || null,
    district: o.district,
    area: o.area || null,
    address_line: o.addressLine,
    zone: o.zone,
    subtotal: o.subtotal,
    discount: o.discount,
    delivery_fee: o.deliveryFee,
    total: o.total,
    status: o.status,
    payment_method: o.paymentMethod,
    payment_status: o.paymentStatus,
    courier_name: o.courierName || null,
    tracking_id: o.trackingId || null,
    items: o.items,
    events: o.events,
    note: o.notes || null,
    source,
  };
}

const normPhone = (p: string) => (p || "").replace(/[^0-9]/g, "").slice(-10);

export function newEvent(title: string, desc: string) {
  return {
    time: new Date().toLocaleString("bn-BD", {
      timeZone: "Asia/Dhaka",
      day: "numeric",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
    }),
    title,
    desc,
  };
}

export const ordersStore = {
  getAll: async (status?: string | null): Promise<StoredOrder[]> => {
    let q = db().from("orders").select("*").order("created_at", { ascending: false }).limit(500);
    if (status && status !== "all") q = q.eq("status", status);
    const { data, error } = await q;
    if (error) throw new Error(error.message);
    return (data as OrderRow[]).map(fromRow);
  },

  getByNumber: async (orderNumber: string): Promise<StoredOrder | undefined> => {
    const { data, error } = await db()
      .from("orders")
      .select("*")
      .eq("order_number", orderNumber.trim().toUpperCase())
      .maybeSingle();
    if (error) throw new Error(error.message);
    return data ? fromRow(data as OrderRow) : undefined;
  },

  getByNumberAndPhone: async (orderNumber: string, phone: string): Promise<StoredOrder | undefined> => {
    const order = await ordersStore.getByNumber(orderNumber);
    if (!order) return undefined;
    const a = normPhone(order.customerPhone);
    const b = normPhone(phone);
    if (b.length < 10 || a !== b) return undefined;
    return order;
  },

  getByPhone: async (phone: string): Promise<StoredOrder[]> => {
    const clean = (phone || "").replace(/[^0-9]/g, "");
    if (clean.length < 10) return [];
    const { data, error } = await db()
      .from("orders")
      .select("*")
      .like("customer_phone", `%${clean.slice(-10)}`)
      .order("created_at", { ascending: false })
      .limit(50);
    if (error) throw new Error(error.message);
    return (data as OrderRow[]).map(fromRow);
  },

  save: async (order: StoredOrder, source = "web"): Promise<StoredOrder> => {
    const { data, error } = await db().from("orders").insert(toRow(order, source)).select("*").single();
    if (error) throw new Error(error.message);
    return fromRow(data as OrderRow);
  },

  updateStatus: async (
    orderNumber: string,
    status: StoredOrder["status"],
    title: string,
    desc: string,
    courierName?: string,
    trackingId?: string,
    extra?: { paymentStatus?: "paid" | "pending"; tranId?: string }
  ): Promise<StoredOrder | null> => {
    const order = await ordersStore.getByNumber(orderNumber);
    if (!order) return null;
    const patch: Record<string, unknown> = {
      status,
      events: [...order.events, newEvent(title, desc)],
    };
    if (courierName) patch.courier_name = courierName;
    if (trackingId) patch.tracking_id = trackingId;
    if (extra?.paymentStatus) patch.payment_status = extra.paymentStatus;
    if (extra?.tranId) patch.tran_id = extra.tranId;
    const { data, error } = await db()
      .from("orders")
      .update(patch)
      .eq("order_number", order.orderNumber)
      .select("*")
      .single();
    if (error) throw new Error(error.message);
    return fromRow(data as OrderRow);
  },

  delete: async (orderNumber: string): Promise<boolean> => {
    const { error } = await db()
      .from("orders")
      .delete()
      .eq("order_number", orderNumber.trim().toUpperCase());
    if (error) throw new Error(error.message);
    return true;
  },
};
