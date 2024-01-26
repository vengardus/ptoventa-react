/** @type {import('tailwindcss').Config} */
/* import colors from 'tailwindcss/colors' */

export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    darkMode: "class",
    theme: {
        extend: {
            colors: {
                bgTemplate: {
                    light: "#e5e5e5",
                    dark: "#262626",
                },
                textTemplate: {
                    light: "#262626",
                    dark: "#d4d4d4",
                },

                textTable: {
                  light: '#404040',
                  dark: '#d4d4d4'
                },
                textTableHead: {
                  light: '#404040',
                  dark: '#262626'
                },
                bgTableHead: {
                  light: '#f5f5f5',
                  dark: '#a3a3a3'
                },
                bgTableRowOdd: {
                  light: '#f5f5f5',
                  dark: '#18181b'
                },
                bgTableRowEven: {
                  light: '#f5f5f5',
                  dark: '#404040'
                },

                
                
            },
        },
    },
    plugins: [],
};
