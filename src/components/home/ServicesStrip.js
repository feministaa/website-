import styles from "./ServicesStrip.module.css";

const SERVICES = [
  {
    label: "Complimentary Delivery",
    sub: "Across India",
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#a87f3f" strokeWidth="1.4">
        <rect x="1.5" y="7" width="13" height="10" rx="1" />
        <path d="M14.5 10h4l3.5 3.5V17h-7.5" />
        <circle cx="6" cy="19" r="1.6" />
        <circle cx="17.5" cy="19" r="1.6" />
      </svg>
    ),
  },
  {
    label: "Gift Presentation",
    sub: "Complimentary wrapping",
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#a87f3f" strokeWidth="1.4">
        <rect x="3" y="9" width="18" height="12" rx="1" />
        <path d="M3 13h18" />
        <path d="M12 9v12" />
        <path d="M12 9c-2-4-7-4-7-1 0 1.4 1.5 1 7 1zM12 9c2-4 7-4 7-1 0 1.4-1.5 1-7 1z" />
      </svg>
    ),
  },
  {
    label: "Authenticity Guaranteed",
    sub: "Certified craftsmanship",
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#a87f3f" strokeWidth="1.4">
        <path d="M12 2l7 3v6c0 5-3.5 8.5-7 10-3.5-1.5-7-5-7-10V5l7-3z" />
        <path d="M9 12l2 2 4-4" />
      </svg>
    ),
  },
  {
    label: "Personal Assistance",
    sub: "Client care, always on",
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#a87f3f" strokeWidth="1.4">
        <path d="M4 18v-1a5 5 0 015-5h6a5 5 0 015 5v1" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    ),
  },
];

export default function ServicesStrip() {
  return (
    <div className={styles.strip}>
      <div className={styles.grid}>
        {SERVICES.map((s) => (
          <div key={s.label} className={styles.item}>
            {s.icon}
            <div>
              <div className={styles.label}>{s.label}</div>
              <div className={styles.sub}>{s.sub}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
