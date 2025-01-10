<script lang="ts" setup>

import Button from '../../components/ui/Button.vue'
import ArticleView from '../../components/blocks/ArticleView.vue'
import type { IArticleBySlugResponse } from '../../types/responses/IArticleBySlugResponse'

const route = useRoute()

const slug = route.params.slug

const { data: articleBySlugResponse } = useFetch<IArticleBySlugResponse>('/api/articles?slug=' + slug)

const handleUpvote = async () => {
  const upvoteResponse = await $fetch('/api/articles/upvote', {
    method: 'POST',
    body: {
      article: articleBySlugResponse.value?.data.id
    }
  })
}

</script>

<template>
  <main>
    <div class="article-content container max-w-screen-sm mx-auto mt-8 dark:text-light">
      <Button variant="secondary" :on-click="() => navigateTo('/')" class="!text-dark dark:!text-light">
        <i class="fa-solid fa-chevron-left text-xs" /> <span class="tracking-tight text-sm" />
      </Button>

      <ArticleView v-if="articleBySlugResponse != null" :article="articleBySlugResponse.data" />

      <div>
        <hr class="!mb-5" width="60">
        <div class="mb-5 flex gap-4">
          <AuthState>
            <template #default="{ loggedIn, clear }">
              <Button :on-click="handleUpvote" :variant="(articleBySlugResponse?.hasUpvoted === true) ? 'primary' : 'secondary' " :disabled="loggedIn === false || (articleBySlugResponse?.hasUpvoted === true)">
                <i class="fa-regular fa-thumbs-up" />
              </Button>
              <Button :on-click="() => null" variant="secondary" :disabled="loggedIn === false">
                <i class="fa-regular fa-comment" />
              </Button>
              <Button :on-click="() => null" variant="secondary" :disabled="loggedIn === false">
                <i class="fa-solid fa-retweet" />
              </Button>
            </template>
            <template #placeholder>
              <button disabled>
                Loading...
              </button>
            </template>
          </AuthState>
        </div>
        <span class="text-sm tracking-tighter">Liked the story? <br>
          <NuxtLink to="https://x.com/solofounders_" target="_blank" class="!underline">Follow us on X</NuxtLink> for more content!</span>
      </div>
    </div>
  </main>
</template>
