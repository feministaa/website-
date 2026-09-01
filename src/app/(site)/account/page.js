import { redirect } from "next/navigation";
import { getCurrentCustomer } from "@/lib/customerAuth";
import { getOrders } from "@/lib/dataStore";
import AccountDashboardClient from "./AccountDashboardClient";

export const metadata = {
  title: "Your Account — Feminista",
  robots: { index: false, follow: false },
};

export default async function AccountPage() {
  const user = await getCurrentCustomer();
  if (!user) redirect("/account/login");

  const orders = await getOrders();
  const myOrders = orders
    .filter((o) => o.userId === user.id || (o.email && o.email.toLowerCase() === user.email.toLowerCase()))
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  return <AccountDashboardClient user={user} orders={myOrders} />;
}
