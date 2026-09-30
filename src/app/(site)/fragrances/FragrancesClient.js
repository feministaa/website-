"use client";

import { useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSearchParams, useRouter } from "next/navigation";
import styles from "./page.module.css";
import AnimateIn from "@/components/ui/AnimateIn";
import FragrancesHero from "./FragrancesHero";
import { useCart } from "@/context/CartContext";

// Page-specific art that overrides a product's own card image.
const ROW_IMAGES = {
  "discovery-set": "/images/products/discovery-set-wine.webp",
};

export default function FragrancesClient({ products }) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const query = searchParams.get("q") || "";
  const { addToCart } = useCart();

  const visible = useMemo(() => {
    let list = products;
    if (query.trim()) {
      const q = query.trim().toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.expression.toLowerCase().includes(q) ||
          p.tagline.toLowerCase().includes(q) ||
          p.shortDescription.toLowerCase().includes(q)
      );
    }
    return list;
  }, [products, query]);

  return (
    <main>
      <FragrancesHero />

      {query && (
        <div className="container" style={{ paddingTop: 30 }}>
          <p style={{ fontSize: 13.5, color: "var(--ink-soft)" }}>
            {visible.length} result{visible.length !== 1 ? "s" : ""} for &ldquo;{query}&rdquo;{" "}
            <button
              onClick={() => router.push("/fragrances")}
              style={{ textDecoration: "underline", color: "var(--gold-deep)" }}
            >
              Clear
            </button>
          </p>
        </div>
      )}

      {visible.length === 0 ? (
        <p className={styles.empty}>No fragrances match &ldquo;{query}&rdquo; yet.</p>
      ) : (
        <div id="collection" className={styles.rowsList}>
          {visible.map((product, i) => (
            <div
              key={product.id}
              className={`${styles.productRow} ${styles.productRowSticky} ${i % 2 === 1 ? styles.productRowReverse : ""}`}
              style={{ zIndex: i + 1 }}
            >
              <div className={styles.productMedia}>
                <div className={styles.productImgBox}>
                  <Image
                    src={ROW_IMAGES[product.slug] || product.cardImage || product.images?.[0]}
                    alt={product.name}
                    fill
                    className={styles.productImg}
                    sizes="(max-width: 900px) 100vw, 50vw"
                  />
                </div>
              </div>
              <div className={styles.productContent}>
                <span className={styles.productExpr}>{product.expression}</span>
                <h2 className={styles.productName}>{product.name}</h2>
                <p className={styles.productTagline}>{product.tagline}</p>
                <p className={styles.productDesc}>{product.shortDescription}</p>
                <div className={styles.productActions}>
                  <button
                    className={styles.discoverLink}
                    disabled={product.comingSoon}
                    onClick={() => addToCart(product, product.sizes[product.sizes.length - 1], 1)}
                  >
                    {product.comingSoon ? "Coming Soon" : "Add to Cart"}
                  </button>
                  <Link href={`/fragrances/${product.slug}`} className={styles.discoverLink}>
                    Discover {product.name}
                    <svg width="15" height="10" viewBox="0 0 15 10" fill="none">
                      <path d="M0 5H14M14 5L9.5 0.5M14 5L9.5 9.5" stroke="currentColor" strokeWidth="1.3" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
