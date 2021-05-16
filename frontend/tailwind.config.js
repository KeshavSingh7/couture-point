module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors : {
        custom : {
          shade1: '#E1E5F2',
          shade2: '#BFDBF7',
          shade3: '#1F7A8C',
          shade4: '#022B3A',
        }
      },

      fontFamily: {
        custom1 : 'Glamor',
        custom2 : 'Vollkron'
      },

      screens: {
        'xs': {'max': '639px'}
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require('tailwind-bootstrap-grid')()],
};
