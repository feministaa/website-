"use client";

import Link from "next/link";
import Image from "next/image";
import styles from "./DiscoverySet.module.css";
import AnimateIn from "@/components/ui/AnimateIn";
import { formatINR } from "@/lib/format";
import { useCart } from "@/context/CartContext";

export default function DiscoverySet({ product }) {
  const { addToCart } = useCart();

  return (
    <section className={styles.section}>
      <AnimateIn className={styles.visual}>
        <div className={styles.photoBox}>
          <Image src="/images/products/discovery-set.jpg" alt="The Discovery Set" fill className={styles.visualPhoto} />
        </div>
      </AnimateIn>
      <AnimateIn delay={0.15} className={styles.copy}>
        <span className={styles.kicker}>Discovery Set</span>
        <h2 className={styles.title}>Meet all three</h2>
        <p className={styles.desc}>
          Three scents. One unforgettable you. The Discovery Set brings Locken, Vers and Fresca together in travel-ready
          10ml formats — the easiest way to find your signature.
        </p>

        <div className={styles.purchasePanel}>
          <div className={styles.priceRow}>
            <span className={styles.price}>{formatINR(product.price)}</span>
            {product.compareAtPrice && (
              <span className={styles.compareAt}>{formatINR(product.compareAtPrice)}</span>
            )}
          </div>
          <div className={styles.actions}>
            <button className="btn btn-primary" onClick={() => addToCart(product, product.sizes[0], 1)}>
              Add to Cart
            </button>
            <Link href="/fragrances/discovery-set" className="btn btn-ghost">
              Discover the Set
            </Link>
          </div>
        </div>
      </AnimateIn>
    </section>
  );
}
