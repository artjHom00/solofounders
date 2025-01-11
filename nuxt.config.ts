// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      script: [{ src: 'https://kit.fontawesome.com/7db26f83a2.js', crossorigin: 'anonymous' }]
    },
  },
  devtools: { enabled: true },
  modules: ['@nuxt/content', '@nuxtjs/color-mode', ['@nuxtjs/google-fonts', {
    families: {
      Inter: '100..900'
    }
  }], 'nuxt-time', 'nuxt-auth-utils', '@nuxt-alt/markdown-it'],

  routeRules: {
    '/': { isr: 60 }
  },
  css: ['~/assets/css/main.css'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    }
  },

  colorMode: {
    classSuffix: '',
    preference: 'system',
    fallback: 'light'
  },
  markdownit: {
    runtime: true // Support `$md()`
  },

  compatibilityDate: '2024-12-22'
})
