import { db } from "@/lib/supabase-server";

export interface B2BQuote {
  token: string;
  createdAt: string;
  companyName: string;
  contactName: string;
  phone: string;
  email: string;
  productId: "B01" | "B02" | "B03" | "B04";
  productName: string;
  qty: number;
  includeLogo: boolean;
  logoUrl?: string;
  deadline?: string;
  deliveryAddress?: string;
  notes?: string;
  unitPrice: number;
  setupFee: number;
  totalPrice: number;
  depositAmount: number;
  status:
    | "quote_requested"
    | "quoted"
    | "deposit_paid"
    | "in_production"
    | "ready"
    | "balance_paid"
    | "dispatched"
    | "completed"
    | "cancelled";
  statusNote?: string;
  bankReceiptUrl?: string;
}

// ------------------------------------------------------------
// B2B quotes are stored in Supabase (table: public.b2b_quotes).
// ------------------------------------------------------------
type QuoteRow = {
  token: string;
  created_at: string;
  company_name: string;
  contact_name: string;
  phone: string;
  email: string | null;
  product_id: B2BQuote["productId"];
  product_name: string;
  qty: number;
  include_logo: boolean;
  logo_url: string | null;
  deadline: string | null;
  delivery_address: string | null;
  notes: string | null;
  unit_price: number;
  setup_fee: number;
  total_price: number;
  deposit_amount: number;
  status: B2BQuote["status"];
  status_note: string | null;
  bank_receipt_url: string | null;
};

function fromRow(r: QuoteRow): B2BQuote {
  return {
    token: r.token,
    createdAt: r.created_at,
    companyName: r.company_name,
    contactName: r.contact_name,
    phone: r.phone,
    email: r.email || "",
    productId: r.product_id,
    productName: r.product_name,
    qty: r.qty,
    includeLogo: r.include_logo,
    logoUrl: r.logo_url || undefined,
    deadline: r.deadline || undefined,
    deliveryAddress: r.delivery_address || undefined,
    notes: r.notes || undefined,
    unitPrice: r.unit_price,
    setupFee: r.setup_fee,
    totalPrice: r.total_price,
    depositAmount: r.deposit_amount,
    status: r.status,
    statusNote: r.status_note || undefined,
    bankReceiptUrl: r.bank_receipt_url || undefined,
  };
}

function toRow(q: B2BQuote) {
  return {
    token: q.token,
    company_name: q.companyName,
    contact_name: q.contactName,
    phone: q.phone,
    email: q.email || null,
    product_id: q.productId,
    product_name: q.productName,
    qty: q.qty,
    include_logo: q.includeLogo,
    logo_url: q.logoUrl || null,
    deadline: q.deadline || null,
    delivery_address: q.deliveryAddress || null,
    notes: q.notes || null,
    unit_price: q.unitPrice,
    setup_fee: q.setupFee,
    total_price: q.totalPrice,
    deposit_amount: q.depositAmount,
    status: q.status,
    status_note: q.statusNote || null,
    bank_receipt_url: q.bankReceiptUrl || null,
  };
}

export async function getAllQuotes(): Promise<B2BQuote[]> {
  const { data, error } = await db()
    .from("b2b_quotes")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(500);
  if (error) throw new Error(error.message);
  return (data as QuoteRow[]).map(fromRow);
}

export async function getQuotesByPhone(phone: string): Promise<B2BQuote[]> {
  const clean = (phone || "").replace(/[^0-9]/g, "");
  if (clean.length < 10) return [];
  const { data, error } = await db()
    .from("b2b_quotes")
    .select("*")
    .like("phone", `%${clean.slice(-10)}`)
    .order("created_at", { ascending: false })
    .limit(50);
  if (error) throw new Error(error.message);
  return (data as QuoteRow[]).map(fromRow);
}

export async function getQuoteByToken(token: string): Promise<B2BQuote | undefined> {
  const { data, error } = await db()
    .from("b2b_quotes")
    .select("*")
    .eq("token", token.trim().toUpperCase())
    .maybeSingle();
  if (error) throw new Error(error.message);
  return data ? fromRow(data as QuoteRow) : undefined;
}

export async function saveQuote(quote: B2BQuote): Promise<B2BQuote> {
  const { data, error } = await db().from("b2b_quotes").upsert(toRow(quote)).select("*").single();
  if (error) throw new Error(error.message);
  return fromRow(data as QuoteRow);
}

export async function updateQuoteStatus(
  token: string,
  status: B2BQuote["status"] | undefined,
  note?: string,
  extra?: Partial<B2BQuote>
): Promise<B2BQuote | null> {
  const quote = await getQuoteByToken(token);
  if (!quote) return null;
  if (status) quote.status = status;
  if (note) quote.statusNote = note;
  if (extra) Object.assign(quote, extra);
  return saveQuote(quote);
}

export async function deleteQuote(token: string): Promise<boolean> {
  const { error } = await db()
    .from("b2b_quotes")
    .delete()
    .eq("token", token.trim().toUpperCase());
  if (error) throw new Error(error.message);
  return true;
}
