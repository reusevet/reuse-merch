import { ButtonHTMLAttributes, forwardRef } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
  size?: "sm" | "md" | "lg";
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", size = "md", className = "", children, ...props }, ref) => {
    const base =
      "inline-flex items-center justify-center font-bold uppercase tracking-wider transition-all duration-300 ease-smooth rounded-button disabled:opacity-50 disabled:cursor-not-allowed";

    const variants = {
      primary:
        "bg-gradient-button text-white shadow-button hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]",
      secondary:
        "border-[1.5px] border-accent-blue/40 text-accent-blue bg-transparent hover:bg-accent-blue/10 active:scale-[0.98]",
    };

    const sizes = {
      sm: "px-5 py-2.5 text-xs",
      md: "px-8 py-3.5 text-sm",
      lg: "px-10 py-4 text-sm",
    };

    return (
      <button
        ref={ref}
        className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
