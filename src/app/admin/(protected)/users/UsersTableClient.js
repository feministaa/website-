"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";
import tableStyles from "@/components/admin/AdminTable.module.css";
import { formatINR, formatDate } from "@/lib/format";

export default function UsersTableClient({ users }) {
  const [items, setItems] = useState(users);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  function openEdit(user) {
    setEditing(user);
    setForm({ ...user });
    setError("");
  }

  async function handleSave(e) {
    e.preventDefault();
    setSaving(true);
    setError("");
    try {
      const res = await fetch(`/api/users/${editing.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Could not save changes.");
      const updated = await res.json();
      setItems((prev) => prev.map((u) => (u.id === updated.id ? updated : u)));
      setEditing(null);
      router.refresh();
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id, name) {
    if (!window.confirm(`Remove customer "${name}"? This cannot be undone.`)) return;
    const res = await fetch(`/api/users/${id}`, { method: "DELETE" });
    if (res.ok) {
      setItems((prev) => prev.filter((u) => u.id !== id));
      router.refresh();
    }
  }

  return (
    <>
      <div className={tableStyles.panel}>
        <div style={{ overflowX: "auto" }}>
          <table className={tableStyles.table}>
            <thead>
              <tr>
                <th>Customer</th>
                <th>Contact</th>
                <th>City</th>
                <th>Orders</th>
                <th>Total Spent</th>
                <th>Status</th>
                <th>Joined</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {items.map((u) => (
                <tr key={u.id}>
                  <td>{u.name}</td>
                  <td>
                    <div>{u.email}</div>
                    <div style={{ fontSize: 11.5, color: "var(--ink-faint)" }}>{u.phone}</div>
                  </td>
                  <td>{u.city}</td>
                  <td>{u.orders}</td>
                  <td>{formatINR(u.totalSpent)}</td>
                  <td>
                    <span className={`${tableStyles.badge} ${u.status === "active" ? tableStyles.badgeActive : tableStyles.badgeInactive}`}>
                      {u.status}
                    </span>
                  </td>
                  <td>{formatDate(u.joined)}</td>
                  <td>
                    <div className={styles.rowActions}>
                      <button onClick={() => openEdit(u)}>Edit</button>
                      <button className={styles.deleteBtn} onClick={() => handleDelete(u.id, u.name)}>
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {items.length === 0 && (
                <tr>
                  <td colSpan={8} style={{ textAlign: "center", padding: "40px 0", color: "var(--ink-faint)" }}>
                    No customers yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {editing && (
        <div className={styles.modalOverlay} onClick={() => setEditing(null)}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <h3 className={styles.modalTitle}>Edit Customer</h3>
            <form onSubmit={handleSave}>
              {error && <p style={{ color: "var(--danger)", fontSize: 13, marginBottom: 14 }}>{error}</p>}
              <div className={styles.field}>
                <label>Full Name</label>
                <input className={styles.input} required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
              </div>
              <div className={styles.field}>
                <label>Email</label>
                <input type="email" className={styles.input} required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
              </div>
              <div className={styles.field}>
                <label>Phone</label>
                <input className={styles.input} value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
              </div>
              <div className={styles.field}>
                <label>City</label>
                <input className={styles.input} value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} />
              </div>
              <div className={styles.field}>
                <label>Status</label>
                <select className={styles.select} value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
              <div className={styles.actions}>
                <button type="submit" className="btn btn-primary" disabled={saving}>
                  {saving ? "Saving…" : "Save Changes"}
                </button>
                <button type="button" className="btn btn-ghost" onClick={() => setEditing(null)}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
