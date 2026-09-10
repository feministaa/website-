import Image from "next/image";
import styles from "./page.module.css";

export default function HeroVisual() {
  return (
    <Image
      src="/images/banner-crystal-bottle.jpg"
      alt="A faceted crystal perfume bottle, resting in silk"
      fill
      priority
      className={styles.heroVisual}
      sizes="100vw"
    />
  );
}
