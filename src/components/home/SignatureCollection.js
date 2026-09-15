import Link from "next/link";
import Image from "next/image";
import styles from "./SignatureCollection.module.css";

export default function SignatureCollection({ products }) {
  return (
    <section className={styles.section}>
      {products.map((product) => (
        <Link key={product.id} href={`/fragrances/${product.slug}`} className={styles.slide}>
          <Image
            src={product.cardImage || product.images?.[0]}
            alt={product.name}
            fill
            priority
            className={styles.slideImage}
          />
          <div className={styles.scrim} />
          <div className={styles.slideCopy}>
            <span className={styles.slideTagline}>{product.tagline}</span>
            <h2 className={styles.slideName}>{product.name}</h2>
            <span className={styles.discover}>
              {product.comingSoon ? "Coming Soon" : `Discover ${product.name}`}
            </span>
          </div>
        </Link>
      ))}
    </section>
  );
}
