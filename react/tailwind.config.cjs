/** @type {import('tailwindcss').Config} */

const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
        "./*.html"
    ],
    theme: {
        fontSize: {
            xxs: '0.6rem',
            xs: '0.75rem',
            sm: '0.875rem',
            base: '1rem',
            lg: '1.105rem',
            xl: '1.25rem',
            '2xl': '1.563rem',
            '3xl': '1.953rem',
            '4xl': '2.441rem',
            '5xl': '3.052rem',
        },
        extend: {
            fontFamily: {
                poppins: ["Poppins",  ...defaultTheme.fontFamily.sans]
            }
        },
    },
    plugins: [

    ],
}
