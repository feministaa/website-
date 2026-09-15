"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "./SignatureCollection.module.css";
import QuantitySelector from "@/components/ui/QuantitySelector";
import { formatINR } from "@/lib/format";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/context/ToastContext";

function Slide({ product }) {
  const [qty, setQty] = useState(1);
  const { addToCart } = useCart();
  const { showToast } = useToast();
  const size = product.sizes?.[product.sizes.length - 1];

  function handleAdd(e) {
    e.preventDefault();
    e.stopPropagation();
    if (!size) return;
    addToCart(product, size, qty);
    showToast(`${product.name} (${size.label}) added to your bag`);
  }

  return (
    <div className={styles.slide}>
      <Link href={`/fragrances/${product.slug}`} className={styles.slideLink}>
        <Image src={product.cardImage || product.images?.[0]} alt={product.name} fill priority className={styles.slideImage} />
        <div className={styles.scrim} />
      </Link>

      <div className={styles.slideCopy}>
        <span className={styles.slideTagline}>{product.tagline}</span>
        <h2 className={styles.slideName}>{product.name}</h2>
      </div>

      {product.comingSoon || !size ? (
        <Link href={`/fragrances/${product.slug}`} className={styles.comingSoonPill}>
          Coming Soon
        </Link>
      ) : (
        <div className={styles.shopCard}>
          <div className={styles.shopPrice}>
            {product.compareAtPrice && <span className={styles.shopCompareAt}>{formatINR(product.compareAtPrice)}</span>}
            <span>{formatINR(size.price)}</span>
          </div>
          <div className={styles.shopQty}>
            <QuantitySelector value={qty} onChange={setQty} />
          </div>
          <button className={styles.shopAddBtn} onClick={handleAdd}>
            Add to Cart
          </button>
        </div>
      )}
    </div>
  );
}

export default function SignatureCollection({ products }) {
  return (
    <section className={styles.section}>
      {products.map((product) => (
        <Slide key={product.id} product={product} />
      ))}
    </section>
  );
}
