<script lang="ts" setup>
import Pagination from '~/components/Pagination.vue'
import ArticleTab from '~/components/ArticleTab.vue'

const { data: articles } = useFetch('/api/articles/latest');


</script>

<template>
  <div class="container mx-auto">
    <div class="mt-8">
      <!-- <h1 class="mt-8 text-3xl font-bold">Latest Stories</h1> -->
      <div class="mt-8 flex flex-col gap-6 w-fit">

        <ArticleTab v-for="article in articles" v-bind="article" />
        <!-- <ArticleTab/>
        <ArticleTab/>
        <ArticleTab/>
        <ArticleTab/> -->
      </div>
      <div class="mt-8">
        <Pagination />
      </div>
    </div>
  </div>
</template>

<style></style>