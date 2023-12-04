/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./(app|src)/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: '#1f53a6',

          secondary: '#ffffff',

          accent: '#d4f8de',

          neutral: '#ffffff',

          'base-100': '#fff',

          info: 'lightblue',

          success: '#319060',

          warning: 'yellow',

          error: 'red',
        },
      },
    ],
    darkTheme: 'dark', // name of one of the included themes for dark mode
    base: false, // applies background color and foreground color for root element by default
    styled: true, // include daisyUI colors and design decisions for all components
    utils: true, // adds responsive and modifier utility classes
    prefix: '', // prefix for daisyUI classnames (components, modifiers and responsive class names. Not colors)
    logs: false, // Shows info about daisyUI version and used config in the console when building your CSS
    themeRoot: ':root', //
  },
  plugins: [require('daisyui')],
  corePlugins: {
    preflight: false,
  },
};
