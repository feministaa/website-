import Link from "next/link";
import Image from "next/image";
import styles from "./FindYourEssence.module.css";

export default function FindYourEssence({ products }) {
  const fragrances = products.filter((p) => p.family !== "set");

  return (
    <section className={styles.section} data-hide-header>
      <Image
        src="/images/collection-banner-cat.webp"
        alt="A woman in a fur coat seated beside a black cat"
        fill
        className={styles.bgImage}
        sizes="100vw"
      />

      {/* The photo's subject sits on the left, so copy and bottles share the open wall on the right. */}
      <div className={styles.panel}>
        <div className={styles.leftCopy}>
          <span className={styles.eyebrow}>The Collection</span>
          <h2 className={styles.title}>Find Your Essence</h2>
          <p className={styles.text}>Each fragrance is a chapter. Explore our collection and discover the one that feels like you.</p>
          <Link href="/fragrances" className={styles.link}>
            Explore All
            <svg width="15" height="10" viewBox="0 0 15 10" fill="none">
              <path d="M0 5H14M14 5L9.5 0.5M14 5L9.5 9.5" stroke="currentColor" strokeWidth="1.3" />
            </svg>
          </Link>
        </div>

        <div className={styles.right}>
          {fragrances.map((product) => (
            <Link key={product.id} href={`/fragrances/${product.slug}`} className={styles.card}>
              <div className={styles.cardImageWrap}>
                <Image
                  src={product.cardImage || product.images?.[0]}
                  alt={product.name}
                  fill
                  className={styles.cardImage}
                  sizes="(max-width: 900px) 45vw, 14vw"
                />
              </div>
              <div className={styles.cardText}>
                <span className={styles.cardName}>{product.name}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
