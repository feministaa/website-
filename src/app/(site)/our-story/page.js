import Link from "next/link";
import Image from "next/image";
import styles from "./page.module.css";
import AnimateIn from "@/components/ui/AnimateIn";
import HomeBanner from "@/components/home/HomeBanner";
import PhilosophyPillars from "./PhilosophyPillars";

export const metadata = {
  title: "Our Story — Feminista",
  description: "Created for her. Never adapted to her. The story of the House of Feminista.",
  alternates: { canonical: "/our-story" },
  openGraph: {
    title: "Our Story — Feminista",
    description: "Modern femininity, composed. The philosophy and Maison behind Feminista.",
    url: "/our-story",
    type: "website",
  },
};

const PILLARS = [
  {
    title: "Femininity",
    image: "/images/story-cat-legs.webp",
    body: "Femininity has no single definition. It can be soft and commanding, graceful and fearless, intimate and entirely individual.",
  },
  {
    title: "Presence",
    image: "/images/products/locken-stairs-woman.webp",
    body: "Each composition is thoughtfully balanced to complement her presence — not define it. Fragrance should not introduce her. It should leave her remembered.",
  },
  {
    title: "Craftsmanship",
    image: "/images/story/fresca-lab-dropper.png",
    body: "Crafted with carefully selected ingredients and matured with patience, every fragrance unfolds slowly, revealing depth and character.",
  },
];

export default function OurStoryPage() {

  return (
    <main>
      <nav className={styles.crumb} aria-label="Breadcrumb">
        <Link href="/">Home</Link>
        <span>/</span>
        <span>Our Story</span>
      </nav>

      <section className={styles.intro}>
        <AnimateIn className={styles.introInner}>
          <h1 className={styles.introTitle}>The House of Feminista</h1>
          <p className={styles.introText}>
            Feminista is built on a simple belief: femininity has never belonged to a single definition. It is
            layered, ever-changing, and beautifully individual. There is beauty in her contrasts, mystery in her
            choices, and something unexpected in every side of her.
          </p>
          <p className={styles.introText}>
            Our fragrances explore these many expressions through notes that unfold, contrasts that surprise, and
            impressions that stay. Each fragrance reveals its own character, one layer at a time. Because there is
            always more to her than the first impression.
          </p>
        </AnimateIn>
      </section>

      <section className={styles.storyRow}>
        <AnimateIn className={styles.storyText}>
          <p>
            Every Feminista composition begins with patience. Rare absolutes and naturals are sourced with care, then
            left to mature in quiet stillness for nearly 180 days — long enough for each note to soften into the
            next, until the fragrance no longer smells of ingredients, but of a woman.
          </p>
        </AnimateIn>
        <AnimateIn delay={0.1} className={styles.storyMedia}>
          <div className={styles.storyImgBox}>
            <Image
              src="/images/story/fresca-lab-dropper.png"
              alt="Fresca being composed with a dropper in the Feminista lab"
              fill
              className={styles.storyImg}
              sizes="(max-width: 900px) 100vw, 50vw"
            />
          </div>
        </AnimateIn>
      </section>

      <section className={`${styles.storyRow} ${styles.storyRowReverse}`}>
        <AnimateIn className={styles.storyText}>
          <p>
            This patience is not a marketing point — it is the House's only method. We believe a fragrance rushed to
            market is a fragrance left unfinished, and Feminista would rather arrive late than incomplete.
          </p>
        </AnimateIn>
        <AnimateIn delay={0.1} className={styles.storyMedia}>
          <div className={styles.storyImgBox}>
            <Image
              src="/images/story/vers-notes-sketch.webp"
              alt="An illustration of Vers and its notes"
              fill
              className={styles.storyImg}
              sizes="(max-width: 900px) 100vw, 50vw"
            />
          </div>
        </AnimateIn>
      </section>

      <section className={styles.storyRow}>
        <AnimateIn className={styles.storyText}>
          <p>
            From rare botanicals to the rarest naturals, every ingredient earns its place. Nothing is added for
            volume — only for the depth, character and signature it leaves behind.
          </p>
        </AnimateIn>
        <AnimateIn delay={0.1} className={styles.storyMedia}>
          <div className={styles.storyImgBox}>
            <Image
              src="/images/story/locken-ingredients-flatlay.webp"
              alt="Locken surrounded by orchid, orange, vanilla and cinnamon"
              fill
              className={styles.storyImg}
              sizes="(max-width: 900px) 100vw, 50vw"
            />
          </div>
        </AnimateIn>
      </section>

      <HomeBanner fullScreen />

      <PhilosophyPillars pillars={PILLARS} />
    </main>
  );
}
