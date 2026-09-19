/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          void: "#05070D",
          bg: "#0A0F1C",
          surface: "rgba(10, 15, 28, 0.85)",
          card: "rgba(16, 26, 48, 0.75)",
          border: "rgba(56, 130, 246, 0.25)",
          borderCyan: "rgba(0, 229, 255, 0.35)",
        },
        energy: {
          blue: "#3862F6",
          cyan: "#00E5FF",
          purple: "#8B5CF6",
          navy: "#182A4D",
        }
      },
      boxShadow: {
        'cyan-glow': '0 0 20px rgba(0, 229, 255, 0.35)',
        'blue-glow': '0 0 25px rgba(56, 98, 246, 0.4)',
        'purple-glow': '0 0 25px rgba(139, 92, 246, 0.4)',
        'hologram': '0 8px 32px 0 rgba(0, 229, 255, 0.15)',
      },
      animation: {
        'pulse-glow': 'pulseGlow 2.5s ease-in-out infinite',
        'float': 'float 4s ease-in-out infinite',
        'spin-slow': 'spin 20s linear infinite',
      },
      keyframes: {
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 15px rgba(0, 229, 255, 0.2)' },
          '50%': { boxShadow: '0 0 30px rgba(0, 229, 255, 0.6)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      }
    },
  },
  plugins: [],
}
