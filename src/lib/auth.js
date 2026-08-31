import { cookies } from "next/headers";

export const ADMIN_COOKIE = "feminista_admin_session";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "feminista180";
const SESSION_VALUE = "granted";

export function checkAdminPassword(password) {
  return password === ADMIN_PASSWORD;
}

export async function isAdminAuthed() {
  const store = await cookies();
  return store.get(ADMIN_COOKIE)?.value === SESSION_VALUE;
}

export function adminSessionValue() {
  return SESSION_VALUE;
}
