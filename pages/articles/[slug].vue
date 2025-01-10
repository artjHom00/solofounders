<script lang="ts" setup>

import ArticleView from '../../components/blocks/ArticleView.vue'
import type { IArticleBySlugResponse } from '../../types/responses/IArticleBySlugResponse'

const route = useRoute()

const slug = route.params.slug

const { data: articleBySlugResponse } = useFetch<IArticleBySlugResponse>('/api/articles?slug=' + slug)

const handleUpvote = async () => {
  if (articleBySlugResponse.value == null) {
    // todo alert
    return;
  }

  const upvoteResponse = await $fetch('/api/articles/upvote', {
    method: 'POST',
    body: {
      article: articleBySlugResponse.value?.data.id
    }
  })

  articleBySlugResponse.value.hasUpvoted = true

}

</script>

<template>
  <main>
    <div class="container max-w-screen-sm mx-auto mt-8 dark:text-light">
      <button class="btn dark:btn-secondary" @click="navigateTo('/')">
        <i class="fa-solid fa-chevron-left text-xs w-3 h-3" />
      </button>

      <ArticleView v-if="articleBySlugResponse != null" :article="articleBySlugResponse.data" />

      <div>
        <hr class="!mb-5" width="60">
        <div class="mb-5 flex gap-4">
          <AuthState>
            <template #default="{ loggedIn, clear }">
              <button class="btn dark:btn-secondary" @click="handleUpvote"
                :variant="(articleBySlugResponse?.hasUpvoted === true) ? 'primary' : 'secondary'"
                :disabled="loggedIn === false || (articleBySlugResponse?.hasUpvoted === true)">
                <i class="fa-regular fa-thumbs-up" />
              </button>
              <button class="btn dark:btn-secondary" @click="null" variant="secondary" :disabled="loggedIn === false">
                <i class="fa-regular fa-comment" />
              </button>
              <button class="btn dark:btn-secondary" @click="null" variant="secondary" :disabled="loggedIn === false">
                <i class="fa-solid fa-retweet" />
              </button>
            </template>
            <template #placeholder>
              <button disabled>
                Loading...
              </button>
            </template>
          </AuthState>
        </div>
        <span class="text-sm tracking-tighter">Liked the story? <br>
          <NuxtLink to="https://x.com/solofounders_" target="_blank" class="!underline">Follow us on X</NuxtLink> for
          more
          content!
        </span>
      </div>
    </div>
  </main>
</template>
