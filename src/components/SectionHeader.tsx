interface SectionHeaderProps {
  label: string;
  heading: string;
  description?: string;
  className?: string;
  align?: "left" | "center";
}

export function SectionHeader({
  label,
  heading,
  description,
  className = "",
  align = "center",
}: SectionHeaderProps) {
  const alignment = align === "center" ? "text-center" : "text-left";

  return (
    <div className={`${alignment} ${className}`}>
      <span className="font-mono text-[11px] font-medium uppercase tracking-[2px] text-accent-blue">
        {label}
      </span>
      <h2 className="font-serif italic text-[clamp(30px,4.5vw,48px)] text-text-primary mt-3 mb-4">
        {heading}
      </h2>
      {description && (
        <p className="text-text-muted text-[17px] max-w-2xl mx-auto leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
}
