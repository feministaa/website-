import { redirect } from "next/navigation";
import { getCurrentCustomer } from "@/lib/customerAuth";
import { getOrdersForCustomer } from "@/lib/dataStore";
import AccountDashboardClient from "./AccountDashboardClient";

export const metadata = {
  title: "Your Account — Feminista",
  robots: { index: false, follow: false },
};

export default async function AccountPage() {
  const user = await getCurrentCustomer();
  if (!user) redirect("/account/login");

  const myOrders = await getOrdersForCustomer(user.id);

  return <AccountDashboardClient user={user} orders={myOrders} />;
}
