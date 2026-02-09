# Premium Webshop Upgrade Plan

## Overview
Upgrade the ReUse Merch Shop from a static prototype to a premium, animated, accessible e-commerce experience. Edit existing files — no unnecessary new abstractions.

## Priority Order (biggest UX impact first)

### 1. Framer Motion Animations Throughout
**Files:** All components + pages
- **CartDrawer:** Slide-in from right with overlay fade
- **Mobile menu:** Slide-down with stagger on links
- **Homepage sections:** Scroll-triggered fade-up reveals using `motion.div` + `whileInView`
- **Product grid:** Staggered card entrance
- **NFT tier cards:** Stagger entrance
- **Stats:** Count-up number animation
- **Product detail page:** Image + info staggered entrance
- **Buttons:** Subtle scale on tap (`whileTap`)
- **Hover micro-interactions:** Cards lift with spring physics

### 2. CartDrawer — Full Upgrade
**File:** `CartDrawer.tsx`
- Framer Motion `AnimatePresence` for slide + overlay
- Focus trapping (custom hook, no extra lib)
- Escape key closes drawer
- `role="dialog"`, `aria-modal="true"`, `aria-labelledby`
- Lock body scroll when open
- Item count in header

### 3. Toast Notification System
**New file:** `components/Toast.tsx`
**Edit:** `CartContext.tsx`, product page
- Lightweight toast that slides in from bottom-right
- "Added to cart ✓" with product name
- Auto-dismiss after 3s
- Uses Framer Motion AnimatePresence
- Global toast state via context (add to CartContext or separate)

### 4. Cart localStorage Persistence
**File:** `CartContext.tsx`
- Save cart items to localStorage on every change
- Load from localStorage on mount
- Handle SSR (check `typeof window`)
- Use `useMemo` for totalPrice

### 5. Quantity Selector on Product Page
**File:** `product/[handle]/page.tsx`
- Add quantity state (default 1)
- Plus/minus buttons (reuse CartDrawer style)
- Pass quantity to `addItem()`

### 6. Skeleton Loading Components
**New file:** `components/Skeleton.tsx`
- ProductCardSkeleton (matches card dimensions)
- Use pulse animation via Tailwind `animate-pulse`
- Apply on Shop page during filter transitions (brief delay for effect)

### 7. Global Focus & Accessibility
**Files:** `globals.css`, `tailwind.config.ts`
- Add `:focus-visible` ring styles globally
- Add `prefers-reduced-motion` media query (disable animations)
- Skip-to-content link in layout
- `aria-pressed` on filter buttons
- `aria-expanded` on mobile menu
- `aria-selected` on color/size selectors

### 8. Polish & Micro-interactions
- Product card image area: subtle zoom on hover
- Color swatches: scale bounce on select
- Badge: subtle entrance animation
- Navbar: scroll-aware shadow (add shadow on scroll)
