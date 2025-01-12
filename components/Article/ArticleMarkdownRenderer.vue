<script setup lang="ts">
import type { IArticle } from '../../types/article/IArticle'

import 'md-editor-v3/lib/style.css';

type props = {
    article: IArticle
}

defineProps<props>()
</script>
<template>
  <div class="md-editor-preview" v-html="$md.render(article.content)" />
</template>

<style>
.md-editor-preview {
  word-break: initial !important;
}
</style>