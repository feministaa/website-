import Link from "next/link";
import Image from "next/image";
import { formatINR } from "@/lib/format";
import styles from "./DiscoveryFeature.module.css";

// The low-commitment first purchase: all three fragrances in travel sizes.
export default function DiscoveryFeature({ product }) {
  if (!product) return null;
  const size = product.sizes?.[0];

  return (
    <section className={styles.section}>
      <div className={styles.media}>
        <Image
          src={product.cardImage || product.images?.[0]}
          alt={product.name}
          fill
          className={styles.img}
          sizes="(max-width: 900px) 100vw, 50vw"
        />
      </div>
      <div className={styles.copy}>
        <span className={styles.eyebrow}>New to Feminista?</span>
        <h2 className={styles.title}>
          Begin with <em>all three</em>
        </h2>
        <p className={styles.text}>
          Locken, Vers and Fresca in travel sizes — wear each for a few days and find the one that feels like you.
        </p>
        {size && (
          <p className={styles.price}>
            {size.label} · {formatINR(size.price)}
          </p>
        )}
        <Link href={`/fragrances/${product.slug}`} className={styles.cta}>
          Shop the Discovery Set
        </Link>
      </div>
    </section>
  );
}
