<script setup lang="ts">
import { computed } from 'vue';
import { TimeConstants } from '../../../utils/TimeConstants';
import type { IThreadExtended } from '../../../types/thread/IThreadExtended';

type props = {
  thread: IThreadExtended,
  threads: IThreadExtended[],
  isAuthorized: boolean,
}
const definedProps = defineProps<props>();

const emit = defineEmits(['upvote', 'reply', 'delete']);

const replies = computed(() =>
  definedProps.threads.filter((t) => t.replyTo === definedProps.thread.id)
);
</script>

<template>
  <div class="border-l-2 dark:border-secondary pl-2 mb-6">
    <div class="card">
      <div class="p-2 flex flex-col gap-2">
        <div class="flex items-center gap-4">
          <span class="font-bold text-xl overflow-hidden text-left">{{ thread.points }}</span>
          <UserCard :avatar-size="32" :user="thread.user">
            <NuxtTime date-style="medium" :datetime="thread.createdAt"
              :relative="timePassed(thread.createdAt) < TimeConstants.MS_IN_DAY && timePassed(thread.createdAt) > 0" />
          </UserCard>
        </div>
        <p class="text-sm">{{ thread.content }}</p>
        <div class="card-actions flex justify-start">
          <button class="btn dark:btn-secondary btn-sm" :disabled="thread.hasUpvoted || isAuthorized === false"
            @click="$emit('upvote', thread.id)">
            <i class="fa-solid fa-chevron-up" />
          </button>
          <button class="btn dark:btn-secondary btn-sm" :disabled="isAuthorized === false"
            @click="$emit('reply', thread.id)">
            <i class="fa-regular fa-message" />
          </button>
          <button v-if="thread.isAuthor === true" class="btn dark:btn-secondary btn-sm"
            @click="$emit('delete', thread.id)">
            <i class="fa-regular fa-trash-can"></i>
          </button>
        </div>
      </div>
    </div>

    <div class="ml-4 mt-4" v-if="replies.length">
      <ThreadTab :is-authorized="isAuthorized" v-for="reply in replies" :key="reply.id" :thread="reply"
        :threads="threads" @upvote="$emit('upvote', reply.id)" @reply="$emit('reply', reply.id)"
        @delete="$emit('delete', reply.id)" />
    </div>
  </div>
</template>