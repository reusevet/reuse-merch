import type { Metadata } from "next";
import { Nunito, Instrument_Serif, JetBrains_Mono } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CartProvider } from "@/context/CartContext";
import { CurrencyProvider } from "@/context/CurrencyContext";
import { CartDrawer } from "@/components/CartDrawer";
import { ToastProvider } from "@/components/Toast";

const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-nunito",
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-instrument-serif",
  style: ["normal", "italic"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "ReUse Merch Shop | Sustainable Fashion, Blockchain Rewards",
  description:
    "100% recycled merch from the ReUse ecosystem. Pay with EUR or B3TR tokens, earn Supporter NFTs, and boost your dApp rewards.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <html lang={locale} className="dark">
      <body
        className={`${nunito.variable} ${instrumentSerif.variable} ${jetbrainsMono.variable} font-sans antialiased bg-bg-primary text-text-primary min-h-screen`}
      >
        <NextIntlClientProvider messages={messages}>
          <CurrencyProvider>
            <CartProvider>
              <ToastProvider>
                {/* Skip to main content — accessibility */}
                <a
                  href="#main-content"
                  className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-accent-blue focus:text-white focus:rounded-button focus:font-bold focus:text-sm"
                >
                  Skip to main content
                </a>
                <Navbar />
                <main id="main-content">{children}</main>
                <Footer />
                <CartDrawer />
              </ToastProvider>
            </CartProvider>
          </CurrencyProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
