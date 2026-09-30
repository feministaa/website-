import Link from "next/link";
import LegalPage from "@/components/ui/LegalPage";
import { SUPPORT_EMAIL } from "@/data/site";

export const metadata = {
  title: "Returns & Exchanges — Feminista",
  description: "Unopened Feminista fragrances may be returned within 14 days of delivery for a full refund.",
  alternates: { canonical: "/returns" },
};

const contact = SUPPORT_EMAIL ? (
  <>
    write to us at <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a>
  </>
) : (
  <>
    contact us from your <Link href="/account">account</Link>
  </>
);

const SECTIONS = [
  {
    id: "window",
    title: "The 14-day window",
    body: (
      <p>
        You may return any Feminista fragrance within <strong>14 days of delivery</strong> for a full refund to your
        original payment method, provided it meets the conditions below.
      </p>
    ),
  },
  {
    id: "conditions",
    title: "What can be returned",
    body: (
      <>
        <p>For hygiene and quality reasons, we can only accept items that are:</p>
        <ul>
          <li>Unopened, with the original seal and cellophane intact.</li>
          <li>Unused and in their original box and packaging.</li>
          <li>Accompanied by the order number.</li>
        </ul>
        <p>
          Opened or used fragrances, and Discovery Sets whose vials have been opened, cannot be returned unless they
          arrived damaged or faulty.
        </p>
      </>
    ),
  },
  {
    id: "damaged",
    title: "Damaged or incorrect orders",
    body: (
      <p>
        If your order arrives damaged, leaking or incorrect, please {contact} within 48 hours of delivery with your order
        number and a photo of the item and packaging. We will send a replacement or issue a full refund, at no cost to
        you.
      </p>
    ),
  },
  {
    id: "how",
    title: "How to start a return",
    body: (
      <>
        <p>To start a return, {contact} with your order number and the item you would like to return.</p>
        <p>
          We will confirm whether the item is eligible and share the return instructions. Please do not send an item back
          before your return has been confirmed.
        </p>
      </>
    ),
  },
  {
    id: "refunds",
    title: "Refunds",
    body: (
      <p>
        Once the returned item reaches us and passes inspection, we will refund the full product price to your original
        payment method. Depending on your bank, it may take a further 5–7 business days for the amount to appear in your
        account.
      </p>
    ),
  },
  {
    id: "exchanges",
    title: "Exchanges",
    body: (
      <p>
        We do not offer direct exchanges. If you would prefer a different fragrance, return the unopened item for a
        refund and place a new order. If you are unsure which fragrance is yours, the{" "}
        <Link href="/fragrances/discovery-set">Discovery Set</Link> lets you try all three first.
      </p>
    ),
  },
];

export default function ReturnsPage() {
  return (
    <LegalPage
      title="Returns & Exchanges"
      intro="We want every Feminista fragrance to arrive exactly as it should. If something isn't right, here is how returns work."
      sections={SECTIONS}
    />
  );
}
