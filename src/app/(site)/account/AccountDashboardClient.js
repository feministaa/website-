"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import styles from "./account.module.css";
import tableStyles from "@/components/admin/AdminTable.module.css";
import { formatINR, formatDate } from "@/lib/format";
import AnimateIn from "@/components/ui/AnimateIn";

function badgeClass(status) {
  const map = {
    delivered: tableStyles.badgeDelivered,
    processing: tableStyles.badgeProcessing,
    pending: tableStyles.badgePending,
    shipped: tableStyles.badgeShipped,
    cancelled: tableStyles.badgeCancelled,
  };
  return `${tableStyles.badge} ${map[status] || ""}`;
}

export default function AccountDashboardClient({ user, orders }) {
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({ name: user.name, phone: user.phone, city: user.city });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  async function handleSave(e) {
    e.preventDefault();
    setSaving(true);
    setError("");
    try {
      const res = await fetch("/api/account/me", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Could not save changes.");
      setEditing(false);
      router.refresh();
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  }

  async function handleLogout() {
    await fetch("/api/account/logout", { method: "POST" });
    router.push("/");
    router.refresh();
  }

  return (
    <main className={styles.dashWrap}>
      <AnimateIn className={styles.dashHeader}>
        <div>
          <h1 className={styles.dashTitle}>Hello, {user.name.split(" ")[0]}</h1>
          <p className={styles.dashSub}>Welcome to your Feminista account.</p>
        </div>
        <button className="btn btn-ghost" onClick={handleLogout}>
          Sign Out
        </button>
      </AnimateIn>

      <div className={styles.dashGrid}>
        <AnimateIn className={styles.card}>
          <h2 className={styles.cardTitle}>Your Details</h2>
          {editing ? (
            <form onSubmit={handleSave}>
              <div className={styles.field}>
                <label>Full Name</label>
                <input className={styles.input} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
              </div>
              <div className={styles.field}>
                <label>Phone</label>
                <input className={styles.input} value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
              </div>
              <div className={styles.field}>
                <label>City</label>
                <input className={styles.input} value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} />
              </div>
              {error && <p style={{ color: "var(--danger)", fontSize: 13, marginBottom: 12 }}>{error}</p>}
              <div className={styles.actions}>
                <button type="submit" className="btn btn-primary" disabled={saving}>
                  {saving ? "Saving…" : "Save"}
                </button>
                <button type="button" className="btn btn-ghost" onClick={() => setEditing(false)}>
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            <>
              <div className={styles.infoRow}>
                <span>Name</span>
                <span>{user.name}</span>
              </div>
              <div className={styles.infoRow}>
                <span>Email</span>
                <span>{user.email}</span>
              </div>
              <div className={styles.infoRow}>
                <span>Phone</span>
                <span>{user.phone || "—"}</span>
              </div>
              <div className={styles.infoRow}>
                <span>City</span>
                <span>{user.city || "—"}</span>
              </div>
              <div className={styles.infoRow}>
                <span>Member Since</span>
                <span>{formatDate(user.joined)}</span>
              </div>
              <div className={styles.actions}>
                <button className="btn btn-outline" onClick={() => setEditing(true)}>
                  Edit Details
                </button>
              </div>
            </>
          )}
        </AnimateIn>

        <AnimateIn delay={0.1} className={styles.card}>
          <h2 className={styles.cardTitle}>Order History</h2>
          {orders.length === 0 ? (
            <div className={styles.empty}>
              <p style={{ marginBottom: 16 }}>You haven&rsquo;t placed an order yet.</p>
              <Link href="/fragrances" className="btn btn-outline">
                Explore Fragrances
              </Link>
            </div>
          ) : (
            orders.map((order) => (
              <div key={order.id} className={styles.orderRow}>
                <div>
                  <div className={styles.orderId}>{order.id}</div>
                  <div style={{ color: "var(--ink-faint)", fontSize: 12 }}>{formatDate(order.date)}</div>
                </div>
                <div>{order.items.reduce((s, i) => s + i.qty, 0)} item(s)</div>
                <div>{formatINR(order.total)}</div>
                <span className={badgeClass(order.status)}>{order.status}</span>
              </div>
            ))
          )}
        </AnimateIn>
      </div>
    </main>
  );
}
