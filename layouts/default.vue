<script lang="ts" setup>
import ColorSwitch from '../components/ColorSwitch.vue';

</script>

<template>
  <div class="pb-8">
    <header class="">
      <div class="container container-sm mx-auto gap-10 justify-between items-center flex py-9">
        <div class="flex font-semibold text-sm gap-10 items-center">
          <NuxtLink to="/"><img class="w-12" v-if="$colorMode.unknown !== true" :src="$colorMode.value === 'dark' ? '/logo-dark.svg' : '/logo.svg'" alt="logo" /></NuxtLink>
          <NuxtLink to="/" class="hover:underline">stories</NuxtLink>
          <!-- <NuxtLink to="/" class="hover:underline">leaderboard</NuxtLink> -->
          <a href="#" class="hover:underline">about us</a>
        </div>
        <div class="flex gap-8 items-center">
          <i class="fa-brands fa-instagram"></i>
          <i class="fa-brands fa-twitter"></i>
          <ColorSwitch />
          <button>
            <div class="border px-6 py-1 text-center font-bold tracking-tight text-sm cursor-pointer">submit yours</div>
          </button>
          <button>
            <div class="border px-6 py-1 text-center font-bold tracking-tight text-sm cursor-pointer">auth via twitter</div>
          </button>
        </div>
      </div>
    </header>
    <div>
      <slot />
    </div>
    <footer class="mt-16">
      <div class="container text-center mx-auto">
        <img class="mx-auto w-10 mix-blend-difference" src="/logo-text-dark.svg"
          alt="text-logo">
        <p class="mt-4">est. 2024</p>
        <div class="flex justify-center items-center gap-4 mt-4">
          <i class="fa-brands fa-instagram"></i>
          <i class="fa-brands fa-twitter"></i>
        </div>
      </div>
    </footer>
  </div>
</template>

<style></style>