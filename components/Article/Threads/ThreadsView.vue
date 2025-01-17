<script setup lang="ts">
import { ref } from 'vue';
import ThreadBlock from './ThreadBlock.vue';
import type { IBaseThread } from '../../../types/thread/IBaseThread'

type props = {
    threads: IBaseThread[],
    isAuthorized: boolean
}

defineProps<props>()

const $emit = defineEmits(['upvote', 'reply'])

</script>

<template>
  <div>
    <input class="mb-8 input border-[#dddddd] dark:input-bordered bg-light placeholder:text-[#3f4a54a2] dark:placeholder:text-[#999] dark:bg-dark-secondary dark:focus:bg-dark-secondary w-full" placeholder="Add a comment" type="text">
    <div v-for="thread in threads.filter((t) => t.replyTo === null)" :key="thread.id">
      <ThreadBlock
        :thread="thread"
        :threads="threads"
        :is-authorized="isAuthorized"
        @upvote="(threadId: number) => $emit('upvote', threadId)"
        @reply="(threadId: number) => $emit('reply', threadId)"
      />
    </div>
  </div>
</template>