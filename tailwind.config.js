/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'fitness-purple': '#8B5CF6',
        'fitness-purple-light': '#C4B5FD',
        'fitness-gray': '#F3F4F6',
        'fitness-dark-gray': '#1F2937',
        'fitness-navy': '#111827',
      },
    },
  },
  plugins: [],
}; 