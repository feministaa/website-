import Link from "next/link";
import Image from "next/image";
import styles from "./page.module.css";
import AnimateIn from "@/components/ui/AnimateIn";
import ProductCard from "@/components/ui/ProductCard";
import { getProducts } from "@/lib/dataStore";

export const metadata = {
  title: "Our Story — Feminista",
  description: "Created for her. Never adapted to her. The story of the House of Feminista.",
  alternates: { canonical: "/our-story" },
  openGraph: {
    title: "Our Story — Feminista",
    description: "Modern femininity, composed. The philosophy and Maison behind Feminista.",
    url: "/our-story",
    type: "website",
  },
};

const PILLARS = [
  {
    title: "Femininity",
    body: "Femininity has no single definition. It can be soft and commanding, graceful and fearless, intimate and entirely individual.",
  },
  {
    title: "Presence",
    body: "Each composition is thoughtfully balanced to complement her presence — not define it. Fragrance should not introduce her. It should leave her remembered.",
  },
  {
    title: "Craftsmanship",
    body: "Crafted with carefully selected ingredients and matured with patience, every fragrance unfolds slowly, revealing depth and character.",
  },
];

export default async function OurStoryPage() {
  const products = await getProducts();
  const collection = products.filter((p) => p.family !== "set").slice(0, 3);

  return (
    <main>
      <nav className={styles.crumb} aria-label="Breadcrumb">
        <Link href="/">Home</Link>
        <span>/</span>
        <span>Our Story</span>
      </nav>

      <section className={styles.intro}>
        <AnimateIn className={styles.introInner}>
          <h1 className={styles.introTitle}>The House of Feminista</h1>
          <p className={styles.introText}>
            Welcome to the House of Feminista: a fragrance house built on a single conviction — that femininity is not
            a silhouette to be perfected, but a spectrum to be expressed, composed and worn on her own terms.
          </p>
          <p className={styles.introText}>
            Founded to compose scent the way a couturier composes a garment, the House first established itself
            around a discipline of restraint: fewer ingredients, chosen with greater care, and given the time they
            need to become something worth remembering.
          </p>
        </AnimateIn>
      </section>

      <section className={styles.storyRow}>
        <AnimateIn className={styles.storyText}>
          <p>
            Every Feminista composition begins with patience. Rare absolutes and naturals are sourced with care, then
            left to mature in quiet stillness for nearly 180 days — long enough for each note to soften into the
            next, until the fragrance no longer smells of ingredients, but of a woman.
          </p>
        </AnimateIn>
        <AnimateIn delay={0.1} className={styles.storyMedia}>
          <div className={styles.storyImgBox}>
            <Image
              src="/images/products/locken-silk.jpg"
              alt="A Feminista Locken bottle resting on silk"
              fill
              className={styles.storyImg}
              sizes="(max-width: 900px) 100vw, 50vw"
            />
          </div>
        </AnimateIn>
      </section>

      <section className={`${styles.storyRow} ${styles.storyRowReverse}`}>
        <AnimateIn className={styles.storyText}>
          <p>
            This patience is not a marketing point — it is the House's only method. We believe a fragrance rushed to
            market is a fragrance left unfinished, and Feminista would rather arrive late than incomplete.
          </p>
        </AnimateIn>
        <AnimateIn delay={0.1} className={styles.storyMedia}>
          <div className={styles.storyImgBox}>
            <Image
              src="/images/banner-gold-liquid.jpg"
              alt="The golden liquid at the heart of a Feminista composition"
              fill
              className={styles.storyImg}
              sizes="(max-width: 900px) 100vw, 50vw"
            />
          </div>
        </AnimateIn>
      </section>

      <section className={styles.storyRow}>
        <AnimateIn className={styles.storyText}>
          <p>
            From rare botanicals to the rarest naturals, every ingredient earns its place. Nothing is added for
            volume — only for the depth, character and signature it leaves behind.
          </p>
        </AnimateIn>
        <AnimateIn delay={0.1} className={styles.storyMedia}>
          <div className={styles.storyImgBox}>
            <Image
              src="/images/products/locken-ingredients.jpg"
              alt="The rare botanicals and naturals matured into every Feminista fragrance"
              fill
              className={styles.storyImg}
              sizes="(max-width: 900px) 100vw, 50vw"
            />
          </div>
        </AnimateIn>
      </section>

      <section className={styles.inspired}>
        <AnimateIn className={styles.header}>
          <span className="eyebrow">Be Inspired</span>
          <h2 className={styles.headerTitle}>Discover the Collection</h2>
        </AnimateIn>
        <div className={styles.inspiredGrid}>
          {collection.map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} tall />
          ))}
        </div>
      </section>

      <section className={styles.pillars}>
        <AnimateIn className={styles.header}>
          <span className="eyebrow">Our Philosophy</span>
          <h2 className={styles.headerTitle}>What Feminista Stands For</h2>
        </AnimateIn>
        <div className={styles.pillarsList}>
          {PILLARS.map((p, i) => (
            <AnimateIn key={p.title} delay={i * 0.08} className={styles.pillarRow}>
              <span className={styles.pillarIndex}>{String(i + 1).padStart(2, "0")}</span>
              <div className={styles.pillarText}>
                <h3 className={styles.pillarTitle}>{p.title}</h3>
                <p className={styles.pillarBody}>{p.body}</p>
              </div>
            </AnimateIn>
          ))}
        </div>
      </section>
    </main>
  );
}
