/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
        "./*.html"
    ],
    theme: {
        fontSize: {
            sm: '0.8rem',
            base: '.9rem',
            xl: '1.25rem',
            '2xl': '1.563rem',
            '3xl': '1.953rem',
            '4xl': '2.441rem',
            '5xl': '3.052rem',
        },
        extend: {
            fontFamily: {
                'lato': ['Lato', 'sans-serif']
            }
        },
    },
    plugins: [

    ],
}
