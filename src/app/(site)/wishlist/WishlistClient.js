"use client";

import Link from "next/link";
import products from "@/data/products.json";
import { useWishlist } from "@/context/WishlistContext";
import ProductCard from "@/components/ui/ProductCard";
import ScentBottle from "@/components/ui/ScentBottle";
import AnimateIn from "@/components/ui/AnimateIn";
import styles from "./page.module.css";

export default function WishlistClient() {
  const { ids } = useWishlist();
  const items = products.filter((p) => ids.includes(p.id));

  return (
    <main className="container" style={{ padding: "56px 24px 100px" }}>
      <AnimateIn>
        <h1 style={{ fontSize: "clamp(28px, 3.6vw, 40px)", marginBottom: 12 }}>Your Wishlist</h1>
        <p style={{ color: "var(--ink-soft)", marginBottom: 44 }}>
          {items.length > 0 ? `${items.length} fragrance${items.length > 1 ? "s" : ""} saved for later.` : "Nothing saved yet."}
        </p>
      </AnimateIn>

      {items.length === 0 ? (
        <div style={{ textAlign: "center", padding: "60px 0" }}>
          <ScentBottle accent="#a87f3f" accentSoft="#e7d6ad" size={140} />
          <p style={{ margin: "20px 0 26px", color: "var(--ink-soft)" }}>
            Tap the heart on any fragrance to save it here.
          </p>
          <Link href="/fragrances" className="btn btn-primary">
            Explore Fragrances
          </Link>
        </div>
      ) : (
        <div className={styles.grid}>
          {items.map((product, i) => (
            <AnimateIn key={product.id} delay={i * 0.08}>
              <ProductCard product={product} />
            </AnimateIn>
          ))}
        </div>
      )}
    </main>
  );
}
