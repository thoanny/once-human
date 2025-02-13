/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './components/**/*.{js,vue,ts}',
        './layouts/**/*.vue',
        './pages/**/*.vue',
        './plugins/**/*.{js,ts}',
        './app.vue',
        './error.vue',
    ],
    theme: {
        extend: {
            gridTemplateColumns: {
                13: 'repeat(13, minmax(0, 1fr))',
                14: 'repeat(14, minmax(0, 1fr))',
                15: 'repeat(15, minmax(0, 1fr))',
                16: 'repeat(16, minmax(0, 1fr))',
            },
        },
    },
    plugins: [require('daisyui')],
    daisyui: {
        themes: ['dark'],
    },
    safelist: [{ pattern: /col-start-[1-7]/ }, { pattern: /col-span-[1-7]/ }],
};
