import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
    extend: {
      container: {
        center: true,
        padding: {
          DEFAULT: "1rem",
          sm: "1.5rem",
          lg: "2rem",
          xl: "3rem",
          "2xl": "4rem",
        },
      },
      colors: {
        "bg-primary": "rgb(var(--bg-primary) / <alpha-value>)",
        "bg-secondary": "rgb(var(--bg-secondary) / <alpha-value>)",
        "bg-card": "rgb(var(--bg-card) / <alpha-value>)",
        "bg-elevated": "rgb(var(--bg-elevated) / <alpha-value>)",
        "text-primary": "rgb(var(--text-primary) / <alpha-value>)",
        "text-secondary": "rgb(var(--text-secondary) / <alpha-value>)",
        "text-muted": "rgb(var(--text-muted) / <alpha-value>)",
        "accent-gold": "rgb(var(--accent-gold) / <alpha-value>)",
        "accent-gold-hover": "rgb(var(--accent-gold-hover) / <alpha-value>)",
        "accent-gold-light": "rgb(var(--accent-gold-light) / <alpha-value>)",
        "accent-gold-dark": "rgb(var(--accent-gold-dark) / <alpha-value>)",
        "accent-emerald": "rgb(var(--accent-emerald) / <alpha-value>)",
        "accent-rose": "rgb(var(--accent-rose) / <alpha-value>)",
        "accent-blue": "rgb(var(--accent-blue) / <alpha-value>)",
        border: "rgb(var(--border) / <alpha-value>)",
        "border-hover": "rgb(var(--border-hover) / <alpha-value>)",
        "surface-1": "rgb(var(--surface-1) / <alpha-value>)",
        "surface-2": "rgb(var(--surface-2) / <alpha-value>)",
        "surface-3": "rgb(var(--surface-3) / <alpha-value>)",
      },
      fontFamily: {
        english: ["var(--font-inter)", "var(--font-poppins)", "system-ui", "sans-serif"],
        arabic: ["var(--font-arabic)", "var(--font-arabic-heading)", "system-ui", "sans-serif"],
      },
      fontSize: {
        "display": ["clamp(3rem, 8vw, 6rem)", { lineHeight: "1.05", fontWeight: "900", letterSpacing: "-0.02em" }],
        "h1": ["clamp(2.25rem, 6vw, 4rem)", { lineHeight: "1.1", fontWeight: "800", letterSpacing: "-0.015em" }],
        "h2": ["clamp(1.75rem, 4vw, 3rem)", { lineHeight: "1.15", fontWeight: "700", letterSpacing: "-0.01em" }],
        "h3": ["clamp(1.25rem, 2.5vw, 1.75rem)", { lineHeight: "1.25", fontWeight: "600" }],
        "h4": ["clamp(1.1rem, 1.5vw, 1.35rem)", { lineHeight: "1.35", fontWeight: "600" }],
        "body": ["clamp(0.95rem, 1.1vw, 1.1rem)", { lineHeight: "1.75", fontWeight: "400" }],
        "body-sm": ["clamp(0.85rem, 1vw, 0.95rem)", { lineHeight: "1.7", fontWeight: "400" }],
        "caption": ["clamp(0.75rem, 0.85vw, 0.85rem)", { lineHeight: "1.5", fontWeight: "500" }],
      },
      spacing: {
        18: "4.5rem",
        22: "5.5rem",
        26: "6.5rem",
        30: "7.5rem",
      },
      borderRadius: {
        "2xl": "1rem",
        "3xl": "1.5rem",
        "4xl": "2rem",
      },
      keyframes: {
        shimmer: {
          "0%": { backgroundPosition: "200% 0" },
          "100%": { backgroundPosition: "-200% 0" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" },
        },
        "float-slow": {
          "0%, 100%": { transform: "translateY(0px) rotate(0deg)" },
          "33%": { transform: "translateY(-8px) rotate(1deg)" },
          "66%": { transform: "translateY(4px) rotate(-1deg)" },
        },
        "pulse-gold": {
          "0%, 100%": { boxShadow: "0 0 0 0 rgb(var(--accent-gold) / 0.4)" },
          "50%": { boxShadow: "0 0 0 12px rgb(var(--accent-gold) / 0)" },
        },
        "gradient-shift": {
          "0%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
          "100%": { backgroundPosition: "0% 50%" },
        },
        ripple: {
          "0%": { transform: "scale(0)", opacity: "0.5" },
          "100%": { transform: "scale(4)", opacity: "0" },
        },
        "slide-up": {
          from: { opacity: "0", transform: "translateY(20px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        "scale-in": {
          from: { opacity: "0", transform: "scale(0.95)" },
          to: { opacity: "1", transform: "scale(1)" },
        },
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
        glow: {
          "0%, 100%": { boxShadow: "0 0 20px rgb(var(--accent-gold) / 0.2)" },
          "50%": { boxShadow: "0 0 40px rgb(var(--accent-gold) / 0.4)" },
        },
        "spin-slow": {
          from: { transform: "rotate(0deg)" },
          to: { transform: "rotate(360deg)" },
        },
      },
      animation: {
        shimmer: "shimmer 3s ease-in-out infinite",
        float: "float 4s ease-in-out infinite",
        "float-slow": "float-slow 6s ease-in-out infinite",
        "pulse-gold": "pulse-gold 2s ease-in-out infinite",
        "gradient-shift": "gradient-shift 6s ease infinite",
        ripple: "ripple 0.6s ease-out",
        "slide-up": "slide-up 0.6s ease-out",
        "fade-in": "fade-in 0.5s ease-in-out",
        "scale-in": "scale-in 0.3s ease-out",
        marquee: "marquee 30s linear infinite",
        glow: "glow 2s ease-in-out infinite",
        "spin-slow": "spin-slow 20s linear infinite",
      },
      backgroundImage: {
        "gold-gradient": "linear-gradient(135deg, rgb(var(--accent-gold-light)), rgb(var(--accent-gold)), rgb(var(--accent-gold-dark)))",
        "gold-gradient-r": "linear-gradient(to right, rgb(var(--accent-gold)), rgb(var(--accent-gold-light)))",
        "dark-gradient": "linear-gradient(180deg, rgb(var(--bg-primary)), rgb(var(--bg-secondary)))",
        "radial-gold": "radial-gradient(ellipse at center, rgb(var(--accent-gold) / 0.15), transparent 70%)",
      },
      boxShadow: {
        "gold-sm": "0 2px 12px rgb(var(--accent-gold) / 0.15)",
        "gold-md": "0 4px 24px rgb(var(--accent-gold) / 0.2)",
        "gold-lg": "0 8px 40px rgb(var(--accent-gold) / 0.25)",
        "gold-xl": "0 12px 60px rgb(var(--accent-gold) / 0.3)",
        "card": "0 1px 3px rgb(var(--shadow-color) / 0.04), 0 6px 24px rgb(var(--shadow-color) / 0.06)",
        "card-hover": "0 4px 12px rgb(var(--shadow-color) / 0.06), 0 16px 40px rgb(var(--shadow-color) / 0.1)",
        "elevated": "0 8px 30px rgb(var(--shadow-color) / 0.08), 0 2px 8px rgb(var(--shadow-color) / 0.04)",
      },
    },
  },
  plugins: [],
};
export default config;
