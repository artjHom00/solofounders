<script lang="ts" setup>
import type { LatestArticlesResponse } from '../../types/responses/ILatestArticlesResponse'
import ArticleTab from '~/components/ArticleTab.vue'
import Pagination from '~/components/Pagination.vue'

const props = defineProps<{
  initialPage?: number;
  defaultTake?: number;
}>()

const route = useRoute()
const defaultTake = props.defaultTake || 5
const currentPage = ref(props.initialPage || 0)

if (!isNaN(Number(route.query.page))) {
  currentPage.value = Number(route.query.page)
}

const { data: latestArticles } = useFetch<LatestArticlesResponse>(`/api/articles/latest?take=${defaultTake}&skip=${currentPage.value * defaultTake}`)

const handlePageChange = async (page: number) => {
  const newArticlesResponse: LatestArticlesResponse = await $fetch(`/api/articles/latest?take=${defaultTake}&skip=${page * defaultTake}`)

  latestArticles.value = newArticlesResponse
  currentPage.value = page
}
</script>

<template>
  <div v-if="latestArticles" class="content-wrapper">
    <div class="mt-8 flex flex-col gap-6 w-fit">
      <ArticleTab v-for="article in latestArticles.data" v-bind="article" />
    </div>
    <div class="mt-8">
      <Pagination
        :current-page="currentPage"
        :has-next-page="latestArticles.hasNextPage"
        @page-change="handlePageChange"
      />
    </div>
  </div>
</template>

<style scoped>
/* Add any specific styles for ArticleView here */
</style>
