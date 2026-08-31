import CheckoutClient from "./CheckoutClient";

export const metadata = {
  title: "Quick Checkout — Feminista",
  description: "Complete your Feminista order with complimentary shipping across India.",
  robots: { index: false, follow: true },
};

export default function CheckoutPage() {
  return <CheckoutClient />;
}
