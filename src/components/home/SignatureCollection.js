import Link from "next/link";
import Image from "next/image";
import styles from "./SignatureCollection.module.css";
import AnimateIn from "@/components/ui/AnimateIn";

export default function SignatureCollection({ products }) {
  return (
    <section className={styles.section}>
      {products.map((product, i) => {
        const reversed = i % 2 === 1;
        return (
          <div key={product.id} className={`${styles.row} ${reversed ? styles.rowReverse : ""}`}>
            <AnimateIn className={styles.imageCol}>
              <Link href={`/fragrances/${product.slug}`} className={styles.imageLink}>
                <Image
                  src={product.cardImage || product.images?.[0]}
                  alt={product.name}
                  fill
                  className={styles.image}
                />
              </Link>
            </AnimateIn>
            <AnimateIn delay={0.1} className={styles.contentCol}>
              <span className={styles.tagline}>{product.tagline}</span>
              <h2 className={styles.name}>{product.name}</h2>
              <Link href={`/fragrances/${product.slug}`} className={styles.discover}>
                {product.comingSoon ? "Coming Soon" : `Discover ${product.name}`}
              </Link>
            </AnimateIn>
          </div>
        );
      })}
    </section>
  );
}
