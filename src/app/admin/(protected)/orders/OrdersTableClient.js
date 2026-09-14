"use client";

import { Fragment, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";
import tableStyles from "@/components/admin/AdminTable.module.css";
import { formatINR, formatDate } from "@/lib/format";

const STATUSES = ["pending", "processing", "shipped", "delivered", "cancelled"];

export default function OrdersTableClient({ orders }) {
  const [items, setItems] = useState(orders);
  const [expanded, setExpanded] = useState(null);
  const [savingId, setSavingId] = useState(null);
  const [shippingId, setShippingId] = useState(null);
  const [trackingId, setTrackingId] = useState(null);
  const [tracking, setTracking] = useState({});
  const router = useRouter();

  async function handleStatusChange(id, status) {
    setSavingId(id);
    try {
      const res = await fetch(`/api/orders/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      if (!res.ok) throw new Error("Could not update status.");
      const updated = await res.json();
      setItems((prev) => prev.map((o) => (o.id === updated.id ? updated : o)));
      router.refresh();
    } catch {
      // no-op: select simply won't reflect the failed change on next render
    } finally {
      setSavingId(null);
    }
  }

  async function handleTrack(id) {
    setTrackingId(id);
    try {
      const res = await fetch(`/api/orders/${id}/ship`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Could not fetch tracking status.");
      setTracking((prev) => ({ ...prev, [id]: data }));
    } catch (err) {
      alert(err.message);
    } finally {
      setTrackingId(null);
    }
  }

  async function handleShip(id) {
    setShippingId(id);
    try {
      const res = await fetch(`/api/orders/${id}/ship`, { method: "POST" });
      const updated = await res.json();
      if (!res.ok) throw new Error(updated.error || "Could not create shipment.");
      setItems((prev) => prev.map((o) => (o.id === updated.id ? updated : o)));
      router.refresh();
    } catch (err) {
      alert(err.message);
    } finally {
      setShippingId(null);
    }
  }

  return (
    <div className={tableStyles.panel}>
      <div style={{ overflowX: "auto" }}>
        <table className={tableStyles.table}>
          <thead>
            <tr>
              <th>Order</th>
              <th>Customer</th>
              <th>Contact</th>
              <th>Items</th>
              <th>Total</th>
              <th>Payment</th>
              <th>Shipping</th>
              <th>Status</th>
              <th>Placed</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {items.map((o) => (
              <Fragment key={o.id}>
                <tr>
                  <td className={styles.orderId}>{o.id}</td>
                  <td>{o.customerName}</td>
                  <td>
                    <div>{o.email}</div>
                    <div style={{ fontSize: 11.5, color: "var(--ink-faint)" }}>{o.phone}</div>
                  </td>
                  <td>{o.items.reduce((n, item) => n + item.qty, 0)}</td>
                  <td>{formatINR(o.total)}</td>
                  <td>
                    <span
                      className={`${tableStyles.badge} ${o.paymentStatus === "paid" ? tableStyles.badgeActive : tableStyles.badgeInactive}`}
                    >
                      {o.paymentStatus}
                    </span>
                  </td>
                  <td>
                    {o.shipmentStatus === "created" ? (
                      <div>
                        <a
                          href={`https://www.ithinklogistics.co.in/postship/tracking/${o.awbNumber}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{ fontSize: 12.5, color: "var(--gold-deep)" }}
                        >
                          {o.awbNumber}
                        </a>
                        <div style={{ fontSize: 11.5, color: "var(--ink-faint)" }}>{o.courierName || "—"}</div>
                        {tracking[o.id] ? (
                          <div style={{ fontSize: 11.5, color: "var(--ink-faint)", marginTop: 2 }}>
                            Live: {tracking[o.id].status}
                          </div>
                        ) : (
                          <button
                            className={styles.expandBtn}
                            style={{ marginTop: 2 }}
                            disabled={trackingId === o.id}
                            onClick={() => handleTrack(o.id)}
                          >
                            {trackingId === o.id ? "Checking…" : "Refresh Tracking"}
                          </button>
                        )}
                      </div>
                    ) : (
                      <button
                        className={styles.expandBtn}
                        disabled={shippingId === o.id}
                        onClick={() => handleShip(o.id)}
                      >
                        {shippingId === o.id ? "Booking…" : o.shipmentStatus === "failed" ? "Retry Ship" : "Ship Now"}
                      </button>
                    )}
                  </td>
                  <td>
                    <select
                      className={styles.statusSelect}
                      value={o.status}
                      disabled={savingId === o.id}
                      onChange={(e) => handleStatusChange(o.id, e.target.value)}
                    >
                      {STATUSES.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td>{formatDate(o.date)}</td>
                  <td>
                    <button
                      className={styles.expandBtn}
                      onClick={() => setExpanded(expanded === o.id ? null : o.id)}
                    >
                      {expanded === o.id ? "Hide" : "View"}
                    </button>
                  </td>
                </tr>
                {expanded === o.id && (
                  <tr>
                    <td colSpan={10} className={styles.detailCell}>
                      <div className={styles.detailBlock}>
                        <div style={{ marginBottom: 8 }}>
                          <strong>Address:</strong> {o.address || "—"}
                        </div>
                        {o.items.map((item, i) => (
                          <div key={i} className={styles.detailRow}>
                            <span>{item.productId}</span>
                            <span>{item.size}</span>
                            <span>× {item.qty}</span>
                            <span>{formatINR(item.price)}</span>
                          </div>
                        ))}
                      </div>
                    </td>
                  </tr>
                )}
              </Fragment>
            ))}
            {items.length === 0 && (
              <tr>
                <td colSpan={10} style={{ textAlign: "center", padding: "40px 0", color: "var(--ink-faint)" }}>
                  No orders yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
