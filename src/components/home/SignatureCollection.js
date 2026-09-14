"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import styles from "./SignatureCollection.module.css";
import AnimateIn from "@/components/ui/AnimateIn";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export default function SignatureCollection({ products }) {
  const sectionRef = useRef(null);
  const rowRef = useRef(null);

  useGSAP(
    () => {
      if (!rowRef.current || !sectionRef.current) return;
      const distance = rowRef.current.scrollWidth - rowRef.current.clientWidth;
      if (distance <= 0) return;

      const tween = gsap.to(rowRef.current, {
        x: -distance,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: () => `+=${distance}`,
          scrub: 1,
          pin: true,
          invalidateOnRefresh: true,
        },
      });

      return () => tween.scrollTrigger?.kill();
    },
    { scope: sectionRef, dependencies: [products] }
  );

  return (
    <section className={styles.section} ref={sectionRef}>
      <AnimateIn className={styles.panel}>
        <h2 className={styles.title}>
          Her, in
          <br />
          Three Acts
        </h2>
        <p className={styles.desc}>
          Three expressions of modern femininity — Locken, Vers and Fresca. Each composed, matured and made entirely
          her own.
        </p>
      </AnimateIn>

      <div className={styles.rowWrap}>
        <div className={styles.row} ref={rowRef}>
          {products.map((product) => (
            <div key={product.id} className={styles.card}>
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
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
