import Link from "next/link";
import styles from "./AboutTeaser.module.css";
import AnimateIn from "@/components/ui/AnimateIn";

export default function AboutTeaser() {
  return (
    <section className={`section ${styles.section}`}>
      <AnimateIn className={styles.copy}>
        <span className="eyebrow">The House of Feminista</span>
        <h2 className={styles.title}>
          Created for her. <em>Never</em> adapted to her. Feminista was born from a belief that femininity has no
          single definition.
        </h2>
        <div className={styles.footer}>
          <span className={styles.footnote}>Matured for 180 days, every composition.</span>
          <Link href="/our-story" className={styles.link}>
            Discover Our Story
            <svg width="15" height="10" viewBox="0 0 15 10" fill="none">
              <path d="M0 5H14M14 5L9.5 0.5M14 5L9.5 9.5" stroke="currentColor" strokeWidth="1.3" />
            </svg>
          </Link>
        </div>
      </AnimateIn>
    </section>
  );
}
