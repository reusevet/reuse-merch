import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          primary: "#0f1320",
          secondary: "#111b2e",
          card: "rgba(255,255,255,0.03)",
          "card-hover": "rgba(255,255,255,0.045)",
          input: "rgba(255,255,255,0.04)",
        },
        accent: {
          blue: "#5B8DEF",
          purple: "#7B5BEF",
          green: "#4CAF50",
          "green-bright": "#66BB6A",
        },
        text: {
          primary: "#e8e4de",
          muted: "rgba(232,228,222,0.45)",
          dim: "rgba(232,228,222,0.25)",
        },
        border: {
          subtle: "rgba(255,255,255,0.06)",
          accent: "rgba(91,141,239,0.15)",
          purple: "rgba(123,91,239,0.3)",
        },
      },
      fontFamily: {
        sans: ["var(--font-nunito)", "SF Pro Display", "-apple-system", "sans-serif"],
        serif: ["var(--font-instrument-serif)", "serif"],
        mono: ["var(--font-jetbrains-mono)", "monospace"],
      },
      borderRadius: {
        card: "20px",
        button: "14px",
        badge: "8px",
        glass: "16px",
      },
      boxShadow: {
        "card-hover": "0 20px 50px rgba(91,141,239,0.08)",
        button: "0 8px 32px rgba(91,141,239,0.30)",
      },
      backgroundImage: {
        "gradient-hero": "linear-gradient(180deg, #0f1320 0%, #0d1525 40%, #111b2e 100%)",
        "gradient-button": "linear-gradient(135deg, #5B8DEF, #7B5BEF)",
        "gradient-card-glow": "linear-gradient(135deg, rgba(91,141,239,0.06), rgba(123,91,239,0.04))",
        "gradient-text-accent": "linear-gradient(135deg, #5B8DEF, #4CAF50)",
      },
      transitionTimingFunction: {
        smooth: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-15px)" },
        },
      },
      animation: {
        "fade-up": "fade-up 1s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        float: "float 4s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
export default config;
