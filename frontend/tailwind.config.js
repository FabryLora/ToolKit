/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                primary: "#252422",
                "primary-dark": "#1d1d1b",
                secondary: "#EB5E28",
                "transparen-black": "rgba(0, 0, 0, 0.5)",
            },
            fontFamily: {
                geologica: ["Geologica", "sans-serif"],
            },
        },
    },
    plugins: [],
};
