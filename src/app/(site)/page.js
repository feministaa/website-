import Hero from "@/components/home/Hero";
import SignatureCollection from "@/components/home/SignatureCollection";
import AboutTeaser from "@/components/home/AboutTeaser";
import DiscoverySet from "@/components/home/DiscoverySet";
import ServicesStrip from "@/components/home/ServicesStrip";
import HomeReels from "@/components/home/HomeReels";
import Testimonials from "@/components/home/Testimonials";
import products from "@/data/products.json";

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

export default function Home() {
  const collection = products.filter((p) => p.family !== "set");
  const discoverySet = products.find((p) => p.family === "set");

  return (
    <main>
      <Hero />
      <AboutTeaser />
      <SignatureCollection products={collection} />
      <DiscoverySet product={discoverySet} />
      <ServicesStrip />
      <HomeReels />
      <Testimonials />
    </main>
  );
}
