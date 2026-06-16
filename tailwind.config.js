/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,jsx,ts,tsx}",
    "./src/components/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "lux-black": "#050505",
        "lux-950": "#0a0a0a",
        "lux-900": "#0f0f0f",
        "lux-800": "#111111",
        "lux-700": "#141414",
        "lux-600": "#1a1a1a",
        "lux-500": "#222222",
        "lux-400": "#2a2a2a",
        "lux-300": "#333333",
        "blue": "#00d4ff",
        "blue-dim": "#0066ff",
        "gold": "#c9a227",
        "gold-light": "#f4d03f",
        "silver": "#e8e8e8",
      },
      fontFamily: {
        display: ["Cormorant Garamond", "Georgia", "serif"],
        sans: ["Inter", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "Courier New", "monospace"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      animation: {
        "glow-pulse": "glowPulse 3s ease-in-out infinite",
        float: "float 8s ease-in-out infinite",
        "scan-line": "scanLine 4s linear infinite",
        "fade-in": "fadeIn 1s ease forwards",
      },
      keyframes: {
        glowPulse: {
          "0%, 100%": { opacity: "0.4" },
          "50%": { opacity: "1" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-24px)" },
        },
        scanLine: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100vh)" },
        },
        fadeIn: {
          from: { opacity: "0", transform: "translateY(20px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
      },
      transitionTimingFunction: {
        luxury: "cubic-bezier(0.25, 0.1, 0.25, 1)",
        spring: "cubic-bezier(0.175, 0.885, 0.32, 1.275)",
        "out-expo": "cubic-bezier(0.19, 1, 0.22, 1)",
      },
    },
  },
  plugins: [],
}
