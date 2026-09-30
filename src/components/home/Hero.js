import styles from "./Hero.module.css";

// Full-screen looping brand film: muted and inline so it autoplays everywhere, with no controls.
export default function Hero() {
  return (
    <section className={styles.hero}>
      <video
        className={styles.media}
        src="/videos/home-hero.mp4"
        poster="/images/home-hero-poster.jpg"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        disablePictureInPicture
        aria-label="Feminista brand film"
      />
      <div className={styles.scrim} />
    </section>
  );
}
