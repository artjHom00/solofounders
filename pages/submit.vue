<script setup lang="ts">
import { ClientOnly } from '#components'

import { MdEditor, config, type Footers, type ToolbarNames } from 'md-editor-v3';

import 'md-editor-v3/lib/style.css';


const initialContent = `### 👋 welcome to solofounders editor; 
we're waiting for your story!`

const text = ref(initialContent);
const editorId = 'editor'

const colorMode = useColorMode()
const toolbarExclude: ToolbarNames[] = ['unorderedList', 'table', 'catalog', 'fullscreen', 'htmlPreview', 'github', 'katex', 'previewOnly', 'pageFullscreen', 'save', 'mermaid', 'task', 'orderedList', 'sub', 'sup', ]
const footers: Footers[] = ['markdownTotal'];

</script>

<template>
  <h2 class="text-center font-bold text-2xl">
    solofounders story submission
  </h2>
  <p class="text-center ">
    before submission, make sure to read <a class="hover:underline" href="#">our rules of writing</a>;
  </p>
  <div class="article-content mx-auto container max-w-screen-lg mt-8">
    <ClientOnly>
      <MdEditor class="article-content rounded-lg min-h-screen" :id="editorId" :footers="footers" :show-toolbar-name="true" v-model="text" language="en_US" :toolbars-exclude="toolbarExclude" :theme="colorMode.value === 'dark' ? 'dark' : 'light'"  noImgZoomIn />
      <button class="mt-4 block mx-auto btn dark:btn-secondary">Submit the story!</button>
    </ClientOnly>
  </div>
</template>

<style>
@import '/assets/css/article.css';

svg.md-editor-icon {
  width: 27px;
  height: 27px;
}
.md-editor { 
  --md-bk-color: #f2f2f2;
  box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
}
.md-editor-dark, .md-editor-modal-container[data-theme='dark'] {
  --md-bk-color: #262626;
}
.md-editor-toolbar-wrapper {
  padding: 12px 16px;
}
.md-editor-footer {
  padding: 12px 16px;
  height: initial;
}
</style>
