import AdminLoginClient from "./AdminLoginClient";

export const metadata = {
  title: "Admin Sign In — Feminista",
  description: "Sign in to the Feminista admin dashboard.",
  robots: { index: false, follow: false },
};

export default function AdminLoginPage() {
  return <AdminLoginClient />;
}
