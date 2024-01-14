/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/*.{html,jsx}",
        "./src/**/*.{html,jsx}",
        "./node_modules/flowbite/**/*.js",
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {},
    },
    plugins: [
        require('flowbite/plugin')
    ],
}