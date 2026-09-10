import { redirect } from "next/navigation";
import { getCurrentCustomer } from "@/lib/customerAuth";
import CheckoutClient from "./CheckoutClient";

export const metadata = {
  title: "Quick Checkout — Feminista",
  description: "Complete your Feminista order with complimentary shipping across India.",
  robots: { index: false, follow: true },
};

export default async function CheckoutPage() {
  const user = await getCurrentCustomer();
  if (!user) redirect("/account/login?next=/checkout");

  return <CheckoutClient user={user} />;
}
