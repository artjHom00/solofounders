<script lang="ts" setup>
import type { ILatestArticlesResponse } from '../../types/responses/ILatestArticlesResponse'
import ArticleTab from '~/components/Article/ArticleTab.vue'
import Pagination from '~/components/Pagination.vue'

const props = defineProps<{
  searchQuery?: string;
  initialPage?: number;
  defaultTake?: number;
}>()

const route = useRoute()
const defaultTake = props.defaultTake || 5
const currentPage = ref(props.initialPage || 0)

if (!isNaN(Number(route.query.page))) {
  currentPage.value = Number(route.query.page)
}

let articlesFetchUrl = `/api/articles/list?take=${defaultTake}&skip=${currentPage.value * defaultTake}`
if(props.searchQuery != null) {
  articlesFetchUrl += `&search=${props.searchQuery}`
}

const { data: latestArticles } = useFetch<ILatestArticlesResponse>(articlesFetchUrl)

const getNewArticles = async (url: string) => {
  const newArticlesResponse: ILatestArticlesResponse = await $fetch(url)
  latestArticles.value = newArticlesResponse
}

const handlePageChange = async (page: number) => {
  currentPage.value = page

  articlesFetchUrl = `/api/articles/list?take=${defaultTake}&skip=${currentPage.value * defaultTake}`
  if(props.searchQuery != null) {
    articlesFetchUrl += `&search=${props.searchQuery}`
  }

  await getNewArticles(articlesFetchUrl)

  scrollTo({
    top: 0
  })
}

const pollNewArticles = async () => {
  setInterval(async () => {
    await getNewArticles(articlesFetchUrl)
  }, 5000)
}

onMounted(async () => {
  if(props.searchQuery == null) {
    pollNewArticles()
  }
})
</script>

<template>
  <div v-if="latestArticles && latestArticles.data.length > 0" class="content-wrapper">
    <div class="mt-8 flex flex-col gap-6 w-fit" v-auto-animate>
      <div v-for="article in latestArticles.data" :key="article.id" class="flex">
        <ArticleTab v-bind="article" />
      </div>
    </div>
    <div class="mt-8">
      <Pagination
        :current-page="currentPage"
        :has-next-page="latestArticles.hasNextPage"
        @page-change="handlePageChange"
      />
    </div>
  </div>
  <div v-else class="content-wrapper">
    <h1 class="mt-8 text-xl font-semibold">
        [nothing found]
      </h1>
  </div>
</template>

<style scoped>
/* Add any specific styles for ArticleView here */
</style>
