import Link from "next/link";
import Image from "next/image";
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
  {
    title: "Selection",
    sub: "Ingredient Sourcing",
    body: "Rare, pure materials — sourced for character, not convenience.",
  },
  {
    title: "Composition",
    sub: "Blending",
    body: "Top, heart and base notes, balanced into harmony.",
  },
  {
    title: "Maturation",
    sub: "180-Day Resting Period",
    body: "Nearly 180 days of rest — softened, deepened, complete.",
  },
  {
    title: "Evaluation",
    sub: "Refinement",
    body: "Refined and adjusted until the balance feels right.",
  },
  {
    title: "Bottling",
    sub: "Final Finishing",
    body: "Filtered, bottled and finished entirely by hand.",
  },
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
        <HeroVisual />
        <div className={styles.heroScrim} />
        <AnimateIn className={styles.heroCopy}>
          <span className={styles.heroKicker}>The Art of 180</span>
          <h1 className={styles.heroTitle}>Time is our rarest ingredient</h1>
          <p className={styles.heroSub}>
            Every Feminista fragrance is given nearly 180 days to mature — so you experience its truest self.
          </p>
          <Link href="#process" className="btn btn-light">
            Explore the Process
          </Link>
        </AnimateIn>
      </section>

      <div className={styles.intro} id="process">
        <span className={styles.introWatermark} aria-hidden="true">
          180
        </span>
        <AnimateIn className={styles.introInner}>
          <span className={styles.introKicker}>Crafted Slowly. Remembered Long After.</span>
          <h2 className={styles.introTitle}>The Art of 180 is our signature craftsmanship ritual</h2>
          <p className={styles.introBody}>Composition, time and precision, working in patient harmony.</p>
        </AnimateIn>
      </div>

      <div className={styles.processTrack}>
        {STEPS.map((step, i) => (
          <AnimateIn key={step.title} delay={i * 0.08} className={styles.processRow}>
            <span className={styles.processIndex}>{String(i + 1).padStart(2, "0")}</span>
            <h3 className={styles.processTitle}>{step.title}</h3>
            <span className={styles.processSub}>{step.sub}</span>
            <p className={styles.processBody}>{step.body}</p>
          </AnimateIn>
        ))}
      </div>

      <AnimateIn className={styles.plate}>
        <Image
          src="/images/products/locken-ingredients.jpg"
          alt="The rare botanicals matured into every Feminista fragrance"
          fill
          className={styles.plateImg}
          sizes="100vw"
        />
      </AnimateIn>

      <section className={styles.philosophy}>
        <AnimateIn className={styles.header}>
          <span className="eyebrow" style={{ color: "var(--gold-light)" }}>
            Brand Philosophy
          </span>
          <h2 className={styles.philosophyTitle}>The beauty of becoming</h2>
        </AnimateIn>
        <div className={styles.philosophyList}>
          {PHILOSOPHY.map((p, i) => (
            <AnimateIn key={p.title} delay={i * 0.1} className={styles.philosophyRow}>
              <h3 className={styles.philosophyRowTitle}>{p.title}</h3>
              <p className={styles.philosophyRowBody}>{p.body}</p>
            </AnimateIn>
          ))}
        </div>
      </section>

      <section className={styles.quoteBand}>
        <AnimateIn>
          <span className={styles.quoteMark} aria-hidden="true">
            &ldquo;
          </span>
          <p className={styles.quoteLine}>Some things only time can perfect.</p>
        </AnimateIn>
      </section>

      <section className={styles.closing}>
        <AnimateIn className={styles.header}>
          <h2 className={styles.closingTitle}>Three expressions, shaped by patience</h2>
          <div className={styles.actList}>
            <div>
              <strong className={styles.actName}>Locken</strong>
              <p className={styles.actExpr}>The Magnetic</p>
            </div>
            <div>
              <strong className={styles.actName}>Vers</strong>
              <p className={styles.actExpr}>The Intimate</p>
            </div>
            <div>
              <strong className={styles.actName}>Fresca</strong>
              <p className={styles.actExpr}>The Luminous</p>
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
