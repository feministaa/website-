"use client";

import { useRef, useState } from "react";
import styles from "./ImageUploadField.module.css";

async function uploadFile(file) {
  const formData = new FormData();
  formData.append("file", file);
  const res = await fetch("/api/admin/upload", { method: "POST", body: formData });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || "Upload failed.");
  return data.path;
}

export function ImageUploadField({ label, value, onChange }) {
  const inputRef = useRef(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  async function handleFile(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    setError("");
    setUploading(true);
    try {
      const path = await uploadFile(file);
      onChange(path);
    } catch (err) {
      setError(err.message);
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  }

  return (
    <div className={styles.field}>
      <label>{label}</label>
      <div className={styles.uploadBox}>
        {value ? (
          <div className={styles.preview}>
            <img src={value} alt="" />
            <button type="button" className={styles.removeBtn} onClick={() => onChange("")}>
              Remove
            </button>
          </div>
        ) : (
          <button type="button" className={styles.uploadBtn} onClick={() => inputRef.current?.click()} disabled={uploading}>
            {uploading ? "Uploading…" : "Upload Image"}
          </button>
        )}
        <input ref={inputRef} type="file" accept="image/jpeg,image/png,image/webp" hidden onChange={handleFile} />
      </div>
      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
}

export function ImageGalleryField({ label, values, onChange }) {
  const inputRef = useRef(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  async function handleFile(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    setError("");
    setUploading(true);
    try {
      const path = await uploadFile(file);
      onChange([...values, path]);
    } catch (err) {
      setError(err.message);
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  }

  function removeAt(i) {
    onChange(values.filter((_, idx) => idx !== i));
  }

  return (
    <div className={styles.field}>
      <label>{label}</label>
      <div className={styles.gallery}>
        {values.map((src, i) => (
          <div key={src + i} className={styles.galleryThumb}>
            <img src={src} alt="" />
            <button type="button" className={styles.thumbRemove} onClick={() => removeAt(i)} aria-label="Remove image">
              ×
            </button>
          </div>
        ))}
        <button type="button" className={styles.addThumb} onClick={() => inputRef.current?.click()} disabled={uploading}>
          {uploading ? "…" : "+ Add"}
        </button>
        <input ref={inputRef} type="file" accept="image/jpeg,image/png,image/webp" hidden onChange={handleFile} />
      </div>
      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
}
