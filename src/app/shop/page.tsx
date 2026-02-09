"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ChevronDown, Info } from "lucide-react";
import { ProductCard } from "@/components/ProductCard";
import { SectionHeader } from "@/components/SectionHeader";
import { RevealOnScroll } from "@/components/Motion";
import { products } from "@/lib/mock-data";

type Filter = "all" | "apparel" | "accessories";
type SortOption = "featured" | "price-asc" | "price-desc" | "newest";

const ease = [0.16, 1, 0.3, 1] as [number, number, number, number];

export default function ShopPage() {
  const [filter, setFilter] = useState<Filter>("all");
  const [showB3TR, setShowB3TR] = useState(false);
  const [sortBy, setSortBy] = useState<SortOption>("featured");
  const [searchQuery, setSearchQuery] = useState("");
  const [showNFTInfo, setShowNFTInfo] = useState(false);

  const filteredProducts = useMemo(() => {
    let result =
      filter === "all"
        ? products
        : products.filter((p) => p.category === filter);

    // Search filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.material.toLowerCase().includes(q)
      );
    }

    // Sort
    switch (sortBy) {
      case "price-asc":
        result = [...result].sort((a, b) => a.priceEUR - b.priceEUR);
        break;
      case "price-desc":
        result = [...result].sort((a, b) => b.priceEUR - a.priceEUR);
        break;
      case "newest":
        result = [...result].sort((a, b) =>
          a.isNew === b.isNew ? 0 : a.isNew ? -1 : 1
        );
        break;
      default:
        // featured = default order
        break;
    }

    return result;
  }, [filter, sortBy, searchQuery]);

  const filters: { value: Filter; label: string; count: number }[] = [
    { value: "all", label: "All", count: products.length },
    {
      value: "apparel",
      label: "Apparel",
      count: products.filter((p) => p.category === "apparel").length,
    },
    {
      value: "accessories",
      label: "Accessories",
      count: products.filter((p) => p.category === "accessories").length,
    },
  ];

  return (
    <div className="min-h-screen bg-bg-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
        <RevealOnScroll>
          <SectionHeader
            label="The Collection"
            heading="Shop All"
            description="Supporter merch made with recycled & certified materials. Each item includes a Supporter NFT."
          />
          <p className="text-center text-sm text-text-dim mt-3 max-w-xl mx-auto">
            Merch is optional supporter gear — real rewards are earned with
            secondhand purchases in the{" "}
            <a
              href="https://reuse.vet/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent-blue hover:underline"
            >
              ReUse dApp
            </a>
            .
          </p>
        </RevealOnScroll>

        {/* Search + Filters + Sort + Price Toggle */}
        <RevealOnScroll delay={0.15}>
          <div className="mt-12 mb-4 space-y-4">
            {/* Top row: search + sort */}
            <div className="flex flex-col sm:flex-row gap-3">
              {/* Search */}
              <div className="relative flex-1 max-w-xs">
                <Search
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-text-dim"
                />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 bg-bg-card border border-border-subtle rounded-button text-sm text-text-primary placeholder:text-text-dim focus:outline-none focus:border-accent-blue/40 transition-colors"
                  aria-label="Search products"
                />
              </div>

              {/* Sort */}
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as SortOption)}
                  className="appearance-none pl-4 pr-8 py-2 bg-bg-card border border-border-subtle rounded-button text-sm text-text-muted focus:outline-none focus:border-accent-blue/40 transition-colors cursor-pointer"
                  aria-label="Sort products"
                >
                  <option value="featured">Featured</option>
                  <option value="price-asc">Price: Low → High</option>
                  <option value="price-desc">Price: High → Low</option>
                  <option value="newest">Newest</option>
                </select>
                <ChevronDown
                  size={14}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-text-dim pointer-events-none"
                />
              </div>
            </div>

            {/* Bottom row: category filters + currency toggle */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              {/* Category filters */}
              <div
                className="flex gap-2"
                role="group"
                aria-label="Filter by category"
              >
                {filters.map((f) => (
                  <motion.button
                    key={f.value}
                    onClick={() => setFilter(f.value)}
                    whileTap={{ scale: 0.95 }}
                    className={`px-4 py-2 rounded-button text-sm font-medium transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-blue ${
                      filter === f.value
                        ? "bg-gradient-button text-white shadow-button"
                        : "bg-bg-card border border-border-subtle text-text-muted hover:text-text-primary hover:border-accent-blue/20"
                    }`}
                    aria-pressed={filter === f.value}
                  >
                    {f.label}
                    <span className="ml-1.5 font-mono text-xs opacity-60">
                      {f.count}
                    </span>
                  </motion.button>
                ))}
              </div>

              {/* Currency toggle */}
              <div className="flex items-center gap-3">
                <span className="text-[11px] font-mono text-text-dim uppercase tracking-wide">
                  Pay with
                </span>
                <button
                  onClick={() => setShowB3TR(!showB3TR)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-button text-sm font-mono transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-blue ${
                    showB3TR
                      ? "bg-accent-blue/10 border border-accent-blue/30 text-accent-blue"
                      : "bg-bg-card border border-border-subtle text-text-muted hover:text-text-primary"
                  }`}
                  role="switch"
                  aria-checked={showB3TR}
                  aria-label="Toggle B3TR pricing"
                >
                  <span className="text-xs">
                    {showB3TR ? "⚡ B3TR" : "€ EUR"}
                  </span>
                  <div
                    className={`w-8 h-4 rounded-full transition-colors relative ${
                      showB3TR ? "bg-accent-blue" : "bg-border-subtle"
                    }`}
                  >
                    <motion.div
                      animate={{ x: showB3TR ? 16 : 2 }}
                      transition={{
                        type: "spring",
                        stiffness: 500,
                        damping: 30,
                      }}
                      className="absolute top-0.5 w-3 h-3 rounded-full bg-white"
                    />
                  </div>
                </button>
                {showB3TR && (
                  <span className="text-[10px] text-accent-green font-mono">
                    15% off
                  </span>
                )}
                <span className="text-[9px] text-accent-purple/70 font-mono ml-1">
                  Prototype
                </span>
              </div>
            </div>
          </div>
        </RevealOnScroll>

        {/* Product count */}
        <p
          className="text-text-dim text-[11px] font-mono mb-6"
          aria-live="polite"
        >
          Showing {filteredProducts.length} of {products.length} products
        </p>

        {/* Product Grid */}
        <motion.div
          layout
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((product, i) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, ease, delay: i * 0.05 }}
              >
                <ProductCard product={product} showB3TR={showB3TR} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-16">
            <span className="text-4xl block mb-4">🔍</span>
            <p className="text-text-muted">
              No products found. Try adjusting your search or filters.
            </p>
          </div>
        )}

        {/* NFT Info Tooltip */}
        <RevealOnScroll delay={0.15}>
          <div className="mt-10 glass p-4 sm:p-6">
            <button
              onClick={() => setShowNFTInfo(!showNFTInfo)}
              className="flex items-center gap-2 text-sm text-text-muted hover:text-text-primary transition-colors w-full"
            >
              <Info size={16} className="text-accent-blue shrink-0" />
              <span className="font-medium">
                What does &quot;+NFT&quot; mean?
              </span>
              <ChevronDown
                size={14}
                className={`ml-auto transition-transform ${showNFTInfo ? "rotate-180" : ""}`}
              />
            </button>
            <AnimatePresence>
              {showNFTInfo && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <p className="text-sm text-text-dim mt-3 leading-relaxed">
                    +NFT means you can claim a Supporter NFT after purchase (Prototype).
                    This unlocks a rewards tier in the ReUse ecosystem: Bronze (+50%),
                    Silver (+75%), or Gold (+100%) — depending on the product you buy.
                    The higher your tier, the bigger your reward boost when you shop
                    secondhand with the ReUse dApp.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </RevealOnScroll>

        {/* Trust bar */}
        <RevealOnScroll delay={0.2}>
          <div className="mt-8 glass p-6 sm:p-8">
            <div className="grid sm:grid-cols-4 gap-6 text-center">
              <div>
                <span className="text-2xl block mb-2">📦</span>
                <h3 className="font-bold text-sm text-text-primary mb-1">
                  Free EU Shipping
                </h3>
                <p className="text-xs text-text-muted font-mono">
                  Over &euro;75 (2–5 business days)
                </p>
              </div>
              <div>
                <span className="text-2xl block mb-2">🌱</span>
                <h3 className="font-bold text-sm text-text-primary mb-1">
                  Plastic-Free Packaging
                </h3>
                <p className="text-xs text-text-muted font-mono">
                  Recycled & certified materials
                </p>
              </div>
              <div>
                <span className="text-2xl block mb-2">🎫</span>
                <h3 className="font-bold text-sm text-text-primary mb-1">
                  NFT With Every Order
                </h3>
                <p className="text-xs text-text-muted font-mono">
                  Claim after purchase (Prototype)
                </p>
              </div>
              <div>
                <span className="text-2xl block mb-2">🖨️</span>
                <h3 className="font-bold text-sm text-text-primary mb-1">
                  Printed On Demand
                </h3>
                <p className="text-xs text-text-muted font-mono">
                  Zero overproduction, less waste
                </p>
              </div>
            </div>
          </div>
        </RevealOnScroll>
      </div>
    </div>
  );
}
