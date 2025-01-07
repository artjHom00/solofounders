<script lang="ts" setup>
import Pagination from '~/components/Pagination.vue'
import ArticleTab from '~/components/ArticleTab.vue'
import type { LatestArticlesResponse } from '../types/responses/ILatestArticlesResponse';


const route = useRoute()
const defaultTake = 5;

let currentPage = 0;
if(!isNaN(Number(route.query.page))) {
  currentPage = Number(route.query.page)
}

const { data: latestArticlesResponse } = useFetch<LatestArticlesResponse>(`/api/articles/latest?take=${defaultTake}&skip=${currentPage * defaultTake}`);
</script>

<template>
  <div class="container mx-auto">
    <div class="mt-8">
      <h1 class="mt-8 text-3xl font-black">Featured Stories</h1>
      <h2 class="mt-2 opacity-75">Latest stories from indie founders</h2>
      <div class="content-wrapper" v-if="latestArticlesResponse">
        <div class="mt-8 flex flex-col gap-6 w-fit">
          <ArticleTab v-for="article in latestArticlesResponse.data" v-bind="article" />
        </div>
        <div class="mt-8">
          <Pagination :current-page="currentPage" :has-next-page="latestArticlesResponse.hasNextPage" />
        </div>
      </div>
    </div>
  </div>
</template>

<style></style>