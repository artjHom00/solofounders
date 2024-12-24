// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      script: [{ src: "https://kit.fontawesome.com/7db26f83a2.js", crossorigin: "anonymous"}]
    }
  },
  devtools: { enabled: true },
  modules: ['@nuxt/content', '@nuxtjs/color-mode', ['@nuxtjs/google-fonts', {
    families: {
      Raleway: '100..900'
    }
  }], 'nuxt-time', 'nuxt-auth-utils'],

  routeRules: {
    '/': { prerender: true }
  },
  css: ['~/assets/css/main.css'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  colorMode: {
    classSuffix: '',
    preference: 'system',
    fallback: 'light'
},

  compatibilityDate: '2024-12-22'
})