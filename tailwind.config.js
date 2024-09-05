/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{html,js,ts,jsx,tsx}"],
    theme: {
        extend: {
            fontFamily: {
                printBold: ['Ubuntu Bold'],
                printMedium: ['Ubuntu Medium'],
                printLigth: ['Ubuntu Light']
            }
        },
    },
    variants: {
        extend: {
            opacity: ['disabled']
        }
    },
    plugins: [],
}

