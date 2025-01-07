<script lang="ts" setup>
import Button from './ui/Button.vue';

type props = {
  currentPage: number,
  hasNextPage: boolean
}


defineProps<props>()

</script>

<template>
  <div class="flex gap-4">
    <Button variant="secondary" :disabled="currentPage === 0" :onClick="() => navigateTo('/')" class="!text-dark dark:!text-light">
        <i class="fa-solid fa-chevron-left text-xs"></i> <span class="tracking-tight text-sm"></span>
      </Button>
    <Button variant="secondary" :disabled="!hasNextPage" :onClick="() => navigateTo('/')" class="!text-dark dark:!text-light">
        <i class="fa-solid fa-chevron-right text-xs"></i> <span class="tracking-tight text-sm"></span>
    </Button>
  </div>
</template>

<style>

</style>
