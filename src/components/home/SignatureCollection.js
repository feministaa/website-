"use client";

import Link from "next/link";
import Image from "next/image";
import styles from "./SignatureCollection.module.css";
import AnimateIn from "@/components/ui/AnimateIn";
import Tilt from "@/components/ui/Tilt";

export default function SignatureCollection({ products }) {
  return (
    <section className={styles.section}>
      <div className={styles.row}>
        {products.map((product, i) => (
          <AnimateIn key={product.id} delay={i * 0.12} className={styles.card}>
            <Tilt rotationFactor={5} springOptions={{ stiffness: 260, damping: 20 }} className={styles.tilt}>
              <Link href={`/fragrances/${product.slug}`} className={styles.cardLink}>
                <Image
                  src={product.cardImage || product.images?.[0]}
                  alt={product.name}
                  fill
                  className={styles.cardImage}
                />
                <div className={styles.scrim} />
                <div className={styles.cardCopy}>
                  <span className={styles.cardTagline}>{product.tagline}</span>
                  <span className={styles.cardLabel}>{product.name}</span>
                  <span className={styles.discover}>{product.comingSoon ? "Coming Soon" : `Discover ${product.name}`}</span>
                </div>
              </Link>
            </Tilt>
          </AnimateIn>
        ))}
      </div>
    </section>
  );
}
