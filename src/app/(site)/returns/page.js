import Link from "next/link";
import PolicyPage from "@/components/ui/PolicyPage";
import { SUPPORT_EMAIL } from "@/data/site";

export const metadata = {
  title: "Returns & Refunds — Feminista",
  description: "All Feminista sales are final. Damaged or incorrect orders are replaced when reported within 48 hours.",
  alternates: { canonical: "/returns" },
};

const email = <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a>;

const SECTIONS = [
  {
    id: "final",
    title: "All sales are final",
    body: (
      <>
        <p>
          Fragrance is a personal product. To protect every customer, a bottle cannot be resold once it has left the
          House, so <strong>we do not accept returns or offer refunds</strong> on any order, opened or unopened.
        </p>
        <p>Please review your order carefully before you check out.</p>
      </>
    ),
  },
  {
    id: "damaged",
    title: "Damaged or incorrect orders",
    body: (
      <p>
        If your order arrives damaged, leaking or is not what you ordered, we will send a replacement at no cost. Write
        to us at {email} within <strong>48 hours of delivery</strong>.
      </p>
    ),
    cards: [
      { title: "Your order number", text: "So we can find your order right away." },
      { title: "Photos of the item", text: "Showing the bottle and the issue clearly." },
      { title: "Photos of the packaging", text: "The outer box, as it arrived." },
    ],
  },
  {
    id: "cancellations",
    title: "Cancellations",
    body: (
      <p>
        Orders cannot be cancelled once they have been dispatched. If you need to change something before then, write to
        us at {email} as soon as possible and we will do our best to help.
      </p>
    ),
  },
  {
    id: "choosing",
    title: "Not sure which is yours?",
    body: (
      <p>
        The <Link href="/fragrances/discovery-set">Discovery Set</Link> holds Locken, Vers and Fresca in travel sizes, so
        you can wear each one before choosing a full bottle.
      </p>
    ),
  },
];

export default function ReturnsPage() {
  return (
    <PolicyPage
      label="Customer Care"
      title="Returns & Refunds"
      intro="Every fragrance is checked, sealed and packed with care before it reaches you."
      notice={{
        label: "Important",
        text: "As fragrance is a personal product, all sales are final. We do not offer returns or refunds.",
      }}
      sections={SECTIONS}
      contactLine="If your order arrives damaged, write to us within 48 hours of delivery and we will make it right."
    />
  );
}
