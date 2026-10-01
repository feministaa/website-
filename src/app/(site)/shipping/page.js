import Link from "next/link";
import PolicyPage from "@/components/ui/PolicyPage";

export const metadata = {
  title: "Shipping & Delivery — Feminista",
  description: "Feminista ships across India, with every order delivered within 7 days.",
  alternates: { canonical: "/shipping" },
};

const SECTIONS = [
  {
    id: "delivery",
    title: "Delivery promise",
    body: (
      <p>
        Every order is delivered within <strong>7 days</strong> of being placed, to any address across India.
      </p>
    ),
  },
  {
    id: "journey",
    title: "The journey of your order",
    cards: [
      { title: "Order placed", text: "A confirmation arrives as soon as your payment goes through." },
      { title: "Packed by hand", text: "Each bottle is sealed, cushioned and boxed to travel safely." },
      { title: "Dispatched", text: "Your account shows the status and expected delivery date." },
      { title: "Delivered", text: "Your fragrance reaches you within 7 days." },
    ],
  },
  {
    id: "tracking",
    title: "Tracking your order",
    body: (
      <p>
        Follow every step of your order from your <Link href="/account">account</Link>, including the expected delivery
        date once it ships.
      </p>
    ),
  },
  {
    id: "where",
    title: "Where we ship",
    body: <p>We deliver to addresses across India. We do not ship internationally yet; we will share it here first when we do.</p>,
  },
  {
    id: "damaged",
    title: "If something arrives damaged",
    body: (
      <p>
        Write to us within <strong>48 hours of delivery</strong> with your order number and photos, and we will send a
        replacement. See our <Link href="/returns">returns policy</Link> for details.
      </p>
    ),
  },
];

export default function ShippingPage() {
  return (
    <PolicyPage
      label="Customer Care"
      title="Shipping & Delivery"
      intro="Packed with care and delivered to your door across India, within 7 days."
      notice={{ label: "Our promise", text: "Every Feminista order is delivered within 7 days, anywhere in India." }}
      sections={SECTIONS}
      contactLine="Questions about a delivery? Write to us with your order number and we will reply within one to two business days."
    />
  );
}
