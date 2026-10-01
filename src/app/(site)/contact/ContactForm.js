"use client";

import { useState } from "react";
import styles from "./page.module.css";

const TOPICS = ["An order", "Damaged or incorrect order", "Choosing a fragrance", "Gifting", "Something else"];

// There is no mail service behind the site, so sending opens the visitor's email app with the message
// already addressed and written.
export default function ContactForm({ email }) {
  const [sent, setSent] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const order = data.get("order");
    const subject = `${data.get("topic")}${order ? ` · Order ${order}` : ""}`;
    const body = `${data.get("message")}\n\n${data.get("name")}`;
    window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.row}>
        <label className={styles.field}>
          <span>Your name</span>
          <input name="name" type="text" autoComplete="name" required />
        </label>
        <label className={styles.field}>
          <span>Order number (optional)</span>
          <input name="order" type="text" />
        </label>
      </div>
      <label className={styles.field}>
        <span>Topic</span>
        <select name="topic" defaultValue={TOPICS[0]}>
          {TOPICS.map((t) => (
            <option key={t}>{t}</option>
          ))}
        </select>
      </label>
      <label className={styles.field}>
        <span>Message</span>
        <textarea name="message" rows={6} required />
      </label>
      <button type="submit" className="btn btn-primary">
        Send message
      </button>
      <p className={styles.note} aria-live="polite">
        {sent
          ? `Your email app should now be open with the message ready. If it didn't open, write to ${email}.`
          : "Sending opens your email app with the message ready to go."}
      </p>
    </form>
  );
}
