import Image from "next/image";
import styles from "./page.module.css";

export default function HeroVisual() {
  return (
    <Image
      src="/images/art-of-180-hero.png"
      alt="Locken perfume bottle held in hand"
      fill
      priority
      className={styles.heroVisual}
      sizes="100vw"
    />
  );
}
