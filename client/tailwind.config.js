/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx,vue}",
    ],
    daisyui: {
        themes: [
            {
                mytheme: {
                    primary: "#4f46e5",
                    secondary: "#ffd8be",
                    accent: "#1dcdbc",
                    neutral: "#2b3440",
                    "base-100": "#ffffff",
                    info: "#3abff8",
                    success: "#36d399",
                    warning: "#fbbd23",
                    error: "#f87272",
                },
            },
        ],
    },
    theme: {
        extend: {},
    },
    plugins: [require("@tailwindcss/forms"), require("daisyui")],
}
