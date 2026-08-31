import WishlistClient from "./WishlistClient";

export const metadata = {
  title: "Your Wishlist — Feminista",
  description: "Fragrances you've saved for later at Feminista.",
  robots: { index: false, follow: true },
};

export default function WishlistPage() {
  return <WishlistClient />;
}
