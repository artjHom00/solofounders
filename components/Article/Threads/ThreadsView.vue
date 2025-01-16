<script setup lang="ts">
import { ref } from 'vue';
import ThreadBlock from './ThreadBlock.vue';
import type { IBaseThread } from '../../../types/thread/IBaseThread'

type props = {
    threads: IBaseThread[]
}

defineProps<props>()

// Methods for thread actions
function upvote(threadId: number) {
  return null
}

function reply(threadId: number) {
  return null
}
</script>

<template>
  <div class="container mx-auto p-6">
    <h1 class="text-2xl font-bold mb-6">Threads</h1>
    <div v-for="thread in threads.filter((t) => t.replyTo === null)" :key="thread.id">
      <ThreadBlock
        :thread="thread"
        :threads="threads"
        @upvote="upvote"
        @reply="reply"
      />
    </div>
  </div>
</template>