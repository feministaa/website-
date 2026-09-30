import Link from "next/link";
import Image from "next/image";
import styles from "./HomeBanner.module.css";
import AnimateIn from "@/components/ui/AnimateIn";

// `fullScreen` makes it an edge-to-edge, full-height banner (used on Our Story).
export default function HomeBanner({ fullScreen = false }) {
  return (
    <section
      className={`${styles.section} ${fullScreen ? styles.fullScreen : ""}`}
      data-hide-header={fullScreen || undefined}
    >
      <Image
        src="/images/art-of-180-locken-loom.webp"
        alt="Feminista Locken on folded linen beside a hand spindle"
        fill
        className={styles.image}
      />
      <div className={styles.scrim} />
      <AnimateIn className={styles.copy}>
        <span className={styles.tagline}>180 days in the making.</span>
        <h2 className={styles.title}>Made to be remembered</h2>
        <Link href="/the-art-of-180" className={styles.discover}>
          Explore the Art of 180
        </Link>
      </AnimateIn>
    </section>
  );
}
