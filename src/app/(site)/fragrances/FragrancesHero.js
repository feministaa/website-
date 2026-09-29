import Image from "next/image";
import styles from "./FragrancesHero.module.css";

// One wide campaign banner with the intro copy laid over its left side.
const BANNER_IMAGE = "/images/products/trio-light-play.webp";

export default function FragrancesHero() {
  return (
    <section className={styles.section}>
      <div className={styles.banner}>
        <Image
          src={BANNER_IMAGE}
          alt="Locken, Vers and Fresca by Feminista"
          fill
          className={styles.image}
          sizes="100vw"
          priority
        />
        <div className={styles.scrim} />

        <div className={styles.copy}>
          <span className={styles.eyebrow}>The Collection</span>
          <h1 className={styles.title}>
            Three Fragrances.
            <br />
            One House.
          </h1>
          <p className={styles.text}>Each fragrance is a chapter — composed for the many sides of her.</p>
          <a href="#collection" className={styles.link}>
            Explore All
            <svg width="15" height="10" viewBox="0 0 15 10" fill="none">
              <path d="M0 5H14M14 5L9.5 0.5M14 5L9.5 9.5" stroke="currentColor" strokeWidth="1.3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
