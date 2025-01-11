<script lang="ts" setup>

import ArticleMarkdownRenderer from '../../components/Article/ArticleMarkdownRenderer.vue'
import type { IArticleBySlugResponse } from '../../types/responses/IArticleBySlugResponse'
import Avatar from "vue-boring-avatars";


const route = useRoute()

const slug = route.params.slug

const { data: articleBySlugResponse } = useFetch<IArticleBySlugResponse>('/api/articles?slug=' + slug)

const handleUpvote = async () => {
  if (articleBySlugResponse.value == null) {
    // todo alert
    return;
  }

  await $fetch('/api/articles/upvote', {
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
      
      <div v-if="articleBySlugResponse != null">
        <div class="flex gap-4 mt-8 items-center">
          <button class="btn dark:btn-secondary" @click="navigateTo('/')">
            <i class="fa-solid fa-chevron-left text-xs w-3 h-3" />
          </button>
          <div>
            <img class="rounded-lg" :src="articleBySlugResponse.data.author.avatar" v-if="articleBySlugResponse.data.author.avatar" alt="">
            <Avatar class="rounded-lg" :size="48" :square="true" variant="bauhaus" :name="articleBySlugResponse.data.author.handle" :colors="['#FFFFFF', '#212121', '#52CA72']" v-else/>
          </div>
          <div>
            <div class="">By @{{ articleBySlugResponse.data.author.handle }}</div>
            <div class="text-xs opacity-75">
              On <NuxtTime :datetime="articleBySlugResponse.data.createdAt" />
            </div>
          </div>
        </div>
        <h1 class="text-3xl mt-8 font-bold">{{ articleBySlugResponse.data.name }}</h1>
        <ArticleMarkdownRenderer :article="articleBySlugResponse.data" />
      </div>
        
      <div class="mt-8">
        <div class="divider dark:divider-secondary"></div>
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
