"use client";

export default function ScentBottle({ accent = "#a87f3f", accentSoft = "#e7d6ad", size = 220, isSet = false, className }) {
  if (isSet) {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 220 220"
        className={className}
        role="img"
        aria-label="Discovery set of three bottles"
      >
        <rect x="8" y="150" width="204" height="10" rx="2" fill={accentSoft} opacity="0.5" />
        {[
          { x: 40, c: "#b8792f", cs: "#f1d9ab" },
          { x: 92, c: "#c98a93", cs: "#f3d9dc" },
          { x: 144, c: "#8fa66a", cs: "#e2ecc9" },
        ].map((b, idx) => (
          <g key={idx} transform={`translate(${b.x}, 40)`}>
            <rect x="6" y="30" width="24" height="80" rx="4" fill={b.cs} stroke={b.c} strokeWidth="1.2" />
            <rect x="12" y="14" width="12" height="18" rx="2" fill={b.c} opacity="0.85" />
            <rect x="14" y="4" width="8" height="12" rx="2" fill="#d9c79b" />
          </g>
        ))}
      </svg>
    );
  }

  return (
    <svg width={size} height={size} viewBox="0 0 200 260" className={className} role="img" aria-label="Feminista perfume bottle">
      <ellipse cx="100" cy="246" rx="52" ry="8" fill={accent} opacity="0.12" />
      <path
        d="M62 100 L60 220 C60 232 70 240 100 240 C130 240 140 232 140 220 L138 100 Z"
        fill={accentSoft}
        stroke={accent}
        strokeWidth="1.4"
      />
      <path d="M62 100 L138 100 L128 60 C126 54 120 50 112 50 L88 50 C80 50 74 54 72 60 Z" fill={accent} opacity="0.9" />
      <rect x="82" y="28" width="36" height="26" rx="4" fill="#3a3226" />
      <rect x="88" y="8" width="24" height="24" rx="10" fill="none" stroke="#d9c79b" strokeWidth="2" />
      <rect x="94" y="2" width="12" height="10" rx="3" fill="#e9dcb9" />
      <rect x="72" y="150" width="56" height="30" rx="2" fill="#fbf8f2" opacity="0.9" stroke={accent} strokeWidth="0.6" />
      <line x1="80" y1="160" x2="120" y2="160" stroke={accent} strokeWidth="0.8" opacity="0.6" />
      <line x1="80" y1="167" x2="112" y2="167" stroke={accent} strokeWidth="0.8" opacity="0.4" />
    </svg>
  );
}
