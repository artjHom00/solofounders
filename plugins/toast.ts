import { defineNuxtPlugin } from '#app';
import VueToast from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-sugar.css'; // Import the theme CSS

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(VueToast);
});