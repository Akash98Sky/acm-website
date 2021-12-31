const colors = require('tailwindcss/colors');

module.exports = {
    purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
    darkMode: false, // or 'media' or 'class'
    theme: {
        colors: {
            primary: colors.indigo[500],
            secondary: colors.green[500],
            tertiary: colors.blue[500],
            hover: colors.coolGray,
            ...colors,
        },
        extend: {},
    },
    variants: {
        extend: {},
    },
    plugins: [],
};
