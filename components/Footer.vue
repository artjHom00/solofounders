<script lang="ts" setup>

</script>

<template>
  <div>
    <footer class="mt-16">
      <div class="container text-center mx-auto flex flex-col gap-4">
        <div>
          <img class="mx-auto w-10 mix-blend-difference" src="/logo-text-dark.svg" alt="text-logo">
          <p class="mt-4 font-medium text-xs">
            est. 2024
          </p>
        </div>
        <div class="flex flex-col gap-1 text-xs opacity-75">
          <NuxtLink to="/privacy-policy" class="hover:underline">
            Privacy Policy
          </NuxtLink>
          <NuxtLink to="/terms-and-conditions" class="hover:underline">
            Terms and Conditions
          </NuxtLink>
        </div>
        <div class="flex justify-center items-center gap-4 mt-4">
          <NuxtLink to="https://x.com/solofounders_" target="_blank">
            <button class="btn btn-ghost">
              <i class="fa-brands fa-x-twitter" />
            </button>
          </NuxtLink>
        </div>
      </div>
    </footer>
  </div>
</template>

<style></style>
