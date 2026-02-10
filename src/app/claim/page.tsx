"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Wallet, CheckCircle, ChevronDown } from "lucide-react";
import { Button } from "@/components/Button";
import { Badge } from "@/components/Badge";
import { claimItemOptions } from "@/lib/product-meta";

const ease = [0.16, 1, 0.3, 1] as [number, number, number, number];

type Step = "form" | "success";

export default function ClaimPage() {
  const [step, setStep] = useState<Step>("form");
  const [orderCode, setOrderCode] = useState("");
  const [selectedItem, setSelectedItem] = useState(0);
  const [walletConnected, setWalletConnected] = useState(false);

  const currentTier = claimItemOptions[selectedItem].tier;

  function handleConnect() {
    setWalletConnected(true);
  }

  function handleClaim() {
    if (walletConnected && orderCode.trim()) {
      setStep("success");
    }
  }

  return (
    <div className="min-h-screen bg-bg-primary">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
        <AnimatePresence mode="wait">
          {step === "form" ? (
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, ease }}
            >
              {/* Header */}
              <div className="text-center mb-10">
                <Badge variant="blue" className="mb-4">
                  Prototype
                </Badge>
                <h1 className="font-serif italic text-[clamp(32px,5vw,48px)] text-text-primary mb-3">
                  Claim Your Supporter NFT
                </h1>
                <p className="text-text-muted text-lg max-w-lg mx-auto">
                  If you paid with EUR, claim your Supporter NFT here after
                  purchase.
                </p>
                <p className="text-text-dim text-sm mt-2">
                  This is a prototype demo — no real minting occurs.
                </p>
              </div>

              {/* Form Card */}
              <div className="glass p-6 sm:p-8 space-y-6">
                {/* Order code input */}
                <div>
                  <label
                    htmlFor="order-code"
                    className="font-mono text-[11px] uppercase tracking-[1px] text-text-dim block mb-2"
                  >
                    Order Number or Claim Code
                  </label>
                  <input
                    id="order-code"
                    type="text"
                    placeholder="e.g. REUSE-2025-001"
                    value={orderCode}
                    onChange={(e) => setOrderCode(e.target.value)}
                    className="w-full px-4 py-3 bg-bg-card border border-border-subtle rounded-button text-sm text-text-primary placeholder:text-text-dim focus:outline-none focus:border-accent-blue/40 transition-colors"
                  />
                </div>

                {/* Item selector */}
                <div>
                  <label
                    htmlFor="item-select"
                    className="font-mono text-[11px] uppercase tracking-[1px] text-text-dim block mb-2"
                  >
                    Which item did you buy?
                  </label>
                  <div className="relative">
                    <select
                      id="item-select"
                      value={selectedItem}
                      onChange={(e) =>
                        setSelectedItem(Number(e.target.value))
                      }
                      className="appearance-none w-full px-4 py-3 pr-10 bg-bg-card border border-border-subtle rounded-button text-sm text-text-primary focus:outline-none focus:border-accent-blue/40 transition-colors cursor-pointer"
                    >
                      {claimItemOptions.map((opt, i) => (
                        <option key={opt.label} value={i}>
                          {opt.label} — {opt.tier.name} Tier ({opt.tier.boost})
                        </option>
                      ))}
                    </select>
                    <ChevronDown
                      size={14}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-text-dim pointer-events-none"
                    />
                  </div>
                </div>

                {/* Tier preview */}
                <div className="bg-bg-primary rounded-card p-4 text-center">
                  <span className="text-4xl block mb-2">
                    {currentTier.emoji}
                  </span>
                  <p className="font-serif italic text-xl text-text-primary">
                    {currentTier.name} Tier
                  </p>
                  <p className="font-mono text-accent-blue text-lg font-bold">
                    {currentTier.multiplier}
                  </p>
                  <p className="font-mono text-xs text-text-muted mt-1">
                    {currentTier.boost} reward multiplier
                  </p>
                </div>

                {/* Divider */}
                <div className="h-px bg-border-subtle" />

                {/* Connect wallet */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <motion.button
                    onClick={handleConnect}
                    whileTap={{ scale: 0.97 }}
                    disabled={walletConnected}
                    className={`flex-1 flex items-center justify-center gap-2 px-5 py-3 rounded-button font-medium text-sm transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-blue ${
                      walletConnected
                        ? "bg-accent-green/10 border border-accent-green/30 text-accent-green cursor-default"
                        : "bg-bg-card border border-border-subtle text-text-muted hover:text-text-primary hover:border-accent-blue/30"
                    }`}
                  >
                    {walletConnected ? (
                      <>
                        <CheckCircle size={16} />
                        Wallet Connected
                      </>
                    ) : (
                      <>
                        <Wallet size={16} />
                        Connect Wallet
                      </>
                    )}
                  </motion.button>

                  <motion.div className="flex-1" whileTap={{ scale: 0.97 }}>
                    <Button
                      size="lg"
                      className="w-full"
                      onClick={handleClaim}
                      disabled={
                        !walletConnected || !orderCode.trim()
                      }
                    >
                      Claim NFT
                    </Button>
                  </motion.div>
                </div>

                {!walletConnected && (
                  <p className="text-xs text-text-dim text-center">
                    Connect your wallet first to enable claiming.{" "}
                    <a
                      href="https://veworld.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-accent-blue hover:underline"
                    >
                      Get VeWorld →
                    </a>
                  </p>
                )}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease }}
              className="text-center py-12"
            >
              {/* Success state */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 20,
                  delay: 0.2,
                }}
                className="text-7xl mb-6 block"
              >
                {currentTier.emoji}
              </motion.div>

              <Badge variant="green" className="mb-4">
                Demo — Claim Successful
              </Badge>

              <h1 className="font-serif italic text-3xl sm:text-4xl text-text-primary mb-4">
                Your {currentTier.name} Supporter NFT is Minted!
              </h1>

              <p className="text-text-muted text-lg max-w-md mx-auto mb-3">
                Your {currentTier.name} tier is now unlocked with a{" "}
                <span className="text-accent-blue font-mono font-bold">
                  {currentTier.multiplier}
                </span>{" "}
                reward multiplier ({currentTier.boost}) in the ReUse dApp.
              </p>

              <p className="text-text-dim text-sm max-w-sm mx-auto mb-8">
                This is a prototype demo. In v1.1, this will mint a real NFT to
                your VeChain wallet.
              </p>

              <div className="glass p-5 max-w-sm mx-auto mb-8">
                <div className="space-y-2 text-sm text-text-muted">
                  <div className="flex justify-between">
                    <span>Order</span>
                    <span className="font-mono text-text-primary">
                      {orderCode}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Item</span>
                    <span className="font-mono text-text-primary">
                      {claimItemOptions[selectedItem].label}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tier</span>
                    <span className="font-mono text-text-primary">
                      {currentTier.emoji} {currentTier.name}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Boost</span>
                    <span className="font-mono text-accent-blue">
                      {currentTier.boost}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap justify-center gap-4">
                <Link href="/shop">
                  <Button size="lg">Continue Shopping</Button>
                </Link>
                <a
                  href="https://reuse.vet/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button variant="secondary" size="lg">
                    Open ReUse dApp
                  </Button>
                </a>
              </div>

              <button
                onClick={() => {
                  setStep("form");
                  setOrderCode("");
                  setWalletConnected(false);
                }}
                className="mt-6 text-sm text-text-dim hover:text-text-muted transition-colors"
              >
                ← Claim another NFT
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
