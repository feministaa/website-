import Link from "next/link";
import styles from "./page.module.css";
import AnimateIn from "@/components/ui/AnimateIn";
import HeroVisual from "./HeroVisual";

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
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#eb9d1b" strokeWidth="1.4">
        <circle cx="12" cy="8" r="5" />
        <path d="M12 13v8M9 18h6" />
      </svg>
    ),
  },
  {
    title: "Presence",
    body: "Each composition is thoughtfully balanced to complement her presence — not define it. Fragrance should not introduce her. It should leave her remembered.",
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#eb9d1b" strokeWidth="1.4">
        <path d="M12 2l2.4 7.2H22l-6 4.6 2.3 7.2L12 16.4 5.7 21l2.3-7.2-6-4.6h7.6L12 2z" />
      </svg>
    ),
  },
  {
    title: "Craftsmanship",
    body: "Crafted with carefully selected ingredients and matured with patience, every fragrance unfolds slowly, revealing depth and character.",
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#eb9d1b" strokeWidth="1.4">
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3.5 2" />
      </svg>
    ),
  },
];

export default function OurStoryPage() {
  return (
    <main>
      <section className={styles.hero}>
        <AnimateIn>
          <span className="eyebrow">The House of Feminista</span>
          <h1 className={styles.heroTitle}>Created for her. Never adapted to her</h1>
          <p className={styles.heroSub}>Our story is rooted in purpose, crafted for presence that lingers.</p>
          <Link href="/the-art-of-180" className="btn btn-primary">
            Explore the House
          </Link>
        </AnimateIn>
        <HeroVisual />
      </section>

      <section className={styles.maison}>
        <AnimateIn>
          <span className="eyebrow">Modern Femininity, Composed</span>
          <h2 className={styles.maisonTitle}>About Feminista</h2>
          <p className={styles.maisonLead}>Created for her. Never adapted to her.</p>
          <p>
            Feminista was born from a belief that femininity has no single definition. It can be soft and commanding,
            graceful and fearless, intimate and entirely individual.
          </p>
          <p>
            Our fragrances are created for women who move through the world on their own terms. Each composition is
            thoughtfully balanced to complement her presence — not define it.
          </p>
          <p>
            Crafted with carefully selected ingredients and matured with patience, every Feminista fragrance unfolds slowly
            on the skin, revealing depth, character and a lasting signature.
          </p>
          <p>
            From quiet everyday rituals to moments that deserve to be remembered, Feminista celebrates every expression of
            the woman wearing it. Because fragrance should not introduce her. It should leave her remembered.
          </p>
        </AnimateIn>
      </section>

      <p className={styles.closingLine}>
        &ldquo;Celebrating the many expressions of modern femininity through fragrance.&rdquo;
      </p>

      <section className={styles.pillars}>
        <AnimateIn className={styles.header}>
          <span className="eyebrow">Our Philosophy</span>
          <h2 className={styles.headerTitle}>What Feminista Stands For</h2>
        </AnimateIn>
        <div className={styles.pillarsGrid}>
          {PILLARS.map((p, i) => (
            <AnimateIn key={p.title} delay={i * 0.1} className={styles.pillar}>
              <div className={styles.pillarIcon}>{p.icon}</div>
              <h3 className={styles.pillarTitle}>{p.title}</h3>
              <p className={styles.pillarBody}>{p.body}</p>
            </AnimateIn>
          ))}
        </div>
      </section>

      <section className={styles.services}>
        <AnimateIn>
          <span className="eyebrow">In Services</span>
          <h2 className={styles.headerTitle}>Refill Your Signature Scent</h2>
        </AnimateIn>
        <div className={styles.serviceGrid}>
          <AnimateIn className={styles.serviceCard}>
            <h3>Bottle Refill Program</h3>
            <p>Return your empty Feminista bottle and enjoy 50% off your next refill of the same fragrance.</p>
          </AnimateIn>
          <AnimateIn delay={0.1} className={styles.serviceCard}>
            <h3>Gift Presentation</h3>
            <p>Every order arrives gift-ready, hand-finished in the house's signature wrap — complimentary, always.</p>
          </AnimateIn>
        </div>
        <div style={{ marginTop: 36 }}>
          <Link href="/fragrances" className="btn btn-outline">
            Shop the Collection
          </Link>
        </div>
      </section>
    </main>
  );
}
