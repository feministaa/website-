"use client";

import { useState } from "react";
import Link from "next/link";
import styles from "./page.module.css";
import { useCart } from "@/context/CartContext";
import { formatINR } from "@/lib/format";
import ScentBottle from "@/components/ui/ScentBottle";
import AnimateIn from "@/components/ui/AnimateIn";

export default function CheckoutClient() {
  const { items, subtotal, clearCart } = useCart();
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    pincode: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [confirmedOrder, setConfirmedOrder] = useState(null);

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerName: form.name,
          email: form.email,
          phone: form.phone,
          address: `${form.address}, ${form.city} ${form.pincode}`,
          city: form.city,
          items: items.map((i) => ({ productId: i.productId, name: i.name, size: i.size, qty: i.qty, price: i.price })),
          total: subtotal,
        }),
      });
      if (!res.ok) throw new Error("Could not place order. Please try again.");
      const order = await res.json();
      setConfirmedOrder(order);
      clearCart();
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  }

  if (confirmedOrder) {
    return (
      <main className={styles.wrap}>
        <AnimateIn className={styles.confirmWrap}>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <ScentBottle accent="#a87f3f" accentSoft="#e7d6ad" size={120} />
          </div>
          <h1 className={styles.confirmTitle}>Thank you, {confirmedOrder.customerName.split(" ")[0]}.</h1>
          <p style={{ color: "var(--ink-soft)", marginBottom: 8 }}>
            Your order <strong>{confirmedOrder.id}</strong> has been received.
          </p>
          <p style={{ color: "var(--ink-soft)", marginBottom: 30 }}>
            A confirmation will be sent to {confirmedOrder.email || "your inbox"}. Online payment via Razorpay is arriving
            soon — for now, our team will reach out to confirm payment and delivery.
          </p>
          <Link href="/fragrances" className="btn btn-primary">
            Continue Exploring
          </Link>
        </AnimateIn>
      </main>
    );
  }

  if (items.length === 0) {
    return (
      <main className={styles.wrap}>
        <div className={styles.confirmWrap}>
          <h1 className={styles.confirmTitle}>Your bag is empty.</h1>
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
        <h1 className={styles.title}>Quick Checkout</h1>
        <p className={styles.subtitle}>Complimentary shipping across India. Razorpay online payment is coming soon.</p>
      </AnimateIn>

      <div className={styles.layout}>
        <AnimateIn as="form" onSubmit={handleSubmit}>
          <div className={styles.sectionLabel}>Contact</div>
          <div className={styles.grid2}>
            <div className={styles.field}>
              <label htmlFor="name">Full Name</label>
              <input id="name" className={styles.input} required value={form.name} onChange={(e) => update("name", e.target.value)} />
            </div>
            <div className={styles.field}>
              <label htmlFor="phone">Phone</label>
              <input id="phone" className={styles.input} required value={form.phone} onChange={(e) => update("phone", e.target.value)} />
            </div>
          </div>
          <div className={styles.field}>
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              className={styles.input}
              required
              value={form.email}
              onChange={(e) => update("email", e.target.value)}
            />
          </div>

          <div className={styles.sectionLabel}>Shipping Address</div>
          <div className={styles.field}>
            <label htmlFor="address">Address</label>
            <input id="address" className={styles.input} required value={form.address} onChange={(e) => update("address", e.target.value)} />
          </div>
          <div className={styles.grid2}>
            <div className={styles.field}>
              <label htmlFor="city">City</label>
              <input id="city" className={styles.input} required value={form.city} onChange={(e) => update("city", e.target.value)} />
            </div>
            <div className={styles.field}>
              <label htmlFor="pincode">Pincode</label>
              <input id="pincode" className={styles.input} required value={form.pincode} onChange={(e) => update("pincode", e.target.value)} />
            </div>
          </div>

          {error && <p style={{ color: "var(--danger)", fontSize: 13, marginBottom: 14 }}>{error}</p>}

          <button type="submit" className="btn btn-primary btn-block" disabled={submitting} style={{ marginTop: 10 }}>
            {submitting ? "Placing Order…" : `Place Order — ${formatINR(subtotal)}`}
          </button>
        </AnimateIn>

        <AnimateIn delay={0.15} className={styles.summary}>
          <h2 style={{ fontSize: 18, marginBottom: 6 }}>Order Summary</h2>
          <div className={styles.noteBox}>
            Payment via Razorpay will be enabled soon. For now, orders are confirmed manually by our team.
          </div>
          {items.map((item) => (
            <div key={`${item.productId}-${item.size}`} className={styles.line}>
              <div className={styles.lineImg} style={{ background: `linear-gradient(160deg, ${item.accentSoft}55, var(--bg-alt))` }}>
                <ScentBottle accent={item.accent} accentSoft={item.accentSoft} size={30} isSet={item.family === "set"} />
              </div>
              <div style={{ flex: 1 }}>
                <div>{item.name}</div>
                <div style={{ color: "var(--ink-faint)", fontSize: 12 }}>
                  {item.size} × {item.qty}
                </div>
              </div>
              <div>{formatINR(item.price * item.qty)}</div>
            </div>
          ))}
          <div className={styles.totalRow}>
            <span>Subtotal</span>
            <span>{formatINR(subtotal)}</span>
          </div>
          <div className={styles.totalRow}>
            <span>Shipping</span>
            <span>Complimentary</span>
          </div>
          <div className={styles.grandTotal}>
            <span>Total</span>
            <span>{formatINR(subtotal)}</span>
          </div>
        </AnimateIn>
      </div>
    </main>
  );
}
