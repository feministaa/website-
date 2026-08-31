import CartClient from "./CartClient";

export const metadata = {
  title: "Your Bag — Feminista",
  description: "Review the fragrances in your Feminista bag before checkout.",
  robots: { index: false, follow: true },
};

export default function CartPage() {
  return <CartClient />;
}
