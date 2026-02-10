"use client";

import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  useMemo,
} from "react";
import type { ShopifyCart, ShopifyCartLine } from "@/lib/shopify";
import {
  createCart,
  addLinesToCart,
  updateCartLines,
  removeCartLines,
  getCart,
} from "@/lib/shopify";

// Re-export the cart line type for convenience
export type CartLine = ShopifyCartLine;

interface CartContextType {
  cart: ShopifyCart | null;
  lines: ShopifyCartLine[];
  isOpen: boolean;
  loading: boolean;
  addItem: (variantId: string, quantity?: number) => Promise<void>;
  removeItem: (lineId: string) => Promise<void>;
  updateQuantity: (lineId: string, quantity: number) => Promise<void>;
  toggleCart: () => void;
  closeCart: () => void;
  totalItems: number;
  totalPrice: number;
  checkoutUrl: string | null;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_ID_KEY = "reuse-cart-id";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<ShopifyCart | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  // Hydrate cart from localStorage on mount
  useEffect(() => {
    async function hydrate() {
      try {
        const cartId = localStorage.getItem(CART_ID_KEY);
        if (cartId) {
          const existing = await getCart(cartId);
          if (existing && existing.lines.edges.length > 0) {
            setCart(existing);
            return;
          }
        }
      } catch {
        // Cart expired or invalid — will create new on first add
        localStorage.removeItem(CART_ID_KEY);
      }
    }
    hydrate();
  }, []);

  // Persist cartId whenever cart changes
  useEffect(() => {
    if (cart?.id) {
      localStorage.setItem(CART_ID_KEY, cart.id);
    }
  }, [cart?.id]);

  const lines = useMemo(
    () => cart?.lines.edges.map((e) => e.node) ?? [],
    [cart]
  );

  const totalItems = cart?.totalQuantity ?? 0;

  const totalPrice = useMemo(() => {
    if (!cart) return 0;
    return parseFloat(cart.cost.subtotalAmount.amount);
  }, [cart]);

  const checkoutUrl = cart?.checkoutUrl ?? null;

  const addItem = useCallback(
    async (variantId: string, quantity: number = 1) => {
      setLoading(true);
      try {
        if (!cart) {
          // Create new cart with the item
          const newCart = await createCart([
            { merchandiseId: variantId, quantity },
          ]);
          setCart(newCart);
        } else {
          const updated = await addLinesToCart(cart.id, [
            { merchandiseId: variantId, quantity },
          ]);
          setCart(updated);
        }
        setIsOpen(true);
      } catch (err) {
        console.error("Failed to add item to cart:", err);
      } finally {
        setLoading(false);
      }
    },
    [cart]
  );

  const removeItem = useCallback(
    async (lineId: string) => {
      if (!cart) return;
      setLoading(true);
      try {
        const updated = await removeCartLines(cart.id, [lineId]);
        setCart(updated);
      } catch (err) {
        console.error("Failed to remove item:", err);
      } finally {
        setLoading(false);
      }
    },
    [cart]
  );

  const updateQuantity = useCallback(
    async (lineId: string, quantity: number) => {
      if (!cart) return;
      setLoading(true);
      try {
        if (quantity <= 0) {
          const updated = await removeCartLines(cart.id, [lineId]);
          setCart(updated);
        } else {
          const updated = await updateCartLines(cart.id, [
            { id: lineId, quantity },
          ]);
          setCart(updated);
        }
      } catch (err) {
        console.error("Failed to update quantity:", err);
      } finally {
        setLoading(false);
      }
    },
    [cart]
  );

  const toggleCart = useCallback(() => setIsOpen((v) => !v), []);
  const closeCart = useCallback(() => setIsOpen(false), []);

  return (
    <CartContext.Provider
      value={{
        cart,
        lines,
        isOpen,
        loading,
        addItem,
        removeItem,
        updateQuantity,
        toggleCart,
        closeCart,
        totalItems,
        totalPrice,
        checkoutUrl,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
