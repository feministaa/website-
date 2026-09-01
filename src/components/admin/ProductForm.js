"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./ProductForm.module.css";

function toList(str) {
  return str
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}

export default function ProductForm({ initialProduct = null }) {
  const isEdit = Boolean(initialProduct);
  const router = useRouter();
  const [form, setForm] = useState({
    name: initialProduct?.name || "",
    slug: initialProduct?.slug || "",
    expression: initialProduct?.expression || "",
    family: initialProduct?.family || "magnetic",
    tagline: initialProduct?.tagline || "",
    shortDescription: initialProduct?.shortDescription || "",
    price: initialProduct?.price ?? "",
    compareAtPrice: initialProduct?.compareAtPrice ?? "",
    stock: initialProduct?.stock ?? 20,
    accent: initialProduct?.accent || "#eb9d1b",
    accentSoft: initialProduct?.accentSoft || "#f6d9a4",
    featured: initialProduct?.featured ?? true,
    topNotes: initialProduct?.notes?.top?.join(", ") || "",
    heartNotes: initialProduct?.notes?.heart?.join(", ") || "",
    baseNotes: initialProduct?.notes?.base?.join(", ") || "",
    howToWear: initialProduct?.howToWear || "",
    ingredients: initialProduct?.ingredients || "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setSubmitting(true);

    const payload = {
      name: form.name,
      slug: form.slug,
      expression: form.expression,
      family: form.family,
      tagline: form.tagline,
      shortDescription: form.shortDescription,
      price: Number(form.price),
      compareAtPrice: form.compareAtPrice ? Number(form.compareAtPrice) : null,
      stock: Number(form.stock),
      accent: form.accent,
      accentSoft: form.accentSoft,
      featured: form.featured,
      notes: {
        top: toList(form.topNotes),
        heart: toList(form.heartNotes),
        base: toList(form.baseNotes),
      },
      howToWear: form.howToWear,
      ingredients: form.ingredients,
      sizes: [
        { label: "50 ml", price: Math.round(Number(form.price) * 0.65) },
        { label: "100 ml", price: Number(form.price) },
      ],
      overview: initialProduct?.overview || [
        { title: "A Presence That Lingers", body: form.shortDescription },
      ],
      moodLabel: form.expression?.replace("The ", "") || "",
      moodDescription: form.tagline,
    };

    try {
      const url = isEdit ? `/api/products/${initialProduct.id}` : "/api/products";
      const res = await fetch(url, {
        method: isEdit ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Something went wrong.");
      }
      router.push("/admin/products");
      router.refresh();
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form className={styles.panel} onSubmit={handleSubmit}>
      {error && <p className={styles.error}>{error}</p>}

      <div className={styles.sectionTitle}>Basics</div>
      <div className={styles.grid2}>
        <div className={styles.field}>
          <label>Product Name</label>
          <input className={styles.input} required value={form.name} onChange={(e) => update("name", e.target.value)} />
        </div>
        <div className={styles.field}>
          <label>Expression (e.g. The Magnetic)</label>
          <input className={styles.input} value={form.expression} onChange={(e) => update("expression", e.target.value)} />
        </div>
      </div>
      <div className={styles.grid2}>
        <div className={styles.field}>
          <label>URL Slug {isEdit && "(locked)"}</label>
          <input
            className={styles.input}
            value={form.slug}
            disabled={isEdit}
            placeholder="auto-generated from name if left blank"
            onChange={(e) => update("slug", e.target.value)}
          />
        </div>
        <div className={styles.field}>
          <label>Family / Mood</label>
          <select className={styles.select} value={form.family} onChange={(e) => update("family", e.target.value)}>
            <option value="magnetic">Magnetic</option>
            <option value="intimate">Intimate</option>
            <option value="luminous">Luminous</option>
            <option value="set">Discovery Set</option>
          </select>
        </div>
      </div>
      <div className={styles.field}>
        <label>Tagline</label>
        <input className={styles.input} value={form.tagline} onChange={(e) => update("tagline", e.target.value)} />
      </div>
      <div className={styles.field}>
        <label>Short Description</label>
        <textarea className={styles.textarea} value={form.shortDescription} onChange={(e) => update("shortDescription", e.target.value)} />
      </div>

      <div className={styles.sectionTitle}>Pricing & Inventory</div>
      <div className={styles.grid3}>
        <div className={styles.field}>
          <label>Price (₹, 100ml)</label>
          <input type="number" min="0" className={styles.input} required value={form.price} onChange={(e) => update("price", e.target.value)} />
        </div>
        <div className={styles.field}>
          <label>Compare-at Price</label>
          <input type="number" min="0" className={styles.input} value={form.compareAtPrice} onChange={(e) => update("compareAtPrice", e.target.value)} />
        </div>
        <div className={styles.field}>
          <label>Stock</label>
          <input type="number" min="0" className={styles.input} value={form.stock} onChange={(e) => update("stock", e.target.value)} />
        </div>
      </div>

      <div className={styles.sectionTitle}>Presentation</div>
      <div className={styles.grid2}>
        <div className={styles.field}>
          <label>Accent Color</label>
          <input type="color" className={styles.input} value={form.accent} onChange={(e) => update("accent", e.target.value)} style={{ height: 42, padding: 4 }} />
        </div>
        <div className={styles.field}>
          <label>Accent Soft Color</label>
          <input type="color" className={styles.input} value={form.accentSoft} onChange={(e) => update("accentSoft", e.target.value)} style={{ height: 42, padding: 4 }} />
        </div>
      </div>
      <label className={styles.checkboxRow}>
        <input type="checkbox" checked={form.featured} onChange={(e) => update("featured", e.target.checked)} />
        Feature on homepage
      </label>

      <div className={styles.sectionTitle}>Fragrance Notes</div>
      <div className={styles.field}>
        <label>Top Notes (comma separated)</label>
        <input className={styles.input} value={form.topNotes} onChange={(e) => update("topNotes", e.target.value)} />
      </div>
      <div className={styles.field}>
        <label>Heart Notes (comma separated)</label>
        <input className={styles.input} value={form.heartNotes} onChange={(e) => update("heartNotes", e.target.value)} />
      </div>
      <div className={styles.field}>
        <label>Base Notes (comma separated)</label>
        <input className={styles.input} value={form.baseNotes} onChange={(e) => update("baseNotes", e.target.value)} />
      </div>

      <div className={styles.sectionTitle}>Details</div>
      <div className={styles.field}>
        <label>How to Wear</label>
        <textarea className={styles.textarea} value={form.howToWear} onChange={(e) => update("howToWear", e.target.value)} />
      </div>
      <div className={styles.field}>
        <label>Ingredients</label>
        <textarea className={styles.textarea} value={form.ingredients} onChange={(e) => update("ingredients", e.target.value)} />
      </div>

      <div className={styles.actions}>
        <button type="submit" className="btn btn-primary" disabled={submitting}>
          {submitting ? "Saving…" : isEdit ? "Save Changes" : "Add Product"}
        </button>
        <button type="button" className="btn btn-ghost" onClick={() => router.push("/admin/products")}>
          Cancel
        </button>
      </div>
    </form>
  );
}
