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
        <span className="eyebrow">180 Days in the Making</span>
        <h2 className={styles.title}>Made to be remembered</h2>
        <p className={styles.desc}>
          Every Feminista fragrance is matured for nearly 180 days before it ever reaches you — patience, poured into
          every bottle.
        </p>
        <Link href="/the-art-of-180" className="btn btn-light">
          Explore the Art of 180
        </Link>
      </AnimateIn>
    </section>
  );
}
