import Link from "next/link";
import { Badge } from "@/components/Badge";

export default function DisclaimerPage() {
  return (
    <div className="min-h-screen bg-bg-primary">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
        <Badge className="mb-4">Legal</Badge>
        <h1 className="font-serif italic text-[clamp(32px,5vw,48px)] text-text-primary mb-6">
          Disclaimer
        </h1>

        <div className="space-y-8">
          {/* Prototype */}
          <div className="glass p-6 sm:p-8">
            <h2 className="font-serif italic text-2xl text-text-primary mb-4">
              Prototype Status
            </h2>
            <p className="text-text-muted leading-relaxed mb-3">
              This webshop is a <strong className="text-text-primary">prototype / demo</strong>. Features
              marked as &quot;Prototype&quot; or &quot;Coming in v1.1&quot; are not yet live.
              This includes:
            </p>
            <ul className="space-y-2 text-sm text-text-muted ml-4">
              <li>• B3TR token payments (15% discount)</li>
              <li>• Automatic NFT minting after checkout</li>
              <li>• NFT claim flow (wallet connection)</li>
              <li>• Community impact counters / statistics</li>
            </ul>
          </div>

          {/* NFT & Rewards */}
          <div className="glass p-6 sm:p-8">
            <h2 className="font-serif italic text-2xl text-text-primary mb-4">
              NFT &amp; Rewards
            </h2>
            <p className="text-text-muted leading-relaxed mb-3">
              Supporter NFTs are intended as utility tokens within the ReUse
              ecosystem. They provide reward multipliers in the ReUse dApp for
              verified secondhand purchases.
            </p>
            <ul className="space-y-2 text-sm text-text-muted ml-4">
              <li>• Supporter NFTs are <strong className="text-text-primary">not financial instruments</strong>.</li>
              <li>• They should not be considered investments.</li>
              <li>• Reward multipliers and tier levels may be adjusted.</li>
              <li>• B3TR token values can fluctuate.</li>
            </ul>
          </div>

          {/* Materials */}
          <div className="glass p-6 sm:p-8">
            <h2 className="font-serif italic text-2xl text-text-primary mb-4">
              Materials &amp; Claims
            </h2>
            <p className="text-text-muted leading-relaxed">
              Product materials are sourced from certified suppliers
              (Stanley/Stella) and printed by TPOP. Specific material
              compositions are listed per product. When we say &quot;recycled &amp;
              certified materials,&quot; we refer to the blend of recycled and
              sustainably certified fibres used in each product as specified on
              the product page.
            </p>
          </div>

          {/* No Investment Advice */}
          <div className="glass p-6 sm:p-8">
            <h2 className="font-serif italic text-2xl text-text-primary mb-4">
              Not Financial Advice
            </h2>
            <p className="text-text-muted leading-relaxed">
              Nothing on this website constitutes financial, investment, or legal
              advice. B3TR tokens and NFTs mentioned on this site are part of the
              VeBetterDAO ecosystem and are not offered as securities or
              investments. Always do your own research.
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
