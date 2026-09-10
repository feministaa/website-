import { supabaseAdmin } from "@/lib/supabase/admin";
import { productFromRow, productToRow, customerFromRow, orderFromRow } from "@/lib/supabase/mappers";

// Server-only data access layer, backed by Supabase (service_role — bypasses
// RLS, so every caller here must already be a trusted server context: a
// Route Handler or a Server Component, never something invoked from the
// browser directly).

// ---------------------------------------------------------------------------
// products
// ---------------------------------------------------------------------------
export async function getProducts() {
  const { data, error } = await supabaseAdmin().from("products").select("*").order("created_at");
  if (error) throw error;
  return data.map(productFromRow);
}

export async function getProduct(id) {
  const { data, error } = await supabaseAdmin().from("products").select("*").eq("id", id).maybeSingle();
  if (error) throw error;
  return productFromRow(data);
}

export async function createProduct(product) {
  const { data, error } = await supabaseAdmin()
    .from("products")
    .insert(productToRow(product))
    .select()
    .single();
  if (error) throw error;
  return productFromRow(data);
}

export async function updateProduct(id, patch) {
  const { data, error } = await supabaseAdmin()
    .from("products")
    .update(productToRow(patch))
    .eq("id", id)
    .select()
    .maybeSingle();
  if (error) throw error;
  return productFromRow(data);
}

export async function deleteProduct(id) {
  const { error } = await supabaseAdmin().from("products").delete().eq("id", id);
  if (error) throw error;
}

// ---------------------------------------------------------------------------
// customers (aka "users" in the old JSON-backed API)
// ---------------------------------------------------------------------------
export async function getUsers() {
  const { data, error } = await supabaseAdmin().from("customers").select("*").order("joined", { ascending: false });
  if (error) throw error;
  return data.map(customerFromRow);
}

export async function getUserById(id) {
  const { data, error } = await supabaseAdmin().from("customers").select("*").eq("id", id).maybeSingle();
  if (error) throw error;
  return customerFromRow(data);
}

export async function getUserByEmail(email) {
  const { data, error } = await supabaseAdmin()
    .from("customers")
    .select("*")
    .ilike("email", email)
    .maybeSingle();
  if (error) throw error;
  return customerFromRow(data);
}

export async function updateUser(id, patch) {
  const row = {};
  if (patch.name !== undefined) row.name = patch.name;
  if (patch.phone !== undefined) row.phone = patch.phone;
  if (patch.city !== undefined) row.city = patch.city;
  if (patch.status !== undefined) row.status = patch.status;
  if (patch.orders !== undefined) row.orders = patch.orders;
  if (patch.totalSpent !== undefined) row.total_spent = patch.totalSpent;

  const { data, error } = await supabaseAdmin().from("customers").update(row).eq("id", id).select().maybeSingle();
  if (error) throw error;
  return customerFromRow(data);
}

export async function deleteUser(id) {
  const { error } = await supabaseAdmin().from("customers").delete().eq("id", id);
  if (error) throw error;
}

// Finds a customer by email, or creates a guest CRM record for them (no
// Supabase Auth login attached — that only happens if/when they register).
export async function upsertGuestCustomer({ name, email, phone, city, orderTotal }) {
  const existing = await getUserByEmail(email);

  if (existing) {
    const { data, error } = await supabaseAdmin()
      .from("customers")
      .update({
        orders: existing.orders + 1,
        total_spent: existing.totalSpent + orderTotal,
      })
      .eq("id", existing.id)
      .select()
      .single();
    if (error) throw error;
    return customerFromRow(data);
  }

  const { data, error } = await supabaseAdmin()
    .from("customers")
    .insert({
      name,
      email,
      phone: phone || "",
      city: city || "",
      orders: 1,
      total_spent: orderTotal,
      status: "active",
    })
    .select()
    .single();
  if (error) throw error;
  return customerFromRow(data);
}

// ---------------------------------------------------------------------------
// orders
// ---------------------------------------------------------------------------
export async function getOrders() {
  const { data, error } = await supabaseAdmin()
    .from("orders")
    .select("*, order_items(*)")
    .order("created_at", { ascending: false });
  if (error) throw error;
  return data.map(orderFromRow);
}

export async function getOrdersForCustomer(customerId) {
  const { data, error } = await supabaseAdmin()
    .from("orders")
    .select("*, order_items(*)")
    .eq("customer_id", customerId)
    .order("created_at", { ascending: false });
  if (error) throw error;
  return data.map(orderFromRow);
}

export async function createOrder({
  customerId,
  customerName,
  email,
  phone,
  address,
  items,
  total,
  razorpayOrderId,
  razorpayPaymentId,
  paymentStatus,
}) {
  const orders = await getOrders();
  const nextNumber = orders.length
    ? Math.max(...orders.map((o) => parseInt(o.id.split("-")[1], 10) || 0)) + 1
    : 1001;
  const id = `FEM-${nextNumber}`;

  const { error: orderError } = await supabaseAdmin().from("orders").insert({
    id,
    customer_id: customerId,
    customer_name: customerName,
    email: email || "",
    phone: phone || "",
    address: address || "",
    total,
    status: "pending",
    razorpay_order_id: razorpayOrderId || null,
    razorpay_payment_id: razorpayPaymentId || null,
    payment_status: paymentStatus || "unpaid",
  });
  if (orderError) throw orderError;

  const { error: itemsError } = await supabaseAdmin()
    .from("order_items")
    .insert(items.map((item) => ({ order_id: id, product_id: item.productId, size: item.size, qty: item.qty, price: item.price })));
  if (itemsError) throw itemsError;

  const { data, error } = await supabaseAdmin().from("orders").select("*, order_items(*)").eq("id", id).single();
  if (error) throw error;
  return orderFromRow(data);
}

export async function updateOrder(id, patch) {
  const { error } = await supabaseAdmin().from("orders").update(patch).eq("id", id);
  if (error) throw error;

  const { data, error: fetchError } = await supabaseAdmin().from("orders").select("*, order_items(*)").eq("id", id).single();
  if (fetchError) throw fetchError;
  return orderFromRow(data);
}
