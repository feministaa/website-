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
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
        <circle cx="12" cy="8" r="5" />
        <path d="M12 13v8M9 18h6" />
      </svg>
    ),
  },
  {
    title: "Presence",
    body: "Each composition is thoughtfully balanced to complement her presence — not define it. Fragrance should not introduce her. It should leave her remembered.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
        <path d="M12 2l2.4 7.2H22l-6 4.6 2.3 7.2L12 16.4 5.7 21l2.3-7.2-6-4.6h7.6L12 2z" />
      </svg>
    ),
  },
  {
    title: "Craftsmanship",
    body: "Crafted with carefully selected ingredients and matured with patience, every fragrance unfolds slowly, revealing depth and character.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3.5 2" />
      </svg>
    ),
  },
];

const SERVICES = [
  {
    title: "Bottle Refill Program",
    body: "Return your empty Feminista bottle and enjoy 50% off your next refill of the same fragrance.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
        <path d="M9 3h6M10 3v4l-4.5 8A2 2 0 0 0 7.3 18h9.4a2 2 0 0 0 1.8-2.9L14 7V3" />
        <path d="M7 14h10" />
      </svg>
    ),
  },
  {
    title: "Gift Presentation",
    body: "Every order arrives gift-ready, hand-finished in the house's signature wrap — complimentary, always.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
        <rect x="3" y="9" width="18" height="12" rx="1" />
        <path d="M3 13h18M12 9v12" />
        <path d="M12 9c-2-4-7-4-7-1 0 1.4 1.5 1 7 1zM12 9c2-4 7-4 7-1 0 1.4-1.5 1-7 1z" />
      </svg>
    ),
  },
];

export default function OurStoryPage() {
  return (
    <main>
      <section className={styles.hero}>
        <HeroVisual />
        <div className={styles.heroScrim} />
        <AnimateIn className={styles.heroCopy}>
          <span className={styles.kicker}>The House of Feminista</span>
          <h1 className={styles.heroTitle}>
            Created for her.
            <br />
            Never adapted to her.
          </h1>
          <p className={styles.heroSub}>Our story is rooted in purpose, crafted for presence that lingers.</p>
          <Link href="/the-art-of-180" className="btn btn-light">
            Explore the House
          </Link>
        </AnimateIn>
      </section>

      <section className={styles.maison}>
        <span className={styles.watermark} aria-hidden="true">
          F
        </span>
        <AnimateIn className={styles.maisonLabel}>
          <span className={styles.kickerDark}>Modern Femininity, Composed</span>
          <h2 className={styles.maisonTitle}>About Feminista</h2>
          <p className={styles.maisonLead}>Created for her. Never adapted to her.</p>
        </AnimateIn>
        <AnimateIn delay={0.1} className={styles.maisonBody}>
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

      <section className={styles.quoteBand}>
        <span className={styles.quoteMark} aria-hidden="true">
          &ldquo;
        </span>
        <AnimateIn>
          <p className={styles.closingLine}>
            Celebrating the many expressions of modern femininity through fragrance.
          </p>
        </AnimateIn>
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
              <div className={styles.pillarIcon}>{p.icon}</div>
              <div className={styles.pillarText}>
                <h3 className={styles.pillarTitle}>{p.title}</h3>
                <p className={styles.pillarBody}>{p.body}</p>
              </div>
            </AnimateIn>
          ))}
        </div>
      </section>

      <section className={styles.services}>
        <AnimateIn className={styles.header}>
          <span className="eyebrow">In Service</span>
          <h2 className={styles.headerTitle}>Refill Your Signature Scent</h2>
        </AnimateIn>
        <div className={styles.serviceGrid}>
          {SERVICES.map((s, i) => (
            <AnimateIn key={s.title} delay={i * 0.1} className={styles.serviceCard}>
              <div className={styles.serviceIcon}>{s.icon}</div>
              <h3>{s.title}</h3>
              <p>{s.body}</p>
            </AnimateIn>
          ))}
        </div>
        <AnimateIn delay={0.2} className={styles.servicesCta}>
          <Link href="/fragrances" className="btn btn-outline">
            Shop the Collection
          </Link>
        </AnimateIn>
      </section>
    </main>
  );
}
