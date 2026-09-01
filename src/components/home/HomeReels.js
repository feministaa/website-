"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import styles from "./HomeReels.module.css";

const REELS = [
  { id: "r1", poster: "/images/products/locken-water.jpg", caption: "Locken, up close", videoSrc: null },
  { id: "r2", poster: "/images/products/fresca-spray.jpg", caption: "The morning ritual", videoSrc: null },
  { id: "r3", poster: "/images/products/fresca-splash.jpg", caption: "Fresca in motion", videoSrc: null },
  { id: "r4", poster: "/images/products/locken-ingredients.jpg", caption: "What goes into 180 days", videoSrc: null },
  { id: "r5", poster: "/images/products/discovery-set.jpg", caption: "Inside the Discovery Set", videoSrc: null },
];

function ReelCard({ reel }) {
  const videoRef = useRef(null);
  const [playing, setPlaying] = useState(false);

  function handlePlay() {
    if (!reel.videoSrc) return;
    setPlaying(true);
    videoRef.current?.play();
  }

  return (
    <div className={styles.card}>
      {reel.videoSrc ? (
        <video
          ref={videoRef}
          className={styles.media}
          src={reel.videoSrc}
          poster={reel.poster}
          playsInline
          loop
          muted
          controls={playing}
          onClick={handlePlay}
        />
      ) : (
        <Image src={reel.poster} alt={reel.caption} fill className={styles.media} />
      )}

      {!playing && (
        <button
          className={styles.playBtn}
          onClick={handlePlay}
          aria-label={reel.videoSrc ? `Play ${reel.caption}` : `${reel.caption} — video coming soon`}
        >
          <svg width="20" height="22" viewBox="0 0 20 22" fill="var(--black)">
            <path d="M1 1.5v19l18-9.5-18-9.5z" />
          </svg>
        </button>
      )}

      {!playing && <span className={styles.caption}>{reel.caption}</span>}
    </div>
  );
}

export default function HomeReels() {
  return (
    <section className={`section ${styles.section}`}>
      <div className={styles.header}>
        <span className="eyebrow">In Motion</span>
        <h2 className={styles.title}>Feminista Reels</h2>
      </div>
      <div className={styles.row}>
        {REELS.map((reel) => (
          <ReelCard key={reel.id} reel={reel} />
        ))}
      </div>
    </section>
  );
}
