"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";
import tableStyles from "@/components/admin/AdminTable.module.css";
import { formatINR } from "@/lib/format";

export default function ProductsTableClient({ products }) {
  const [items, setItems] = useState(products);
  const [deletingId, setDeletingId] = useState(null);
  const router = useRouter();

  async function handleDelete(id, name) {
    if (!window.confirm(`Remove "${name}" from the catalogue? This cannot be undone.`)) return;
    setDeletingId(id);
    try {
      const res = await fetch(`/api/products/${id}`, { method: "DELETE" });
      if (res.ok) {
        setItems((prev) => prev.filter((p) => p.id !== id));
        router.refresh();
      }
    } finally {
      setDeletingId(null);
    }
  }

  return (
    <div className={tableStyles.panel}>
      <div style={{ overflowX: "auto" }}>
        <table className={tableStyles.table}>
          <thead>
            <tr>
              <th>Product</th>
              <th>Family</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Rating</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {items.map((p) => (
              <tr key={p.id}>
                <td>
                  <div className={styles.nameCell}>
                    <span className={styles.swatch} style={{ background: `linear-gradient(160deg, ${p.accentSoft}, ${p.accent})` }} />
                    <div>
                      <div>{p.name}</div>
                      <div style={{ fontSize: 11.5, color: "var(--ink-faint)" }}>{p.expression}</div>
                    </div>
                  </div>
                </td>
                <td style={{ textTransform: "capitalize" }}>{p.family}</td>
                <td>{formatINR(p.price)}</td>
                <td>{p.stock}</td>
                <td>{p.rating} ★ ({p.reviews})</td>
                <td>
                  <div className={styles.rowActions}>
                    <Link href={`/admin/products/${p.id}`}>Edit</Link>
                    <button
                      className={styles.deleteBtn}
                      onClick={() => handleDelete(p.id, p.name)}
                      disabled={deletingId === p.id}
                    >
                      {deletingId === p.id ? "Removing…" : "Delete"}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {items.length === 0 && (
              <tr>
                <td colSpan={6} style={{ textAlign: "center", padding: "40px 0", color: "var(--ink-faint)" }}>
                  No products yet. Add your first fragrance.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
