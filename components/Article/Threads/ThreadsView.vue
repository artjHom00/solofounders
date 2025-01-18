<script setup lang="ts">
import { ref } from 'vue';
import ThreadBlock from './ThreadBlock.vue';
import type { IBaseThread } from '../../../types/thread/IBaseThread'
import type { IThreadExtended } from '../../../types/thread/IThreadExtended';

type props = {
  threads: IThreadExtended[],
  isAuthorized: boolean
}

defineProps<props>()

const replyContent: Ref<string | null> = ref(null)
const replyTo: Ref<IThreadExtended | null> = ref(null)
const $emit = defineEmits(['upvote', 'reply', 'delete'])

</script>

<template>
  <div>
    <h2 class="mb-4 text-lg font-semibold">Threads</h2>
    <AuthState>
      <template #default="{ loggedIn }">
        <div class="mb-4 flex flex-col gap-2">
          <div class="flex gap-4">
            <input v-model="replyContent"
              class="input border-[#dddddd] dark:input-bordered bg-light placeholder:text-[#3f4a54a2] dark:placeholder:text-[#999] dark:bg-dark-secondary dark:focus:bg-dark-secondary w-full"
              placeholder="Add a comment" :disabled="loggedIn === false" type="text">
            <button class="btn dark:btn-secondary" :disabled="loggedIn === false"
              @click="$emit('reply', replyContent, replyTo)">Submit</button>
          </div>
          <p v-if="replyTo" class="text-sm">Replying to: {{ replyTo.user.handle }}</p>
        </div>

        <div v-for="thread in threads.filter((t) => t.replyTo === null)" :key="thread.id">
          <ThreadBlock :thread="thread" :threads="threads" :is-authorized="isAuthorized"
            @upvote="(threadId: number) => $emit('upvote', threadId)"
            @reply="(threadId: number) => replyTo = threads.find((thread) => thread.id === threadId) ?? null"
            @delete="(threadId: number) => $emit('delete', threadId)" />
        </div>
      </template>
      <template #placeholder>
        Loading...
      </template>
    </AuthState>
  </div>
</template>