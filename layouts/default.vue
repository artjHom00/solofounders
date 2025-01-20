<script lang="ts" setup>
const { loggedIn, user, session, fetch, clear } = useUserSession()

</script>

<template>
  <div class="pb-8 mx-4 sm:container sm:mx-auto">
    <Header :user="user" />
    <div class="min-h-screen">
      <slot />
    </div>
    <Footer />
  </div>
</template>

<style></style>
