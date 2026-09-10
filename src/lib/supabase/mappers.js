// Converts between snake_case Postgres rows and the camelCase shapes the
// rest of the app (built against the old products.json / users.json /
// orders.json files) already expects. Keeping these mappers in one place
// means no component or page had to change during the Supabase migration.

export function productFromRow(row) {
  if (!row) return row;
  return {
    id: row.id,
    slug: row.slug,
    sku: row.sku,
    name: row.name,
    expression: row.expression,
    family: row.family,
    tagline: row.tagline,
    shortDescription: row.short_description,
    price: row.price,
    compareAtPrice: row.compare_at_price,
    accent: row.accent,
    accentSoft: row.accent_soft,
    sizes: row.sizes ?? [],
    stock: row.stock,
    featured: row.featured,
    comingSoon: row.coming_soon,
    rating: row.rating,
    reviews: row.reviews,
    notes: row.notes ?? {},
    overview: row.overview ?? [],
    howToWear: row.how_to_wear,
    ingredients: row.ingredients,
    cardImage: row.card_image,
    bannerImage: row.banner_image,
    images: row.images ?? [],
    moodLabel: row.mood_label,
    moodDescription: row.mood_description,
    createdAt: row.created_at,
  };
}

export function productToRow(product) {
  const row = {};
  if (product.id !== undefined) row.id = product.id;
  if (product.slug !== undefined) row.slug = product.slug;
  if (product.sku !== undefined) row.sku = product.sku;
  if (product.name !== undefined) row.name = product.name;
  if (product.expression !== undefined) row.expression = product.expression;
  if (product.family !== undefined) row.family = product.family;
  if (product.tagline !== undefined) row.tagline = product.tagline;
  if (product.shortDescription !== undefined) row.short_description = product.shortDescription;
  if (product.price !== undefined) row.price = product.price;
  if (product.compareAtPrice !== undefined) row.compare_at_price = product.compareAtPrice;
  if (product.accent !== undefined) row.accent = product.accent;
  if (product.accentSoft !== undefined) row.accent_soft = product.accentSoft;
  if (product.sizes !== undefined) row.sizes = product.sizes;
  if (product.stock !== undefined) row.stock = product.stock;
  if (product.featured !== undefined) row.featured = product.featured;
  if (product.comingSoon !== undefined) row.coming_soon = product.comingSoon;
  if (product.rating !== undefined) row.rating = product.rating;
  if (product.reviews !== undefined) row.reviews = product.reviews;
  if (product.notes !== undefined) row.notes = product.notes;
  if (product.overview !== undefined) row.overview = product.overview;
  if (product.howToWear !== undefined) row.how_to_wear = product.howToWear;
  if (product.ingredients !== undefined) row.ingredients = product.ingredients;
  if (product.cardImage !== undefined) row.card_image = product.cardImage;
  if (product.bannerImage !== undefined) row.banner_image = product.bannerImage;
  if (product.images !== undefined) row.images = product.images;
  if (product.moodLabel !== undefined) row.mood_label = product.moodLabel;
  if (product.moodDescription !== undefined) row.mood_description = product.moodDescription;
  return row;
}

export function customerFromRow(row) {
  if (!row) return row;
  return {
    id: row.id,
    name: row.name,
    email: row.email,
    phone: row.phone ?? "",
    city: row.city ?? "",
    orders: row.orders ?? 0,
    totalSpent: row.total_spent ?? 0,
    status: row.status ?? "active",
    joined: row.joined,
  };
}

export function orderFromRow(row) {
  if (!row) return row;
  return {
    id: row.id,
    userId: row.customer_id,
    customerName: row.customer_name,
    email: row.email ?? "",
    phone: row.phone ?? "",
    address: row.address ?? "",
    items: (row.order_items ?? []).map((item) => ({
      productId: item.product_id,
      size: item.size,
      qty: item.qty,
      price: item.price,
    })),
    total: row.total,
    status: row.status,
    date: row.created_at,
    paymentStatus: row.payment_status ?? "unpaid",
    razorpayOrderId: row.razorpay_order_id ?? null,
    razorpayPaymentId: row.razorpay_payment_id ?? null,
  };
}
