import Link from "next/link";
import Image from "next/image";
import styles from "./AboutTeaser.module.css";
import AnimateIn from "@/components/ui/AnimateIn";

export default function AboutTeaser({
  reverse = false,
  stacked = false,
  eyebrow = "The House of Feminista",
  heading = (
    <>
      Created for her. <em>Never</em> adapted to her. Feminista was born from a belief that femininity has no single
      definition.
    </>
  ),
  description = null,
  image = "/images/products/fresca-spray.jpg",
  image2 = null,
}) {
  const copy = (
    <AnimateIn className={styles.copy}>
      <span className="eyebrow">{eyebrow}</span>
      <h2 className={styles.title}>{heading}</h2>
      {description && <p className={styles.description}>{description}</p>}
      <div className={styles.footer}>
        <Link href="/our-story" className={styles.link}>
          Discover Our Story
          <svg width="15" height="10" viewBox="0 0 15 10" fill="none">
            <path d="M0 5H14M14 5L9.5 0.5M14 5L9.5 9.5" stroke="currentColor" strokeWidth="1.3" />
          </svg>
        </Link>
      </div>
    </AnimateIn>
  );

  if (stacked) {
    return (
      <section className={`section ${styles.gridSection}`}>
        <div className={styles.gridLeft}>
          <div className={styles.gridContentRow}>{copy}</div>
          <AnimateIn delay={0.1} className={styles.gridImageRow}>
            <Image src={image} alt={eyebrow} fill className={styles.image} sizes="(max-width: 900px) 100vw, 25vw" />
          </AnimateIn>
        </div>
        <AnimateIn delay={0.15} className={styles.gridRight}>
          <Image src={image2 || image} alt={eyebrow} fill className={styles.image} sizes="(max-width: 900px) 100vw, 50vw" />
        </AnimateIn>
      </section>
    );
  }

  return (
    <section className={`section ${styles.section} ${reverse ? styles.reverse : ""}`}>
      {copy}

      <AnimateIn delay={0.1} className={styles.imageBox}>
        <Image src={image} alt={eyebrow} fill className={styles.image} sizes="(max-width: 900px) 100vw, 45vw" />
      </AnimateIn>
    </section>
  );
}
