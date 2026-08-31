"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";

const CartContext = createContext(null);
const STORAGE_KEY = "feminista_cart_v1";

function lineKey(productId, size) {
  return `${productId}__${size}`;
}

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) setItems(JSON.parse(raw));
    } catch (err) {
      // ignore corrupt storage
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items, hydrated]);

  function addToCart(product, size, qty = 1, options = {}) {
    setItems((prev) => {
      const key = lineKey(product.id, size.label);
      const existing = prev.find((i) => lineKey(i.productId, i.size) === key);
      if (existing) {
        return prev.map((i) =>
          lineKey(i.productId, i.size) === key ? { ...i, qty: i.qty + qty } : i
        );
      }
      return [
        ...prev,
        {
          productId: product.id,
          name: product.name,
          expression: product.expression,
          slug: product.slug,
          size: size.label,
          price: size.price,
          accent: product.accent,
          accentSoft: product.accentSoft,
          family: product.family,
          qty,
        },
      ];
    });
    if (!options.silent) setDrawerOpen(true);
  }

  function removeFromCart(productId, size) {
    setItems((prev) => prev.filter((i) => lineKey(i.productId, i.size) !== lineKey(productId, size)));
  }

  function updateQty(productId, size, qty) {
    setItems((prev) => {
      if (qty <= 0) return prev.filter((i) => lineKey(i.productId, i.size) !== lineKey(productId, size));
      return prev.map((i) =>
        lineKey(i.productId, i.size) === lineKey(productId, size) ? { ...i, qty } : i
      );
    });
  }

  function clearCart() {
    setItems([]);
  }

  const subtotal = useMemo(() => items.reduce((sum, i) => sum + i.price * i.qty, 0), [items]);
  const count = useMemo(() => items.reduce((sum, i) => sum + i.qty, 0), [items]);

  const value = {
    items,
    addToCart,
    removeFromCart,
    updateQty,
    clearCart,
    subtotal,
    count,
    isDrawerOpen,
    openDrawer: () => setDrawerOpen(true),
    closeDrawer: () => setDrawerOpen(false),
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
