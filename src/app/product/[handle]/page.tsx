"use client";

import { useState, useEffect, useMemo } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowLeft, Recycle, Truck, Award, Plus, Minus, Loader2 } from "lucide-react";
import { Button } from "@/components/Button";
import { Badge } from "@/components/Badge";
import { getProductByHandle } from "@/lib/shopify";
import type { ShopifyProduct, ShopifyProductVariant } from "@/lib/shopify";
import { getProductMeta, getB3TRPrice } from "@/lib/product-meta";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/components/Toast";

const ease = [0.16, 1, 0.3, 1] as [number, number, number, number];

export default function ProductPage() {
  const params = useParams();
  const handle = params.handle as string;
  const { addItem } = useCart();
  const { addToast } = useToast();

  const [product, setProduct] = useState<ShopifyProduct | null>(null);
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);
  const [showB3TR, setShowB3TR] = useState(false);
  const [quantity, setQuantity] = useState(1);

  // Selected options keyed by option name
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({});

  useEffect(() => {
    async function fetchProduct() {
      try {
        const p = await getProductByHandle(handle);
        setProduct(p);
        // Initialize selected options to first values
        if (p) {
          const defaults: Record<string, string> = {};
          p.options.forEach((opt) => {
            defaults[opt.name] = opt.values[0];
          });
          setSelectedOptions(defaults);
        }
      } catch (err) {
        console.error("Failed to fetch product:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchProduct();
  }, [handle]);

  // Find the matching variant based on selected options
  const selectedVariant: ShopifyProductVariant | undefined = useMemo(() => {
    if (!product) return undefined;
    return product.variants.edges
      .map((e) => e.node)
      .find((v) =>
        v.selectedOptions.every(
          (opt) => selectedOptions[opt.name] === opt.value
        )
      );
  }, [product, selectedOptions]);

  if (loading) {
    return (
      <div className="min-h-screen bg-bg-primary flex items-center justify-center">
        <Loader2 size={32} className="animate-spin text-accent-blue" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-bg-primary flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <span className="text-6xl block mb-4">👕</span>
          <h1 className="text-2xl font-serif italic text-text-primary mb-2">
            Product not found
          </h1>
          <Link href="/shop" className="text-accent-blue hover:underline text-sm">
            Back to shop
          </Link>
        </motion.div>
      </div>
    );
  }

  const meta = getProductMeta(handle);
  const tier = meta.tier;
  const price = selectedVariant
    ? parseFloat(selectedVariant.price.amount)
    : parseFloat(product.priceRange.minVariantPrice.amount);
  const b3trPrice = getB3TRPrice(price);
  const mainImg = product.images.edges[0]?.node;

  async function handleAddToCart() {
    if (!selectedVariant) return;
    setAdding(true);
    await addItem(selectedVariant.id, quantity);
    addToast(`${product!.title} added to cart`);
    setQuantity(1);
    setAdding(false);
  }

  return (
    <div className="min-h-screen bg-bg-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Breadcrumb */}
        <Link
          href="/shop"
          className="inline-flex items-center gap-2 text-text-muted hover:text-text-primary transition-colors text-sm mb-8 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-blue rounded"
        >
          <ArrowLeft size={16} />
          Back to shop
        </Link>

        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease }}
            className="bg-bg-card border border-border-subtle rounded-card overflow-hidden aspect-square flex items-center justify-center relative group"
          >
            <motion.div
              className="flex items-center justify-center p-8 w-full h-full"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.5, ease }}
            >
              {mainImg ? (
                <Image
                  src={mainImg.url}
                  alt={mainImg.altText || product.title}
                  width={500}
                  height={500}
                  className="object-contain w-full h-full drop-shadow-xl"
                  priority
                />
              ) : (
                <span className="text-8xl opacity-20">👕</span>
              )}
            </motion.div>

            <div className="absolute top-4 right-4">
              <Badge variant="blue">+NFT</Badge>
            </div>
          </motion.div>

          {/* Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease, delay: 0.15 }}
          >
            {/* Materials */}
            <span className="font-mono text-[11px] uppercase tracking-[2px] text-accent-green">
              {meta.materials}
            </span>

            {/* Name */}
            <h1 className="font-serif italic text-[clamp(30px,4.5vw,48px)] text-text-primary mt-2 mb-4">
              {product.title}
            </h1>

            {/* Quick bullets */}
            <div className="flex flex-wrap gap-3 mb-5">
              <span className="inline-flex items-center gap-1.5 text-xs text-text-muted bg-bg-card border border-border-subtle rounded-badge px-2.5 py-1">
                <span className="text-accent-green">♻️</span> Recycled materials
              </span>
              <span className="inline-flex items-center gap-1.5 text-xs text-text-muted bg-bg-card border border-border-subtle rounded-badge px-2.5 py-1">
                <span>🖨️</span> Print-on-demand (less waste)
              </span>
              <span className="inline-flex items-center gap-1.5 text-xs text-text-muted bg-bg-card border border-border-subtle rounded-badge px-2.5 py-1">
                <span>🎫</span> {tier.name} NFT + {tier.boost}{" "}
                <span className="text-[8px] text-accent-purple/70 font-mono">(Prototype)</span>
              </span>
            </div>

            {/* Price */}
            <div className="flex items-center gap-4 mb-6">
              {showB3TR ? (
                <>
                  <span className="font-mono text-3xl font-bold text-accent-blue">
                    {b3trPrice} B3TR
                  </span>
                  <span className="font-mono text-lg text-text-dim line-through">
                    &euro;{price.toFixed(2)}
                  </span>
                  <Badge variant="green">-15%</Badge>
                </>
              ) : (
                <span className="font-mono text-3xl font-bold text-text-primary">
                  &euro;{price.toFixed(2)}
                </span>
              )}
            </div>

            {/* Price toggle */}
            <button
              onClick={() => setShowB3TR(!showB3TR)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-badge text-xs font-mono transition-all duration-300 mb-8 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-blue ${
                showB3TR
                  ? "bg-accent-blue/10 border border-accent-blue/30 text-accent-blue"
                  : "bg-bg-card border border-border-subtle text-text-muted"
              }`}
              role="switch"
              aria-checked={showB3TR}
              aria-label="Toggle B3TR pricing"
            >
              Show {showB3TR ? "EUR" : "B3TR"} price
              <span className="text-[8px] text-accent-purple/70 ml-1">(Prototype)</span>
            </button>

            {/* Description */}
            <p className="text-text-muted text-[17px] leading-relaxed mb-8">
              {product.description}
            </p>

            {/* Option selectors (Color, Size, etc.) */}
            {product.options.map((option) => (
              <div key={option.name} className="mb-6">
                <span className="font-mono text-[11px] uppercase tracking-[1px] text-text-dim block mb-3">
                  {option.name}
                  {selectedOptions[option.name] && ` — ${selectedOptions[option.name]}`}
                </span>
                <div className="flex flex-wrap gap-2" role="radiogroup" aria-label={option.name}>
                  {option.values.map((value) => (
                    <motion.button
                      key={value}
                      onClick={() =>
                        setSelectedOptions((prev) => ({
                          ...prev,
                          [option.name]: value,
                        }))
                      }
                      whileTap={{ scale: 0.95 }}
                      className={`px-4 py-2.5 rounded-button font-mono text-sm transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-blue ${
                        selectedOptions[option.name] === value
                          ? "bg-gradient-button text-white shadow-button"
                          : "bg-bg-card border border-border-subtle text-text-muted hover:text-text-primary hover:border-accent-blue/20"
                      }`}
                      role="radio"
                      aria-checked={selectedOptions[option.name] === value}
                    >
                      {value}
                    </motion.button>
                  ))}
                </div>
              </div>
            ))}

            {/* Quantity selector */}
            <div className="mb-8">
              <span className="font-mono text-[11px] uppercase tracking-[1px] text-text-dim block mb-3">
                Quantity
              </span>
              <div className="flex items-center gap-3">
                <motion.button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  whileTap={{ scale: 0.9 }}
                  className="w-10 h-10 rounded-button bg-bg-card border border-border-subtle flex items-center justify-center text-text-muted hover:text-text-primary hover:border-accent-blue/20 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-blue"
                  aria-label="Decrease quantity"
                  disabled={quantity <= 1}
                >
                  <Minus size={16} />
                </motion.button>
                <span className="font-mono text-lg font-bold text-text-primary w-8 text-center">
                  {quantity}
                </span>
                <motion.button
                  onClick={() => setQuantity(Math.min(10, quantity + 1))}
                  whileTap={{ scale: 0.9 }}
                  className="w-10 h-10 rounded-button bg-bg-card border border-border-subtle flex items-center justify-center text-text-muted hover:text-text-primary hover:border-accent-blue/20 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-blue"
                  aria-label="Increase quantity"
                  disabled={quantity >= 10}
                >
                  <Plus size={16} />
                </motion.button>
              </div>
            </div>

            {/* Add to cart */}
            <motion.div whileTap={{ scale: 0.98 }}>
              <Button
                size="lg"
                className="w-full sm:w-auto"
                onClick={handleAddToCart}
                disabled={!selectedVariant?.availableForSale || adding}
              >
                {adding
                  ? "Adding..."
                  : !selectedVariant?.availableForSale
                  ? "Sold Out"
                  : `Add to Cart${quantity > 1 ? ` (${quantity})` : ""}`}
              </Button>
            </motion.div>

            {/* Features */}
            <div className="mt-10 space-y-4">
              {[
                {
                  icon: <Recycle size={18} className="text-accent-green" />,
                  text: meta.materials,
                },
                {
                  icon: <Award size={18} className="text-accent-purple" />,
                  text: `${tier.name} Supporter NFT included (${tier.boost})`,
                },
                {
                  icon: <Truck size={18} className="text-accent-blue" />,
                  text: "Free EU shipping above \u20AC75",
                },
              ].map((feature) => (
                <div
                  key={feature.text}
                  className="flex items-center gap-3 text-sm text-text-muted"
                >
                  {feature.icon}
                  {feature.text}
                </div>
              ))}
            </div>

            {/* NFT info box */}
            <div className="mt-8 glass p-5">
              <div className="flex items-start gap-3">
                <span className="text-2xl">{tier.emoji}</span>
                <div>
                  <h3 className="font-bold text-sm text-text-primary mb-1">
                    {tier.name} Supporter NFT Included{" "}
                    <span className="text-[9px] text-accent-purple/70 font-mono font-normal">
                      (Prototype)
                    </span>
                  </h3>
                  <p className="text-xs text-text-muted leading-relaxed">
                    This purchase earns you a {tier.name} Supporter NFT (
                    {tier.multiplier} reward multiplier / {tier.boost} in the
                    ReUse dApp). Buyback contribution: {meta.buyback} per sale.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
