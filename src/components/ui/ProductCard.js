"use client";

import Link from "next/link";
import { useState } from "react";
import styles from "./ProductCard.module.css";
import ScentBottle from "./ScentBottle";
import { formatINR } from "@/lib/format";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { useToast } from "@/context/ToastContext";

export default function ProductCard({ product, index = 0 }) {
  const { addToCart } = useCart();
  const { toggleWishlist, isWishlisted } = useWishlist();
  const { showToast } = useToast();
  const wished = isWishlisted(product.id);
  const [hovering, setHovering] = useState(false);

  function handleAdd(e) {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, product.sizes[product.sizes.length - 1], 1);
  }

  function handleWishlist(e) {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product.id);
    showToast(wished ? `Removed ${product.name} from wishlist` : `Added ${product.name} to wishlist`);
  }

  return (
    <Link
      href={`/fragrances/${product.slug}`}
      className={styles.card}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      <div className={styles.imageWrap} style={{ background: `linear-gradient(160deg, ${product.accentSoft}55, var(--bg-alt))` }}>
        {product.compareAtPrice ? <span className={styles.badge}>Save {Math.round((1 - product.price / product.compareAtPrice) * 100)}%</span> : null}
        <button className={styles.wishBtn} onClick={handleWishlist} aria-label="Toggle wishlist" aria-pressed={wished}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill={wished ? "#a3453b" : "none"} stroke={wished ? "#a3453b" : "#1d1a15"} strokeWidth="1.6">
            <path d="M12 21s-6.7-4.35-9.3-8.1C1 10.2 1.8 6.5 5 5.1c2.2-1 4.6-.2 6 1.6 1.4-1.8 3.8-2.6 6-1.6 3.2 1.4 4 5.1 2.3 7.8C18.7 16.65 12 21 12 21z" />
          </svg>
        </button>
        <ScentBottle accent={product.accent} accentSoft={product.accentSoft} size={150} isSet={product.family === "set"} className={styles.bottle} />
      </div>
      <div className={styles.meta}>
        <div className={styles.expression}>{product.expression}</div>
        <h3 className={styles.name}>{product.name}</h3>
        <p className={styles.tagline}>{product.tagline}</p>
        <div className={styles.priceRow}>
          {product.compareAtPrice ? <span className={styles.compareAt}>{formatINR(product.compareAtPrice)}</span> : null}
          <span>{formatINR(product.price)}</span>
        </div>
        <div className={styles.actions}>
          <button className="btn btn-outline" onClick={handleAdd}>
            {hovering ? "Add to Cart" : "Shop Now"}
          </button>
        </div>
      </div>
    </Link>
  );
}
