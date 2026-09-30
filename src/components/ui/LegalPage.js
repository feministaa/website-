import Link from "next/link";
import styles from "./LegalPage.module.css";
import { LAST_UPDATED } from "@/data/site";

// Shared layout for policy pages: title block, a side list of sections, and the text.
export default function LegalPage({ title, intro, sections }) {
  return (
    <main className={styles.page}>
      <nav className={styles.crumb} aria-label="Breadcrumb">
        <Link href="/">Home</Link>
        <span>/</span>
        <span>{title}</span>
      </nav>

      <header className={styles.head}>
        <h1 className={styles.title}>{title}</h1>
        <p className={styles.updated}>Last updated {LAST_UPDATED}</p>
        {intro && <p className={styles.intro}>{intro}</p>}
      </header>

      <div className={styles.body}>
        <aside className={styles.toc} aria-label="On this page">
          <ol>
            {sections.map((s) => (
              <li key={s.id}>
                <a href={`#${s.id}`}>{s.title}</a>
              </li>
            ))}
          </ol>
        </aside>

        <div className={styles.content}>
          {sections.map((s) => (
            <section key={s.id} id={s.id} className={styles.section}>
              <h2 className={styles.sectionTitle}>{s.title}</h2>
              {s.body}
            </section>
          ))}
        </div>
      </div>
    </main>
  );
}
