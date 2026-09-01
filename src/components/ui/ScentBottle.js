"use client";

import { useId } from "react";

function shade(hex, amt) {
  const n = hex.replace("#", "");
  const num = parseInt(n.length === 3 ? n.split("").map((c) => c + c).join("") : n, 16);
  let r = (num >> 16) + amt;
  let g = ((num >> 8) & 0x00ff) + amt;
  let b = (num & 0x0000ff) + amt;
  r = Math.max(Math.min(255, r), 0);
  g = Math.max(Math.min(255, g), 0);
  b = Math.max(Math.min(255, b), 0);
  return `#${(r << 16 | g << 8 | b).toString(16).padStart(6, "0")}`;
}

export default function ScentBottle({ accent = "#eb9d1b", accentSoft = "#f6d9a4", size = 220, isSet = false, className, showLabel = true }) {
  const uid = useId().replace(/[:]/g, "");
  const deep = shade(accent, -50);
  const deeper = shade(accent, -70);

  if (isSet) {
    const combos = [
      { c: "#b8792f", cs: "#f1d9ab" },
      { c: "#c98a93", cs: "#f3d9dc" },
      { c: "#8fa66a", cs: "#e2ecc9" },
    ];
    return (
      <svg width={size} height={size} viewBox="0 0 240 240" className={className} role="img" aria-label="Discovery set of three bottles">
        <defs>
          <radialGradient id={`setShadow-${uid}`} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#090909" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#090909" stopOpacity="0" />
          </radialGradient>
        </defs>
        <ellipse cx="120" cy="200" rx="98" ry="12" fill={`url(#setShadow-${uid})`} />
        {combos.map((b, idx) => {
          const x = 34 + idx * 62;
          const bid = `${uid}-set-${idx}`;
          const d = shade(b.c, -46);
          return (
            <g key={idx} transform={`translate(${x}, ${idx === 1 ? 26 : 46})`}>
              <defs>
                <linearGradient id={`glass-${bid}`} x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor={b.cs} />
                  <stop offset="42%" stopColor={b.c} />
                  <stop offset="60%" stopColor={d} />
                  <stop offset="100%" stopColor={b.c} />
                </linearGradient>
              </defs>
              <rect x="4" y="34" width="34" height="100" rx="5" fill={`url(#glass-${bid})`} stroke={d} strokeWidth="0.6" />
              <rect x="9" y="38" width="6" height="90" rx="3" fill="#fff" opacity="0.3" />
              <rect x="13" y="18" width="14" height="20" rx="2" fill={d} />
              <rect x="16" y="6" width="8" height="14" rx="2" fill="#e9dcb9" stroke="#c9a153" strokeWidth="0.6" />
            </g>
          );
        })}
      </svg>
    );
  }

  const bodyGrad = `bodyGrad-${uid}`;
  const capGrad = `capGrad-${uid}`;
  const capGradV = `capGradV-${uid}`;
  const glassShine = `glassShine-${uid}`;
  const hotspot = `hotspot-${uid}`;
  const ao = `ao-${uid}`;
  const clipId = `clip-${uid}`;

  return (
    <svg width={size} height={size} viewBox="0 0 200 290" className={className} role="img" aria-label="Feminista perfume bottle">
      <defs>
        <linearGradient id={bodyGrad} x1="0" y1="0" x2="1" y2="0.12">
          <stop offset="0%" stopColor={shade(accentSoft, 10)} />
          <stop offset="22%" stopColor={accentSoft} />
          <stop offset="42%" stopColor={accent} />
          <stop offset="58%" stopColor={deep} />
          <stop offset="76%" stopColor={accent} />
          <stop offset="100%" stopColor={shade(accent, 22)} />
        </linearGradient>
        <linearGradient id={ao} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={deeper} stopOpacity="0" />
          <stop offset="82%" stopColor={deeper} stopOpacity="0" />
          <stop offset="100%" stopColor={deeper} stopOpacity="0.4" />
        </linearGradient>
        <linearGradient id={capGrad} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#f6ead0" />
          <stop offset="18%" stopColor="#e2c690" />
          <stop offset="38%" stopColor="#a9814a" />
          <stop offset="50%" stopColor="#8c6d3f" />
          <stop offset="62%" stopColor="#a9814a" />
          <stop offset="82%" stopColor="#e2c690" />
          <stop offset="100%" stopColor="#f6ead0" />
        </linearGradient>
        <linearGradient id={capGradV} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#fff6e0" />
          <stop offset="100%" stopColor="#c9a153" />
        </linearGradient>
        <radialGradient id={hotspot} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.85" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </radialGradient>
        <linearGradient id={glassShine} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>
        <clipPath id={clipId}>
          <path d="M58 112 C56 112 55 114 55 117 L52 232 C52 246 66 256 100 256 C134 256 148 246 148 232 L145 117 C145 114 144 112 142 112 Z" />
        </clipPath>
      </defs>

      {/* grounding shadow, stacked for soft falloff */}
      <ellipse cx="100" cy="266" rx="60" ry="11" fill={deeper} opacity="0.16" />
      <ellipse cx="100" cy="264" rx="46" ry="7" fill={deeper} opacity="0.22" />
      <ellipse cx="100" cy="262" rx="30" ry="4" fill={deeper} opacity="0.28" />

      {/* body */}
      <path
        d="M58 112 C56 112 55 114 55 117 L52 232 C52 246 66 256 100 256 C134 256 148 246 148 232 L145 117 C145 114 144 112 142 112 Z"
        fill={`url(#${bodyGrad})`}
        stroke={deep}
        strokeWidth="1"
      />
      <g clipPath={`url(#${clipId})`}>
        <rect x="52" y="112" width="96" height="144" fill={`url(#${ao})`} />
        <path d="M70 120 C67 156 66 200 68 250" stroke={`url(#${glassShine})`} strokeWidth="10" strokeLinecap="round" fill="none" opacity="0.85" />
        <path d="M128 128 C130 160 131 196 129 244" stroke="#ffffff" strokeWidth="5" strokeLinecap="round" fill="none" opacity="0.22" />
        <ellipse cx="72" cy="140" rx="10" ry="20" fill={`url(#${hotspot})`} />
      </g>

      {/* shoulder */}
      <path d="M58 112 L142 112 L130 66 C128 59 121 54 112 54 L88 54 C79 54 72 59 70 66 Z" fill={`url(#${capGrad})`} opacity="0.97" />
      <path d="M58 112 L142 112 L139 103 L61 103 Z" fill={deep} opacity="0.45" />
      <path d="M72 66 C74 61 80 56 88 56" stroke="#fff6e0" strokeWidth="1.4" fill="none" opacity="0.6" strokeLinecap="round" />

      {/* neck with banding */}
      <rect x="80" y="32" width="40" height="26" rx="3" fill={`url(#${capGrad})`} />
      <rect x="80" y="32" width="40" height="4" fill="#fff6e0" opacity="0.5" />
      <rect x="80" y="44" width="40" height="1.4" fill={deeper} opacity="0.35" />
      <rect x="80" y="52" width="40" height="1.4" fill={deeper} opacity="0.35" />

      {/* faceted gem cap */}
      <g transform="translate(100,17)">
        <ellipse cx="0" cy="15" rx="15" ry="4" fill={deep} opacity="0.4" />
        <polygon points="0,-17 15,-6 10,13 -10,13 -15,-6" fill={`url(#${capGradV})`} stroke="#a9814a" strokeWidth="1" />
        <polygon points="0,-17 15,-6 0,2" fill="#ffffff" opacity="0.6" />
        <polygon points="0,-17 -15,-6 0,2" fill="#c9a153" opacity="0.4" />
        <polygon points="15,-6 10,13 0,2" fill="#8c6d3f" opacity="0.45" />
        <polygon points="-15,-6 -10,13 0,2" fill="#f6d9a4" opacity="0.55" />
        <polygon points="0,-17 6,-9 -6,-9" fill="#ffffff" opacity="0.75" />
      </g>

      {showLabel && (
        <g>
          <rect x="64" y="168" width="72" height="46" rx="2" fill="#f1e9e6" stroke={accent} strokeWidth="0.7" />
          <rect x="64" y="168" width="72" height="46" rx="2" fill="#ffffff" opacity="0.4" />
          <image
            href="/feminista-logo-black.png"
            x="76"
            y="173"
            width="48"
            height="26"
            preserveAspectRatio="xMidYMid meet"
            opacity="0.92"
          />
          <line x1="80" y1="203" x2="120" y2="203" stroke={deep} strokeWidth="0.6" opacity="0.55" />
        </g>
      )}
    </svg>
  );
}
