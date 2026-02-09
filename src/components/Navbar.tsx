"use client";

import Link from "next/link";
import { ShoppingBag, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import { useCart } from "@/context/CartContext";
import { LocaleSwitcher } from "./LocaleSwitcher";

const ease = [0.16, 1, 0.3, 1] as [number, number, number, number];

export function Navbar() {
  const { totalItems, toggleCart } = useCart();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const t = useTranslations("nav");

  const navLinks = [
    { href: "/", label: t("home") },
    { href: "/shop", label: t("shop") },
    { href: "/how-it-works", label: t("howItWorks") },
  ];

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 20);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on Escape
  useEffect(() => {
    if (!mobileOpen) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setMobileOpen(false);
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [mobileOpen]);

  return (
    <nav
      className={`sticky top-0 z-50 bg-bg-primary/[0.88] backdrop-blur-[24px] border-b transition-shadow duration-300 ${
        scrolled
          ? "border-accent-blue/[0.12] shadow-[0_4px_30px_rgba(91,141,239,0.06)]"
          : "border-accent-blue/[0.08] shadow-none"
      }`}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 group focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-blue rounded-lg px-1"
          >
            <span className="text-2xl">♻️</span>
            <span className="font-serif italic text-xl sm:text-2xl text-text-primary group-hover:text-accent-blue transition-colors">
              ReUse
            </span>
            <span className="font-mono text-[10px] uppercase tracking-[1px] text-text-dim hidden sm:inline">
              Merch
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="relative text-[15px] text-text-muted hover:text-text-primary transition-colors duration-300 py-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-blue rounded"
              >
                {link.label}
              </Link>
            ))}
            <a
              href="https://reuse.vet/"
              target="_blank"
              rel="noopener noreferrer"
              className="relative text-[15px] text-accent-blue hover:text-accent-purple transition-colors duration-300 py-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-blue rounded inline-flex items-center gap-1"
            >
              {t("dapp")}
              <span className="text-[10px]">↗</span>
            </a>
          </div>

          {/* Right side */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Language / Currency switcher */}
            <LocaleSwitcher />

            <motion.button
              onClick={toggleCart}
              whileTap={{ scale: 0.92 }}
              className="relative p-2.5 text-text-muted hover:text-text-primary transition-colors rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-blue flex items-center gap-1.5"
              aria-label={`Shopping cart${totalItems > 0 ? `, ${totalItems} items` : ""}`}
            >
              <ShoppingBag size={22} />
              <span className="hidden sm:inline text-[13px] font-medium">
                {t("cart")}
              </span>
              <AnimatePresence>
                {totalItems > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    transition={{ type: "spring", stiffness: 500, damping: 25 }}
                    className="absolute -top-0.5 -right-0.5 sm:relative sm:top-auto sm:right-auto w-5 h-5 bg-gradient-button rounded-full flex items-center justify-center text-[10px] font-bold text-white"
                  >
                    {totalItems}
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>

            {/* Mobile hamburger */}
            <motion.button
              onClick={() => setMobileOpen(!mobileOpen)}
              whileTap={{ scale: 0.92 }}
              className="md:hidden p-2.5 text-text-muted hover:text-text-primary transition-colors rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-blue"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease }}
            className="md:hidden border-t border-border-subtle bg-bg-primary/95 backdrop-blur-xl overflow-hidden"
          >
            <div className="px-4 py-4 space-y-1">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.08, duration: 0.3, ease }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="block text-[16px] text-text-muted hover:text-text-primary transition-colors py-3 px-3 rounded-lg hover:bg-bg-card focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-blue"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  delay: navLinks.length * 0.08,
                  duration: 0.3,
                  ease,
                }}
              >
                <a
                  href="https://reuse.vet/"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMobileOpen(false)}
                  className="block text-[16px] text-accent-blue hover:text-accent-purple transition-colors py-3 px-3 rounded-lg hover:bg-bg-card focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-blue"
                >
                  {t("earnSecondhand")} ↗
                </a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
