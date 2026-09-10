"use client";

import { useState } from "react";
import Link from "next/link";
import styles from "./page.module.css";
import { useCart } from "@/context/CartContext";
import { formatINR } from "@/lib/format";
import ScentBottle from "@/components/ui/ScentBottle";
import AnimateIn from "@/components/ui/AnimateIn";

export default function CheckoutClient({ user }) {
  const { items, subtotal, clearCart } = useCart();
  const [form, setForm] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    address: "",
    city: user?.city || "",
    pincode: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [confirmedOrder, setConfirmedOrder] = useState(null);

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  function loadRazorpayScript() {
    return new Promise((resolve, reject) => {
      if (window.Razorpay) return resolve();
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = resolve;
      script.onerror = () => reject(new Error("Could not load payment gateway. Check your connection."));
      document.body.appendChild(script);
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setSubmitting(true);

    const orderPayload = {
      customerName: form.name,
      email: form.email,
      phone: form.phone,
      address: `${form.address}, ${form.city} ${form.pincode}`,
      city: form.city,
      items: items.map((i) => ({ productId: i.productId, name: i.name, size: i.size, qty: i.qty, price: i.price })),
      total: subtotal,
    };

    try {
      await loadRazorpayScript();

      const createRes = await fetch("/api/payment/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: subtotal }),
      });
      if (!createRes.ok) throw new Error("Could not start payment. Please try again.");
      const { orderId, amount, currency, keyId } = await createRes.json();

      const razorpay = new window.Razorpay({
        key: keyId,
        order_id: orderId,
        amount,
        currency,
        name: "Feminista",
        description: "Order payment",
        prefill: { name: form.name, email: form.email, contact: form.phone },
        theme: { color: "#eb9d1b" },
        handler: async (response) => {
          try {
            const verifyRes = await fetch("/api/payment/verify", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                order: orderPayload,
              }),
            });
            if (!verifyRes.ok) throw new Error("Payment could not be verified. Please contact support.");
            const confirmed = await verifyRes.json();
            setConfirmedOrder(confirmed);
            clearCart();
          } catch (err) {
            setError(err.message);
          } finally {
            setSubmitting(false);
          }
        },
        modal: {
          ondismiss: () => setSubmitting(false),
        },
      });
      razorpay.on("payment.failed", () => {
        setError("Payment failed. Please try again.");
        setSubmitting(false);
      });
      razorpay.open();
    } catch (err) {
      setError(err.message);
      setSubmitting(false);
    }
  }

  if (confirmedOrder) {
    return (
      <main className={styles.wrap}>
        <AnimateIn className={styles.confirmWrap}>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <ScentBottle accent="#eb9d1b" accentSoft="#f6d9a4" size={120} />
          </div>
          <h1 className={styles.confirmTitle}>Thank you, {confirmedOrder.customerName.split(" ")[0]}</h1>
          <p style={{ color: "var(--ink-soft)", marginBottom: 8 }}>
            Your order <strong>{confirmedOrder.id}</strong> has been received.
          </p>
          <p style={{ color: "var(--ink-soft)", marginBottom: 30 }}>
            A confirmation will be sent to {confirmedOrder.email || "your inbox"}. Your payment has been received and
            we&apos;ll begin preparing your order shortly.
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
          <h1 className={styles.confirmTitle}>Your bag is empty</h1>
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
        <p className={styles.subtitle}>Complimentary shipping across India. Secure payment via Razorpay.</p>
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
            {submitting ? "Processing…" : `Pay ${formatINR(subtotal)}`}
          </button>
        </AnimateIn>

        <AnimateIn delay={0.15} className={styles.summary}>
          <h2 style={{ fontSize: 18, marginBottom: 6 }}>Order Summary</h2>
          <div className={styles.noteBox}>All major cards, UPI, netbanking and wallets accepted via Razorpay.</div>
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
