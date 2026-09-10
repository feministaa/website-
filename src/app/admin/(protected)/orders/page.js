import { getOrders } from "@/lib/dataStore";
import styles from "./page.module.css";
import OrdersTableClient from "./OrdersTableClient";

export const metadata = { title: "Orders — Feminista Admin" };

export default async function AdminOrdersPage() {
  const orders = await getOrders();

  return (
    <div>
      <h1 className={styles.title}>Orders</h1>
      <p className={styles.sub}>{orders.length} order(s) placed.</p>
      <OrdersTableClient orders={orders} />
    </div>
  );
}
