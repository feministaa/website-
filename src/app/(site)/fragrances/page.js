import { Suspense } from "react";
import FragrancesClient from "./FragrancesClient";
import { getProducts } from "@/lib/dataStore";

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

export default async function FragrancesPage() {
  const products = await getProducts();
  return (
    <Suspense fallback={null}>
      <FragrancesClient products={products} />
    </Suspense>
  );
}
