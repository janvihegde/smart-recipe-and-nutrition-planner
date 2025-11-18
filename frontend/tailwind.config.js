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
                primary: "#4F46E5",      // Indigo
                secondary: "#6366F1",
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
