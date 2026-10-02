export interface ProductVariant {
  k: string;
  en: string;
  bn: string;
  price: number;
}

export interface ProductBadge {
  text: string;
  textEn: string;
  variant: "eco" | "sale" | "handmade" | "neutral";
}

export interface Product {
  id: string;
  cat: "bags" | "home" | "table" | "office" | "gifts" | "footwear" | "jewelry";
  slug: string;
  en: string;
  bn: string;
  taglineEn: string;
  taglineBn: string;
  descriptionEn: string;
  descriptionBn: string;
  storyEn: string;
  storyBn: string;
  featuresEn: string[];
  featuresBn: string[];
  dimensionsEn: string;
  dimensionsBn: string;
  materialEn: string;
  materialBn: string;
  careEn: string[];
  careBn: string[];
  primaryImage: string;
  images: string[];
  variants: ProductVariant[];
  badge?: ProductBadge;
  isBestseller?: boolean;
  isFeatured?: boolean;
  inStock?: boolean;
  rating?: number;
  reviewsCount?: number;
}

export interface Category {
  key: string;
  en: string;
  bn: string;
  iconName?: string;
  count?: number;
}

export interface CartItem {
  key?: string;
  product: Product;
  variant: ProductVariant;
  quantity: number;
}

export type DeliveryZoneKey = "dhaka_city" | "outside";

export interface DeliveryZone {
  key: DeliveryZoneKey;
  labelBn: string;
  labelEn: string;
  fee: number;
  etaBn: string;
  etaEn: string;
}

export type PaymentMethod = "cod" | "bkash";

export interface OrderItem {
  variantId: string;
  productId: string;
  name: string;
  qty: number;
  price: number;
}

export interface CreateOrderPayload {
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  district: string;
  address: string;
  note?: string;
  deliveryZone: DeliveryZoneKey;
  paymentMethod: PaymentMethod;
  items: { variantId: string; qty: number }[];
}

export interface OrderTrackResult {
  orderNumber: string;
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
  statusBn: string;
  createdAt: string;
  total: number;
  customerName: string;
  customerPhone: string;
  address: string;
  items: OrderItem[];
}
