<script>
import { Analytics } from '@vercel/analytics/nuxt'
</script>
<template>
  <div class="min-h-screen transition-colors bg-light text-dark dark:bg-dark dark:text-light">
    <Analytics/>
    <NuxtLoadingIndicator />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<style>
</style>
