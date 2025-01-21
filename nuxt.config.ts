// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      // because of nuxt-seo, somehow the 'script' is not recognizable
      // @ts-ignore
      script: [{ src: 'https://kit.fontawesome.com/7db26f83a2.js', crossorigin: 'anonymous' }]
    }
  },
  nitro: {
    experimental: {
      tasks: true
    },
    scheduledTasks: {
      '0 */6 * * *': ['analytics:up'],
      '* * * * *': ['analytics:sync'],
    },
  },
  build: {
    transpile: ['vue-toastification']
  },
  devtools: { enabled: true },
  modules: ['@nuxt/content', '@nuxtjs/color-mode', ['@nuxtjs/google-fonts', {
    families: {
      Inter: '100..900'
    }
  }], 'nuxt-time', 'nuxt-auth-utils', '@nuxt-alt/markdown-it', '@nuxtjs/seo', '@pinia/nuxt'],

  routeRules: {
    '/': { isr: 60 }
  },
  css: ['~/assets/css/main.css'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {}
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

  compatibilityDate: '2024-12-22',
  site: {
    url: 'https://solofounders.xyz',
    name: 'Solofounders',
    description: 'The largest platform for indie hackers and solo entrepreneurs creating digital products. Share your journey, discover lifehacks, explore success stories, and connect with a community of creators building innovative SaaS and digital solutions.',
    defaultLocale: 'en', // not needed if you have @nuxtjs/i18n installed
  }
})