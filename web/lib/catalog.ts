export interface Category {
  key: string;
  en: string;
  bn: string;
  iconName?: string;
  count?: number;
}

export interface ProductVariant {
  k: string;
  en: string;
  bn: string;
  price: number;
}

export interface Product {
  id: string;
  cat: string;
  slug: string;
  en: string;
  bn: string;
  variants: ProductVariant[];
  badge?: {
    text: string;
    variant: "eco" | "sale" | "handmade" | "neutral";
  };
  isBestseller?: boolean;
  inStock?: boolean;
}

export const CATEGORIES: Category[] = [
  { key: "bags", en: "Bags", bn: "ব্যাগ", count: 4 },
  { key: "home", en: "Home Décor", bn: "হোম ডেকোর", count: 5 },
  { key: "table", en: "Kitchen & Table", bn: "কিচেন ও টেবিল", count: 3 },
  { key: "office", en: "Office & Stationery", bn: "অফিস ও স্টেশনারি", count: 1 },
  { key: "gifts", en: "Gifts", bn: "গিফট", count: 1 },
  { key: "corporate", en: "Corporate & Bulk (B2B)", bn: "কর্পোরেট ও পাইকারি", count: 6 },
];

const initialProducts: Product[] = [
  {
    id: "P01",
    cat: "bags",
    slug: "classic-jute-tote-bag",
    en: "Classic Jute Tote Bag",
    bn: "ক্লাসিক পাটের টোট ব্যাগ",
    badge: { text: "বেস্টসেলার", variant: "handmade" },
    isBestseller: true,
    inStock: true,
    variants: [
      { k: "natural", en: "Natural", bn: "ন্যাচারাল", price: 450 },
      { k: "dyed", en: "Dyed (Green/Maroon)", bn: "রঙিন", price: 450 },
    ],
  },
  {
    id: "P02",
    cat: "bags",
    slug: "jute-laptop-bag",
    en: 'Jute Laptop Bag 15.6"',
    bn: 'পাটের ল্যাপটপ ব্যাগ ১৫.৬"',
    badge: { text: "প্রিমিয়াম", variant: "neutral" },
    inStock: true,
    variants: [{ k: "std", en: "Standard", bn: "স্ট্যান্ডার্ড", price: 1450 }],
  },
  {
    id: "P03",
    cat: "bags",
    slug: "ladies-jute-handbag",
    en: "Ladies Jute Handbag",
    bn: "লেডিস পাটের হ্যান্ডব্যাগ",
    badge: { text: "নতুন ডিজাইন", variant: "handmade" },
    isBestseller: true,
    inStock: true,
    variants: [{ k: "std", en: "Standard", bn: "স্ট্যান্ডার্ড", price: 950 }],
  },
  {
    id: "P04",
    cat: "bags",
    slug: "large-jute-shopping-bag",
    en: "Large Jute Shopping Bag",
    bn: "বড় পাটের বাজারের ব্যাগ",
    badge: { text: "টেকসই", variant: "eco" },
    inStock: true,
    variants: [{ k: "std", en: "Standard", bn: "স্ট্যান্ডার্ড", price: 380 }],
  },
  {
    id: "P05",
    cat: "home",
    slug: "jute-storage-basket",
    en: "Jute Storage Basket",
    bn: "পাটের স্টোরেজ ঝুড়ি",
    badge: { text: "১৫% ছাড়", variant: "sale" },
    isBestseller: true,
    inStock: true,
    variants: [
      { k: "S", en: "Small", bn: "ছোট", price: 450 },
      { k: "M", en: "Medium", bn: "মাঝারি", price: 650 },
      { k: "L", en: "Large", bn: "বড়", price: 850 },
    ],
  },
  {
    id: "P06",
    cat: "home",
    slug: "jute-floor-rug",
    en: "Jute Floor Rug",
    bn: "পাটের ফ্লোর ম্যাট/রাগ",
    badge: { text: "১০০% প্রাকৃতিক", variant: "eco" },
    isBestseller: true,
    inStock: true,
    variants: [
      { k: "2x3", en: "2×3 ft", bn: "২×৩ ফুট", price: 1200 },
      { k: "3x5", en: "3×5 ft", bn: "৩×৫ ফুট", price: 2400 },
    ],
  },
  {
    id: "P07",
    cat: "home",
    slug: "jute-cushion-cover",
    en: "Jute Cushion Cover 16×16",
    bn: "পাটের কুশন কভার ১৬×১৬",
    inStock: true,
    variants: [{ k: "std", en: "Standard", bn: "স্ট্যান্ডার্ড", price: 350 }],
  },
  {
    id: "P08",
    cat: "table",
    slug: "jute-table-runner",
    en: "Jute Table Runner",
    bn: "পাটের টেবিল রানার",
    inStock: true,
    variants: [{ k: "std", en: "Standard", bn: "স্ট্যান্ডার্ড", price: 550 }],
  },
  {
    id: "P09",
    cat: "table",
    slug: "jute-placemat-set",
    en: "Jute Placemat (set of 6)",
    bn: "পাটের প্লেসম্যাট (৬টি)",
    inStock: true,
    variants: [{ k: "std", en: "Set of 6", bn: "৬টির সেট", price: 900 }],
  },
  {
    id: "P10",
    cat: "table",
    slug: "jute-coaster-set",
    en: "Jute Coaster (set of 6)",
    bn: "পাটের কোস্টার (৬টি)",
    inStock: true,
    variants: [{ k: "std", en: "Set of 6", bn: "৬টির সেট", price: 250 }],
  },
  {
    id: "P11",
    cat: "home",
    slug: "jute-wall-hanging",
    en: "Jute Wall Hanging",
    bn: "পাটের ওয়াল হ্যাঙ্গিং",
    inStock: true,
    variants: [{ k: "std", en: "Standard", bn: "স্ট্যান্ডার্ড", price: 750 }],
  },
  {
    id: "P12",
    cat: "home",
    slug: "jute-plant-hanger",
    en: "Jute Plant Hanger",
    bn: "পাটের শিকা (প্ল্যান্ট হ্যাঙ্গার)",
    badge: { text: "ঐতিহ্যবাহী", variant: "handmade" },
    inStock: true,
    variants: [{ k: "std", en: "Standard", bn: "স্ট্যান্ডার্ড", price: 400 }],
  },
];

