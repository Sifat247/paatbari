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

// Initial mock B2B quotes for testing Admin quotes board and /quote/[token]
const initialQuotes: B2BQuote[] = [
  {
    token: "QT-2609-1001",
    createdAt: "2026-09-28T02:00:00Z",
    companyName: "ব্র্যাক এন্টারপ্রাইজ (BRAC)",
    contactName: "তানভীর আহমেদ",
    phone: "01711223344",
    email: "tanvir@brac.net",
    productId: "B01",
    productName: "কাস্টম লোগো প্রিন্ট পাটের ব্যাগ (Custom Promotional Jute Bag)",
    qty: 300,
    includeLogo: true,
    logoUrl: "/mock-logo-brac.png",
    deadline: "2026-10-15",
    deliveryAddress: "মহাখালী, ঢাকা",
    notes: "বার্ষিক সাধারণ সভার জন্য উপহার ব্যাগ। লোগো উভয় পাশে থাকবে।",
    unitPrice: 185,
    setupFee: 1500,
    totalPrice: 57000,
    depositAmount: 28500,
    status: "quoted",
    statusNote: "কোটেশন অনুমোদিত ও ক্লায়েন্টকে পাঠানো হয়েছে।",
  },
  {
    token: "QT-2609-1002",
    createdAt: "2026-09-27T18:30:00Z",
    companyName: "গ্রামীণ ডানোন ফুডস",
    contactName: "সাদিয়া জাহান",
    phone: "01819876543",
    email: "sadia@grameen.com",
    productId: "B01",
    productName: "কাস্টম লোগো প্রিন্ট পাটের ব্যাগ (Custom Promotional Jute Bag)",
    qty: 600,
    includeLogo: true,
    deadline: "2026-10-25",
    deliveryAddress: "তেজগাঁও শিল্প এলাকা, ঢাকা",
    notes: "সবুজ রঙের হ্যান্ডল সহ প্রাকৃতিক সোনালি পাটের ফেব্রিক।",
    unitPrice: 165,
    setupFee: 1500,
    totalPrice: 100500,
    depositAmount: 50250,
    status: "deposit_paid",
    statusNote: "৫০% অগ্রিম ব্যাংকে জমা হয়েছে।",
  },
  {
    token: "QT-2609-1003",
    createdAt: "2026-09-28T04:15:00Z",
    companyName: "বেক্সিমকো ফার্মা",
    contactName: "রফিকুল ইসলাম",
    phone: "01912345678",
    email: "rafiq@beximco.com",
    productId: "B02",
    productName: "কর্পোরেট গিফট সেট (Corporate Gift Set)",
    qty: 150,
    includeLogo: true,
    deadline: "2026-11-01",
    deliveryAddress: "ধানমন্ডি, ঢাকা",
    notes: "প্রিমিয়াম ডায়েরি কভার ও পেন হোল্ডার সহ এক্সক্লুসিভ গিফট বক্স।",
    unitPrice: 450,
    setupFee: 1500,
    totalPrice: 69000,
    depositAmount: 34500,
    status: "quote_requested",
    statusNote: "নতুন অনুরোধ, রিভিউ প্রয়োজন।",
  },
];

declare global {
  var __paatbari_quotes: B2BQuote[] | undefined;
}

if (!global.__paatbari_quotes) {
  global.__paatbari_quotes = [...initialQuotes];
}

export function getAllQuotes(): B2BQuote[] {
  return global.__paatbari_quotes || [];
}

export function getQuoteByToken(token: string): B2BQuote | undefined {
  return (global.__paatbari_quotes || []).find((q) => q.token.toUpperCase() === token.toUpperCase());
}

export function saveQuote(quote: B2BQuote): B2BQuote {
  if (!global.__paatbari_quotes) {
    global.__paatbari_quotes = [];
  }
  const existingIdx = global.__paatbari_quotes.findIndex((q) => q.token === quote.token);
  if (existingIdx >= 0) {
    global.__paatbari_quotes[existingIdx] = quote;
  } else {
    global.__paatbari_quotes.unshift(quote);
  }
  return quote;
}

export function updateQuoteStatus(
  token: string,
  status: B2BQuote["status"],
  note?: string,
  extra?: Partial<B2BQuote>
): B2BQuote | null {
  const quote = getQuoteByToken(token);
  if (!quote) return null;
  quote.status = status;
  if (note) quote.statusNote = note;
  if (extra) {
    Object.assign(quote, extra);
  }
  return saveQuote(quote);
}
