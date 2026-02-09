"use client";

import { useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Plus, Minus, Trash2, ShoppingBag } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { Button } from "./Button";

const ease = [0.16, 1, 0.3, 1] as [number, number, number, number];

export function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQuantity, totalPrice, totalItems } =
    useCart();
  const drawerRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // Focus trap + keyboard handling
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeCart();
        return;
      }
      if (e.key !== "Tab" || !drawerRef.current) return;

      const focusable = drawerRef.current.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last?.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first?.focus();
      }
    },
    [closeCart]
  );

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
      // Focus close button on open
      setTimeout(() => closeButtonRef.current?.focus(), 100);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, handleKeyDown]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
            onClick={closeCart}
            aria-hidden="true"
          />

          {/* Drawer */}
          <motion.div
            ref={drawerRef}
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.4, ease }}
            className="fixed top-0 right-0 z-50 h-full w-full max-w-md bg-bg-primary border-l border-border-subtle shadow-2xl flex flex-col"
            role="dialog"
            aria-modal="true"
            aria-labelledby="cart-title"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-border-subtle">
              <div className="flex items-center gap-3">
                <h2 id="cart-title" className="font-serif italic text-xl text-text-primary">
                  Your Cart
                </h2>
                {totalItems > 0 && (
                  <span className="font-mono text-xs text-text-muted bg-bg-card px-2 py-0.5 rounded-full">
                    {totalItems} {totalItems === 1 ? "item" : "items"}
                  </span>
                )}
              </div>
              <button
                ref={closeButtonRef}
                onClick={closeCart}
                className="p-2 text-text-muted hover:text-text-primary transition-colors rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-blue"
                aria-label="Close cart"
              >
                <X size={20} />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-6 py-4 scroll-smooth">
              {items.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, ease }}
                  className="flex flex-col items-center justify-center h-full text-center"
                >
                  <motion.div
                    animate={{ y: [0, -8, 0] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <ShoppingBag size={48} className="text-text-dim mb-4" />
                  </motion.div>
                  <p className="text-text-muted text-lg mb-2">Your cart is empty</p>
                  <p className="text-text-dim text-sm">Add some sustainable merch!</p>
                </motion.div>
              ) : (
                <div className="space-y-3">
                  <AnimatePresence mode="popLayout">
                    {items.map((item) => (
                      <motion.div
                        key={`${item.product.id}-${item.size}-${item.color}`}
                        layout
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20, height: 0, marginBottom: 0 }}
                        transition={{ duration: 0.3, ease }}
                        className="flex gap-4 bg-bg-card border border-border-subtle rounded-glass p-3"
                      >
                        {/* Image placeholder */}
                        <div className="w-20 h-20 rounded-lg bg-bg-secondary flex items-center justify-center shrink-0 overflow-hidden">
                          <span className="text-2xl opacity-30">👕</span>
                        </div>

                        {/* Details */}
                        <div className="flex-1 min-w-0">
                          <h3 className="text-sm font-bold text-text-primary truncate">
                            {item.product.name}
                          </h3>
                          <p className="text-xs text-text-muted mt-0.5">
                            {item.color} &middot; {item.size}
                          </p>
                          <p className="font-mono text-sm font-bold text-text-primary mt-1">
                            &euro;{(item.product.priceEUR * item.quantity).toFixed(2)}
                          </p>

                          {/* Quantity controls */}
                          <div className="flex items-center gap-2 mt-2">
                            <button
                              onClick={() =>
                                updateQuantity(
                                  item.product.id,
                                  item.size,
                                  item.color,
                                  item.quantity - 1
                                )
                              }
                              className="w-7 h-7 rounded-md bg-bg-input border border-border-subtle flex items-center justify-center text-text-muted hover:text-text-primary transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-blue"
                              aria-label={`Decrease quantity of ${item.product.name}`}
                            >
                              <Minus size={14} />
                            </button>
                            <span className="font-mono text-sm text-text-primary w-6 text-center">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() =>
                                updateQuantity(
                                  item.product.id,
                                  item.size,
                                  item.color,
                                  item.quantity + 1
                                )
                              }
                              className="w-7 h-7 rounded-md bg-bg-input border border-border-subtle flex items-center justify-center text-text-muted hover:text-text-primary transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-blue"
                              aria-label={`Increase quantity of ${item.product.name}`}
                            >
                              <Plus size={14} />
                            </button>
                            <button
                              onClick={() =>
                                removeItem(item.product.id, item.size, item.color)
                              }
                              className="ml-auto p-1.5 text-text-dim hover:text-red-400 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-red-400 rounded"
                              aria-label={`Remove ${item.product.name} from cart`}
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              )}
            </div>

            {/* Footer */}
            <AnimatePresence>
              {items.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.3, ease }}
                  className="px-6 py-4 border-t border-border-subtle space-y-4"
                >
                  {/* NFT tier preview */}
                  <div className="glass p-3 text-center">
                    <p className="text-sm text-text-muted">
                      This purchase earns you a{" "}
                      <span className="text-accent-purple font-semibold">
                        Bronze Supporter NFT
                      </span>{" "}
                      🥉
                    </p>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-text-muted">Subtotal</span>
                    <span className="font-mono text-xl font-bold text-text-primary">
                      &euro;{totalPrice.toFixed(2)}
                    </span>
                  </div>
                  <Button className="w-full" size="lg">
                    Checkout
                  </Button>
                  <p className="text-center text-text-dim text-xs font-mono">
                    Pay with EUR or B3TR tokens
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
