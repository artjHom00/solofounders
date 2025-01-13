<script lang="ts" setup>

import { useToast } from "vue-toastification";
import ArticleMarkdownRenderer from '../../components/Article/ArticleMarkdownRenderer.vue'
import type { IArticleBySlugResponse } from '../../types/responses/IArticleBySlugResponse'
import Avatar from "vue-boring-avatars";
import DeleteSuccessToast from "../../components/Toasts/DeleteSuccessToast.vue";


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
      <dialog id="delete-confirmation" class="modal">
        <div class="modal-box dark:bg-dark">
          <h3 class="text-lg font-bold">Are you sure?</h3>
          <p class="py-4">Are you sure you want to delete this article? This action cannot be undone. Please confirm to proceed.</p>
          <div class="flex justify-end gap-4">
            <button class="btn btn-error text-white" @click="handleDeleting">Delete the article</button>
          </div>
        </div>
        <form method="dialog" class="modal-backdrop" @click="hideDeleteConfirmationModal">
          <button class="cursor-default">Close</button>
        </form>
      </dialog>
      <div v-if="articleBySlugResponse != null">
        <div class="flex justify-between items-center mt-8">
          <div class="flex gap-4 items-center">
            <button class="btn dark:btn-secondary" @click="navigateTo('/')">
              <i class="fa-solid fa-chevron-left text-xs w-3 h-3" />
            </button>
            <NuxtLink class="tooltip flex gap-4 text-left items-center dark:tooltip-secondary"
              data-tip="Go to X account" target="_blank"
              :to="`https://x.com/${articleBySlugResponse.data.author.handle}`">
              <div>
                <img class="rounded-lg" :src="articleBySlugResponse.data.author.avatar"
                  v-if="articleBySlugResponse.data.author.avatar" alt="">
                <Avatar class="rounded-lg" :size="48" :square="true" variant="bauhaus"
                  :name="articleBySlugResponse.data.author.handle" :colors="['#FFFFFF', '#212121', '#52CA72']" v-else />
              </div>
              <div>
                <div class="font-semibold">By @{{ articleBySlugResponse.data.author.handle }}</div>
                <div class="text-xs opacity-75">
                  On
                  <NuxtTime :datetime="articleBySlugResponse.data.createdAt" />
                </div>
              </div>
            </NuxtLink>
          </div>
          <div class="dropdown dropdown-end" v-if="articleBySlugResponse.isAuthor === true">
            <button class="btn dark:btn-secondary"><i class="fas fa-ellipsis-v w-3 h-3"></i></button>
            <ul tabindex="0"
              class="dropdown-content bg-light-secondary dark:bg-dark-secondary menu rounded-box z-[1] mt-2 w-52 p-2 shadow">
              <!-- <li><a><i class="fa-solid fa-pen-to-square"></i> Edit</a></li> -->
              <li class="text-red-500" @click="showDeleteConfirmationModal"><a><i
                    class="fa-regular fa-trash-can"></i> Delete</a></li>
            </ul>
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
              <div>
                <button class="btn dark:btn-secondary" @click="handleUpvote"
                  :variant="(articleBySlugResponse?.hasUpvoted === true) ? 'primary' : 'secondary'"
                  :disabled="loggedIn === false || (articleBySlugResponse?.hasUpvoted === true)">
                  <i class="fa-regular fa-thumbs-up" />
                </button>
              </div>
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
