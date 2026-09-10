"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSearchParams, useRouter } from "next/navigation";
import styles from "./page.module.css";
import AnimateIn from "@/components/ui/AnimateIn";
import { useCart } from "@/context/CartContext";

const FILTERS = [
  { key: "all", label: "All Fragrances" },
  { key: "magnetic", label: "Magnetic" },
  { key: "intimate", label: "Intimate" },
  { key: "luminous", label: "Luminous" },
  { key: "set", label: "Discovery Set" },
];

export default function FragrancesClient({ products }) {
  const [filter, setFilter] = useState("all");
  const searchParams = useSearchParams();
  const router = useRouter();
  const query = searchParams.get("q") || "";
  const { addToCart } = useCart();

  const visible = useMemo(() => {
    let list = filter === "all" ? products : products.filter((p) => p.family === filter);
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
  }, [products, filter, query]);

  return (
    <main>
      <nav className={styles.crumb} aria-label="Breadcrumb">
        <Link href="/">Home</Link>
        <span>/</span>
        <span>All Fragrances</span>
      </nav>

      <section className={styles.hero}>
        <AnimateIn className={styles.heroCopy}>
          <h1 className={styles.heroTitle}>All Fragrances</h1>
          <p className={styles.heroSub}>
            Feminista is known for composing modern, expressive fragrances built on patience and craft. Our full
            collection is presented here, including{" "}
            <Link href="/fragrances/locken" className={styles.heroLink}>
              Locken
            </Link>
            ,{" "}
            <Link href="/fragrances/vers" className={styles.heroLink}>
              Vers
            </Link>
            ,{" "}
            <Link href="/fragrances/fresca" className={styles.heroLink}>
              Fresca
            </Link>{" "}
            and the{" "}
            <button className={styles.heroLink} onClick={() => setFilter("set")}>
              Discovery Set
            </button>
            .
          </p>
        </AnimateIn>
      </section>

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

      <div className={styles.toolbar}>
        <div className={styles.filters}>
          {FILTERS.map((f) => (
            <button
              key={f.key}
              className={`${styles.filterBtn} ${filter === f.key ? styles.filterActive : ""}`}
              onClick={() => setFilter(f.key)}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {visible.length === 0 ? (
        <p className={styles.empty}>No fragrances match {query ? `"${query}"` : "this filter"} yet.</p>
      ) : (
        <div className={styles.rowsList}>
          {visible.map((product, i) => (
            <div
              key={product.id}
              className={`${styles.productRow} ${styles.productRowSticky} ${i % 2 === 1 ? styles.productRowReverse : ""}`}
              style={{ zIndex: i + 1 }}
            >
              <div className={styles.productMedia}>
                <div className={styles.productImgBox}>
                  <Image
                    src={product.cardImage || product.images?.[0]}
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
