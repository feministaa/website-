import Image from "next/image";
import styles from "./Hero.module.css";

export default function Hero() {
  return (
    <section className={styles.hero}>
      <Image
        src="/images/products/locken-staircase.jpg"
        alt="Feminista Locken campaign"
        fill
        priority
        quality={95}
        className={styles.media}
      />
      <div className={styles.scrim} />
      <div className={styles.copy}>
        <span className={styles.eyebrow}>The House of Feminista</span>
        <h1 className={styles.headline}>A presence that needs no introduction.</h1>
      </div>
    </section>
  );
}
