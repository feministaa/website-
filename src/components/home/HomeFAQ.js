"use client";

import { useState } from "react";
import Link from "next/link";
import styles from "./HomeFAQ.module.css";
import AnimateIn from "@/components/ui/AnimateIn";

const FAQS = [
  {
    q: "Do you ship across India?",
    a: "Yes — every order ships free, anywhere in India. Most orders leave our studio within 2 business days.",
  },
  {
    q: "How long will delivery take?",
    a: "Typically 3-5 business days depending on your location. You'll receive tracking details as soon as your order is dispatched.",
  },
  {
    q: "What is the Discovery Set?",
    a: "A travel-ready introduction to the house — 10ml bottles of Locken, Vers and Fresca, so you can find your signature before committing to a full bottle.",
  },
  {
    q: "What makes Feminista different?",
    a: "Every composition is matured for nearly 180 days before it's bottled. We call it The Art of 180 — patience, poured into every fragrance we make.",
  },
  {
    q: "Can I return or exchange a fragrance?",
    a: "If something isn't right, reach out to us within 7 days of delivery and we'll help you sort out a return or exchange.",
  },
];

export default function HomeFAQ() {
  const [open, setOpen] = useState(0);

  return (
    <section className={`section ${styles.section}`}>
      <AnimateIn className={styles.header}>
        <span className="eyebrow">Good to Know</span>
        <h2 className={styles.title}>Questions, Answered</h2>
      </AnimateIn>

      <div className={styles.list}>
        {FAQS.map((item, i) => {
          const isOpen = open === i;
          return (
            <AnimateIn key={item.q} delay={i * 0.05} className={styles.item}>
              <button
                className={styles.question}
                onClick={() => setOpen(isOpen ? -1 : i)}
                aria-expanded={isOpen}
              >
                <span>{item.q}</span>
                <span className={`${styles.icon} ${isOpen ? styles.iconOpen : ""}`} aria-hidden="true">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <line x1="12" y1="4" x2="12" y2="20" className={styles.iconV} />
                    <line x1="4" y1="12" x2="20" y2="12" />
                  </svg>
                </span>
              </button>
              <div className={`${styles.answerWrap} ${isOpen ? styles.answerOpen : ""}`}>
                <p className={styles.answer}>{item.a}</p>
              </div>
            </AnimateIn>
          );
        })}
      </div>

      <AnimateIn delay={0.2} className={styles.footer}>
        <span>Still have a question?</span>
        <Link href="/our-story" className={styles.link}>
          Get in touch
          <svg width="15" height="10" viewBox="0 0 15 10" fill="none">
            <path d="M0 5H14M14 5L9.5 0.5M14 5L9.5 9.5" stroke="currentColor" strokeWidth="1.3" />
          </svg>
        </Link>
      </AnimateIn>
    </section>
  );
}
