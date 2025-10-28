/** @type {import('tailwindcss').Config} */
export default {
    content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue", 
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./composables/**/*.{js,ts}",
    "./utils/**/*.{js,ts}",
    "./app.vue",
    "./app/**/*.{js,vue,ts}",  
    "./error.vue"
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1E40AF',
        secondary: '#FBBF24',
        accent: '#10B981',
        background: '#F3F4F6',
        textPrimary: '#111827',
        textSecondary: '#6B7280',
      },
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
        sora: ['Sora', 'sans-serif'],
      },

      container: {
        center: true,
        padding: '2rem',
    },
    },
  },
  plugins: [],
}

