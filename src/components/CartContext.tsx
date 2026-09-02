"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { StoreItem, STORE_ITEMS } from "@/data/store-items";

export type CartItem = {
  item: StoreItem;
  quantity: number;
};

export type PurchaseReceipt = {
  buyerName: string;
  buyerEmail: string;
  buyerPhone?: string;
  licenseKey: string;
  purchaseDate: string;
  items: StoreItem[];
  totalAmount: string;
  currency: "USD" | "INR";
  paymentMethod: string;
};

type CartContextType = {
  items: CartItem[];
  addToCart: (item: StoreItem) => void;
  removeFromCart: (itemId: string) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (open: boolean) => void;
  currency: "USD" | "INR";
  setCurrency: (c: "USD" | "INR") => void;
  discountCode: string;
  discountPercent: number;
  applyDiscount: (code: string) => boolean;
  latestReceipt: PurchaseReceipt | null;
  setLatestReceipt: (receipt: PurchaseReceipt | null) => void;
  totalCount: number;
  totalPriceUsd: number;
  totalPriceInr: number;
  finalPriceUsd: number;
  finalPriceInr: number;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [currency, setCurrency] = useState<"USD" | "INR">("USD");
  const [discountCode, setDiscountCode] = useState("");
  const [discountPercent, setDiscountPercent] = useState(0);
  const [latestReceipt, setLatestReceipt] = useState<PurchaseReceipt | null>(null);

  // Load cart from localStorage if present
  useEffect(() => {
    try {
      const saved = localStorage.getItem("vikash_portfolio_cart");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          setItems(parsed);
        }
      }
    } catch {
      // ignore
    }
  }, []);

  // Save cart to localStorage
  useEffect(() => {
    try {
      localStorage.setItem("vikash_portfolio_cart", JSON.stringify(items));
    } catch {
      // ignore
    }
  }, [items]);

  const addToCart = (item: StoreItem) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.item.id === item.id);
      if (existing) {
        return prev.map((i) =>
          i.item.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { item, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (itemId: string) => {
    setItems((prev) => prev.filter((i) => i.item.id !== itemId));
  };

  const clearCart = () => {
    setItems([]);
    setDiscountCode("");
    setDiscountPercent(0);
  };

  const applyDiscount = (code: string): boolean => {
    const clean = code.trim().toUpperCase();
    if (clean === "VIKASH10" || clean === "LAUNCH10") {
      setDiscountCode(clean);
      setDiscountPercent(10);
      return true;
    }
    if (clean === "SPECIAL20" || clean === "CREATOR20") {
      setDiscountCode(clean);
      setDiscountPercent(20);
      return true;
    }
    return false;
  };

  const totalCount = items.reduce((acc, curr) => acc + curr.quantity, 0);

  const parseNumber = (priceStr: string) => {
    const num = parseFloat(priceStr.replace(/[^0-9.]/g, ""));
    return isNaN(num) ? 0 : num;
  };

  const totalPriceUsd = items.reduce(
    (acc, curr) => acc + parseNumber(curr.item.priceUsd) * curr.quantity,
    0
  );

  const totalPriceInr = items.reduce(
    (acc, curr) => acc + parseNumber(curr.item.priceInr) * curr.quantity,
    0
  );

  const finalPriceUsd = Math.round(totalPriceUsd * (1 - discountPercent / 100));
  const finalPriceInr = Math.round(totalPriceInr * (1 - discountPercent / 100));

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        clearCart,
        isCartOpen,
        setIsCartOpen,
        isCheckoutOpen,
        setIsCheckoutOpen,
        currency,
        setCurrency,
        discountCode,
        discountPercent,
        applyDiscount,
        latestReceipt,
        setLatestReceipt,
        totalCount,
        totalPriceUsd,
        totalPriceInr,
        finalPriceUsd,
        finalPriceInr,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return ctx;
}
