/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#0B0F19',
        card: '#1A2234',
        primary: '#3B82F6',
        primaryHover: '#2563EB',
        accent: '#F59E0B',
      }
    },
  },
  plugins: [],
}
