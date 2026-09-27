"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Product, ProductVariant } from "./catalog";
import { quoteB2C, Settings } from "./pricing";

export interface CartItem {
  product: Product;
  variant: ProductVariant;
  qty: number;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product, variant: ProductVariant, qty?: number) => void;
  updateQty: (productId: string, variantKey: string, qty: number) => void;
  removeFromCart: (productId: string, variantKey: string) => void;
  clearCart: () => void;
  cartCount: number;
  subtotal: number;
  calculationLines: string[];
  isMiniCartOpen: boolean;
  setIsMiniCartOpen: (open: boolean) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const defaultSettings: Settings = {
  zones: [
    { key: "dhaka_city", fee: 70 },
    { key: "dhaka_sub", fee: 100 },
    { key: "outside", fee: 130 },
  ],
  freeThreshold: 2500,
};

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isMiniCartOpen, setIsMiniCartOpen] = useState(false);

  // Load from localStorage if available
  useEffect(() => {
    try {
      const saved = localStorage.getItem("paatkotha_cart");
      if (saved) {
        setItems(JSON.parse(saved));
      }
    } catch (e) {
      // ignore
    }
  }, []);

  // Save to localStorage
  useEffect(() => {
    try {
      localStorage.setItem("paatkotha_cart", JSON.stringify(items));
    } catch (e) {
      // ignore
    }
  }, [items]);

  const addToCart = (product: Product, variant: ProductVariant, qty = 1) => {
    setItems((prev) => {
      const existingIndex = prev.findIndex(
        (item) => item.product.id === product.id && item.variant.k === variant.k
      );
      if (existingIndex > -1) {
        const next = [...prev];
        const newQty = Math.min(20, next[existingIndex].qty + qty);
        next[existingIndex] = { ...next[existingIndex], qty: newQty };
        return next;
      }
      return [...prev, { product, variant, qty }];
    });
    setIsMiniCartOpen(true);
  };

  const updateQty = (productId: string, variantKey: string, qty: number) => {
    if (qty <= 0) {
      removeFromCart(productId, variantKey);
      return;
    }
    setItems((prev) =>
      prev.map((item) =>
        item.product.id === productId && item.variant.k === variantKey
          ? { ...item, qty: Math.min(20, Math.max(1, qty)) }
          : item
      )
    );
  };

  const removeFromCart = (productId: string, variantKey: string) => {
    setItems((prev) =>
      prev.filter(
        (item) => !(item.product.id === productId && item.variant.k === variantKey)
      )
    );
  };

  const clearCart = () => setItems([]);

  const cartCount = items.reduce((sum, item) => sum + item.qty, 0);

  // Calculate pricing through quoteB2C logic
  let subtotal = 0;
  let calculationLines: string[] = [];
  try {
    const dbMock = {
      variants: items.map((i) => ({
        id: `${i.product.id}-${i.variant.k}`,
        price: i.variant.price,
      })),
      bundles: [],
      coupons: [],
      settings: defaultSettings,
    };
    const cartInput = {
      lines: items.map((i) => ({
        variantId: `${i.product.id}-${i.variant.k}`,
        qty: i.qty,
      })),
      bundles: [],
      coupon: null,
      zone: "dhaka_city",
    };
    if (items.length > 0) {
      const quote = quoteB2C(cartInput, dbMock);
      subtotal = quote.subtotal;
      calculationLines = quote.calc;
    }
  } catch (e) {
    subtotal = items.reduce((s, i) => s + i.variant.price * i.qty, 0);
  }

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        updateQty,
        removeFromCart,
        clearCart,
        cartCount,
        subtotal,
        calculationLines,
        isMiniCartOpen,
        setIsMiniCartOpen,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
