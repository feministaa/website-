"use client";

export default function QuantitySelector({ value, onChange, min = 1, max = 10 }) {
  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        border: "1px solid var(--line)",
        borderRadius: 2,
      }}
    >
      <button
        aria-label="Decrease quantity"
        onClick={() => onChange(Math.max(min, value - 1))}
        style={{ width: 40, height: 44, fontSize: 16 }}
        disabled={value <= min}
      >
        −
      </button>
      <span style={{ width: 36, textAlign: "center", fontSize: 14 }}>{value}</span>
      <button
        aria-label="Increase quantity"
        onClick={() => onChange(Math.min(max, value + 1))}
        style={{ width: 40, height: 44, fontSize: 16 }}
        disabled={value >= max}
      >
        +
      </button>
    </div>
  );
}
