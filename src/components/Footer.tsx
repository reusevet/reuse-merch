import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-border-subtle bg-bg-secondary/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-10">
          {/* Brand */}
          <div className="col-span-2 sm:col-span-2 lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <span className="text-2xl">♻️</span>
              <span className="font-serif italic text-xl text-text-primary">
                ReUse
              </span>
              <span className="font-mono text-[10px] uppercase tracking-[1px] text-text-dim">
                Merch
              </span>
            </Link>
            <p className="text-text-muted text-sm leading-relaxed max-w-xs">
              Supporter merch from the ReUse ecosystem. Boost your secondhand
              rewards, wear the mission.
            </p>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-mono text-[11px] uppercase tracking-[2px] text-accent-blue mb-4">
              Support
            </h3>
            <ul className="space-y-2.5">
              <li>
                <Link
                  href="/shipping-returns"
                  className="text-sm text-text-muted hover:text-text-primary transition-colors"
                >
                  Shipping &amp; Delivery
                </Link>
              </li>
              <li>
                <Link
                  href="/shipping-returns"
                  className="text-sm text-text-muted hover:text-text-primary transition-colors"
                >
                  Returns &amp; Refunds
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-sm text-text-muted hover:text-text-primary transition-colors"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Transparency */}
          <div>
            <h3 className="font-mono text-[11px] uppercase tracking-[2px] text-accent-blue mb-4">
              Transparency
            </h3>
            <ul className="space-y-2.5">
              <li>
                <Link
                  href="/sustainability"
                  className="text-sm text-text-muted hover:text-text-primary transition-colors"
                >
                  Materials &amp; Certifications
                </Link>
              </li>
              <li>
                <Link
                  href="/sustainability"
                  className="text-sm text-text-muted hover:text-text-primary transition-colors"
                >
                  Print-on-Demand by TPOP
                </Link>
              </li>
              <li>
                <Link
                  href="/disclaimer"
                  className="text-sm text-text-muted hover:text-text-primary transition-colors"
                >
                  NFT &amp; Rewards Disclaimer
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-mono text-[11px] uppercase tracking-[2px] text-accent-blue mb-4">
              Legal
            </h3>
            <ul className="space-y-2.5">
              <li>
                <Link
                  href="/disclaimer"
                  className="text-sm text-text-muted hover:text-text-primary transition-colors"
                >
                  Disclaimer
                </Link>
              </li>
              <li>
                <Link
                  href="/disclaimer"
                  className="text-sm text-text-muted hover:text-text-primary transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/disclaimer"
                  className="text-sm text-text-muted hover:text-text-primary transition-colors"
                >
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Ecosystem */}
          <div>
            <h3 className="font-mono text-[11px] uppercase tracking-[2px] text-accent-blue mb-4">
              Ecosystem
            </h3>
            <ul className="space-y-2.5">
              <li>
                <a
                  href="https://reuse.vet/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-text-muted hover:text-text-primary transition-colors"
                >
                  ReUse dApp ↗
                </a>
              </li>
              <li>
                <a
                  href="https://veworld.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-text-muted hover:text-text-primary transition-colors"
                >
                  VeWorld Wallet ↗
                </a>
              </li>
              <li>
                <a
                  href="https://vebetter.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-text-muted hover:text-text-primary transition-colors"
                >
                  VeBetterDAO ↗
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border-subtle flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-text-dim text-xs font-mono">
            &copy; {new Date().getFullYear()} ReUse. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <span className="text-text-dim text-xs font-mono">
              Built on VeChain
            </span>
            <span className="text-text-dim text-xs">|</span>
            <span className="text-text-dim text-xs font-mono">
              Printed by TPOP
            </span>
            <span className="text-text-dim text-xs">|</span>
            <span className="text-text-dim text-xs font-mono">
              Stanley/Stella blanks
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
