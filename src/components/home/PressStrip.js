import AnimateIn from "@/components/ui/AnimateIn";
import styles from "./PressStrip.module.css";

// Publications Feminista has been featured in. Add `href` (the article URL) to link a name, or
// `logo` (a file in /public/images/press) to show the publication's official logo instead of its name.
const PRESS = [
  { name: "The Times of India", wordmark: "THE TIMES OF INDIA", style: "times" },
  { name: "Femina", wordmark: "Femina", style: "femina" },
];

export default function PressStrip() {
  return (
    <section className={styles.section} aria-label="As featured in">
      <AnimateIn className={styles.inner}>
        <span className={styles.label}>As featured in</span>
        <ul className={styles.list}>
          {PRESS.map((p) => {
            const mark = p.logo ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={p.logo} alt={p.name} className={styles.logo} />
            ) : (
              <span className={`${styles.wordmark} ${styles[p.style]}`} aria-label={p.name}>
                {p.wordmark}
              </span>
            );
            return (
              <li key={p.name}>
                {p.href ? (
                  <a href={p.href} target="_blank" rel="noreferrer" className={styles.link}>
                    {mark}
                  </a>
                ) : (
                  mark
                )}
              </li>
            );
          })}
        </ul>
      </AnimateIn>
    </section>
  );
}
