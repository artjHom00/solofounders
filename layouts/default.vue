<script lang="ts" setup>
const { loggedIn, user, session, fetch, clear } = useUserSession()

</script>

<template>
  <div class="pb-8">
    <Header :user="user" />
    <div>
      <slot />
    </div>
    <Footer />
  </div>
</template>

<style></style>
