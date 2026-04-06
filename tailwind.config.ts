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
        bordeaux: {
          50: '#fdf2f3',
          100: '#fce7e9',
          200: '#f9d0d4',
          300: '#f4a9b1',
          400: '#ec7a87',
          500: '#df4d60',
          600: '#c42d44',
          700: '#8B2635',
          800: '#77212e',
          900: '#66202c',
          950: '#390d14',
        },
        creme: {
          DEFAULT: '#F9F4EE',
          50: '#FDFBF9',
          100: '#F9F4EE',
          200: '#F0E6D8',
          300: '#E5D4BC',
        },
        accent: {
          DEFAULT: '#C47A1E',
          50: '#FEF7EC',
          100: '#FDE9C8',
          200: '#FAD08D',
          300: '#F5B04E',
          400: '#E89520',
          500: '#C47A1E',
          600: '#A85C14',
          700: '#884114',
          800: '#6F3417',
          900: '#5E2C16',
        },
      },
      fontFamily: {
        serif: ['Georgia', 'serif'],
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['Courier New', 'monospace'],
      },
    },
  },
  plugins: [],
};
export default config;
