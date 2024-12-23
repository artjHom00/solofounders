<template>
  <div class="pb-8">
    <header class="bg-dark text-white">
        <div class="container container-sm mx-auto gap-10 justify-between items-center flex py-9">
            <div class="flex gap-8 items-center">
                <img src="/logo.svg" alt="logo" class="w-12"/>
                <a href="#" class="hover:underline">Stories</a>
                <a href="#" class="hover:underline">About</a>
                <a href="#" class="hover:underline">Submit yours</a>
            </div>
            <div class="flex gap-8 items-center">
                <i class="fa-brands fa-instagram"></i>
                <i class="fa-brands fa-twitter"></i>
            </div>
        </div>
    </header>
    <slot />
    <footer class="mt-16">
      <div class="container text-center mx-auto">
        <img class="mx-auto w-12" src="/logo-text-black.svg" alt="text-logo">
        <p class="mt-4"><i>est. 2024</i></p>
        <div class="flex justify-center items-center gap-4 mt-4">
                <i class="fa-brands fa-instagram"></i>
                <i class="fa-brands fa-twitter"></i>
            </div>
      </div>
    </footer>
  </div>
</template>

<script lang="ts" setup>

</script>

<style>

</style>