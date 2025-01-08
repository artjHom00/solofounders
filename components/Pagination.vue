<script lang="ts" setup>
import Button from './ui/Button.vue';

const $emit = defineEmits(['pageChange'])

type props = {
  currentPage: number,
  hasNextPage: boolean
}


defineProps<props>()

</script>

<template>
  <div class="flex gap-4">
    <Button variant="secondary" :disabled="currentPage === 0" :onClick="() => $emit('pageChange', currentPage - 1)" class="!text-dark dark:!text-light">
        <i class="fa-solid fa-chevron-left text-xs"></i> <span class="tracking-tight text-sm"></span>
      </Button>
    <Button variant="secondary" :disabled="!hasNextPage" :onClick="() => $emit('pageChange', currentPage + 1)" class="!text-dark dark:!text-light">
        <i class="fa-solid fa-chevron-right text-xs"></i> <span class="tracking-tight text-sm"></span>
    </Button>
  </div>
</template>

<style>

</style>
