export interface ProductColor {
  name: string;
  hex: string;
}

export interface Product {
  id: string;
  handle: string;
  name: string;
  description: string;
  material: string;
  priceEUR: number;
  category: "apparel" | "accessories";
  colors: ProductColor[];
  sizes: string[];
  image: string;
  badge?: string;
  isNew?: boolean;
}

export const products: Product[] = [
  {
    id: "1",
    handle: "essential-tee",
    name: "Essential Tee",
    description:
      "The foundation of sustainable style. Made from 100% recycled cotton, this tee is soft, breathable, and planet-friendly.",
    material: "100% Recycled Cotton",
    priceEUR: 34.95,
    category: "apparel",
    colors: [
      { name: "Black", hex: "#1a1e2e" },
      { name: "Off-White", hex: "#f5f0e8" },
      { name: "Forest Green", hex: "#2d5016" },
    ],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    image: "/products/essential-tee.png",
    badge: "Best Seller",
    isNew: true,
  },
  {
    id: "2",
    handle: "circuit-hoodie",
    name: "Circuit Hoodie",
    description:
      "Warm, cozy, and fully recycled. The Circuit Hoodie features a blend of recycled cotton and polyester for the perfect layering piece.",
    material: "80% Recycled Cotton / 20% Recycled Polyester",
    priceEUR: 64.95,
    category: "apparel",
    colors: [
      { name: "Black", hex: "#1a1e2e" },
      { name: "Dark Grey", hex: "#3a3f52" },
    ],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    image: "/products/circuit-hoodie.png",
    badge: "Popular",
  },
  {
    id: "3",
    handle: "loop-tote",
    name: "Loop Tote",
    description:
      "Carry your commitment to sustainability. Made from 100% recycled organic cotton, the Loop Tote is perfect for everyday use.",
    material: "100% Recycled Organic Cotton",
    priceEUR: 22.95,
    category: "accessories",
    colors: [
      { name: "Off-White", hex: "#f5f0e8" },
      { name: "Black", hex: "#1a1e2e" },
    ],
    sizes: ["One Size"],
    image: "/products/loop-tote.png",
  },
  {
    id: "4",
    handle: "node-beanie",
    name: "Node Beanie",
    description:
      "Stay warm with a clear conscience. Knitted from recycled wool and polyester, the Node Beanie is built for comfort.",
    material: "50% Recycled Wool / 50% Recycled Polyester",
    priceEUR: 28.95,
    category: "accessories",
    colors: [
      { name: "Black", hex: "#1a1e2e" },
      { name: "Forest Green", hex: "#2d5016" },
    ],
    sizes: ["One Size"],
    image: "/products/node-beanie.png",
    isNew: true,
  },
  {
    id: "5",
    handle: "cycle-cap",
    name: "Cycle Cap",
    description:
      "Sun, rain, or ride — the Cycle Cap has you covered. Made from 100% recycled polyester, it's as versatile as it is sustainable.",
    material: "100% Recycled Polyester",
    priceEUR: 26.95,
    category: "accessories",
    colors: [
      { name: "Black", hex: "#1a1e2e" },
      { name: "Off-White", hex: "#f5f0e8" },
    ],
    sizes: ["One Size"],
    image: "/products/cycle-cap.png",
  },
  {
    id: "6",
    handle: "genesis-crewneck",
    name: "Genesis Crewneck",
    description:
      "The Genesis Crewneck is your go-to for sustainable comfort. 100% recycled French terry that feels as good as it looks.",
    material: "100% Recycled French Terry",
    priceEUR: 54.95,
    category: "apparel",
    colors: [
      { name: "Off-White", hex: "#f5f0e8" },
      { name: "Black", hex: "#1a1e2e" },
    ],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    image: "/products/genesis-crewneck.png",
    badge: "Limited",
  },
];

export const nftTiers = [
  {
    name: "Bronze",
    emoji: "🥉",
    multiplier: "1.2x",
    requirement: "1 item purchased",
    color: "#CD7F32",
    benefits: [
      "20% reward boost in ReUse dApp",
      "Supporter badge on ReUse profile",
      "Early access to merch drops",
    ],
  },
  {
    name: "Silver",
    emoji: "🥈",
    multiplier: "1.5x",
    requirement: "3 items purchased",
    color: "#C0C0C0",
    benefits: [
      "50% reward boost in ReUse dApp",
      "Exclusive Silver badge",
      "Priority support",
      "Members-only drops + early access",
    ],
  },
  {
    name: "Gold",
    emoji: "🥇",
    multiplier: "2.0x",
    requirement: "5 items purchased",
    color: "#FFD700",
    benefits: [
      "100% reward boost in ReUse dApp",
      "Legendary Gold badge",
      "VIP Discord role + early access",
      "Free shipping on merch drops",
      "Voting rights on next designs",
      "Impact badge shown in ReUse profile",
    ],
  },
];

export const stats = [
  { label: "Recycled Items", value: "2,847", icon: "♻️" },
  { label: "B3TR Earned", value: "1.2M", icon: "⚡" },
  { label: "Active Supporters", value: "894", icon: "🎫" },
  { label: "CO₂ Saved", value: "12.4t", icon: "🌱" },
];

export function getB3TRPrice(eurPrice: number, rate: number = 0.125): number {
  return Math.round((eurPrice / rate) * 0.85);
}
