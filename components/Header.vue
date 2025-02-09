<script lang="ts" setup>
import { useToast } from 'vue-toastification';

type props = {
  user: object | null
}

const toast = useToast()

defineProps<props>()

const searchQuery = ref('')

const handleSearch = (() => {
  if(searchQuery.value != '') {
    navigateTo(`/search?q=${searchQuery.value}`, {
      replace: true,
    })
  } else {
    toast.error('No search query provided')
  }
})
</script>

<template>
  <header>
    <div class="gap-4 sm:gap-10 justify-between items-center flex py-9">
      <div class="flex font-medium text-sm gap-10 items-center">
        <NuxtLink to="/">
          <img
            class="w-12"
            src="/logo.png"
            alt="logo"
          >
        </NuxtLink>
      </div>
      <div class="md:flex flex-grow md:flex-grow-0 gap-4">
          <form @submit.prevent="handleSearch" >
            <label class="input pr-0 text-sm border-[#dddddd] duration-200 dark:input-bordered bg-light placeholder:text-[#3f4a54a2] dark:placeholder:text-[#999] dark:bg-dark-secondary dark:focus:bg-dark-secondary w-full flex items-center gap-2">
            <input v-model="searchQuery" type="text" class="h-full w-full sm:min-w-64" placeholder="Search" />
            <button type="submit" class="h-full w-16"><i class="fa-solid fa-magnifying-glass"></i></button>
          </label>
          </form>
        <div class="items-center hidden md:flex md:gap-10">
          <div class="flex gap-2">
            <NuxtLink to="https://x.com/solofounders_" target="_blank">
              <button class="btn btn-ghost">
                <i class="fa-brands fa-x-twitter text-lg w-4" />
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
