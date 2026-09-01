"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
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
  const gallery = product.images?.length ? product.images : ["/images/products/locken-real.jpg"];
  const [heroImage, ...restImages] = gallery;
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

  if (product.comingSoon) {
    return (
      <main>
        <AnimateIn className={styles.comingSoonWrap}>
          <div className={styles.comingSoonImage}>
            <Image src={heroImage} alt={product.name} fill className={styles.productPhoto} priority />
          </div>
          <div className={styles.comingSoonInfo}>
            <div className={styles.expression}>{product.expression}</div>
            <h1 className={styles.name}>{product.name}</h1>
            <p className={styles.tagline}>{product.tagline}</p>
            <Link href="/fragrances" className="btn btn-gold" style={{ marginTop: 8 }}>
              Explore Available Fragrances
            </Link>
          </div>
        </AnimateIn>

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
      </main>
    );
  }

  return (
    <main>
      <div className={styles.top}>
        <AnimateIn className={styles.gallery}>
          <div
            className={styles.mainImage}
            style={{ background: `linear-gradient(160deg, ${product.accentSoft}66, var(--bg-alt))` }}
          >
            {product.family === "set" && !product.images?.length ? (
              <ScentBottle isSet size={280} />
            ) : (
              <Image src={heroImage} alt={product.name} fill className={styles.productPhoto} priority />
            )}
          </div>
          {restImages.length > 0 && (
            <div className={styles.thumbRow}>
              {restImages.map((src, i) => (
                <div
                  key={src}
                  className={styles.thumb}
                  style={{ background: `linear-gradient(160deg, ${product.accentSoft}66, var(--bg-alt))` }}
                >
                  <Image src={src} alt={`${product.name} ${i + 2}`} fill className={styles.productPhoto} />
                </div>
              ))}
            </div>
          )}
        </AnimateIn>

        <AnimateIn delay={0.15} className={styles.info}>
          <div className={styles.expression}>{product.expression}</div>
          <h1 className={styles.name}>{product.name}</h1>
          <div className={styles.ratingRow}>
            <span className={styles.stars}>
              {Array.from({ length: 5 }).map((_, i) => (
                <svg key={i} width="13" height="13" viewBox="0 0 24 24" fill={i < Math.round(product.rating) ? "#c9a153" : "#e4ddcb"}>
                  <path d="M12 2l2.9 6.6L22 9.2l-5 4.9L18.2 21 12 17.4 5.8 21 7 14.1l-5-4.9 7.1-0.6L12 2z" />
                </svg>
              ))}
            </span>
            <span className={styles.ratingText}>
              {product.rating} · {product.reviews} reviews
            </span>
          </div>
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
            <div className={styles.actionTopRow}>
              <button className="btn btn-primary" onClick={handleAddToCart}>
                Add to Cart — {formatINR(size.price * qty)}
              </button>
              <button
                className={`btn btn-ghost ${styles.wishBtnCompact}`}
                onClick={() => {
                  toggleWishlist(product.id);
                  showToast(wished ? `Removed ${product.name} from wishlist` : `Added ${product.name} to wishlist`);
                }}
                aria-label={wished ? "Remove from wishlist" : "Add to wishlist"}
                aria-pressed={wished}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill={wished ? "#6d1f3a" : "none"} stroke={wished ? "#6d1f3a" : "currentColor"} strokeWidth="1.5">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                </svg>
              </button>
            </div>
            <button className="btn btn-gold btn-block" onClick={handleQuickCheckout}>
              Buy Now
            </button>
          </div>

          <div className={styles.trustRow}>
            <div className={styles.trustItem}>
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
                <rect x="2.5" y="7" width="13" height="10.5" rx="1" />
                <path d="M15.5 10.5h3.2l2.8 3v4H15.5z" />
                <circle cx="7" cy="19" r="1.6" />
                <circle cx="17.5" cy="19" r="1.6" />
              </svg>
              <span>Free shipping across India</span>
            </div>
            <div className={styles.trustItem}>
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
                <path d="M3 12a9 9 0 1 1 2.64 6.36" />
                <path d="M3 21v-5h5" />
              </svg>
              <span>14-day easy returns</span>
            </div>
            <div className={styles.trustItem}>
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
                <path d="M12 2.5l7 3.2v5.4c0 5-3 8.4-7 10.4-4-2-7-5.4-7-10.4V5.7z" />
                <path d="M9 12l2 2 4-4.5" />
              </svg>
              <span>100% authentic, always</span>
            </div>
          </div>

          <div className={styles.notesPreview}>
            <div className={styles.fieldLabel}>Opens With</div>
            <div className={styles.noteTags}>
              {product.notes.top.map((n) => (
                <span key={n} className={styles.noteTag}>
                  {n}
                </span>
              ))}
            </div>
          </div>
        </AnimateIn>
      </div>

      <div className={styles.details}>
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
      </div>

      <div
        className={styles.storyBanner}
        style={
          product.bannerImage
            ? { backgroundImage: `linear-gradient(0deg, rgba(10,9,7,0.25), rgba(10,9,7,0.05)), url(${product.bannerImage})` }
            : undefined
        }
      >
        {product.bannerImage ? (
          <AnimateIn className={styles.storyBannerCta}>
            <Link href="/the-art-of-180" className="btn btn-light">
              Discover the Process
            </Link>
          </AnimateIn>
        ) : (
          <AnimateIn className={styles.storyBannerCopy}>
            <span className="eyebrow" style={{ color: "var(--gold-light)" }}>
              The Art of 180
            </span>
            <h2 className={styles.storyBannerTitle}>Nothing about her is rushed.</h2>
            <p className={styles.storyBannerText}>
              Every Feminista fragrance matures for nearly 180 days before it ever reaches you — time enough for its
              notes to settle into something worth wearing.
            </p>
            <Link href="/the-art-of-180" className="btn btn-light">
              Discover the Process
            </Link>
          </AnimateIn>
        )}
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
          <Link href="/fragrances" className="btn btn-gold" style={{ marginTop: 16 }}>
            Explore the Collection
          </Link>
        </AnimateIn>
      </div>
    </main>
  );
}
