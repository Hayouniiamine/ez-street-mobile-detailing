/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#0d0d0d',
        brand: '#d10000',
        'brand-dark': '#a30000',
        muted: '#5c5c5c',
        mist: '#f5f5f5',
        rule: '#e0e0e0',
        'ink-soft': '#1a1a1a',
        'ink-line': '#2a2a2a',
      },
      fontFamily: {
        display: ['"Bebas Neue"', 'Oswald', 'Impact', 'sans-serif'],
        alt: ['Oswald', '"Bebas Neue"', 'sans-serif'],
        sans: ['Inter', 'system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
      },
      boxShadow: {
        card: '0 4px 20px rgba(0,0,0,0.08)',
        lift: '0 18px 44px rgba(0,0,0,0.16)',
        pill: '0 2px 12px rgba(0,0,0,0.10)',
      },
      maxWidth: {
        shell: '1240px',
      },
      transitionTimingFunction: {
        smooth: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
    },
  },
  plugins: [],
}
