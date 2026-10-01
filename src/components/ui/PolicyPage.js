import Link from "next/link";
import AnimateIn from "@/components/ui/AnimateIn";
import { LAST_UPDATED, SUPPORT_EMAIL } from "@/data/site";
import styles from "./PolicyPage.module.css";

// Customer-care policy page: soft title block, a highlighted notice, numbered quick navigation, and numbered
// sections that can hold body text and/or a row of small cards.
export default function PolicyPage({ label, title, intro, notice, sections, contactLine }) {
  return (
    <main className={styles.page}>
      <header className={styles.hero}>
        <AnimateIn className={styles.heroInner}>
          <nav className={styles.crumb} aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span>/</span>
            <span>{title}</span>
          </nav>
          <span className={styles.label}>{label}</span>
          <h1 className={styles.title}>{title}</h1>
          <p className={styles.intro}>{intro}</p>
          <span className={styles.updated}>Last updated {LAST_UPDATED}</span>
        </AnimateIn>
      </header>

      <div className={styles.wrap}>
        {notice && (
          <AnimateIn className={styles.notice}>
            <span className={styles.noticeLabel}>{notice.label}</span>
            <p className={styles.noticeText}>{notice.text}</p>
          </AnimateIn>
        )}

        <div className={styles.body}>
          <aside className={styles.toc} aria-label="On this page">
            <span className={styles.tocLabel}>Quick navigation</span>
            <ol>
              {sections.map((s, i) => (
                <li key={s.id}>
                  <a href={`#${s.id}`}>
                    <span className={styles.tocNum}>{String(i + 1).padStart(2, "0")}</span>
                    {s.title}
                  </a>
                </li>
              ))}
            </ol>
          </aside>

          <div className={styles.sections}>
            {sections.map((s, i) => (
              <AnimateIn as="section" key={s.id} id={s.id} className={styles.section}>
                <div className={styles.sectionHead}>
                  <span className={styles.sectionNum}>{String(i + 1).padStart(2, "0")}</span>
                  <h2 className={styles.sectionTitle}>{s.title}</h2>
                </div>
                {s.body && <div className={styles.text}>{s.body}</div>}
                {s.cards && (
                  <div className={styles.cards}>
                    {s.cards.map((c) => (
                      <div key={c.title} className={styles.card}>
                        <h3 className={styles.cardTitle}>{c.title}</h3>
                        <p className={styles.cardText}>{c.text}</p>
                      </div>
                    ))}
                  </div>
                )}
              </AnimateIn>
            ))}
          </div>
        </div>
      </div>

      <section className={styles.contact}>
        <AnimateIn className={styles.contactInner}>
          <span className={styles.contactLabel}>We are here for you</span>
          <a href={`mailto:${SUPPORT_EMAIL}`} className={styles.contactEmail}>
            {SUPPORT_EMAIL}
          </a>
          <p className={styles.contactText}>{contactLine}</p>
        </AnimateIn>
      </section>
    </main>
  );
}
