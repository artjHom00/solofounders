<script lang="ts" setup>
import Pagination from '~/components/Pagination.vue'
import ArticleTab from '~/components/ArticleTab.vue'
import type { IBaseArticle } from '../types/article/IBaseArticle';

const { data: articles } = useFetch<IBaseArticle[]>('/api/articles/latest?take=5&skip=0');


</script>

<template>
  <div class="container mx-auto">
    <div class="mt-8">
      <h1 class="mt-8 text-3xl font-black">Featured Stories</h1>
      <h2 class="mt-2 opacity-75">Latest stories from indie founders</h2>
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