import React, { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CartItem, Product, ProductVariant, DeliveryZoneKey } from "../types";

const CART_KEY = "@paatbari_cart";
const FREE_DELIVERY_THRESHOLD = 2500;

interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product, variant?: ProductVariant, quantity?: number) => void;
  removeFromCart: (variantKey: string) => void;
  updateQuantity: (variantKey: string, quantity: number) => void;
  clearCart: () => void;
  totalCount: number;
  subtotal: number;
  deliveryZone: DeliveryZoneKey;
  setDeliveryZone: (zone: DeliveryZoneKey) => void;
  deliveryCharge: number;
  isFreeDelivery: number;
  grandTotal: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [deliveryZone, setDeliveryZone] = useState<DeliveryZoneKey>("dhaka_city");
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from AsyncStorage
  useEffect(() => {
    AsyncStorage.getItem(CART_KEY)
      .then((data) => {
        if (data) {
          try {
            setItems(JSON.parse(data));
          } catch (e) {}
        }
      })
      .finally(() => setIsLoaded(true));
  }, []);

  // Save to AsyncStorage
  useEffect(() => {
    if (isLoaded) {
      AsyncStorage.setItem(CART_KEY, JSON.stringify(items)).catch(() => {});
    }
  }, [items, isLoaded]);

  const addToCart = (product: Product, variant?: ProductVariant, quantity = 1) => {
    const selectedVariant = variant || product.variants[0];
    const key = `${product.id}-${selectedVariant.k}`;

    setItems((prev) => {
      const existingIdx = prev.findIndex(
        (item) => (item.key || `${item.product.id}-${item.variant.k}`) === key
      );
      if (existingIdx > -1) {
        const next = [...prev];
        next[existingIdx] = {
          ...next[existingIdx],
          key,
          quantity: next[existingIdx].quantity + quantity,
        };
        return next;
      }
      return [...prev, { key, product, variant: selectedVariant, quantity }];
    });
  };

  const removeFromCart = (itemKey: string) => {
    setItems((prev) =>
      prev.filter(
        (item) => (item.key || `${item.product.id}-${item.variant.k}`) !== itemKey
      )
    );
  };

  const updateQuantity = (itemKey: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(itemKey);
      return;
    }
    setItems((prev) =>
      prev.map((item) =>
        (item.key || `${item.product.id}-${item.variant.k}`) === itemKey
          ? { ...item, quantity }
          : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const totalCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce(
    (sum, item) => sum + item.variant.price * item.quantity,
    0
  );

  const isFree = subtotal >= FREE_DELIVERY_THRESHOLD;
  const baseDeliveryFee = deliveryZone === "dhaka_city" ? 70 : 130;
  const deliveryCharge = isFree ? 0 : baseDeliveryFee;
  const grandTotal = subtotal + deliveryCharge;

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalCount,
        subtotal,
        deliveryZone,
        setDeliveryZone,
        deliveryCharge,
        isFreeDelivery: isFree ? 1 : 0,
        grandTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
