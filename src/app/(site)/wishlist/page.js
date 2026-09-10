import WishlistClient from "./WishlistClient";
import { getProducts } from "@/lib/dataStore";

export const metadata = {
  title: "Your Wishlist — Feminista",
  description: "Fragrances you've saved for later at Feminista.",
  robots: { index: false, follow: true },
};

export default async function WishlistPage() {
  const products = await getProducts();
  return <WishlistClient products={products} />;
}
