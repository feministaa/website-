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
          <svg
            className={styles.searchIcon}
            width="17"
            height="17"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
          >
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
  const [mobileOpen, setMobileOpen] = useState(false);
  const chromeRef = useRef(null);
  const isHome = pathname === "/";
  const transparent = isHome && !scrolled;

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 10);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
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
      <div ref={chromeRef} className={`${styles.chrome} ${isHome ? styles.chromeFixed : ""}`}>
        <div className={styles.announce}>Complimentary shipping across India</div>
        <header className={`${styles.header} ${scrolled ? styles.headerScrolled : ""} ${transparent ? styles.headerTransparent : ""}`}>
        <div className={styles.topRow}>
          <SearchBar />

          <Link href="/" className={styles.logo} aria-label="Feminista home">
            <Image
              src={transparent ? "/feminista-logo.png" : "/feminista-logo-black.png"}
              alt="Feminista"
              width={100}
              height={54}
              priority
              className={styles.logoImg}
            />
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
      </header>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className={styles.overlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMobileOpen(false)}
          >
            <motion.div
              className={styles.drawer}
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className={styles.drawerHead}>
                <Image src="/feminista-logo-black.png" alt="Feminista" width={84} height={45} className={styles.logoImg} />
                <button className={styles.closeBtn} aria-label="Close menu" onClick={() => setMobileOpen(false)}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
                    <line x1="4" y1="4" x2="20" y2="20" />
                    <line x1="20" y1="4" x2="4" y2="20" />
                  </svg>
                </button>
              </div>

              <div className={styles.drawerSearch}>
                <SearchBar mobile onNavigate={() => setMobileOpen(false)} />
              </div>

              <nav className={styles.drawerNav}>
                {NAV_LINKS.map((link, i) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={styles.drawerNavLink}
                    style={{ transitionDelay: `${i * 0.03}s` }}
                    onClick={() => setMobileOpen(false)}
                  >
                    <span>{link.label}</span>
                    <svg width="13" height="10" viewBox="0 0 15 10" fill="none" className={styles.drawerNavArrow}>
                      <path d="M0 5H14M14 5L9.5 0.5M14 5L9.5 9.5" stroke="currentColor" strokeWidth="1.3" />
                    </svg>
                  </Link>
                ))}
              </nav>

              <div className={styles.drawerFoot}>
                <Link href="/account" className={styles.drawerFootLink} onClick={() => setMobileOpen(false)}>
                  <span className={styles.drawerFootIcon}>
                    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3">
                      <path d="M4 18v-1a5 5 0 015-5h6a5 5 0 015 5v1" />
                      <circle cx="12" cy="7" r="4" />
                    </svg>
                  </span>
                  <span>My Account</span>
                </Link>
                <Link href="/wishlist" className={styles.drawerFootLink} onClick={() => setMobileOpen(false)}>
                  <span className={styles.drawerFootIcon}>
                    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3">
                      <path d="M12 20.2s-7.6-4.6-10-9.3C.4 7.4 2.3 4 5.9 4c2 0 3.5 1 6.1 3.6C14.6 5 16.1 4 18.1 4c3.6 0 5.5 3.4 3.9 6.9-2.4 4.7-10 9.3-10 9.3z" />
                    </svg>
                  </span>
                  <span>Wishlist</span>
                  {wishCount > 0 && <span className={styles.drawerFootBadge}>{wishCount}</span>}
                </Link>
                <Link href="/cart" className={styles.drawerFootLink} onClick={() => setMobileOpen(false)}>
                  <span className={styles.drawerFootIcon}>
                    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3">
                      <path d="M6 8h12l-1 12.5a1.5 1.5 0 01-1.5 1.5h-7a1.5 1.5 0 01-1.5-1.5L6 8z" />
                      <path d="M9 8V6a3 3 0 016 0v2" />
                    </svg>
                  </span>
                  <span>View Cart</span>
                  {count > 0 && <span className={styles.drawerFootBadge}>{count}</span>}
                </Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
