import Link from "next/link";
import { Button } from "@/components/Button";
import { SectionHeader } from "@/components/SectionHeader";
import { NFTTierCard } from "@/components/NFTTierCard";
import { Badge } from "@/components/Badge";
import { nftTiers } from "@/lib/mock-data";

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen bg-bg-primary">
      {/* Hero */}
      <section className="bg-gradient-hero py-20 sm:py-28">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Badge variant="blue" className="mb-6">
            The ReUse Loop
          </Badge>
          <h1 className="font-serif italic text-[clamp(36px,6vw,64px)] text-text-primary mb-6">
            Wear the Mission. Boost Secondhand Rewards.
          </h1>
          <p className="text-lg sm:text-xl text-text-muted max-w-2xl mx-auto leading-relaxed">
            Supporter merch is optional. Every order includes a Supporter NFT
            that boosts your rewards when you buy secondhand with the ReUse
            dApp.
          </p>
        </div>
      </section>

      {/* Detailed Steps */}
      <section className="py-20 sm:py-28">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative space-y-16">
            {/* Timeline line */}
            <div className="absolute left-[60px] top-0 bottom-0 w-px bg-border-subtle hidden md:block" />

            {/* Step 1 */}
            <div className="grid md:grid-cols-[120px_1fr] gap-6 items-start relative">
              <div className="text-center md:text-left relative z-10">
                <span className="text-5xl block mb-2">🛍️</span>
                <span className="font-mono text-[11px] text-accent-blue uppercase tracking-[2px]">
                  Step 01
                </span>
              </div>
              <div>
                <h2 className="font-serif italic text-3xl text-text-primary mb-4">
                  Get Supporter Merch{" "}
                  <span className="text-text-dim text-lg font-sans not-italic">
                    (optional)
                  </span>
                </h2>
                <p className="text-text-muted text-[17px] leading-relaxed mb-4">
                  100% recycled, made on-demand to avoid overproduction. Every
                  purchase includes a Supporter NFT that unlocks reward boosts
                  in the ReUse dApp.
                </p>
                <div className="glass p-4 space-y-2">
                  <div className="flex items-center gap-2 text-sm text-text-muted">
                    <span className="text-accent-green">&#10003;</span>
                    Pay with EUR (credit card, iDEAL, Bancontact)
                  </div>
                  <div className="flex items-center gap-2 text-sm text-text-muted">
                    <span className="text-accent-green">&#10003;</span>
                    Pay with B3TR tokens (15% discount)
                  </div>
                  <div className="flex items-center gap-2 text-sm text-text-muted">
                    <span className="text-accent-green">&#10003;</span>
                    Free EU shipping above &euro;75
                  </div>
                </div>
              </div>
            </div>

            {/* Step 2 */}
            <div className="grid md:grid-cols-[120px_1fr] gap-6 items-start relative">
              <div className="text-center md:text-left relative z-10">
                <span className="text-5xl block mb-2">🎫</span>
                <span className="font-mono text-[11px] text-accent-blue uppercase tracking-[2px]">
                  Step 02
                </span>
              </div>
              <div>
                <h2 className="font-serif italic text-3xl text-text-primary mb-4">
                  Receive Your Supporter NFT
                </h2>
                <p className="text-text-muted text-[17px] leading-relaxed mb-4">
                  After checkout, your Supporter NFT is minted to your VeChain
                  wallet. It unlocks a reward multiplier in the ReUse dApp
                  (Bronze → Silver → Gold).
                </p>
                <p className="text-text-muted text-[17px] leading-relaxed mb-4">
                  If you paid with EUR, you can claim your NFT by connecting
                  your wallet afterwards.
                </p>
                <a
                  href="https://veworld.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-accent-blue hover:text-accent-purple transition-colors inline-flex items-center gap-1"
                >
                  Don&apos;t have a wallet? Get VeWorld in 60 seconds →
                </a>
              </div>
            </div>

            {/* Step 3 */}
            <div className="grid md:grid-cols-[120px_1fr] gap-6 items-start relative">
              <div className="text-center md:text-left relative z-10">
                <span className="text-5xl block mb-2">⚡</span>
                <span className="font-mono text-[11px] text-accent-blue uppercase tracking-[2px]">
                  Step 03
                </span>
              </div>
              <div>
                <h2 className="font-serif italic text-3xl text-text-primary mb-4">
                  Boost Your dApp Rewards
                </h2>
                <p className="text-text-muted text-[17px] leading-relaxed mb-4">
                  Use ReUse to verify secondhand purchases and earn B3TR. Your
                  Supporter NFT boosts those rewards by up to 2x.
                </p>
                <p className="text-text-muted text-[17px] leading-relaxed">
                  Use earned B3TR to get 15% off merch (optional) — or keep
                  earning by shopping secondhand. The loop never stops.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* NFT Tiers */}
      <section className="py-20 sm:py-28 bg-bg-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            label="Tier System"
            heading="NFT Reward Tiers"
            description="Each tier unlocks a higher reward multiplier in the ReUse dApp. Tiers auto-upgrade as you buy more items."
          />

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-14">
            {nftTiers.map((tier, i) => (
              <NFTTierCard key={tier.name} {...tier} featured={i === 1} />
            ))}
          </div>
        </div>
      </section>

      {/* B3TR Payment Info */}
      <section className="py-20 sm:py-28">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            label="B3TR Payments"
            heading="Pay with B3TR (15% off)"
            description="Save 15% on every order when you pay with B3TR tokens from the VeChain ecosystem."
          />

          <div className="mt-14 glass p-8 sm:p-10 space-y-6">
            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <h3 className="font-bold text-text-primary mb-2">
                  How B3TR payments work
                </h3>
                <ol className="space-y-2 text-sm text-text-muted">
                  <li className="flex items-start gap-2">
                    <span className="font-mono text-accent-blue shrink-0">
                      1.
                    </span>
                    Toggle to B3TR pricing in the shop
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-mono text-accent-blue shrink-0">
                      2.
                    </span>
                    Connect your VeWorld wallet at checkout
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-mono text-accent-blue shrink-0">
                      3.
                    </span>
                    Approve the B3TR transfer in your wallet
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-mono text-accent-blue shrink-0">
                      4.
                    </span>
                    Order confirmed — NFT minted automatically
                  </li>
                </ol>
              </div>
              <div>
                <h3 className="font-bold text-text-primary mb-2">
                  Price calculation
                </h3>
                <div className="bg-bg-primary rounded-card p-4 font-mono text-sm">
                  <p className="text-text-dim mb-2">B3TR Price =</p>
                  <p className="text-accent-blue">
                    (EUR Price / B3TR Rate) &times; 0.85
                  </p>
                  <p className="text-text-dim mt-3 text-xs">
                    Rate locked for 15 minutes after checkout.
                  </p>
                  <p className="text-text-dim text-xs mt-1">
                    Network fee may apply (usually small).
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 sm:py-28 bg-bg-secondary">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-serif italic text-3xl sm:text-4xl text-text-primary mb-6">
            Ready to Join the Loop?
          </h2>
          <p className="text-text-muted text-lg mb-8 max-w-xl mx-auto">
            Support the circular economy with merch, or start earning directly
            by buying secondhand with the ReUse dApp.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/shop">
              <Button size="lg">Shop Supporter Merch</Button>
            </Link>
            <a
              href="https://reuse.vet/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="secondary" size="lg">
                Start Earning with Secondhand
              </Button>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
