"use client";

import { useRef, useState } from "react";
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
  const [playing, setPlaying] = useState(false);

  function handlePlay() {
    setPlaying(true);
    videoRef.current?.play();
  }

  return (
    <div className={styles.card}>
      <video
        ref={videoRef}
        className={styles.media}
        src={reel.video}
        poster={reel.poster}
        playsInline
        loop
        muted
        controls={playing}
        onClick={handlePlay}
        preload="metadata"
      />

      {!playing && (
        <>
          <div className={styles.scrim} />
          <button className={styles.playBtn} onClick={handlePlay} aria-label={`Play ${reel.caption}`}>
            <svg width="20" height="22" viewBox="0 0 20 22" fill="var(--black)">
              <path d="M1 1.5v19l18-9.5-18-9.5z" />
            </svg>
          </button>
          <span className={styles.caption}>{reel.caption}</span>
        </>
      )}
    </div>
  );
}

export default function HomeReels() {
  return (
    <section className={`section ${styles.section}`}>
      <div className={styles.header}>
        <span className="eyebrow">In Motion</span>
        <h2 className={styles.title}>The Ritual, Filmed.</h2>
      </div>
      <div className={styles.row}>
        {REELS.map((reel) => (
          <ReelCard key={reel.id} reel={reel} />
        ))}
      </div>
    </section>
  );
}