declare global {
  var __paatbari_products: Product[] | undefined;
}

if (!globalThis.__paatbari_products) {
  globalThis.__paatbari_products = JSON.parse(JSON.stringify(initialProducts));
}

export const PRODUCTS: Product[] = globalThis.__paatbari_products || initialProducts;

export const catalogStore = {
  getAll: (): Product[] => globalThis.__paatbari_products || initialProducts,
  getBySlug: (slug: string): Product | undefined =>
    (globalThis.__paatbari_products || initialProducts).find((p) => p.slug === slug),
  getById: (id: string): Product | undefined =>
    (globalThis.__paatbari_products || initialProducts).find((p) => p.id === id),
  updateVariantPrice: (productId: string, variantKey: string, newPrice: number): boolean => {
    const prods = globalThis.__paatbari_products || initialProducts;
    const p = prods.find((prod) => prod.id === productId);
    if (!p) return false;
    const v = p.variants.find((v) => v.k === variantKey);
    if (!v) return false;
    v.price = newPrice;
    return true;
  },
  toggleStock: (productId: string): boolean => {
    const prods = globalThis.__paatbari_products || initialProducts;
    const p = prods.find((prod) => prod.id === productId);
    if (!p) return false;
    p.inStock = p.inStock === false ? true : false;
    return true;
  },
  reset: () => {
    globalThis.__paatbari_products = JSON.parse(JSON.stringify(initialProducts));
  },
};

export const BUNDLE_PROMO = {
  id: "BN1",
  en: "Eco Home Starter Bundle",
  bn: "ইকো হোম স্টার্টার বান্ডেল",
  itemsText: "২টি কুশন কভার + ১টি টেবিল রানার + ১ সেট কোস্টার (৬টি)",
  originalPrice: 1500,
  discountPct: 10,
  bundlePrice: 1350,
};
