import Link from "next/link";
import Image from "next/image";
import styles from "./page.module.css";
import AnimateIn from "@/components/ui/AnimateIn";
import { getProducts } from "@/lib/dataStore";
import PhaseCarousel from "./PhaseCarousel";

export const metadata = {
  title: "The Art of 180 — Feminista",
  description: "Time is our rarest ingredient. Every Feminista fragrance is given nearly 180 days to mature.",
  alternates: { canonical: "/the-art-of-180" },
  openGraph: {
    title: "The Art of 180 — Feminista",
    description: "Crafted slowly. Remembered long after. Discover the Feminista craftsmanship ritual.",
    url: "/the-art-of-180",
    type: "website",
  },
};

// One banner per phase, shown in the carousel. Maturation carries the 180-day highlight.
const PHASES = [
  {
    title: "Selection",
    body: "Rare, pure materials, sourced for character rather than convenience.",
    image: "/images/products/ingredients-amber-vanilla.webp",
    alt: "Amber, vanilla and cinnamon on black",
  },
  {
    title: "Composition",
    body: "Top, heart and base notes, balanced by hand into a single accord.",
    image: "/images/products/locken-ingredients.jpg",
    alt: "Botanicals and fruit arranged in low light",
  },
  {
    title: "Maturation",
    highlight: "180 days of rest",
    body: "The composition is left alone until the notes soften, deepen and settle into each other.",
    image: "/images/showcase/locken-driftwood-bg.webp",
    alt: "Locken resting on weathered driftwood among almonds and coffee",
  },
  {
    title: "Evaluation",
    body: "Assessed and refined until the balance feels right. If it is not ready, it waits longer.",
    image: "/images/art-of-180-lab.webp",
    alt: "A gloved hand at work beside a bottle of Feminista Locken",
  },
  {
    title: "Bottling",
    body: "Filtered, bottled and finished by hand. Only then does it leave the House.",
    image: "/images/products/trio-light-play.webp",
    alt: "Locken, Vers and Fresca lying in slanted light",
  },
];

export default async function ArtOf180Page() {
  const products = (await getProducts()).filter((p) => p.family !== "set").slice(0, 3);

  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <Image
          src="/images/art-of-180-locken-loom.webp"
          alt="Feminista Locken on folded linen beside a hand spindle"
          fill
          priority
          className={styles.cover}
          sizes="100vw"
        />
        <div className={styles.heroShade} />
        <AnimateIn className={styles.heroCopy}>
          <span className={styles.label}>The Art of 180</span>
          <h1 className={styles.heroTitle}>Time is our rarest ingredient</h1>
        </AnimateIn>
      </section>

      <section className={styles.interlude}>
        <AnimateIn>
          <p className={styles.interludeText}>Nearly six months. One composition. No shortcuts.</p>
        </AnimateIn>
      </section>

      <PhaseCarousel phases={PHASES} />

      <section className={styles.quote}>
        <AnimateIn>
          <p className={styles.quoteText}>Some things only time can perfect.</p>
        </AnimateIn>
      </section>

      {products.length > 0 && (
        <section className={styles.closing}>
          <AnimateIn className={styles.closingHead}>
            <span className={styles.label}>The collection</span>
            <h2 className={styles.closingTitle}>Three expressions, shaped by patience</h2>
          </AnimateIn>
          <div className={styles.cards}>
            {products.map((p, i) => (
              <AnimateIn key={p.id} delay={i * 0.08}>
                <Link href={`/fragrances/${p.slug}`} className={styles.card}>
                  <div className={styles.cardMedia}>
                    <Image
                      src={p.cardImage || p.images?.[0]}
                      alt={p.name}
                      fill
                      className={styles.cardImg}
                      sizes="(max-width: 900px) 100vw, 30vw"
                    />
                  </div>
                  <span className={styles.cardExpr}>{p.expression}</span>
                  <span className={styles.cardName}>{p.name}</span>
                </Link>
              </AnimateIn>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
