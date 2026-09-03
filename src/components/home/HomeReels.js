"use client";

import { useEffect, useRef } from "react";
import styles from "./HomeReels.module.css";

const REELS = [
  { id: "r1", poster: "/images/reels/reel-1.jpg", video: "/videos/reels/reel-1.mp4", caption: "Locken, unboxed" },
  { id: "r2", poster: "/images/reels/reel-2.jpg", video: "/videos/reels/reel-2.mp4", caption: "The morning ritual" },
  { id: "r3", poster: "/images/reels/reel-3.jpg", video: "/videos/reels/reel-3.mp4", caption: "Behind the scenes" },
  { id: "r4", poster: "/images/reels/reel-4.jpg", video: "/videos/reels/reel-4.mp4", caption: "A closer look" },
  { id: "r5", poster: "/images/reels/reel-5.jpg", video: "/videos/reels/reel-5.mp4", caption: "In her words" },
  { id: "r6", poster: "/images/reels/reel-6.jpg", video: "/videos/reels/reel-6.mp4", caption: "The Feminista house" },
];

function ReelCard({ reel }) {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const tryPlay = () => video.play().catch(() => {});
    tryPlay();
    video.addEventListener("loadeddata", tryPlay);
    return () => video.removeEventListener("loadeddata", tryPlay);
  }, []);

  return (
    <div className={styles.card}>
      <video
        ref={videoRef}
        className={styles.media}
        src={reel.video}
        poster={reel.poster}
        autoPlay
        playsInline
        loop
        muted
        preload="auto"
      />
      <div className={styles.scrim} />
      <span className={styles.caption}>{reel.caption}</span>
    </div>
  );
}

export default function HomeReels() {
  return (
    <section className={`section ${styles.section}`}>
      <div className={styles.header}>
        <span className="eyebrow">In Motion</span>
        <h2 className={styles.title}>The Ritual, Filmed</h2>
      </div>
      <div className={styles.row}>
        <div className={styles.spacer} aria-hidden="true" />
        {REELS.map((reel) => (
          <ReelCard key={reel.id} reel={reel} />
        ))}
        <div className={styles.spacer} aria-hidden="true" />
      </div>
    </section>
  );
}
