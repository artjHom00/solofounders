<script setup lang="ts">
import { computed } from 'vue';
import type { IBaseThread } from '../../../types/thread/IBaseThread'

type props = {
  thread: IBaseThread, // The single thread to render
  threads: IBaseThread[], // All threads in the article
}
// Props for the component
const definedProps = defineProps<props>();

// Emit events for thread actions
const emit = defineEmits(['upvote', 'reply']);

// Get replies for the current thread
const replies = computed(() =>
    definedProps.threads.filter((t) => t.replyTo === definedProps.thread.id)
);
</script>

<template>
  <div class="border-l-2 border-gray-200 pl-4 mb-6">
    <!-- Main thread block -->
    <div class="card bg-base-100 shadow-lg">
      <div class="card-body p-4">
        <!-- Thread content -->
        <h2 class="card-title">
          Thread #{{ thread.id }}
          <span class="badge badge-secondary ml-2">{{ thread.points }} points</span>
        </h2>
        <p class="text-gray-700">{{ thread.content }}</p>
        <p class="text-sm text-gray-500">Posted: {{ new Date(thread.createdAt).toLocaleString() }}</p>

        <!-- Actions -->
        <div class="card-actions mt-3 flex justify-start">
          <button
            class="btn btn-primary btn-sm"
            @click="$emit('upvote', thread.id)"
          >
            Upvote
          </button>
          <button
            class="btn btn-accent btn-sm"
            @click="$emit('reply', thread.id)"
          >
            Reply
          </button>
        </div>
      </div>
    </div>

    <!-- Replies -->
    <div class="ml-4 mt-4" v-if="replies.length">
      <h4 class="text-gray-500 text-sm font-semibold">Replies:</h4>
      <ThreadBlock
        v-for="reply in replies"
        :key="reply.id"
        :thread="reply"
        :threads="threads"
        @upvote="$emit('upvote', $event)"
        @reply="$emit('reply', $event)"
      />
    </div>
  </div>
</template>

<style scoped>
/* Add additional spacing for nested replies */
.border-l-2 {
  border-left-width: 2px;
}
</style>