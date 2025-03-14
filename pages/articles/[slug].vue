<script lang="ts" setup>

import { useToast } from 'vue-toastification'
import ArticleMarkdownRenderer from '../../components/Article/ArticleMarkdownRenderer.vue'
import type { IArticleBySlugResponse } from '../../types/responses/IArticleBySlugResponse'
import ArticleDeleteSuccessToast from '../../components/Toasts/articles/ArticleDeleteSuccessToast.vue'
import ThreadsView from '../../components/Article/Threads/ThreadsView.vue'
import NotFound from '@/components/NotFound.vue'

const route = useRoute()
const toast = useToast()

const slug = route.params.slug
const { data: articleBySlugResponse, status } = useFetch<IArticleBySlugResponse>('/api/articles?slug=' + slug)

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
    //  alert
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

const handleRetweet = () => {
  if (!articleBySlugResponse.value) return;

  const tweetText = `${articleBySlugResponse.value.data.name}\nRead more at: ${window.location.origin}/article/${slug}`;
  const twitterUrl = `https://x.com/intent/tweet?text=${encodeURIComponent(tweetText)}`;

  window.open(twitterUrl, '_blank');
}

</script>

<template>
  <main>
    <DeleteConfirmationModal :id="deleteConfirmationModalId" @confirm="handleArticleDelete" />
    <div class="container max-w-screen-sm mx-auto mt-8 dark:text-light" v-if="articleBySlugResponse != null && status === 'success'">
      <div>
        <div v-if="articleBySlugResponse.data.approved === false && articleBySlugResponse.isAvailable" class="text-xs mt-4 pl-4 border-l-4 border-warning">
          The article is not visible to other visitors yet. <br/> Usually, the moderation takes couple hours to proceed.
        </div>
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
            <ul tabindex="0"
              class="dropdown-content bg-light-secondary dark:bg-dark-secondary menu rounded-box z-[1] mt-2 w-52 p-2 shadow">
              <li class="text-error" @click="handleArticleDelete(false)">
                <a><i class="fa-regular fa-trash-can" />Delete</a>
              </li>
            </ul>
          </div>
        </div>
        <h1 class="text-3xl mt-8 font-bold break-words">
          {{ articleBySlugResponse.data.name }}
        </h1>
        <div>
          <ArticleMarkdownRenderer v-if="articleBySlugResponse.isAvailable" :article="articleBySlugResponse.data" />
          <h2 class="mt-4" v-else>The article is not approved yet.</h2>
        </div>
        <div class="mt-4">
          <div class="divider dark:divider-secondary" />
          <div class="mb-5 flex gap-4">
            <AuthState>
              <template #default="{ loggedIn, clear }">
                <div>
                  <button class="btn dark:btn-secondary"
                    :variant="(articleBySlugResponse?.hasUpvoted === true) ? 'primary' : 'secondary'"
                    :disabled="loggedIn === false || (articleBySlugResponse?.hasUpvoted === true)"
                    @click="handleArticleUpvote">
                    <i class="fa-solid fa-chevron-up w-3 h-3" />
                  </button>
                </div>
                <button class="btn dark:btn-secondary" variant="secondary" :disabled="loggedIn === false" @click="handleRetweet">
                  <i class="fa-solid fa-retweet w-3 h-3" />
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
        <ThreadsView class="mt-8" v-if="articleBySlugResponse.data.approved === true" :article-id="articleBySlugResponse.data.id" />
      </div>
    </div>
    <div v-else-if="status === 'pending'" class="pt-32 mb-8 text-center">
        <h3 class="text-lg tracking-tighter">Loading...</h3>
    </div>
    <div v-else>
      <NotFound class="pt-32 mb-8"/>
    </div>
  </main>
</template>
