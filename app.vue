<template>
  <div class="min-h-screen transition-colors bg-light text-dark dark:bg-dark dark:text-light">
    <CookiesConsent/>
    <NuxtLoadingIndicator :throttle="100" style="background: #52CA72"/>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<style>
</style>
