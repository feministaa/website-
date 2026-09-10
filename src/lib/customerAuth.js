import { supabaseServer } from "@/lib/supabase/server";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { customerFromRow } from "@/lib/supabase/mappers";

// Thin wrapper around Supabase Auth so the rest of the app (account routes,
// pages) doesn't need to know the session lives in Supabase's own cookies.

export async function signUpCustomer({ name, email, phone, city, password }) {
  const supabase = await supabaseServer();
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: { data: { name, phone, city } },
  });
  if (error) throw error;
  return data;
}

export async function signInCustomer({ email, password }) {
  const supabase = await supabaseServer();
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) throw error;
  return data;
}

export async function signOutCustomer() {
  const supabase = await supabaseServer();
  await supabase.auth.signOut();
}

// Returns the signed-in customer's profile (from the `customers` table), or
// null if nobody is signed in.
export async function getCurrentCustomer() {
  const supabase = await supabaseServer();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;

  // Read via the service-role client: RLS would normally allow this anyway
  // (customers can read their own row), but the trigger that creates the
  // customers row can lag signUp() by a beat, so we also self-heal here.
  const { data, error } = await supabaseAdmin()
    .from("customers")
    .select("*")
    .eq("auth_user_id", user.id)
    .maybeSingle();
  if (error) throw error;

  if (data) return customerFromRow(data);

  // Trigger hasn't run yet (or this account predates it) — create the row now.
  const { data: created, error: createError } = await supabaseAdmin()
    .from("customers")
    .upsert(
      {
        auth_user_id: user.id,
        name: user.user_metadata?.name || user.email.split("@")[0],
        email: user.email,
        phone: user.user_metadata?.phone || "",
        city: user.user_metadata?.city || "",
      },
      { onConflict: "email" }
    )
    .select()
    .single();
  if (createError) throw createError;
  return customerFromRow(created);
}
