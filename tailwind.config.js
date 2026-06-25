/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js}'],
  theme: {
    extend: {
      dropShadow: {
        bloom: '0px 0px 172px rgba(255, 255, 255, 0.25)',
      },
      fontFamily: {
        sans: ['Montserrat', 'sans-serif'],
        tech: ['Tech', 'Montserrat', 'sans-serif'],
      },
      height: {
        h1: '3.5rem',
      },
      // Colors are sourced from the CSS custom properties in src/index.css so
      // there is a single source of truth for the palette.
      colors: {
        primary: 'var(--bg-color-primary)',
        secondary: 'var(--bg-color-secondary)',
        important: 'var(--important)',
        body: 'var(--body)',
        border: 'var(--border)',
        'border-dark': 'var(--border-dark)',
      },
      fontSize: {
        h1: '3.5rem',
        h2: '3rem',
        h3: '2.145rem',
        h4: '1.5rem',
        'text-large': '1.6rem',
        'text-medium': '1.275rem',
        'text-small': '1.125rem',
      },
      borderRadius: {
        button: '0.5rem',
      },
      // Spacing references the gutter custom properties in src/index.css.
      spacing: {
        'gutter-nano': 'var(--gutter-nano)',
        'gutter-micro': 'var(--gutter-micro)',
        'gutter-x-small': 'var(--gutter-x-small)',
        'gutter-small': 'var(--gutter-small)',
        'gutter-medium': 'var(--gutter-medium)',
        'gutter-large': 'var(--gutter-large)',
        'gutter-x-large': 'var(--gutter-x-large)',
        'gutter-huge': 'var(--gutter-huge)',
        'gutter-x-huge': 'var(--gutter-x-huge)',
      },
    },
  },
  plugins: [],
};
