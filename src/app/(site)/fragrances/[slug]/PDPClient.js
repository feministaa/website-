"use client";

import { useState } from "react";
import Link from "next/link";
import styles from "./page.module.css";
import ScentBottle from "@/components/ui/ScentBottle";
import ProductCard from "@/components/ui/ProductCard";
import AnimateIn from "@/components/ui/AnimateIn";
import QuantitySelector from "@/components/ui/QuantitySelector";
import { AccordionItem } from "@/components/ui/Accordion";
import { formatINR } from "@/lib/format";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { useToast } from "@/context/ToastContext";
import { useRouter } from "next/navigation";

export default function PDPClient({ product, related }) {
  const [sizeIdx, setSizeIdx] = useState(product.sizes.length - 1);
  const [qty, setQty] = useState(1);
  const [thumb, setThumb] = useState(0);
  const { addToCart } = useCart();
  const { toggleWishlist, isWishlisted } = useWishlist();
  const { showToast } = useToast();
  const router = useRouter();
  const wished = isWishlisted(product.id);
  const size = product.sizes[sizeIdx];

  function handleAddToCart() {
    addToCart(product, size, qty);
    showToast(`${product.name} (${size.label}) added to your bag`);
  }

  function handleQuickCheckout() {
    addToCart(product, size, qty, { silent: true });
    router.push("/checkout");
  }

  return (
    <main>
      <div className={styles.breadcrumb}>
        <Link href="/">Home</Link>
        <span>/</span>
        <Link href="/fragrances">Fragrances</Link>
        <span>/</span>
        <span style={{ color: "var(--ink)" }}>{product.name}</span>
      </div>

      <div className={styles.top}>
        <AnimateIn className={styles.gallery}>
          <div
            className={styles.mainImage}
            style={{ background: `linear-gradient(160deg, ${product.accentSoft}66, var(--bg-alt))` }}
          >
            <ScentBottle accent={product.accent} accentSoft={product.accentSoft} size={280} isSet={product.family === "set"} />
          </div>
          <div className={styles.thumbRow}>
            {[0, 1, 2, 3].map((i) => (
              <button
                key={i}
                className={`${styles.thumb} ${thumb === i ? styles.thumbActive : ""}`}
                style={{ background: `linear-gradient(160deg, ${product.accentSoft}66, var(--bg-alt))` }}
                onClick={() => setThumb(i)}
                aria-label={`View image ${i + 1}`}
              >
                <ScentBottle accent={product.accent} accentSoft={product.accentSoft} size={40} isSet={product.family === "set"} />
              </button>
            ))}
          </div>
        </AnimateIn>

        <AnimateIn delay={0.15} className={styles.info}>
          <div className={styles.expression}>{product.expression}</div>
          <h1 className={styles.name}>{product.name}</h1>
          <p className={styles.tagline}>{product.tagline}</p>
          <div className={styles.price}>
            {product.compareAtPrice && (
              <span style={{ textDecoration: "line-through", color: "var(--ink-faint)", fontSize: 16, marginRight: 10 }}>
                {formatINR(product.compareAtPrice)}
              </span>
            )}
            {formatINR(size.price)}
          </div>

          <div className={styles.fieldLabel}>Size</div>
          <div className={styles.sizeRow}>
            {product.sizes.map((s, i) => (
              <button
                key={s.label}
                className={`${styles.sizeBtn} ${sizeIdx === i ? styles.sizeBtnActive : ""}`}
                onClick={() => setSizeIdx(i)}
              >
                {s.label}
              </button>
            ))}
          </div>

          <div className={styles.fieldLabel}>Quantity</div>
          <div className={styles.qtyRow}>
            <QuantitySelector value={qty} onChange={setQty} />
            <span className={styles.stockNote}>In stock · Ships in 2–4 days</span>
          </div>

          <div className={styles.actionRow}>
            <button className="btn btn-primary btn-block" onClick={handleAddToCart}>
              Add to Cart — {formatINR(size.price * qty)}
            </button>
            <button className="btn btn-gold btn-block" onClick={handleQuickCheckout}>
              Quick Checkout
            </button>
            <button
              className="btn btn-ghost btn-block"
              onClick={() => {
                toggleWishlist(product.id);
                showToast(wished ? `Removed ${product.name} from wishlist` : `Added ${product.name} to wishlist`);
              }}
            >
              <span className={styles.wishRow}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill={wished ? "#a3453b" : "none"} stroke={wished ? "#a3453b" : "currentColor"} strokeWidth="1.6">
                  <path d="M12 21s-6.7-4.35-9.3-8.1C1 10.2 1.8 6.5 5 5.1c2.2-1 4.6-.2 6 1.6 1.4-1.8 3.8-2.6 6-1.6 3.2 1.4 4 5.1 2.3 7.8C18.7 16.65 12 21 12 21z" />
                </svg>
                {wished ? "In Your Wishlist" : "Add to Wishlist"}
              </span>
            </button>
          </div>

          <div className={styles.accordionWrap}>
            <AccordionItem title="Product Overview" defaultOpen>
              {product.overview.map((block) => (
                <div key={block.title} style={{ marginBottom: 14 }}>
                  <strong style={{ display: "block", marginBottom: 4, color: "var(--ink)" }}>{block.title}</strong>
                  {block.body}
                </div>
              ))}
            </AccordionItem>
            <AccordionItem title="Fragrance Notes">
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
                <div>
                  <strong style={{ color: "var(--ink)" }}>Top Notes</strong>
                  <p>{product.notes.top.join(" · ")}</p>
                </div>
                <div>
                  <strong style={{ color: "var(--ink)" }}>Heart Notes</strong>
                  <p>{product.notes.heart.join(" · ")}</p>
                </div>
                <div>
                  <strong style={{ color: "var(--ink)" }}>Base Notes</strong>
                  <p>{product.notes.base.join(" · ")}</p>
                </div>
              </div>
            </AccordionItem>
            <AccordionItem title="Ingredients">{product.ingredients}</AccordionItem>
            <AccordionItem title="How to Wear">{product.howToWear}</AccordionItem>
            <AccordionItem title="Shipping & Returns">
              Complimentary shipping across India, delivered in 2–4 business days. Unopened items may be returned within 14
              days of delivery for a full refund.
            </AccordionItem>
          </div>
        </AnimateIn>
      </div>

      {related.length > 0 && (
        <div className={styles.related}>
          <h2 className={styles.relatedTitle}>You may also like</h2>
          <div className={styles.relatedGrid}>
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}

      <div className={styles.banner}>
        <AnimateIn>
          <span className="eyebrow">Still deciding?</span>
          <h2 className={styles.bannerTitle}>Discover your signature.</h2>
          <Link href="/fragrances" className="btn btn-primary" style={{ marginTop: 16 }}>
            Explore the Collection
          </Link>
        </AnimateIn>
      </div>
    </main>
  );
}
