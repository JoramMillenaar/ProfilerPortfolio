/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js}"
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Montserrat', 'sans-serif'],
        tech: ['Tech', 'Montserrat', 'sans-serif'],
      },
      colors: {
        'primary': '#1b1b1b',
        'secondary': '#202020',
        'important': '#f0f5ff',
        'body': '#cbcbcb',
        'border': '#62626234',
        'border-dark': '#5e5e5e1f',
      },
      fontSize: {
        'h1': '3.5rem',
        'h2': '3rem',
        'h3': '2.145rem',
        'h4': '1.5rem',
        'text-large': '1.6rem',
        'text-medium': '1.275rem',
        'text-small': '1.125rem',
      },
      borderRadius: {
        'button': '0.5rem',
      },
      spacing: {
        'gutter-nano': '0.5rem',
        'gutter-small': '2rem',
        'gutter-medium': '2.5rem',
        'gutter-large': '3rem',
      },
    },
    plugins: [],
  }
}
