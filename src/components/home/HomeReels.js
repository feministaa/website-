"use client";

import { useEffect, useRef, useState } from "react";
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
  const [muted, setMuted] = useState(true);

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
        muted={muted}
        preload="auto"
      />
      <button
        type="button"
        className={styles.muteBtn}
        aria-label={muted ? "Unmute video" : "Mute video"}
        onClick={() => setMuted((m) => !m)}
      >
        {muted ? (
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M11 5 6 9H2v6h4l5 4V5z" />
            <line x1="23" y1="9" x2="17" y2="15" />
            <line x1="17" y1="9" x2="23" y2="15" />
          </svg>
        ) : (
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M11 5 6 9H2v6h4l5 4V5z" />
            <path d="M15.5 8.5a5 5 0 0 1 0 7" />
            <path d="M18.5 5.5a9 9 0 0 1 0 13" />
          </svg>
        )}
      </button>
    </div>
  );
}

export default function HomeReels() {
  return (
    <section className={`section ${styles.section}`}>
      <div className={styles.header}>
        <h2 className={styles.title}>Vibe with Us</h2>
      </div>
      <div className={styles.row}>
        {REELS.map((reel) => (
          <ReelCard key={reel.id} reel={reel} />
        ))}
      </div>
    </section>
  );
}
