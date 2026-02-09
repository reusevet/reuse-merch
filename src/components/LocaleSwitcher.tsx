"use client";

import { useState, useRef, useEffect } from "react";
import { Globe, ChevronDown } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { useCurrency, type FiatCurrency } from "@/context/CurrencyContext";

const locales = [
  { code: "en", flag: "🇬🇧" },
  { code: "nl", flag: "🇳🇱" },
  { code: "de", flag: "🇩🇪" },
  { code: "fr", flag: "🇫🇷" },
  { code: "es", flag: "🇪🇸" },
] as const;

const currencies: { code: FiatCurrency; symbol: string }[] = [
  { code: "EUR", symbol: "€" },
  { code: "USD", symbol: "$" },
];

export function LocaleSwitcher() {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const currentLocale = useLocale();
  const t = useTranslations("language");
  const { fiatCurrency, setFiatCurrency } = useCurrency();

  // Close on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  function switchLocale(locale: string) {
    document.cookie = `locale=${locale};path=/;max-age=${60 * 60 * 24 * 365}`;
    window.location.reload();
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-button text-xs font-mono text-text-muted hover:text-text-primary bg-bg-card border border-border-subtle hover:border-accent-blue/20 transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-blue"
        aria-expanded={open}
        aria-label="Language and currency settings"
      >
        <Globe size={14} />
        <span>{currentLocale.toUpperCase()}</span>
        <span className="text-text-dim">|</span>
        <span>{fiatCurrency}</span>
        <ChevronDown
          size={12}
          className={`transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 top-full mt-2 w-52 bg-bg-card border border-border-subtle rounded-card shadow-card-hover overflow-hidden z-50"
          >
            {/* Language section */}
            <div className="p-2">
              <span className="block px-2 py-1 text-[10px] font-mono uppercase tracking-[1px] text-text-dim">
                Language
              </span>
              {locales.map((locale) => (
                <button
                  key={locale.code}
                  onClick={() => {
                    switchLocale(locale.code);
                    setOpen(false);
                  }}
                  className={`w-full flex items-center gap-2.5 px-2 py-2 rounded-lg text-sm transition-colors ${
                    currentLocale === locale.code
                      ? "bg-accent-blue/10 text-accent-blue"
                      : "text-text-muted hover:text-text-primary hover:bg-bg-secondary"
                  }`}
                >
                  <span className="text-base">{locale.flag}</span>
                  <span>{t(locale.code)}</span>
                  {currentLocale === locale.code && (
                    <span className="ml-auto text-accent-blue text-xs">✓</span>
                  )}
                </button>
              ))}
            </div>

            <div className="h-px bg-border-subtle mx-2" />

            {/* Currency section */}
            <div className="p-2">
              <span className="block px-2 py-1 text-[10px] font-mono uppercase tracking-[1px] text-text-dim">
                Currency
              </span>
              {currencies.map((cur) => (
                <button
                  key={cur.code}
                  onClick={() => {
                    setFiatCurrency(cur.code);
                    setOpen(false);
                  }}
                  className={`w-full flex items-center gap-2.5 px-2 py-2 rounded-lg text-sm transition-colors ${
                    fiatCurrency === cur.code
                      ? "bg-accent-blue/10 text-accent-blue"
                      : "text-text-muted hover:text-text-primary hover:bg-bg-secondary"
                  }`}
                >
                  <span className="font-mono text-base">{cur.symbol}</span>
                  <span>{cur.code}</span>
                  {fiatCurrency === cur.code && (
                    <span className="ml-auto text-accent-blue text-xs">✓</span>
                  )}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
