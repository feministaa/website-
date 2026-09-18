import Hero from "@/components/home/Hero";
import HomeBanner from "@/components/home/HomeBanner";
import CinematicShowcase from "@/components/home/CinematicShowcase";
import AboutTeaser from "@/components/home/AboutTeaser";
import WorldGrid from "@/components/home/WorldGrid";
import GiftReveal from "@/components/home/GiftReveal";
import FindYourEssence from "@/components/home/FindYourEssence";
import HomeReels from "@/components/home/HomeReels";
import NewsletterBanner from "@/components/home/NewsletterBanner";
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

  return (
    <main>
      <Hero />
      <CinematicShowcase products={products.filter((p) => p.family !== "set")} />
      <AboutTeaser
        stacked
        eyebrow="About Us"
        heading="House of Feminista"
        description={
          <>
            Created for her. <em>Never</em> adapted to her. Feminista was born from a belief that femininity has no
            single definition. Each fragrance is composed slowly, matured with patience, and made to reveal a
            different side of her with every wear.
          </>
        }
        image="/images/products/fresca-spray.jpg"
        image2="/images/products/fresca-spray.jpg"
      />
      <HomeBanner />
      <FindYourEssence products={products} />
      <WorldGrid />
      <GiftReveal />
      <HomeReels />
      <NewsletterBanner />
    </main>
  );
}
