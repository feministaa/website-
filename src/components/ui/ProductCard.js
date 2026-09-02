"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import styles from "./ProductCard.module.css";
import ScentBottle from "./ScentBottle";
import { formatINR } from "@/lib/format";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { useToast } from "@/context/ToastContext";

export default function ProductCard({ product, index = 0, minimal = false }) {
  const { addToCart } = useCart();
  const { toggleWishlist, isWishlisted } = useWishlist();
  const { showToast } = useToast();
  const wished = isWishlisted(product.id);
  const [hovering, setHovering] = useState(false);

  function handleAdd(e) {
    if (product.comingSoon) return;
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

  const metaContent = (
    <div className={styles.meta}>
      <div className={styles.expression}>{product.expression}</div>
      <h3 className={styles.name}>{product.name}</h3>
      <p className={styles.tagline}>{product.tagline}</p>
      <div className={styles.priceRow} style={product.comingSoon ? { visibility: "hidden" } : undefined}>
        {product.compareAtPrice ? <span className={styles.compareAt}>{formatINR(product.compareAtPrice)}</span> : null}
        <span>{formatINR(product.price)}</span>
      </div>
      <div className={styles.actions}>
        <button className="btn btn-outline" onClick={handleAdd}>
          {product.comingSoon ? "Coming Soon" : hovering ? "Add to Cart" : "Shop Now"}
        </button>
      </div>
    </div>
  );

  return (
    <Link
      href={`/fragrances/${product.slug}`}
      className={`${styles.card} ${minimal ? styles.cardMinimal : ""}`}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      <div
        className={`${styles.imageWrap} ${minimal ? styles.imageWrapMinimal : ""}`}
        style={{ background: `linear-gradient(160deg, ${product.accentSoft}55, var(--bg-alt))` }}
      >
        {!product.comingSoon && product.compareAtPrice ? (
          <span className={styles.badge}>Save {Math.round((1 - product.price / product.compareAtPrice) * 100)}%</span>
        ) : null}
        {!minimal && (
          <button className={styles.wishBtn} onClick={handleWishlist} aria-label="Toggle wishlist" aria-pressed={wished}>
            <svg width="19" height="19" viewBox="0 0 24 24" fill={wished ? "#6d1f3a" : "none"} stroke={wished ? "#6d1f3a" : "#090909"} strokeWidth="1.5">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
          </button>
        )}
        {product.family === "set" && !product.images?.length ? (
          <ScentBottle isSet size={150} className={styles.bottle} />
        ) : (
          <Image
            src={(minimal && product.cardImage) || product.images?.[0] || "/images/products/locken-real.jpg"}
            alt={product.name}
            width={340}
            height={424}
            className={styles.productPhoto}
          />
        )}
        {minimal && (
          <>
            <h3 className="sr-only">{product.name}</h3>
            {!product.comingSoon && (
              <button className={styles.quickAddIcon} onClick={handleAdd} aria-label={`Quick add ${product.name}`}>
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
                  <path d="M6 8h12l-1 12.5a1.5 1.5 0 01-1.5 1.5h-7a1.5 1.5 0 01-1.5-1.5L6 8z" />
                  <path d="M9 8V6a3 3 0 016 0v2" />
                  <path d="M12 12v4M10 14h4" />
                </svg>
              </button>
            )}
            <div className={styles.scrimMinimal} />
            <div className={styles.captionMinimal}>
              <span className={styles.captionTagline}>{product.tagline}</span>
              <span className={styles.discoverBtn}>{product.comingSoon ? "Coming Soon" : `Discover ${product.name}`}</span>
            </div>
          </>
        )}
      </div>
      {!minimal && metaContent}
    </Link>
  );
}
