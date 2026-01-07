/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Montserrat", "sans-serif"],
        serif: ["Merriweather", "serif"],
        montserrat: ["Montserrat", "sans-serif"],
      },
      colors: {
        "text-primary": "#1E1E1E",
        "text-secondary": "#4A4A4A",
        "accent-gold": "#8a754e",
      },
    },
  },
  plugins: [],
};
