import Link from "next/link";
import { Badge } from "@/components/Badge";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-bg-primary">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
        <Badge variant="blue" className="mb-4">
          Support
        </Badge>
        <h1 className="font-serif italic text-[clamp(32px,5vw,48px)] text-text-primary mb-6">
          Contact Us
        </h1>

        <div className="glass p-6 sm:p-8 space-y-6">
          <div>
            <h2 className="font-bold text-text-primary mb-2">Email</h2>
            <a
              href="mailto:support@reuse-merch.com"
              className="text-accent-blue hover:underline text-lg"
            >
              support@reuse-merch.com
            </a>
            <p className="text-sm text-text-muted mt-1">
              We aim to respond within 24-48 hours.
            </p>
          </div>

          <div className="h-px bg-border-subtle" />

          <div>
            <h2 className="font-bold text-text-primary mb-2">Community</h2>
            <ul className="space-y-2 text-sm text-text-muted">
              <li>
                <a
                  href="https://reuse.vet/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent-blue hover:underline"
                >
                  ReUse dApp ↗
                </a>{" "}
                — Start earning with secondhand
              </li>
              <li>
                <a
                  href="https://vebetter.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent-blue hover:underline"
                >
                  VeBetterDAO ↗
                </a>{" "}
                — The ecosystem behind ReUse
              </li>
            </ul>
          </div>

          <div className="h-px bg-border-subtle" />

          <div>
            <h2 className="font-bold text-text-primary mb-2">
              Order Issues?
            </h2>
            <p className="text-sm text-text-muted leading-relaxed">
              For order-related questions (shipping, returns, exchanges), email
              us with your order number and we&apos;ll get back to you ASAP.
            </p>
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
