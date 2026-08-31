import { redirect } from "next/navigation";
import { isAdminAuthed } from "@/lib/auth";
import AdminSidebar from "@/components/admin/AdminSidebar";

export const metadata = {
  robots: { index: false, follow: false },
};

export default async function AdminProtectedLayout({ children }) {
  if (!(await isAdminAuthed())) {
    redirect("/admin/login");
  }

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "var(--bg)" }}>
      <AdminSidebar />
      <div style={{ flex: 1, padding: "40px 44px", maxWidth: "100%", overflowX: "hidden" }}>{children}</div>
    </div>
  );
}
