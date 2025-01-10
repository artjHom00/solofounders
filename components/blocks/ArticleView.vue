<script setup lang="ts">
import type { IArticle } from '../../types/article/IArticle'

type props = {
    article: IArticle
}

defineProps<props>()
</script>
<template>
  <div class="mt-8" v-html="$md.render(article.content)" />
</template>

<style>
@import '/assets/css/article.css';
</style>
