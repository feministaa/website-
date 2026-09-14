import Link from "next/link";
import Image from "next/image";
import styles from "./HomeBanner.module.css";
import AnimateIn from "@/components/ui/AnimateIn";

export default function HomeBanner() {
  return (
    <section className={styles.section}>
      <Image
        src="/images/banner-hero-silk.jpg"
        alt="Feminista Eau de Parfum on silk"
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
