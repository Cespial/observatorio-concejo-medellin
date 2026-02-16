import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
        // Institutional palette
        institucional: {
          50: "#EFF3F7",
          100: "#D4DDE8",
          200: "#A9BBD1",
          300: "#7E99BA",
          400: "#5377A3",
          500: "#1B3A5C",
          600: "#163050",
          700: "#112643",
          800: "#0C1C37",
          900: "#07122A",
          DEFAULT: "#1B3A5C",
        },
        dorado: {
          50: "#FBF7EC",
          100: "#F5EBD0",
          200: "#ECD7A1",
          300: "#E2C372",
          400: "#D9AF43",
          500: "#C9A94E",
          600: "#A68A3E",
          700: "#836B2F",
          800: "#604C1F",
          900: "#3D2D10",
          DEFAULT: "#C9A94E",
        },
        naranja: {
          50: "#FDF0EB",
          100: "#FADACE",
          200: "#F5B59D",
          300: "#F0906C",
          400: "#EC7A4C",
          500: "#E8632B",
          600: "#C95222",
          700: "#A14119",
          800: "#793110",
          900: "#512007",
          DEFAULT: "#E8632B",
        },
        fondo: "#FAFBFC",
        // Semantic
        positivo: "#16A34A",
        negativo: "#DC2626",
        advertencia: "#F59E0B",
        // Thematic line colors
        tematica: {
          seguridad: "#DC2626",
          educacion: "#2563EB",
          economia: "#16A34A",
          movilidad: "#7C3AED",
          ambiente: "#059669",
          salud: "#EA580C",
        },
      },
      fontFamily: {
        serif: ["var(--font-source-serif)", "Georgia", "serif"],
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "ticker-scroll": {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "counter-up": {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "ticker-scroll": "ticker-scroll 30s linear infinite",
        "fade-up": "fade-up 0.6s ease-out forwards",
        "counter-up": "counter-up 0.4s ease-out forwards",
      },
      boxShadow: {
        "card-hover": "0 8px 30px rgba(27, 58, 92, 0.12)",
        "glow-gold": "0 0 20px rgba(201, 169, 78, 0.3)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
