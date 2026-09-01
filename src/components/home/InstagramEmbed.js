"use client";

import { useEffect, useRef } from "react";

let scriptPromise = null;

function loadEmbedScript() {
  if (scriptPromise) return scriptPromise;
  scriptPromise = new Promise((resolve) => {
    if (window.instgrm) {
      resolve(window.instgrm);
      return;
    }
    const script = document.createElement("script");
    script.src = "https://www.instagram.com/embed.js";
    script.async = true;
    script.onload = () => resolve(window.instgrm);
    document.body.appendChild(script);
  });
  return scriptPromise;
}

export default function InstagramEmbed({ url }) {
  const ref = useRef(null);

  useEffect(() => {
    let cancelled = false;
    loadEmbedScript().then((instgrm) => {
      if (!cancelled && instgrm) instgrm.Embeds.process();
    });
    return () => {
      cancelled = true;
    };
  }, [url]);

  return (
    <div ref={ref}>
      <blockquote
        className="instagram-media"
        data-instgrm-permalink={url}
        data-instgrm-version="14"
        style={{ margin: 0, width: "100%", minWidth: "326px" }}
      />
    </div>
  );
}
