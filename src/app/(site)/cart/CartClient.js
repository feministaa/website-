"use client";

import Link from "next/link";
import styles from "./page.module.css";
import ScentBottle from "@/components/ui/ScentBottle";
import AnimateIn from "@/components/ui/AnimateIn";
import { useCart } from "@/context/CartContext";
import { formatINR } from "@/lib/format";

export default function CartClient() {
  const { items, updateQty, removeFromCart, subtotal } = useCart();
  const shipping = 0;
  const total = subtotal + shipping;

  if (items.length === 0) {
    return (
      <main className={styles.wrap}>
        <div className={styles.empty}>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <ScentBottle accent="#eb9d1b" accentSoft="#f6d9a4" size={140} />
          </div>
          <h1 className={styles.emptyTitle}>Your bag is empty</h1>
          <Link href="/fragrances" className="btn btn-primary">
            Explore Fragrances
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className={styles.wrap}>
      <AnimateIn>
        <h1 className={styles.title}>Your Bag</h1>
      </AnimateIn>
      <div className={styles.layout}>
        <div>
          {items.map((item) => (
            <div key={`${item.productId}-${item.size}`} className={styles.row}>
              <div className={styles.imgBox} style={{ background: `linear-gradient(160deg, ${item.accentSoft}55, var(--bg-alt))` }}>
                <ScentBottle accent={item.accent} accentSoft={item.accentSoft} size={64} isSet={item.family === "set"} />
              </div>
              <div>
                <div className={styles.name}>{item.name}</div>
                <div className={styles.meta}>
                  {item.expression} · {item.size}
                </div>
                <div className={styles.rowControls}>
                  <div style={{ display: "inline-flex", alignItems: "center", border: "1px solid var(--line)", borderRadius: 2 }}>
                    <button style={{ width: 30, height: 32 }} onClick={() => updateQty(item.productId, item.size, item.qty - 1)}>
                      −
                    </button>
                    <span style={{ width: 28, textAlign: "center", fontSize: 13 }}>{item.qty}</span>
                    <button style={{ width: 30, height: 32 }} onClick={() => updateQty(item.productId, item.size, item.qty + 1)}>
                      +
                    </button>
                  </div>
                  <button className={styles.remove} onClick={() => removeFromCart(item.productId, item.size)}>
                    Remove
                  </button>
                </div>
              </div>
              <div className={styles.priceCol}>{formatINR(item.price * item.qty)}</div>
            </div>
          ))}
          <div style={{ marginTop: 26 }}>
            <Link href="/fragrances" className="btn btn-ghost">
              ← Continue Shopping
            </Link>
          </div>
        </div>

        <div className={styles.summary}>
          <h2 className={styles.summaryTitle}>Order Summary</h2>
          <div className={styles.summaryRow}>
            <span>Subtotal</span>
            <span>{formatINR(subtotal)}</span>
          </div>
          <div className={styles.summaryRow}>
            <span>Shipping</span>
            <span>Complimentary</span>
          </div>
          <div className={styles.summaryTotal}>
            <span>Total</span>
            <span>{formatINR(total)}</span>
          </div>
          <Link href="/checkout" className="btn btn-primary btn-block">
            Proceed to Checkout
          </Link>
        </div>
      </div>
    </main>
  );
}
