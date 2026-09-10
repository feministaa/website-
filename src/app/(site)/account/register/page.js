import { Suspense } from "react";
import RegisterClient from "./RegisterClient";

export const metadata = {
  title: "Create Account — Feminista",
  description: "Create your Feminista account.",
  robots: { index: false, follow: true },
};

export default function RegisterPage() {
  return (
    <Suspense>
      <RegisterClient />
    </Suspense>
  );
}
