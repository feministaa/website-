"use client";

import { useState } from "react";
import styles from "./Newsletter.module.css";
import AnimateIn from "@/components/ui/AnimateIn";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
    setEmail("");
  }

  return (
    <section className={styles.section}>
      <AnimateIn>
        <span className="eyebrow">Enter the Feminista Circle</span>
        <h2 className={styles.title}>Private access, always.</h2>
        <p className={styles.sub}>New compositions, exclusive offers and stories from the house — before anyone else.</p>
        <form className={styles.form} onSubmit={handleSubmit}>
          <input
            type="email"
            required
            className={styles.input}
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button type="submit" className="btn btn-primary">
            Join the Circle
          </button>
        </form>
        {submitted && <p className={styles.success}>Welcome to the Circle. Watch your inbox.</p>}
      </AnimateIn>
    </section>
  );
}
