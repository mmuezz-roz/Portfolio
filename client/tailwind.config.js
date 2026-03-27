/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        surface: {
          DEFAULT: "#ffffff",
          raised: "#f8fafc",
          card: "#f1f5f9",
          border: "rgba(15, 23, 42, 0.1)",
          muted: "#f1f5f9",
        },
        accent: {
          DEFAULT: "#2563eb",
          lime: "#2563eb",
          dim: "#64748b",
        },
      },
      fontFamily: {
        display: ["Syne", "system-ui", "sans-serif"],
        sans: ["DM Sans", "system-ui", "sans-serif"],
        mega: ["Bebas Neue", "Impact", "Arial Narrow", "sans-serif"],
        /** Bold display for hero (Inter primary, Poppins fallback — Satoshi-like pairing) */
        hero: ["Inter", "Poppins", "system-ui", "sans-serif"],
      },
      fontSize: {
        "display-xl": ["clamp(2.75rem,6vw,4.25rem)", { lineHeight: "1.05", letterSpacing: "-0.03em" }],
      },
      backgroundImage: {
        "hero-mesh": "none",
        noise: "none",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      animation: {
        float: "float 7s ease-in-out infinite",
        marquee: "marquee 48s linear infinite",
      },
      maxWidth: {
        content: "90rem",
      },
    },
  },
  plugins: [],
};
