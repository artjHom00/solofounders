<script lang="ts" setup>
import ArticlesView from '../components/Article/ArticlesView.vue'
</script>

<template>
  <div class="mx-auto">
    <div class="mt-8">
      <h1 class="mt-8 text-3xl font-black">
        Latest Stories
      </h1>
      <h2 class="mt-2 opacity-75">
        Latest stories from indie founders
      </h2>
      <ArticlesView :default-take="10" />
    </div>
  </div>
</template>

<style>
/* Add styles specific to the parent component if necessary */
</style>
