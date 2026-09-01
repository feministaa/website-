"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import styles from "../account.module.css";
import AnimateIn from "@/components/ui/AnimateIn";

export default function RegisterClient() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", city: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/account/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Could not create account.");
      }
      router.push("/account");
      router.refresh();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className={styles.authWrap}>
      <AnimateIn>
        <span className="eyebrow" style={{ display: "block", textAlign: "center", marginBottom: 10 }}>
          The Feminista Circle
        </span>
        <h1 className={styles.authTitle}>Create your account.</h1>
        <p className={styles.authSub}>Track orders, save your details and enjoy a faster checkout.</p>

        <form onSubmit={handleSubmit}>
          <div className={styles.field}>
            <label htmlFor="name">Full Name</label>
            <input id="name" className={styles.input} required value={form.name} onChange={(e) => update("name", e.target.value)} />
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
          <div className={styles.field}>
            <label htmlFor="phone">Phone</label>
            <input id="phone" className={styles.input} value={form.phone} onChange={(e) => update("phone", e.target.value)} />
          </div>
          <div className={styles.field}>
            <label htmlFor="city">City</label>
            <input id="city" className={styles.input} value={form.city} onChange={(e) => update("city", e.target.value)} />
          </div>
          <div className={styles.field}>
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              className={styles.input}
              required
              minLength={6}
              value={form.password}
              onChange={(e) => update("password", e.target.value)}
            />
          </div>
          {error && <p className={styles.error}>{error}</p>}
          <button type="submit" className="btn btn-primary btn-block" disabled={loading}>
            {loading ? "Creating Account…" : "Create Account"}
          </button>
        </form>

        <p className={styles.switchLine}>
          Already have an account? <Link href="/account/login">Sign in</Link>
        </p>
      </AnimateIn>
    </main>
  );
}
