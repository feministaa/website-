import styles from "./Charts.module.css";

export function BarList({ title, items }) {
  const max = Math.max(...items.map((i) => i.value), 1);
  return (
    <div className={styles.panel}>
      <h3 className={styles.title}>{title}</h3>
      {items.map((item) => (
        <div key={item.label} className={styles.barRow}>
          <span className={styles.barLabel}>{item.label}</span>
          <span className={styles.barTrack}>
            <span className={styles.barFill} style={{ width: `${(item.value / max) * 100}%` }} />
          </span>
          <span className={styles.barValue}>{item.display ?? item.value}</span>
        </div>
      ))}
    </div>
  );
}

export function RevenueChart({ title, points }) {
  const width = 560;
  const height = 200;
  const padding = 24;
  const max = Math.max(...points.map((p) => p.value), 1);

  const coords = points.map((p, i) => {
    const x = padding + (i / (points.length - 1 || 1)) * (width - padding * 2);
    const y = height - padding - (p.value / max) * (height - padding * 2);
    return { x, y, ...p };
  });

  const linePath = coords.map((c, i) => `${i === 0 ? "M" : "L"} ${c.x} ${c.y}`).join(" ");
  const areaPath = `${linePath} L ${coords[coords.length - 1].x} ${height - padding} L ${coords[0].x} ${height - padding} Z`;

  return (
    <div className={styles.panel}>
      <h3 className={styles.title}>{title}</h3>
      <svg viewBox={`0 0 ${width} ${height}`} width="100%" height={height} role="img" aria-label="Revenue trend">
        <defs>
          <linearGradient id="revenueFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#eb9d1b" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#eb9d1b" stopOpacity="0" />
          </linearGradient>
        </defs>
        <line x1={padding} y1={height - padding} x2={width - padding} y2={height - padding} stroke="#e3d4c8" strokeWidth="1" />
        <path d={areaPath} fill="url(#revenueFill)" />
        <path d={linePath} fill="none" stroke="#eb9d1b" strokeWidth="2.2" />
        {coords.map((c) => (
          <circle key={c.label} cx={c.x} cy={c.y} r="3.5" fill="#b97812" />
        ))}
      </svg>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: "var(--ink-faint)" }}>
        {points.map((p) => (
          <span key={p.label}>{p.label}</span>
        ))}
      </div>
    </div>
  );
}
