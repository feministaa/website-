import { cookies } from "next/headers";
import bcrypt from "bcryptjs";
import { getUsers } from "./dataStore";

export const CUSTOMER_COOKIE = "feminista_customer_session";

export async function hashPassword(password) {
  return bcrypt.hash(password, 10);
}

export async function verifyPassword(password, hash) {
  if (!hash) return false;
  return bcrypt.compare(password, hash);
}

export async function setCustomerSession(userId) {
  const store = await cookies();
  store.set(CUSTOMER_COOKIE, userId, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });
}

export async function clearCustomerSession() {
  const store = await cookies();
  store.delete(CUSTOMER_COOKIE);
}

export async function getCurrentCustomer() {
  const store = await cookies();
  const userId = store.get(CUSTOMER_COOKIE)?.value;
  if (!userId) return null;
  const users = await getUsers();
  const user = users.find((u) => u.id === userId);
  if (!user) return null;
  const { passwordHash, ...safeUser } = user;
  return safeUser;
}
