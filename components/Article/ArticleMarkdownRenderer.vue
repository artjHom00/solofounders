<script setup lang="ts">
import type { IArticle } from '../../types/article/IArticle'

import 'md-editor-v3/lib/style.css'

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
  font-size: 18px;
  letter-spacing: -0.06px;
  line-height: 30px;
}
.md-editor-preview ul {
  list-style: '- ';
}
.md-editor-preview a {
  text-decoration: underline;
}
.md-editor-preview img {
  margin: 30px 0;
}
.md-editor-preview blockquote {
  border-left: 3px solid oklch(var(--p)) !important;
  position: relative;
  padding-left: 40px !important;
  background: initial !important;
  margin: 20px 0;
}
.md-editor-preview blockquote::before {
  content:'"';
  position: absolute;
  left: 10px;
  font-size: 32px;
  top: -5px;
}
.md-editor-preview ol {
  list-style: initial;
}
/* General styling for the <pre> tag */
  .md-editor-preview pre {
  background-color: oklch(var(--s) / 0.1); /* Soft background color */
  border-radius: 6px; /* Rounded corners */
  padding: 16px; /* Inner padding */
  overflow-x: auto; /* Horizontal scroll for long lines */
  font-size: 14px; /* Font size */
  line-height: 1.5; /* Line height for better readability */
  margin: 20px 0; /* Spacing around */
}

.md-editor-preview pre code {
  color: var(--fc);
  font-family: 'Fira Code', monospace;
  font-size: inherit;
  background-color: transparent !important;
}
.md-editor-preview code {
  background-color: oklch(var(--s) / 0.15);
  color: var(--fc);
  padding: 2px 4px;
  border-radius: 4px;
  font-family: 'Fira Code', monospace;
  font-size: 90%;
}
</style>
