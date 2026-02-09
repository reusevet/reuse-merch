"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";

export type FiatCurrency = "EUR" | "USD";

interface CurrencyContextType {
  fiatCurrency: FiatCurrency;
  setFiatCurrency: (c: FiatCurrency) => void;
  convertPrice: (eurPrice: number) => number;
  symbol: string;
}

const EUR_TO_USD = 1.08; // approximate, update later with live rate

const CurrencyContext = createContext<CurrencyContextType>({
  fiatCurrency: "EUR",
  setFiatCurrency: () => {},
  convertPrice: (p) => p,
  symbol: "€",
});

export function CurrencyProvider({ children }: { children: ReactNode }) {
  const [fiatCurrency, setFiatCurrency] = useState<FiatCurrency>("EUR");

  // Persist currency preference
  useEffect(() => {
    const saved = localStorage.getItem("fiat-currency") as FiatCurrency | null;
    if (saved === "EUR" || saved === "USD") {
      setFiatCurrency(saved);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("fiat-currency", fiatCurrency);
  }, [fiatCurrency]);

  const convertPrice = (eurPrice: number): number => {
    if (fiatCurrency === "USD") {
      return Math.round(eurPrice * EUR_TO_USD * 100) / 100;
    }
    return eurPrice;
  };

  const symbol = fiatCurrency === "USD" ? "$" : "€";

  return (
    <CurrencyContext.Provider
      value={{ fiatCurrency, setFiatCurrency, convertPrice, symbol }}
    >
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  return useContext(CurrencyContext);
}
