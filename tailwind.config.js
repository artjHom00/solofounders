/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './app.vue',
    './error.vue'
  ],
  theme: {
    extend: {
      colors: {
        primary: '#52CA72',
        alert: '#CA5252',
        dark: '#212121',
        light: '#f2f2f2',
        "light-secondary": '#fafafa',
        "dark-secondary": '#262626',
      }
    }
  },
  darkMode: 'class',
  plugins: [
    require('daisyui'),
  ],
  daisyui: {
    themes: [
      {
        light: {
          primary: "#52CA72", // Set your custom primary color here (e.g., a shade of blue)
          secondary: "#2F2F2F",
          neutral: "#F6F6F6",
          error: "#CA5252",
          "base-100": "#FFFFFF",
        },
      },
    ],
  },
}
