import Link from "next/link";
import Image from "next/image";
import { formatINR } from "@/lib/format";
import styles from "./DiscoveryFeature.module.css";

// Full-width campaign banner for the Discovery Set; the copy sits on the open wine wall on the left.
export default function DiscoveryFeature({ product }) {
  if (!product) return null;
  const price = product.sizes?.[0]?.price;

  return (
    <section className={styles.section} data-hide-header>
      <div className={styles.banner}>
        <Image
          src="/images/discovery-set-banner.webp"
          alt="The Feminista Discovery Set case beside three travel sprays"
          fill
          className={styles.img}
          sizes="100vw"
        />
        <div className={styles.scrim} aria-hidden="true" />

        <div className={styles.copy}>
          <span className={styles.eyebrow}>The Discovery Set</span>
          <h2 className={styles.title}>Locken, Vers and Fresca, together.</h2>
          <p className={styles.text}>
            Three travel sprays in one leather case. Try each for a few days before choosing your bottle.
          </p>

          <div className={styles.buy}>
            <Link href={`/fragrances/${product.slug}`} className={styles.cta}>
              Shop the Discovery Set
            </Link>
            {price && <span className={styles.price}>{formatINR(price)}</span>}
          </div>
        </div>
      </div>
    </section>
  );
}
