import Link from "next/link";
import styles from "./page.module.css";
import AnimateIn from "@/components/ui/AnimateIn";
import HeroVisual from "./HeroVisual";

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

const STEPS = [
  { num: "01", title: "Selection", sub: "Ingredient Sourcing", body: "We source the finest natural materials from around the world, chosen for their purity, origin and aromatic potential." },
  { num: "02", title: "Composition", sub: "Blending", body: "Our perfumers compose each fragrance with care, balancing top, heart and base notes in perfect harmony." },
  { num: "03", title: "Maturation", sub: "180-Day Resting Period", body: "The blend is left to rest for nearly 180 days, allowing each ingredient to yield, soften and deepen naturally." },
  { num: "04", title: "Evaluation", sub: "Refinement", body: "We evaluate the fragrance at every stage, refining and adjusting until it reaches its perfect balance." },
  { num: "05", title: "Bottling", sub: "Final Finishing", body: "Only when complete, the fragrance is filtered, bottled and finished by hand with the utmost care." },
];

const FEATURES = [
  { title: "Composed with Intention", body: "Thoughtfully blended to create a harmonious and evocative signature." },
  { title: "Matured without Haste", body: "Time allows the fragrance to soften, integrate and reveal its truest character." },
  { title: "Finished only when Complete", body: "We finish by hand, releasing each fragrance only when it is perfect." },
];

const PHILOSOPHY = [
  { title: "Composed with intention.", body: "Every note has a purpose." },
  { title: "Matured without haste.", body: "Time brings the composition into harmony." },
  { title: "Finished only when complete.", body: "Nothing leaves the house before it is ready." },
];

export default function ArtOf180Page() {
  return (
    <main>
      <section className={styles.hero}>
        <AnimateIn>
          <span className="eyebrow">The Art of 180</span>
          <h1 className={styles.heroTitle}>Time is our rarest ingredient.</h1>
          <p className={styles.heroSub}>
            Every Feminista fragrance is given nearly 180 days to mature — so you experience its truest, most beautiful self.
          </p>
          <Link href="#process" className="btn btn-primary">
            Explore the Process
          </Link>
        </AnimateIn>
        <HeroVisual />
      </section>

      <div className={styles.intro} id="process">
        <AnimateIn>
          <span className="eyebrow">Crafted Slowly. Remembered Long After.</span>
          <h2 className={styles.introTitle}>The Art of 180 is our signature craftsmanship ritual.</h2>
          <p style={{ color: "var(--ink-soft)" }}>
            A patient, deliberate process where composition, time and precision work together. Nothing is rushed — every
            fragrance is allowed to evolve until its character feels complete.
          </p>
        </AnimateIn>
      </div>

      <div className={styles.timeline}>
        {STEPS.map((step, i) => (
          <AnimateIn key={step.num} delay={i * 0.1} className={styles.step}>
            <div className={styles.stepNum}>{step.num}</div>
            <h3 className={styles.stepTitle}>{step.title}</h3>
            <div className={styles.stepSub}>{step.sub}</div>
            <p className={styles.stepBody}>{step.body}</p>
          </AnimateIn>
        ))}
      </div>

      <section className={styles.daysSection}>
        <AnimateIn>
          <span className="eyebrow">180 Days</span>
          <h2 className={styles.daysTitle}>Not rushed. Never compromised.</h2>
          <p className={styles.daysSub}>
            We believe patience transforms ingredients into emotion. Nearly 180 days of time and care create fragrances that
            linger with depth and grace.
          </p>
          <div className={styles.slider}>
            <div className={styles.sliderFill} style={{ width: "100%" }} />
          </div>
          <div className={styles.sliderMarks}>
            <span>0</span>
            <span>30</span>
            <span>150</span>
            <span>180</span>
          </div>
        </AnimateIn>
      </section>

      <div className={styles.features}>
        {FEATURES.map((f, i) => (
          <AnimateIn key={f.title} delay={i * 0.1} className={styles.featureCard}>
            <div className={styles.featureIcon}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#eb9d1b" strokeWidth="1.4">
                <circle cx="12" cy="12" r="9" />
                <path d="M12 7v5l3.5 2" />
              </svg>
            </div>
            <h3 className={styles.featureTitle}>{f.title}</h3>
            <p className={styles.featureBody}>{f.body}</p>
          </AnimateIn>
        ))}
      </div>

      <section className={styles.philosophy}>
        <AnimateIn style={{ textAlign: "center" }}>
          <span className="eyebrow" style={{ color: "var(--gold-light)" }}>
            Brand Philosophy
          </span>
          <h2 className={styles.philosophyTitle}>The beauty of becoming.</h2>
        </AnimateIn>
        <div className={styles.philosophyGrid}>
          {PHILOSOPHY.map((p, i) => (
            <AnimateIn key={p.title} delay={i * 0.1} className={styles.philosophyItem}>
              <h3>{p.title}</h3>
              <p>{p.body}</p>
            </AnimateIn>
          ))}
        </div>
      </section>

      <section className={styles.closing}>
        <AnimateIn>
          <span className="eyebrow">Some things only time can perfect.</span>
          <h2 className={styles.closingTitle}>Discover three expressions shaped by patience, precision and presence.</h2>
          <div className={styles.actList}>
            <div>
              <strong style={{ fontFamily: "var(--font-serif)", fontSize: 18 }}>Locken</strong>
              <p style={{ fontSize: 12.5, color: "var(--ink-faint)" }}>The Magnetic</p>
            </div>
            <div>
              <strong style={{ fontFamily: "var(--font-serif)", fontSize: 18 }}>Vers</strong>
              <p style={{ fontSize: 12.5, color: "var(--ink-faint)" }}>The Intimate</p>
            </div>
            <div>
              <strong style={{ fontFamily: "var(--font-serif)", fontSize: 18 }}>Fresca</strong>
              <p style={{ fontSize: 12.5, color: "var(--ink-faint)" }}>The Luminous</p>
            </div>
          </div>
          <Link href="/fragrances" className="btn btn-primary">
            Discover the Collection
          </Link>
        </AnimateIn>
      </section>
    </main>
  );
}
