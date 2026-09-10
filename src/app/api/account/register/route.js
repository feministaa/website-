import { NextResponse } from "next/server";
import { signUpCustomer, getCurrentCustomer } from "@/lib/customerAuth";

export const runtime = "nodejs";

export async function POST(request) {
  const { name, email, phone, city, password } = await request.json();

  if (!name || !email || !password) {
    return NextResponse.json({ error: "Name, email and password are required." }, { status: 400 });
  }
  if (password.length < 6) {
    return NextResponse.json({ error: "Password must be at least 6 characters." }, { status: 400 });
  }

  let signUpResult;
  try {
    signUpResult = await signUpCustomer({ name, email, phone, city, password });
  } catch (err) {
    const message = /already registered|already exists/i.test(err.message)
      ? "An account with this email already exists."
      : err.message || "Could not create your account.";
    const status = /already registered|already exists/i.test(err.message) ? 409 : 400;
    return NextResponse.json({ error: message }, { status });
  }

  // If Supabase Auth has "Confirm email" turned on, signUp succeeds but no
  // session is issued until the user clicks the confirmation link — there's
  // no signed-in customer to return yet.
  if (!signUpResult.session) {
    return NextResponse.json(
      { pendingEmailConfirmation: true, message: "Check your email to confirm your account before signing in." },
      { status: 201 }
    );
  }

  const user = await getCurrentCustomer();
  return NextResponse.json(user, { status: 201 });
}
