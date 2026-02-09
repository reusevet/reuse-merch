"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowLeft, Recycle, Truck, Award, Plus, Minus } from "lucide-react";
import { Button } from "@/components/Button";
import { Badge } from "@/components/Badge";
import { products, getB3TRPrice, getProductTier } from "@/lib/mock-data";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/components/Toast";

const ease = [0.16, 1, 0.3, 1] as [number, number, number, number];

export default function ProductPage() {
  const params = useParams();
  const handle = params.handle as string;
  const product = products.find((p) => p.handle === handle);
  const { addItem } = useCart();
  const { addToast } = useToast();

  const [selectedColor, setSelectedColor] = useState(
    product?.colors[0]?.name ?? ""
  );
  const [selectedSize, setSelectedSize] = useState(
    product?.sizes[0] ?? ""
  );
  const [showB3TR, setShowB3TR] = useState(false);
  const [quantity, setQuantity] = useState(1);

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
          <Link
            href="/shop"
            className="text-accent-blue hover:underline text-sm"
          >
            Back to shop
          </Link>
        </motion.div>
      </div>
    );
  }

  const b3trPrice = getB3TRPrice(product.priceEUR);
  const tier = getProductTier(product);

  function handleAddToCart() {
    if (product) {
      addItem(product, selectedSize, selectedColor, quantity);
      addToast(`${product.name} added to cart`);
      setQuantity(1);
    }
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
              <Image
                src={product.image}
                alt={product.name}
                width={500}
                height={500}
                className="object-contain w-full h-full drop-shadow-xl"
                priority
              />
            </motion.div>

            {product.badge && (
              <div className="absolute top-4 left-4">
                <Badge>{product.badge}</Badge>
              </div>
            )}
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
            {/* Material */}
            <span className="font-mono text-[11px] uppercase tracking-[2px] text-accent-green">
              {product.material}
            </span>

            {/* Name */}
            <h1 className="font-serif italic text-[clamp(30px,4.5vw,48px)] text-text-primary mt-2 mb-4">
              {product.name}
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
                    &euro;{product.priceEUR.toFixed(2)}
                  </span>
                  <Badge variant="green">-15%</Badge>
                </>
              ) : (
                <span className="font-mono text-3xl font-bold text-text-primary">
                  &euro;{product.priceEUR.toFixed(2)}
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

            {/* Color selector */}
            <div className="mb-6">
              <span className="font-mono text-[11px] uppercase tracking-[1px] text-text-dim block mb-3">
                Color — {selectedColor}
              </span>
              <div className="flex gap-2" role="radiogroup" aria-label="Color">
                {product.colors.map((color) => (
                  <motion.button
                    key={color.name}
                    onClick={() => setSelectedColor(color.name)}
                    whileTap={{ scale: 0.9 }}
                    className={`w-10 h-10 rounded-full border-2 transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-blue focus-visible:ring-offset-2 focus-visible:ring-offset-bg-primary ${
                      selectedColor === color.name
                        ? "border-accent-blue scale-110"
                        : "border-border-subtle hover:border-accent-blue/40"
                    }`}
                    style={{ backgroundColor: color.hex }}
                    role="radio"
                    aria-checked={selectedColor === color.name}
                    aria-label={color.name}
                  />
                ))}
              </div>
            </div>

            {/* Size selector */}
            <div className="mb-6">
              <span className="font-mono text-[11px] uppercase tracking-[1px] text-text-dim block mb-3">
                Size
              </span>
              <div className="flex flex-wrap gap-2" role="radiogroup" aria-label="Size">
                {product.sizes.map((size) => (
                  <motion.button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    whileTap={{ scale: 0.95 }}
                    className={`px-4 py-2.5 rounded-button font-mono text-sm transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-blue ${
                      selectedSize === size
                        ? "bg-gradient-button text-white shadow-button"
                        : "bg-bg-card border border-border-subtle text-text-muted hover:text-text-primary hover:border-accent-blue/20"
                    }`}
                    role="radio"
                    aria-checked={selectedSize === size}
                  >
                    {size}
                  </motion.button>
                ))}
              </div>
            </div>

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
              <Button size="lg" className="w-full sm:w-auto" onClick={handleAddToCart}>
                Add to Cart{quantity > 1 ? ` (${quantity})` : ""}
              </Button>
            </motion.div>

            {/* Features */}
            <div className="mt-10 space-y-4">
              {[
                {
                  icon: <Recycle size={18} className="text-accent-green" />,
                  text: product.material,
                },
                {
                  icon: <Award size={18} className="text-accent-purple" />,
                  text: "Supporter NFT included with purchase",
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
                    <span className="text-[9px] text-accent-purple/70 font-mono font-normal">(Prototype)</span>
                  </h3>
                  <p className="text-xs text-text-muted leading-relaxed">
                    This purchase earns you a {tier.name} Supporter NFT ({tier.multiplier} reward
                    multiplier / {tier.boost} in the ReUse dApp). Claim it after checkout via the{" "}
                    <a href="/claim" className="text-accent-blue hover:underline">claim page</a>.
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
