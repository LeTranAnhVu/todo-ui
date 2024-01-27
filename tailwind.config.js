import colors from 'tailwindcss/colors.js'

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        // Example content paths...
        './public/**/*.html',
        './src/**/*.{js,jsx,ts,tsx,vue}',
        './node_modules/vue-tailwind-datepicker/**/*.js'
    ],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                "vtd-primary": colors.gray, // Light mode Datepicker color
                "vtd-secondary": colors.gray, // Dark mode Datepicker color
            },
        },
    },
    plugins: [
        import('@tailwindcss/forms')
    ]
}
