/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontSize: {
        mammoth: ['16rem', { lineHeight: '1' }]
      },
      fontFamily: {
        body: ['League Spartan']
      },
      colors: {
        primary: '#5ba4a4',
        body: '#effafa',
        filter: '#eef6f6',
        darkCyan: '	#7b8e8e',
        veryDarkCyan: '#2c3a3a',
      },
      backgroundImage: {
        'header-sm': "url('../public/images/bg-header-mobile.svg')",
        'header-lg': "url('../public/images/bg-header-desktop.svg')",
      }
    },
  },
  plugins: [],
}
