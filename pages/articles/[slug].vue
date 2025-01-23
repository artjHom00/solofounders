<script lang="ts" setup>

import { useToast } from 'vue-toastification'
import ArticleMarkdownRenderer from '../../components/Article/ArticleMarkdownRenderer.vue'
import type { IArticleBySlugResponse } from '../../types/responses/IArticleBySlugResponse'
import ArticleDeleteSuccessToast from '../../components/Toasts/articles/ArticleDeleteSuccessToast.vue'
import ThreadsView from '../../components/Article/Threads/ThreadsView.vue'

const route = useRoute()
const toast = useToast()

const slug = route.params.slug
const { data: articleBySlugResponse } = useFetch<IArticleBySlugResponse>('/api/articles?slug=' + slug)

const deleteConfirmationModalId = 'article-deleting'
const handleArticleDelete = async (confirm: boolean) => {
  switch (confirm) {
    case true:
      await $fetch('/api/articles', {
        method: 'DELETE',
        body: {
          article: articleBySlugResponse.value?.data.id
        }
      })

      toast.success(ArticleDeleteSuccessToast)
      navigateTo('/')
      break
    case false:
      const modal = document.getElementById(deleteConfirmationModalId) as any
      modal.showModal()
  }
}

const handleArticleUpvote = async () => {
  if (articleBySlugResponse.value == null) {
    // todo alert
    return
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
    <DeleteConfirmationModal :id="deleteConfirmationModalId" @confirm="handleArticleDelete" />
    <div class="container max-w-screen-sm mx-auto mt-8 dark:text-light">
      <div v-if="articleBySlugResponse != null">
        <div class="flex justify-between items-center mt-8">
          <div class="flex gap-4 items-center">
            <button class="btn dark:btn-secondary" @click="navigateTo('/')">
              <i class="fa-solid fa-chevron-left text-xs w-3 h-3" />
            </button>
            <UserCard :user="articleBySlugResponse.data.author">
              On
              <NuxtTime :datetime="articleBySlugResponse.data.createdAt" />
            </UserCard>
          </div>
          <div v-if="articleBySlugResponse.isAuthor === true" class="dropdown dropdown-end">
            <button class="btn dark:btn-secondary">
              <i class="fas fa-ellipsis-v w-3 h-3" />
            </button>
            <ul
              tabindex="0"
              class="dropdown-content bg-light-secondary dark:bg-dark-secondary menu rounded-box z-[1] mt-2 w-52 p-2 shadow"
            >
              <li class="text-error" @click="handleArticleDelete(false)">
                <a><i class="fa-regular fa-trash-can" /> Delete</a>
              </li>
            </ul>
          </div>
        </div>
        <h1 class="text-3xl mt-8 font-bold">
          {{ articleBySlugResponse.data.name }}
        </h1>
        <ArticleMarkdownRenderer :article="articleBySlugResponse.data" />
        <div class="mt-8">
          <div class="divider dark:divider-secondary" />
          <div class="mb-5 flex gap-4">
            <AuthState>
              <template #default="{ loggedIn, clear }">
                <div>
                  <button
                    class="btn dark:btn-secondary"
                    :variant="(articleBySlugResponse?.hasUpvoted === true) ? 'primary' : 'secondary'"
                    :disabled="loggedIn === false || (articleBySlugResponse?.hasUpvoted === true)"
                    @click="handleArticleUpvote"
                  >
                    <i class="fa-solid fa-chevron-up" />
                  </button>
                </div>
                <button class="btn dark:btn-secondary" variant="secondary" :disabled="loggedIn === false" @click="null">
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
          <span class="text-sm">Liked the story? <br>
            <NuxtLink to="https://x.com/solofounders_" target="_blank" class="!underline">Follow us on X</NuxtLink> for
            more
            content!
          </span>
        </div>
        <ThreadsView class="mt-8" :article-id="articleBySlugResponse.data.id" />
      </div>
    </div>
  </main>
</template>
