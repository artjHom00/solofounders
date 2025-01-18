<script lang="ts" setup>

import { useToast } from 'vue-toastification'
import Avatar from 'vue-boring-avatars'
import ArticleMarkdownRenderer from '../../components/Article/ArticleMarkdownRenderer.vue'
import type { IArticleBySlugResponse } from '../../types/responses/IArticleBySlugResponse'
import DeleteSuccessToast from '../../components/Toasts/DeleteSuccessToast.vue'
import ThreadsView from '../../components/Article/Threads/ThreadsView.vue'
import type { IBaseThread } from '../../types/thread/IBaseThread'
import type { IThread } from '../../types/thread/IThread'
import type { IThreadExtended } from '../../types/thread/IThreadExtended'

const route = useRoute()
const toast = useToast()

const slug = route.params.slug

const { data: articleBySlugResponse } = useFetch<IArticleBySlugResponse>('/api/articles?slug=' + slug)

const deleteConfirmationModalSel = 'delete-confirmation'

const showDeleteConfirmationModal = async () => {
  const modal = document.getElementById(deleteConfirmationModalSel) as any
  modal.showModal()
}

const hideDeleteConfirmationModal = async () => {
  const modal = document.getElementById(deleteConfirmationModalSel) as any
  modal.hideModal()
}

const handleDeleting = async () => {
  await $fetch('/api/articles', {
    method: 'DELETE',
    body: {
      article: articleBySlugResponse.value?.data.id
    }
  })

  toast.success(DeleteSuccessToast)
  navigateTo('/')
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

const handleThreadUpvote = async (threadId: number) => {
  if (articleBySlugResponse.value == null) {
    // todo alert
    return
  }
  
  await $fetch('/api/articles/threads/upvote', {
    method: 'POST',
    body: {
      thread: threadId
    }
  })

  const thread = articleBySlugResponse.value.data.threads.find((thread) => thread.id === threadId)
  if(thread == null) {
    // todo alert
    return
  }

  thread.hasUpvoted = true
  thread.points += 1
}

const handleThreadReply = async (content: string, replyTo?: IThreadExtended) => {
  if (articleBySlugResponse.value == null) {
    // todo alert
    return
  }
  
  try {
    const createdThread = await $fetch<IThreadExtended | any>('/api/articles/threads/create', {
      method: 'POST',
      body: {
        content: content,
        replyTo: replyTo?.id,
        article: articleBySlugResponse.value.data.id
      }
    })
    articleBySlugResponse.value.data.threads.push(createdThread)
  } catch(e: any) {
    return toast.error(e.data?.message ?? 'Error Occured')
  }

}

const handleThreadDelete = async (threadId: number) => {
  if (articleBySlugResponse.value == null) {
    // todo alert
    return
  }
  
  await $fetch('/api/articles/threads', {
    method: 'delete',
    body: {
      thread: threadId
    }
  })

  articleBySlugResponse.value.data.threads = articleBySlugResponse.value.data.threads.filter(
    (thread) => thread.id !== threadId
  );
}

</script>

<template>
  <main>
    <div class="container max-w-screen-sm mx-auto mt-8 dark:text-light">
      <dialog id="delete-confirmation" class="modal">
        <div class="modal-box dark:bg-dark">
          <h3 class="text-lg font-bold">
            Are you sure?
          </h3>
          <p class="py-4">
            Are you sure you want to delete this article? This action cannot be undone. Please confirm to proceed.
          </p>
          <div class="flex justify-end gap-4">
            <button class="btn btn-error text-white" @click="handleDeleting">
              Delete the article
            </button>
          </div>
        </div>
        <form method="dialog" class="modal-backdrop" @click="hideDeleteConfirmationModal">
          <button class="cursor-default">
            Close
          </button>
        </form>
      </dialog>
      <div v-if="articleBySlugResponse != null">
        <div class="flex justify-between items-center mt-8">
          <div class="flex gap-4 items-center">
            <button class="btn dark:btn-secondary" @click="navigateTo('/')">
              <i class="fa-solid fa-chevron-left text-xs w-3 h-3" />
            </button>
            <UserCard :user="articleBySlugResponse.data.author">
              On <NuxtTime :datetime="articleBySlugResponse.data.createdAt" />
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
              <!-- <li><a><i class="fa-solid fa-pen-to-square"></i> Edit</a></li> -->
              <li class="text-red-500" @click="showDeleteConfirmationModal">
                <a><i
                  class="fa-regular fa-trash-can"
                /> Delete</a>
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
        <AuthState>
          <template #default="{loggedIn, clear}">
            <ThreadsView class="mt-8" @reply="handleThreadReply" @upvote="handleThreadUpvote" @delete="handleThreadDelete" :is-authorized="loggedIn === true" :threads="articleBySlugResponse?.data.threads"/>
          </template>
          <template #placeholder>
            <button disabled>
              Loading...
            </button>
          </template>
        </AuthState>
      </div>

    </div>
  </main>
</template>
