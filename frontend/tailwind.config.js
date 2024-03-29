module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
    theme: {
        fontFamily: {
            'cursive': ['cursive']
        },
        minHeight: {
            '0': '0',
            '1/4': '25%',
            '1/2': '50%',
            '3/4': '75%',
            'full': '100%',
        },
        fontSize: {
            'xs': '.70rem',
            'sm': '.80rem',
            'tiny': '.60rem',
            'base': '1rem',
            'lg': '1.125rem',
            'xl': '1.25rem',
            '2xl': '1.5rem',
            '3xl': '1.875rem',
            '4xl': '2.25rem',
            '5xl': '3rem',
            '6xl': '4rem',
            '7xl': '5rem',
        },
        extend: {
            height: theme => ({
                "15/100": "15%",
                "90/100": "90%",
            }),
        },
  },
    variants: {
        width: ["responsive", "hover", "focus"],
        visibility: ['group-hover'],
        extend: {},
  },
  plugins: [require('@tailwindcss/forms')],
}
