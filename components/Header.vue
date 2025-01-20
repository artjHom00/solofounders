<script lang="ts" setup>
type props = {
  user: object | null
}

defineProps<props>()
</script>

<template>
  <header>
    <div class="gap-10 justify-between items-center flex py-9">
      <div class="flex font-medium text-sm gap-10 items-center">
        <NuxtLink to="/">
          <img v-if="$colorMode.unknown !== true" class="w-12"
            :src="$colorMode.value === 'dark' ? '/logo-dark.svg' : '/logo.svg'" alt="logo">
        </NuxtLink>
        <div class="hidden md:flex md:gap-10">
          <NuxtLink to="/" class="hover:underline">
            stories
          </NuxtLink>
          <NuxtLink to="/" class="hover:underline">about us</NuxtLink>
        </div>
      </div>
      <div class="items-center hidden md:flex md:gap-10">
        <div class="flex gap-2">
          <NuxtLink to="https://x.com/solofounders_" target="_blank">
            <button class="btn btn-ghost">
              <i class="fa-brands fa-x-twitter text-lg" />
            </button>
          </NuxtLink>
          <ColorSwitch />
        </div>

        <AuthState>
          <template #default="{ loggedIn }">
            <NuxtLink v-if="loggedIn === true" to="/submit">
              <button class="btn btn-primary text-light">
                submit yours
              </button>
            </NuxtLink>
            <NuxtLink v-else to="/api/auth/x" target="_blank">
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
      <div class="dropdown dropdown-end block md:hidden">
        <button tabindex="0" role="button" class="btn dark:btn-secondary">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h7" />
          </svg>
        </button class="btn dark:btn-secondary">
        <ul tabindex="0" class="dropdown-content bg-light-secondary dark:bg-dark-secondary menu rounded-box z-[1] mt-2 w-52 p-2 shadow">
          <li>
            <NuxtLink to="/">
              stories
            </NuxtLink>
          </li>
          <li>
            <NuxtLink to="/">about us</NuxtLink>
          </li>
          <li>
            <NuxtLink to="https://x.com/solofounders_" target="_blank">
              our x
            </NuxtLink>
          </li>
          <li>
            <AuthState>
              <template #default="{ loggedIn }">
                <NuxtLink v-if="loggedIn === true" to="/submit">
                    submit yours
                </NuxtLink>
                <NuxtLink v-else to="/api/auth/x" target="_blank">
                    auth via X
                </NuxtLink>
              </template>
              <template #placeholder>
                <button disabled>
                  Loading...
                </button>
              </template>
            </AuthState>
          </li>
          <li class="mt-5">
            <ColorSwitch />
          </li>
        </ul>
      </div>
    </div>
  </header>
</template>

<style></style>
