interface NFTTierCardProps {
  name: string;
  emoji: string;
  multiplier: string;
  requirement: string;
  color: string;
  benefits: string[];
  featured?: boolean;
}

export function NFTTierCard({
  name,
  emoji,
  multiplier,
  requirement,
  benefits,
  featured = false,
}: NFTTierCardProps) {
  return (
    <div
      className={`relative bg-bg-card border rounded-card p-6 sm:p-8 transition-all duration-[400ms] ease-smooth hover:-translate-y-[5px] hover:shadow-card-hover ${
        featured
          ? "border-accent-purple/40 bg-gradient-card-glow"
          : "border-border-subtle hover:border-accent-blue/20"
      }`}
    >
      {featured && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <span className="bg-gradient-button text-white text-[10px] font-mono font-bold uppercase tracking-[1px] px-3 py-1 rounded-full">
            Most Popular
          </span>
        </div>
      )}

      <div className="text-center">
        <span className="text-5xl block mb-4">{emoji}</span>
        <h3 className="font-serif italic text-2xl text-text-primary mb-1">
          {name}
        </h3>
        <span className="font-mono text-3xl font-bold text-accent-blue">
          {multiplier}
        </span>
        <span className="block font-mono text-[11px] text-text-muted mt-1 uppercase tracking-[1px]">
          Reward Multiplier
        </span>
      </div>

      <div className="mt-6 mb-6 h-px bg-border-subtle" />

      <p className="text-center font-mono text-xs text-accent-purple mb-4">
        {requirement}
      </p>

      <ul className="space-y-2.5">
        {benefits.map((benefit) => (
          <li
            key={benefit}
            className="flex items-start gap-2 text-sm text-text-muted"
          >
            <span className="text-accent-green mt-0.5 shrink-0">&#10003;</span>
            {benefit}
          </li>
        ))}
      </ul>
    </div>
  );
}
