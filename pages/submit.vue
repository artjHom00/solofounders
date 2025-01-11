<script setup lang="ts">
import { ClientOnly } from '#components'
import SubmissionForm from '../components/SubmissionForm.vue';
</script>

<template>
  <h2 class="text-center font-bold text-2xl">
    solofounders story submission
  </h2>
  <p class="text-center ">
    before submission, make sure to read <a class="hover:underline" href="#">our rules of writing</a>;
  </p>
  <div class="article-content mx-auto container max-w-screen-xl mt-8">
    <SubmissionForm/>
  </div>
</template>
