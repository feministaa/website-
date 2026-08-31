import { getUsers } from "@/lib/dataStore";
import styles from "./page.module.css";
import UsersTableClient from "./UsersTableClient";

export const metadata = { title: "Customers — Feminista Admin" };

export default async function AdminUsersPage() {
  const users = await getUsers();

  return (
    <div>
      <h1 className={styles.title}>Customers</h1>
      <p className={styles.sub}>{users.length} registered customer(s).</p>
      <UsersTableClient users={users} />
    </div>
  );
}
