/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        // Primary — energetic green (sport/action)
        primary: {
          50:  "#e8faf0",
          100: "#c6f2d9",
          200: "#90e6b3",
          300: "#52d68a",
          400: "#22c468",
          500: "#16a34a", // main brand
          600: "#15803d",
          700: "#166534",
          800: "#14532d",
          900: "#052e16",
        },
        // Secondary — deep navy (trust/reliability)
        secondary: {
          50:  "#eff6ff",
          100: "#dbeafe",
          200: "#bfdbfe",
          300: "#93c5fd",
          400: "#60a5fa",
          500: "#1d4ed8", // main
          600: "#1e40af",
          700: "#1e3a8a",
          800: "#1e3066",
          900: "#172554",
        },
        // Accent — vibrant orange (energy/highlights)
        accent: {
          50:  "#fff7ed",
          100: "#ffedd5",
          200: "#fed7aa",
          300: "#fdba74",
          400: "#fb923c",
          500: "#f97316", // main
          600: "#ea580c",
          700: "#c2410c",
          800: "#9a3412",
          900: "#7c2d12",
        },
        // Neutrals
        neutral: {
          50:  "#f9fafb",
          100: "#f3f4f6",
          200: "#e5e7eb",
          300: "#d1d5db",
          400: "#9ca3af",
          500: "#6b7280",
          600: "#4b5563",
          700: "#374151",
          800: "#1f2937",
          900: "#111827",
        },
        // Semantic
        success: "#16a34a",
        warning: "#f59e0b",
        error:   "#dc2626",
        info:    "#0284c7",
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
        // 4pt grid base
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
