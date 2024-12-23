<script lang="ts" setup>
import Pagination from '@/components/pagination.vue'
import ArticleTab from '@/components/article-tab.vue'
</script>

<template>
  <div class="container mx-auto">
    <div class="mt-16">
      <h1 class="mt-8 text-3xl font-bold">Latest Stories</h1>
      <div class="mt-8 flex flex-col gap-10 dark:text-dark">
        <ArticleTab/>
        <ArticleTab/>
        <ArticleTab/>
        <ArticleTab/>
        <ArticleTab/>
      </div>
      <div class="mt-8">
          <Pagination />
      </div>
    </div>
  </div>
</template>

<style>

</style>