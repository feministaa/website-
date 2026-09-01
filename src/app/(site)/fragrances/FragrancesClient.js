"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSearchParams, useRouter } from "next/navigation";
import styles from "./page.module.css";
import ProductCard from "@/components/ui/ProductCard";
import AnimateIn from "@/components/ui/AnimateIn";

const FILTERS = [
  { key: "all", label: "All Fragrances" },
  { key: "magnetic", label: "Magnetic" },
  { key: "intimate", label: "Intimate" },
  { key: "luminous", label: "Luminous" },
  { key: "set", label: "Discovery Set" },
];

export default function FragrancesClient({ products }) {
  const [filter, setFilter] = useState("all");
  const [sort, setSort] = useState("featured");
  const searchParams = useSearchParams();
  const router = useRouter();
  const query = searchParams.get("q") || "";

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
    list = [...list];
    if (sort === "price-asc") list.sort((a, b) => a.price - b.price);
    if (sort === "price-desc") list.sort((a, b) => b.price - a.price);
    if (sort === "name") list.sort((a, b) => a.name.localeCompare(b.name));
    return list;
  }, [products, filter, sort, query]);

  return (
    <main>
      <section className={styles.hero}>
        <AnimateIn>
          <span className="eyebrow">The Collection</span>
          <h1 className={styles.heroTitle}>Her, in Three Acts</h1>
          <p style={{ color: "var(--ink-soft)", maxWidth: 420, marginBottom: 26 }}>
            A dedicated space for Locken, Vers, Fresca and the Discovery Set — three compositions, three expressions of her.
          </p>
          <button className="btn btn-primary" onClick={() => setFilter("all")}>
            Explore All
          </button>
        </AnimateIn>
        <AnimateIn delay={0.15} className={styles.heroVisual}>
          <Image src="/images/products/discovery-set.jpg" alt="The Discovery Set" fill className={styles.heroVisualPhoto} />
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
        <select className={styles.sortSelect} value={sort} onChange={(e) => setSort(e.target.value)}>
          <option value="featured">Sort: Featured</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="name">Name: A–Z</option>
        </select>
      </div>

      {visible.length === 0 ? (
        <p className={styles.empty}>No fragrances match {query ? `"${query}"` : "this filter"} yet.</p>
      ) : (
        <div className={styles.grid}>
          {visible.map((product, i) => (
            <AnimateIn key={product.id} delay={(i % 4) * 0.08}>
              <ProductCard product={product} />
            </AnimateIn>
          ))}
        </div>
      )}

      <div className={styles.banner}>
        <AnimateIn>
          <span className="eyebrow">Still deciding?</span>
          <h2 className={styles.bannerTitle}>Discover your signature.</h2>
          <p className={styles.bannerSub}>Answer a few questions and find the scent that feels unmistakably you.</p>
          <Link href="/the-art-of-180" className="btn btn-gold">
            Find My Scent
          </Link>
        </AnimateIn>
      </div>
    </main>
  );
}
