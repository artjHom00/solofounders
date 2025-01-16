import { defineNuxtPlugin } from '#app'
import Toast, { POSITION } from 'vue-toastification'
// Import the CSS or use your own!
import 'vue-toastification/dist/index.css'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(Toast, {
    position: POSITION.BOTTOM_RIGHT,
    transition: 'Vue-Toastification__fade'
  })
})
