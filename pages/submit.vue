<script setup lang="ts">
import SubmissionForm from '../components/SubmissionForm.vue'

const { loggedIn } = useUserSession()

onBeforeMount(() => {

  if(loggedIn.value === false) {
    window.location.href = '/'
  }
})
</script>

<template>
  <ClientOnly v-if="loggedIn">
    <h2 class="text-center font-bold text-2xl">
      solofounders story submission
    </h2>
    <p class="text-center ">
      before submission, make sure to read <NuxtLink class="underline" to="/how-to-write">how to write articles at solofounders</NuxtLink>;
    </p>
    <div class="article-content mx-auto container max-w-screen-xl mt-8">
      <SubmissionForm />
    </div>
  </ClientOnly>
</template>
