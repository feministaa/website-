// One-off migration: pushes the old local JSON "database" (src/data/*.json)
// into Supabase. Safe to re-run — it skips rows that already exist.
//
// Usage:
//   node scripts/seed-supabase.mjs
//
// Requires NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in
// .env.local (same values the app itself uses).

import { createClient } from "@supabase/supabase-js";
import { readFile } from "fs/promises";
import path from "path";
import { config } from "dotenv";

config({ path: path.join(process.cwd(), ".env.local") });

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!url || !serviceRoleKey) {
  console.error("Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env.local");
  process.exit(1);
}

const supabase = createClient(url, serviceRoleKey, { auth: { persistSession: false } });

async function readJson(file) {
  const raw = await readFile(path.join(process.cwd(), "src", "data", file), "utf-8");
  return JSON.parse(raw);
}

function productToRow(p) {
  return {
    id: p.id,
    slug: p.slug,
    sku: p.sku,
    name: p.name,
    expression: p.expression,
    family: p.family,
    tagline: p.tagline,
    short_description: p.shortDescription,
    price: p.price,
    compare_at_price: p.compareAtPrice ?? null,
    accent: p.accent,
    accent_soft: p.accentSoft,
    sizes: p.sizes ?? [],
    stock: p.stock ?? 0,
    featured: !!p.featured,
    coming_soon: !!p.comingSoon,
    rating: p.rating ?? 5,
    reviews: p.reviews ?? 0,
    notes: p.notes ?? {},
    overview: p.overview ?? [],
    how_to_wear: p.howToWear,
    ingredients: p.ingredients,
    card_image: p.cardImage,
    banner_image: p.bannerImage,
    images: p.images ?? [],
    mood_label: p.moodLabel,
    mood_description: p.moodDescription,
    created_at: p.createdAt || new Date().toISOString(),
  };
}

async function seedProducts() {
  const products = await readJson("products.json");
  const { error } = await supabase.from("products").upsert(products.map(productToRow), { onConflict: "id" });
  if (error) throw new Error(`products: ${error.message}`);
  console.log(`✓ ${products.length} products`);
  return products;
}

async function seedCustomers() {
  const users = await readJson("users.json");
  const oldIdToNewId = new Map();

  for (const u of users) {
    const { data, error } = await supabase
      .from("customers")
      .upsert(
        {
          name: u.name,
          email: u.email,
          phone: u.phone || "",
          city: u.city || "",
          orders: u.orders ?? 0,
          total_spent: u.totalSpent ?? 0,
          status: u.status || "active",
          joined: u.joined || new Date().toISOString(),
        },
        { onConflict: "email" }
      )
      .select("id")
      .single();
    if (error) throw new Error(`customers (${u.email}): ${error.message}`);
    oldIdToNewId.set(u.id, data.id);
  }

  console.log(`✓ ${users.length} customers`);
  return oldIdToNewId;
}

async function seedOrders(oldIdToNewId) {
  const orders = await readJson("orders.json");

  for (const o of orders) {
    const { error: orderError } = await supabase.from("orders").upsert(
      {
        id: o.id,
        customer_id: oldIdToNewId.get(o.userId) || null,
        customer_name: o.customerName,
        email: o.email || "",
        phone: o.phone || "",
        address: o.address || "",
        total: o.total,
        status: o.status || "pending",
        created_at: o.date || new Date().toISOString(),
      },
      { onConflict: "id" }
    );
    if (orderError) throw new Error(`orders (${o.id}): ${orderError.message}`);

    // Simplest safe way to keep item rows in sync on re-runs: replace them.
    await supabase.from("order_items").delete().eq("order_id", o.id);
    if (o.items?.length) {
      const { error: itemsError } = await supabase.from("order_items").insert(
        o.items.map((item) => ({
          order_id: o.id,
          product_id: item.productId,
          size: item.size,
          qty: item.qty,
          price: item.price,
        }))
      );
      if (itemsError) throw new Error(`order_items (${o.id}): ${itemsError.message}`);
    }
  }

  console.log(`✓ ${orders.length} orders`);
}

async function main() {
  await seedProducts();
  const oldIdToNewId = await seedCustomers();
  await seedOrders(oldIdToNewId);
  console.log("\nDone. Your Supabase project now has the same data the JSON files did.");
}

main().catch((err) => {
  console.error("\nSeed failed:", err.message);
  process.exit(1);
});
