import Link from "next/link";
import LegalPage from "@/components/ui/LegalPage";
import { SUPPORT_EMAIL } from "@/data/site";

export const metadata = {
  title: "Privacy Policy — Feminista",
  description: "How Feminista collects, uses and protects your personal information.",
  alternates: { canonical: "/privacy-policy" },
};

const contact = SUPPORT_EMAIL ? (
  <>
    writing to us at <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a>
  </>
) : (
  <>
    contacting us from your <Link href="/account">account</Link>
  </>
);

const SECTIONS = [
  {
    id: "collect",
    title: "Information we collect",
    body: (
      <>
        <p>We only collect what we need to run the store and look after your orders:</p>
        <ul>
          <li>
            <strong>Account details</strong>: your name, email address and password, or your Google account details if you
            choose to sign in with Google.
          </li>
          <li>
            <strong>Order details</strong>: shipping address, phone number, the items you buy and your order history.
          </li>
          <li>
            <strong>Newsletter</strong>: your email address, if you subscribe.
          </li>
          <li>
            <strong>On your device</strong>: your cart and wishlist are saved in your browser so they are still there when
            you return.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "payments",
    title: "Payments",
    body: (
      <p>
        Payments are processed securely by Razorpay. Your card, UPI and bank details are entered directly with Razorpay
        and are never stored on our servers. We receive only the payment status and a transaction reference.
      </p>
    ),
  },
  {
    id: "use",
    title: "How we use your information",
    body: (
      <ul>
        <li>To process, ship and deliver your orders, and to handle returns.</li>
        <li>To manage your account and show your order history.</li>
        <li>To reply when you contact us.</li>
        <li>To send product news and launches, only if you have subscribed. You can unsubscribe at any time.</li>
        <li>To keep the site secure and prevent fraud.</li>
      </ul>
    ),
  },
  {
    id: "sharing",
    title: "Who we share it with",
    body: (
      <>
        <p>We never sell your personal information. We share it only with the services that help us run the store:</p>
        <ul>
          <li>Razorpay, to take payments.</li>
          <li>Our courier partners, to deliver your order.</li>
          <li>Our hosting and database providers, who store the site and your account data.</li>
        </ul>
        <p>We may also disclose information where the law requires it.</p>
      </>
    ),
  },
  {
    id: "retention",
    title: "How long we keep it",
    body: (
      <p>
        We keep your account information for as long as your account is open, and order records for as long as we are
        required to for tax and accounting purposes. You can ask us to delete your account at any time.
      </p>
    ),
  },
  {
    id: "rights",
    title: "Your choices",
    body: (
      <p>
        You can view and update your details from your account. To request a copy of your information, correct it, or
        delete your account, please get in touch by {contact}.
      </p>
    ),
  },
  {
    id: "changes",
    title: "Changes to this policy",
    body: (
      <p>
        We may update this policy from time to time. The date at the top of this page shows when it was last changed.
      </p>
    ),
  },
];

export default function PrivacyPolicyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      intro="Your privacy matters to us. This policy explains what information Feminista collects when you use this site, how we use it, and the choices you have."
      sections={SECTIONS}
    />
  );
}
