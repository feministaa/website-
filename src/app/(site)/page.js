import Hero from "@/components/home/Hero";
import SignatureCollection from "@/components/home/SignatureCollection";
import HomeBanner from "@/components/home/HomeBanner";
import AboutTeaser from "@/components/home/AboutTeaser";
import DiscoverySet from "@/components/home/DiscoverySet";
import FinishingTouch from "@/components/home/FinishingTouch";
import HomeReels from "@/components/home/HomeReels";
import HomeFAQ from "@/components/home/HomeFAQ";
import { getProducts } from "@/lib/dataStore";

export const metadata = {
  title: "Feminista — Modern Femininity, Composed",
  description:
    "For the woman who needs no introduction. Discover Locken, Vers and Fresca — three fragrance expressions from Feminista, each matured for nearly 180 days.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Feminista — Modern Femininity, Composed",
    description: "A presence composed in scent. Discover Locken, Vers and Fresca, the Signature Collection of Feminista.",
    url: "/",
    siteName: "Feminista",
    type: "website",
  },
};

export default async function Home() {
  const products = await getProducts();
  const collection = products.filter((p) => p.family !== "set");
  const discoverySet = products.find((p) => p.family === "set");

  return (
    <main>
      <Hero />
      <SignatureCollection products={collection} />
      <HomeBanner />
      <AboutTeaser />
      <FinishingTouch />
      <DiscoverySet product={discoverySet} />
      <HomeReels />
      <HomeFAQ />
    </main>
  );
}
