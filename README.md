# ReUse Merch Shop

Sustainable supporter merch for the [ReUse](https://reuse.vet/) circular economy ecosystem. Built with Next.js 14, Shopify Storefront API, and Printful print-on-demand.

## Tech Stack

- **Framework:** Next.js 14 (App Router) + TypeScript
- **Styling:** Tailwind CSS (dark theme)
- **Commerce:** Shopify Storefront API (GraphQL)
- **Fulfillment:** Printful (via Shopify integration)
- **Animations:** Framer Motion
- **i18n:** next-intl (EN, NL, DE, FR, ES)
- **Deployment:** Vercel

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Set up environment variables

Copy `.env.example` to `.env.local` and fill in your Shopify credentials:

```bash
cp .env.example .env.local
```

Required variables:

| Variable | Description |
|---|---|
| `NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN` | Your Shopify store domain (e.g. `your-store.myshopify.com`) |
| `NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN` | Storefront API access token |

#### How to get your Storefront access token

1. Go to **Shopify Admin** > **Settings** > **Apps and sales channels** > **Develop apps**
2. Create a new app (or use an existing one)
3. Under **Configuration**, enable **Storefront API** access scopes:
   - `unauthenticated_read_products`
   - `unauthenticated_read_product_listings`
   - `unauthenticated_write_checkouts`
   - `unauthenticated_read_checkouts`
4. Install the app and copy the **Storefront API access token**

### 3. Run development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### 4. Build for production

```bash
npm run build
```

## Shopify + Printful Setup

This shop is designed to work with **Printful** as the fulfillment partner, connected to Shopify:

1. **Printful** > Create products (Beanie, T-Shirt, Hoodie, Sweatshirt)
2. **Printful** > Publish products to your Shopify store
3. **Shopify** > Products will appear with auto-generated URL handles
4. **This app** > Update handles in `src/lib/product-meta.ts` to match

### Product Handle Mapping

The file `src/lib/product-meta.ts` maps Shopify product handles to NFT tier metadata. After publishing products from Printful, check your Shopify Admin > Products > [product] > URL handle and update the handles in `metaMap`.

Current expected handles:

| Product | Handle | NFT Tier |
|---|---|---|
| Beanie | `ribbed-knit-beanie` | Bronze (+50%) |
| T-Shirt | `unisex-staple-eco-t-shirt` | Silver (+75%) |
| Hoodie | `unisex-organic-relaxed-hoodie` | Gold (+100%) |
| Sweatshirt | `unisex-eco-sweatshirt` | Silver (+75%) |

## Project Structure

```
src/
  app/            # Next.js App Router pages
    page.tsx      # Homepage
    shop/         # Shop page (product grid)
    product/      # Product detail pages (dynamic [handle])
    claim/        # NFT claim prototype
    how-it-works/ # How it works page
    contact/      # Contact page
    ...
  components/     # Shared UI components
  context/        # React contexts (Cart)
  lib/
    shopify/      # Shopify Storefront API client
      client.ts   # GraphQL fetch function
      queries.ts  # GraphQL queries & mutations
      types.ts    # TypeScript interfaces
      index.ts    # High-level API functions
    product-meta.ts # Tier/buyback mapping by handle
  i18n/           # Internationalization config
```

## Order Flow

```
Customer browses shop → Adds to Shopify cart → Redirected to Shopify checkout
→ Payment processed by Shopify → Order created → Printful auto-fulfills
→ Customer receives product + can claim Supporter NFT (prototype)
```

## Commands

| Command | Description |
|---|---|
| `npm run dev` | Start development server |
| `npm run build` | Production build |
| `npm run lint` | Run ESLint |
| `npm start` | Start production server |

## Deployment

Deployed on Vercel. Set the same environment variables in your Vercel project settings:

- `NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN`
- `NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN`

## Notes

- **NFT/Blockchain features** are labeled as "Prototype" — no real minting occurs yet
- **B3TR pricing** is a prototype toggle (15% discount display only)
- **Printful** handles all print-on-demand fulfillment automatically via Shopify
- Only products whose handles are listed in `ALLOWED_HANDLES` (in `product-meta.ts`) will appear in the shop
