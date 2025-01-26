<script lang="ts" setup>
type props = {
  user: object | null
}

defineProps<props>()
</script>

<template>
  <header>
    <div class="gap-2 md:gap-10 justify-between items-center flex py-9">
      <div class="flex font-medium text-sm gap-10 items-center">
        <NuxtLink to="/">
          <img
            v-if="$colorMode.unknown !== true"
            class="w-12"
            :src="$colorMode.value === 'dark' ? '/logo-dark.svg' : '/logo.svg'"
            alt="logo"
          >
        </NuxtLink>
      </div>
      <div class="md:flex gap-4">
        <div>
          <label class="input text-sm border-[#dddddd] dark:input-bordered bg-light placeholder:text-[#3f4a54a2] dark:placeholder:text-[#999] dark:bg-dark-secondary dark:focus:bg-dark-secondary w-full flex items-center gap-2">
          <input type="text" class="sm:min-w-64" placeholder="Search" />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            class="h-4 w-4 opacity-70">
            <path
              fill-rule="evenodd"
              d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
              clip-rule="evenodd" />
          </svg>
        </label>
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
      </div>
      <div class="dropdown dropdown-end block md:hidden">
        <button tabindex="0" role="button" class="btn dark:btn-secondary">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h7" />
          </svg>
        </button class="btn dark:btn-secondary">
        <ul tabindex="0" class="dropdown-content bg-light-secondary dark:bg-dark-secondary menu rounded-box z-[1] mt-2 w-52 p-2 shadow">
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
          <li class="mt-2">
            <ColorSwitch />
          </li>
        </ul>
      </div>
    </div>
  </header>
</template>

<style></style>
