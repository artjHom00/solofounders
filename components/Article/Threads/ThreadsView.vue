<script setup lang="ts">
import { ref } from 'vue'
import { useToast } from 'vue-toastification'
import type { IBaseThread } from '../../../types/thread/IBaseThread'
import type { IThreadExtended } from '../../../types/thread/IThreadExtended'
import ThreadDeleteSuccessToast from '../../Toasts/threads/ThreadDeleteSuccessToast.vue'
import ThreadSubmitSuccessToast from '../../Toasts/threads/ThreadSubmitSuccessToast.vue'
import ThreadUpvoteSuccessToast from '../../Toasts/threads/ThreadUpvoteSuccessToast.vue'
import ThreadTab from './ThreadTab.vue'

type props = {
  articleId: number,
  disabled?: boolean
}

const definedProps = defineProps<props>()
const $emit = defineEmits(['upvote', 'reply', 'delete'])

const toast = useToast()
const { data: threads } = useFetch<IThreadExtended[]>('/api/articles/threads?id=' + definedProps.articleId)

const deleteConfirmationModalId = 'thread-deleting'
const deleteThreadId: Ref<number | null> = ref(null)

const handleThreadDelete = async (confirm: boolean, threadId: number | null) => {
  if (threads.value == null) {
    // alert error
    return
  }

  const modal = document.getElementById(deleteConfirmationModalId) as any

  switch (confirm) {
    case true:
      await $fetch('/api/articles/threads', {
        method: 'DELETE',
        body: {
          thread: threadId
        }
      })

      threads.value = threads.value.filter(thread => thread.id !== threadId)
      deleteThreadId.value = null

      toast.success(ThreadDeleteSuccessToast)
      modal.close()

      break
    case false:
      deleteThreadId.value = threadId

      modal.showModal()
  }
}

const handleThreadUpvote = async (threadId: number) => {
  if (threads.value == null) {
    toast.error('Error occured while upvoting the thread')
    return
  }

  await $fetch('/api/articles/threads/upvote', {
    method: 'POST',
    body: {
      thread: threadId
    }
  })

  const thread = threads.value.find(thread => thread.id === threadId)

  if (thread == null) {
    toast.error('Error occured while upvoting the thread')
    return
  }

  thread.hasUpvoted = true
  thread.points += 1

  toast.success(ThreadUpvoteSuccessToast)
}

const replyTo: Ref<IThreadExtended | null> = ref(null)
const replyContent: Ref<string | null> = ref(null)

const handleThreadReply = async () => {
  if (threads.value == null) {
    toast.error('Error occured while upvoting the thread')
    return
  }

  try {
    const createdThread = await $fetch<IThreadExtended | any>('/api/articles/threads/create', {
      method: 'POST',
      body: {
        content: replyContent.value,
        replyTo: replyTo.value?.id,
        article: definedProps.articleId
      }
    })

    threads.value.push(createdThread)

    replyContent.value = null
    replyTo.value = null

    toast.success(ThreadSubmitSuccessToast)
  } catch (e: any) {
    return toast.error(e.data?.message ?? 'Error Occured')
  }
}

</script>

<template>
  <div>
    <AuthState>
      <template #default="{ loggedIn, clear }">
        <div>
          <DeleteConfirmationModal
            :id="deleteConfirmationModalId"
            @confirm="handleThreadDelete(true, deleteThreadId)"
          />
          <h2 class="mb-4 text-lg font-semibold">
            Threads
          </h2>
          <div class="mb-4 flex flex-col gap-2">
            <div class="flex gap-4">
              <input
                v-model="replyContent"
                class="input text-sm border-[#dddddd] dark:input-bordered bg-light placeholder:text-[#3f4a54a2] dark:placeholder:text-[#999] dark:bg-dark-secondary dark:focus:bg-dark-secondary w-full"
                placeholder="Add a comment"
                :disabled="loggedIn === false || disabled === true"
                type="text"
              >
              <button
                class="btn dark:btn-secondary"
                :disabled="loggedIn === false"
                @click="handleThreadReply"
              >
                Submit
              </button>
            </div>
            <p v-if="replyTo" class="text-xs">
              Replying to: {{ replyTo.user.handle }}
            </p>
          </div>

          <div v-for="thread in threads.filter((t) => t.replyTo === null)" v-if="threads" :key="thread.id">
            <ThreadTab
              :thread="thread"
              :threads="threads"
              :is-authorized="loggedIn === true"
              @upvote="(threadId: number) => handleThreadUpvote(threadId)"
              @reply="(threadId: number) => replyTo = threads?.find((thread) => thread.id === threadId) ?? null"
              @delete="(threadId: number) => handleThreadDelete(false, threadId)"
            />
          </div>
        </div>
      </template>
      <template #placeholder>
        <button disabled>
          Loading...
        </button>
      </template>
    </AuthState>
  </div>
</template>
