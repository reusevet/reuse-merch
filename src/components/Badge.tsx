interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "green" | "blue";
  className?: string;
}

export function Badge({ children, variant = "default", className = "" }: BadgeProps) {
  const variants = {
    default:
      "bg-accent-purple/[0.12] border-accent-purple/25 text-accent-purple",
    green:
      "bg-accent-green/[0.12] border-accent-green/25 text-accent-green",
    blue:
      "bg-accent-blue/[0.12] border-accent-blue/25 text-accent-blue",
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-1 rounded-badge border font-mono text-[10px] font-semibold uppercase tracking-[1px] ${variants[variant]} ${className}`}
    >
      {children}
    </span>
  );
}
