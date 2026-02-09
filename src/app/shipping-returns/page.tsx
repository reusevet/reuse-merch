import Link from "next/link";
import { Badge } from "@/components/Badge";

export default function ShippingReturnsPage() {
  return (
    <div className="min-h-screen bg-bg-primary">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
        <Badge variant="blue" className="mb-4">
          Policy
        </Badge>
        <h1 className="font-serif italic text-[clamp(32px,5vw,48px)] text-text-primary mb-6">
          Shipping &amp; Returns
        </h1>

        <div className="space-y-8">
          {/* Shipping */}
          <div className="glass p-6 sm:p-8">
            <h2 className="font-serif italic text-2xl text-text-primary mb-4">
              Shipping
            </h2>
            <ul className="space-y-3 text-sm text-text-muted">
              <li className="flex items-start gap-2">
                <span className="text-accent-green shrink-0 mt-0.5">✓</span>
                <span>
                  <strong className="text-text-primary">Free EU shipping</strong>{" "}
                  on orders above €75.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent-green shrink-0 mt-0.5">✓</span>
                <span>
                  Standard EU delivery: <strong className="text-text-primary">2–5 business days</strong>.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent-green shrink-0 mt-0.5">✓</span>
                <span>
                  All items are <strong className="text-text-primary">printed on demand</strong> by our
                  fulfilment partner TPOP, so production typically takes 2–4 business days before shipping.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent-green shrink-0 mt-0.5">✓</span>
                <span>
                  Worldwide shipping available. Rates calculated at checkout.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent-green shrink-0 mt-0.5">✓</span>
                <span>
                  Plastic-free packaging — recycled &amp; certified materials only.
                </span>
              </li>
            </ul>
          </div>

          {/* Returns */}
          <div className="glass p-6 sm:p-8">
            <h2 className="font-serif italic text-2xl text-text-primary mb-4">
              Returns &amp; Exchanges
            </h2>
            <ul className="space-y-3 text-sm text-text-muted">
              <li className="flex items-start gap-2">
                <span className="text-accent-blue shrink-0 mt-0.5">→</span>
                <span>
                  Returns accepted within <strong className="text-text-primary">14 days</strong> of
                  delivery for unworn, unused items.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent-blue shrink-0 mt-0.5">→</span>
                <span>
                  Since items are printed on demand, we can only accept returns
                  for defective or incorrect orders.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent-blue shrink-0 mt-0.5">→</span>
                <span>
                  To request a return, email{" "}
                  <a
                    href="mailto:support@reuse-merch.com"
                    className="text-accent-blue hover:underline"
                  >
                    support@reuse-merch.com
                  </a>{" "}
                  with your order number.
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 text-center">
          <Link
            href="/"
            className="text-sm text-text-muted hover:text-text-primary transition-colors"
          >
            ← Back to home
          </Link>
        </div>
      </div>
    </div>
  );
}
