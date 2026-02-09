import Link from "next/link";
import { Badge } from "@/components/Badge";
import { Button } from "@/components/Button";

export default function SustainabilityPage() {
  return (
    <div className="min-h-screen bg-bg-primary">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
        <Badge variant="green" className="mb-4">
          Our Mission
        </Badge>
        <h1 className="font-serif italic text-[clamp(32px,5vw,48px)] text-text-primary mb-6">
          Sustainability
        </h1>

        <div className="space-y-8">
          {/* Mission */}
          <div className="glass p-6 sm:p-8">
            <h2 className="font-serif italic text-2xl text-text-primary mb-4">
              Secondhand First
            </h2>
            <p className="text-text-muted leading-relaxed mb-3">
              ReUse is a movement to make secondhand the first choice. Our merch
              shop exists to support that mission — not replace it. Every piece
              of supporter gear funds the development of the ReUse ecosystem and
              the growth of secondhand adoption.
            </p>
            <p className="text-text-dim text-sm">
              Real impact happens when you buy secondhand with the ReUse dApp.
              Merch is optional supporter gear.
            </p>
          </div>

          {/* Materials */}
          <div className="glass p-6 sm:p-8">
            <h2 className="font-serif italic text-2xl text-text-primary mb-4">
              Materials &amp; Certifications
            </h2>
            <ul className="space-y-3 text-sm text-text-muted">
              <li className="flex items-start gap-2">
                <span className="text-accent-green shrink-0 mt-0.5">♻️</span>
                <span>
                  All blanks are made with <strong className="text-text-primary">recycled &amp; certified
                  materials</strong> — including recycled cotton, polyester, and wool
                  blends from Stanley/Stella.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent-green shrink-0 mt-0.5">🏷️</span>
                <span>
                  Certifications include <strong className="text-text-primary">GOTS, GRS, OEKO-TEX,
                  and Fair Wear</strong> where applicable per product.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent-green shrink-0 mt-0.5">🧵</span>
                <span>
                  Per-product material details are listed on each product page
                  (e.g. &quot;80% Recycled Cotton / 20% Recycled Polyester&quot;).
                </span>
              </li>
            </ul>
          </div>

          {/* Print-on-Demand */}
          <div className="glass p-6 sm:p-8">
            <h2 className="font-serif italic text-2xl text-text-primary mb-4">
              Print-on-Demand
            </h2>
            <p className="text-text-muted leading-relaxed mb-3">
              We partner with <strong className="text-text-primary">TPOP</strong>{" "}
              for fulfilment. Every item is printed only when ordered — meaning
              zero overproduction, zero unsold inventory, and less waste.
            </p>
            <ul className="space-y-2 text-sm text-text-muted">
              <li className="flex items-start gap-2">
                <span className="text-accent-green shrink-0 mt-0.5">✓</span>
                Zero overproduction
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent-green shrink-0 mt-0.5">✓</span>
                Plastic-free packaging
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent-green shrink-0 mt-0.5">✓</span>
                EU-based production &amp; shipping
              </li>
            </ul>
          </div>

          {/* CTA */}
          <div className="text-center pt-4">
            <p className="text-text-muted mb-6">
              The best thing you can do for the planet? Buy secondhand.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="https://reuse.vet/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button size="lg">Start with ReUse dApp</Button>
              </a>
              <Link href="/shop">
                <Button variant="secondary" size="lg">
                  Browse Merch
                </Button>
              </Link>
            </div>
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
