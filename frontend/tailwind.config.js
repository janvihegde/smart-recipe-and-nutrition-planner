/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./index.html",
        "./src/**/*.{js,jsx,ts,tsx}",
    ],
    darkMode: "class", // enable dark mode using class strategy
    theme: {
        extend: {
            colors: {
                primary: {
                    50: '#EEF2FF', // Lightest indigo shade
                    100: '#E0E7FF',
                    200: '#C7D2FE',
                    400: '#818CF8',
                    500: '#6366F1', // Indigo (Used as main button/highlight)
                    600: '#4F46E5', // Your base Indigo
                    700: '#4338CA',
                    800: '#3730A3',
                    900: '#312E81',
                },
                secondary: {
                    400: '#A78BFA', // Lighter version of secondary
                    500: '#7C3AED', // Your secondary purple
                    600: '#6D28D9',
                },
                glass: "rgba(255, 255, 255, 0.15)",
            },
            backdropBlur: {
                xs: "2px",
            },
            animation: {
                fadeIn: "fadeIn 0.6s ease-in-out",
                slideIn: "slideIn 0.5s ease",
                wiggle: "wiggle 0.7s ease-in-out infinite",
            },
            keyframes: {
                fadeIn: {
                    "0%": { opacity: 0 },
                    "100%": { opacity: 1 },
                },
                slideIn: {
                    "0%": { transform: "translateX(-10px)", opacity: 0 },
                    "100%": { transform: "translateX(0)", opacity: 1 },
                },
                wiggle: {
                    "0%, 100%": { transform: "rotate(-3deg)" },
                    "50%": { transform: "rotate(3deg)" },
                },
            },
        },
    },
    plugins: [
        require("@tailwindcss/forms"),
        require("@tailwindcss/typography"),
    ],
};