"use client";

import { motion, useMotionValue, useTransform, animate, type Variants } from "framer-motion";
import { ReactNode } from "react";

const ease = [0.16, 1, 0.3, 1] as [number, number, number, number];

// Scroll-triggered fade-up reveal
export function RevealOnScroll({
  children,
  className = "",
  delay = 0,
  width = "100%",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  width?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, ease, delay }}
      className={className}
      style={{ width }}
    >
      {children}
    </motion.div>
  );
}

// Staggered container for grids
export function StaggerContainer({
  children,
  className = "",
  staggerDelay = 0.1,
}: {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
}) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: staggerDelay } },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Stagger item (child of StaggerContainer)
export function StaggerItem({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const item: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease } },
  };

  return (
    <motion.div variants={item} className={className}>
      {children}
    </motion.div>
  );
}

// Count-up animation for stats
export function CountUp({
  target,
  suffix = "",
  className = "",
}: {
  target: string;
  suffix?: string;
  className?: string;
}) {
  // Extract numeric part and any prefix/suffix from the target string
  const numMatch = target.match(/([^\d]*)(\d[\d,.]*)(.*)/);
  if (!numMatch) {
    return <span className={className}>{target}</span>;
  }

  const prefix = numMatch[1];
  const numStr = numMatch[2];
  const trailingSuffix = numMatch[3] + suffix;
  const hasDecimal = numStr.includes(".");
  const hasComma = numStr.includes(",");
  const cleanNum = parseFloat(numStr.replace(/,/g, ""));

  return (
    <motion.span
      className={className}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
    >
      <CountUpNumber
        value={cleanNum}
        prefix={prefix}
        suffix={trailingSuffix}
        hasDecimal={hasDecimal}
        hasComma={hasComma}
      />
    </motion.span>
  );
}

function CountUpNumber({
  value,
  prefix,
  suffix,
  hasDecimal,
  hasComma,
}: {
  value: number;
  prefix: string;
  suffix: string;
  hasDecimal: boolean;
  hasComma: boolean;
}) {
  return (
    <motion.span
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={{
        hidden: {},
        visible: {},
      }}
    >
      {prefix}
      <motion.span
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1 },
        }}
        transition={{ duration: 0.5 }}
      >
        <AnimatedNumber
          value={value}
          hasDecimal={hasDecimal}
          hasComma={hasComma}
        />
      </motion.span>
      {suffix}
    </motion.span>
  );
}

function AnimatedNumber({
  value,
  hasDecimal,
  hasComma,
}: {
  value: number;
  hasDecimal: boolean;
  hasComma: boolean;
}) {
  const springValue = useMotionValue(0);
  const display = useTransform(springValue, (v: number) => {
    const formatted = hasDecimal ? v.toFixed(1) : Math.round(v).toString();
    if (hasComma) {
      const parts = formatted.split(".");
      parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      return parts.join(".");
    }
    return formatted;
  });

  return (
    <motion.span
      initial={{ opacity: 0 }}
      whileInView={{
        opacity: 1,
      }}
      viewport={{ once: true }}
      onViewportEnter={() => {
        animate(springValue, value, {
          duration: 2,
          ease: "easeOut",
        });
      }}
    >
      <motion.span>{display}</motion.span>
    </motion.span>
  );
}
