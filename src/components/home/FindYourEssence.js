import Link from "next/link";
import Image from "next/image";
import styles from "./FindYourEssence.module.css";

export default function FindYourEssence({ products }) {
  return (
    <section className={styles.section}>
      <Image
        src="/images/collection-banner-silhouette.webp"
        alt="A woman in flowing dark fabric"
        fill
        className={styles.bgImage}
        sizes="100vw"
      />

      <div className={styles.leftCopy}>
        <span className={styles.eyebrow}>The Collection</span>
        <h2 className={styles.title}>
          Find Your
          <br />
          Essence
        </h2>
        <p className={styles.text}>Each fragrance is a chapter. Explore our collection and discover the one that feels like you.</p>
        <Link href="/fragrances" className={styles.link}>
          Explore All
          <svg width="15" height="10" viewBox="0 0 15 10" fill="none">
            <path d="M0 5H14M14 5L9.5 0.5M14 5L9.5 9.5" stroke="currentColor" strokeWidth="1.3" />
          </svg>
        </Link>
      </div>

      <div className={styles.right}>
        {products.map((product) => (
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
              <span className={styles.cardFamily}>{product.family}</span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
