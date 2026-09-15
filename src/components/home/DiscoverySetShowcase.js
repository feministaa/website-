"use client";

import Link from "next/link";
import Image from "next/image";
import styles from "./DiscoverySetShowcase.module.css";
import AnimateIn from "@/components/ui/AnimateIn";
import QuantitySelector from "@/components/ui/QuantitySelector";
import { formatINR } from "@/lib/format";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/context/ToastContext";
import { useState } from "react";

export default function DiscoverySetShowcase({ product }) {
  const [qty, setQty] = useState(1);
  const { addToCart } = useCart();
  const { showToast } = useToast();
  if (!product) return null;
  const size = product.sizes?.[0];

  function handleAdd() {
    if (!size) return;
    addToCart(product, size, qty);
    showToast(`${product.name} added to your bag`);
  }

  return (
    <section className={styles.section}>
      <AnimateIn className={styles.imageCol}>
        <Image src={product.images?.[0]} alt={product.name} fill className={styles.image} />
      </AnimateIn>
      <AnimateIn delay={0.1} className={styles.contentCol}>
        <span className={styles.eyebrow}>The Discovery Set</span>
        <h2 className={styles.title}>{product.tagline}</h2>
        <p className={styles.desc}>{product.shortDescription}</p>
        <div className={styles.priceRow}>
          {product.compareAtPrice && <span className={styles.compareAt}>{formatINR(product.compareAtPrice)}</span>}
          <span className={styles.price}>{formatINR(size?.price)}</span>
        </div>
        <div className={styles.actions}>
          <QuantitySelector value={qty} onChange={setQty} />
          <button className="btn btn-primary" onClick={handleAdd}>
            Add to Cart
          </button>
        </div>
        <Link href={`/fragrances/${product.slug}`} className={styles.viewLink}>
          View Full Details
        </Link>
      </AnimateIn>
    </section>
  );
}
