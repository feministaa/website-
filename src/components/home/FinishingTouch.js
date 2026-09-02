import Link from "next/link";
import Image from "next/image";
import styles from "./FinishingTouch.module.css";
import AnimateIn from "@/components/ui/AnimateIn";

const CARDS = [
  {
    label: "The Art of Gifting",
    image: "/images/products/locken-silk.jpg",
    href: "/fragrances",
  },
  {
    label: "The Art of 180",
    image: "/images/banner-gold-liquid.jpg",
    href: "/the-art-of-180",
  },
  {
    label: "The Discovery Ritual",
    image: "/images/products/discovery-set.jpg",
    href: "/fragrances/discovery-set",
  },
];

export default function FinishingTouch() {
  return (
    <section className={styles.section}>
      <div className={styles.pattern} aria-hidden="true" />
      <AnimateIn className={styles.panel}>
        <span className="eyebrow">Beyond the Bottle</span>
        <h2 className={styles.title}>
          The Finishing
          <br />
          Ritual
        </h2>
        <p className={styles.desc}>
          Perfection lives in the details. Explore the rituals that turn a bottle of Feminista into something entirely
          yours.
        </p>
      </AnimateIn>

      <div className={styles.row}>
        {CARDS.map((card, i) => (
          <AnimateIn key={card.label} delay={i * 0.1} className={styles.card}>
            <Link href={card.href} className={styles.cardLink}>
              <Image src={card.image} alt={card.label} fill className={styles.cardImage} />
              <div className={styles.scrim} />
              <div className={styles.cardCopy}>
                <span className={styles.cardLabel}>{card.label}</span>
                <span className={styles.discover}>Discover</span>
              </div>
            </Link>
          </AnimateIn>
        ))}
      </div>
    </section>
  );
}
