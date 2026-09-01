import LoginClient from "./LoginClient";

export const metadata = {
  title: "Sign In — Feminista",
  description: "Sign in to your Feminista account.",
  robots: { index: false, follow: true },
};

export default function LoginPage() {
  return <LoginClient />;
}
