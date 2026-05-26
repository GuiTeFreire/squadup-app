/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        // Primary — Electric Blue (brand, CTAs, interactive elements)
        primary: {
          50:  "#EFF6FF",
          100: "#DBEAFE",
          200: "#BFDBFE",
          300: "#93C5FD",
          400: "#60A5FA",
          500: "#2563EB", // main brand
          600: "#1D4ED8", // active/pressed
          700: "#1E40AF",
          800: "#1E3A8A",
          900: "#1E2D5A",
        },
        // Secondary — Dark Slate (surfaces, headers, navigation — 30% rule)
        secondary: {
          50:  "#F8FAFC",
          100: "#F1F5F9",
          200: "#E2E8F0",
          300: "#CBD5E1",
          400: "#94A3B8",
          500: "#64748B",
          600: "#475569",
          700: "#334155",
          800: "#1E293B",
          900: "#0F172A",
        },
        // Accent — Energetic Orange (highlights, energy badges — blue+orange is a classic sports combo)
        accent: {
          50:  "#FFF7ED",
          100: "#FFEDD5",
          200: "#FED7AA",
          300: "#FDBA74",
          400: "#FB923C",
          500: "#F97316", // main
          600: "#EA580C",
          700: "#C2410C",
          800: "#9A3412",
          900: "#7C2D12",
        },
        // Neutrals
        neutral: {
          50:  "#F9FAFB",
          100: "#F3F4F6",
          200: "#E5E7EB",
          300: "#D1D5DB",
          400: "#9CA3AF",
          500: "#6B7280",
          600: "#4B5563",
          700: "#374151",
          800: "#1F2937",
          900: "#111827",
        },
        // Semantic
        success: "#22C55E",
        warning: "#F59E0B",
        error:   "#EF4444",
        info:    "#2563EB",
      },
      fontFamily: {
        sans:   ["System"],
        mono:   ["Courier"],
      },
      fontSize: {
        xs:   ["12px", { lineHeight: "16px" }],
        sm:   ["14px", { lineHeight: "20px" }],
        base: ["16px", { lineHeight: "24px" }],
        lg:   ["18px", { lineHeight: "28px" }],
        xl:   ["20px", { lineHeight: "28px" }],
        "2xl":["24px", { lineHeight: "32px" }],
        "3xl":["30px", { lineHeight: "36px" }],
        "4xl":["36px", { lineHeight: "40px" }],
      },
      spacing: {
        px: "1px",
        0:  "0px",
        1:  "4px",
        2:  "8px",
        3:  "12px",
        4:  "16px",
        5:  "20px",
        6:  "24px",
        7:  "28px",
        8:  "32px",
        10: "40px",
        12: "48px",
        14: "56px",
        16: "64px",
        20: "80px",
        24: "96px",
      },
      borderRadius: {
        none: "0px",
        sm:   "4px",
        DEFAULT: "8px",
        md:   "8px",
        lg:   "12px",
        xl:   "16px",
        "2xl":"24px",
        full: "9999px",
      },
    },
  },
  plugins: [],
};
