import { getOrders, getProducts, getUsers } from "@/lib/dataStore";
import { formatINR, formatDate } from "@/lib/format";
import StatCard from "@/components/admin/StatCard";
import { RevenueChart, BarList } from "@/components/admin/Charts";
import styles from "./page.module.css";
import tableStyles from "@/components/admin/AdminTable.module.css";

export const metadata = { title: "Insights — Feminista Admin" };

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

export default async function AdminDashboardPage() {
  const [orders, products, users] = await Promise.all([getOrders(), getProducts(), getUsers()]);

  const validOrders = orders.filter((o) => o.status !== "cancelled");
  const revenue = validOrders.reduce((sum, o) => sum + o.total, 0);
  const avgOrderValue = validOrders.length ? Math.round(revenue / validOrders.length) : 0;

  const productSales = {};
  validOrders.forEach((o) => {
    o.items.forEach((item) => {
      productSales[item.productId] = (productSales[item.productId] || 0) + item.qty;
    });
  });

  const topProducts = Object.entries(productSales)
    .map(([id, qty]) => {
      const product = products.find((p) => p.id === id);
      return { label: product?.name || id, value: qty, display: `${qty} sold` };
    })
    .sort((a, b) => b.value - a.value)
    .slice(0, 5);

  const sortedByDate = [...orders].sort((a, b) => new Date(a.date) - new Date(b.date));
  const revenuePoints = sortedByDate.map((o) => ({
    label: formatDate(o.date).split(" ").slice(0, 2).join(" "),
    value: o.total,
  }));

  const recentOrders = [...orders].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 6);

  return (
    <div>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Insights</h1>
          <p className={styles.sub}>An overview of Feminista&rsquo;s store performance.</p>
        </div>
      </div>

      <div className={styles.statGrid}>
        <StatCard label="Total Revenue" value={formatINR(revenue)} delta={`${validOrders.length} valid orders`} trend="up" />
        <StatCard label="Total Orders" value={orders.length} delta={`${orders.filter((o) => o.status === "pending" || o.status === "processing").length} in progress`} trend="up" />
        <StatCard label="Customers" value={users.length} delta={`${users.filter((u) => u.status === "active").length} active`} trend="up" />
        <StatCard label="Avg. Order Value" value={formatINR(avgOrderValue)} delta="Across all orders" trend="up" />
      </div>

      <div className={styles.midGrid}>
        <RevenueChart title="Revenue Trend" points={revenuePoints.length ? revenuePoints : [{ label: "—", value: 0 }]} />
        <BarList title="Top Fragrances" items={topProducts.length ? topProducts : [{ label: "No sales yet", value: 1, display: "0" }]} />
      </div>

      <div className={tableStyles.panel}>
        <h3 className={styles.sectionTitle}>Recent Orders</h3>
        <div style={{ overflowX: "auto" }}>
          <table className={tableStyles.table}>
            <thead>
              <tr>
                <th>Order</th>
                <th>Customer</th>
                <th>Items</th>
                <th>Total</th>
                <th>Status</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((order) => (
                <tr key={order.id}>
                  <td>{order.id}</td>
                  <td>{order.customerName}</td>
                  <td>{order.items.reduce((s, i) => s + i.qty, 0)} item(s)</td>
                  <td>{formatINR(order.total)}</td>
                  <td>
                    <span className={badgeClass(order.status)}>{order.status}</span>
                  </td>
                  <td>{formatDate(order.date)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
