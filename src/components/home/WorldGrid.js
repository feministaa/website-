import Link from "next/link";
import Image from "next/image";
import styles from "./WorldGrid.module.css";

export default function WorldGrid() {
  return (
    <section className={styles.section}>
      <div className={styles.left}>
        <Image
          src="/images/products/locken-staircase.jpg"
          alt="A woman in black, holding a Feminista bottle behind her back"
          fill
          className={styles.leftImage}
          sizes="(max-width: 900px) 100vw, 42vw"
        />
        <div className={styles.leftScrim} />
        <div className={styles.leftCopy}>
          <span className={styles.eyebrow}>The Feminista World</span>
          <h2 className={styles.leftTitle}>
            Beauty <em>in</em> every layer
          </h2>
          <p className={styles.leftText}>
            Each fragrance is a new chapter — a reflection of your moods, your memories and your most authentic self.
          </p>
          <Link href="/fragrances" className={styles.leftLink}>
            Discover More
            <svg width="15" height="10" viewBox="0 0 15 10" fill="none">
              <path d="M0 5H14M14 5L9.5 0.5M14 5L9.5 9.5" stroke="currentColor" strokeWidth="1.3" />
            </svg>
          </Link>
        </div>
      </div>

      <div className={styles.middle}>
        <div className={styles.middleTop}>
          <Image
            src="/images/products/fresca-spray.jpg"
            alt="Fresca by Feminista, being sprayed"
            fill
            className={styles.middleImage}
            sizes="(max-width: 900px) 100vw, 24vw"
          />
        </div>
        <div className={styles.middleBottom}>
          <Image
            src="/images/products/fresca-splash.jpg"
            alt="Fresca by Feminista, with a water splash"
            fill
            className={styles.middleImage}
            sizes="(max-width: 900px) 100vw, 24vw"
          />
        </div>
      </div>

      <div className={styles.right}>
        <div className={styles.rightTop}>
          <Image
            src="/images/hero-cat-giftbox.png"
            alt="Feminista Locken with gift box"
            fill
            className={styles.rightTopImage}
            sizes="(max-width: 900px) 100vw, 34vw"
          />
          <div className={styles.rightTopScrim} />
          <div className={styles.rightTopCopy}>
            <span className={styles.eyebrow}>Our Story</span>
            <h3 className={styles.rightTitle}>A journey of modern femininity</h3>
            <p className={styles.rightText}>
              Feminista was born from a simple belief — that every woman deserves a fragrance as unique as her story.
            </p>
            <Link href="/our-story" className={styles.rightLink}>
              Learn More
              <svg width="15" height="10" viewBox="0 0 15 10" fill="none">
                <path d="M0 5H14M14 5L9.5 0.5M14 5L9.5 9.5" stroke="currentColor" strokeWidth="1.3" />
              </svg>
            </Link>
          </div>
        </div>
        <div className={styles.rightBottom}>
          <Image
            src="/images/products/locken-ingredients.jpg"
            alt="Locken ingredients by Feminista"
            fill
            className={styles.middleImage}
            sizes="(max-width: 900px) 100vw, 34vw"
          />
        </div>
      </div>
    </section>
  );
}
