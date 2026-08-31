import FragrancesClient from "./FragrancesClient";
import products from "@/data/products.json";

export const metadata = {
  title: "Fragrances — Feminista",
  description: "Explore Locken, Vers, Fresca and the Feminista Discovery Set — three fragrance expressions, one house.",
  alternates: { canonical: "/fragrances" },
  openGraph: {
    title: "Fragrances — Feminista",
    description: "Her, in Three Acts. Explore the full Feminista fragrance collection.",
    url: "/fragrances",
    type: "website",
  },
};

export default function FragrancesPage() {
  return <FragrancesClient products={products} />;
}
