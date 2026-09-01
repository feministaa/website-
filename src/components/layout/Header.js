"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import styles from "./Header.module.css";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import products from "@/data/products.json";
import ScentBottle from "@/components/ui/ScentBottle";
import { formatINR } from "@/lib/format";

const NAV_LINKS = [
  { href: "/fragrances", label: "Fragrances" },
  { href: "/the-collection", label: "The Collection" },
  { href: "/the-art-of-180", label: "The Art of 180" },
  { href: "/our-story", label: "Our Story" },
];

function SearchBar({ mobile = false, onNavigate }) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const boxRef = useRef(null);

  const matches = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return products
      .filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.expression.toLowerCase().includes(q) ||
          p.tagline.toLowerCase().includes(q) ||
          p.shortDescription.toLowerCase().includes(q)
      )
      .slice(0, 5);
  }, [query]);

  useEffect(() => {
    function handleClickOutside(e) {
      if (boxRef.current && !boxRef.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function goToResults() {
    if (!query.trim()) return;
    setOpen(false);
    onNavigate?.();
    router.push(`/fragrances?q=${encodeURIComponent(query.trim())}`);
  }

  function handleSubmit(e) {
    if (e?.preventDefault) e.preventDefault();
    goToResults();
  }

  function handleSelect(slug) {
    setOpen(false);
    setQuery("");
    onNavigate?.();
    router.push(`/fragrances/${slug}`);
  }

  return (
    <div ref={boxRef} style={{ position: "relative", width: "100%", maxWidth: mobile ? "none" : 280 }}>
      <form className={styles.searchWrap} style={mobile ? { maxWidth: "none" } : undefined} onSubmit={handleSubmit}>
        <input
          className={styles.searchInput}
          placeholder="Search for a product…"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(true);
          }}
          onFocus={() => query && setOpen(true)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSubmit(e);
            if (e.key === "Escape") setOpen(false);
          }}
        />
        <button type="submit" aria-label="Search" style={{ display: "flex", flexShrink: 0 }}>
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" style={{ color: "var(--ink)" }}>
            <circle cx="11" cy="11" r="7" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
        </button>
      </form>

      <AnimatePresence>
        {open && query.trim() && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className={styles.suggestPanel}
          >
            {matches.length === 0 ? (
              <div className={styles.suggestEmpty}>No fragrances match &ldquo;{query}&rdquo;.</div>
            ) : (
              <>
                {matches.map((p) => (
                  <button key={p.id} className={styles.suggestItem} onClick={() => handleSelect(p.slug)}>
                    <span
                      className={styles.suggestThumb}
                      style={{ background: `linear-gradient(160deg, ${p.accentSoft}66, var(--bg-alt))` }}
                    >
                      <ScentBottle accent={p.accent} accentSoft={p.accentSoft} size={30} isSet={p.family === "set"} />
                    </span>
                    <span className={styles.suggestInfo}>
                      <span className={styles.suggestName}>{p.name}</span>
                      <span className={styles.suggestExpr}>{p.expression}</span>
                    </span>
                    <span className={styles.suggestPrice}>{formatINR(p.price)}</span>
                  </button>
                ))}
                <button className={styles.suggestFooter} onClick={goToResults}>
                  View all results for &ldquo;{query}&rdquo;
                </button>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Header() {
  const pathname = usePathname();
  const { count, openDrawer } = useCart();
  const { count: wishCount } = useWishlist();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const chromeRef = useRef(null);
  const lastY = useRef(0);
  const rafId = useRef(null);

  useEffect(() => {
    function update() {
      rafId.current = null;
      const y = window.scrollY;
      setScrolled(y > 10);
      const delta = y - lastY.current;
      if (y < 40) {
        setHidden(false);
      } else if (delta > 0) {
        setHidden(true);
      } else if (delta < 0) {
        setHidden(false);
      }
      lastY.current = y;
    }
    function onScroll() {
      if (rafId.current) return;
      rafId.current = requestAnimationFrame(update);
    }
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    function measure() {
      if (!chromeRef.current) return;
      document.documentElement.style.setProperty("--header-h", `${chromeRef.current.offsetHeight}px`);
    }
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  return (
    <>
      <div ref={chromeRef} className={styles.chrome} style={{ transform: hidden ? "translateY(-100%)" : "translateY(0)" }}>
        <div className={styles.announce}>Complimentary shipping across India</div>
        <header className={`${styles.header} ${scrolled ? styles.headerScrolled : ""}`}>
        <div className={styles.topRow}>
          <SearchBar />

          <Link href="/" className={styles.logo} aria-label="Feminista home">
            <Image src="/feminista-logo-black.png" alt="Feminista" width={100} height={54} priority className={styles.logoImg} />
          </Link>

          <button className={styles.menuBtn} aria-label="Open menu" onClick={() => setMobileOpen(true)}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
            {wishCount + count > 0 && <span className={styles.badge}>{wishCount + count}</span>}
          </button>
        </div>

        <div className={styles.navRow}>
          <nav className={styles.navInner}>
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`${styles.navLink} ${pathname === link.href ? styles.navLinkActive : ""}`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </header>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ position: "fixed", inset: 0, background: "rgba(13,12,10,0.4)", zIndex: 200 }}
            onClick={() => setMobileOpen(false)}
          >
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              style={{
                background: "var(--bg)",
                width: 300,
                maxWidth: "82vw",
                height: "100%",
                padding: "28px 26px",
                display: "flex",
                flexDirection: "column",
                gap: 22,
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Image src="/feminista-logo-black.png" alt="Feminista" width={84} height={45} className={styles.logoImg} />
                <button aria-label="Close menu" onClick={() => setMobileOpen(false)}>
                  ✕
                </button>
              </div>
              <SearchBar mobile onNavigate={() => setMobileOpen(false)} />
              {NAV_LINKS.map((link) => (
                <Link key={link.href} href={link.href} style={{ fontSize: 18, fontFamily: "var(--font-serif)" }}>
                  {link.label}
                </Link>
              ))}
              <div style={{ display: "flex", flexDirection: "column", gap: 16, marginTop: "auto", paddingTop: 22, borderTop: "1px solid var(--line)" }}>
                <Link href="/account" className={styles.drawerLink}>
                  My Account
                </Link>
                <Link href="/wishlist" className={styles.drawerLink}>
                  Wishlist {wishCount > 0 && `(${wishCount})`}
                </Link>
                <Link href="/cart" className={styles.drawerLink}>
                  View Cart {count > 0 && `(${count})`}
                </Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
