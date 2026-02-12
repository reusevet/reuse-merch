// Product metadata: tier mapping + buyback info keyed by Shopify product handle
// This is the ONLY place tiers/buyback are defined. Edit handles here when
// Printful product slugs change in Shopify.
//
// The Shopify product handles are set by Printful when products are published.
// Check your Shopify admin > Products > [product] > URL handle if unsure.

export type TierName = "Bronze" | "Silver" | "Gold";

export interface TierInfo {
  name: TierName;
  emoji: string;
  multiplier: string;
  boost: string; // "+50% rewards"
  color: string;
}

export interface ProductMeta {
  tier: TierInfo;
  buyback: string; // e.g. "€1–€2"
  materials: string; // short materials line
}

// --- Tier definitions ---
const BRONZE: TierInfo = {
  name: "Bronze",
  emoji: "🥉",
  multiplier: "1.5x",
  boost: "+50% rewards",
  color: "#CD7F32",
};
const SILVER: TierInfo = {
  name: "Silver",
  emoji: "🥈",
  multiplier: "1.75x",
  boost: "+75% rewards",
  color: "#C0C0C0",
};
const GOLD: TierInfo = {
  name: "Gold",
  emoji: "🥇",
  multiplier: "2.0x",
  boost: "+100% rewards",
  color: "#FFD700",
};

// --- Handle → metadata mapping ---
// IMPORTANT: Update these handles to match your Shopify product URL handles
// (set by Printful when published). You can find them in Shopify Admin > Products.
const metaMap: Record<string, ProductMeta> = {
  // Beanie (Bronze) — Organic Ribbed Beanie
  "organic-ribbed-beanie": {
    tier: BRONZE,
    buyback: "€1–€2",
    materials: "100% organic cotton",
  },
  // Hoodie (Gold) — Unisex Organic Side Pocket Hoodie
  "unisex-organic-side-pocket-hoodie": {
    tier: GOLD,
    buyback: "€7",
    materials: "Organic cotton",
  },
};

// --- Allowed handles: only these products show in the shop ---
// Update this list when you add/remove products in Printful/Shopify.
export const ALLOWED_HANDLES = Object.keys(metaMap);

const defaultMeta: ProductMeta = {
  tier: BRONZE,
  buyback: "€1",
  materials: "Recycled & certified materials",
};

/** Get tier + buyback info for a product by its Shopify handle */
export function getProductMeta(handle: string): ProductMeta {
  return metaMap[handle] ?? defaultMeta;
}

/** Get just the tier info for a product */
export function getProductTier(handle: string): TierInfo {
  return getProductMeta(handle).tier;
}

// --- NFT tier cards for display (How It Works, Homepage) ---
export const nftTiers = [
  {
    name: "Bronze",
    emoji: "🥉",
    multiplier: "1.5x",
    requirement: "Beanie purchase",
    color: "#CD7F32",
    benefits: [
      "+50% reward boost in ReUse dApp",
      "Supporter badge on ReUse profile",
      "Early access to merch drops",
    ],
  },
  {
    name: "Silver",
    emoji: "🥈",
    multiplier: "1.75x",
    requirement: "T-Shirt or Sweatshirt purchase",
    color: "#C0C0C0",
    benefits: [
      "+75% reward boost in ReUse dApp",
      "Exclusive Silver badge",
      "Priority support",
      "Members-only drops + early access",
    ],
  },
  {
    name: "Gold",
    emoji: "🥇",
    multiplier: "2.0x",
    requirement: "Hoodie purchase",
    color: "#FFD700",
    benefits: [
      "+100% reward boost in ReUse dApp",
      "Legendary Gold badge",
      "VIP Discord role + early access",
      "Free shipping on merch drops",
      "Voting rights on next designs",
      "Impact badge shown in ReUse profile",
    ],
  },
];

// --- Stats (demo data) ---
export const stats = [
  { label: "Recycled Items", value: "2,847", icon: "♻️" },
  { label: "B3TR Earned", value: "1.2M", icon: "⚡" },
  { label: "Active Supporters", value: "894", icon: "🎫" },
  { label: "CO₂ Saved", value: "12.4t", icon: "🌱" },
];

// --- Claim flow options ---
export const claimItemOptions = [
  { label: "Hoodie", tier: GOLD },
  { label: "T-Shirt / Sweatshirt", tier: SILVER },
  { label: "Beanie", tier: BRONZE },
] as const;

// Legacy helper for B3TR price display (prototype only)
export function getB3TRPrice(
  eurPrice: number,
  rate: number = 0.125
): number {
  return Math.round((eurPrice / rate) * 0.85);
}
