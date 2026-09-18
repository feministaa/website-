import Image from "next/image";
import styles from "./Hero.module.css";

export default function Hero() {
  return (
    <section className={styles.hero}>
      <Image
        src="/images/hero-cat-giftbox.png"
        alt="Feminista Locken with gift box"
        fill
        priority
        quality={95}
        className={styles.media}
      />
      <div className={styles.scrim} />
    </section>
  );
}
