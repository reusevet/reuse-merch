"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Badge } from "./Badge";
import type { Product } from "@/lib/mock-data";
import { getB3TRPrice, getProductTier } from "@/lib/mock-data";
import { useCurrency } from "@/context/CurrencyContext";

interface ProductCardProps {
  product: Product;
  showB3TR?: boolean;
}

export function ProductCard({ product, showB3TR = false }: ProductCardProps) {
  const b3trPrice = getB3TRPrice(product.priceEUR);
  const { convertPrice, symbol } = useCurrency();
  const t = useTranslations("products");
  const displayPrice = convertPrice(product.priceEUR);
  const tier = getProductTier(product);

  return (
    <Link
      href={`/product/${product.handle}`}
      className="group block focus:outline-none"
    >
      <motion.div
        whileHover={{ y: -5 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="bg-bg-card border border-border-subtle rounded-card overflow-hidden transition-colors duration-[400ms] group-hover:border-accent-blue/20 group-focus-visible:ring-2 group-focus-visible:ring-accent-blue group-focus-visible:ring-offset-2 group-focus-visible:ring-offset-bg-primary h-full flex flex-col"
      >
        {/* Product image */}
        <div className="relative aspect-[4/5] bg-bg-secondary overflow-hidden">
          <motion.div
            className="absolute inset-0 flex items-center justify-center p-6"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <Image
              src={product.image}
              alt={product.name}
              width={400}
              height={500}
              className="object-contain w-full h-full drop-shadow-lg"
            />
          </motion.div>

          {/* View Details overlay */}
          <div className="absolute inset-0 bg-bg-primary/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <span className="bg-gradient-button text-white text-sm font-medium px-5 py-2.5 rounded-button shadow-button transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
              {t("viewDetails")}
            </span>
          </div>

          {/* Badge */}
          {product.badge && (
            <div className="absolute top-3 left-3 z-10">
              <Badge>{product.badge}</Badge>
            </div>
          )}

          {/* NFT badge */}
          <div className="absolute top-3 right-3 z-10">
            <Badge variant="blue">+NFT</Badge>
          </div>
        </div>

        {/* Info */}
        <div className="p-5 flex flex-col flex-1">
          {/* Material tag */}
          <span className="font-mono text-[10px] uppercase tracking-[1px] text-accent-green">
            {product.material.split("/")[0].trim()}
          </span>

          {/* Name */}
          <h3 className="text-[17px] font-bold text-text-primary mt-1 mb-1 group-hover:text-accent-blue transition-colors">
            {product.name}
          </h3>

          {/* NFT tier line */}
          <p className="text-[11px] text-text-dim font-mono mb-3">
            {tier.emoji} {tier.name} NFT · {tier.boost}
          </p>

          {/* Colors */}
          <div className="flex items-center gap-1.5 mb-3">
            {product.colors.map((color) => (
              <div
                key={color.name}
                className="w-4 h-4 rounded-full border border-border-subtle transition-transform duration-300 group-hover:scale-110"
                style={{ backgroundColor: color.hex }}
                title={color.name}
                aria-label={color.name}
              />
            ))}
          </div>

          {/* Price — pushed to bottom */}
          <div className="mt-auto">
            {showB3TR ? (
              <div>
                <span className="font-mono text-[19px] font-bold text-accent-blue">
                  {b3trPrice} B3TR
                </span>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="font-mono text-sm text-text-dim line-through">
                    {symbol}{displayPrice.toFixed(2)}
                  </span>
                  <Badge variant="green">-15%</Badge>
                </div>
              </div>
            ) : (
              <div>
                <span className="font-mono text-[19px] font-bold text-text-primary">
                  {symbol}{displayPrice.toFixed(2)}
                </span>
                <span className="font-mono text-[11px] text-text-dim block mt-0.5">
                  &asymp; {b3trPrice} B3TR
                </span>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
