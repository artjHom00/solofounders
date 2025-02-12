<script setup>
import NotFound from '@/components/NotFound.vue'

definePageMeta({
    layout: 'default'
})

useHead(() => ({
    status: 404,
    title: "Page not found",
}))

</script>
<template>
    <div class="min-h-screen transition-colors bg-light text-dark dark:bg-dark dark:text-light">
      <NuxtLoadingIndicator :throttle="100" style="background: #52CA72"/>
      <NuxtLayout>
        <NotFound class="pt-32 mb-8"  />
      </NuxtLayout>
    </div>
  </template>

<style></style>