import styles from "./HomeReels.module.css";
import InstagramEmbed from "./InstagramEmbed";

const REEL_URLS = [
  "https://www.instagram.com/p/DctF3jPTz2K/",
  "https://www.instagram.com/p/DcoHUDnTnf-/",
  "https://www.instagram.com/p/DcQ8y_1zj6T/",
  "https://www.instagram.com/p/DYFcK4OD4Wp/",
  "https://www.instagram.com/p/DXreOhijCnR/",
  "https://www.instagram.com/p/DXesmpDjFEh/",
  "https://www.instagram.com/p/DXemb7TDDJZ/",
  "https://www.instagram.com/p/DXOt5pPke-r/",
  "https://www.instagram.com/p/DXLhl66kfn0/",
];

export default function HomeReels() {
  return (
    <section className={`section ${styles.section}`}>
      <div className={styles.header}>
        <span className="eyebrow">In Motion</span>
        <h2 className={styles.title}>The Ritual, Filmed.</h2>
      </div>
      <div className={styles.row}>
        {REEL_URLS.map((url) => (
          <div key={url} className={styles.card}>
            <InstagramEmbed url={url} />
          </div>
        ))}
      </div>
    </section>
  );
}
