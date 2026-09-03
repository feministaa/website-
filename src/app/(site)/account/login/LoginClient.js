"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import styles from "../account.module.css";
import AnimateIn from "@/components/ui/AnimateIn";

export default function LoginClient() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/account/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Could not sign in.");
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
        <h1 className={styles.authTitle}>Welcome back</h1>
        <p className={styles.authSub}>Sign in to view your orders and manage your details.</p>

        <form onSubmit={handleSubmit}>
          <div className={styles.field}>
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              className={styles.input}
              required
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </div>
          <div className={styles.field}>
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              className={styles.input}
              required
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
          </div>
          {error && <p className={styles.error}>{error}</p>}
          <button type="submit" className="btn btn-primary btn-block" disabled={loading}>
            {loading ? "Signing In…" : "Sign In"}
          </button>
        </form>

        <p className={styles.switchLine}>
          New to Feminista? <Link href="/account/register">Create an account</Link>
        </p>
      </AnimateIn>
    </main>
  );
}
