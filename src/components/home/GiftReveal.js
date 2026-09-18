"use client";

import { useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import styles from "./GiftReveal.module.css";

gsap.registerPlugin(ScrollTrigger);

export default function GiftReveal() {
  const pinWrapRef = useRef(null);
  const videoRef = useRef(null);
  const videoWrapRef = useRef(null);
  const copyRef = useRef(null);

  useGSAP(
    () => {
      const video = videoRef.current;
      if (!video) return;

      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      // Entrance: copy elements stagger up, video panel scales in — plays once as the section arrives.
      const introTl = gsap.timeline({
        scrollTrigger: {
          trigger: pinWrapRef.current,
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
      });
      introTl
        .from(copyRef.current.children, {
          y: reduceMotion ? 0 : 24,
          opacity: 0,
          duration: 0.7,
          ease: "power3.out",
          stagger: 0.08,
        })
        .from(
          videoWrapRef.current,
          { scale: reduceMotion ? 1 : 0.92, opacity: 0, duration: 0.9, ease: "power3.out" },
          "<0.1"
        );

      if (reduceMotion) return;

      let ctx;
      function setup() {
        const duration = video.duration;
        if (!duration) return;

        // Smoothed scrub target — video.currentTime jumps are stepped by nature, so we lerp toward
        // the scroll-driven target every frame instead of setting it straight from onUpdate.
        const smoothed = { t: 0 };
        const st = ScrollTrigger.create({
          trigger: pinWrapRef.current,
          start: "top top",
          end: "+=2400",
          pin: true,
          scrub: 1.1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            smoothed.t = self.progress * duration;
          },
        });

        gsap.ticker.add(tick);
        function tick() {
          video.currentTime += (smoothed.t - video.currentTime) * 0.18;
        }

        ctx = () => {
          gsap.ticker.remove(tick);
          st.kill();
        };
      }

      if (video.readyState >= 1) {
        setup();
      } else {
        video.addEventListener("loadedmetadata", setup, { once: true });
      }

      return () => {
        video.removeEventListener("loadedmetadata", setup);
        ctx?.();
      };
    },
    { scope: pinWrapRef }
  );

  return (
    <section className={styles.pinWrap} ref={pinWrapRef}>
      <div className={styles.stage}>
        <div className={styles.copy} ref={copyRef}>
          <span className="eyebrow">The Gift of Feminista</span>
          <h2 className={styles.title}>Wrapped With Intention</h2>
          <p className={styles.text}>
            Every order arrives dressed the way it deserves — considered packaging, a hand-finished seal, and a
            fragrance inside worth the reveal.
          </p>
          <Link href="/fragrances" className={styles.link}>
            Shop The Collection
            <svg width="15" height="10" viewBox="0 0 15 10" fill="none">
              <path d="M0 5H14M14 5L9.5 0.5M14 5L9.5 9.5" stroke="currentColor" strokeWidth="1.3" />
            </svg>
          </Link>
        </div>

        <div className={styles.videoWrap} ref={videoWrapRef}>
          <video
            ref={videoRef}
            src="/videos/gift-reveal.mp4"
            muted
            playsInline
            preload="auto"
            className={styles.video}
          />
        </div>
      </div>
    </section>
  );
}
