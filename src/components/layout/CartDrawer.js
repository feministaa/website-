"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useCart } from "@/context/CartContext";
import ScentBottle from "@/components/ui/ScentBottle";
import { formatINR } from "@/lib/format";

export default function CartDrawer() {
  const { items, isDrawerOpen, closeDrawer, updateQty, removeFromCart, subtotal } = useCart();

  return (
    <AnimatePresence>
      {isDrawerOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{ position: "fixed", inset: 0, background: "rgba(13,12,10,0.42)", zIndex: 300 }}
          onClick={closeDrawer}
        >
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position: "absolute",
              right: 0,
              top: 0,
              height: "100%",
              width: 420,
              maxWidth: "92vw",
              background: "var(--cream)",
              display: "flex",
              flexDirection: "column",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "22px 26px",
                borderBottom: "1px solid var(--line)",
              }}
            >
              <h3 style={{ fontSize: 20 }}>Your Bag ({items.reduce((s, i) => s + i.qty, 0)})</h3>
              <button aria-label="Close cart" onClick={closeDrawer} style={{ fontSize: 18 }}>
                ✕
              </button>
            </div>

            <div style={{ flex: 1, overflowY: "auto", padding: "10px 26px" }}>
              {items.length === 0 ? (
                <div style={{ padding: "60px 0", textAlign: "center", color: "var(--ink-soft)" }}>
                  <p style={{ marginBottom: 18 }}>Your bag is currently empty.</p>
                  <Link href="/fragrances" className="btn btn-outline" onClick={closeDrawer}>
                    Explore Fragrances
                  </Link>
                </div>
              ) : (
                items.map((item) => (
                  <div
                    key={`${item.productId}-${item.size}`}
                    style={{ display: "flex", gap: 16, padding: "18px 0", borderBottom: "1px solid var(--line)" }}
                  >
                    <div
                      style={{
                        width: 76,
                        height: 90,
                        borderRadius: 3,
                        background: `linear-gradient(160deg, ${item.accentSoft}55, var(--bg-alt))`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                      }}
                    >
                      <ScentBottle accent={item.accent} accentSoft={item.accentSoft} size={56} isSet={item.family === "set"} />
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: "flex", justifyContent: "space-between", gap: 8 }}>
                        <div>
                          <div style={{ fontSize: 15.5, fontFamily: "var(--font-serif)" }}>{item.name}</div>
                          <div style={{ fontSize: 12, color: "var(--ink-faint)" }}>{item.size}</div>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.productId, item.size)}
                          style={{ fontSize: 11, color: "var(--ink-faint)", textDecoration: "underline", height: "fit-content" }}
                        >
                          Remove
                        </button>
                      </div>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 10 }}>
                        <div style={{ display: "inline-flex", alignItems: "center", border: "1px solid var(--line)", borderRadius: 2 }}>
                          <button
                            style={{ width: 28, height: 30 }}
                            onClick={() => updateQty(item.productId, item.size, item.qty - 1)}
                            aria-label="Decrease quantity"
                          >
                            −
                          </button>
                          <span style={{ width: 26, textAlign: "center", fontSize: 13 }}>{item.qty}</span>
                          <button
                            style={{ width: 28, height: 30 }}
                            onClick={() => updateQty(item.productId, item.size, item.qty + 1)}
                            aria-label="Increase quantity"
                          >
                            +
                          </button>
                        </div>
                        <span style={{ fontSize: 14.5 }}>{formatINR(item.price * item.qty)}</span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {items.length > 0 && (
              <div style={{ padding: "22px 26px", borderTop: "1px solid var(--line)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8, fontSize: 14 }}>
                  <span>Subtotal</span>
                  <span>{formatINR(subtotal)}</span>
                </div>
                <p style={{ fontSize: 12, color: "var(--ink-faint)", marginBottom: 16 }}>
                  Shipping and taxes calculated at checkout.
                </p>
                <Link href="/checkout" className="btn btn-primary btn-block" onClick={closeDrawer}>
                  Quick Checkout
                </Link>
                <Link
                  href="/cart"
                  className="btn btn-ghost btn-block"
                  style={{ marginTop: 10 }}
                  onClick={closeDrawer}
                >
                  View Bag
                </Link>
              </div>
            )}
          </motion.aside>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
