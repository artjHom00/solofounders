<script lang="ts" setup>
const $emit = defineEmits(['pageChange'])

type props = {
  currentPage: number,
  hasNextPage: boolean
}

defineProps<props>()

</script>

<template>
  <div class="flex gap-4">
    <div class="join">
      <button
        class="join-item btn dark:btn-secondary"
        :disabled="currentPage === 0"
        @click="$emit('pageChange', currentPage - 1)"
      >
        «
      </button>
      <button class="join-item btn dark:btn-secondary">
        {{ currentPage + 1 }}
      </button>
      <button
        class="join-item btn dark:btn-secondary"
        :disabled="!hasNextPage"
        @click="$emit('pageChange', currentPage + 1)"
      >
        »
      </button>
    </div>
  </div>
</template>

<style></style>
