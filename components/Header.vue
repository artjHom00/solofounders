<script lang="ts" setup>
type props = {
    user: object | null
}

defineProps<props>()
</script>

<template>
  <header class="">
    <div class="container container-sm mx-auto gap-10 justify-between items-center flex py-9">
      <div class="flex font-medium text-sm gap-10 items-center">
        <NuxtLink to="/">
          <img
            v-if="$colorMode.unknown !== true"
            class="w-12"
            :src="$colorMode.value === 'dark' ? '/logo-dark.svg' : '/logo.svg'"
            alt="logo"
          >
        </NuxtLink>
        <NuxtLink to="/" class="hover:underline">
          stories
        </NuxtLink>
        <!-- <NuxtLink to="/" class="hover:underline">leaderboard</NuxtLink> -->
        <a href="#" class="hover:underline">about us</a>
      </div>
      <div class="flex gap-8 items-center">
        <i class="fa-brands fa-instagram" />
        <i class="fa-brands fa-x-twitter" />
        <ColorSwitch />

        <AuthState>
          <template #default="{ loggedIn }">
            <NuxtLink to="/submit" v-if="loggedIn === true">
              <button class="btn btn-primary">
                submit yours
              </button>
            </NuxtLink>
            <NuxtLink to="/api/auth/x" target="_blank" v-else>
              <button class="btn btn-secondary dark:btn-neutral">
                auth via X
              </button>
            </NuxtLink>
          </template>
          <template #placeholder>
            <button disabled>
              Loading...
            </button>
          </template>
        </AuthState>
      </div>
    </div>
  </header>
</template>

<style></style>
