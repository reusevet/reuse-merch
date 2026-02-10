"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/Button";
import { SectionHeader } from "@/components/SectionHeader";
import { ProductCard } from "@/components/ProductCard";
import { NFTTierCard } from "@/components/NFTTierCard";
import { Badge } from "@/components/Badge";
import {
  RevealOnScroll,
  StaggerContainer,
  StaggerItem,
  CountUp,
} from "@/components/Motion";
import { nftTiers, stats, ALLOWED_HANDLES } from "@/lib/product-meta";
import { getAllProducts } from "@/lib/shopify";
import type { ShopifyProduct } from "@/lib/shopify";

export default function HomePage() {
  const [featuredProducts, setFeaturedProducts] = useState<ShopifyProduct[]>([]);
  const [loadingProducts, setLoadingProducts] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const all = await getAllProducts();
        const filtered = all.filter((p) => ALLOWED_HANDLES.includes(p.handle));
        setFeaturedProducts(filtered.slice(0, 3));
      } catch (err) {
        console.error("Failed to fetch featured products:", err);
      } finally {
        setLoadingProducts(false);
      }
    }
    fetchProducts();
  }, []);

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative bg-gradient-hero min-h-[90vh] flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-32 w-full">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <RevealOnScroll>
              <Badge variant="green" className="mb-6">
                Recycled &amp; Certified Materials
              </Badge>
              <h1 className="font-serif italic text-[clamp(44px,7vw,84px)] leading-[1.05] text-text-primary mb-6">
                Wear the <span className="gradient-text">Change</span>
              </h1>
              <p className="text-lg sm:text-xl text-text-muted max-w-lg leading-relaxed mb-3">
                Support the circular economy. Wear the mission. Boost your ReUse
                secondhand rewards.
              </p>
              <p className="text-sm text-text-dim max-w-lg mb-8">
                Merch is optional. Real impact happens when you buy secondhand
                with ReUse.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/shop">
                  <Button size="lg">Shop Now</Button>
                </Link>
                <Link href="/how-it-works">
                  <Button variant="secondary" size="lg">
                    How It Works
                  </Button>
                </Link>
              </div>

              {/* Mini dApp link */}
              <div className="mt-4">
                <a
                  href="https://reuse.vet/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-accent-blue hover:text-accent-purple transition-colors inline-flex items-center gap-1"
                >
                  Start earning with secondhand → ReUse dApp
                  <span className="text-xs">↗</span>
                </a>
              </div>

              {/* Trust row */}
              <div className="flex flex-wrap gap-4 mt-8">
                {[
                  { icon: "♻️", text: "Recycled & certified blanks" },
                  { icon: "🖨️", text: "Printed on demand (less waste)" },
                  { icon: "📦", text: "EU shipping + returns policy" },
                ].map((item) => (
                  <span
                    key={item.text}
                    className="flex items-center gap-2 text-[12px] text-text-muted"
                  >
                    <span>{item.icon}</span>
                    {item.text}
                  </span>
                ))}
              </div>
            </RevealOnScroll>

            {/* Mascot */}
            <div className="hidden lg:flex items-center justify-center">
              <RevealOnScroll delay={0.3}>
                <div className="animate-float">
                  <div className="w-80 h-80 lg:w-[420px] lg:h-[420px] rounded-full overflow-hidden relative">
                    <Image
                      src="/mascot-hero.png"
                      alt="ReMii — the ReUse mascot at a merch counter surrounded by sustainable clothing"
                      width={520}
                      height={520}
                      className="object-cover w-full h-full"
                      priority
                    />
                  </div>
                </div>
              </RevealOnScroll>
            </div>
          </div>
        </div>

        {/* Gradient fade to next section */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-bg-primary to-transparent" />
      </section>

      {/* How It Works (3-step) */}
      <section className="py-20 sm:py-28 bg-bg-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealOnScroll>
            <SectionHeader
              label="The Loop"
              heading="How It Works"
              description="Three steps from supporter merch to boosted secondhand rewards."
            />
          </RevealOnScroll>

          <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-14">
            {[
              {
                step: "01",
                icon: "🛍️",
                title: "Buy Supporter Merch",
                description:
                  "Optional supporter gear made with recycled & certified materials, printed on demand. Pay with EUR or B3TR tokens — 15% discount (Prototype).",
              },
              {
                step: "02",
                icon: "🎫",
                title: "Receive Supporter NFT",
                description:
                  "Get a Supporter NFT that unlocks a reward multiplier inside the ReUse dApp. Level up to Silver and Gold for bigger boosts.",
              },
              {
                step: "03",
                icon: "⚡",
                title: "Earn Boosted B3TR",
                description:
                  "Earn boosted B3TR when you use ReUse for verified secondhand purchases. Use B3TR to buy more merch — the sustainable loop.",
              },
            ].map((item) => (
              <StaggerItem key={item.step}>
                <div className="bg-bg-card border border-border-subtle rounded-card p-6 sm:p-8 transition-all duration-[400ms] ease-smooth hover:border-accent-blue/20 hover:-translate-y-[5px] hover:shadow-card-hover h-full">
                  <span className="font-mono text-[11px] text-accent-blue">
                    STEP {item.step}
                  </span>
                  <span className="text-4xl block mt-3 mb-4">{item.icon}</span>
                  <h3 className="text-xl font-bold text-text-primary mb-2">
                    {item.title}
                  </h3>
                  <p className="text-[15px] text-text-muted leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 sm:py-28 bg-bg-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealOnScroll>
            <SectionHeader
              label="The Collection"
              heading="Founding Edition"
              description="Made with recycled & certified materials. Ethically produced. Each item includes a Supporter NFT + reward boost."
            />
          </RevealOnScroll>

          {loadingProducts ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 size={32} className="animate-spin text-accent-blue" />
            </div>
          ) : featuredProducts.length > 0 ? (
            <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-14">
              {featuredProducts.map((product) => (
                <StaggerItem key={product.id}>
                  <ProductCard product={product} />
                </StaggerItem>
              ))}
            </StaggerContainer>
          ) : (
            <div className="text-center py-16">
              <p className="text-text-muted">
                Products loading soon. Check back shortly!
              </p>
            </div>
          )}

          <RevealOnScroll delay={0.4}>
            <div className="text-center mt-12">
              <Link href="/shop">
                <Button variant="secondary" size="lg">
                  View All Products
                </Button>
              </Link>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* NFT Tiers */}
      <section className="py-20 sm:py-28 bg-bg-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealOnScroll>
            <SectionHeader
              label="Supporter NFTs"
              heading="Level Up Your Rewards"
              description="Every purchase earns you a Supporter NFT. Your tier depends on the product you buy — boosting your reward multiplier in the ReUse dApp. (Prototype)"
            />
          </RevealOnScroll>

          <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-14">
            {nftTiers.map((tier, i) => (
              <StaggerItem key={tier.name}>
                <NFTTierCard {...tier} featured={i === 1} />
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="py-16 bg-bg-secondary border-y border-border-subtle">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <StaggerContainer
            className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8"
            staggerDelay={0.15}
          >
            {stats.map((stat) => (
              <StaggerItem key={stat.label}>
                <div className="text-center">
                  <span className="text-3xl block mb-2">{stat.icon}</span>
                  <CountUp
                    target={stat.value}
                    className="font-mono text-2xl sm:text-3xl font-bold text-text-primary block"
                  />
                  <span className="font-mono text-[11px] uppercase tracking-[1px] text-text-muted">
                    {stat.label}
                  </span>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
          <p className="text-center mt-6 text-[11px] font-mono text-text-dim">
            Community totals (pilot metrics) &middot;{" "}
            <span className="text-accent-purple">Demo data</span>
            {" "}&middot;{" "}
            <Link
              href="/how-it-works"
              className="text-accent-blue hover:underline"
            >
              How we calculate
            </Link>
          </p>
        </div>
      </section>

      {/* Wear the Movement — quick conversion */}
      <section className="py-16 sm:py-20 bg-bg-primary">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <RevealOnScroll>
            <h2 className="font-serif italic text-3xl sm:text-4xl text-text-primary mb-3">
              Wear the Movement
            </h2>
            <p className="text-text-muted text-lg max-w-xl mx-auto mb-2">
              Every piece supports the circular economy — and unlocks boosted secondhand rewards.
            </p>
            <p className="text-text-dim text-sm mb-8">
              Merch is optional. The real impact is in reuse.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/shop">
                <Button size="lg">Shop Merch</Button>
              </Link>
              <Link href="/how-it-works">
                <Button variant="secondary" size="lg">
                  How It Works
                </Button>
              </Link>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* VeBetterDAO Banner */}
      <section className="py-20 sm:py-28 bg-bg-primary">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealOnScroll>
            <div className="glass p-8 sm:p-12 text-center">
              <Badge variant="green" className="mb-4">
                VeBetterDAO Ecosystem
              </Badge>
              <h2 className="font-serif italic text-3xl sm:text-4xl text-text-primary mb-4">
                Part of Something Bigger
              </h2>
              <p className="text-text-muted text-lg max-w-2xl mx-auto leading-relaxed mb-4">
                ReUse is part of the VeBetterDAO ecosystem on VeChain. Every
                purchase helps fund ReUse adoption &amp; secondhand growth.
              </p>
              <p className="text-text-dim text-sm max-w-xl mx-auto mb-8">
                Your merch supports the mission — but the real impact is in the
                thousands of secondhand transactions powered by ReUse every day.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <a
                  href="https://vebetter.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button size="md">About VeBetterDAO</Button>
                </a>
                <Link href="/how-it-works">
                  <Button variant="secondary" size="md">
                    How Rewards Work
                  </Button>
                </Link>
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </section>
    </div>
  );
}
