import Link from "next/link";
import Image from "next/image";
import styles from "./FragrancesHero.module.css";

export default function FragrancesHero({ products }) {
  const collection = products.filter((p) => p.family !== "set").slice(0, 3);
  const [large, top, bottom] = collection;

  return (
    <section className={styles.section}>
      <div className={styles.copy}>
        <span className="eyebrow">The Collection</span>
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

      {large && (
        <Link href={`/fragrances/${large.slug}`} className={styles.bentoLarge}>
          <Image
            src={large.cardImage || large.images?.[0]}
            alt={large.name}
            fill
            className={styles.image}
            sizes="(max-width: 1100px) 100vw, 38vw"
            priority
          />
        </Link>
      )}

      <div className={styles.bentoStack}>
        {top && (
          <Link href={`/fragrances/${top.slug}`} className={styles.bentoSmall}>
            <Image
              src={top.cardImage || top.images?.[0]}
              alt={top.name}
              fill
              className={styles.image}
              sizes="(max-width: 1100px) 50vw, 28vw"
            />
          </Link>
        )}
        {bottom && (
          <Link href={`/fragrances/${bottom.slug}`} className={styles.bentoSmall}>
            <Image
              src={bottom.cardImage || bottom.images?.[0]}
              alt={bottom.name}
              fill
              className={styles.image}
              sizes="(max-width: 1100px) 50vw, 28vw"
            />
          </Link>
        )}
      </div>
    </section>
  );
}
