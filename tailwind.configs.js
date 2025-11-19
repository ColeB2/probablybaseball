/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: "selector",
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'gradient-conic':
                'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
            },
            colors: {
                'customGray': '#D6DBDC',
                'noteBlack': '#000000',
                'customBlack': '#000000',
                'customWhite': '#FFFFFF',
                'customRed': '#FF0000',
                'customMenuBlue': '#1967D2',
                'customDark1': '#262626',
                'customDark2': '#333333',
                'customDark3': '#4f4f4f',
                'customDark4': '#6B6B6B',
                // 'customLight1': '#E8E8E8',
                // 'customLight2': '#F2F2F2',
                // 'customLight3': '#FFFFFF',
                'customLight1': '#D6DBDC', // primary color
                'customLight2': '#E1E4E5', // secondary color
                'customLight3': '#ECF0F1', // tertiary color
                
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif']
            },
        },
    },
    // darkMode: 'selector',
    plugins: [],
}