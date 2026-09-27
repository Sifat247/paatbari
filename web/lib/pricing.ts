// PaatKotha pricing engine — the ONLY place totals are calculated. Server-side use only.
// All numbers come from the database/settings; nothing is hard-coded here.

export type Zone = { key: string; fee: number };
export type Variant = { id: string; price: number };
export type Bundle = { id: string; discountPct: number; items: { variantId: string; qty: number }[] };
export type Coupon = { code: string; type: "percent"; value: number; active: boolean };
export type Settings = { zones: Zone[]; freeThreshold: number };

export type CartInput = {
  lines: { variantId: string; qty: number }[];
  bundles?: { bundleId: string; qty: number }[];
  coupon?: string | null;
  zone: string;
};

export type Quote = { subtotal: number; discount: number; delivery: number; total: number; calc: string[] };

export function quoteB2C(input: CartInput, db: { variants: Variant[]; bundles: Bundle[]; coupons: Coupon[]; settings: Settings }): Quote {
  const price = (id: string) => {
    const v = db.variants.find(x => x.id === id);
    if (!v) throw new Error("UNKNOWN_VARIANT:" + id);
    return v.price;
  };
  let subtotal = 0;
  const calc: string[] = [];
  for (const l of input.lines) {
    if (!Number.isInteger(l.qty) || l.qty < 1 || l.qty > 20) throw new Error("BAD_QTY");
    const p = price(l.variantId);
    subtotal += p * l.qty;
    calc.push(`${l.qty} × ৳${p} = ৳${p * l.qty}`);
  }
  for (const b of input.bundles ?? []) {
    const bundle = db.bundles.find(x => x.id === b.bundleId);
    if (!bundle) throw new Error("UNKNOWN_BUNDLE:" + b.bundleId);
    const full = bundle.items.reduce((s, i) => s + price(i.variantId) * i.qty, 0);
    const unit = Math.round(full * (1 - bundle.discountPct / 100));
    subtotal += unit * b.qty;
    calc.push(`${b.qty} × ৳${unit} = ৳${unit * b.qty}`);
  }
  let discount = 0;
  if (input.coupon) {
    const c = db.coupons.find(x => x.code === input.coupon && x.active);
    if (c && c.type === "percent") discount = Math.round((subtotal * c.value) / 100);
  }
  const after = subtotal - discount;
  const zone = db.settings.zones.find(z => z.key === input.zone);
  if (!zone) throw new Error("UNKNOWN_ZONE");
  const delivery = after >= db.settings.freeThreshold ? 0 : zone.fee;
  return { subtotal, discount, delivery, total: after + delivery, calc };
}

export type B2BConfig = { moq: number; tiers: { min: number; max: number | null; unit: number }[]; logoFee: number; setupFee: number; depositPct: number };

export function quoteB2B(qty: number, logo: boolean, cfg: B2BConfig) {
  if (!Number.isInteger(qty) || qty < cfg.moq) throw new Error("BELOW_MOQ");
  const tier = cfg.tiers.find(t => qty >= t.min && (t.max === null || qty <= t.max));
  if (!tier) throw new Error("NO_TIER");
  const unit = tier.unit + (logo ? cfg.logoFee : 0);
  const total = unit * qty + (logo ? cfg.setupFee : 0);
  const deposit = Math.round((total * cfg.depositPct) / 100);
  const next = cfg.tiers.find(t => t.min > qty);
  const nudge = next && next.min - qty <= 10 ? { addQty: next.min - qty, unit: next.unit + (logo ? cfg.logoFee : 0) } : null;
  return { unit, total, deposit, nudge };
}
