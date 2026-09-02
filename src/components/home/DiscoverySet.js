"use client";

import Link from "next/link";
import Image from "next/image";
import styles from "./DiscoverySet.module.css";
import AnimateIn from "@/components/ui/AnimateIn";
import { formatINR } from "@/lib/format";
import { useCart } from "@/context/CartContext";

export default function DiscoverySet({ product, collection = [] }) {
  const { addToCart } = useCart();

  return (
    <section className={styles.section}>
        <AnimateIn className={styles.visual}>
          <Image src="/images/products/discovery-set.jpg" alt="The Discovery Set" fill className={styles.visualPhoto} />
          <span className={styles.badge}>Complete Ritual</span>
        </AnimateIn>
        <AnimateIn delay={0.15} className={styles.copy}>
          <span className={styles.kicker}>Discovery Set</span>
          <h2 className={styles.title}>Meet all three.</h2>
          <p className={styles.desc}>
            Three scents. One unforgettable you. The Discovery Set brings Locken, Vers and Fresca together in travel-ready
            10ml formats — the easiest way to find your signature.
          </p>

          {collection.length > 0 && (
            <div className={styles.contents}>
              <span className={styles.contentsLabel}>What&rsquo;s Inside</span>
              <div className={styles.chips}>
                {collection.map((p) => (
                  <span key={p.id} className={styles.chip}>
                    <span className={styles.chipDot} style={{ background: p.accent }} />
                    {p.name}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div className={styles.priceRow}>
            <span className={styles.price}>{formatINR(product.price)}</span>
            {product.compareAtPrice && <span className={styles.compareAt}>{formatINR(product.compareAtPrice)}</span>}
          </div>
          <div className={styles.actions}>
            <button className="btn btn-primary" onClick={() => addToCart(product, product.sizes[0], 1)}>
              Add to Cart
            </button>
            <Link href="/fragrances/discovery-set" className="btn btn-ghost">
              Discover the Set
            </Link>
          </div>
        </AnimateIn>
    </section>
  );
}
